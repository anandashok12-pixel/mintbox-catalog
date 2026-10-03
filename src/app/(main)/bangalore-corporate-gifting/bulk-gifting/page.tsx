import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BulkGiftingClient from '@/components/pages/BulkGiftingClient'
import '../../content-pages.css'
import { slimProducts } from '@/lib/slimProducts'

export const metadata: Metadata = {
  title: 'Bulk Corporate Gifts in Bangalore: 100 to 10,000 | MintBox',
  description:
    'Scale your corporate gifting from 100 to 10,000 units. Transparent bulk pricing, a dedicated account manager, GST invoicing and Pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting/bulk-gifting' },
  openGraph: {
    title: 'Bulk Corporate Gifting in Bangalore - MintBox',
    description: 'Scale your corporate gifting from 100 to 10,000 units. Transparent bulk pricing, dedicated account manager.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BulkGiftingPage() {
  let products: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const productsResult = await payload.find({
      collection: 'products',
      where: { inStock: { equals: true } },
      sort: 'order',
      limit: 500,
      depth: 1,
    })
    products = slimProducts(productsResult.docs)
  } catch (err) {
    console.error('[bulk-gifting] Payload query failed:', err)
  }

  return <BulkGiftingClient products={products} />
}
