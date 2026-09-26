import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import InaugurationGiftsClient from '@/components/pages/InaugurationGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '12 Office Inauguration Gift Ideas (2026) | MintBox',
  description:
    '12 thoughtful office inauguration gift ideas - for the new office and for opening-day guests, with ₹500–5,000 budget bands and Indian etiquette tips for 2026.',
  alternates: { canonical: 'https://themintbox.in/guides/office-inauguration-gifts' },
  openGraph: {
    title: '12 Office Inauguration Gift Ideas (2026) | MintBox',
    description:
      '12 thoughtful office inauguration gift ideas - for the new office and for opening-day guests, with ₹500–5,000 budget bands and Indian etiquette tips for 2026.',
  },
}

export const dynamic = 'force-dynamic'

export default async function OfficeInaugurationGiftsPage() {
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
    console.error('[office-inauguration-gifts] Payload query failed:', err)
  }

  return <InaugurationGiftsClient products={products} categories={categories} />
}
