import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import SameDayDeliveryClient from '@/components/pages/SameDayDeliveryClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Same-Day Corporate Gift Delivery in Bangalore | MintBox',
  description:
    'Same-day corporate gift delivery across Bangalore - Koramangala, Whitefield, Electronic City, HSR Layout. In-stock branded gifts delivered in 4–6 hours. Get a quote.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting/same-day-delivery' },
  openGraph: {
    title: 'Same-Day Corporate Gift Delivery in Bangalore | MintBox',
    description:
      'Same-day corporate gift delivery across Bangalore - Koramangala, Whitefield, Electronic City, HSR Layout. In-stock branded gifts delivered in 4–6 hours. Get a quote.',
  },
}

export const dynamic = 'force-dynamic'

export default async function SameDayDeliveryPage() {
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
    console.error('[same-day-delivery] Payload query failed:', err)
  }

  return <SameDayDeliveryClient products={products} categories={categories} />
}
