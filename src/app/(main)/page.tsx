import type { Metadata } from 'next'
import { LandingPage } from '@/components/LandingPage'

export const metadata: Metadata = {
  description:
    'MintBox is a Bengaluru corporate gifting partner — curated festive hampers, branded onboarding kits and premium gifts for employees and clients, with transparent bulk pricing and pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in' },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MintBox',
  url: 'https://themintbox.in',
  logo: 'https://themintbox.in/mintbox-logo.webp',
  description:
    'Premium corporate gifting packs for every occasion — curated, customized, and delivered across India.',
  telephone: '+918951069069',
  email: 'hello@themintbox.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/themintbox.in',
    'https://www.linkedin.com/company/themintbox',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MintBox',
  url: 'https://themintbox.in',
  description: 'Premium corporate gifting packs for every occasion.',
  publisher: {
    '@type': 'Organization',
    name: 'MintBox',
    url: 'https://themintbox.in',
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <LandingPage />
    </>
  )
}
