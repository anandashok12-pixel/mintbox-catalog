'use client'

import { useState } from 'react'
import type { Contact, Deal } from '@/lib/types'
import { PlusIcon } from './Icons'

/** The contact's most recent open deal, if any. */
export function openDealFor(deals: Deal[], contact: Contact | null): Deal | null {
  if (!contact) return null
  return deals
    .filter((deal) => (typeof deal.contact === 'object' ? deal.contact.id : deal.contact) === contact.id && deal.stage !== 'won' && deal.stage !== 'lost')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0] || null
}

export function dealContactId(deal: Deal) {
  return typeof deal.contact === 'object' ? deal.contact.id : deal.contact
}

export function isClosed(deal: Deal) {
  return deal.stage === 'won' || deal.stage === 'lost'
}

/**
 * Conversation-header button: "Open deal" when the person already has an
 * open deal, otherwise "Turn into deal" (chats never create deals by
 * themselves - someone decides it's a real enquiry).
 */
export function DealLink({ contact, deals, onOpenDeal, onTurnIntoDeal }: {
  contact: Contact | null
  deals: Deal[]
  onOpenDeal: (deal: Deal) => void
  onTurnIntoDeal: (contact: Contact) => Promise<void>
}) {
  const [busy, setBusy] = useState(false)
  if (!contact) return null
  const open = openDealFor(deals, contact)
  if (open) return <button type="button" className="toolbar-button" onClick={() => onOpenDeal(open)}>Open deal</button>
  return (
    <button type="button" className="toolbar-button primary" disabled={busy} onClick={async () => {
      setBusy(true)
      try { await onTurnIntoDeal(contact) } finally { setBusy(false) }
    }}>
      <PlusIcon /> {busy ? 'Creating…' : 'Turn into deal'}
    </button>
  )
}
