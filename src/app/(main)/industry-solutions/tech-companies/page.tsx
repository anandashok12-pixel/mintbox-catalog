import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TechCompaniesClient from '@/components/pages/TechCompaniesClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifts for Tech Companies: Premium Picks 2026 | MintBox',
  description:
    'Premium corporate gifts for IT and tech companies - branded tech accessories, quality drinkware, eco kits. Bulk orders, GST invoicing. Bangalore & Pan-India.',
  alternates: { canonical: 'https://themintbox.in/industry-solutions/tech-companies' },
  openGraph: {
    title: 'Corporate Gifts for Tech Companies: Premium Picks 2026 | MintBox',
    description:
      'Premium corporate gifts for IT and tech companies - branded tech accessories, quality drinkware, eco kits. Bulk orders, GST invoicing. Bangalore & Pan-India.',
  },
}

export const dynamic = 'force-dynamic'

export default async function TechCompaniesPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'order',
        limit: 500,
        depth: 1,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[tech-companies] Payload query failed:', err)
  }

  return <TechCompaniesClient products={products} categories={categories} />
}
