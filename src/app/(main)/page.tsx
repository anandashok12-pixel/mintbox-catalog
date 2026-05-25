import type { Metadata } from 'next'
import { LandingPage } from '@/components/LandingPage'

export const metadata: Metadata = {
  description:
    'MintBox is a Bengaluru corporate gifting partner — curated festive hampers, branded onboarding kits and premium gifts for employees and clients, with transparent bulk pricing and pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in' },
}

export default function HomePage() {
  return <LandingPage />
}
