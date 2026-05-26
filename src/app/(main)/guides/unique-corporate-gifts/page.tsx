import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import UniqueGiftsClient from '@/components/pages/UniqueGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Unique Corporate Gift Ideas for Employees & Clients | MintBox',
  description: 'Discover unique corporate gifts that stand out. Personalised, creative, and memorable gifting ideas for Indian businesses. Bulk from 50 units, from MintBox.',
  alternates: { canonical: 'https://themintbox.in/guides/unique-corporate-gifts' },
  openGraph: {
    title: 'Unique Corporate Gift Ideas for Employees & Clients | MintBox',
    description: 'Discover unique corporate gifts that stand out. Personalised, creative, and memorable gifting ideas for Indian businesses. Bulk from 50 units, from MintBox.',
    url: 'https://themintbox.in/guides/unique-corporate-gifts',
    siteName: 'MintBox', locale: 'en_IN', type: 'article',
  },
}
export const dynamic = 'force-dynamic'

export default async function UniqueGiftsPage() {
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
  } catch (err) { console.error('[unique-corporate-gifts] Payload query failed:', err) }
  return <UniqueGiftsClient products={products} categories={categories} />
}
