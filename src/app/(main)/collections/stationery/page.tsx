import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import StationeryCollectionClient from '@/components/pages/StationeryCollectionClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Stationery Gifts: Notebooks, Pens & Desk Sets | MintBox',
  description:
    'Branded corporate stationery - notebooks, pens, planners, and desk sets. Custom logo printing from 50 units. Perfect for onboarding and client gifts. Bulk pricing.',
  alternates: { canonical: 'https://themintbox.in/collections/stationery' },
  openGraph: {
    title: 'Corporate Stationery Gifts: Notebooks, Pens & Desk Sets | MintBox',
    description:
      'Branded corporate stationery - notebooks, pens, planners, and desk sets. Custom logo printing from 50 units. Perfect for onboarding and client gifts. Bulk pricing.',
  },
}

export const dynamic = 'force-dynamic'

export default async function StationeryPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'order',
        limit: 500,
        depth: 1,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[stationery] Payload query failed:', err)
  }

  // Filter to category-relevant products only
  const targetCat = categories.find((c: any) => {
    const text = ((c.slug || '') + ' ' + (c.name || '')).toLowerCase()
    return text.includes('stationery')
  })
  if (targetCat) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return catId === targetCat.id
    })
  }

  return <StationeryCollectionClient products={products} categories={categories} />
}
