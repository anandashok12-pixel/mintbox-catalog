import type { Metadata } from 'next'
import GuidesHubClient from '@/components/pages/GuidesHubClient'
import '../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting Guides | MintBox',
  description:
    'Browse all MintBox corporate gifting guides - budgets, Diwali & festive gifting, occasions, and strategy - for Indian businesses in 2026.',
  alternates: { canonical: 'https://themintbox.in/guides' },
  openGraph: {
    title: 'Corporate Gifting Guides | MintBox',
    description: 'All MintBox guides on budgets, festive gifting, occasions, and corporate gifting strategy for 2026.',
  },
}

export default function GuidesPage() {
  return <GuidesHubClient />
}
