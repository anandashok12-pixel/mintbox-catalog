import type { Metadata } from 'next'
import IndustrySolutionsHubClient from '@/components/pages/IndustrySolutionsHubClient'
import '../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting Solutions by Industry | MintBox',
  description:
    'Corporate gifting solutions tailored by industry - startups, tech companies, and more. Find the gifting approach that fits how your business works.',
  alternates: { canonical: 'https://themintbox.in/industry-solutions' },
  openGraph: {
    title: 'Corporate Gifting Solutions by Industry | MintBox',
    description: 'Industry-specific corporate gifting solutions from MintBox - startups, tech companies, and more.',
  },
}

export default function IndustrySolutionsPage() {
  return <IndustrySolutionsHubClient />
}
