import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import NewEmployeeGiftsClient from '@/components/pages/NewEmployeeGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifts for New Employees | Welcome Kits | MintBox',
  description: 'Create the perfect new employee welcome kit. Branded onboarding gifts from ₹500 that make a strong first impression. Bulk from 10 units, pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifts-for-new-employees' },
  openGraph: {
    title: 'Corporate Gifts for New Employees | Welcome Kits | MintBox',
    description: 'Create the perfect new employee welcome kit. Branded onboarding gifts from ₹500 that make a strong first impression. Bulk from 10 units, pan-India delivery.',
    url: 'https://themintbox.in/guides/corporate-gifts-for-new-employees',
    siteName: 'MintBox',
    locale: 'en_IN',
    type: 'article',
  },
}

export const dynamic = 'force-dynamic'

export default async function NewEmployeeGiftsPage() {
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
    console.error('[corporate-gifts-for-new-employees] Payload query failed:', err)
  }
  return <NewEmployeeGiftsClient products={products} categories={categories} />
}
