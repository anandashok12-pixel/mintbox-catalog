'use client'

import { KeyboardEvent, useState } from 'react'
import type { Contact, Deal, DealTask, Message, Stage } from '@/lib/types'
import { payloadAdminDealUrl } from '@/lib/payload'
import { CONTACT_CHANNELS, LEAD_SOURCES, OCCASIONS, STAGES } from '@/lib/constants'
import { CheckIcon, CloseIcon, ExternalIcon, MailIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from './Icons'
import { involves, openLabel, type EmailFocus } from './EmailView'
import { DueBadge, DuePicker, dueBucket, fromDateKey, inDays } from './DueDate'

function contactFor(deal: Deal) {
  return typeof deal.contact === 'object' ? deal.contact : null
}

function formatDate(value?: string | null) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}

function formatDateTime(value?: string | null) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
}

const AWAITING = [
  { label: 'Us', value: 'us' },
  { label: 'Them', value: 'them' },
  { label: 'Nobody', value: 'nobody' },
]

function unitValue(deal: Deal) {
  const { unitBudgetMin: min, unitBudgetMax: max } = deal
  if (min != null && max != null) return Math.round((min + max) / 2)
  return min ?? max ?? null
}

function toNumber(raw: string) {
  const cleaned = raw.replace(/[^\d.]/g, '')
  if (!cleaned) return null
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`edit-field${wide ? ' edit-field-wide' : ''}`}><span>{label}</span>{children}</label>
}

// Uncontrolled-ish text input: edits locally, saves on blur only when changed.
function TextField({ label, value, onSave, type = 'text', placeholder, wide }: {
  label: string; value: string; onSave: (value: string) => void; type?: string; placeholder?: string; wide?: boolean
}) {
  const [draft, setDraft] = useState(value)
  const [prev, setPrev] = useState(value)
  if (value !== prev) { setPrev(value); setDraft(value) }
  return (
    <Field label={label} wide={wide}>
      <input type={type} value={draft} placeholder={placeholder || '—'} onChange={(e) => setDraft(e.target.value)}
        onBlur={() => { if (draft.trim() !== value) onSave(draft.trim()) }}
        onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }} />
    </Field>
  )
}

function NumberField({ label, value, onSave, prefix }: {
  label: string; value: number | null | undefined; onSave: (value: number | null) => void; prefix?: string
}) {
  const shown = value == null ? '' : String(value)
  const [draft, setDraft] = useState(shown)
  const [prev, setPrev] = useState(shown)
  if (shown !== prev) { setPrev(shown); setDraft(shown) }
  return (
    <Field label={label}>
      <span className="edit-number">
        {prefix && <em>{prefix}</em>}
        <input inputMode="decimal" value={draft} placeholder="—" onChange={(e) => setDraft(e.target.value)}
          onBlur={() => { const n = toNumber(draft); if (n !== (value ?? null)) onSave(n) }}
          onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }} />
      </span>
    </Field>
  )
}

function SelectField({ label, value, options, onSave }: {
  label: string; value: string; options: { label: string; value: string }[]; onSave: (value: string) => void
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onSave(e.target.value)}>
        <option value="">—</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  )
}

function SummaryEditor({ value, onSave }: { value: string; onSave: (value: string) => void }) {
  const [draft, setDraft] = useState(value)
  return <textarea className="remarks-input" value={draft} rows={6} onChange={(e) => setDraft(e.target.value)}
    onBlur={() => { if (draft !== value) onSave(draft) }} placeholder="No extracted summary yet." />
}

interface DealDrawerProps {
  deal: Deal | null
  emails: Message[]
  onCompose: (focus: EmailFocus) => void
  onClose: () => void
  onPatch: (patch: Partial<Deal>) => Promise<void>
  onPatchContact: (patch: Partial<Contact>) => Promise<void>
}

