import { FACTS } from '@/lib/festiveFacts'
import type { RelatedLink, TitledItem } from '../types'

// Page links with ONE agreed anchor text each. Every page links to its
// siblings with exactly these words, so Google gets a clear, consistent
// signal about which page owns which search.
export const LINKS = {
  hub: { label: 'Shop', title: 'Corporate Diwali Gift Hampers 2026', href: '/diwali-corporate-gifts' },
  planning: { label: 'Planning', title: 'Diwali Gift Ideas & Planning Guide', href: '/guides/diwali-corporate-gifts' },
  employees: { label: 'Employees', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
  under500: { label: 'Budget', title: 'Diwali Gifts for Employees Under ₹500', href: '/guides/diwali-gifts-for-employees-under-500' },
  under1000: { label: 'Budget', title: 'Diwali Gifts for Employees Under ₹1,000', href: '/guides/diwali-gifts-for-employees-under-1000' },
  under2000: { label: 'Budget', title: 'Diwali Gifts for Employees Under ₹2,000', href: '/guides/diwali-gifts-for-employees-under-2000' },
  electronic: { label: 'Tech', title: 'Electronic Diwali Gifts for Employees', href: '/guides/electronic-diwali-gifts-for-employees' },
  dryFruit: { label: 'Dry fruits', title: 'Diwali Dry Fruit Gift Boxes', href: '/guides/diwali-dry-fruit-gift-boxes' },
  clients: { label: 'Clients', title: 'Diwali Gifts for Clients', href: '/guides/diwali-gifts-for-clients' },
  bangalore: { label: 'Bengaluru', title: 'Corporate Gift Hampers in Bangalore', href: '/bangalore-corporate-gifting/gift-hampers' },
  companies: { label: 'Compare', title: 'Corporate Gifting Companies in India, Compared', href: '/guides/top-corporate-gifting-companies-india' },
  newYear: { label: 'New Year', title: 'New Year Corporate Gifts for 2027', href: '/guides/new-year-corporate-gifts' },
  secretSanta: { label: 'Christmas', title: 'Secret Santa Gifts for Colleagues', href: '/guides/secret-santa-gifts-for-colleagues' },
  christmas: { label: 'Christmas', title: 'Christmas Corporate Gifts', href: '/guides/christmas-corporate-gifts' },
  bulk: { label: 'Bengaluru', title: 'Bulk Corporate Gifting in Bangalore', href: '/bangalore-corporate-gifting/bulk-gifting' },
  sameDay: { label: 'Bengaluru', title: 'Same-Day Gift Delivery in Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
  handbook: { label: 'Guide', title: 'Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
  clientsYearRound: { label: 'Clients', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
} satisfies Record<string, RelatedLink>

export const GUIDES_PARENT = { name: 'Guides', href: '/guides/corporate-gifting-handbook' }

export const DIWALI_BADGES = [
  `🪔 Diwali: ${FACTS.diwaliDateShort} 2026`,
  `✓ Confirm by ${FACTS.orderByShort} for guaranteed delivery`,
  `✓ Minimum ${FACTS.moq} units`,
  '✓ Logo branding',
  '✓ GST invoice',
]

export const DIWALI_TRUST = [
  'Assembled and quality-checked in Bengaluru',
  'Every hamper lists exactly what is inside',
  'Logo on the box, printed insert card, name personalisation',
  'Sealed, FSSAI-compliant food items',
  'GST invoice on every order, pan-India delivery with tracking',
]

export const DIWALI_STEPS: TitledItem[] = [
  {
    title: 'Shortlist and add to your pack',
    desc: 'Open “What’s inside” on any gift and add the ones you like. You can mix price levels in one order.',
  },
  {
    title: `Get your quote in ${FACTS.quoteTime}`,
    desc: 'Tell us how many people, your budget per person and the cities. We send per-unit prices, a logo mockup and a GST-ready quote.',
  },
  {
    title: `Confirm by ${FACTS.orderBy}`,
    desc: `Approve the mockup and quantities. Orders confirmed by this date are guaranteed to arrive before Diwali (${FACTS.diwaliDate}) with full logo branding.`,
  },
  {
    title: 'We pack and deliver',
    desc: `Gifts are packed in Bengaluru and dispatched ${FACTS.dispatch}, to one office or to every employee’s home, with tracking on WhatsApp.`,
  },
]

export const DIWALI_QUOTE = {
  title: 'Get your Diwali quote',
  subtitle: 'Share your headcount, budget per person and delivery cities. We reply with prices, a logo mockup and delivery dates.',
  occasion: 'diwali',
  cta: 'Get Diwali quote',
}
