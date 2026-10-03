import crypto from 'crypto'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Per-mailbox OAuth for the Gmail integration: each mailbox signs in once via
 * Google's consent screen and we keep its refresh token. Used when no
 * service-account key is configured (the org policy blocks key creation).
 *
 * Env:
 *   GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET  a "Web application" OAuth client
 *   GMAIL_OAUTH_REDIRECT_URI  optional; defaults to <request origin>/api/email/oauth/callback
 */

export const OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
]

export function oauthConfigured(): boolean {
  return Boolean(process.env.GOOGLE_OAUTH_CLIENT_ID?.trim() && process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim())
}

function client() {
  const id = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim()
  const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim()
  if (!id || !secret) throw new Error('GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET are not set')
  return { id, secret }
}

export function redirectUriFor(requestUrl: string): string {
  return process.env.GMAIL_OAUTH_REDIRECT_URI?.trim() || `${new URL(requestUrl).origin}/api/email/oauth/callback`
}

// ---------- Signed state (mailbox + redirect URI, 15 min expiry) ----------

const stateKey = () => crypto.createHash('sha256').update(`${process.env.PAYLOAD_SECRET}:gmail-oauth-state`).digest()

interface OAuthState { mailbox: string; redirectUri: string; exp: number }

export function signState(state: Omit<OAuthState, 'exp'>): string {
  const body = Buffer.from(JSON.stringify({ ...state, exp: Date.now() + 15 * 60_000, n: crypto.randomBytes(8).toString('hex') })).toString('base64url')
  const sig = crypto.createHmac('sha256', stateKey()).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verifyState(value: string): OAuthState | null {
  const [body, sig] = value.split('.')
  if (!body || !sig) return null
  const expected = crypto.createHmac('sha256', stateKey()).update(body).digest('base64url')
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  const state = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as OAuthState
  return state.exp > Date.now() ? state : null
}

export function authUrl(mailbox: string, redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: client().id,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: OAUTH_SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent', // always return a refresh token, even on reconnect
    include_granted_scopes: 'true',
    login_hint: mailbox,
    state: signState({ mailbox, redirectUri }),
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}

// ---------- Token endpoint ----------

async function tokenRequest(params: Record<string, string>) {
  const { id, secret } = client()
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: id, client_secret: secret, ...params }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.access_token) {
    throw new Error(`Google token error: ${data.error_description || data.error || res.status}`)
  }
  return data as { access_token: string; expires_in?: number; refresh_token?: string; scope?: string }
}

export function exchangeCode(code: string, redirectUri: string) {
  return tokenRequest({ grant_type: 'authorization_code', code, redirect_uri: redirectUri })
}

// ---------- Refresh-token storage (AES-256-GCM) ----------

const encKey = () => crypto.createHash('sha256').update(`${process.env.PAYLOAD_SECRET}:gmail-refresh-tokens`).digest()

function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', encKey(), iv)
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString('base64url')).join('.')
}

function decrypt(value: string): string {
  const [iv, tag, data] = value.split('.').map((p) => Buffer.from(p, 'base64url'))
  const decipher = crypto.createDecipheriv('aes-256-gcm', encKey(), iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
}

type TokenRow = { mailbox: string; refreshToken: string; connectedAt?: string | null }

async function readRows(): Promise<TokenRow[]> {
  const payload = await getPayload({ config: configPromise })
  const state = await payload.findGlobal({ slug: 'gmail-tokens', depth: 0, overrideAccess: true })
  return ((state as { tokens?: TokenRow[] }).tokens || []).map(({ mailbox, refreshToken, connectedAt }) => ({ mailbox, refreshToken, connectedAt }))
}

export async function connectedMailboxes(): Promise<Set<string>> {
  return new Set((await readRows()).map((r) => r.mailbox))
}

export async function saveRefreshToken(mailbox: string, refreshToken: string) {
  const payload = await getPayload({ config: configPromise })
  const rows = (await readRows()).filter((r) => r.mailbox !== mailbox)
  const connectedAt = new Date().toISOString()
  rows.push({ mailbox, refreshToken: encrypt(refreshToken), connectedAt })
  await payload.updateGlobal({ slug: 'gmail-tokens', data: { tokens: rows }, overrideAccess: true })
  accessTokenCache.delete(mailbox)

  // Mirror "connected" onto the CRM-visible sync row (no secrets there).
  const sync = await payload.findGlobal({ slug: 'gmail-sync', depth: 0 })
  const accounts = ((sync as { accounts?: Record<string, unknown>[] }).accounts || []).map((a) => ({ ...a }))
  const row = accounts.find((a) => a.mailbox === mailbox)
  if (row) Object.assign(row, { connectedAt, lastError: null })
  else accounts.push({ mailbox, connectedAt })
  await payload.updateGlobal({ slug: 'gmail-sync', data: { accounts } })
}

const accessTokenCache = new Map<string, { token: string; expiresAt: number }>()

export async function oauthAccessToken(mailbox: string): Promise<string> {
  const cached = accessTokenCache.get(mailbox)
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token

  const row = (await readRows()).find((r) => r.mailbox === mailbox)
  if (!row) throw new Error(`${mailbox} is not connected. Use "Connect" in the CRM Email tab.`)
  let data
  try {
    data = await tokenRequest({ grant_type: 'refresh_token', refresh_token: decrypt(row.refreshToken) })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(/invalid_grant/i.test(message) ? `${mailbox} access was revoked or expired. Reconnect it in the CRM Email tab.` : message)
  }
  accessTokenCache.set(mailbox, { token: data.access_token, expiresAt: Date.now() + (data.expires_in || 3600) * 1000 })
  return data.access_token
}
