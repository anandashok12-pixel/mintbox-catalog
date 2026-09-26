'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'
import { MIN_ORDER_UNITS } from '@/lib/businessFacts'
import QuantityInput from '@/components/cart/QuantityInput'

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
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  // If the product is already in the pack, open on its current quantity and
  // make the action an update rather than silently stacking another batch.
  const existingQty = useCartStore((s) => s.items.find((i) => i.id === product.id)?.quantity)
  const [qty, setQty] = useState(existingQty ?? MIN_ORDER_UNITS)
  const addItem = useCartStore((s) => s.addItem)
  const updateQty = useCartStore((s) => s.updateQty)
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  // Callers pass inline closures; keep the latest without re-running the
  // focus/keydown effect (which would steal focus back to the close button).
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  const cat = typeof product.category === 'object' ? product.category : null
  const imageUrl = product.image?.sizes?.card?.url || product.image?.url || null

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [])

  const handleAddToPack = () => {
    if (existingQty !== undefined) {
      updateQty(product.id, qty)
    } else {
      addItem(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          emoji: product.emoji || undefined,
          imageUrl: imageUrl || undefined,
          categoryName: cat?.name || '',
        },
        qty,
      )
    }
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close product details">×</button>
        <div className="product-modal-image-pane" style={{ position: 'relative' }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              fetchPriority="high"
              // Image Optimization quota is exhausted (402); serve the Blob original.
              unoptimized
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div className="product-modal-emoji-fallback" aria-hidden="true" />
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

          <h2 id={titleId} className="product-modal-name">{product.name}</h2>

          <p className="product-modal-price">
            ₹{product.price.toLocaleString('en-IN')}
            <span className="product-modal-unit"> per unit</span>
          </p>

          <p className="product-modal-moq">Minimum order: {MIN_ORDER_UNITS} units</p>

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

          <div className="product-modal-actions">
            <QuantityInput value={qty} onCommit={setQty} productName={product.name} />
            <button type="button" className="btn-add-pack" onClick={handleAddToPack}>
              {existingQty !== undefined ? 'Update pack' : 'Add to Pack'}
              <span className="btn-add-pack-sub">
                {qty.toLocaleString('en-IN')} units · ₹{(qty * product.price).toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
