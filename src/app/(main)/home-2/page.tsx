import type { Metadata } from 'next'
import { LandingPage2 } from '@/components/LandingPage2'
import './landing2.css'

// Staging copy of the homepage for the design refresh. Kept out of the
// index and the sitemap until it replaces `/`.
export const metadata: Metadata = {
  title: 'MintBox  -  Premium Corporate Gifting (preview)',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://themintbox.in' },
}

export default function HomePage2() {
  return <LandingPage2 />
}
