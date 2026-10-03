import type { Metadata } from 'next'
import DiwaliShortlistClient from '@/components/pages/DiwaliShortlistClient'

export const metadata: Metadata = {
  title: 'Your Diwali Gift Shortlist | MintBox',
  description: 'A printable shortlist of the Diwali gifts in your MintBox pack.',
  // Per-visitor content from the session pack: nothing to index.
  robots: { index: false, follow: false },
}

export default function DiwaliShortlistPage() {
  return <DiwaliShortlistClient />
}
