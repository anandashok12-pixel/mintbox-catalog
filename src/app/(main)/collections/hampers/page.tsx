import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HampersCollectionClient from '@/components/pages/HampersCollectionClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gift Hampers: Curated Sets for Every Occasion | MintBox',
  description:
    'Curated corporate gift hampers for Diwali, onboarding, client appreciation, and more. Custom branding, premium packaging, Pan-India delivery. Bulk from 25 units.',
  alternates: { canonical: 'https://themintbox.in/collections/hampers' },
  openGraph: {
    title: 'Corporate Gift Hampers: Curated Sets for Every Occasion | MintBox',
    description:
      'Curated corporate gift hampers for Diwali, onboarding, client appreciation, and more. Custom branding, premium packaging, Pan-India delivery. Bulk from 25 units.',
  },
}

export const dynamic = 'force-dynamic'

export default async function HampersPage() {
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
    console.error('[hampers] Payload query failed:', err)
  }

  // Filter to category-relevant products only
  const targetCat = categories.find((c: any) => {
    const text = ((c.slug || '') + ' ' + (c.name || '')).toLowerCase()
    return text.includes('hamper')
  })
  if (targetCat) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return catId === targetCat.id
    })
  }

  return <HampersCollectionClient products={products} categories={categories} />
}
