'use client'

import { useMemo, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import DiwaliHamperShowcase, { type TierKey } from '@/components/content/DiwaliHamperShowcase'
import type { Diwali2026Category, Diwali2026Product } from '@/data/diwali2026Products'

export default function Diwali2026PreviewClient({
  products,
  categories,
}: {
  products: Diwali2026Product[]
  categories: Diwali2026Category[]
}) {
  const [tier, setTier] = useState<TierKey | 'all'>('all')
  const [categorySlug, setCategorySlug] = useState<string | 'all'>('all')

  const filtered = useMemo(
    () => (categorySlug === 'all' ? products : products.filter(p => p.category.slug === categorySlug)),
    [products, categorySlug],
  )

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = { all: products.length }
    for (const c of categories) m[c.slug] = products.filter(p => p.category.slug === c.slug).length
    return m
  }, [products, categories])

  return (
    <div className="cp-wrapper">
      <Navbar />

      <div style={{ background: '#3a1f1f', color: '#f5d0d0', padding: '10px 24px', textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
        LOCAL REVIEW ONLY - draft catalog, not deployed. All {products.length} products are status: draft.
      </div>

      <section className="cp-section cp-section--cream" aria-labelledby="preview-title">
        <div className="cp-container">
          <h1 id="preview-title" className="cp-section-title">{products.length} New Products, Local Review</h1>
          <p className="cp-section-sub">
            Filter by category to review each product&rsquo;s copy, pricing and images before anything goes live.
          </p>

          <div className="dh-chips" style={{ marginBottom: 24 }}>
            <button
              type="button"
              className={`dh-chip${categorySlug === 'all' ? ' active' : ''}`}
              aria-pressed={categorySlug === 'all'}
              onClick={() => setCategorySlug('all')}
            >
              All categories <span className="dh-seg-count">{categoryCounts.all}</span>
            </button>
            {categories.map(c => (
              <button
                key={c.slug}
                type="button"
                className={`dh-chip${categorySlug === c.slug ? ' active' : ''}`}
                aria-pressed={categorySlug === c.slug}
                onClick={() => setCategorySlug(c.slug)}
              >
                {c.emoji} {c.name} <span className="dh-seg-count">{categoryCounts[c.slug] ?? 0}</span>
              </button>
            ))}
          </div>

          <DiwaliHamperShowcase products={filtered} tier={tier} onTierChange={setTier} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
