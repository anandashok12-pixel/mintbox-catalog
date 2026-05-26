import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CustomWaterBottlesClient from '@/components/pages/CustomWaterBottlesClient'
import '../../../content-pages.css'

export const metadata: Metadata = {
  title: 'Customized Water Bottles for Corporate Gifting | MintBox',
  description: 'Order customized water bottles with your company logo. Stainless steel, copper, and insulated bottles for bulk corporate gifting. MOQ 25 units.',
  alternates: { canonical: 'https://themintbox.in/collections/drinkware/customized-water-bottles' },
  openGraph: {
    title: 'Customized Water Bottles for Corporate Gifting | MintBox',
    description: 'Order customized water bottles with your company logo. Stainless steel, copper, and insulated bottles for bulk corporate gifting. MOQ 25 units.',
    url: 'https://themintbox.in/collections/drinkware/customized-water-bottles',
    siteName: 'MintBox', locale: 'en_IN', type: 'website',
  },
}
export const dynamic = 'force-dynamic'

export default async function CustomWaterBottlesPage() {
  let products: any[] = []
  let categories: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'order', limit: 500, depth: 1,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) { console.error('[customized-water-bottles] Payload query failed:', err) }

  // Filter to category-relevant products only
  const targetCat = categories.find((c: any) => {
    const text = ((c.slug || '') + ' ' + (c.name || '')).toLowerCase()
    return text.includes('drinkware')
  })
  if (targetCat) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return catId === targetCat.id
    })
  }

  return <CustomWaterBottlesClient products={products} categories={categories} />
}
