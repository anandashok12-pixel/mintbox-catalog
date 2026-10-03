import crypto from 'crypto'

/**
 * Minimal Gmail REST client. No googleapis dependency. Two auth modes:
 *  - service account with domain-wide delegation (one credential impersonates
 *    each mailbox via the JWT `sub`), when GOOGLE_SERVICE_ACCOUNT_JSON is set;
 *  - otherwise per-mailbox OAuth refresh tokens (src/lib/gmailOAuth.ts), each
 *    mailbox connected once from the CRM.
 *
 * Env:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  raw JSON or base64 of the JSON key file
 *   GOOGLE_OAUTH_CLIENT_ID/_SECRET  OAuth client, used when no service account
 *   GMAIL_MAILBOXES              comma separated, defaults to the three below
 */

export const DEFAULT_MAILBOXES = [
  'anand@themintbox.in',
  'hello@themintbox.in',
  'ashok.kumar@themintbox.in',
]

export function getMailboxes(): string[] {
  const raw = process.env.GMAIL_MAILBOXES?.trim()
  const list = raw ? raw.split(',') : DEFAULT_MAILBOXES
  return list.map((m) => m.trim().toLowerCase()).filter(Boolean)
}

export function usesServiceAccount(): boolean {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim())
}

export function gmailConfigured(): boolean {
  return usesServiceAccount() || Boolean(process.env.GOOGLE_OAUTH_CLIENT_ID?.trim() && process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim())
}

interface ServiceAccountKey {
  client_email: string
  private_key: string
  token_uri?: string
}

function loadKey(): ServiceAccountKey {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim()
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')
  const json = raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8')
  const key = JSON.parse(json) as ServiceAccountKey
  if (!key.client_email || !key.private_key) throw new Error('Service account key is missing client_email/private_key')
  return key
}

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
].join(' ')

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const tokenCache = new Map<string, { token: string; expiresAt: number }>()

async function accessToken(mailbox: string): Promise<string> {
  if (!usesServiceAccount()) {
    // Imported lazily: gmailOAuth pulls in the Payload config.
    const { oauthAccessToken } = await import('@/lib/gmailOAuth')
    return oauthAccessToken(mailbox)
  }

  const cached = tokenCache.get(mailbox)
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token

  const key = loadKey()
  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      sub: mailbox,
      scope: SCOPES,
      aud: key.token_uri || 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  )
  const signature = crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(key.private_key)
  const assertion = `${header}.${claims}.${b64url(signature)}`

  const res = await fetch(key.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.access_token) {
    throw new Error(
      `Google token error for ${mailbox}: ${data.error_description || data.error || res.status}` +
        (data.error === 'unauthorized_client'
          ? ' (domain-wide delegation not authorised for these scopes in Admin Console)'
          : ''),
    )
  }
  tokenCache.set(mailbox, { token: data.access_token, expiresAt: Date.now() + (data.expires_in || 3600) * 1000 })
  return data.access_token
}

export class GmailApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

async function gmail<T>(mailbox: string, path: string, init: RequestInit = {}): Promise<T> {
  const token = await accessToken(mailbox)
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new GmailApiError(data?.error?.message || `Gmail API ${res.status}`, res.status)
  return data as T
}

// ---------- Types ----------

interface GmailPart {
  mimeType?: string
  filename?: string
  headers?: { name: string; value: string }[]
  body?: { data?: string; size?: number }
  parts?: GmailPart[]
}

export interface GmailMessage {
  id: string
  threadId: string
  labelIds?: string[]
  internalDate?: string
  snippet?: string
  payload?: GmailPart
}

export interface ParsedEmail {
  gmailId: string
  threadId: string
  labelIds: string[]
  rfcMessageId: string | null
  subject: string
  from: { name: string; email: string }
  to: string[]
  cc: string[]
  sentAt: string
  body: string
  isBulk: boolean
}

// ---------- Read ----------

export async function getProfile(mailbox: string) {
  return gmail<{ emailAddress: string; historyId: string }>(mailbox, 'profile')
}

export async function listRecentMessageIds(mailbox: string, days: number, max = 300): Promise<string[]> {
  const ids: string[] = []
  let pageToken: string | undefined
  do {
    const params = new URLSearchParams({ q: `newer_than:${days}d -in:spam -in:trash -in:drafts`, maxResults: '100' })
    if (pageToken) params.set('pageToken', pageToken)
    const res = await gmail<{ messages?: { id: string }[]; nextPageToken?: string }>(mailbox, `messages?${params}`)
    for (const m of res.messages || []) ids.push(m.id)
    pageToken = res.nextPageToken
  } while (pageToken && ids.length < max)
  return ids.slice(0, max)
}

/** Message ids added since `startHistoryId`. Throws GmailApiError(404) if the cursor is too old. */
export async function listAddedMessageIds(mailbox: string, startHistoryId: string) {
  const ids = new Set<string>()
  let latestHistoryId = startHistoryId
  let pageToken: string | undefined
  do {
    const params = new URLSearchParams({ startHistoryId, historyTypes: 'messageAdded', maxResults: '500' })
    if (pageToken) params.set('pageToken', pageToken)
    const res = await gmail<{
      history?: { messagesAdded?: { message: { id: string } }[] }[]
      nextPageToken?: string
      historyId?: string
    }>(mailbox, `history?${params}`)
    for (const h of res.history || []) for (const a of h.messagesAdded || []) ids.add(a.message.id)
    if (res.historyId) latestHistoryId = res.historyId
    pageToken = res.nextPageToken
  } while (pageToken)
  return { ids: [...ids], historyId: latestHistoryId }
}

