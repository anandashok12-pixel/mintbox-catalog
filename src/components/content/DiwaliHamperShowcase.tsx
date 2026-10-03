'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'
import ProductModal from '@/components/modals/ProductModal'
import LeadModal from '@/components/modals/LeadModal'
import { MOQ, TIERS, moqFor, formatPrice, formatRange, formatTierRange, tierFor, type Tier, type TierKey } from '@/components/pages/diwaliHubData'

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

export { TIERS, tierFor }
export type { Tier, TierKey }

const THEMES: Array<{ key: string; label: string; re: RegExp }> = [
  { key: 'dryfruits', label: 'Dry fruits & sweets', re: /dry fruit|almond|cashew|pistachio|raisin|kishmish|chocolate|ferrero|brittle|cookie|wafer|hershey|sweet/i },
  { key: 'copper', label: 'Copper drinkware', re: /copper/i },
  { key: 'eco', label: 'Eco-friendly', re: /eco|bamboo|husk|seed |jute|cork|wooden|plantable/i },
  { key: 'tech', label: 'Tech & desk', re: /wireless charger|power bank|laptop stand|mobile stand|charging cable|pen drive|humidifier|desk|notebook|pen stand|calendar/i },
  { key: 'lamps', label: 'Diyas, lamps & candles', re: /diya|lamp|light|candle/i },
]

type SortKey = 'curated' | 'price-asc' | 'price-desc'

// Never changes: used only to give useSyncExternalStore a stable subscription
// so it can distinguish the server snapshot from the client one.
const subscribeNoop = () => () => {}

function haystack(p: DiwaliProduct): string {
  return [p.name, p.description, ...(p.features?.map(f => f.feature) ?? [])].join(' ')
}

interface Props {
  products: DiwaliProduct[]
  tier: TierKey | 'all'
  onTierChange: (t: TierKey | 'all') => void
  /** Pre-selected occasion in the quote popup, e.g. 'diwali'. */
  defaultOccasion?: string
  /** 'addons' shows one flat, budget-free group for single add-on gifts. */
  variant?: 'tiers' | 'addons'
  /** Only one showcase per page should own the fixed pack bar. */
  showPackBar?: boolean
}

interface Group {
  key: string
  title: string
  desc: string
  bestFor?: string
  items: DiwaliProduct[]
}

