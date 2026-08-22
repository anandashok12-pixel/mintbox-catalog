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

  // Filter to welcome-kit-relevant categories. No category slug/name contains
  // "welcome", so the previous substring match never hit and the page fell
  // back to rendering the entire catalog.
  const WELCOME_KIT_SLUGS = ['stationery-writing', 'drinkware', 'desktop-accessories', 'bags-travel-accessories', 'apparel']
  const matchedCatIds = new Set(
    categories.filter((c: any) => WELCOME_KIT_SLUGS.includes(c.slug)).map((c: any) => c.id),
  )
  if (matchedCatIds.size > 0) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return matchedCatIds.has(catId)
    })
  }

  return <WelcomeKitClient products={products} />
}
