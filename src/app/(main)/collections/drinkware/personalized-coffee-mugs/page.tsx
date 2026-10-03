import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PersonalizedMugsClient from '@/components/pages/PersonalizedMugsClient'
import '../../../content-pages.css'
import { slimProducts } from '@/lib/slimProducts'

export const metadata: Metadata = {
  title: 'Personalized Coffee Mugs for Corporate Gifting | MintBox',
  description: 'Order personalised coffee mugs with your company logo. Ceramic, enamel and stainless steel options for bulk corporate gifting. MOQ 10 units, Pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/collections/drinkware/personalized-coffee-mugs' },
  openGraph: {
    title: 'Personalized Coffee Mugs for Corporate Gifting | MintBox',
    description: 'Order personalised coffee mugs with your company logo. Ceramic, enamel and stainless steel options for bulk corporate gifting. MOQ 10 units, Pan-India delivery.',
    url: 'https://themintbox.in/collections/drinkware/personalized-coffee-mugs',
    siteName: 'MintBox', locale: 'en_IN', type: 'website',
  },
}
export const dynamic = 'force-dynamic'

export default async function PersonalizedMugsPage() {
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
    products = slimProducts(productsResult.docs)
  } catch (err) { console.error('[personalized-coffee-mugs] Payload query failed:', err) }

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

  return <PersonalizedMugsClient products={products} categories={categories} />
}
