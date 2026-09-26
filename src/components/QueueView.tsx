import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildDailyQueue, type QueueRow } from '@/lib/queue'
import { BUCKET_LABELS, type Bucket } from '@/lib/scoring'
import { SnoozeControls } from './SnoozeControls'

// Server component: reads the queue directly via the Payload local API on
// every render, so a snooze/refresh always shows the true current state -
// no client-side cache to go stale.
export async function QueueView() {
  // Custom Payload admin views are NOT auto-gated behind login the way
  // built-in collection/global views are, and the local API bypasses
  // access control by default - without this explicit check, every deal's
  // full extracted context would be readable by anyone who finds this URL.
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user) {
    redirect('/admin/login?redirect=%2Fadmin%2Fqueue')
  }

  const { daily, dormant, totalOpen } = await buildDailyQueue()

  return (
    <div style={{ padding: '2rem', maxWidth: '960px' }}>
      <h1 style={{ marginBottom: '0.25rem', fontSize: '1.75rem', fontWeight: 700 }}>Today&apos;s queue</h1>
      <p style={{ marginBottom: '2rem', opacity: 0.6, fontSize: '0.95rem' }}>
        {daily.length} of {totalOpen} open deals need attention today. Ranked by bucket, then value.
      </p>

      {daily.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Nothing needs attention right now.</p>
      ) : (
        groupByBucket(daily).map(([bucket, rows]) => (
          <section key={bucket} style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                opacity: 0.5,
                marginBottom: '0.75rem',
              }}
            >
              {BUCKET_LABELS[bucket]} ({rows.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {rows.map((row) => (
                <QueueRowCard key={row.id} row={row} bucket={bucket} />
              ))}
            </div>
          </section>
        ))
      )}

      {dormant.length > 0 && (
        <details style={{ marginTop: '2rem' }}>
          <summary style={{ cursor: 'pointer', opacity: 0.6, fontSize: '0.85rem' }}>
            Dormant - weekly review ({dormant.length})
          </summary>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
            {dormant.map((row) => (
              <QueueRowCard key={row.id} row={row} bucket="dormant" />
            ))}
          </div>
        </details>
      )}
    </div>
  )
}

function groupByBucket(rows: QueueRow[]): [Bucket, QueueRow[]][] {
  const groups = new Map<Bucket, QueueRow[]>()
  for (const row of rows) {
    if (!groups.has(row.bucket)) groups.set(row.bucket, [])
    groups.get(row.bucket)!.push(row)
  }
  return Array.from(groups.entries())
}

function reasonLine(row: QueueRow, bucket: Bucket): string {
  switch (bucket) {
    case 'waiting_on_you':
      return `Waiting ${Math.round(row.sortValue)}h since their last message`
    case 'deadline_at_risk':
      return `Deadline in ${Math.round(-row.sortValue)} day(s)`
    case 'quoted_gone_quiet':
      return 'Quoted, no reply in 3+ days'
    case 'dormant':
      return 'Silent 21+ days'
    default:
      return 'Open, nothing scheduled'
  }
}

function QueueRowCard({ row, bucket }: { row: QueueRow; bucket: Bucket }) {
  const waLink = row.contactPhoneE164 ? `https://wa.me/${row.contactPhoneE164.replace('+', '')}` : null
  const value =
    row.estimatedValue != null
      ? `₹${Math.round(row.estimatedValue).toLocaleString('en-IN')}`
      : null

  return (
    <div
      style={{
        border: '1px solid #e5e5e5',
        borderRadius: 8,
        padding: '0.85rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <a href={`/admin/collections/deals/${row.id}`} style={{ fontWeight: 600, textDecoration: 'none', color: '#111' }}>
            {row.contactCompany || row.contactName}
          </a>
          {value && <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{value}</span>}
        </div>
        <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', opacity: 0.5 }}>{reasonLine(row, bucket)}</p>
        {row.nextAction && (
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
            <strong>Next:</strong> {row.nextAction}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end', flexShrink: 0 }}>
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '0.8rem', color: '#0d3d2b', fontWeight: 600, textDecoration: 'none' }}
          >
            Open WhatsApp →
          </a>
        )}
        <SnoozeControls dealId={row.id} />
      </div>
    </div>
  )
}
