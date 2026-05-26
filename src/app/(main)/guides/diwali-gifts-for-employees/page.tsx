import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DiwaliEmployeesClient from '@/components/pages/DiwaliEmployeesClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Diwali Gifts for Employees 2026: Ideas, Budget & Planning | MintBox',
  description:
    'Thoughtful Diwali gifts for employees - bulk hampers, personalised sets, and sweet kits from ₹400/head. Plan 3–4 weeks early. GST invoicing. Delivered across India.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-gifts-for-employees' },
  openGraph: {
    title: 'Diwali Gifts for Employees 2026: Ideas, Budget & Planning | MintBox',
    description:
      'Thoughtful Diwali gifts for employees - bulk hampers, personalised sets, and sweet kits from ₹400/head. Plan 3–4 weeks early. GST invoicing. Delivered across India.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliEmployeesPage() {
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
    console.error('[diwali-gifts-for-employees] Payload query failed:', err)
  }

  return <DiwaliEmployeesClient products={products} categories={categories} />
}
