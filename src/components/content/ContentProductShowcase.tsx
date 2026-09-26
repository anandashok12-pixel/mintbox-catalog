'use client'

import { useState, useMemo, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore, useHasMounted } from '@/lib/cartStore'
import { MIN_ORDER_UNITS } from '@/lib/businessFacts'
import ProductModal from '@/components/modals/ProductModal'
import LeadModal from '@/components/modals/LeadModal'

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
    sizes?: { card?: { url?: string | null } }
  } | null
  description: string
  features?: Array<{ feature: string; id?: string }> | null
  moq?: number | null
  customisable?: boolean | null
  inStock?: boolean | null
  category: Category | string
}

interface ContentProductShowcaseProps {
  products: Product[]
  categories: Category[]
  heading?: string
  maxPrice?: number
  onlyCustomisable?: boolean
  filterCategoryId?: string
  showPriceFilter?: boolean
  showSearch?: boolean
  gridCols?: number
  /** Cards rendered before "Show more". Content pages pass up to 500 products. */
  maxItems?: number
}

export default function ContentProductShowcase({
  products,
  categories,
  heading = 'Browse Products',
  maxPrice = 10000,
  onlyCustomisable = false,
  filterCategoryId,
  showPriceFilter = true,
  showSearch = true,
  maxItems = 24,
}: ContentProductShowcaseProps) {
  const uid = useId()
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')
  const [priceMax, setPriceMax] = useState(maxPrice)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)

  const [extra, setExtra] = useState(0)
  const mounted = useHasMounted()
  const storedLines = useCartStore(s => s.items.length)
  const storedTotal = useCartStore(s => s.total())
  // Products in the pack (each carries its own unit quantity). Gated on mount:
  // the pack lives in localStorage, so the server always renders it empty.
  const count = mounted ? storedLines : 0
  const total = mounted ? storedTotal : 0

  // Build category list from products actually present
  const usedCatIds = useMemo(() => new Set(products.map(p =>
    typeof p.category === 'object' ? p.category?.id : p.category
  )), [products])

  const visibleCats = useMemo(() =>
    categories.filter(c => usedCatIds.has(c.id)),
    [categories, usedCatIds]
  )

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (onlyCustomisable && !p.customisable) return false
      if (filterCategoryId) {
        const catId = typeof p.category === 'object' ? p.category?.id : p.category
        if (catId !== filterCategoryId) return false
      }
      if (activeCat !== 'all') {
        const catId = typeof p.category === 'object' ? p.category?.id : p.category
        if (catId !== activeCat) return false
      }
      if (p.price > priceMax) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [products, onlyCustomisable, filterCategoryId, activeCat, priceMax, search])

  const filterKey = `${activeCat}|${priceMax}|${search.trim()}`
  const [extraKey, setExtraKey] = useState(filterKey)
  if (extraKey !== filterKey) {
    setExtraKey(filterKey)
    setExtra(0)
  }
  const limit = maxItems + extra
  const shown = filtered.slice(0, limit)
  const remaining = filtered.length - shown.length

  const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <>
      <div className="cp-showcase">
        {/* Header */}
        <div className="cp-showcase-header">
          <div>
            <div className="cp-showcase-title">{heading}</div>
          </div>
          <div className="cp-showcase-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</div>
        </div>

        {/* Filters */}
        <div className="cp-showcase-filters">
          {/* Category tabs */}
          <div className="cp-cat-tabs">
            <button
              className={`cp-cat-tab${activeCat === 'all' ? ' active' : ''}`}
              onClick={() => setActiveCat('all')}
            >
              All
            </button>
            {visibleCats.map(cat => (
              <button
                key={cat.id}
                className={`cp-cat-tab${activeCat === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search */}
          {showSearch && (
            <div className="cp-showcase-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(26,26,24,0.35)', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="cp-showcase-search-input"
                type="text"
                placeholder="Search products…"
                aria-label="Search products"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" aria-label="Clear search" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,24,0.4)', fontSize: '16px', lineHeight: 1, padding: 0 }} onClick={() => setSearch('')}>×</button>
              )}
            </div>
          )}

          {/* Price slider */}
          {showPriceFilter && (
            <div className="cp-price-filter">
              <label className="cp-price-label" htmlFor={`${uid}-price`}>
                Budget: up to <strong>{formatPrice(priceMax)}</strong>
              </label>
              <input
                id={`${uid}-price`}
                type="range"
                className="cp-price-slider"
                min={100}
                max={maxPrice}
                step={100}
                value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="cp-showcase-empty">
            No products match your filters. <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--forest-green,#1B4D3E)', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }} onClick={() => { setActiveCat('all'); setSearch(''); setPriceMax(maxPrice) }}>Reset filters</button>
          </div>
        ) : (
          <>
            <ul className="cp-showcase-grid">
              {shown.map(product => {
                const imgUrl = product.image?.sizes?.card?.url || product.image?.url || null
                const catName = typeof product.category === 'object' ? product.category?.name : ''
                return (
                  <li key={product.id} className="cp-product-card">
                    <button
                      type="button"
                      className="cp-product-open"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <span className="cp-product-image">
                        {imgUrl ? (
                          <Image
                            src={imgUrl}
                            alt=""
                            width={240}
                            height={240}
                            sizes="(max-width: 768px) 50vw, 240px"
                            loading="lazy"
                            decoding="async"
                            // Image Optimization quota exhausted (402): serve the Blob
                            // original, or the 480px `sizes.card` WebP once generated.
                            unoptimized
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span className="cp-product-emoji" aria-hidden="true">{product.emoji || '🎁'}</span>
                        )}
                        {product.customisable && (
                          <span className="cp-product-badge">Custom</span>
                        )}
                      </span>
                      <span className="cp-product-info">
                        {catName && <span className="cp-product-cat">{catName}</span>}
                        <span className="cp-product-name">{product.name}</span>
                        <span className="cp-product-price">{formatPrice(product.price)}</span>
                        <span className="cp-product-moq">Min. {MIN_ORDER_UNITS} units</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            {(remaining > 0 || products.length > maxItems) && (
              <div className="cp-showcase-more">
                {remaining > 0 && (
                  <button type="button" className="cp-showcase-more-btn" onClick={() => setExtra(e => e + maxItems)}>
                    Show more ({remaining} left)
                  </button>
                )}
                <Link href="/catalog" className="cp-showcase-more-link">
                  Browse all {products.length} in the catalogue →
                </Link>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="cp-showcase-footer">
          <span className="cp-showcase-footer-text">
            Click any product to view details and add to your quote pack.
          </span>
          {count > 0 && (
            <button
              type="button"
              onClick={() => setShowLeadModal(true)}
              style={{ background: 'var(--forest-green,#1B4D3E)', color: '#f2f2f2', border: 'none', borderRadius: '999px', padding: '8px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Satoshi, sans-serif' }}
            >
              Request Quote ({count} product{count !== 1 ? 's' : ''})
            </button>
          )}
        </div>
      </div>

      {/* Floating pack bar */}
      {count > 0 && (
        <button type="button" className="cp-pack-bar" onClick={() => setShowLeadModal(true)} aria-haspopup="dialog">
          <span className="cp-pack-bar-icon" aria-hidden="true">🛍</span>
          <span className="cp-pack-bar-text">
            <span className="cp-pack-bar-label">{count} product{count !== 1 ? 's' : ''} in your pack</span>
            <span className="cp-pack-bar-sub">Est. {formatPrice(total)} · min. {MIN_ORDER_UNITS} units each</span>
          </span>
          <span className="cp-pack-bar-cta">Request Quote →</span>
        </button>
      )}

      {/* Product modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Lead modal */}
      {showLeadModal && (
        <LeadModal onClose={() => setShowLeadModal(false)} />
      )}
    </>
  )
}
