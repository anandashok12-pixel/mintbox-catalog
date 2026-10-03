import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { DIWALI_BADGES, DIWALI_QUOTE, DIWALI_STEPS, DIWALI_TRUST, GUIDES_PARENT, LINKS } from './shared'

// Target: "diwali gifts for employees under 2000" (+ under 1500, premium
// Diwali gifts for employees). Diwali categories, ₹1,001–₹2,000.
export const UNDER_2000: FestivePageConfig = {
  path: LINKS.under2000.href,
  metaTitle: 'Diwali Gifts for Employees Under ₹2,000 (2026) | MintBox',
  metaDescription:
    'Premium Diwali gifts for employees from ₹1,000 to ₹2,000: copper sets, tech hampers and fragrance gifts. Real prices, logo branding, GST invoice.',
  parents: [GUIDES_PARENT, { name: 'Diwali Gifts for Employees', href: LINKS.employees.href }],
  crumb: 'Under ₹2,000',
  eyebrow: 'Diwali 2026 · Premium gifts',
  h1: 'Diwali Gifts for Employees Under ₹2,000',
  h1Em: 'for managers, top performers and long-time staff',
  intro:
    'From ₹1,000 to ₹2,000 you can give something people keep for years: a copper bottle set, a tech hamper or a premium fragrance gift. Prices and contents are listed for every option.',
  badges: DIWALI_BADGES,
  diwaliStrip: true,
  quickAnswer: `Good Diwali gifts for employees under ₹2,000: copper bottle and tumbler sets (about ₹1,400 to ₹1,700), tech hampers (about ₹1,200 to ₹1,600) and premium candle and diffuser sets. This budget suits managers, top performers and small teams. Minimum order is ${FACTS.moq} units.`,
  trust: DIWALI_TRUST,
  picksNoun: 'gifts under ₹2,000',
  picks: [
    {
      id: '1000-1500',
      title: 'Diwali gifts from ₹1,000 to ₹1,500',
      intro: 'Drinkware and tech hampers, copper tumblers with a lamp, and larger dry fruit sets.',
      filter: { scope: 'diwali', min: 1001, max: 1500, sort: 'price-asc' },
    },
    {
      id: '1500-2000',
      title: 'Diwali gifts from ₹1,500 to ₹2,000',
      intro: 'Engraved copper sets, 7-in-1 tech hampers, executive sets and premium fragrance gifts.',
      filter: { scope: 'diwali', min: 1501, max: 2000, sort: 'price-asc' },
    },
  ],
  tips: {
    id: 'how-to-choose',
    title: 'Getting the most from a premium budget',
    items: [
      { title: 'Choose things that last', desc: 'Copper, good drinkware and desk tech are used for years. That is where a higher budget shows.' },
      { title: 'Go light on the logo', desc: 'At this price, a small engraved logo looks better than a large print. Put your message on the card instead.' },
      { title: 'Add names', desc: 'A name on the card or engraved on a bottle makes a premium gift feel personal. Share the names list when you confirm.' },
      { title: 'Order a sample first', desc: 'For bigger orders, see a sample in Bengaluru before you confirm. It avoids surprises on quality and colour.' },
    ],
  },
  steps: { id: 'how-to-order', title: 'How to order', items: DIWALI_STEPS },
  faqs: [
    {
      q: 'What is a premium Diwali gift for employees under ₹2,000?',
      a: 'Copper bottle and tumbler sets, 7-in-1 tech hampers, executive sets with a wallet and notebook, and premium candle and diffuser sets are good choices between ₹1,000 and ₹2,000.',
    },
    {
      q: 'What can I give under ₹1,500?',
      a: 'Between ₹1,000 and ₹1,500 you can choose drinkware and tech hampers, copper tumblers with a lamp, or larger dry fruit sets. See the first section above for current options and prices.',
    },
    {
      q: 'Can names be engraved on the gifts?',
      a: 'Yes. Names can go on the insert card for every gift, and can be engraved or printed on bottles, notebooks and mugs in select sets. Share the names list when you confirm your order.',
    },
    {
      q: 'Should we see a sample before ordering premium gifts?',
      a: 'At this price, yes, we recommend it. Samples of shortlisted gifts can be arranged in Bengaluru, and every quote comes with a mockup showing your logo on the box.',
    },
    {
      q: 'Are these gifts good for clients too?',
      a: 'Many are. For client-specific advice, including gift policies and GST, read our guide to <a href="/guides/diwali-gifts-for-clients">Diwali gifts for clients</a>.',
    },
  ],
  quote: DIWALI_QUOTE,
  related: [LINKS.under1000, LINKS.clients, LINKS.electronic, LINKS.employees, LINKS.hub, LINKS.planning],
  updated: '2026-09-27',
  published: '2026-09-27',
}
