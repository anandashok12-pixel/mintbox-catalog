import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import crypto from 'crypto'
import { buildRawEmail, getMailboxes, getMessageMetadata, gmailConfigured, parseAddressList, sendRaw } from '@/lib/gmail'

// Sends mail as one of the configured mailboxes via the Gmail API (so it lands
// in that mailbox's Sent folder and threads correctly), then records it as an
// outbound `messages` row with an open-tracking pixel.
export const maxDuration = 30
export const dynamic = 'force-dynamic'

interface SendBody {
  mailbox: string
  to: string
  cc?: string
  subject: string
  body: string
  contactId?: string | number
  dealId?: string | number
  replyToMessageId?: string | number
  track?: boolean
  /** Append this mailbox's saved signature (default true). */
  signature?: boolean
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!gmailConfigured()) return NextResponse.json({ error: 'Gmail is not configured' }, { status: 503 })

  let input: SendBody
  try {
    input = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const mailbox = String(input.mailbox || '').toLowerCase()
  const mailboxes = getMailboxes()
  if (!mailboxes.includes(mailbox)) return NextResponse.json({ error: 'Unknown mailbox' }, { status: 400 })

  const to = parseAddressList(input.to || '').map((a) => a.email)
  const cc = parseAddressList(input.cc || '').map((a) => a.email)
  if (!to.length) return NextResponse.json({ error: 'A valid recipient is required' }, { status: 400 })
  if (!input.body?.trim()) return NextResponse.json({ error: 'Message body is empty' }, { status: 400 })

  let subject = (input.subject || '').trim() || '(no subject)'
  let threadId: string | undefined
  let inReplyTo: string | null = null
  let dealId = input.dealId
  let contactId = input.contactId

  if (input.replyToMessageId) {
    const original = await payload.findByID({ collection: 'messages', id: input.replyToMessageId, depth: 0 }).catch(() => null)
    if (original && original.channel === 'email') {
      threadId = original.threadId || undefined
      inReplyTo = original.rfcMessageId || null
      dealId = dealId ?? (typeof original.deal === 'object' ? original.deal?.id : original.deal) ?? undefined
      contactId = contactId ?? (typeof original.contact === 'object' ? original.contact.id : original.contact)
      if (!/^re:/i.test(subject) && original.subject) subject = `Re: ${original.subject.replace(/^re:\s*/i, '')}`
    }
  }

  if (!contactId) {
    // Resolve (or create) the contact from the first recipient.
    const found = await payload.find({ collection: 'contacts', where: { email: { like: to[0] } }, limit: 10, depth: 0 })
    const exact = found.docs.find((c) => c.email?.toLowerCase() === to[0])
    contactId = exact
      ? exact.id
      : (await payload.create({ collection: 'contacts', data: { name: to[0].split('@')[0], email: to[0], nameSource: 'manual' } })).id
  }

  let signature = ''
  if (input.signature !== false) {
    const settings = await payload.findGlobal({ slug: 'email-settings', depth: 0 }).catch(() => null)
    const rows = (settings as { signatures?: { mailbox: string; signature?: string | null }[] } | null)?.signatures || []
    signature = rows.find((r) => r.mailbox === mailbox)?.signature?.trim() || ''
  }
  const text = signature ? `${input.body.trimEnd()}\n\n${signature}` : input.body

  const track = input.track !== false
  const trackingToken = crypto.randomBytes(16).toString('hex')
  const appUrl = (process.env.NEXT_PUBLIC_URL || 'https://themintbox.in').replace(/\/$/, '')
  const html =
    `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;white-space:normal">${escapeHtml(input.body.trimEnd()).replace(/\r?\n/g, '<br>')}</div>` +
    (signature ? `<div style="font-family:Arial,sans-serif;font-size:13px;line-height:1.5;color:#555;margin-top:16px">${escapeHtml(signature).replace(/\r?\n/g, '<br>')}</div>` : '') +
    (track ? `<img src="${appUrl}/api/email/open/${trackingToken}.gif" width="1" height="1" alt="" style="display:none">` : '')

  const raw = buildRawEmail({
    from: mailbox,
    fromName: 'MintBox',
    to,
    cc,
    subject,
    text,
    html,
    inReplyTo,
    references: inReplyTo,
  })

  let sent: { id: string; threadId: string }
  try {
    sent = await sendRaw(mailbox, raw, threadId)
  } catch (err) {
    payload.logger.error({ err }, 'Gmail send failed')
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Send failed' }, { status: 502 })
  }

  const meta = await getMessageMetadata(mailbox, sent.id).catch(() => null)
  const rfc = meta?.payload?.headers?.find((h) => h.name.toLowerCase() === 'message-id')?.value || null
  const sentAt = new Date().toISOString()

  const doc = await payload.create({
    collection: 'messages',
    data: {
      contact: contactId,
      deal: dealId,
      channel: 'email',
      direction: 'outbound',
      body: input.body,
      providerId: `${mailbox}:${sent.id}`,
      sentAt,
      mailbox,
      threadId: sent.threadId,
      rfcMessageId: rfc,
      subject,
      fromEmail: mailbox,
      toEmails: to.join(', '),
      ccEmails: cc.join(', '),
      trackingToken: track ? trackingToken : undefined,
    },
  })

  await payload.update({ collection: 'contacts', id: contactId, data: { lastActivityAt: sentAt } })
  return NextResponse.json({ success: true, message: doc })
}
