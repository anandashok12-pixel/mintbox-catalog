'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import { useCartStore, useHasMounted, clampQty } from '@/lib/cartStore'
import { MIN_ORDER_UNITS, QUOTE_TIME } from '@/lib/businessFacts'
import QuantityInput from './QuantityInput'

interface CartPanelProps {
  onRequestPricing: () => void
  /** Renders the panel without the desktop sticky-aside chrome (mobile sheet). */
  variant?: 'aside' | 'sheet'
  /** Optional header control, e.g. the mobile sheet's close button. */
  headerAction?: React.ReactNode
}

const PACK_EXPLAINER = `Your pack is a shortlist — add items, set quantities, and we'll send a priced quote within ${QUOTE_TIME}.`

export default function CartPanel({ onRequestPricing, variant = 'aside', headerAction }: CartPanelProps) {
  const mounted = useHasMounted()
  const storedItems = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const setAllQty = useCartStore((s) => s.setAllQty)
  const items = mounted ? storedItems : []

  const bulkId = useId()
  const [bulkDraft, setBulkDraft] = useState('')
  const [bulkNote, setBulkNote] = useState('')

  const totalVal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0)

  const applyBulk = () => {
    const parsed = parseInt(bulkDraft, 10)
    if (!Number.isFinite(parsed)) {
      setBulkNote('Enter a quantity first.')
      return
    }
    const qty = clampQty(parsed)
    setAllQty(qty)
    setBulkDraft(String(qty))
    setBulkNote(
      parsed < MIN_ORDER_UNITS
        ? `Minimum order is ${MIN_ORDER_UNITS} units — set every item to ${qty}.`
        : `Every item set to ${qty.toLocaleString('en-IN')} units.`,
    )
  }

  return (
    <aside className={`cart-panel${variant === 'sheet' ? ' cart-panel--sheet' : ''}`} aria-label="Your pack">
      <div className="cart-panel-inner">
        <div className="cart-header">
          <div className="cart-header-row">
            <h2 className="cart-title">Your Pack</h2>
            {items.length > 0 && (
              <span className="cart-item-count">
                {items.length} {items.length === 1 ? 'product' : 'products'} · {totalUnits.toLocaleString('en-IN')} units
              </span>
            )}
            {headerAction}
          </div>
          {items.length > 0 && <p className="cart-explainer">{PACK_EXPLAINER}</p>}
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your pack is empty.</p>
            <p className="cart-empty-sub">{PACK_EXPLAINER}</p>
            <p className="cart-empty-sub">Minimum order is {MIN_ORDER_UNITS} units per product.</p>
          </div>
        ) : (
          <>
            {items.length > 1 && (
              <form
                className="cart-bulk"
                onSubmit={(e) => {
                  e.preventDefault()
                  applyBulk()
                }}
              >
                <label className="cart-bulk-label" htmlFor={`${bulkId}-qty`}>
                  Set all to
                </label>
                <input
                  id={`${bulkId}-qty`}
                  className="cart-bulk-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  placeholder="e.g. 200"
                  value={bulkDraft}
                  onChange={(e) => {
                    setBulkDraft(e.target.value.replace(/\D/g, '').slice(0, 6))
                    setBulkNote('')
                  }}
                  aria-describedby={`${bulkId}-note`}
                />
                <span className="cart-bulk-unit" aria-hidden="true">units</span>
                <button type="submit" className="cart-bulk-apply">
                  Apply
                </button>
                <p id={`${bulkId}-note`} className="cart-bulk-note" role="status" aria-live="polite">
                  {bulkNote}
                </p>
              </form>
            )}

            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        width={44}
                        height={44}
                        sizes="44px"
                        loading="lazy"
                        decoding="async"
                        unoptimized
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="cart-item-placeholder" aria-hidden="true" />
                    )}
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <p className="cart-item-name" title={item.name}>{item.name}</p>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from pack`}
                      >
                        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                          <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')} / unit</p>
                    <div className="cart-item-controls">
                      <QuantityInput
                        size="sm"
                        value={item.quantity}
                        productName={item.name}
                        onCommit={(q) => updateQty(item.id, q)}
                      />
                      <span className="cart-item-subtotal">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Estimated Total</span>
                <strong>₹{totalVal.toLocaleString('en-IN')}</strong>
              </div>
              <p className="cart-disclaimer">* Final pricing subject to qty, customisation &amp; delivery</p>
              <button type="button" className="btn-request-pricing" onClick={onRequestPricing}>
                Request Final Pricing →
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
