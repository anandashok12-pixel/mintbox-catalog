import type { Metadata } from 'next'
import SolutionsPageClient from './SolutionsPageClient'

export const metadata: Metadata = {
  title: 'Corporate Gifting Solutions - MintBox',
  description:
    'Explore our custom corporate gifting solutions: onboarding kits, festive gifting hampers, work anniversary gifts, and client appreciation sets.',
  alternates: {
    canonical: 'https://themintbox.in/solutions',
  },
}

export default function SolutionsPage() {
  return <SolutionsPageClient />
}
