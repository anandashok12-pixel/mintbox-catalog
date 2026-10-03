import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getMailboxes } from '@/lib/gmail'
import { authUrl, oauthConfigured, redirectUriFor } from '@/lib/gmailOAuth'

// Returns the Google consent URL for connecting one mailbox. Called by the CRM
// with the user's Payload token; the CRM then opens the URL in a new tab.
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!oauthConfigured()) {
    return NextResponse.json({ error: 'GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET are not set on the server' }, { status: 503 })
  }

  const { mailbox: raw } = (await req.json().catch(() => ({}))) as { mailbox?: string }
  const mailbox = String(raw || '').trim().toLowerCase()
  if (!getMailboxes().includes(mailbox)) return NextResponse.json({ error: 'Unknown mailbox' }, { status: 400 })

  return NextResponse.json({ url: authUrl(mailbox, redirectUriFor(req.url)) })
}
