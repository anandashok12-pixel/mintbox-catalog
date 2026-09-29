'use client'

import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Task } from '@/lib/types'
import { CheckIcon, PlusIcon, TrashIcon } from './Icons'

type Bucket = 'overdue' | 'today' | 'upcoming' | 'no_date'

const BUCKET_LABELS: Record<Bucket, string> = {
  overdue: 'Overdue',
  today: 'Due today',
  upcoming: 'Upcoming',
  no_date: 'No due date',
}
const BUCKET_ORDER: Bucket[] = ['overdue', 'today', 'upcoming', 'no_date']
const BUCKET_ACCENT: Record<Bucket, string> = {
  overdue: '#d84d4d',
  today: '#d98a2b',
  upcoming: '#2f6fed',
  no_date: '#9da2ac',
}

function startOfToday() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

function bucketFor(task: Task): Bucket {
  if (!task.dueDate) return 'no_date'
  const due = new Date(task.dueDate)
  due.setHours(0, 0, 0, 0)
  const today = startOfToday()
  if (due.getTime() < today) return 'overdue'
  if (due.getTime() === today) return 'today'
  return 'upcoming'
}

function formatDate(value?: string | null) {
  if (!value) return null
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date(value))
}

function TodoRow({ task, onToggle, onDelete }: { task: Task; onToggle: () => void; onDelete: () => void }) {
  const stamp = formatDate(task.done ? task.doneAt : task.dueDate)
  return (
    <li className={task.done ? 'task-done' : ''}>
      <button type="button" className="task-check" onClick={onToggle} aria-pressed={!!task.done} aria-label={task.done ? 'Mark not done' : 'Mark done'}>
        {task.done && <CheckIcon />}
      </button>
      <span>{task.label}</span>
      {stamp && <time>{stamp}</time>}
      <button type="button" className="task-remove" onClick={onDelete} aria-label="Delete to-do"><TrashIcon /></button>
    </li>
  )
}

interface TaskViewProps {
  tasks: Task[]
  onAdd: (label: string, dueDate?: string | null) => Promise<void>
  onToggle: (task: Task) => Promise<void>
  onDelete: (task: Task) => Promise<void>
}

export function TaskView({ tasks, onAdd, onToggle, onDelete }: TaskViewProps) {
  const [label, setLabel] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [adding, setAdding] = useState(false)

  const open = useMemo(() => [...tasks].filter((task) => !task.done).sort((a, b) => {
    const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
    const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
    return aTime - bTime
  }), [tasks])

  const done = useMemo(() => [...tasks].filter((task) => task.done).sort((a, b) =>
    new Date(b.doneAt || b.updatedAt).getTime() - new Date(a.doneAt || a.updatedAt).getTime()
  ), [tasks])

  const overdueCount = useMemo(() => open.filter((task) => bucketFor(task) === 'overdue').length, [open])

  async function submit() {
    const value = label.trim()
    if (!value || adding) return
    setAdding(true)
    try {
      await onAdd(value, dueDate || null)
      setLabel('')
      setDueDate('')
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

  return (
    <div className="view todo-view">
      <header className="view-toolbar">
        <div className="toolbar-group"><div><strong>To-dos</strong><small>Not tied to any deal</small></div></div>
        <div className="queue-tally" aria-label={`${open.length} pending, ${overdueCount} overdue`}>
          <div><strong>{open.length}</strong><span>pending</span></div>
          <div><strong>{overdueCount}</strong><span>overdue</span></div>
        </div>
      </header>

      <div className="todo-add">
        <input value={label} onChange={(event) => setLabel(event.target.value)} onKeyDown={submitOnEnter} placeholder='e.g. "Call packaging vendor"' />
        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} aria-label="Due date" />
        <button type="button" className="icon-button" onClick={() => void submit()} disabled={adding || !label.trim()} aria-label="Add to-do"><PlusIcon /></button>
      </div>

      {open.length === 0 ? (
        <div className="empty-state"><span>✓</span><h2>Nothing pending</h2><p>Add a to-do above to track work that isn’t tied to a deal.</p></div>
      ) : (
        <div className="queue-groups">
          {BUCKET_ORDER.map((bucket) => {
            const rows = open.filter((task) => bucketFor(task) === bucket)
            if (rows.length === 0) return null
            return (
              <section className="queue-group" key={bucket}>
                <header><span style={{ background: BUCKET_ACCENT[bucket] }} /><h2>{BUCKET_LABELS[bucket]}</h2><small>{rows.length}</small></header>
                <ul className="task-list todo-list">
                  {rows.map((task) => (
                    <TodoRow key={task.id} task={task} onToggle={() => void onToggle(task)} onDelete={() => void onDelete(task)} />
                  ))}
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
            {done.map((task) => (
              <TodoRow key={task.id} task={task} onToggle={() => void onToggle(task)} onDelete={() => void onDelete(task)} />
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
