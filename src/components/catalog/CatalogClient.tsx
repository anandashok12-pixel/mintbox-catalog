'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar'
import ProductGrid, { type CatalogGroup, type CatalogProduct } from './ProductGrid'
import CartPanel from '../cart/CartPanel'
import ProductModal from '../modals/ProductModal'
import LeadModal from '../modals/LeadModal'
import { useCartStore, useHasMounted } from '@/lib/cartStore'
import { NAVBAR_OFFSET, scrollToCategory } from './catalogScroll'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface Category {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

type Product = CatalogProduct

type SortKey = 'recommended' | 'price-asc' | 'price-desc'

const PRICE_CEILING = 10000

interface CatalogClientProps {
  categories: Category[]
  products: Product[]
}

export default function CatalogClient({ categories, products }: CatalogClientProps) {
  const [search, setSearch] = useState('')
  // activeCat tracks which category section is currently in view (scroll-spy).
  // The sidebar uses it for highlight only - it does NOT filter the grid.
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState(PRICE_CEILING)
  const [sort, setSort] = useState<SortKey>('recommended')
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [leadOpen, setLeadOpen] = useState(false)
  // Mobile-only: cart drawer toggle. Desktop renders the cart as a sticky side
  // panel; on mobile that's hidden and replaced with a floating button that
  // opens the cart as a full-height sheet.
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  const mounted = useHasMounted()
  const storedLines = useCartStore((s) => s.items.length)
  const lines = mounted ? storedLines : 0

  const query = search.trim().toLowerCase()
  const isSearching = query.length > 0
  const hasActiveFilters = isSearching || maxPrice < PRICE_CEILING || sort !== 'recommended'
  const filterKey = `${query}|${maxPrice}|${sort}`

  // Search, price and sort always run over the full product list; only the
  // rendering is incremental (see ProductGrid).
  const groups = useMemo<CatalogGroup[]>(() => {
    const filtered = products.filter((p) => {
      if (p.price > maxPrice) return false
      if (!query) return true
      const catName = typeof p.category === 'object' ? p.category.name : ''
      return p.name.toLowerCase().includes(query) || catName.toLowerCase().includes(query)
    })
    const sorted =
      sort === 'price-asc'
        ? [...filtered].sort((a, b) => a.price - b.price)
        : sort === 'price-desc'
          ? [...filtered].sort((a, b) => b.price - a.price)
          : filtered
    return categories
      .map((cat) => ({
        cat,
        items: sorted.filter((p) => typeof p.category === 'object' && p.category?.id === cat.id),
      }))
      .filter((g) => g.items.length > 0)
  }, [products, categories, query, maxPrice, sort])

  const visibleCatNames = useMemo(() => new Set(groups.map((g) => g.cat.name)), [groups])

  const clearFilters = useCallback(() => {
    setSearch('')
    setMaxPrice(PRICE_CEILING)
    setSort('recommended')
  }, [])

  // Body scroll lock when mobile cart drawer is open; Escape closes it.
  useEffect(() => {
    if (!mobileCartOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileCartOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [mobileCartOpen])

  // Scroll-spy: highlight the sidebar entry for whichever category section
  // sits closest to the top of the viewport.
  //
  // Bug fixed here: this effect used to run only when `products` changed, so
  // after typing a search it kept observing section nodes React had already
  // removed. Detached nodes report a zero rect (top 0 <= trigger), so the spy
  // "found" a stale category and highlighted the wrong one. It now re-binds
  // whenever the rendered sections change, and is suspended entirely while a
  // search query is active (the result list isn't a browsable sequence).
  useEffect(() => {
    if (isSearching) return
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id^="cat-"]'))
    if (sections.length === 0) return

    const nameToSlug = new Map(categories.map((c) => [c.name, c.slug]))

    const recompute = () => {
      // The last section whose top has scrolled above the trigger line
      // (navbar bottom + 1px) is the one in focus.
      const trigger = NAVBAR_OFFSET + 1
      let current: string | null = null
      for (const sec of sections) {
        if (!sec.isConnected) continue
        if (sec.getBoundingClientRect().top <= trigger) {
          current = nameToSlug.get(sec.id.replace(/^cat-/, '')) ?? null
        } else {
          break
        }
      }
      setActiveCat(current)
    }

    const observer = new IntersectionObserver(recompute, {
      rootMargin: `-${NAVBAR_OFFSET}px 0px 0px 0px`,
      threshold: [0, 1],
    })
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [categories, groups, isSearching])

  const spyCat = isSearching ? null : activeCat
  const closeProduct = useCallback(() => setActiveProduct(null), [])

  return (
    <>
      <Navbar />

      <div className="app-body">
        <Sidebar categories={categories} activeCat={spyCat} visibleCatNames={visibleCatNames} />

        <main className="main-content">
          {/* SEO/a11y page heading. Visually hidden — the catalog UI leads
              with the filter/category strip, so a visible h1 would disrupt
              the dense layout, but the page still needs a single h1. */}
          <h1
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          >
            MintBox Corporate Gifting Catalogue
          </h1>
          {/* Mobile-only horizontal category chip strip - sidebar is hidden
              at this breakpoint, so this is the primary way to jump between
              categories on a phone. */}
          <nav className="mobile-cat-strip" aria-label="Category navigation">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`mobile-cat-chip${spyCat === cat.slug ? ' active' : ''}`}
                aria-current={spyCat === cat.slug ? 'true' : undefined}
                disabled={!visibleCatNames.has(cat.name)}
                onClick={() => scrollToCategory(cat.name)}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>

          <div className="filter-bar" role="search">
            <div className="search-wrap">
              <label htmlFor="catalog-search" className="catalog-sr-only">
                Search products
              </label>
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="7" cy="7" r="4.5" />
                  <line x1="10.5" y1="10.5" x2="14" y2="14" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="catalog-search"
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                className="search-input"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" className="search-clear" aria-label="Clear search" onClick={() => setSearch('')}>
                  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            <div className="price-filter">
              <label className="price-label" htmlFor="catalog-max-price">
                Max price per unit: <strong>₹{maxPrice.toLocaleString('en-IN')}{maxPrice >= PRICE_CEILING ? '+' : ''}</strong>
              </label>
              <input
                id="catalog-max-price"
                type="range"
                min={100}
                max={PRICE_CEILING}
                step={100}
                value={maxPrice}
                aria-valuetext={`₹${maxPrice.toLocaleString('en-IN')}`}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
            </div>
            <div className="sort-filter">
              <label className="price-label" htmlFor="catalog-sort">
                Sort
              </label>
              <select
                id="catalog-sort"
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          <ProductGrid
            groups={groups}
            search={search}
            filterKey={filterKey}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onProductClick={setActiveProduct}
          />
        </main>

        <CartPanel onRequestPricing={() => setLeadOpen(true)} />
      </div>

      {/* Mobile-only floating cart trigger. Shows how many products are in
          the pack. Hidden when the sheet is already open. */}
      {!mobileCartOpen && (
        <button
          type="button"
          className="mobile-cart-fab"
          aria-label={`View pack (${lines} ${lines === 1 ? 'product' : 'products'})`}
          aria-haspopup="dialog"
          onClick={() => setMobileCartOpen(true)}
        >
          <span className="mobile-cart-fab-label">Pack</span>
          {lines > 0 && <span className="mobile-cart-fab-count">{lines}</span>}
        </button>
      )}

      {/* Mobile pack sheet: full dynamic-viewport height so the footer
          (total + CTA) is always on screen, never below the fold. */}
      {mobileCartOpen && (
        <div className="mobile-cart-overlay" onClick={() => setMobileCartOpen(false)}>
          <div
            className="mobile-cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your pack"
            onClick={(e) => e.stopPropagation()}
          >
            <CartPanel
              variant="sheet"
              headerAction={
                <button
                  type="button"
                  className="mobile-cart-close"
                  aria-label="Close pack"
                  autoFocus
                  onClick={() => setMobileCartOpen(false)}
                >
                  <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              }
              onRequestPricing={() => {
                setMobileCartOpen(false)
                setLeadOpen(true)
              }}
            />
          </div>
        </div>
      )}

      {activeProduct && <ProductModal product={activeProduct} onClose={closeProduct} />}
      {leadOpen && <LeadModal onClose={() => setLeadOpen(false)} />}

      <Footer />
    </>
  )
}
