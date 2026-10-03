'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'

interface Feature {
  feature: string
  id?: string
}

interface Category {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

interface Product {
  id: string
  name: string
  price: number
  emoji?: string | null
  image?: {
    url?: string | null
    sizes?: {
      card?: { url?: string | null }
    }
  } | null
  description: string
  features?: Feature[] | null
  moq?: number | null
  customisable?: boolean | null
  category: Category | string
}

interface ProductModalProps {
  product: Product
  onClose: () => void
  /**
   * Replaces "Add to Pack" (the site cart) with a custom action, e.g. adding
   * the product to a quote on a landing page. Hides the quantity picker.
   */
  action?: { label: string; onClick: () => void }
}

export default function ProductModal({ product, onClose, action }: ProductModalProps) {
  const minQty = product.moq || 1
  const [qty, setQty] = useState(minQty)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  const addItem = useCartStore((s) => s.addItem)

  const cat = typeof product.category === 'object' ? product.category : null
  const imageUrl = product.image?.sizes?.card?.url || product.image?.url || null

  const handleAddToPack = () => {
    const itemBase = {
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji || undefined,
      imageUrl: imageUrl || undefined,
      categoryName: cat?.name || '',
    }
    // Add qty times (or set qty directly)
    for (let i = 0; i < qty; i++) {
      addItem(itemBase)
    }
    // Reset qty to avoid duplicating; store dedups by id so it just increments
    onClose()
  }

  // Actually, the store increments by 1 each addItem call - so for qty > 1 we use updateQty after
  const handleAddToPack2 = () => {
    const { items, updateQty, addItem: add } = useCartStore.getState()
    const existing = items.find((i) => i.id === product.id)
    const imageUrlVal = imageUrl || undefined
    if (existing) {
      updateQty(product.id, existing.quantity + qty)
    } else {
      add({
        id: product.id,
        name: product.name,
        price: product.price,
        emoji: product.emoji || undefined,
        imageUrl: imageUrlVal,
        categoryName: cat?.name || '',
        moq: product.moq || undefined,
      })
      if (qty > 1) {
        updateQty(product.id, qty)
      }
    }
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" role="dialog" aria-modal="true" aria-label={product.name} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="product-modal-image-pane" style={{ position: 'relative' }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div className="product-modal-emoji-fallback" aria-hidden="true">
              {product.emoji && <span>{product.emoji}</span>}
            </div>
          )}
        </div>

        <div className="product-modal-detail-pane">
          <div className="product-modal-meta">
            {cat && (
              <span className="product-cat-tag">{cat.name}</span>
            )}
            {product.customisable && (
              <span className="badge-custom">Customisable</span>
            )}
          </div>

          <h2 className="product-modal-name">{product.name}</h2>

          <p className="product-modal-price">
            ₹{product.price.toLocaleString('en-IN')}
            <span className="product-modal-unit"> per unit · ex GST</span>
          </p>

          {product.moq && (
            <p className="product-modal-moq">Minimum order: {product.moq} units</p>
          )}

          <p className="product-modal-description">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="product-modal-features">
              <p className="features-label">Features</p>
              <div className="feature-tags">
                {product.features.map((f, i) => (
                  <span key={i} className="feature-tag">
                    ✓ {f.feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {action ? (
            <div className="product-modal-actions">
              <button
                className="btn-add-pack"
                onClick={() => {
                  action.onClick()
                  onClose()
                }}
              >
                {action.label}
              </button>
            </div>
          ) : (
          <div className="product-modal-actions">
            <div className="qty-selector">
              <button
                className="qty-btn"
                onClick={() => setQty(Math.max(minQty, qty - 1))}
              >
                −
              </button>
              <input
                type="number"
                className="qty-input"
                value={qty}
                min={minQty}
                name="quantity"
                aria-label="Quantity"
                onChange={(e) => setQty(Math.max(minQty, parseInt(e.target.value) || 1))}
              />
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>
            <button className="btn-add-pack" onClick={handleAddToPack2}>
              Add to Pack
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