// Keyed by deal.id from the parent (see CrmApp.tsx) so switching deals
// remounts this with fresh local state, instead of syncing it via an effect.
export function DealDrawer({ deal, emails, onCompose, onClose, onPatch, onPatchContact }: DealDrawerProps) {
  const [remarks, setRemarks] = useState(deal?.remarks || '')
  const [newTask, setNewTask] = useState('')
  const [newTaskDue, setNewTaskDue] = useState(inDays(1))
  const [openThread, setOpenThread] = useState<string | null>(null)

  if (!deal) return null
  const contact = contactFor(deal)
  const phone = contact?.phoneE164
  const tasks = deal.tasks || []
  // Every email with this person, not just ones the extractor linked to the deal.
  const contactEmail = contact?.email?.trim().toLowerCase() || ''
  const related = emails.filter((m) =>
    (typeof m.deal === 'object' ? m.deal?.id : m.deal) === deal.id ||
    (contact && (typeof m.contact === 'object' ? m.contact.id : m.contact) === contact.id) ||
    (contactEmail && involves(m, contactEmail)))
  const emailThreads = [...related.reduce((map, m) => {
    const key = m.threadId || `m${m.id}`
    map.set(key, [...(map.get(key) || []), m])
    return map
  }, new Map<string, Message[]>()).entries()]
    .map(([key, rows]) => ({ key, messages: rows.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()) }))
    .sort((a, b) => new Date(b.messages[b.messages.length - 1].sentAt).getTime() - new Date(a.messages[a.messages.length - 1].sentAt).getTime())

  const quantity = deal.quantity ?? null
  const perHamper = unitValue(deal)

  function save(patch: Partial<Deal>) { void onPatch(patch).catch(() => undefined) }
  function saveContact(patch: Partial<Contact>) { void onPatchContact(patch).catch(() => undefined) }

  // Quantity x value-per-hamper is the source of truth for the total whenever
  // either changes; the total can still be overridden directly afterwards.
  function saveQuantity(next: number | null) {
    save({ quantity: next, ...(next != null && perHamper != null ? { estimatedValue: next * perHamper } : {}) })
  }
  function savePerHamper(next: number | null) {
    save({ unitBudgetMin: next, unitBudgetMax: next, ...(next != null && quantity != null ? { estimatedValue: quantity * next } : {}) })
  }

  function saveRemarks() {
    if (remarks !== (deal!.remarks || '')) void onPatch({ remarks })
  }

  function addTask() {
    const label = newTask.trim()
    const dueDate = fromDateKey(newTaskDue)
    if (!label || !dueDate) return
    void onPatch({ tasks: [...tasks, { label, done: false, dueDate }] })
    setNewTask('')
    setNewTaskDue(inDays(1))
  }

  function setTaskDue(index: number, dueDate: string) {
    void onPatch({ tasks: tasks.map((task, i) => i === index ? { ...task, dueDate } : task) })
  }

  const firstName = contact?.name?.split(' ')[0] || 'them'
  const quickTasks = [`Follow up with ${firstName}`, 'Send quote', `Call ${firstName}`, 'Send samples']
  // Open to-dos soonest first; done ones sink to the bottom.
  const orderedTasks = tasks
    .map((task, index) => ({ task, index }))
    .sort((a, b) => Number(!!a.task.done) - Number(!!b.task.done) ||
      (a.task.dueDate ? new Date(a.task.dueDate).getTime() : Infinity) - (b.task.dueDate ? new Date(b.task.dueDate).getTime() : Infinity))
  const overdueTasks = tasks.filter((task) => !task.done && dueBucket(task.dueDate) === 'overdue').length

  function addTaskOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      addTask()
    }
  }

  function toggleTask(index: number) {
    const next: DealTask[] = tasks.map((task, i) => i === index
      ? { ...task, done: !task.done, doneAt: !task.done ? new Date().toISOString() : null }
      : task)
    void onPatch({ tasks: next })
  }

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
          {phone && <a className="action-button action-button-call" href={`tel:${phone}`}><PhoneIcon /> Call</a>}
          <a className="action-button" href={payloadAdminDealUrl(deal.id)} target="_blank" rel="noreferrer"><ExternalIcon /> Full record</a>
        </div>

        <section className="drawer-section">
          <span className="eyebrow">Contact</span>
          <div className="edit-grid">
            <TextField label="Name" value={contact?.name || ''} onSave={(name) => name && saveContact({ name })} />
            <TextField label="Company" value={contact?.company || ''} onSave={(company) => saveContact({ company })} />
            <TextField label="Email" type="email" value={contact?.email || ''} onSave={(email) => saveContact({ email })} />
            <TextField label="Mobile" type="tel" value={contact?.phoneE164 || ''} onSave={(phoneE164) => saveContact({ phoneE164 })} placeholder="+91…" />
          </div>
        </section>

        <section className="drawer-section">
          <span className="eyebrow">Deal</span>
          <div className="edit-grid">
            <TextField wide label="Deal title" value={deal.title} onSave={(title) => title && save({ title })} />
            <SelectField label="Stage" value={deal.stage} options={STAGES} onSave={(stage) => stage && save({ stage: stage as Stage, stageSetManually: true })} />
            <SelectField label="Occasion" value={deal.occasion || ''} options={OCCASIONS} onSave={(v) => save({ occasion: v || null })} />
            <TextField label="Deadline" type="date" value={deal.deadlineDate ? deal.deadlineDate.slice(0, 10) : ''} onSave={(d) => save({ deadlineDate: d ? new Date(d).toISOString() : null })} />
            <SelectField label="Waiting on" value={deal.awaitingWhom || ''} options={AWAITING} onSave={(v) => save({ awaitingWhom: (v || null) as Deal['awaitingWhom'] })} />
            <NumberField label="Quantity" value={quantity} onSave={saveQuantity} />
            <NumberField label="Value per hamper" prefix="₹" value={perHamper} onSave={savePerHamper} />
            <NumberField label="Total estimated" prefix="₹" value={deal.estimatedValue} onSave={(estimatedValue) => save({ estimatedValue })} />
            <div className="edit-hint">
              {quantity != null && perHamper != null
                ? `${quantity.toLocaleString('en-IN')} × ₹${perHamper.toLocaleString('en-IN')} = ₹${(quantity * perHamper).toLocaleString('en-IN')}`
                : 'Enter quantity and value per hamper to calculate the total.'}
            </div>
            <SelectField label="Lead source" value={deal.leadSource || ''} options={LEAD_SOURCES} onSave={(v) => save({ leadSource: (v || null) as Deal['leadSource'] })} />
            <SelectField label="Contacted via" value={deal.contactChannel || ''} options={CONTACT_CHANNELS} onSave={(v) => save({ contactChannel: (v || null) as Deal['contactChannel'] })} />
            <TextField wide label="Next move" value={deal.nextAction || ''} onSave={(nextAction) => save({ nextAction })} placeholder="Nothing concrete is scheduled" />
          </div>
          <p className="edit-meta">Last message {formatDate(deal.lastMessageAt)} · Updated {formatDate(deal.updatedAt)}</p>
        </section>

        <section className="drawer-section drawer-summary">
          <span className="eyebrow">Situation</span>
          <SummaryEditor value={deal.summary || ''} onSave={(summary) => save({ summary })} />
        </section>

        {deal.attribution && (
          <section className="drawer-section">
            <span className="eyebrow">Attribution</span>
            <p>{deal.attribution}</p>
          </section>
        )}

        <section className="drawer-section">
          <span className="eyebrow">Email</span>
          <ul className="drawer-emails">
            {emailThreads.map((thread) => {
              const first = thread.messages[0]
              const last = thread.messages[thread.messages.length - 1]
              const expanded = openThread === thread.key
              return (
                <li key={thread.key} className={expanded ? 'is-open' : ''}>
                  <button type="button" className="email-thread-toggle" onClick={() => setOpenThread(expanded ? null : thread.key)} aria-expanded={expanded}>
                    <strong>{first.subject || '(no subject)'}</strong>
                    <small>{thread.messages.length} message{thread.messages.length === 1 ? '' : 's'} · last {last.direction === 'inbound' ? 'received' : 'sent'} {formatDateTime(last.sentAt)}</small>
                  </button>
                  {expanded && (
                    <ol className="email-thread">
                      {thread.messages.map((m) => {
                        const status = openLabel(m)
                        return (
                          <li key={m.id} className={m.direction}>
                            <small>{m.direction === 'inbound' ? `From ${m.fromEmail}` : `${m.fromEmail} → ${m.toEmails}`} · {formatDateTime(m.sentAt)}{status ? ` · ${status.text}` : ''}</small>
                            <p>{m.body}</p>
                          </li>
                        )
                      })}
                    </ol>
                  )}
                </li>
              )
            })}
            {emailThreads.length === 0 && <li className="task-empty">No emails with {contactEmail || 'this contact'} yet.</li>}
          </ul>
          <button type="button" className="toolbar-button" onClick={() => onCompose({ dealId: deal.id, contactId: contact?.id, to: contact?.email || '' })}><MailIcon /> {emailThreads.length ? 'Open in Email' : 'Write email'}</button>
        </section>

        <section className="drawer-section tasks-section">
          <span className="eyebrow">To-dos{overdueTasks ? <em className="eyebrow-alert"> · {overdueTasks} overdue</em> : null}</span>
          <ul className="task-list">
            {orderedTasks.map(({ task, index }) => (
              <li key={task.id ?? index} className={task.done ? 'task-done' : ''}>
                <button type="button" className="task-check" onClick={() => toggleTask(index)} aria-pressed={!!task.done} aria-label={task.done ? 'Mark not done' : 'Mark done'}>
                  {task.done && <CheckIcon />}
                </button>
                <span>{task.label}</span>
                <DueBadge dueDate={task.dueDate} done={task.done} onChange={task.done ? undefined : (iso) => setTaskDue(index, iso)} />
              </li>
            ))}
            {tasks.length === 0 && <li className="task-empty">No to-dos yet. Add the next follow-up below.</li>}
          </ul>
          <div className="task-compose">
            <div className="task-quick">
              {quickTasks.map((label) => <button key={label} type="button" onClick={() => setNewTask(label)}>{label}</button>)}
            </div>
            <div className="task-add">
              <input value={newTask} onChange={(event) => setNewTask(event.target.value)} onKeyDown={addTaskOnEnter} placeholder='e.g. "Send proposal"' />
              <button type="button" className="icon-button" onClick={addTask} disabled={!newTask.trim()} aria-label="Add to-do"><PlusIcon /></button>
            </div>
            <DuePicker value={newTaskDue} onChange={setNewTaskDue} />
          </div>
        </section>

        <section className="drawer-section">
          <span className="eyebrow">Remarks</span>
          <textarea className="remarks-input" value={remarks} onChange={(event) => setRemarks(event.target.value)} onBlur={saveRemarks} rows={3} placeholder="Notes only you and the nightly digest see…" />
        </section>

        {deal.nightlySummary && (
          <section className="drawer-section">
            <span className="eyebrow">Nightly digest{deal.nightlySummaryAt ? ` · ${formatDateTime(deal.nightlySummaryAt)}` : ''}</span>
            <ul className="digest-list">
              {deal.nightlySummary.split('\n').map((line) => line.replace(/^-\s*/, '').trim()).filter(Boolean).map((line, index) => <li key={index}>{line}</li>)}
            </ul>
          </section>
        )}

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
