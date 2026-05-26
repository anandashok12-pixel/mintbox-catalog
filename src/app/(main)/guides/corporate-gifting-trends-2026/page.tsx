import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import GiftingTrendsClient from '@/components/pages/GiftingTrendsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting Trends 2026 in India | MintBox Report',
  description: 'The top corporate gifting trends for 2026: sustainability, personalisation, tech gifts, and wellness. MintBox insight for Indian HR and procurement teams.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifting-trends-2026' },
  openGraph: {
    title: 'Corporate Gifting Trends 2026 in India | MintBox Report',
    description: 'The top corporate gifting trends for 2026: sustainability, personalisation, tech gifts, and wellness. MintBox insight for Indian HR and procurement teams.',
    url: 'https://themintbox.in/guides/corporate-gifting-trends-2026',
    siteName: 'MintBox', locale: 'en_IN', type: 'article',
  },
}
export const dynamic = 'force-dynamic'

export default async function GiftingTrendsPage() {
  let products: any[] = []
  let categories: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({ collection: 'products', where: { inStock: { equals: true } }, sort: 'order', limit: 500, depth: 1 }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) { console.error('[corporate-gifting-trends-2026] Payload query failed:', err) }
  return <GiftingTrendsClient products={products} categories={categories} />
}
