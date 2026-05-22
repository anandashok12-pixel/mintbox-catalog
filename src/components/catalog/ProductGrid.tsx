'use client'

import Image from 'next/image'
import { useCartStore } from '@/lib/cartStore'

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

interface ProductGridProps {
  products: Product[]
  categories: Category[]
  search: string
  maxPrice: number
  onProductClick: (product: Product) => void
}

export default function ProductGrid({
  products,
  categories,
  search,
  maxPrice,
  onProductClick,
}: ProductGridProps) {
  const addItem = useCartStore((s) => s.addItem)

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (p.price > maxPrice) return false
    return true
  })

  const grouped = categories
    .map((cat) => ({
      cat,
      items: filtered.filter((p) => {
        const c = typeof p.category === 'object' ? p.category : null
        return c?.id === cat.id
      }),
    }))
    .filter((g) => g.items.length > 0)

  if (grouped.length === 0) {
    return (
      <div className="no-results">
        <p>No products found matching your filters.</p>
      </div>
    )
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    const cat = typeof product.category === 'object' ? product.category : null
    const imageUrl =
      product.image?.sizes?.card?.url || product.image?.url || undefined
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji || undefined,
      imageUrl,
      categoryName: cat?.name || '',
    })
  }

  return (
    <div className="product-sections">
      {grouped.map(({ cat, items }) => (
        <section key={cat.id} id={`cat-${cat.name}`} className="cat-section">
          <div className="cat-section-header">
            {cat.emoji && <span className="cat-emoji">{cat.emoji}</span>}
            <h2 className="cat-title">{cat.name}</h2>
            <span className="cat-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
          </div>
          <div className="product-grid">
            {items.map((product) => {
              const imageUrl =
                product.image?.sizes?.card?.url || product.image?.url || null
              return (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => onProductClick(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onProductClick(product)}
                >
                  <div className="product-card-image">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="product-card-emoji">{product.emoji || '🎁'}</span>
                    )}
                  </div>
                  <div className="product-card-body">
                    <p className="product-card-name">{product.name}</p>
                    <p className="product-card-price">
                      ₹{product.price.toLocaleString('en-IN')}
                      <span className="product-card-moq"> / unit</span>
                    </p>
                    {product.moq && (
                      <p className="product-card-moq-text">MOQ: {product.moq} units</p>
                    )}
                    <button
                      className="btn-add-cart"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      + Add to Pack
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
