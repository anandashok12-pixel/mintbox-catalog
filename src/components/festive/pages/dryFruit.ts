import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { DIWALI_BADGES, DIWALI_QUOTE, DIWALI_STEPS, GUIDES_PARENT, LINKS } from './shared'

const DRY_FRUIT = 'dry fruit|cashew|almond|pistachio|raisin|kishmish|apricot|dates'

// Target: "diwali dry fruits gift box" (+ corporate dry fruit gift box,
// dry fruit hampers for Diwali). Replaces the old "Top 12 Corporate Diwali
// Gift Hampers" draft, which competed with /diwali-corporate-gifts.
export const DRY_FRUIT_PAGE: FestivePageConfig = {
  path: LINKS.dryFruit.href,
  metaTitle: 'Diwali Dry Fruit Gift Boxes for Companies (2026) | MintBox',
  metaDescription:
    'Corporate Diwali dry fruit gift boxes from ₹280: cashews, almonds, pistachios and raisins in printed boxes. Logo branding, FSSAI-compliant, from 10 units.',
  parents: [GUIDES_PARENT, { name: 'Diwali Gift Ideas', href: LINKS.planning.href }],
  crumb: 'Dry fruit gift boxes',
  eyebrow: 'Diwali 2026 · Dry fruits',
  h1: 'Diwali Dry Fruit Gift Boxes',
  h1Em: 'for employees, clients and partners',
  intro:
    'Dry fruits are the most traditional Diwali gift in Indian offices. Below you can compare boxes by size and price, from a 40g-per-nut starter box to 200g premium chests, plus hampers that pair dry fruits with a diya or drinkware.',
  badges: DIWALI_BADGES,
  diwaliStrip: true,
  quickAnswer: `Small corporate Diwali dry fruit boxes (40g to 50g of each nut) start at about ₹280. Mid-size boxes (75g to 100g of each) cost about ₹600 to ₹1,150. Premium boxes (150g to 200g of each) cost about ₹1,200 to ₹2,050. Compare the weight per item, not just the number of items. Minimum order is ${FACTS.moq} boxes.`,
  trust: [
    'Sealed, FSSAI-compliant packs with shelf-life labels',
    'Weight of every nut listed before you order',
    'Logo on the box or sleeve, printed Diwali card',
    'GST invoice on every order, pan-India delivery with tracking',
  ],
  picksNoun: 'dry fruit gifts',
  picks: [
    {
      id: 'boxes',
      title: 'Dry fruit gift boxes',
      intro: 'Classic 4-in-1 and 6-in-1 boxes. The name of each box shows the weight of every item, so you can compare fairly.',
      filter: { scope: 'diwali', match: '^dry fruits', sort: 'price-asc' },
    },
    {
      id: 'combos',
      title: 'Dry fruit hampers with a festive extra',
      intro: 'Dry fruits paired with a diya, lamp, bottle or mug, for a gift that lasts beyond the festival.',
      filter: { scope: 'diwali', match: DRY_FRUIT, sort: 'price-asc' },
    },
  ],
  table: {
    id: 'size-guide',
    title: 'Which box size to choose',
    intro: 'A quick guide to box sizes and who they suit. Prices are approximate, per box, excluding GST.',
    caption: 'Dry fruit gift box sizes, prices and who they suit',
    columns: ['Box size', 'Approx. price', 'Best for'],
    rows: [
      ['4 items × 40–50g', '₹280–₹450', 'Large teams, interns, support staff'],
      ['4–6 items × 75–100g', '₹600–₹1,150', 'All employees, managers'],
      ['4–6 items × 150–200g', '₹1,200–₹2,050', 'Clients, senior leaders, partners'],
    ],
  },
  tips: {
    id: 'buying-tips',
    title: 'What to check before ordering dry fruits',
    items: [
      { title: 'Weight per item', desc: 'A “6-in-1” box with 40g of each nut holds less than a 4-in-1 box with 100g. Compare the grams, not the number of items.' },
      { title: 'Freshness', desc: 'Ask for the packing date. Sealed dry fruit packs keep well for months, but fresher is always better for a gift.' },
      { title: 'Allergies', desc: 'Some people are allergic to nuts. For mixed teams, consider offering a non-food option too, such as a candle or eco set.' },
      { title: 'Reusable boxes', desc: 'A sturdy box or wooden chest gets reused at home, which keeps your brand in sight long after Diwali.' },
    ],
  },
  steps: { id: 'how-to-order', title: 'How to order', items: DIWALI_STEPS },
  faqs: [
    {
      q: 'How much does a corporate Diwali dry fruit box cost?',
      a: 'Small boxes start at about ₹280. Mid-size boxes with 75g to 100g of each item cost about ₹600 to ₹1,150, and premium boxes with 150g to 200g of each cost about ₹1,200 to ₹2,050. Prices exclude GST.',
    },
    {
      q: 'Which dry fruits are in the boxes?',
      a: 'Most boxes contain cashews, almonds, pistachios and raisins. Some also include apricots, dates or chocolates. The exact contents and weights are listed under “What’s inside” on every box.',
    },
    {
      q: 'How long do dry fruit gift boxes stay fresh?',
      a: 'Sealed dry fruit packs keep for months. Every pack is FSSAI-compliant and carries a shelf-life label, and you can ask us for the packing date before you order. Certificates are available on request.',
    },
    {
      q: 'Can we print our logo on dry fruit boxes?',
      a: 'Yes. Your logo can go on the box or a sleeve, and you can add a printed Diwali card with your message.',
    },
    {
      q: 'Can we order different box sizes in one order?',
      a: `Yes. You can mix designs, for example small boxes for all staff and premium chests for clients, as long as each design meets the minimum of ${FACTS.moq} boxes.`,
    },
  ],
  quote: DIWALI_QUOTE,
  related: [LINKS.hub, LINKS.under500, LINKS.under1000, LINKS.clients, LINKS.electronic, LINKS.planning],
  updated: '2026-09-27',
  published: '2026-09-27',
}
