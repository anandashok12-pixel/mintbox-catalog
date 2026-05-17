'use client'

import { useState } from 'react'
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
  const [selectedCat, setSelectedCat] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [leadOpen, setLeadOpen] = useState(false)
  const count = useCartStore((s) => s.count())

  return (
    <>
      <Navbar />

      <div className="app-body">
        <Sidebar
          categories={categories}
          selectedCat={selectedCat}
          onSelectCat={setSelectedCat}
        />

        <main className="main-content">
          <div className="filter-bar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
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
            selectedCat={selectedCat}
            search={search}
            maxPrice={maxPrice}
            onProductClick={setActiveProduct}
          />
        </main>

        <CartPanel onRequestPricing={() => setLeadOpen(true)} />
      </div>

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
