'use client'

import { useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'
import ProductModal from '@/components/modals/ProductModal'
import LeadModal from '@/components/modals/LeadModal'
import { FACTS, formatPrice } from '@/lib/festiveFacts'
import type { FestiveProduct, PickSection } from './types'

const subscribeNoop = () => () => {}

/**
 * Plain product grid for the festive guides. No filters on purpose: each page
 * is already scoped to one budget or one type of gift, so the reader only has
 * to scan, open "What's inside" and add to their pack.
 */
export default function FestivePicks({ sections }: { sections: PickSection[] }) {
  const [selected, setSelected] = useState<FestiveProduct | null>(null)
  const [showLead, setShowLead] = useState(false)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  // Cart state lives in sessionStorage; only read it after hydration so the
  // server HTML and the first client render match.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const addItem = useCartStore(s => s.addItem)
  const items = useCartStore(s => s.items)
  const storedCount = useCartStore(s => s.count())
  const storedTotal = useCartStore(s => s.total())
  const count = mounted ? storedCount : 0
  const total = mounted ? storedTotal : 0

  const handleAdd = (p: FestiveProduct) => {
    const cat = typeof p.category === 'object' ? p.category : null
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      emoji: p.emoji || undefined,
      imageUrl: p.image?.sizes?.card?.url || p.image?.url || undefined,
      categoryName: cat?.name || 'Corporate Gifts',
    })
    setJustAdded(p.id)
    window.setTimeout(() => setJustAdded(prev => (prev === p.id ? null : prev)), 1600)
  }

  const inPack = (id: string) => (mounted ? items.find(i => i.id === id)?.quantity ?? 0 : 0)

  return (
    <>
      {sections.map((s, idx) => (
        <section
          key={s.id}
          id={`picks-${s.id}`}
          className={`cp-section ${idx % 2 === 0 ? 'cp-section--white' : 'cp-section--cream'} fp-anchor`}
          aria-labelledby={`picks-${s.id}-title`}
        >
          <div className="cp-container">
            <div className="fp-picks-head">
              <h2 id={`picks-${s.id}-title`} className="cp-section-title">{s.title}</h2>
              <p className="fp-lead">{s.intro}</p>
              <p className="fp-meta">
                {s.products.length} {s.products.length === 1 ? 'option' : 'options'} · price per unit, excluding GST · minimum {FACTS.moq} units
              </p>
            </div>
            <div className="dh-grid">
              {s.products.map(p => {
                const img = p.image?.sizes?.card?.url || p.image?.url || null
                const qty = inPack(p.id)
                const feats = p.features ?? []
                return (
                  <article key={p.id} id={`product-${p.id}`} className="dh-card">
                    <button type="button" className="dh-card-media" onClick={() => setSelected(p)} aria-label={`View details: ${p.name}`}>
                      {img ? (
                        <Image
                          src={img}
                          alt={p.image?.alt || `${p.name} by MintBox`}
                          width={600}
                          height={600}
                          sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 280px"
                          loading="lazy"
                          unoptimized
                        />
                      ) : (
                        <span className="cp-product-emoji" aria-hidden="true">{p.emoji || '🎁'}</span>
                      )}
                      {p.customisable && <span className="cp-product-badge">Logo branding</span>}
                    </button>
                    <div className="dh-card-body">
                      <h3 className="dh-card-name">{p.name}</h3>
                      <div className="dh-card-price">
                        {formatPrice(p.price)} <span>per unit · ex GST</span>
                      </div>
                      {feats.length > 0 && (
                        <details className="dh-inside">
                          <summary>What&rsquo;s inside <span className="dh-inside-count">{feats.length} {feats.length === 1 ? 'item' : 'items'}</span></summary>
                          <ul>
                            {feats.map((f, i) => <li key={i}>{f.feature}</li>)}
                          </ul>
                        </details>
                      )}
                      <div className="dh-card-actions">
                        <button
                          type="button"
                          className={`dh-btn-add${justAdded === p.id ? ' added' : ''}`}
                          onClick={() => handleAdd(p)}
                          aria-live="polite"
                        >
                          {justAdded === p.id ? '✓ Added to pack' : qty > 0 ? `+ Add another · ${qty} in pack` : '+ Add to pack'}
                        </button>
                        <button type="button" className="dh-btn-view" onClick={() => setSelected(p)}>Details</button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {count > 0 && (
        <button type="button" className="cp-pack-bar fp-pack-bar" onClick={() => setShowLead(true)}>
          <span className="cp-pack-bar-icon" aria-hidden="true">🛍</span>
          <span className="cp-pack-bar-text">
            <span className="cp-pack-bar-label">{count} item{count !== 1 ? 's' : ''} in your pack</span>
            <span className="cp-pack-bar-sub">Est. {formatPrice(total)} · minimum {FACTS.moq} per item</span>
          </span>
          <span className="cp-pack-bar-cta">Request quote →</span>
        </button>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      {showLead && <LeadModal onClose={() => setShowLead(false)} />}
    </>
  )
}
