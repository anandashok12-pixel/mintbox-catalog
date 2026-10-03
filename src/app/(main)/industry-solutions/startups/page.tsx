import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import StartupsIndustryClient from '@/components/pages/StartupsIndustryClient'
import '../../content-pages.css'
import { slimProducts } from '@/lib/slimProducts'

export const metadata: Metadata = {
  title: 'Corporate Gifts for Startups: Culture-Fit Ideas | MintBox',
  description:
    'Corporate gifting for startups: onboarding kits, team swag and investor gifts. Budget-conscious, brand-forward and fast. MOQ from 10 units.',
  alternates: { canonical: 'https://themintbox.in/industry-solutions/startups' },
  openGraph: {
    title: 'Corporate Gifts for Startups: Culture-Fit Ideas | MintBox',
    description:
      'Corporate gifting for startups: onboarding kits, team swag and investor gifts. Budget-conscious, brand-forward and fast. MOQ from 10 units.',
  },
}

export const dynamic = 'force-dynamic'

export default async function StartupsPage() {
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
    products = slimProducts(productsResult.docs)
  } catch (err) {
    console.error('[startups] Payload query failed:', err)
  }

  return <StartupsIndustryClient products={products} categories={categories} />
}
