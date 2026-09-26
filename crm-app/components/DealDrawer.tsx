'use client'

import { KeyboardEvent, useState } from 'react'
import type { Deal, DealTask } from '@/lib/types'
import { payloadAdminDealUrl } from '@/lib/payload'
import { CONTACT_CHANNELS, LEAD_SOURCES } from '@/lib/constants'
import { CheckIcon, CloseIcon, ExternalIcon, PlusIcon, WhatsAppIcon } from './Icons'

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

function currency(value?: number | null) {
  return value == null ? 'Not known' : `₹${Math.round(value).toLocaleString('en-IN')}`
}

interface DealDrawerProps {
  deal: Deal | null
  onClose: () => void
  onPatch: (patch: Partial<Deal>) => Promise<void>
}

// Keyed by deal.id from the parent (see CrmApp.tsx) so switching deals
// remounts this with fresh local state, instead of syncing it via an effect.
export function DealDrawer({ deal, onClose, onPatch }: DealDrawerProps) {
  const [remarks, setRemarks] = useState(deal?.remarks || '')
  const [newTask, setNewTask] = useState('')

  if (!deal) return null
  const contact = contactFor(deal)
  const phone = contact?.phoneE164
  const tasks = deal.tasks || []

  function saveRemarks() {
    if (remarks !== (deal!.remarks || '')) void onPatch({ remarks })
  }

  function addTask() {
    const label = newTask.trim()
    if (!label) return
    void onPatch({ tasks: [...tasks, { label, done: false }] })
    setNewTask('')
  }

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
          <div><dt>Lead source</dt><dd>{LEAD_SOURCES.find((item) => item.value === deal.leadSource)?.label || '—'}</dd></div>
          <div><dt>Contacted via</dt><dd>{CONTACT_CHANNELS.find((item) => item.value === deal.contactChannel)?.label || '—'}</dd></div>
        </dl>

        {deal.attribution && (
          <section className="drawer-section">
            <span className="eyebrow">Attribution</span>
            <p>{deal.attribution}</p>
          </section>
        )}

        <section className="drawer-section tasks-section">
          <span className="eyebrow">To-dos</span>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={task.id ?? index} className={task.done ? 'task-done' : ''}>
                <button type="button" className="task-check" onClick={() => toggleTask(index)} aria-pressed={!!task.done} aria-label={task.done ? 'Mark not done' : 'Mark done'}>
                  {task.done && <CheckIcon />}
                </button>
                <span>{task.label}</span>
                {task.dueDate && <time>{formatDate(task.dueDate)}</time>}
              </li>
            ))}
            {tasks.length === 0 && <li className="task-empty">No to-dos yet.</li>}
          </ul>
          <div className="task-add">
            <input value={newTask} onChange={(event) => setNewTask(event.target.value)} onKeyDown={addTaskOnEnter} placeholder='e.g. "Send proposal"' />
            <button type="button" className="icon-button" onClick={addTask} aria-label="Add to-do"><PlusIcon /></button>
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
