import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { DIWALI_BADGES, DIWALI_QUOTE, DIWALI_STEPS, DIWALI_TRUST, GUIDES_PARENT, LINKS } from './shared'

// Target: "diwali gifts for employees under 1000" (+ "diwali corporate gifts
// under 1000"). Diwali categories, ₹501–₹1,000.
export const UNDER_1000: FestivePageConfig = {
  path: LINKS.under1000.href,
  metaTitle: 'Diwali Gifts for Employees Under ₹1,000 (2026) | MintBox',
  metaDescription:
    'Diwali gifts for employees from ₹500 to ₹1,000: drinkware hampers, dry fruits with a diya, desk and eco sets. Real prices, logo branding, from 10 units.',
  parents: [GUIDES_PARENT, { name: 'Diwali Gifts for Employees', href: LINKS.employees.href }],
  crumb: 'Under ₹1,000',
  eyebrow: 'Diwali 2026 · Mid budget',
  h1: 'Diwali Gifts for Employees Under ₹1,000',
  h1Em: 'the sweet spot for all-staff gifting',
  intro:
    'Between ₹500 and ₹1,000 you can give a proper hamper: a bottle or mug, dry fruits, a diya or lamp, in a printed box. Every option below shows its price and full contents.',
  badges: DIWALI_BADGES,
  diwaliStrip: true,
  quickAnswer: `For ₹500 to ₹1,000 per employee, choose a small hamper that mixes something useful with something festive. Good examples: a bottle or mug with dry fruits, a lamp with a diya, or an eco desk set. Many companies spend in this range for all-staff gifting. Minimum order is ${FACTS.moq} units and prices exclude GST.`,
  trust: DIWALI_TRUST,
  picksNoun: 'gifts under ₹1,000',
  picks: [
    {
      id: '500-750',
      title: 'Diwali gifts from ₹500 to ₹750',
      intro: 'Compact hampers and gift sets: a glass bottle with a mug, a wooden desk set, a tote with a festive light.',
      filter: { scope: 'diwali', min: 501, max: 750, sort: 'price-asc' },
    },
    {
      id: '750-1000',
      title: 'Diwali gifts from ₹750 to ₹1,000',
      intro: 'Fuller hampers with drinkware, dry fruits and a lamp or diya. A good fit for managers and your whole team if budget allows.',
      filter: { scope: 'diwali', min: 751, max: 1000, sort: 'price-asc' },
    },
  ],
  tips: {
    id: 'how-to-choose',
    title: 'Choosing the right gift at this budget',
    items: [
      { title: 'Useful beats decorative', desc: 'Bottles, mugs and desk items get used every day. Decorative items often end up in a cupboard.' },
      { title: 'Mix useful and festive', desc: 'The best hampers pair one daily-use item with one festive touch, such as a diya, lamp or dry fruits.' },
      { title: 'Check who eats what', desc: 'If your team has many dietary needs, choose a gift without food, or ask us to swap the food item.' },
      { title: 'Think about delivery', desc: 'If people work from home, ask for home delivery. We can ship to every address and share tracking.' },
    ],
  },
  steps: { id: 'how-to-order', title: 'How to order', items: DIWALI_STEPS },
  faqs: [
    {
      q: 'What can I give employees for Diwali under ₹1,000?',
      a: 'Popular choices are a bottle and mug hamper with dry fruits, a lamp and diya combo, a wooden eco desk set, or a copper tumbler set. All of them come in a printed gift box and can carry your logo.',
    },
    {
      q: 'How much should we spend on Diwali gifts per employee?',
      a: 'Many companies spend ₹500 to ₹1,300 per employee for all-staff Diwali gifts. Clients and senior leaders usually get a gift in the ₹1,300 to ₹2,200 range.',
    },
    {
      q: 'Is GST included in these prices?',
      a: 'No. All prices are per unit and exclude GST. GST is added on your invoice, which is issued in your company’s name.',
    },
    {
      q: 'Can we mix different gifts in one order?',
      a: `Yes. You can choose different gifts for different teams in the same order, as long as each gift meets the minimum of ${FACTS.moq} units.`,
    },
    {
      q: 'Can gifts be delivered to employees’ homes?',
      a: 'Yes. Share a list of addresses and we ship to each person across India, with tracking shared on email and WhatsApp.',
    },
  ],
  quote: DIWALI_QUOTE,
  related: [LINKS.under500, LINKS.under2000, LINKS.employees, LINKS.electronic, LINKS.hub, LINKS.planning],
  updated: '2026-09-27',
  published: '2026-09-27',
}
