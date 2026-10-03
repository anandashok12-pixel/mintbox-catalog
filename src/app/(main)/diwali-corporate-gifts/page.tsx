import type { Metadata } from 'next'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DiwaliHubClient from '@/components/pages/DiwaliHubClient'
import {
  GSTIN,
  LAST_UPDATED,
  LAST_WORKING_DAY_LABEL,
  MOQ,
  ORDER_BY,
  catalogueLabel,
  diwaliStats,
  formatRange,
  getDiwaliHubFaqs,
  moqFor,
} from '@/components/pages/diwaliHubData'
import type { DiwaliProduct } from '@/components/content/DiwaliHamperShowcase'
import '../content-pages.css'

const PAGE_URL = 'https://themintbox.in/diwali-corporate-gifts'
// "Diwali Gifting" is a display-only grouping of two flat categories - there
// is no parent field in the data model. A self-referencing relationship field
// was tried and broke schema push against production Postgres (2026-09-26,
// column never created, took down the whole Payload API), so this fetches
// both known category slugs directly instead.
const DIWALI_CATEGORY_SLUGS = ['diwali-gift-boxes', 'diwali-2026-products']
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

    const catsRes = await payload.find({
      collection: 'categories',
      where: { slug: { in: DIWALI_CATEGORY_SLUGS } },
      limit: 10,
    })
    const categoryIds = catsRes.docs.map(d => d.id as number)
    if (categoryIds.length === 0) return []

    const result = await payload.find({
      collection: 'products',
      where: {
        and: [{ category: { in: categoryIds } }, { inStock: { equals: true } }],
      },
      sort: 'order',
      // No cap: the in-stock catalogue outgrew fixed limits (630 products, Oct 2026)
      pagination: false,
      depth: 1,
    })
    return result.docs as unknown as DiwaliProduct[]
  } catch (err) {
    console.error('[diwali-corporate-gifts] Payload query failed:', err)
    return []
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const products = await getDiwaliProducts()
  const stats = diwaliStats(products)
  const ogImage =
    products.find(p => String(p.id) === OG_PRODUCT_ID && p.image?.url)?.image?.url ||
    products.find(p => p.image?.url)?.image?.url ||
    FALLBACK_OG_IMAGE

  const title = 'Corporate Diwali Gifts 2026: Hampers & Gift Boxes | MintBox'
  // Falls back to evergreen copy if the catalogue query failed, rather than
  // publishing "0 hampers" or a stale hard-coded range.
  const description = stats.total
    ? `${stats.hampers} corporate Diwali hampers & gift boxes, ${formatRange(stats.hamperMin, stats.hamperMax)} per unit ex GST, plus ${stats.singles} add-on gifts. Logo branding, MOQ ${MOQ}, GST invoice. Confirm by ${ORDER_BY.day} for pan-India delivery.`
    : `Corporate Diwali gift hampers and boxes for employees and clients. Logo branding, MOQ ${MOQ}, GST invoice. Confirm by ${ORDER_BY.day} for pan-India delivery before Diwali.`

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
  const stats = diwaliStats(products)

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
    description: `${catalogueLabel(stats)} for corporate Diwali 2026, ${formatRange(stats.min, stats.max)} per unit ex GST. Logo branding, MOQ ${MOQ}, GST invoice, pan-India delivery by ${LAST_WORKING_DAY_LABEL}.`,
    url: PAGE_URL,
    dateModified: `${LAST_UPDATED}T00:00:00+05:30`,
    inLanguage: 'en-IN',
    isPartOf: { '@type': 'WebSite', name: 'MintBox', url: 'https://themintbox.in' },
    publisher: {
      '@type': 'Organization',
      name: 'MintBox',
      url: 'https://themintbox.in',
      areaServed: 'IN',
      taxID: GSTIN,
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Corporate Diwali Gifts 2026',
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
            eligibleQuantity: { '@type': 'QuantitativeValue', minValue: moqFor(p), unitText: 'units' },
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
    mainEntity: getDiwaliHubFaqs(stats).map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
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
