'use client'

import { useMemo, useState } from 'react'
import type { Deal, ScoredDeal } from '@/lib/types'
import { BUCKET_LABELS, BUCKET_ORDER, buildQueue, queueReason } from '@/lib/scoring'
import { BUCKET_ACCENT } from '@/lib/constants'
import { ArrowIcon, WhatsAppIcon } from './Icons'

interface QueueProps {
  deals: Deal[]
  onOpen: (deal: Deal) => void
  onSnooze: (deal: Deal, days: number) => Promise<void>
}

function contactFor(deal: Deal) {
  return typeof deal.contact === 'object' ? deal.contact : null
}

function QueueCard({ deal, index, onOpen, onSnooze }: { deal: ScoredDeal; index: number; onOpen: () => void; onSnooze: (days: number) => Promise<void> }) {
  const contact = contactFor(deal)
  const [pending, setPending] = useState(false)

  async function snooze(days: number) {
    setPending(true)
    try { await onSnooze(days) } finally { setPending(false) }
  }

  return (
    <article className="queue-card" style={{ '--accent': BUCKET_ACCENT[deal.bucket] } as React.CSSProperties}>
      <button className="queue-card-main" onClick={onOpen}>
        <span className="queue-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="queue-identity">
          <strong>{contact?.company || contact?.name || deal.title}</strong>
          {contact?.company && <small>{contact.name}</small>}
        </span>
        <span className="queue-reason">{queueReason(deal)}</span>
        <span className="queue-value">{deal.estimatedValue == null ? '—' : `₹${Math.round(deal.estimatedValue).toLocaleString('en-IN')}`}</span>
        <ArrowIcon className="queue-arrow" />
      </button>
      {deal.nextAction && <p className="queue-next"><span>Next</span>{deal.nextAction}</p>}
      <footer className="queue-card-footer">
        <div className="queue-bucket"><i />{BUCKET_LABELS[deal.bucket]}</div>
        <div className="queue-actions">
          {contact?.phoneE164 && <a href={`https://wa.me/${contact.phoneE164.replace('+', '')}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> Message</a>}
          <button disabled={pending} onClick={() => snooze(3)}>Snooze 3d</button>
          <button disabled={pending} onClick={() => snooze(7)}>1 week</button>
        </div>
      </footer>
    </article>
  )
}

export function QueueView({ deals, onOpen, onSnooze }: QueueProps) {
  const queue = useMemo(() => buildQueue(deals), [deals])
  const daily = queue.filter((deal) => deal.bucket !== 'dormant').slice(0, 15)
  const dormant = queue.filter((deal) => deal.bucket === 'dormant')
  const openCount = deals.filter((deal) => deal.stage !== 'won' && deal.stage !== 'lost').length
  const waitingCount = daily.filter((deal) => deal.bucket === 'waiting_on_you').length

  return (
    <div className="view queue-view">
      <header className="view-heading queue-heading">
        <div>
          <span className="eyebrow">Your working list</span>
          <h1>Today’s desk</h1>
          <p>Attention before activity. The first item is the next item.</p>
        </div>
        <div className="queue-tally" aria-label={`${daily.length} priorities, ${waitingCount} waiting on you`}>
          <div><strong>{daily.length}</strong><span>priorities</span></div>
          <div><strong>{waitingCount}</strong><span>waiting on you</span></div>
          <div><strong>{openCount}</strong><span>open deals</span></div>
        </div>
      </header>

      {daily.length === 0 ? (
        <div className="empty-state"><span>✓</span><h2>The desk is clear.</h2><p>No open deal needs attention right now.</p></div>
      ) : (
        <div className="queue-groups">
          {BUCKET_ORDER.filter((bucket) => bucket !== 'dormant').map((bucket) => {
            const rows = daily.filter((deal) => deal.bucket === bucket)
            if (rows.length === 0) return null
            return (
              <section className="queue-group" key={bucket}>
                <header><span style={{ background: BUCKET_ACCENT[bucket] }} /><h2>{BUCKET_LABELS[bucket]}</h2><small>{rows.length}</small></header>
                <div className="queue-list">{rows.map((deal) => <QueueCard key={deal.id} deal={deal} index={daily.indexOf(deal)} onOpen={() => onOpen(deal)} onSnooze={(days) => onSnooze(deal, days)} />)}</div>
              </section>
            )
          })}
        </div>
      )}

      {dormant.length > 0 && (
        <details className="dormant-list">
          <summary><span>Dormant · weekly review</span><small>{dormant.length} deals</small></summary>
          <div className="queue-list">{dormant.map((deal, index) => <QueueCard key={deal.id} deal={deal} index={index} onOpen={() => onOpen(deal)} onSnooze={(days) => onSnooze(deal, days)} />)}</div>
        </details>
      )}
    </div>
  )
}