export default function DiwaliHamperShowcase({
  products,
  tier,
  onTierChange,
  defaultOccasion,
  variant = 'tiers',
  showPackBar = true,
}: Props) {
  const isAddons = variant === 'addons'
  const [theme, setTheme] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('price-asc')
  const [selected, setSelected] = useState<DiwaliProduct | null>(null)
  const [showLead, setShowLead] = useState(false)
  const [justAdded, setJustAdded] = useState<string | null>(null)

  // The cart store rehydrates from sessionStorage, so cart-derived UI only
  // renders on the client - otherwise the first client render disagrees with
  // the server HTML and React throws away the whole SSR tree.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)

  const addItem = useCartStore(s => s.addItem)
  const updateQty = useCartStore(s => s.updateQty)
  const items = useCartStore(s => s.items)
  const storedCount = useCartStore(s => s.count())
  const storedTotal = useCartStore(s => s.total())
  const count = mounted ? storedCount : 0
  const lines = mounted ? items.length : 0

  // The fixed pack bar would otherwise sit on top of the last lines of the
  // page (footer links, form submit). Reserve room for it while it shows.
  useEffect(() => {
    if (lines === 0) return
    document.body.classList.add('has-pack-bar')
    return () => document.body.classList.remove('has-pack-bar')
  }, [lines])
  const total = mounted ? storedTotal : 0

  const filtered = useMemo(() => {
    const t = isAddons ? undefined : TIERS.find(x => x.key === tier)
    const th = THEMES.find(x => x.key === theme)
    const list = products.filter(p => {
      if (t && tierFor(p.price).key !== t.key) return false
      if (th && !th.re.test(haystack(p))) return false
      return true
    })
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    return list
  }, [products, tier, theme, sort, isAddons])

  const groups = useMemo<Group[]>(() => {
    if (isAddons) {
      return filtered.length
        ? [{ key: 'addons', title: 'Add-on gifts', desc: 'Single gifts to pair with a hamper, top up a budget or give on their own.', items: filtered }]
        : []
    }
    return TIERS.map(t => ({ key: t.key, title: t.title, desc: t.desc, bestFor: t.bestFor, items: filtered.filter(p => tierFor(p.price).key === t.key) })).filter(
      g => g.items.length > 0,
    )
  }, [filtered, isAddons])

  const tierCounts = useMemo(() => {
    const m: Record<string, number> = { all: products.length }
    for (const t of TIERS) m[t.key] = products.filter(p => tierFor(p.price).key === t.key).length
    return m
  }, [products])

  // Items go into the pack at the minimum order quantity, and each further
  // click adds another MOQ's worth, so the estimate is a real order value.
  const handleAdd = (p: DiwaliProduct) => {
    const cat = typeof p.category === 'object' ? p.category : null
    const moq = moqFor(p)
    const existing = items.find(i => i.id === p.id)
    if (existing) {
      updateQty(p.id, existing.quantity + moq)
      setJustAdded(p.id)
      window.setTimeout(() => setJustAdded(prev => (prev === p.id ? null : prev)), 1600)
      return
    }
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      emoji: p.emoji || undefined,
      imageUrl: p.image?.sizes?.card?.url || p.image?.url || undefined,
      categoryName: cat?.name || 'Diwali Gift Boxes',
      moq,
    })
    updateQty(p.id, moq)
    setJustAdded(p.id)
    window.setTimeout(() => setJustAdded(prev => (prev === p.id ? null : prev)), 1600)
  }

  const inPack = (id: string) => (mounted ? items.find(i => i.id === id)?.quantity ?? 0 : 0)

  return (
    <>
      <div className="dh-showcase">
        {/* Toolbar */}
        <div className="dh-toolbar" role="group" aria-label="Filter Diwali hampers">
          {!isAddons && <div className="dh-toolbar-row">
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
          </div>}
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
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="curated">Curated order</option>
              </select>
            </label>
          </div>
          <div className="dh-toolbar-meta" aria-live="polite">
            Showing <strong>{filtered.length}</strong> of {products.length} {isAddons ? 'add-on gifts' : 'hampers & boxes'} · prices per unit, exclusive of GST · MOQ {MOQ} units
          </div>
        </div>

        {/* Groups */}
        {groups.length === 0 ? (
          <div className="cp-showcase-empty">
            No gifts match these filters.{' '}
            <button className="dh-link-btn" onClick={() => { onTierChange('all'); setTheme(null) }}>Reset filters</button>
          </div>
        ) : (
          groups.map(g => (
            <section key={g.key} id={`tier-${g.key}`} className="dh-group" aria-labelledby={`tier-${g.key}-title`}>
              <div className="dh-group-head">
                <h3 id={`tier-${g.key}-title`} className="dh-group-title">
                  {g.title}{' '}
                  <span className="dh-group-range">
                    {(isAddons ? formatRange : formatTierRange)(Math.min(...g.items.map(p => p.price)), Math.max(...g.items.map(p => p.price)))}
                  </span>
                </h3>
                <p className="dh-group-desc">
                  {g.desc} {g.bestFor && <span className="dh-group-best">Best for: {g.bestFor}.</span>}
                </p>
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
                        <div className="dh-card-tier">{isAddons ? 'Add-on' : g.title}</div>
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
                            {justAdded === p.id
                              ? `✓ ${qty} units in pack`
                              : qty > 0
                                ? `+ ${moqFor(p)} more · ${qty} in pack`
                                : `+ Add ${moqFor(p)} to pack`}
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
          <span>Add gifts to your pack, then request one quote for everything. Mixed tiers in one order are fine.</span>
          {lines > 0 && (
            <span className="dh-showcase-foot-actions">
              <a className="dh-btn-view" href="/diwali-corporate-gifts/shortlist">
                Download shortlist (PDF)
              </a>
              <button className="dh-btn-quote" onClick={() => setShowLead(true)}>
                Request quote ({lines} item{lines !== 1 ? 's' : ''})
              </button>
            </span>
          )}
        </div>
      </div>

      {showPackBar && lines > 0 && (
        <button type="button" className="cp-pack-bar dh-pack-bar" onClick={() => setShowLead(true)}>
          <span className="cp-pack-bar-icon" aria-hidden="true">🛍</span>
          <span className="cp-pack-bar-text">
            <span className="cp-pack-bar-label">
              {lines} item{lines !== 1 ? 's' : ''} · {count} units in your pack
            </span>
            <span className="cp-pack-bar-sub">Est. {formatPrice(total)} ex GST</span>
          </span>
          <span className="cp-pack-bar-cta">Request a quote →</span>
        </button>
      )}

      {selected && <ProductModal product={{ ...selected, moq: moqFor(selected) }} onClose={() => setSelected(null)} />}
      {showLead && <LeadModal onClose={() => setShowLead(false)} defaultOccasion={defaultOccasion} />}
    </>
  )
}
