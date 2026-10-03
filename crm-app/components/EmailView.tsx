'use client'

import { useEffect, useMemo, useState } from 'react'
import { draftEmail, getEmailSignatures, saveEmailSignatures, sendEmail, startGmailConnect, type EmailSignature } from '@/lib/payload'
import type { Contact, GmailSyncState, Message } from '@/lib/types'
import { AlertIcon, BackIcon, CloseIcon, EyeIcon, MailIcon, PlusIcon, RefreshIcon, SendIcon } from './Icons'

export const MAILBOXES = ['anand@themintbox.in', 'hello@themintbox.in', 'ashok.kumar@themintbox.in']

export interface EmailFocus {
  contactId?: string | number
  dealId?: string | number
  to?: string
}

function contactFor(message: Message): Contact | null {
  return typeof message.contact === 'object' ? message.contact : null
}

function dealIdFor(message: Message): string | number | undefined {
  if (!message.deal) return undefined
  return typeof message.deal === 'object' ? message.deal.id : message.deal
}

function formatDate(value?: string | null, withTime = true) {
  if (!value) return 'Never'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  }).format(new Date(value))
}

/** True when the address sent, received or was cc'd on this message. */
export function involves(message: Message, email: string) {
  const needle = email.trim().toLowerCase()
  if (!needle) return false
  const list = (value?: string | null) => (value || '').toLowerCase().split(',').map((a) => a.trim())
  return (message.fromEmail || '').toLowerCase() === needle || list(message.toEmails).includes(needle) || list(message.ccEmails).includes(needle)
}

/** The other party on a message, from our side's point of view. */
function counterparty(message: Message) {
  return (message.direction === 'inbound' ? message.fromEmail : (message.toEmails || '').split(',')[0])?.trim().toLowerCase() || ''
}

export function openLabel(message: Message) {
  if (message.direction !== 'outbound' || !message.trackingToken) return null
  if (!message.openedAt) return { text: 'Not opened yet', opened: false }
  const n = message.openCount || 1
  return { text: `Opened${n > 1 ? ` ${n}×` : ''} · ${formatDate(message.lastOpenedAt || message.openedAt)}`, opened: true }
}

type Compose = {
  mailbox: string
  to: string
  cc: string
  subject: string
  body: string
  replyTo?: Message
  contactId?: string | number
  dealId?: string | number
  withSignature: boolean
  aiPrompt: string
}

interface Thread {
  key: string
  contact: Contact | null
  messages: Message[]
  latest: Message
  subject: string
}

