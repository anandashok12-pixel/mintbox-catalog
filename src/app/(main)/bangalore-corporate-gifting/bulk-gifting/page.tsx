import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BulkGiftingClient from '@/components/pages/BulkGiftingClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Bulk Corporate Gifting in Bangalore: 100–10,000 Units | MintBox',
  description:
    'Scale your corporate gifting from 100 to 10,000 units. Transparent bulk pricing, dedicated account manager, GST invoicing, Pan-India delivery. Based in Bangalore.',
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
    products = productsResult.docs
  } catch (err) {
    console.error('[bulk-gifting] Payload query failed:', err)
  }

  return <BulkGiftingClient products={products} />
}
