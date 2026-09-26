'use client'

import type { Deal } from '@/lib/types'
import { payloadAdminDealUrl } from '@/lib/payload'
import { CloseIcon, ExternalIcon, WhatsAppIcon } from './Icons'

function contactFor(deal: Deal) {
  return typeof deal.contact === 'object' ? deal.contact : null
}

function formatDate(value?: string | null) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}

function currency(value?: number | null) {
  return value == null ? 'Not known' : `₹${Math.round(value).toLocaleString('en-IN')}`
}

export function DealDrawer({ deal, onClose }: { deal: Deal | null; onClose: () => void }) {
  if (!deal) return null
  const contact = contactFor(deal)
  const phone = contact?.phoneE164

  return (
    <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`Deal details for ${contact?.company || contact?.name || deal.title}`}>
      <button className="drawer-backdrop" onClick={onClose} aria-label="Close deal details" />
      <aside className="deal-drawer">
        <header className="drawer-header">
          <div>
            <span className="eyebrow">Deal record</span>
            <h2>{contact?.company || contact?.name || deal.title}</h2>
            {contact?.company && <p>{contact.name}</p>}
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>

        <div className="drawer-actions">
          {phone && <a className="action-button action-button-strong" href={`https://wa.me/${phone.replace('+', '')}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>}
          <a className="action-button" href={payloadAdminDealUrl(deal.id)} target="_blank" rel="noreferrer"><ExternalIcon /> Full record</a>
        </div>

        <section className="drawer-section drawer-summary">
          <span className="eyebrow">Situation</span>
          <p>{deal.summary || 'No extracted summary yet.'}</p>
        </section>

        <section className="drawer-section next-action-block">
          <span className="eyebrow">Next move</span>
          <p>{deal.nextAction || 'Nothing concrete is scheduled.'}</p>
        </section>

        <dl className="deal-facts">
          <div><dt>Stage</dt><dd>{deal.stage}</dd></div>
          <div><dt>Potential</dt><dd>{currency(deal.estimatedValue)}</dd></div>
          <div><dt>Quantity</dt><dd>{deal.quantity?.toLocaleString('en-IN') || '—'}</dd></div>
          <div><dt>Deadline</dt><dd>{formatDate(deal.deadlineDate)}</dd></div>
          <div><dt>Last message</dt><dd>{formatDate(deal.lastMessageAt)}</dd></div>
          <div><dt>Waiting on</dt><dd>{deal.awaitingWhom || '—'}</dd></div>
        </dl>

        {deal.productInterest && deal.productInterest.length > 0 && (
          <section className="drawer-section">
            <span className="eyebrow">Products</span>
            <div className="tag-list">{deal.productInterest.map((item, index) => item.label && <span key={item.id || index}>{item.label}</span>)}</div>
          </section>
        )}
        {deal.blockers && deal.blockers.length > 0 && (
          <section className="drawer-section blockers-section">
            <span className="eyebrow">Blockers</span>
            <ul>{deal.blockers.map((item, index) => item.label && <li key={item.id || index}>{item.label}</li>)}</ul>
          </section>
        )}
      </aside>
    </div>
  )
}
