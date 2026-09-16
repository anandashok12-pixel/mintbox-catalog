'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'
import ProductModal from '@/components/modals/ProductModal'
import LeadModal from '@/components/modals/LeadModal'

export interface DiwaliCategory {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

export interface DiwaliProduct {
  id: string
  name: string
  price: number
  emoji?: string | null
  image?: { url?: string | null; alt?: string | null; sizes?: { card?: { url?: string | null } } } | null
  description: string
  features?: Array<{ feature: string; id?: string }> | null
  moq?: number | null
  customisable?: boolean | null
  inStock?: boolean | null
  category: DiwaliCategory | string
}

export type TierKey = 'team' | 'manager' | 'leader'

export interface Tier {
  key: TierKey
  label: string
  title: string
  range: string
  min: number
  max: number
  desc: string
  bestFor: string
}

export const TIERS: Tier[] = [
  {
    key: 'team',
    label: 'Under ₹800',
    title: 'Team tier',
    range: '₹434–₹799',
    min: 0,
    max: 799,
    desc: 'Dry-fruit boxes, eco desk sets and tote combos for all-staff gifting. Generous, useful, no filler.',
    bestFor: 'Every employee, interns, support staff',
  },
  {
    key: 'manager',
    label: '₹800–₹1,299',
    title: 'Manager tier',
    range: '₹800–₹1,299',
    min: 800,
    max: 1299,
    desc: 'Bottle-and-mug hampers with dry fruits, lamps or chocolates, in printed rigid boxes.',
    bestFor: 'Managers, top performers, long-standing vendors',
  },
  {
    key: 'leader',
    label: '₹1,300 & above',
    title: 'Leadership & client tier',
    range: '₹1,300–₹2,170',
    min: 1300,
    max: Number.POSITIVE_INFINITY,
    desc: 'Pure copper sets, 7-in-1 tech hampers and executive combos for the relationships you cannot get wrong.',
    bestFor: 'Clients, partners, senior leadership',
  },
]

export function tierFor(price: number): Tier {
  return TIERS.find(t => price >= t.min && price <= t.max) ?? TIERS[TIERS.length - 1]
}

const THEMES: Array<{ key: string; label: string; re: RegExp }> = [
  { key: 'dryfruits', label: 'Dry fruits & sweets', re: /dry fruit|almond|cashew|pistachio|raisin|kishmish|chocolate|ferrero|brittle|cookie|wafer|hershey|sweet/i },
  { key: 'copper', label: 'Copper drinkware', re: /copper/i },
  { key: 'eco', label: 'Eco-friendly', re: /eco|bamboo|husk|seed |jute|cork|wooden|plantable/i },
  { key: 'tech', label: 'Tech & desk', re: /wireless charger|power bank|laptop stand|mobile stand|charging cable|pen drive|humidifier|desk|notebook|pen stand|calendar/i },
  { key: 'lamps', label: 'Diyas, lamps & candles', re: /diya|lamp|light|candle/i },
]

type SortKey = 'curated' | 'price-asc' | 'price-desc'

const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`

function haystack(p: DiwaliProduct): string {
  return [p.name, p.description, ...(p.features?.map(f => f.feature) ?? [])].join(' ')
}

interface Props {
  products: DiwaliProduct[]
  tier: TierKey | 'all'
  onTierChange: (t: TierKey | 'all') => void
}

export default function DiwaliHamperShowcase({ products, tier, onTierChange }: Props) {
  const [theme, setTheme] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('curated')
  const [selected, setSelected] = useState<DiwaliProduct | null>(null)
  const [showLead, setShowLead] = useState(false)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  const addItem = useCartStore(s => s.addItem)
  const items = useCartStore(s => s.items)
  const count = useCartStore(s => s.count())
  const total = useCartStore(s => s.total())

  const filtered = useMemo(() => {
    const t = TIERS.find(x => x.key === tier)
    const th = THEMES.find(x => x.key === theme)
    const list = products.filter(p => {
      if (t && (p.price < t.min || p.price > t.max)) return false
      if (th && !th.re.test(haystack(p))) return false
      return true
    })
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    return list
  }, [products, tier, theme, sort])

  const groups = useMemo(
    () => TIERS.map(t => ({ tier: t, items: filtered.filter(p => tierFor(p.price).key === t.key) })).filter(g => g.items.length > 0),
    [filtered],
  )

  const tierCounts = useMemo(() => {
    const m: Record<string, number> = { all: products.length }
    for (const t of TIERS) m[t.key] = products.filter(p => tierFor(p.price).key === t.key).length
    return m
  }, [products])

  const handleAdd = (p: DiwaliProduct) => {
    const cat = typeof p.category === 'object' ? p.category : null
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      emoji: p.emoji || undefined,
      imageUrl: p.image?.sizes?.card?.url || p.image?.url || undefined,
      categoryName: cat?.name || 'Diwali Gift Boxes',
    })
    setJustAdded(p.id)
    window.setTimeout(() => setJustAdded(prev => (prev === p.id ? null : prev)), 1600)
  }

  const inPack = (id: string) => items.find(i => i.id === id)?.quantity ?? 0

  return (
    <>
      <div className="dh-showcase">
        {/* Toolbar */}
        <div className="dh-toolbar" role="group" aria-label="Filter Diwali hampers">
          <div className="dh-toolbar-row">
            <span className="dh-toolbar-label">Budget per unit</span>
            <div className="dh-segmented" role="tablist" aria-label="Budget tier">
              <button role="tab" aria-selected={tier === 'all'} className={`dh-seg${tier === 'all' ? ' active' : ''}`} onClick={() => onTierChange('all')}>
                All <span className="dh-seg-count">{tierCounts.all}</span>
              </button>
              {TIERS.map(t => (
                <button key={t.key} role="tab" aria-selected={tier === t.key} className={`dh-seg${tier === t.key ? ' active' : ''}`} onClick={() => onTierChange(t.key)}>
                  {t.label} <span className="dh-seg-count">{tierCounts[t.key]}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="dh-toolbar-row">
            <span className="dh-toolbar-label">Theme</span>
            <div className="dh-chips">
              {THEMES.map(th => (
                <button
                  key={th.key}
                  className={`dh-chip${theme === th.key ? ' active' : ''}`}
                  aria-pressed={theme === th.key}
                  onClick={() => setTheme(theme === th.key ? null : th.key)}
                >
                  {th.label}
                </button>
              ))}
            </div>
            <label className="dh-sort">
              <span className="dh-toolbar-label">Sort</span>
              <select value={sort} onChange={e => setSort(e.target.value as SortKey)} aria-label="Sort hampers">
                <option value="curated">Curated order</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
          <div className="dh-toolbar-meta" aria-live="polite">
            Showing <strong>{filtered.length}</strong> of {products.length} hampers · prices per unit, exclusive of GST · MOQ 10 units
          </div>
        </div>

        {/* Groups */}
        {groups.length === 0 ? (
          <div className="cp-showcase-empty">
            No hampers match these filters.{' '}
            <button className="dh-link-btn" onClick={() => { onTierChange('all'); setTheme(null) }}>Reset filters</button>
          </div>
        ) : (
          groups.map(g => (
            <section key={g.tier.key} id={`tier-${g.tier.key}`} className="dh-group" aria-labelledby={`tier-${g.tier.key}-title`}>
              <div className="dh-group-head">
                <h3 id={`tier-${g.tier.key}-title`} className="dh-group-title">
                  {g.tier.title} <span className="dh-group-range">{g.tier.range}</span>
                </h3>
                <p className="dh-group-desc">{g.tier.desc} <span className="dh-group-best">Best for: {g.tier.bestFor}.</span></p>
              </div>
              <div className="dh-grid">
                {g.items.map(p => {
                  const img = p.image?.sizes?.card?.url || p.image?.url || null
                  const qty = inPack(p.id)
                  const feats = p.features ?? []
                  return (
                    <article key={p.id} id={`product-${p.id}`} className="dh-card">
                      <button type="button" className="dh-card-media" onClick={() => setSelected(p)} aria-label={`View details: ${p.name}`}>
                        {img ? (
                          <Image
                            src={img}
                            alt={p.image?.alt || `${p.name} - corporate Diwali gift hamper by MintBox`}
                            width={600}
                            height={600}
                            sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 280px"
                            unoptimized
                          />
                        ) : (
                          <span className="cp-product-emoji" aria-hidden="true">{p.emoji || '🪔'}</span>
                        )}
                        {p.customisable && <span className="cp-product-badge">Logo branding</span>}
                      </button>
                      <div className="dh-card-body">
                        <div className="dh-card-tier">{g.tier.title}</div>
                        <h4 className="dh-card-name">{p.name}</h4>
                        <div className="dh-card-price">
                          {formatPrice(p.price)} <span>per unit · ex GST</span>
                        </div>
                        {feats.length > 0 && (
                          <details className="dh-inside">
                            <summary>What&rsquo;s inside <span className="dh-inside-count">{feats.length} items</span></summary>
                            <ul>
                              {feats.map((f, i) => <li key={f.id ?? i}>{f.feature}</li>)}
                            </ul>
                          </details>
                        )}
                        <div className="dh-card-actions">
                          <button
                            type="button"
                            className={`dh-btn-add${justAdded === p.id ? ' added' : ''}`}
                            onClick={() => handleAdd(p)}
                          >
                            {justAdded === p.id ? '✓ Added to pack' : qty > 0 ? `+ Add another (${qty} in pack)` : '+ Add to pack'}
                          </button>
                          <button type="button" className="dh-btn-view" onClick={() => setSelected(p)}>Details</button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))
        )}

        <div className="dh-showcase-foot">
          <span>Add hampers to your pack, then request one quote for everything. Mixed tiers in one order are fine.</span>
          {count > 0 && (
            <button className="dh-btn-quote" onClick={() => setShowLead(true)}>
              Request quote ({count} item{count !== 1 ? 's' : ''})
            </button>
          )}
        </div>
      </div>

      {count > 0 && (
        <div className="cp-pack-bar" onClick={() => setShowLead(true)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setShowLead(true)}>
          <div className="cp-pack-bar-icon" aria-hidden="true">🛍</div>
          <div className="cp-pack-bar-text">
            <div className="cp-pack-bar-label">{count} item{count !== 1 ? 's' : ''} in your pack</div>
            <div className="cp-pack-bar-sub">Est. {formatPrice(total)} · MOQ applies</div>
          </div>
          <span className="cp-pack-bar-cta">Request Quote →</span>
        </div>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      {showLead && <LeadModal onClose={() => setShowLead(false)} />}
    </>
  )
}