export async function getMessage(mailbox: string, id: string): Promise<GmailMessage> {
  return gmail<GmailMessage>(mailbox, `messages/${id}?format=full`)
}

export async function getMessageMetadata(mailbox: string, id: string): Promise<GmailMessage> {
  return gmail<GmailMessage>(
    mailbox,
    `messages/${id}?format=metadata&metadataHeaders=Message-ID&metadataHeaders=Subject`,
  )
}

// ---------- Parse ----------

function header(part: GmailPart | undefined, name: string): string {
  const lower = name.toLowerCase()
  return part?.headers?.find((h) => h.name.toLowerCase() === lower)?.value?.trim() || ''
}

/** Parse "Name <a@b.com>, c@d.com" into address list. Handles quoted commas. */
export function parseAddressList(value: string): { name: string; email: string }[] {
  const out: { name: string; email: string }[] = []
  const parts = value.match(/(?:[^,"]|"[^"]*")+/g) || []
  for (const part of parts) {
    const m = part.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/) || part.match(/^\s*()([^\s<>]+@[^\s<>]+)\s*$/)
    if (m) out.push({ name: (m[1] || '').trim(), email: m[2].trim().toLowerCase() })
  }
  return out
}

function decodeB64(data?: string): string {
  return data ? Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8') : ''
}

function htmlToText(html: string): string {
  return html
    .replace(/<(style|script)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function findBody(part: GmailPart | undefined, mime: string): string {
  if (!part) return ''
  if (part.mimeType === mime && part.body?.data && !part.filename) return decodeB64(part.body.data)
  for (const child of part.parts || []) {
    const found = findBody(child, mime)
    if (found) return found
  }
  return ''
}

/** Drop the quoted history ("On <date>, X wrote:" and everything after) so threads don't repeat themselves. */
function stripQuoted(text: string): string {
  const lines = text.split(/\r?\n/)
  const cut = lines.findIndex(
    (line, i) =>
      /^On .+wrote:\s*$/i.test(line.trim()) ||
      (/^On .+/i.test(line.trim()) && /wrote:\s*$/i.test((lines[i + 1] || '').trim())) ||
      /^-{2,}\s*Original Message\s*-{2,}/i.test(line.trim()) ||
      /^From:\s.+/.test(line) && /^Sent:\s/.test(lines[i + 1] || ''),
  )
  const kept = (cut > 0 ? lines.slice(0, cut) : lines).filter((l) => !l.startsWith('>'))
  return kept.join('\n').trim()
}

export function parseMessage(msg: GmailMessage): ParsedEmail {
  const p = msg.payload
  const from = parseAddressList(header(p, 'From'))[0] || { name: '', email: '' }
  const plain = findBody(p, 'text/plain')
  const body = stripQuoted(plain || htmlToText(findBody(p, 'text/html')) || msg.snippet || '')
  return {
    gmailId: msg.id,
    threadId: msg.threadId,
    labelIds: msg.labelIds || [],
    rfcMessageId: header(p, 'Message-ID') || header(p, 'Message-Id') || null,
    subject: header(p, 'Subject') || '(no subject)',
    from,
    to: parseAddressList(header(p, 'To')).map((a) => a.email),
    cc: parseAddressList(header(p, 'Cc')).map((a) => a.email),
    sentAt: new Date(Number(msg.internalDate) || Date.now()).toISOString(),
    body: body.slice(0, 20_000),
    isBulk: Boolean(header(p, 'List-Unsubscribe') || /bulk|list|junk/i.test(header(p, 'Precedence'))),
  }
}

// ---------- Send ----------

const encodeHeader = (value: string) => (/^[\x20-\x7e]*$/.test(value) ? value : `=?UTF-8?B?${Buffer.from(value).toString('base64')}?=`)

export function buildRawEmail(opts: {
  from: string
  fromName?: string
  to: string[]
  cc?: string[]
  subject: string
  text: string
  html: string
  inReplyTo?: string | null
  references?: string | null
}): string {
  const boundary = `mb_${crypto.randomBytes(12).toString('hex')}`
  const fromHeader = opts.fromName ? `${encodeHeader(opts.fromName)} <${opts.from}>` : opts.from
  const lines = [
    `From: ${fromHeader}`,
    `To: ${opts.to.join(', ')}`,
    ...(opts.cc?.length ? [`Cc: ${opts.cc.join(', ')}`] : []),
    `Subject: ${encodeHeader(opts.subject)}`,
    ...(opts.inReplyTo ? [`In-Reply-To: ${opts.inReplyTo}`] : []),
    ...(opts.references ? [`References: ${opts.references}`] : []),
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(opts.text).toString('base64').replace(/(.{76})/g, '$1\r\n'),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(opts.html).toString('base64').replace(/(.{76})/g, '$1\r\n'),
    `--${boundary}--`,
  ]
  return b64url(lines.join('\r\n'))
}

export async function sendRaw(mailbox: string, raw: string, threadId?: string) {
  return gmail<{ id: string; threadId: string }>(mailbox, 'messages/send', {
    method: 'POST',
    body: JSON.stringify({ raw, ...(threadId ? { threadId } : {}) }),
  })
}
