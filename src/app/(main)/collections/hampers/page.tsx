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

  // Filter to hamper-relevant categories. No category slug/name contains
  // "hamper", so the previous substring match never hit and the page fell
  // back to rendering the entire catalog.
  const HAMPER_SLUGS = ['baskets-packaging', 'tea-coffee', 'snacks-gourmet-food', 'chocolate-sweets']
  const matchedCatIds = new Set(
    categories.filter((c: any) => HAMPER_SLUGS.includes(c.slug)).map((c: any) => c.id),
  )
  if (matchedCatIds.size > 0) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return matchedCatIds.has(catId)
    })
  }

  return <HampersCollectionClient products={products} categories={categories} />
}
