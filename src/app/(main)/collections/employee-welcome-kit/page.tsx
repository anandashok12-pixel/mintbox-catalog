import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import WelcomeKitClient from '@/components/pages/WelcomeKitClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Employee Welcome Kits: Onboarding Gift Sets | MintBox',
  description:
    'Branded employee welcome kits for Day 1 onboarding - notebooks, bottles, tees, and more. MOQ from 10 units. Custom logo included. Pan-India delivery in 7–10 days.',
  alternates: { canonical: 'https://themintbox.in/collections/employee-welcome-kit' },
  openGraph: {
    title: 'Employee Welcome Kits: Onboarding Gift Sets - MintBox',
    description: 'Branded employee welcome kits for Day 1 onboarding - notebooks, bottles, tees, and more.',
  },
}

export const dynamic = 'force-dynamic'

export default async function WelcomeKitPage() {
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
    console.error('[employee-welcome-kit] Payload query failed:', err)
  }

  // Filter to category-relevant products only
  const targetCat = categories.find((c: any) => {
    const text = ((c.slug || '') + ' ' + (c.name || '')).toLowerCase()
    return text.includes('welcome')
  })
  if (targetCat) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return catId === targetCat.id
    })
  }

  return <WelcomeKitClient products={products} />
}
