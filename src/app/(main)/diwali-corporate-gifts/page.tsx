import type { Metadata } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DiwaliHubClient from '@/components/pages/DiwaliHubClient'
import type { DiwaliProduct } from '@/components/content/DiwaliHamperShowcase'
import '../content-pages.css'

const PAGE_URL = 'https://themintbox.in/diwali-corporate-gifts'
const CATEGORY_SLUG = 'diwali-gift-boxes'
// Premium copper hamper: the strongest share image in the collection.
const OG_PRODUCT_ID = '475'
const FALLBACK_OG_IMAGE = 'https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/diwali-dk16.jpg'

// Render on every request so catalogue edits in Payload land instantly and
// the build never needs database access.
export const dynamic = 'force-dynamic'

// Deduped between generateMetadata and the page render.
const getDiwaliProducts = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })
    const cats = await payload.find({
      collection: 'categories',
      where: { slug: { equals: CATEGORY_SLUG } },
      limit: 1,
    })
    const category = cats.docs[0]
    if (!category) return []
    const result = await payload.find({
      collection: 'products',
      where: {
        and: [{ category: { equals: category.id } }, { inStock: { equals: true } }],
      },
      sort: 'order',
      limit: 200,
      depth: 1,
    })
    return result.docs as unknown as DiwaliProduct[]
  } catch (err) {
    console.error('[diwali-corporate-gifts] Payload query failed:', err)
    return []
  }
})

const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`

export async function generateMetadata(): Promise<Metadata> {
  const products = await getDiwaliProducts()
  const prices = products.map(p => Number(p.price)).filter(n => Number.isFinite(n))
  const count = products.length || 55
  const min = prices.length ? Math.min(...prices) : 434
  const max = prices.length ? Math.max(...prices) : 2170
  const ogImage =
    products.find(p => String(p.id) === OG_PRODUCT_ID && p.image?.url)?.image?.url ||
    products.find(p => p.image?.url)?.image?.url ||
    FALLBACK_OG_IMAGE

  const title = 'Corporate Diwali Gifts 2026: Hampers & Gift Boxes | MintBox'
  const description = `${count} corporate Diwali gift hampers for employees & clients, ${formatPrice(min)}–${formatPrice(max)} per unit. Logo branding, MOQ 10, GST invoice, pan-India delivery before Diwali (8 Nov 2026).`

  return {
    title,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      siteName: 'MintBox',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: ogImage, width: 1254, height: 1254, alt: 'Corporate Diwali gift hamper by MintBox' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
  }
}

export default async function DiwaliCorporateGiftsPage() {
  const products = await getDiwaliProducts()
  return <DiwaliHubClient products={products} />
}
