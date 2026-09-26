import type { Metadata } from 'next'
import { LandingPreview } from '@/components/LandingPreview'
import './preview.css'

// Local preview of the homepage after the September 2026 critique fixes.
// Kept out of the index and the sitemap until it replaces `/`.
export const metadata: Metadata = {
  title: 'MintBox  -  Premium Corporate Gifting (preview)',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://themintbox.in' },
}

export default function HomePreviewPage() {
  return <LandingPreview />
}
