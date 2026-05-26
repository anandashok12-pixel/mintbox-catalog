import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ClientGiftsClient from '@/components/pages/ClientGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifts for Clients in India | Premium Ideas | MintBox',
  description: 'Impress clients with premium corporate gifts. Personalised, branded, and GST-compliant gifting from MintBox - hampers, drinkware, and custom sets.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifts-for-clients' },
  openGraph: {
    title: 'Corporate Gifts for Clients in India | Premium Ideas | MintBox',
    description: 'Impress clients with premium corporate gifts. Personalised, branded, and GST-compliant gifting from MintBox - hampers, drinkware, and custom sets.',
    url: 'https://themintbox.in/guides/corporate-gifts-for-clients',
    siteName: 'MintBox', locale: 'en_IN', type: 'article',
  },
}
export const dynamic = 'force-dynamic'

export default async function ClientGiftsPage() {
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
  } catch (err) { console.error('[corporate-gifts-for-clients] Payload query failed:', err) }
  return <ClientGiftsClient products={products} categories={categories} />
}
