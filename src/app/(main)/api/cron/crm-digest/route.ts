import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { isAuthorizedCronRequest } from '@/lib/cronAuth'
import { runExtractionSweep } from '@/lib/extractionSweep'
import { buildDailyQueue, type QueueRow } from '@/lib/queue'
import { BUCKET_LABELS, type Bucket } from '@/lib/scoring'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY?.trim() || 're_placeholder')
  }
  return resendClient
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatCurrency(value: number | null | undefined): string {
  return value == null ? '' : `₹${Math.round(value).toLocaleString('en-IN')}`
}

function reason(row: QueueRow): string {
  switch (row.bucket) {
    case 'waiting_on_you':
      return `Waiting ${Math.max(0, Math.round(row.sortValue))}h since their last message`
    case 'deadline_at_risk':
      return `Deadline in ${Math.round(-row.sortValue)} day(s)`
    case 'quoted_gone_quiet':
      return 'Quoted, no reply in 3+ days'
    default:
      return 'Open, nothing scheduled'
  }
}

function digestHtml(rows: QueueRow[], totalOpen: number, queueUrl: string, payloadAdminUrl: string): string {
  const groups = new Map<Bucket, QueueRow[]>()
  for (const row of rows) {
    const group = groups.get(row.bucket) || []
    group.push(row)
    groups.set(row.bucket, group)
  }

  const body = rows.length === 0
    ? '<p style="margin:24px 0;color:#4f5f58;">Nothing needs attention right now.</p>'
    : Array.from(groups.entries()).map(([bucket, bucketRows]) => `
      <section style="margin:24px 0;">
        <h2 style="margin:0 0 10px;color:#0D3D2B;font-size:13px;letter-spacing:.08em;text-transform:uppercase;">
          ${escapeHtml(BUCKET_LABELS[bucket])} (${bucketRows.length})
        </h2>
        ${bucketRows.map((row) => {
          const name = row.contactCompany || row.contactName
          const dealUrl = `${payloadAdminUrl}/admin/collections/deals/${row.id}`
          const nextAction = row.nextAction
            ? `<div style="margin-top:6px;color:#24352e;"><strong>Next:</strong> ${escapeHtml(row.nextAction)}</div>`
            : ''
          return `
            <div style="margin:0 0 10px;padding:14px 16px;border:1px solid #e1ddd0;border-left:4px solid #B8972E;border-radius:8px;background:#fff;">
              <div><a href="${escapeHtml(dealUrl)}" style="color:#0D3D2B;font-weight:700;text-decoration:none;">${escapeHtml(name)}</a>${row.estimatedValue == null ? '' : ` <span style="color:#68766f;">· ${formatCurrency(row.estimatedValue)}</span>`}</div>
              <div style="margin-top:4px;color:#68766f;font-size:13px;">${escapeHtml(reason(row))}</div>
              ${nextAction}
            </div>`
        }).join('')}
      </section>`).join('')

  return `<!doctype html>
    <html><body style="margin:0;padding:0;background:#F7F3E8;font-family:Arial,sans-serif;color:#24352e;">
      <main style="max-width:680px;margin:0 auto;padding:32px 20px;">
        <div style="margin-bottom:24px;color:#B8972E;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">MintBox CRM</div>
        <h1 style="margin:0;color:#0D3D2B;font-size:28px;">Today’s priority queue</h1>
        <p style="margin:8px 0 0;color:#68766f;">${rows.length} of ${totalOpen} open deals need attention.</p>
        ${body}
        <a href="${escapeHtml(queueUrl)}" style="display:inline-block;margin-top:8px;padding:12px 18px;border-radius:8px;background:#0D3D2B;color:#fff;font-weight:700;text-decoration:none;">Open the queue</a>
      </main>
    </body></html>`
}

function indiaDate(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export async function GET(req: NextRequest) {
  if (!isAuthorizedCronRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    return NextResponse.json({ error: 'RESEND_API_KEY is not configured' }, { status: 503 })
  }

  // Clear any extraction backlog before computing the time-sensitive queue.
  // Queue buckets themselves are calculated live, so this is the nightly
  // rescore: no persisted score can go stale during the day.
  const extraction = await runExtractionSweep(30)
  const { daily, totalOpen } = await buildDailyQueue()

  const notifyEmails = process.env.NOTIFY_EMAIL
    ? process.env.NOTIFY_EMAIL.split(',').map((email) => email.trim()).filter(Boolean)
    : ['anand@themintbox.in']
  const appUrl = (process.env.NEXT_PUBLIC_URL || 'https://themintbox.in').replace(/\/$/, '')
  const queueUrl = (
    process.env.CRM_APP_URL ||
    process.env.NEXT_PUBLIC_CRM_APP_URL ||
    `${appUrl}/admin/collections/deals`
  ).replace(/\/$/, '')
  const digestDate = indiaDate()

  const sendResult = await getResend().emails.send({
    from: 'MintBox <noreply@themintbox.in>',
    to: notifyEmails,
    subject: daily.length === 0
      ? 'MintBox CRM: queue clear'
      : `MintBox CRM: ${daily.length} deal${daily.length === 1 ? '' : 's'} need attention`,
    html: digestHtml(daily, totalOpen, queueUrl, appUrl),
  }, { idempotencyKey: `mintbox-crm-digest-${digestDate}` })

  if (sendResult.error) {
    return NextResponse.json({ error: sendResult.error, extraction }, { status: 502 })
  }

  // One activity records the digest as a whole. Resend's date-based
  // idempotency key prevents duplicate emails if Vercel retries the request.
  if (daily[0]) {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'activities',
      data: {
        contact: daily[0].contactId,
        deal: daily[0].id,
        type: 'digest_sent',
        summary: `Morning digest sent: ${daily.length} deals need attention`,
        meta: { digestDate, totalOpen, dealIds: daily.map((row) => row.id) },
      },
    })
  }

  return NextResponse.json({
    success: true,
    digestDate,
    recipients: notifyEmails.length,
    queuedDeals: daily.length,
    totalOpen,
    extraction,
    emailId: sendResult.data?.id,
  })
}
