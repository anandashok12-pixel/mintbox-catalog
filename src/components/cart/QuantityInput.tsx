'use client'

import { useId, useState, type KeyboardEvent } from 'react'
import { MIN_ORDER_UNITS } from '@/lib/businessFacts'
import { MAX_ORDER_UNITS } from '@/lib/cartStore'

interface QuantityInputProps {
  value: number
  onCommit: (qty: number) => void
  /** Used for the accessible names: "Quantity for <productName>". */
  productName: string
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Typeable quantity field flanked by −/+ steppers. Bulk buyers type 200; the
 * steppers are for nudging. The draft is committed on blur or Enter; anything
 * below the minimum order snaps up to it with an inline explanation.
 */
export default function QuantityInput({
  value,
  onCommit,
  productName,
  size = 'md',
  className = '',
}: QuantityInputProps) {
  const hintId = useId()
  const [draft, setDraft] = useState(String(value))
  const [syncedValue, setSyncedValue] = useState(value)
  const [showMinHint, setShowMinHint] = useState(false)

  // Adopt outside changes (e.g. "Set all to N") without an effect.
  if (value !== syncedValue) {
    setSyncedValue(value)
    setDraft(String(value))
  }

  const commit = (raw: string) => {
    const parsed = parseInt(raw, 10)
    let next = Number.isFinite(parsed) ? parsed : value
    if (next < MIN_ORDER_UNITS) {
      next = MIN_ORDER_UNITS
      setShowMinHint(true)
    } else {
      setShowMinHint(false)
    }
    next = Math.min(next, MAX_ORDER_UNITS)
    setDraft(String(next))
    if (next !== value) onCommit(next)
  }

  const step = (delta: number) => {
    const next = Math.min(MAX_ORDER_UNITS, Math.max(MIN_ORDER_UNITS, value + delta))
    setShowMinHint(false)
    setDraft(String(next))
    if (next !== value) onCommit(next)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commit(draft)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      step(-1)
    }
  }

  return (
    <div className={`qty-field qty-field--${size} ${className}`.trim()}>
      <div className="qty-selector">
        <button
          type="button"
          className="qty-btn"
          onClick={() => step(-1)}
          disabled={value <= MIN_ORDER_UNITS}
          aria-label={`Decrease quantity for ${productName}`}
        >
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
            <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          className="qty-input"
          value={draft}
          aria-label={`Quantity for ${productName}`}
          aria-describedby={showMinHint ? hintId : undefined}
          onChange={(e) => {
            setDraft(e.target.value.replace(/\D/g, '').slice(0, 6))
            setShowMinHint(false)
          }}
          onBlur={() => commit(draft)}
          onKeyDown={onKeyDown}
          onFocus={(e) => e.currentTarget.select()}
        />
        <button
          type="button"
          className="qty-btn"
          onClick={() => step(1)}
          disabled={value >= MAX_ORDER_UNITS}
          aria-label={`Increase quantity for ${productName}`}
        >
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
            <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <p id={hintId} className="qty-hint" role="status" aria-live="polite">
        {showMinHint ? `Minimum order is ${MIN_ORDER_UNITS} units` : ''}
      </p>
    </div>
  )
}
