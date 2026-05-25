import type { Metadata } from 'next'
import { EmployeeGiftsGuide } from '@/components/EmployeeGiftsGuide'
import { EMPLOYEE_GIFTS_FAQS, EMPLOYEE_GIFTS_GUIDE } from '@/components/employeeGiftsGuideData'

export const metadata: Metadata = {
  title: EMPLOYEE_GIFTS_GUIDE.metaTitle,
  description: EMPLOYEE_GIFTS_GUIDE.metaDescription,
  alternates: { canonical: EMPLOYEE_GIFTS_GUIDE.url },
  openGraph: {
    type: 'article',
    title: EMPLOYEE_GIFTS_GUIDE.metaTitle,
    description: EMPLOYEE_GIFTS_GUIDE.metaDescription,
    url: EMPLOYEE_GIFTS_GUIDE.url,
    siteName: 'MintBox',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: EMPLOYEE_GIFTS_GUIDE.title,
  description: EMPLOYEE_GIFTS_GUIDE.metaDescription,
  mainEntityOfPage: { '@type': 'WebPage', '@id': EMPLOYEE_GIFTS_GUIDE.url },
  about: 'Diwali gifts for employees',
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
    { '@type': 'ListItem', position: 3, name: 'Diwali Gifts for Employees', item: EMPLOYEE_GIFTS_GUIDE.url },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: EMPLOYEE_GIFTS_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function DiwaliGiftsForEmployeesPage() {
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
      <EmployeeGiftsGuide />
    </>
  )
}
