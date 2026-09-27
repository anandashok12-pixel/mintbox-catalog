import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { DIWALI_BADGES, DIWALI_QUOTE, DIWALI_STEPS, DIWALI_TRUST, GUIDES_PARENT, LINKS } from './shared'

// Target: "diwali gifts for employees under 500" (+ under 300, under 200,
// budget / cheap Diwali gifts for employees). Diwali categories, ₹0–₹500.
export const UNDER_500: FestivePageConfig = {
  path: LINKS.under500.href,
  metaTitle: 'Diwali Gifts for Employees Under ₹500 (2026) | MintBox',
  metaDescription:
    'Diwali gifts for employees under ₹500, with real prices: candle sets, dry fruit boxes and eco kits from ₹199. Logo branding, minimum 10 units, GST invoice.',
  parents: [GUIDES_PARENT, { name: 'Diwali Gifts for Employees', href: LINKS.employees.href }],
  crumb: 'Under ₹500',
  eyebrow: 'Diwali 2026 · Budget gifts',
  h1: 'Diwali Gifts for Employees Under ₹500',
  h1Em: 'that still feel like a real gift',
  intro:
    'Every gift on this page costs ₹500 or less per person, with the price and contents shown upfront. Good for large teams, interns, support staff and contract workers.',
  badges: DIWALI_BADGES,
  diwaliStrip: true,
  quickAnswer: `Good Diwali gifts for employees under ₹500: candle and diya sets (from about ₹199), small dry fruit boxes (from about ₹280) and eco kits such as a husk mug with seed stationery (about ₹434). Order at least ${FACTS.moq} of each gift and add your logo to the box. Confirm by ${FACTS.orderBy} for delivery before Diwali.`,
  trust: DIWALI_TRUST,
  picksNoun: 'gifts under ₹500',
  picks: [
    {
      id: 'under-300',
      title: 'Diwali gifts under ₹300',
      intro: 'For very large teams and a small token for everyone. Candles, diya sets and small dry fruit boxes work best at this price.',
      filter: { scope: 'diwali', max: 300, sort: 'price-asc' },
    },
    {
      id: '300-500',
      title: 'Diwali gifts from ₹300 to ₹500',
      intro: 'A step up: bigger dry fruit boxes, eco kits and fragrance sets that look generous in a printed gift box.',
      filter: { scope: 'diwali', min: 301, max: 500, sort: 'price-asc' },
    },
  ],
  tips: {
    id: 'how-to-choose',
    title: 'How to make a ₹500 gift feel generous',
    items: [
      { title: 'Pick one good thing', desc: 'One proper dry fruit box beats five small items nobody needs. People remember quality, not quantity.' },
      { title: 'Spend a little on the box', desc: 'A printed gift box with your logo makes a ₹400 gift feel like ₹800. It is also what gets photographed.' },
      { title: 'Add a personal card', desc: 'A printed card with a short thank-you from the leadership team costs very little and is often the part people keep.' },
      { title: 'Treat everyone the same', desc: 'If you give one team a better gift, others will notice. Keep one gift for all staff and upgrade only for clients or leadership.' },
    ],
  },
  steps: { id: 'how-to-order', title: 'How to order', items: DIWALI_STEPS },
  faqs: [
    {
      q: 'What is a good Diwali gift for employees under ₹500?',
      a: 'A small dry fruit box, a candle and diya set, or an eco kit (husk mug, seed notebook and pen) are good choices under ₹500. They are useful, safe for every employee and look festive in a printed gift box.',
    },
    {
      q: 'Can I get Diwali gifts for employees under ₹300?',
      a: 'Yes. Candle sets, floating flower candles, Shubh Labh candles and small dry fruit boxes start at about ₹199 per unit. See the “under ₹300” section above for the current list and prices.',
    },
    {
      q: 'Are these prices per employee?',
      a: `Yes. Every price is per unit, at the minimum order of ${FACTS.moq} units, and excludes GST. Larger orders (100+ units) get volume pricing in your quote.`,
    },
    {
      q: 'Does adding our logo push a gift over ₹500?',
      a: 'It can add a little. Your logo can go on the box or sleeve, with a printed insert card for your Diwali message. The branding cost depends on quantity and is shown separately in your quote, so you can pick a gift that stays within budget.',
    },
    {
      q: 'Is ₹500 too little for a Diwali gift?',
      a: 'No. For large teams, ₹300 to ₹500 per person is common. What matters more is that the gift is useful, well packed and arrives on time. If you have more to spend, see our <a href="/guides/diwali-gifts-for-employees-under-1000">Diwali gifts for employees under ₹1,000</a>.',
    },
  ],
  quote: DIWALI_QUOTE,
  related: [LINKS.under1000, LINKS.under2000, LINKS.employees, LINKS.dryFruit, LINKS.hub, LINKS.planning],
  updated: '2026-09-27',
  published: '2026-09-27',
}
