import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import PersonalizedGiftsClient from '@/components/pages/PersonalizedGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Personalised Corporate Gifts: Make Every Gift On-Brand | MintBox',
  description:
    'Custom-branded corporate gifts with logo printing, laser engraving, and embroidery. Minimum 10 units. Free mockup in 24 hours. Bangalore-based, Pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/customization/personalized-corporate-gifts' },
  openGraph: {
    title: 'Personalised Corporate Gifts - MintBox',
    description: 'Make every corporate gift on-brand with logo printing, engraving and custom packaging.',
  },
}

export const dynamic = 'force-dynamic'

export default async function PersonalizedCorporateGiftsPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100, select: SHOWCASE_CATEGORY_SELECT }),
      payload.find({
        collection: 'products',
        where: {
          and: [
            { inStock: { equals: true } },
            { customisable: { equals: true } },
          ],
        },
        sort: 'order',
        limit: 200,
        depth: 1,
      select: SHOWCASE_PRODUCT_SELECT,
      populate: SHOWCASE_POPULATE,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[personalized-gifts] Payload query failed:', err)
  }

  return <PersonalizedGiftsClient products={products} categories={categories} />
}
