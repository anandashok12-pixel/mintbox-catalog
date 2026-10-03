import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/festiveFacts'
import { getInStockProducts, resolvePicks, applyFilter } from './festiveProducts'
import FestivePage from './FestivePage'
import type { FestivePageConfig } from './types'

const FALLBACK_OG_IMAGE = 'https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/diwali-dk16.jpg'

/** Strips the simple <a> tags allowed in FAQ answers so JSON-LD carries plain text. */
const plain = (html: string) => html.replace(/<[^>]+>/g, '')

async function firstImage(config: FestivePageConfig): Promise<string> {
  if (!config.picks?.length) return FALLBACK_OG_IMAGE
  const all = await getInStockProducts()
  for (const s of config.picks) {
    const hit = applyFilter(all, s.filter).find(p => p.image?.url)
    if (hit?.image?.url) return hit.image.url
  }
  return FALLBACK_OG_IMAGE
}

export async function festiveMetadata(config: FestivePageConfig): Promise<Metadata> {
  const url = `${SITE_URL}${config.path}`
  const image = await firstImage(config)
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url,
      siteName: 'MintBox',
      locale: 'en_IN',
      type: 'article',
      images: [{ url: image, alt: config.h1 }],
    },
    twitter: { card: 'summary_large_image', title: config.metaTitle, description: config.metaDescription, images: [image] },
    robots: { index: true, follow: true, 'max-image-preview': 'large' },
  }
}

export default async function FestiveRoute({ config }: { config: FestivePageConfig }) {
  const url = `${SITE_URL}${config.path}`
  const sections = await resolvePicks(config.picks)
  const productCount = sections.reduce((n, s) => n + s.products.length, 0)

  // Structured data is rendered by this server component so it is always in
  // the initial HTML and matches the visible content exactly.
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...config.parents.map((p, i) => ({ '@type': 'ListItem', position: i + 2, name: p.name, item: `${SITE_URL}${p.href}` })),
      { '@type': 'ListItem', position: config.parents.length + 2, name: config.crumb, item: url },
    ],
  }

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.h1Em ? `${config.h1} ${config.h1Em}` : config.h1,
    description: config.metaDescription,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en-IN',
    datePublished: `${config.published}T00:00:00+05:30`,
    dateModified: `${config.updated}T00:00:00+05:30`,
    author: { '@type': 'Organization', name: 'MintBox gifting team', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'MintBox', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/mintbox-logo-white.webp` } },
  }

  const itemList = productCount > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: config.h1,
        numberOfItems: productCount,
        itemListElement: sections.flatMap(s => s.products).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          url: `${url}#product-${p.id}`,
        })),
      }
    : config.ideas
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: config.ideas.title,
          numberOfItems: config.ideas.items.length,
          itemListElement: config.ideas.items.map((idea, i) => ({ '@type': 'ListItem', position: i + 1, name: idea.name })),
        }
      : null

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      {itemList && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <FestivePage config={config} sections={sections} />
    </>
  )
}
