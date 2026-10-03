'use client'

import { useId } from 'react'

export type DueBucket = 'overdue' | 'today' | 'upcoming' | 'no_date'

function startOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

/** yyyy-mm-dd in local time, for <input type="date">. */
export function toDateKey(value?: string | Date | null): string {
  if (!value) return ''
  const date = new Date(value)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Stored at local noon so the day never shifts across time zones. */
export function fromDateKey(key: string): string | null {
  const [y, m, d] = key.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d, 12).toISOString()
}

export function inDays(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toDateKey(date)
}

export function dueBucket(dueDate?: string | null): DueBucket {
  if (!dueDate) return 'no_date'
  const due = startOfDay(new Date(dueDate)).getTime()
  const today = startOfDay(new Date()).getTime()
  if (due < today) return 'overdue'
  if (due === today) return 'today'
  return 'upcoming'
}

export function dueLabel(dueDate?: string | null): string {
  if (!dueDate) return 'No date'
  const days = Math.round((startOfDay(new Date(dueDate)).getTime() - startOfDay(new Date()).getTime()) / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days === -1) return 'Yesterday'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date(dueDate))
}

const PRESETS = [
  { label: 'Today', days: 0 },
  { label: 'Tomorrow', days: 1 },
  { label: 'In 3 days', days: 3 },
  { label: 'Next week', days: 7 },
]

/** Quick date chips plus a calendar picker. `value` is a yyyy-mm-dd key. */
export function DuePicker({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  return (
    <div className="due-picker" role="group" aria-label="Due date">
      {PRESETS.map((preset) => {
        const key = inDays(preset.days)
        return (
          <button key={preset.label} type="button" className={value === key ? 'active' : ''} onClick={() => onChange(key)}>{preset.label}</button>
        )
      })}
      <input type="date" value={value} min={inDays(0)} onChange={(event) => event.target.value && onChange(event.target.value)} aria-label="Pick a date" />
    </div>
  )
}

/** Coloured due chip; tapping it opens the date picker to reschedule. */
export function DueBadge({ dueDate, done, onChange }: { dueDate?: string | null; done?: boolean | null; onChange?: (iso: string) => void }) {
  const id = useId()
  const bucket = done ? 'done' : dueBucket(dueDate)
  return (
    <label className={`due-badge due-${bucket}`} htmlFor={onChange ? id : undefined} title={onChange ? 'Change date' : undefined}>
      {dueLabel(dueDate)}
      {onChange && (
        <input id={id} type="date" value={toDateKey(dueDate)} onChange={(event) => {
          const iso = fromDateKey(event.target.value)
          if (iso) onChange(iso)
        }} aria-label="Change due date" />
      )}
    </label>
  )
}
