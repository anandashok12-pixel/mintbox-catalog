import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import GiftIdeas2026Client from '@/components/pages/GiftIdeas2026Client'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gift Ideas 2026 | Trending Ideas | MintBox',
  description: 'Top corporate gift ideas for 2026: eco-friendly, tech, wellness, and personalised gifting trends. Curated for Indian businesses. Bulk from 25 units.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gift-ideas-2026' },
  openGraph: {
    title: 'Corporate Gift Ideas 2026 | Trending Ideas | MintBox',
    description: 'Top corporate gift ideas for 2026: eco-friendly, tech, wellness, and personalised gifting trends. Curated for Indian businesses. Bulk from 25 units.',
    url: 'https://themintbox.in/guides/corporate-gift-ideas-2026',
    siteName: 'MintBox', locale: 'en_IN', type: 'article',
  },
}
export const dynamic = 'force-dynamic'

export default async function GiftIdeas2026Page() {
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
  } catch (err) { console.error('[corporate-gift-ideas-2026] Payload query failed:', err) }
  return <GiftIdeas2026Client products={products} categories={categories} />
}
