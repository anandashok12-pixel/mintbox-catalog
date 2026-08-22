import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TechGiftsCollectionClient from '@/components/pages/TechGiftsCollectionClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Tech Gifts: Gadgets & Accessories for Teams | MintBox',
  description:
    'Branded corporate tech gifts - wireless chargers, cable kits, laptop accessories, USB drives, and more. Logo engraving from 25 units. Premium gifting for IT teams.',
  alternates: { canonical: 'https://themintbox.in/collections/tech-gifts' },
  openGraph: {
    title: 'Corporate Tech Gifts: Gadgets & Accessories for Teams - MintBox',
    description: 'Branded corporate tech gifts - wireless chargers, cable kits, laptop accessories, USB drives, and more.',
  },
}

export const dynamic = 'force-dynamic'

export default async function TechGiftsPage() {
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
    console.error('[tech-gifts] Payload query failed:', err)
  }

  // Filter to tech-relevant categories only. No category slug/name contains
  // "tech", so the previous substring match never hit and the page fell back
  // to rendering the entire catalog (228 images).
  const TECH_SLUGS = ['electronics', 'audio', 'desktop-accessories']
  const techCatIds = new Set(
    categories.filter((c: any) => TECH_SLUGS.includes(c.slug)).map((c: any) => c.id),
  )
  if (techCatIds.size > 0) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return techCatIds.has(catId)
    })
  }

  return <TechGiftsCollectionClient products={products} />
}
