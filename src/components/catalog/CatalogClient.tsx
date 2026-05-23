'use client'

import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import ProductGrid from './ProductGrid'
import CartPanel from '../cart/CartPanel'
import ProductModal from '../modals/ProductModal'
import LeadModal from '../modals/LeadModal'
import { useCartStore } from '@/lib/cartStore'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

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
  inStock?: boolean | null
  category: Category | string
}

interface CatalogClientProps {
  categories: Category[]
  products: Product[]
}

export default function CatalogClient({ categories, products }: CatalogClientProps) {
  const [search, setSearch] = useState('')
  // activeCat tracks which category section is currently in view (scroll-spy).
  // The sidebar uses it for highlight only - it does NOT filter the grid.
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [leadOpen, setLeadOpen] = useState(false)
  // Mobile-only: cart drawer toggle. Desktop renders the cart as a sticky side
  // panel; on mobile that's hidden and replaced with a floating button that
  // opens the cart as a full-height overlay.
  const [mobileCartOpen, setMobileCartOpen] = useState(false)
  const count = useCartStore((s) => s.count())

  // Body scroll lock when mobile cart drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileCartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileCartOpen])

  const scrollToCategory = (catName: string) => {
    const el = document.getElementById(`cat-${catName}`)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Scroll-spy: highlight the sidebar entry for whichever category section
  // sits closest to the top of the viewport. Top rootMargin matches the
  // sticky navbar height (96px) so a section counts as "active" the moment
  // its header passes under the navbar.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[id^="cat-"]'))
    if (sections.length === 0) return

    const nameToSlug = new Map(categories.map((c) => [c.name, c.slug]))

    const observer = new IntersectionObserver(
      () => {
        // On every change, recompute which section is currently "in focus":
        // the last one whose top has scrolled above the trigger line (navbar bottom + 1px).
        const trigger = 97
        let current: string | null = null
        for (const sec of sections) {
          if (sec.getBoundingClientRect().top <= trigger) {
            const name = sec.id.replace(/^cat-/, '')
            current = nameToSlug.get(name) ?? null
          } else {
            break
          }
        }
        setActiveCat(current)
      },
      { rootMargin: '-96px 0px 0px 0px', threshold: [0, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [categories, products])

  return (
    <>
      <Navbar />

      <div className="app-body">
        <Sidebar categories={categories} activeCat={activeCat} />

        <main className="main-content">
          {/* Mobile-only horizontal category chip strip - sidebar is hidden
              at this breakpoint, so this is the primary way to jump between
              categories on a phone. */}
          <nav className="mobile-cat-strip" aria-label="Category navigation">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`mobile-cat-chip${activeCat === cat.slug ? ' active' : ''}`}
                onClick={() => scrollToCategory(cat.name)}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>

          <div className="filter-bar">
            <div className="search-wrap">
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="7" cy="7" r="4.5" />
                  <line x1="10.5" y1="10.5" x2="14" y2="14" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}>
                  ×
                </button>
              )}
            </div>
            <div className="price-filter">
              <label className="price-label">
                Max Price: <strong>₹{maxPrice.toLocaleString('en-IN')}</strong>
              </label>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
            </div>
          </div>

          <ProductGrid
            products={products}
            categories={categories}
            search={search}
            maxPrice={maxPrice}
            onProductClick={setActiveProduct}
          />
        </main>

        <CartPanel onRequestPricing={() => setLeadOpen(true)} />
      </div>

      {/* Mobile-only floating cart trigger. Shows current item count.
          Hidden when the cart drawer is already open. */}
      {!mobileCartOpen && (
        <button
          type="button"
          className="mobile-cart-fab"
          aria-label={`View pack (${count} ${count === 1 ? 'item' : 'items'})`}
          onClick={() => setMobileCartOpen(true)}
        >
          <span className="mobile-cart-fab-icon" aria-hidden="true">🎁</span>
          <span className="mobile-cart-fab-label">Pack</span>
          {count > 0 && <span className="mobile-cart-fab-count">{count}</span>}
        </button>
      )}

      {/* Mobile cart drawer - slides up from bottom on mobile only. */}
      {mobileCartOpen && (
        <div
          className="mobile-cart-overlay"
          onClick={() => setMobileCartOpen(false)}
          role="dialog"
          aria-label="Your pack"
        >
          <div className="mobile-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="mobile-cart-close"
              aria-label="Close pack"
              onClick={() => setMobileCartOpen(false)}
            >
              ✕
            </button>
            <CartPanel
              onRequestPricing={() => {
                setMobileCartOpen(false)
                setLeadOpen(true)
              }}
            />
          </div>
        </div>
      )}

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}

      {leadOpen && <LeadModal onClose={() => setLeadOpen(false)} />}

      <Footer />
    </>
  )
}
