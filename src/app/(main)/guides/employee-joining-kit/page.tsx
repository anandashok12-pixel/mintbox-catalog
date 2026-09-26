import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import JoiningKitClient from '@/components/pages/JoiningKitClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Employee Joining Kit: 15 Must-Have Items + Checklist',
  description:
    'The complete employee joining kit checklist for 2026 - 15 must-have items across essentials, comfort, and culture tiers, with budgets from ₹800 to ₹3,000.',
  alternates: { canonical: 'https://themintbox.in/guides/employee-joining-kit' },
  openGraph: {
    title: 'Employee Joining Kit: 15 Must-Have Items + Checklist',
    description:
      'The complete employee joining kit checklist for 2026 - 15 must-have items across essentials, comfort, and culture tiers, with budgets from ₹800 to ₹3,000.',
  },
}

export const dynamic = 'force-dynamic'

export default async function JoiningKitPage() {
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
    console.error('[employee-joining-kit] Payload query failed:', err)
  }

  return <JoiningKitClient products={products} categories={categories} />
}
