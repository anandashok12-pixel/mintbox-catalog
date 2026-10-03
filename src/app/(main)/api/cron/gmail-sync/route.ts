import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { isAuthorizedCronRequest } from '@/lib/cronAuth'
import { gmailConfigured } from '@/lib/gmail'
import { runGmailSync } from '@/lib/gmailSync'

// Pulls new mail from each configured mailbox into `messages`. Read-only
// against Gmail; safe to re-run (providerId dedupes).
export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!isAuthorizedCronRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!gmailConfigured()) {
    return NextResponse.json({ success: false, error: 'Gmail is not configured (set GOOGLE_OAUTH_CLIENT_ID/SECRET or GOOGLE_SERVICE_ACCOUNT_JSON)' }, { status: 503 })
  }
  const payload = await getPayload({ config: configPromise })
  const results = await runGmailSync(payload)
  return NextResponse.json({ success: results.every((r) => !r.error), results })
}
