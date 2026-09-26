import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import DrinkwareCollectionClient from '@/components/pages/DrinkwareCollectionClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Drinkware Gifts: Bottles, Mugs & More | MintBox',
  description:
    'Branded corporate drinkware - stainless bottles, ceramic mugs, tumblers, and travel cups. Logo printing from 10 units. Bulk pricing available. Pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/collections/drinkware' },
  openGraph: {
    title: 'Corporate Drinkware Gifts: Bottles, Mugs & More | MintBox',
    description:
      'Branded corporate drinkware - stainless bottles, ceramic mugs, tumblers, and travel cups. Logo printing from 10 units. Bulk pricing available. Pan-India delivery.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DrinkwarePage() {
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
    console.error('[drinkware] Payload query failed:', err)
  }

  // Filter to category-relevant products only
  const targetCat = categories.find((c: any) => {
    const text = ((c.slug || '') + ' ' + (c.name || '')).toLowerCase()
    return text.includes('drinkware')
  })
  if (targetCat) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return catId === targetCat.id
    })
  }

  return <DrinkwareCollectionClient products={products} categories={categories} />
}
