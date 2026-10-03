'use client'

import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Deal, DealTask, Task } from '@/lib/types'
import { CheckIcon, PlusIcon, TrashIcon } from './Icons'
import { DueBadge, DuePicker, dueBucket, fromDateKey, inDays, type DueBucket } from './DueDate'

const BUCKET_LABELS: Record<DueBucket, string> = {
  overdue: 'Overdue',
  today: 'Due today',
  upcoming: 'Upcoming',
  no_date: 'No due date',
}
const BUCKET_ORDER: DueBucket[] = ['overdue', 'today', 'upcoming', 'no_date']
const BUCKET_ACCENT: Record<DueBucket, string> = {
  overdue: '#d84d4d',
  today: '#d98a2b',
  upcoming: '#2f6fed',
  no_date: '#9da2ac',
}

/** One row in the agenda: a standalone to-do or a to-do inside a deal. */
type Item =
  | { kind: 'task'; key: string; label: string; done: boolean; dueDate?: string | null; doneAt?: string | null; task: Task }
  | { kind: 'deal'; key: string; label: string; done: boolean; dueDate?: string | null; doneAt?: string | null; deal: Deal; index: number }

function dealName(deal: Deal) {
  const contact = typeof deal.contact === 'object' ? deal.contact : null
  return contact?.company || contact?.name || deal.title
}

const byDue = (a: Item, b: Item) =>
  (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) - (b.dueDate ? new Date(b.dueDate).getTime() : Infinity)

interface TaskViewProps {
  tasks: Task[]
  deals: Deal[]
  onAdd: (label: string, dueDate: string) => Promise<void>
  onToggle: (task: Task) => Promise<void>
  onDelete: (task: Task) => Promise<void>
  onDue: (task: Task, dueDate: string) => Promise<void>
  onPatchDealTasks: (deal: Deal, tasks: DealTask[]) => Promise<void>
  onOpenDeal: (deal: Deal) => void
}

export function TaskView({ tasks, deals, onAdd, onToggle, onDelete, onDue, onPatchDealTasks, onOpenDeal }: TaskViewProps) {
  const [label, setLabel] = useState('')
  const [dueKey, setDueKey] = useState(inDays(1))
  const [adding, setAdding] = useState(false)

  const items = useMemo<Item[]>(() => [
    ...tasks.map((task): Item => ({ kind: 'task', key: `t${task.id}`, label: task.label, done: !!task.done, dueDate: task.dueDate, doneAt: task.doneAt, task })),
    ...deals.flatMap((deal) => (deal.tasks || []).map((task, index): Item => ({
      kind: 'deal', key: `d${deal.id}-${task.id ?? index}`, label: task.label, done: !!task.done, dueDate: task.dueDate, doneAt: task.doneAt, deal, index,
    }))),
  ], [tasks, deals])

  const open = useMemo(() => items.filter((item) => !item.done).sort(byDue), [items])
  const done = useMemo(() => items.filter((item) => item.done).sort((a, b) =>
    new Date(b.doneAt || 0).getTime() - new Date(a.doneAt || 0).getTime()).slice(0, 50), [items])
  const overdueCount = open.filter((item) => dueBucket(item.dueDate) === 'overdue').length

  function patchDealTask(item: Extract<Item, { kind: 'deal' }>, patch: Partial<DealTask>) {
    const next = (item.deal.tasks || []).map((task, i) => i === item.index ? { ...task, ...patch } : task)
    void onPatchDealTasks(item.deal, next)
  }

  function toggle(item: Item) {
    if (item.kind === 'task') return void onToggle(item.task)
    patchDealTask(item, { done: !item.done, doneAt: item.done ? null : new Date().toISOString() })
  }

  function reschedule(item: Item, dueDate: string) {
    if (item.kind === 'task') return void onDue(item.task, dueDate)
    patchDealTask(item, { dueDate })
  }

  async function submit() {
    const value = label.trim()
    const dueDate = fromDateKey(dueKey)
    if (!value || !dueDate || adding) return
    setAdding(true)
    try {
      await onAdd(value, dueDate)
      setLabel('')
      setDueKey(inDays(1))
    } finally {
      setAdding(false)
    }
  }

  function submitOnEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      void submit()
    }
  }

  function renderRow(item: Item) {
    return (
      <li key={item.key} className={item.done ? 'task-done' : ''}>
        <button type="button" className="task-check" onClick={() => toggle(item)} aria-pressed={item.done} aria-label={item.done ? 'Mark not done' : 'Mark done'}>
          {item.done && <CheckIcon />}
        </button>
        <span className="todo-copy">
          {item.label}
          {item.kind === 'deal' && <button type="button" className="todo-deal" onClick={() => onOpenDeal(item.deal)}>{dealName(item.deal)}</button>}
        </span>
        <DueBadge dueDate={item.dueDate} done={item.done} onChange={item.done ? undefined : (iso) => reschedule(item, iso)} />
        {item.kind === 'task' && <button type="button" className="task-remove" onClick={() => void onDelete(item.task)} aria-label="Delete to-do"><TrashIcon /></button>}
      </li>
    )
  }

  return (
    <div className="view todo-view">
      <header className="view-toolbar">
        <div className="toolbar-group"><div><strong>To-dos</strong><small>Everything with a date: your own to-dos and every deal&apos;s follow-ups</small></div></div>
        <div className="queue-tally" aria-label={`${open.length} pending, ${overdueCount} overdue`}>
          <div><strong>{open.length}</strong><span>pending</span></div>
          <div><strong>{overdueCount}</strong><span>overdue</span></div>
        </div>
      </header>

      <div className="todo-add">
        <div className="task-add">
          <input value={label} onChange={(event) => setLabel(event.target.value)} onKeyDown={submitOnEnter} placeholder='e.g. "Call packaging vendor"' />
          <button type="button" className="icon-button" onClick={() => void submit()} disabled={adding || !label.trim()} aria-label="Add to-do"><PlusIcon /></button>
        </div>
        <DuePicker value={dueKey} onChange={setDueKey} />
        <small>To add a follow-up for a deal, open the deal and use its To-dos section.</small>
      </div>

      {open.length === 0 ? (
        <div className="empty-state"><span>✓</span><h2>Nothing pending</h2><p>Add a to-do above, or a follow-up inside any deal.</p></div>
      ) : (
        <div className="queue-groups">
          {BUCKET_ORDER.map((bucket) => {
            const rows = open.filter((item) => dueBucket(item.dueDate) === bucket)
            if (rows.length === 0) return null
            return (
              <section className="queue-group" key={bucket}>
                <header><span style={{ background: BUCKET_ACCENT[bucket] }} /><h2>{BUCKET_LABELS[bucket]}</h2><small>{rows.length}</small></header>
                <ul className="task-list todo-list">
                  {rows.map(renderRow)}
                </ul>
              </section>
            )
          })}
        </div>
      )}

      {done.length > 0 && (
        <details className="dormant-list">
          <summary><span>Completed</span><small>{done.length}</small></summary>
          <ul className="task-list todo-list">
            {done.map(renderRow)}
          </ul>
        </details>
      )}
    </div>
  )
}
