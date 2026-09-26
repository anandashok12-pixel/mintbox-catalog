import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import MementoIdeasClient from '@/components/pages/MementoIdeasClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '12 Corporate Memento & Award Ideas for Events (2026)',
  description:
    '12 corporate memento and award ideas for annual days, sales awards, and farewells - crystal, wood, acrylic, and eco options with prices and engraving tips.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-memento-ideas' },
  openGraph: {
    title: '12 Corporate Memento & Award Ideas for Events (2026)',
    description:
      '12 corporate memento and award ideas for annual days, sales awards, and farewells - crystal, wood, acrylic, and eco options with prices and engraving tips.',
  },
}

export const dynamic = 'force-dynamic'

export default async function MementoIdeasPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100, select: SHOWCASE_CATEGORY_SELECT }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'order',
        limit: 500,
        depth: 1,
      select: SHOWCASE_PRODUCT_SELECT,
      populate: SHOWCASE_POPULATE,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[corporate-memento-ideas] Payload query failed:', err)
  }

  return <MementoIdeasClient products={products} categories={categories} />
}
