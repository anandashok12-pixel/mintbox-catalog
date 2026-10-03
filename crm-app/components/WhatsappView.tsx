'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { payloadFileUrl } from '@/lib/payload'
import type { Contact, Deal, Message, WhatsappSession } from '@/lib/types'
import { DealLink } from './DealLink'
import { AlertIcon, BackIcon, RefreshIcon, WhatsAppIcon } from './Icons'

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

interface Conversation {
  key: string
  contact: Contact | null
  messages: Message[]
  latest: Message
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
}) {
  const conversations = useMemo<Conversation[]>(() => {
    const grouped = new Map<string, Message[]>()
    for (const message of messages) {
      const contact = contactFor(message)
      const key = String(contact?.id || message.contact)
      grouped.set(key, [...(grouped.get(key) || []), message])
    }
    return [...grouped.entries()].map(([key, rows]) => ({
      key,
      contact: contactFor(rows[0]),
      messages: [...rows].sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()),
      latest: [...rows].sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())[0],
    })).sort((a, b) => new Date(b.latest.sentAt).getTime() - new Date(a.latest.sentAt).getTime())
  }, [messages])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const selected = conversations.find((conversation) => conversation.key === selectedKey) || conversations[0] || null
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
        <button className={`toolbar-button ${loading ? 'spinning' : ''}`} onClick={onRefresh} disabled={loading}><RefreshIcon /> Refresh</button>
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
            <header><h2>Conversations</h2><span>{conversations.length}</span></header>
            {conversations.map((conversation) => (
              <button key={conversation.key} className={selected?.key === conversation.key ? 'active' : ''} onClick={() => setSelectedKey(conversation.key)}>
                <span className="contact-avatar">{(conversation.contact?.name || '?').slice(0, 1).toUpperCase()}</span>
                <span className="conversation-copy">
                  <strong>{conversation.contact?.company || conversation.contact?.name || 'Unknown contact'}</strong>
                  <small>{conversation.latest.preview || conversation.latest.body || 'Media message'}</small>
                </span>
                <time>{formatDate(conversation.latest.sentAt, false)}</time>
              </button>
            ))}
          </aside>
          <section className="chat-panel">
            <header>
              <button type="button" className="back-button" onClick={() => setSelectedKey(null)} aria-label="Back to list"><BackIcon /></button>
              <div><strong>{selected?.contact?.company || selected?.contact?.name}</strong><span>{selected?.contact?.phoneE164}</span></div>
              <span className="message-count">{selected?.messages.length} messages</span>
              <DealLink contact={selected?.contact || null} deals={deals} onOpenDeal={onOpenDeal} onTurnIntoDeal={onTurnIntoDeal} />
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
