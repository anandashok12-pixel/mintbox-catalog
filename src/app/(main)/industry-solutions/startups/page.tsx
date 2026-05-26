import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import StartupsIndustryClient from '@/components/pages/StartupsIndustryClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifts for Startups: Culture-Fit Gifting 2026 | MintBox',
  description:
    'Startup-specific corporate gifting - onboarding kits, team swag, investor gifts. Budget-conscious, brand-forward, and fast. MOQ from 10 units. Bangalore & Pan-India.',
  alternates: { canonical: 'https://themintbox.in/industry-solutions/startups' },
  openGraph: {
    title: 'Corporate Gifts for Startups: Culture-Fit Gifting 2026 | MintBox',
    description:
      'Startup-specific corporate gifting - onboarding kits, team swag, investor gifts. Budget-conscious, brand-forward, and fast. MOQ from 10 units. Bangalore & Pan-India.',
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
    products = productsResult.docs
  } catch (err) {
    console.error('[startups] Payload query failed:', err)
  }

  return <StartupsIndustryClient products={products} categories={categories} />
}
