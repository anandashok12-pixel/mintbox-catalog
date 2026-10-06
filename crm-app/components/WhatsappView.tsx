'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { payloadFileUrl } from '@/lib/payload'
import type { Contact, Deal, Message, Stage, WhatsappSession } from '@/lib/types'
import { STAGES } from '@/lib/constants'
import { dealContactId, isClosed } from './DealLink'
import { AlertIcon, BackIcon, PhoneIcon, RefreshIcon, WhatsAppIcon } from './Icons'

function contactFor(message: Message): Contact | null {
  return typeof message.contact === 'object' ? message.contact : null
}

function formatDate(value?: string | null, withTime = true) {
  if (!value) return 'Never'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  }).format(new Date(value))
}

function isStale(value?: string | null) {
  return !value || Date.now() - new Date(value).getTime() > 15 * 60 * 1000
}

function sessionLabel(session: WhatsappSession | null) {
  if (!session) return 'Status unavailable'
  if (isStale(session.lastHeartbeatAt)) return 'Worker offline'
  const labels: Record<WhatsappSession['status'], string> = {
    never_connected: 'Not paired',
    needs_qr: 'Scan QR to pair',
    connecting: 'Connecting',
    connected: 'Connected',
    disconnected: 'Disconnected',
    logged_out: 'Logged out',
  }
  return labels[session.status]
}

/** Initial of the name shown in the list; a phone glyph for number-only contacts. */
function avatarFor(contact: Contact | null) {
  const label = contact?.company || contact?.name || ''
  if (!label || /^\+?\d/.test(label)) return <PhoneIcon width={15} height={15} />
  return label.slice(0, 1).toUpperCase()
}

function dealIdOf(message: Message): string | null {
  if (message.deal == null) return null
  return String(typeof message.deal === 'object' ? message.deal.id : message.deal)
}

const stageLabel = (stage: Stage) => STAGES.find((s) => s.value === stage)?.label || stage

interface Conversation {
  key: string
  contact: Contact | null
  messages: Message[]
  latest: Message
  /** Deal of the newest tagged message - what the chat is "tagged" as. */
  dealId: string | null
  /** Every deal any of its messages is filed under, newest first. */
  dealIds: string[]
}

function DealTag({ deal }: { deal: Deal }) {
  return <span className={`deal-tag deal-tag-${deal.stage}`} title={`${deal.title} · ${stageLabel(deal.stage)}`}>{deal.title}</span>
}

/**
 * Header control that files the whole chat under a deal. The contact's own
 * deals come first; any other open deal is offered too, so a supplier's
 * chat can sit under the customer deal it's sourcing for.
 */
function DealTagPicker({ conversation, deals, onTag, onTurnIntoDeal }: {
  conversation: Conversation
  deals: Deal[]
  onTag: (conversation: Conversation, dealId: string | null) => Promise<void>
  onTurnIntoDeal: (contact: Contact) => Promise<void>
}) {
  const [busy, setBusy] = useState(false)
  const contactId = conversation.contact?.id
  const own = deals.filter((deal) => contactId != null && String(dealContactId(deal)) === String(contactId))
  const others = deals.filter((deal) => !own.includes(deal) && (!isClosed(deal) || String(deal.id) === conversation.dealId))

  async function change(value: string) {
    setBusy(true)
    try {
      if (value === '__new__') { if (conversation.contact) await onTurnIntoDeal(conversation.contact) }
      else await onTag(conversation, value || null)
    } finally { setBusy(false) }
  }

  return (
    <label className={`deal-picker${conversation.dealId ? ' is-tagged' : ''}`}>
      <span>Deal</span>
      <select value={conversation.dealId || ''} disabled={busy} onChange={(event) => void change(event.target.value)} aria-label="Tag this chat with a deal">
        <option value="">{busy ? 'Saving…' : 'No deal'}</option>
        {own.length > 0 && (
          <optgroup label={`${conversation.contact?.company || conversation.contact?.name || 'This contact'}'s deals`}>
            {own.map((deal) => <option key={deal.id} value={String(deal.id)}>{deal.title} ({stageLabel(deal.stage)})</option>)}
          </optgroup>
        )}
        {others.length > 0 && (
          <optgroup label="Other open deals">
            {others.map((deal) => <option key={deal.id} value={String(deal.id)}>{deal.title} ({stageLabel(deal.stage)})</option>)}
          </optgroup>
        )}
        {conversation.contact && <option value="__new__">+ New deal from this chat</option>}
      </select>
    </label>
  )
}

