'use client'

import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'

interface CartPanelProps {
  onRequestPricing: () => void
}

export default function CartPanel({ onRequestPricing }: CartPanelProps) {
  const { items, updateQty, removeItem, total } = useCartStore()
  const totalVal = total()

  return (
    <aside className="cart-panel">
      <div className="cart-panel-inner">
        <div className="cart-header">
          <h2 className="cart-title">Your Pack</h2>
          {items.length > 0 && (
            <span className="cart-item-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your pack is empty.</p>
            <p className="cart-empty-sub">Add products from the catalog to build your gifting pack.</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={44}
                        height={44}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="cart-item-placeholder" aria-hidden="true" />
                    )}
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')} / unit</p>
                    <div className="cart-item-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="cart-remove"
                        onClick={() => removeItem(item.id)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-subtotal">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
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
              <button className="btn-request-pricing" onClick={onRequestPricing}>
                Request Final Pricing →
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
