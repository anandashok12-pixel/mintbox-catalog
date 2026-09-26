import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import StationeryCollectionClient from '@/components/pages/StationeryCollectionClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Stationery Gifts: Notebooks, Pens & Desk Sets | MintBox',
  description:
    'Branded corporate stationery - notebooks, pens, planners, and desk sets. Custom logo printing from 10 units. Perfect for onboarding and client gifts. Bulk pricing.',
  alternates: { canonical: 'https://themintbox.in/collections/stationery' },
  openGraph: {
    title: 'Corporate Stationery Gifts: Notebooks, Pens & Desk Sets | MintBox',
    description:
      'Branded corporate stationery - notebooks, pens, planners, and desk sets. Custom logo printing from 10 units. Perfect for onboarding and client gifts. Bulk pricing.',
  },
}

export const dynamic = 'force-dynamic'

export default async function StationeryPage() {
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
