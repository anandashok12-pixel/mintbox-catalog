import type { Payload } from 'payload'
import {
  GmailApiError,
  getMailboxes,
  getMessage,
  getProfile,
  listAddedMessageIds,
  usesServiceAccount,
  listRecentMessageIds,
  parseMessage,
  type ParsedEmail,
} from '@/lib/gmail'

const BACKFILL_DAYS = Number(process.env.GMAIL_BACKFILL_DAYS) || 14
const MAX_PER_RUN = 60 // per mailbox; leftovers are picked up next run (dedupe makes re-runs safe)
// Vercel kills the cron at 60s; stop ingesting with headroom to save state.
const TIME_BUDGET_MS = Number(process.env.GMAIL_SYNC_BUDGET_MS) || 45_000
const SKIP_LABELS = ['SPAM', 'TRASH', 'DRAFT', 'CATEGORY_PROMOTIONS', 'CATEGORY_SOCIAL', 'CATEGORY_FORUMS', 'CATEGORY_UPDATES']
const AUTOMATED_SENDER = /(^|[.\-_+])(no-?reply|do-?not-?reply|mailer-daemon|postmaster|notifications?|alerts?|bounce[sd]?)([.\-_+@]|$)/i

export interface MailboxResult {
  mailbox: string
  synced: number
  skipped: number
  pending?: number
  error?: string
}

type Row = {
  mailbox: string
  historyId?: string | null
  pendingIds?: string | null
  lastSyncAt?: string | null
  lastSuccessAt?: string | null
  lastError?: string | null
  totalSynced?: number | null
}

export async function runGmailSync(payload: Payload): Promise<MailboxResult[]> {
  const deadline = Date.now() + TIME_BUDGET_MS
  const mailboxes = getMailboxes()
  const internal = new Set(mailboxes)
  const state = await payload.findGlobal({ slug: 'gmail-sync', depth: 0 })
  const rows: Row[] = ((state as { accounts?: Row[] }).accounts || []).map((r) => ({ ...r }))
  const results: MailboxResult[] = []
  // In OAuth mode a mailbox nobody has connected yet is skipped, not an error.
  const connected = usesServiceAccount() ? null : await (await import('@/lib/gmailOAuth')).connectedMailboxes()

  const active = connected ? mailboxes.filter((m) => connected.has(m)) : mailboxes

  for (const [index, mailbox] of active.entries()) {
    // Each mailbox gets an equal share of what's left, so one big backlog
    // can't starve the others.
    const mailboxDeadline = Date.now() + (deadline - Date.now()) / (active.length - index)
    let row = rows.find((r) => r.mailbox === mailbox)
    if (!row) {
      row = { mailbox }
      rows.push(row)
    }
    const result: MailboxResult = { mailbox, synced: 0, skipped: 0 }
    row.lastSyncAt = new Date().toISOString()

    try {
      // The cursor always advances; anything not yet ingested waits in
      // `pendingIds` so a large backlog drains over several runs instead of
      // re-listing the same newest messages forever.
      let fresh: string[]
      const backfill = async () => {
        // Read the profile's cursor BEFORE listing so nothing that lands meanwhile is missed.
        const profile = await getProfile(mailbox)
        row!.historyId = profile.historyId
        return listRecentMessageIds(mailbox, BACKFILL_DAYS)
      }

      if (!row.historyId) {
        fresh = await backfill()
      } else {
        try {
          const added = await listAddedMessageIds(mailbox, row.historyId)
          fresh = added.ids
          row.historyId = added.historyId
        } catch (err) {
          if (!(err instanceof GmailApiError && err.status === 404)) throw err
          fresh = await backfill() // cursor expired (~a week idle); dedupe absorbs overlap
        }
      }

      // New mail first, so it isn't stuck behind an old backlog.
      const queue = [...new Set([...fresh, ...(row.pendingIds ? row.pendingIds.split(',') : [])])].filter(Boolean)
      let done = 0
      for (const id of queue.slice(0, MAX_PER_RUN)) {
        if (Date.now() > mailboxDeadline) break
        const outcome = await ingestOne(payload, mailbox, id, internal)
        if (outcome === 'synced') result.synced++
        else result.skipped++
        done++
      }
      row.pendingIds = queue.slice(done).join(',') || null
      result.pending = queue.length - done
      row.lastSuccessAt = new Date().toISOString()
      row.lastError = null
      row.totalSynced = (row.totalSynced || 0) + result.synced
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      row.lastError = message.slice(0, 500)
      result.error = message
      payload.logger.error({ err }, `Gmail sync failed for ${mailbox}`)
    }
    results.push(result)
  }

  await payload.updateGlobal({ slug: 'gmail-sync', data: { accounts: rows } })
  return results
}