export function WhatsappView({
  session,
  messages,
  loading,
  error,
  onRefresh,
  onRequestQr,
  deals,
  onOpenDeal,
  onTurnIntoDeal,
  onTagMessages,
}: {
  session: WhatsappSession | null
  messages: Message[]
  loading: boolean
  error: string
  onRefresh: () => Promise<void>
  onRequestQr: () => Promise<void>
  deals: Deal[]
  onOpenDeal: (deal: Deal) => void
  onTurnIntoDeal: (contact: Contact) => Promise<void>
  onTagMessages: (messages: Message[], dealId: string | null) => Promise<void>
}) {
  const conversations = useMemo<Conversation[]>(() => {
    const grouped = new Map<string, Message[]>()
    for (const message of messages) {
      const contact = contactFor(message)
      const key = String(contact?.id || message.contact)
      grouped.set(key, [...(grouped.get(key) || []), message])
    }
    return [...grouped.entries()].map(([key, rows]) => {
      const newestFirst = [...rows].sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
      const dealIds = [...new Set(newestFirst.map(dealIdOf).filter((id): id is string => id !== null))]
      return {
        key,
        contact: contactFor(rows[0]),
        messages: [...newestFirst].reverse(),
        latest: newestFirst[0],
        dealId: dealIds[0] || null,
        dealIds,
      }
    }).sort((a, b) => new Date(b.latest.sentAt).getTime() - new Date(a.latest.sentAt).getTime())
  }, [messages])
  const dealsById = useMemo(() => new Map(deals.map((deal) => [String(deal.id), deal])), [deals])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  // '' = all chats, 'tagged' / 'untagged', or a deal id to show just that deal's chats.
  const [filter, setFilter] = useState('')
  const taggedCount = conversations.filter((conversation) => conversation.dealId).length
  const dealFilters = useMemo(() => {
    const counts = new Map<string, number>()
    for (const conversation of conversations) for (const id of conversation.dealIds) counts.set(id, (counts.get(id) || 0) + 1)
    return [...counts.entries()].map(([id, count]) => ({ deal: dealsById.get(id), count })).filter((row): row is { deal: Deal; count: number } => Boolean(row.deal))
  }, [conversations, dealsById])
  const visible = conversations.filter((conversation) =>
    !filter ? true
      : filter === 'tagged' ? Boolean(conversation.dealId)
        : filter === 'untagged' ? !conversation.dealId
          : conversation.dealIds.includes(filter))

  const selected = conversations.find((conversation) => conversation.key === selectedKey) || visible[0] || null

  /**
   * Re-file the chat. Messages already under a closed (won/lost) deal that
   * isn't the chat's current tag are history of an earlier order, so they
   * stay where they are.
   */
  async function tagConversation(conversation: Conversation, dealId: string | null) {
    const rows = conversation.messages.filter((message) => {
      const current = dealIdOf(message)
      if (current === dealId) return false
      const currentDeal = current ? dealsById.get(current) : undefined
      return !(currentDeal && isClosed(currentDeal) && current !== conversation.dealId)
    })
    await onTagMessages(rows, dealId)
  }
  const qr = session?.qrMedia && typeof session.qrMedia === 'object' ? payloadFileUrl(session.qrMedia.url) : null
  const offline = !session || isStale(session.lastHeartbeatAt)
  const [requesting, setRequesting] = useState(false)
  const [requestError, setRequestError] = useState('')
  // A QR is only scannable while the worker is actively pairing; an old image
  // left over from an expired attempt would just fail on the phone.
  const showQr = qr && session?.status === 'needs_qr' && !offline
  const [requested, setRequested] = useState(false)
  const waitingForQr = requested && !showQr && session?.status !== 'connected'

  async function requestQr() {
    setRequesting(true)
    setRequestError('')
    try {
      await onRequestQr()
      // The worker checks every 10s; give WhatsApp a minute before offering the button again.
      setRequested(true)
      window.setTimeout(() => setRequested(false), 90_000)
    } catch (cause) {
      setRequestError(cause instanceof Error ? cause.message : 'Could not request a new QR code')
    } finally { setRequesting(false) }
  }

  return (
    <div className="whatsapp-view">
      <div className="whatsapp-statusbar">
        <div className={`connection-pill ${offline || session?.status !== 'connected' ? 'is-offline' : 'is-online'}`}>
          <span />
          <strong>{sessionLabel(session)}</strong>
        </div>
        <div className="status-detail"><span>Last heartbeat</span><strong>{formatDate(session?.lastHeartbeatAt)}</strong></div>
        <div className="status-detail"><span>Mirrored</span><strong>{messages.length} messages</strong></div>
        <div className="read-only-pill">Read only</div>
        <button className={`toolbar-button view-refresh ${loading ? 'spinning' : ''}`} onClick={onRefresh} disabled={loading}><RefreshIcon /> Refresh</button>
      </div>

      {error && <div className="inline-alert"><AlertIcon /><span>{error}</span></div>}

      {messages.length === 0 ? (
        <div className="mirror-empty">
          <section className="mirror-empty-main">
            <div className="empty-icon"><WhatsAppIcon /></div>
            <h2>No conversations have been mirrored</h2>
            <p>The CRM is ready to receive messages, but the WhatsApp companion worker is offline and pairing has not completed.</p>
            <dl className="mirror-checklist">
              <div className="complete"><dt>Webhook and database</dt><dd>Ready</dd></div>
              <div className={offline ? 'blocked' : 'complete'}><dt>Worker process</dt><dd>{offline ? 'Offline' : 'Running'}</dd></div>
              <div className="blocked"><dt>WhatsApp device</dt><dd>{session?.status === 'disconnected' ? 'Connection terminated' : sessionLabel(session)}</dd></div>
              <div><dt>Context extraction</dt><dd>Waiting for messages</dd></div>
            </dl>
          </section>
          <aside className="pairing-panel">
            <h3>{showQr ? 'Scan to connect' : 'Pairing required'}</h3>
            {showQr ? (
              <>
                <Image src={qr} alt="WhatsApp pairing QR code" width={220} height={220} unoptimized />
                <small className="qr-note">The code refreshes by itself every ~20 seconds. Scan the one on screen.</small>
              </>
            ) : (
              <div className="qr-placeholder">
                <WhatsAppIcon />
                <span>{offline ? 'The WhatsApp worker is offline. It must be running before you can pair.' : waitingForQr ? 'Getting a QR code from WhatsApp…' : 'Have the sales phone in hand, then get a QR code. You have about 3 minutes to scan it.'}</span>
                {!offline && !waitingForQr && <button type="button" className="toolbar-button primary" onClick={requestQr} disabled={requesting}>{requesting ? 'Requesting…' : 'Get a new QR code'}</button>}
              </div>
            )}
            {requestError && <div className="inline-alert"><AlertIcon /><span>{requestError}</span></div>}
            <p>On the sales phone, open <strong>WhatsApp → Linked devices → Link a device</strong>. The mirror does not send messages or mark them read.</p>
            {session?.lastError && <div className="last-error"><span>Last connection error</span><code>{session.lastError}</code></div>}
          </aside>
        </div>
      ) : (
        <div className={`inbox-shell${selectedKey ? ' has-selection' : ''}`}>
          <aside className="conversation-list">
            <header>
              <h2>Conversations</h2>
              <select className="conversation-filter" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter chats by deal">
                <option value="">All chats ({conversations.length})</option>
                <option value="tagged">Tagged to a deal ({taggedCount})</option>
                <option value="untagged">No deal ({conversations.length - taggedCount})</option>
                {dealFilters.length > 0 && (
                  <optgroup label="By deal">
                    {dealFilters.map(({ deal, count }) => <option key={deal.id} value={String(deal.id)}>{deal.title} ({count})</option>)}
                  </optgroup>
                )}
              </select>
            </header>
            {visible.length === 0 && <p className="conversation-empty">No chats match this filter.</p>}
            {visible.map((conversation) => (
              <button key={conversation.key} className={selected?.key === conversation.key ? 'active' : ''} onClick={() => setSelectedKey(conversation.key)}>
                <span className="contact-avatar">{avatarFor(conversation.contact)}</span>
                <span className="conversation-copy">
                  <strong>{conversation.contact?.company || conversation.contact?.name || 'Unknown contact'}</strong>
                  <small>{conversation.latest.preview || conversation.latest.body || 'Media message'}</small>
                  {conversation.dealIds.length > 0 && (
                    <span className="deal-tags">
                      {conversation.dealIds.map((id) => dealsById.get(id)).filter((deal): deal is Deal => Boolean(deal)).map((deal) => <DealTag key={deal.id} deal={deal} />)}
                    </span>
                  )}
                </span>
                <time>{formatDate(conversation.latest.sentAt, false)}</time>
              </button>
            ))}
          </aside>
          <section className="chat-panel">
            <header>
              <button type="button" className="back-button" onClick={() => setSelectedKey(null)} aria-label="Back to list"><BackIcon /></button>
              <div className="chat-title"><strong>{selected?.contact?.company || selected?.contact?.name}</strong><span>{selected?.contact?.phoneE164} · {selected?.messages.length} messages</span></div>
              <div className="chat-actions">
                {selected && <DealTagPicker key={selected.key} conversation={selected} deals={deals} onTag={tagConversation} onTurnIntoDeal={onTurnIntoDeal} />}
                {selected?.dealId && dealsById.get(selected.dealId) && <button type="button" className="toolbar-button" onClick={() => onOpenDeal(dealsById.get(selected.dealId!)!)}>Open deal</button>}
              </div>
            </header>
            <div className="message-timeline">
              {selected?.messages.map((message) => (
                <div key={message.id} className={`message-row ${message.direction}`}>
                  <div className="message-bubble">
                    <p>{message.body || 'Media message'}</p>
                    <time>{formatDate(message.sentAt)}</time>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