export function EmailView({
  token,
  messages,
  sync,
  loading,
  error,
  focus,
  onRefresh,
  onSent,
}: {
  token: string
  messages: Message[]
  sync: GmailSyncState | null
  loading: boolean
  error: string
  focus: EmailFocus | null
  onRefresh: () => Promise<void>
  onSent: (message: Message) => void
}) {
  const [mailboxFilter, setMailboxFilter] = useState<string>('all')
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const blank = (extra: Partial<Compose> = {}): Compose => ({ mailbox: MAILBOXES[0], to: '', cc: '', subject: '', body: '', withSignature: true, aiPrompt: '', ...extra })
  const [compose, setCompose] = useState<Compose | null>(
    // A "new email" request from a deal drawer remounts this view (keyed in CrmApp) with the composer open.
    focus ? blank({ to: focus.to || '', contactId: focus.contactId, dealId: focus.dealId }) : null,
  )
  const [personFilter, setPersonFilter] = useState<string | null>(focus?.to?.trim().toLowerCase() || null)
  const [drafting, setDrafting] = useState(false)
  const [signatures, setSignatures] = useState<EmailSignature[]>([])
  const [editingSignatures, setEditingSignatures] = useState<EmailSignature[] | null>(null)
  const [savingSignatures, setSavingSignatures] = useState(false)

  useEffect(() => {
    getEmailSignatures(token).then(setSignatures).catch(() => undefined)
  }, [token])
  const signatureFor = (mailbox: string) => signatures.find((s) => s.mailbox === mailbox)?.signature?.trim() || ''
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const threads = useMemo<Thread[]>(() => {
    const grouped = new Map<string, Message[]>()
    for (const m of messages) {
      if (mailboxFilter !== 'all' && m.mailbox !== mailboxFilter) continue
      if (personFilter && !involves(m, personFilter)) continue
      const key = m.threadId || `m${m.id}`
      grouped.set(key, [...(grouped.get(key) || []), m])
    }
    return [...grouped.entries()]
      .map(([key, rows]) => {
        const sorted = [...rows].sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
        return { key, contact: contactFor(sorted[0]), messages: sorted, latest: sorted[sorted.length - 1], subject: sorted[0].subject || '(no subject)' }
      })
      .sort((a, b) => new Date(b.latest.sentAt).getTime() - new Date(a.latest.sentAt).getTime())
  }, [messages, mailboxFilter, personFilter])

  const selected = threads.find((t) => t.key === selectedKey) || threads[0] || null
  const accounts = sync?.accounts || []
  const failing = accounts.filter((a) => a.lastError)
  const lastSuccess = accounts.map((a) => a.lastSuccessAt).filter(Boolean).sort().pop()
  const [connecting, setConnecting] = useState<string | null>(null)
  const [connectError, setConnectError] = useState('')
  const isConnected = (mailbox: string) => { const row = accounts.find((a) => a.mailbox === mailbox); return Boolean(row?.connectedAt || row?.lastSuccessAt) }

  // Google's consent screen opens in a new tab; when the user comes back,
  // reload so the mailbox flips to "connected".
  useEffect(() => {
    if (!connecting) return
    const onFocus = () => { setConnecting(null); void onRefresh() }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [connecting, onRefresh])

  async function connect(mailbox: string) {
    setConnectError('')
    // Open synchronously so the popup isn't blocked, then point it at Google.
    const tab = window.open('about:blank', '_blank')
    try {
      const url = await startGmailConnect(token, mailbox)
      if (tab) tab.location.replace(url)
      else window.location.assign(url)
      setConnecting(mailbox)
    } catch (cause) {
      tab?.close()
      setConnectError(cause instanceof Error ? cause.message : 'Could not start Gmail connect')
    }
  }

  function startReply(thread: Thread) {
    const last = [...thread.messages].reverse().find((m) => m.direction === 'inbound') || thread.latest
    const counterparty = last.direction === 'inbound' ? last.fromEmail : (thread.latest.toEmails || '').split(',')[0].trim()
    setSendError('')
    setCompose(blank({
      mailbox: thread.latest.mailbox || MAILBOXES[0],
      to: counterparty || thread.contact?.email || '',
      subject: thread.subject,
      replyTo: thread.latest,
      contactId: thread.contact?.id,
      dealId: dealIdFor(thread.latest),
    }))
  }

  async function generate() {
    if (!compose) return
    setDrafting(true)
    setSendError('')
    try {
      const draft = await draftEmail(token, {
        mailbox: compose.mailbox,
        to: compose.to,
        subject: compose.subject,
        instructions: compose.aiPrompt,
        currentDraft: compose.body || undefined,
        contactId: compose.contactId,
        dealId: compose.dealId,
      })
      setCompose((current) => current && {
        ...current,
        body: draft.body,
        // Replies keep their "Re:" subject; new emails take the AI's.
        subject: current.replyTo || current.subject.trim() ? current.subject : draft.subject,
      })
    } catch (cause) {
      setSendError(cause instanceof Error ? cause.message : 'Could not draft the email')
    } finally {
      setDrafting(false)
    }
  }

  async function saveSignatures() {
    if (!editingSignatures) return
    setSavingSignatures(true)
    try {
      await saveEmailSignatures(token, editingSignatures)
      setSignatures(editingSignatures)
      setEditingSignatures(null)
    } catch (cause) {
      setSendError(cause instanceof Error ? cause.message : 'Could not save signatures')
    } finally {
      setSavingSignatures(false)
    }
  }

  async function submit() {
    if (!compose) return
    setSending(true)
    setSendError('')
    try {
      const sent = await sendEmail(token, {
        mailbox: compose.mailbox,
        to: compose.to,
        cc: compose.cc || undefined,
        subject: compose.subject,
        body: compose.body,
        contactId: compose.contactId,
        dealId: compose.dealId,
        replyToMessageId: compose.replyTo?.id,
        signature: compose.withSignature,
      })
      setCompose(null)
      onSent(sent)
      setSelectedKey(sent.threadId || null)
    } catch (cause) {
      setSendError(cause instanceof Error ? cause.message : 'Could not send')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="whatsapp-view email-view">
      <div className="whatsapp-statusbar">
        <div className={`connection-pill ${failing.length || !accounts.length ? 'is-offline' : 'is-online'}`}>
          <span /><strong>{!accounts.length ? 'Not synced yet' : failing.length ? `${failing.length} mailbox error` : 'Syncing'}</strong>
        </div>
        <div className="status-detail"><span>Last sync</span><strong>{formatDate(lastSuccess)}</strong></div>
        <div className="status-detail"><span>Mailboxes</span><strong>{MAILBOXES.length}</strong></div>
        <div className="mailbox-filter">
          {['all', ...MAILBOXES].map((box) => (
            <button key={box} className={mailboxFilter === box ? 'active' : ''} onClick={() => setMailboxFilter(box)}>{box === 'all' ? 'All' : box.split('@')[0]}</button>
          ))}
        </div>
        <button className="toolbar-button" onClick={() => setEditingSignatures(MAILBOXES.map((mailbox) => ({ mailbox, signature: signatureFor(mailbox) })))}>Signatures</button>
        <button className="toolbar-button" onClick={() => { setSendError(''); setCompose(blank({ to: personFilter || '' })) }}><PlusIcon /> New email</button>
        <button className={`toolbar-button ${loading ? 'spinning' : ''}`} onClick={onRefresh} disabled={loading}><RefreshIcon /> Refresh</button>
      </div>

      <div className="mailbox-connect">
        {MAILBOXES.map((box) => isConnected(box) ? (
          <span key={box} className="mailbox-chip is-connected">{box}<small>Connected</small></span>
        ) : (
          <button key={box} type="button" className="mailbox-chip" onClick={() => connect(box)} disabled={connecting === box}>
            {box}<small>{connecting === box ? 'Waiting for Google…' : 'Connect'}</small>
          </button>
        ))}
      </div>
      {connectError && <div className="inline-alert"><AlertIcon /><span>{connectError}</span></div>}

      {(error || failing.length > 0) && (
        <div className="inline-alert"><AlertIcon /><span>{error || failing.map((a) => `${a.mailbox}: ${a.lastError}`).join(' · ')}</span></div>
      )}

      {personFilter && (
        <div className="person-filter">
          <span>All mail with <strong>{personFilter}</strong> · {threads.length} thread{threads.length === 1 ? '' : 's'}</span>
          <button type="button" className="icon-button" onClick={() => setPersonFilter(null)} aria-label="Show all mail"><CloseIcon /></button>
        </div>
      )}

      {threads.length === 0 ? (
        <div className="mirror-empty">
          <section className="mirror-empty-main">
            <div className="empty-icon"><MailIcon /></div>
            <h2>No emails synced yet</h2>
            <p>Mail from {MAILBOXES.join(', ')} appears here after the first Gmail sync runs (every 5 minutes). If nothing arrives, connect each mailbox above, then check the sync errors.</p>
          </section>
        </div>
      ) : (
        <div className={`inbox-shell${selectedKey ? ' has-selection' : ''}`}>
          <aside className="conversation-list">
            <header><h2>Threads</h2><span>{threads.length}</span></header>
            {threads.map((t) => {
              const status = openLabel(t.latest)
              return (
                <button key={t.key} className={selected?.key === t.key ? 'active' : ''} onClick={() => setSelectedKey(t.key)}>
                  <span className="contact-avatar">{(t.contact?.name || '?').slice(0, 1).toUpperCase()}</span>
                  <span className="conversation-copy">
                    <strong>{t.contact?.company || t.contact?.name || 'Unknown'}</strong>
                    <small>{t.subject}</small>
                    {status && <small className={status.opened ? 'open-yes' : 'open-no'}>{status.text}</small>}
                  </span>
                  <time>{formatDate(t.latest.sentAt, false)}</time>
                </button>
              )
            })}
          </aside>
          <section className="chat-panel">
            <header>
<button type="button" className="back-button" onClick={() => setSelectedKey(null)} aria-label="Back to list"><BackIcon /></button>
              <div>
                <strong>{selected?.subject}</strong>
                <span>
                  {selected?.contact?.name}
                  {selected && counterparty(selected.latest) && !personFilter && (
                    <> · <button type="button" className="link-button" onClick={() => setPersonFilter(counterparty(selected.latest))}>All mail with {counterparty(selected.latest)}</button></>
                  )}
                </span>
              </div>
              {selected && <button className="toolbar-button" onClick={() => startReply(selected)}><SendIcon /> Reply</button>}
            </header>
            <div className="message-timeline">
              {selected?.messages.map((m) => {
                const status = openLabel(m)
                return (
                  <div key={m.id} className={`message-row ${m.direction}`}>
                    <div className="message-bubble email-bubble">
                      <small className="email-meta">{m.direction === 'inbound' ? `From ${m.fromEmail}` : `${m.fromEmail} → ${m.toEmails}`}</small>
                      <p>{m.body}</p>
                      <time>
                        {status && <span className={`open-badge ${status.opened ? 'open-yes' : 'open-no'}`}><EyeIcon /> {status.text}</span>}
                        {formatDate(m.sentAt)}
                      </time>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      )}

      {compose && (
        <div className="compose-layer" role="dialog" aria-modal="true" aria-label="Compose email">
          <button className="drawer-backdrop" onClick={() => !sending && setCompose(null)} aria-label="Close composer" />
          <form className="compose-card" onSubmit={(event) => { event.preventDefault(); void submit() }}>
            <h3>{compose.replyTo ? 'Reply' : 'New email'}</h3>
            <label>From
              <select value={compose.mailbox} onChange={(e) => setCompose({ ...compose, mailbox: e.target.value })}>
                {MAILBOXES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </label>
            <label>To<input value={compose.to} onChange={(e) => setCompose({ ...compose, to: e.target.value })} placeholder="name@company.com" required /></label>
            <label>Cc<input value={compose.cc} onChange={(e) => setCompose({ ...compose, cc: e.target.value })} /></label>
            <label>Subject<input value={compose.subject} onChange={(e) => setCompose({ ...compose, subject: e.target.value })} required /></label>
            <div className="ai-draft">
              <label>Write with AI
                <textarea rows={2} value={compose.aiPrompt} onChange={(e) => setCompose({ ...compose, aiPrompt: e.target.value })}
                  placeholder={compose.body ? 'e.g. "make it shorter and friendlier"' : 'e.g. "Share 3 Diwali hamper options under ₹1,200 incl. GST for 170 people and ask for their delivery date"'} />
              </label>
              <button type="button" className="toolbar-button" onClick={generate} disabled={drafting || (!compose.aiPrompt.trim() && !compose.body.trim())}>
                {drafting ? 'Writing…' : compose.body ? 'Rewrite with AI' : 'Generate draft'}
              </button>
              <small>Uses the full email and WhatsApp history with this person and the deal details. Always check the draft before sending.</small>
            </div>
            <label>Message<textarea rows={9} value={compose.body} onChange={(e) => setCompose({ ...compose, body: e.target.value })} required /></label>
            <div className="signature-row">
              <label className="check-label"><input type="checkbox" checked={compose.withSignature} onChange={(e) => setCompose({ ...compose, withSignature: e.target.checked })} /> Add signature</label>
              <button type="button" className="link-button" onClick={() => setEditingSignatures(MAILBOXES.map((mailbox) => ({ mailbox, signature: signatureFor(mailbox) })))}>Edit signatures</button>
            </div>
            {compose.withSignature && (signatureFor(compose.mailbox)
              ? <pre className="signature-preview">{signatureFor(compose.mailbox)}</pre>
              : <small className="signature-empty">No signature saved for {compose.mailbox} yet.</small>)}
            {sendError && <div className="inline-alert"><AlertIcon /><span>{sendError}</span></div>}
            <div className="compose-actions">
              <small>Opens are tracked with a pixel — a soft signal, not proof.</small>
              <button type="button" className="toolbar-button" onClick={() => setCompose(null)} disabled={sending}>Cancel</button>
              <button type="submit" className="toolbar-button primary" disabled={sending}><SendIcon /> {sending ? 'Sending…' : 'Send'}</button>
            </div>
          </form>
        </div>
      )}

      {editingSignatures && (
        <div className="compose-layer" role="dialog" aria-modal="true" aria-label="Email signatures">
          <button className="drawer-backdrop" onClick={() => !savingSignatures && setEditingSignatures(null)} aria-label="Close signatures" />
          <form className="compose-card" onSubmit={(event) => { event.preventDefault(); void saveSignatures() }}>
            <h3>Email signatures</h3>
            <small className="signature-empty">Added below your message when sending. Plain text; one line per row.</small>
            {editingSignatures.map((row, index) => (
              <label key={row.mailbox}>{row.mailbox}
                <textarea rows={4} value={row.signature || ''} placeholder={'Anand Ashok\nMintBox · themintbox.in\n+91 …'}
                  onChange={(e) => setEditingSignatures(editingSignatures.map((r, i) => i === index ? { ...r, signature: e.target.value } : r))} />
              </label>
            ))}
            <div className="compose-actions">
              <button type="button" className="toolbar-button" onClick={() => setEditingSignatures(null)} disabled={savingSignatures}>Cancel</button>
              <button type="submit" className="toolbar-button primary" disabled={savingSignatures}>{savingSignatures ? 'Saving…' : 'Save signatures'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
