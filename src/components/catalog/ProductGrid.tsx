'use client'

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useCartStore, useHasMounted } from '@/lib/cartStore'
import { MIN_ORDER_UNITS } from '@/lib/businessFacts'
import { categorySectionId, isJumping } from './catalogScroll'

interface Feature {
  feature: string
  id?: string
}

export interface CatalogCategory {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

export interface CatalogProduct {
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
  inStock?: boolean | null
  category: CatalogCategory | string
}

export interface CatalogGroup {
  cat: CatalogCategory
  items: CatalogProduct[]
}

interface ProductGridProps {
  groups: CatalogGroup[]
  search: string
  /** Changes whenever search / price / sort change; resets incremental reveal. */
  filterKey: string
  hasActiveFilters: boolean
  onClearFilters: () => void
  onProductClick: (product: CatalogProduct) => void
}

// Incremental rendering: 396 products at once made /catalog ~76,000px tall
// on phones. Each section starts with a few rows; scrolling to the end of a
// section (or pressing "Show more") reveals the next batch.
const INITIAL_PER_SECTION = 12
const STEP = 48
// Cards in the first section's first row are the LCP candidates.
const FIRST_ROW = 4

const cardImageUrl = (p: CatalogProduct) =>
  // `sizes.card` is a 480px WebP once scripts/generate-card-thumbnails.ts has
  // run; until then fall back to the original upload.
  p.image?.sizes?.card?.url || p.image?.url || null

export default function ProductGrid({
  groups,
  search,
  filterKey,
  hasActiveFilters,
  onClearFilters,
  onProductClick,
}: ProductGridProps) {
  const [limits, setLimits] = useState<Record<string, number>>({})
  const [limitsKey, setLimitsKey] = useState(filterKey)
  if (limitsKey !== filterKey) {
    setLimitsKey(filterKey)
    setLimits({})
  }

  const reveal = useCallback(
    (catId: string, total: number) =>
      setLimits((prev) => {
        const current = prev[catId] ?? INITIAL_PER_SECTION
        if (current >= total) return prev
        return { ...prev, [catId]: current + STEP }
      }),
    [],
  )

  if (groups.length === 0) {
    const q = search.trim()
    return (
      <div className="no-results" role="status">
        <p className="no-results-title">
          {q ? <>No products match &ldquo;{q}&rdquo;</> : 'No products match these filters'}
        </p>
        <p className="no-results-sub">
          Try a broader word like &ldquo;bottle&rdquo; or &ldquo;hamper&rdquo;, or raise the price limit.
        </p>
        {(q || hasActiveFilters) && (
          <button type="button" className="no-results-clear" onClick={onClearFilters}>
            Clear search and filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="product-sections">
      {groups.map(({ cat, items }, sectionIndex) => (
        <CategorySection
          key={cat.id}
          cat={cat}
          items={items}
          limit={limits[cat.id] ?? INITIAL_PER_SECTION}
          isFirst={sectionIndex === 0}
          onReveal={reveal}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  )
}

interface CategorySectionProps {
  cat: CatalogCategory
  items: CatalogProduct[]
  limit: number
  isFirst: boolean
  onReveal: (catId: string, total: number) => void
  onProductClick: (product: CatalogProduct) => void
}

function CategorySection({ cat, items, limit, isFirst, onReveal, onProductClick }: CategorySectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const visible = items.slice(0, limit)
  const remaining = items.length - visible.length
  const headingId = `${categorySectionId(cat.slug || cat.id)}-title`

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || remaining <= 0 || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !isJumping()) {
          onReveal(cat.id, items.length)
        }
      },
      // Start loading a little before the sentinel is on screen.
      { rootMargin: '0px 0px 600px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [cat.id, items.length, remaining, onReveal])

  return (
    <section id={categorySectionId(cat.name)} className="cat-section" aria-labelledby={headingId}>
      <div className="cat-section-header">
        <h2 id={headingId} className="cat-title">{cat.name}</h2>
        <span className="cat-count">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <ul className="product-grid">
        {visible.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            highPriority={isFirst && i < FIRST_ROW}
            onOpen={onProductClick}
          />
        ))}
      </ul>
      {remaining > 0 && (
        <div ref={sentinelRef} className="cat-section-more">
          <button type="button" className="btn-show-more" onClick={() => onReveal(cat.id, items.length)}>
            Show more {cat.name} ({remaining} left)
          </button>
        </div>
      )}
    </section>
  )
}

interface ProductCardProps {
  product: CatalogProduct
  highPriority: boolean
  onOpen: (product: CatalogProduct) => void
}

const ProductCard = memo(function ProductCard({ product, highPriority, onOpen }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const mounted = useHasMounted()
  const storedQty = useCartStore((s) => s.items.find((i) => i.id === product.id)?.quantity ?? 0)
  const inPackQty = mounted ? storedQty : 0
  const imageUrl = cardImageUrl(product)

  const handleAdd = () => {
    const cat = typeof product.category === 'object' ? product.category : null
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji || undefined,
      imageUrl: imageUrl || undefined,
      categoryName: cat?.name || '',
    })
  }

  return (
    <li className="product-card">
      <div className="product-card-image">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1100px) 33vw, 240px"
            loading={highPriority ? 'eager' : 'lazy'}
            fetchPriority={highPriority ? 'high' : 'auto'}
            decoding="async"
            // TEMPORARY: Vercel Image Optimization quota is exhausted
            // (402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED), so serve
            // originals straight from Blob CDN. Remove once the plan is
            // upgraded so AVIF/WebP variants come back.
            unoptimized
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <span className="product-card-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="product-card-body">
        {/* The name is the card's real button; CSS stretches its hit area
            over the whole card so a click anywhere opens details, while
            "Add to Pack" stays a sibling control, not a nested one. */}
        <h3 className="product-card-name">
          <button type="button" className="product-card-open" onClick={() => onOpen(product)}>
            {product.name}
          </button>
        </h3>
        <p className="product-card-price">
          ₹{product.price.toLocaleString('en-IN')}
          <span className="product-card-moq"> / unit</span>
        </p>
        <p className="product-card-moq-text">Min. {MIN_ORDER_UNITS} units</p>
        <button
          type="button"
          className={`btn-add-cart${inPackQty > 0 ? ' in-pack' : ''}`}
          onClick={handleAdd}
          aria-label={
            inPackQty > 0
              ? `Add 1 more ${product.name} (${inPackQty} units in pack)`
              : `Add ${product.name} to pack, ${MIN_ORDER_UNITS} units`
          }
        >
          {inPackQty > 0 ? `+1 · ${inPackQty} in pack` : '+ Add to Pack'}
        </button>
      </div>
    </li>
  )
})