async function ingestOne(
  payload: Payload,
  mailbox: string,
  gmailId: string,
  internal: Set<string>,
): Promise<'synced' | 'skipped'> {
  const providerId = `${mailbox}:${gmailId}`
  const dup = await payload.find({ collection: 'messages', where: { providerId: { equals: providerId } }, limit: 1, depth: 0 })
  if (dup.docs.length) return 'skipped'

  let email: ParsedEmail
  try {
    email = parseMessage(await getMessage(mailbox, gmailId))
  } catch (err) {
    if (err instanceof GmailApiError && err.status === 404) return 'skipped' // deleted since listing
    throw err
  }

  if (email.labelIds.some((l) => SKIP_LABELS.includes(l))) return 'skipped'
  if (!email.from.email) return 'skipped'

  const outbound = internal.has(email.from.email)
  const everyone = [...email.to, ...email.cc]

  // Who is the customer? For inbound it's the sender; for outbound the first external recipient.
  let counterpartyEmail: string
  if (outbound) {
    const external = everyone.find((e) => !internal.has(e))
    if (!external) return 'skipped' // purely internal mail
    counterpartyEmail = external
  } else {
    if (email.isBulk || AUTOMATED_SENDER.test(email.from.email)) return 'skipped'
    counterpartyEmail = email.from.email
  }

  // Email only files mail for people already in the CRM; it never creates
  // contacts or deals. Unknown senders (cold pitches, vendors, newsletters
  // that slip the filters) stay in Gmail.
  const contactId = await findContact(payload, counterpartyEmail, email.sentAt)
  if (contactId == null) return 'skipped'
  const dealId = await findDeal(payload, contactId, email.threadId)

  await payload.create({
    collection: 'messages',
    data: {
      contact: contactId,
      deal: dealId,
      channel: 'email',
      direction: outbound ? 'outbound' : 'inbound',
      body: email.body,
      providerId,
      sentAt: email.sentAt,
      mailbox,
      threadId: email.threadId,
      rfcMessageId: email.rfcMessageId,
      subject: email.subject,
      fromEmail: email.from.email,
      toEmails: email.to.join(', '),
      ccEmails: email.cc.join(', '),
    },
  })
  return 'synced'
}

async function findContact(payload: Payload, email: string, sentAt: string): Promise<string | number | null> {
  // Payload's `like` is a substring, case-insensitive match; narrow to exact in JS.
  const found = await payload.find({
    collection: 'contacts',
    where: { email: { like: email } },
    limit: 10,
    depth: 0,
  })
  const exact = found.docs.find((c) => c.email?.toLowerCase() === email)
  if (!exact) return null
  await payload.update({ collection: 'contacts', id: exact.id, data: { lastActivityAt: sentAt } })
  return exact.id
}

async function findDeal(payload: Payload, contactId: string | number, threadId: string): Promise<string | number | undefined> {
  // A reply in a thread we've already filed stays on that deal.
  const sameThread = await payload.find({
    collection: 'messages',
    where: { and: [{ threadId: { equals: threadId } }, { deal: { exists: true } }] },
    sort: '-sentAt',
    limit: 1,
    depth: 0,
  })
  const threadDeal = sameThread.docs[0]?.deal
  if (threadDeal) return typeof threadDeal === 'object' ? threadDeal.id : threadDeal

  const open = await payload.find({
    collection: 'deals',
    where: { and: [{ contact: { equals: contactId } }, { stage: { not_in: ['won', 'lost'] } }] },
    sort: '-updatedAt',
    limit: 1,
    depth: 0,
  })
  return open.docs[0]?.id
}
