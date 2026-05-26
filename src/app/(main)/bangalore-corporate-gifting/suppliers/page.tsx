import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import SuppliersClient from '@/components/pages/SuppliersClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gift Suppliers in Bangalore 2026 | MintBox',
  description: 'Find trusted corporate gift suppliers in Bangalore. MintBox offers branded, customised bulk corporate gifts with GST invoicing and pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting/suppliers' },
  openGraph: {
    title: 'Corporate Gift Suppliers in Bangalore 2026 | MintBox',
    description: 'Find trusted corporate gift suppliers in Bangalore. MintBox offers branded, customised bulk corporate gifts with GST invoicing and pan-India delivery.',
    url: 'https://themintbox.in/bangalore-corporate-gifting/suppliers',
    siteName: 'MintBox',
    locale: 'en_IN',
    type: 'article',
  },
}

export const dynamic = 'force-dynamic'

export default async function SuppliersPage() {
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
  } catch (err) {
    console.error('[bangalore-suppliers] Payload query failed:', err)
  }
  return <SuppliersClient products={products} categories={categories} />
}
