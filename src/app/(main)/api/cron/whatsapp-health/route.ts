import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'

// Vercel Cron hits this on a schedule (see vercel.json). A silently dead
// mirror is worse than no mirror at all - the queue looks calm while
// enquiries pile up unread - so this is the one thing standing between
// "worker crashed at 2am" and nobody noticing for a week.
export const maxDuration = 30
export const dynamic = 'force-dynamic'

const STALE_AFTER_MINUTES = 15
const RE_ALERT_AFTER_MINUTES = 60 // don't send a fresh email every 5-minute cron tick during an outage

let resendClient: Resend | null = null
function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY?.trim() || 're_placeholder')
  }
  return resendClient
}

export async function GET(req: NextRequest) {
  // Vercel Cron sends this header on scheduled invocations; a manual check
  // still needs the same secret /api/db-push and /api/leads-adjacent
  // internal routes use, so this can also be curled by hand.
  const authHeader = req.headers.get('authorization')
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`
  const { searchParams } = new URL(req.url)
  const isManual = process.env.SEED_SECRET && searchParams.get('secret') === process.env.SEED_SECRET
  if (!isVercelCron && !isManual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const session = await payload.findGlobal({ slug: 'whatsapp-session' })

  const now = Date.now()
  const lastHeartbeat = session.lastHeartbeatAt ? new Date(session.lastHeartbeatAt).getTime() : null
  const staleMs = STALE_AFTER_MINUTES * 60 * 1000
  const isStale = !lastHeartbeat || now - lastHeartbeat > staleMs

  if (!isStale) {
    return NextResponse.json({ success: true, status: 'healthy', lastHeartbeatAt: session.lastHeartbeatAt })
  }

  const lastAlert = session.lastAlertSentAt ? new Date(session.lastAlertSentAt).getTime() : null
  const shouldAlert = !lastAlert || now - lastAlert > RE_ALERT_AFTER_MINUTES * 60 * 1000

  if (shouldAlert) {
    const minutesSinceHeartbeat = lastHeartbeat ? Math.round((now - lastHeartbeat) / 60000) : null
    const notifyEmails = process.env.NOTIFY_EMAIL
      ? process.env.NOTIFY_EMAIL.split(',').map((e) => e.trim()).filter(Boolean)
      : ['anand@themintbox.in']

    const resend = getResend()
    await resend.emails.send({
      from: 'MintBox <noreply@themintbox.in>',
      to: notifyEmails,
      subject: `⚠️ WhatsApp mirror is down`,
      html: `
        <p>The WhatsApp mirror worker has ${lastHeartbeat ? `not reported in for ${minutesSinceHeartbeat} minutes` : 'never reported a heartbeat'}.</p>
        <p>Current status: <strong>${session.status}</strong>${session.lastError ? ` (${session.lastError})` : ''}</p>
        <p>WhatsApp messages sent or received since it went down are not being captured. Replies from your phone are unaffected - the app never sends anything.</p>
        <p>Check the worker host, then confirm it reconnects at <a href="${process.env.NEXT_PUBLIC_URL}/admin/globals/whatsapp-session">the WhatsApp Mirror status page</a>.</p>
      `,
    })

    await payload.updateGlobal({
      slug: 'whatsapp-session',
      data: { lastAlertSentAt: new Date().toISOString() },
    })
  }

  return NextResponse.json({
    success: true,
    status: 'stale',
    lastHeartbeatAt: session.lastHeartbeatAt,
    alerted: shouldAlert,
  })
}
