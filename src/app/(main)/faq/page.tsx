import { FAQPage } from '@/components/FAQPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — MintBox',
  description:
    'Answers to the most common questions about MintBox corporate gifting — MOQs, branding, delivery, pricing, and more.',
}

export default function FAQRoute() {
  return <FAQPage />
}
