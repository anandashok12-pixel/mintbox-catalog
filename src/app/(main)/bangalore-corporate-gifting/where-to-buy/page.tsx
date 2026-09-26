import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import WhereToBuyBangaloreClient from '@/components/pages/WhereToBuyBangaloreClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Where to Buy Corporate Gifts in Bangalore (2026)',
  description:
    'Where to buy corporate gifts in Bangalore: 12 best options by area - online suppliers, wholesale markets like Chickpet and SP Road, and same-day B2B delivery.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting/where-to-buy' },
  openGraph: {
    title: 'Where to Buy Corporate Gifts in Bangalore (2026)',
    description:
      'Where to buy corporate gifts in Bangalore: 12 best options by area - online suppliers, wholesale markets like Chickpet and SP Road, and same-day B2B delivery.',
  },
}

export const dynamic = 'force-dynamic'

export default async function WhereToBuyBangalorePage() {
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
    console.error('[where-to-buy] Payload query failed:', err)
  }

  return <WhereToBuyBangaloreClient products={products} categories={categories} />
}
