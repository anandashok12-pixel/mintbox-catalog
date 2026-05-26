'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'
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
}: ContentProductShowcaseProps) {
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')
  const [priceMax, setPriceMax] = useState(maxPrice)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)

  const count = useCartStore(s => s.count())
  const total = useCartStore(s => s.total())

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
                {cat.emoji && <span>{cat.emoji}</span>}
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
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,24,0.4)', fontSize: '16px', lineHeight: 1, padding: 0 }} onClick={() => setSearch('')}>×</button>
              )}
            </div>
          )}

          {/* Price slider */}
          {showPriceFilter && (
            <div className="cp-price-filter">
              <span className="cp-price-label">
                Budget: up to <strong>{formatPrice(priceMax)}</strong>
              </span>
              <input
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
            No products match your filters. <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--forest-green,#1B4D3E)', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }} onClick={() => { setActiveCat('all'); setSearch(''); setPriceMax(maxPrice) }}>Reset filters</button>
          </div>
        ) : (
          <div className="cp-showcase-grid">
            {filtered.map(product => {
              const imgUrl = product.image?.sizes?.card?.url || product.image?.url || null
              const catName = typeof product.category === 'object' ? product.category?.name : ''
              return (
                <div
                  key={product.id}
                  className="cp-product-card"
                  onClick={() => setSelectedProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelectedProduct(product)}
                >
                  <div className="cp-product-image">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={product.name}
                        width={240}
                        height={240}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="cp-product-emoji">{product.emoji || '🎁'}</span>
                    )}
                    {product.customisable && (
                      <span className="cp-product-badge">Custom</span>
                    )}
                  </div>
                  <div className="cp-product-info">
                    {catName && <div className="cp-product-cat">{catName}</div>}
                    <div className="cp-product-name">{product.name}</div>
                    <div className="cp-product-price">{formatPrice(product.price)}</div>
                    {product.moq && (
                      <div className="cp-product-moq">Min. {product.moq} units</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div className="cp-showcase-footer">
          <span className="cp-showcase-footer-text">
            Click any product to view details and add to your quote pack.
          </span>
          {count > 0 && (
            <button
              onClick={() => setShowLeadModal(true)}
              style={{ background: 'var(--forest-green,#1B4D3E)', color: '#f2f2f2', border: 'none', borderRadius: '999px', padding: '8px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Satoshi, sans-serif' }}
            >
              Request Quote ({count} item{count !== 1 ? 's' : ''})
            </button>
          )}
        </div>
      </div>

      {/* Floating pack bar */}
      {count > 0 && (
        <div className="cp-pack-bar" onClick={() => setShowLeadModal(true)} role="button" tabIndex={0}>
          <div className="cp-pack-bar-icon">🛍</div>
          <div className="cp-pack-bar-text">
            <div className="cp-pack-bar-label">{count} item{count !== 1 ? 's' : ''} in your pack</div>
            <div className="cp-pack-bar-sub">Est. {formatPrice(total)} · MOQ applies</div>
          </div>
          <span className="cp-pack-bar-cta">Request Quote →</span>
        </div>
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
