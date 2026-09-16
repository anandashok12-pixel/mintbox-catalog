import type { Metadata } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DiwaliHubClient from '@/components/pages/DiwaliHubClient'
import { DIWALI_HUB_FAQS, LAST_UPDATED } from '@/components/pages/diwaliHubData'
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

const FAQ_SCHEMA_ITEMS = DIWALI_HUB_FAQS.map(item => ({
  '@type': 'Question',
  name: item.q,
  acceptedAnswer: { '@type': 'Answer', text: item.a },
}))

export default async function DiwaliCorporateGiftsPage() {
  const products = await getDiwaliProducts()
  const prices = products.map(p => Number(p.price)).filter(n => Number.isFinite(n))
  const min = prices.length ? Math.min(...prices) : 434
  const max = prices.length ? Math.max(...prices) : 2170

  // Rendered from the server component so the structured data is always in the
  // initial HTML and is never re-rendered (and discarded) during hydration.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://themintbox.in' },
      { '@type': 'ListItem', position: 2, name: 'Corporate Diwali Gifts 2026', item: PAGE_URL },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Corporate Diwali Gifts 2026: Hampers & Gift Boxes',
    description: `Corporate Diwali gift hampers and boxes for employees and clients, from ${formatPrice(min)} to ${formatPrice(max)} per unit. Logo branding, MOQ 10, GST invoice, pan-India delivery before Diwali.`,
    url: PAGE_URL,
    dateModified: `${LAST_UPDATED}T00:00:00+05:30`,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'MintBox', url: 'https://themintbox.in' },
    publisher: {
      '@type': 'Organization',
      name: 'MintBox',
      url: 'https://themintbox.in',
      areaServed: 'IN',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Corporate Diwali Gift Hampers 2026',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          image: p.image?.url || undefined,
          description: p.description,
          brand: { '@type': 'Brand', name: 'MintBox' },
          category: 'Corporate Diwali Gift Hampers',
          url: `${PAGE_URL}#product-${p.id}`,
          offers: {
            '@type': 'Offer',
            price: p.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${PAGE_URL}#product-${p.id}`,
            seller: { '@type': 'Organization', name: 'MintBox' },
            eligibleQuantity: { '@type': 'QuantitativeValue', minValue: p.moq ?? 10, unitText: 'units' },
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: p.price,
              priceCurrency: 'INR',
              valueAddedTaxIncluded: false,
            },
          },
        },
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SCHEMA_ITEMS,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DiwaliHubClient products={products} />
    </>
  )
}
