import type { Metadata } from 'next'
import { DiwaliGuide } from '@/components/DiwaliGuide'
import { DIWALI_FAQS, DIWALI_GUIDE } from '@/components/diwaliGuideData'

export const metadata: Metadata = {
  title: DIWALI_GUIDE.metaTitle,
  description: DIWALI_GUIDE.metaDescription,
  alternates: { canonical: DIWALI_GUIDE.url },
  openGraph: {
    type: 'article',
    title: DIWALI_GUIDE.metaTitle,
    description: DIWALI_GUIDE.metaDescription,
    url: DIWALI_GUIDE.url,
    siteName: 'MintBox',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: DIWALI_GUIDE.title,
  description: DIWALI_GUIDE.metaDescription,
  mainEntityOfPage: { '@type': 'WebPage', '@id': DIWALI_GUIDE.url },
  about: 'Diwali corporate gifts',
  inLanguage: 'en-IN',
  author: { '@type': 'Organization', name: 'MintBox', url: 'https://themintbox.in' },
  publisher: {
    '@type': 'Organization',
    name: 'MintBox',
    url: 'https://themintbox.in',
    logo: { '@type': 'ImageObject', url: 'https://themintbox.in/mintbox-logo-white.webp' },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://themintbox.in' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://themintbox.in/guides' },
    { '@type': 'ListItem', position: 3, name: 'Diwali Corporate Gifts 2026', item: DIWALI_GUIDE.url },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: DIWALI_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function DiwaliCorporateGiftsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DiwaliGuide />
    </>
  )
}
