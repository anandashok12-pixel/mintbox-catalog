import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { LINKS } from './shared'

// Target: "corporate gift hampers bangalore" (+ gift hampers Bangalore
// corporate, Diwali gift hampers Bangalore). Local, year-round page; the
// national Diwali hamper search belongs to /diwali-corporate-gifts.
export const BANGALORE_HAMPERS: FestivePageConfig = {
  path: LINKS.bangalore.href,
  metaTitle: 'Corporate Gift Hampers in Bangalore (2026) | MintBox',
  metaDescription:
    'Corporate gift hampers in Bangalore for Diwali, onboarding and clients: 10 hamper types with budgets, delivery tips and live prices, from 10 units.',
  parents: [{ name: 'Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' }],
  crumb: 'Gift Hampers',
  eyebrow: 'Bengaluru · Corporate hampers',
  h1: 'Corporate Gift Hampers in Bangalore',
  h1Em: '10 types, what they cost, and how to get them delivered',
  intro:
    'A simple guide for HR, admin and founders in Bengaluru: which hamper suits which occasion, what to budget, and how to get hampers into tech parks on time. Live prices for our hampers are below.',
  badges: [`✓ Packed in ${FACTS.city}`, `✓ Minimum ${FACTS.moq} units`, '✓ Logo branding', '✓ GST invoice', '✓ Office or home delivery'],
  quickAnswer: `Corporate gift hampers in Bangalore usually cost ₹700 to ₹1,500 for team gifting, ₹1,000 to ₹2,500 for gourmet or wellness hampers, and ₹3,000 or more for executive hampers. MintBox packs hampers in Bengaluru from ${FACTS.moq} units, with your logo, a GST invoice and delivery to offices or homes. For Diwali, confirm by ${FACTS.orderBy}.`,
  trust: [
    `Packed and quality-checked in ${FACTS.city}`,
    'Delivery to offices, tech parks and home addresses',
    'Samples can be seen in Bengaluru before you order',
    'GST invoice on every order',
  ],
  picksNoun: 'hampers',
  picks: [
    {
      id: 'festive',
      title: 'Festive hampers (Diwali 2026)',
      intro: 'Our Diwali range: dry fruits, drinkware, lamps and diyas in printed gift boxes.',
      filter: { scope: 'diwali', match: 'hamper|combo|gift set|collection|box', exclude: '^dry fruits', limit: 12 },
    },
    {
      id: 'year-round',
      title: 'Year-round gift sets',
      intro: 'For onboarding, work anniversaries and client meetings any time of year.',
      filter: { scope: 'other', match: 'gift set|hamper|kit|bundle', limit: 12 },
    },
  ],
  ideas: {
    id: 'hamper-types',
    title: '10 types of corporate hampers, and when to use each',
    intro: 'Price ranges are typical for Bangalore. Pick the type first, then the budget.',
    items: [
      { name: 'Festive dry fruit and sweets hamper', price: '₹800–₹1,500', desc: 'The Diwali classic: nuts in reusable jars, sweets and a diya. Safe for every level. Dry fruits handle delivery delays better than fresh sweets. See our <a href="/guides/diwali-dry-fruit-gift-boxes">Diwali dry fruit gift boxes</a>.' },
      { name: 'Gourmet snack hamper', price: '₹1,000–₹2,000', desc: 'Cookies, flavoured makhana, granola and good chocolate. Feels modern and works all year, not just at festivals.' },
      { name: 'Wellness hamper', price: '₹1,200–₹2,500', desc: 'Herbal tea, a candle, a journal and small self-care items. Good after appraisals, during busy seasons and on Women’s Day.' },
      { name: 'Coffee lover’s hamper', price: '₹900–₹1,800', desc: 'Filter coffee, a dabara-tumbler set or mug, and biscuits. A very Bengaluru gift that people like to share on social media.' },
      { name: 'Desk essentials hamper', price: '₹700–₹1,400', desc: 'Notebook, pen, sticky notes, a cable organiser and a bottle. Great value per rupee and ideal for large teams.' },
      { name: 'Eco hamper', price: '₹800–₹1,600', desc: 'A desk plant, seed-paper stationery, a bamboo pen and a jute pouch. Live plants need next-day delivery, so keep them local.' },
      { name: 'Executive hamper', price: '₹3,000–₹8,000', desc: 'Leather accessories, a premium pen and fine chocolate in a keepsake box. For leadership and top clients, where presentation matters most.' },
      { name: 'New joiner welcome hamper', price: '₹1,200–₹2,200', desc: 'T-shirt or hoodie, bottle, notebook, pen and a welcome card. Collect T-shirt sizes when the offer is accepted, not on day one.' },
      { name: 'Premium Diwali hamper', price: '₹1,500–₹3,500', desc: 'Dry fruits plus copper, brass or décor pieces in a rigid box. Usually the client-facing Diwali gift. Browse the full range on our <a href="/diwali-corporate-gifts">corporate Diwali gift hampers</a> page.' },
      { name: 'Custom branded hamper', price: '₹1,000+', desc: `Built to your brief: box, contents, colours and branding level. We build these from ${FACTS.moq} units and can show you a sample first.` },
    ],
  },
  tips: {
    id: 'bangalore-tips',
    title: 'Tips for hamper orders in Bangalore',
    items: [
      { title: 'Spend most on the contents', desc: 'A good rule: about 60% on contents, 25% on packaging and 15% on branding. A fancy box with little inside looks like marketing.' },
      { title: 'Choose one star item', desc: 'Every good hamper has one item people remember, such as good coffee, a plant or a leather notebook. Build the rest around it.' },
      { title: 'Order a small buffer', desc: 'Add 3 to 5% extra for new joiners and last-minute additions. Reordering a few later costs more per unit.' },
      { title: 'Plan tech-park deliveries', desc: 'For Whitefield, Electronic City, Manyata and other tech parks, name a receiving contact and book a delivery slot. Security checks take time.' },
    ],
  },
  faqs: [
    {
      q: 'How much do corporate gift hampers cost in Bangalore?',
      a: 'Typical prices are ₹700 to ₹1,400 for desk essentials, ₹800 to ₹1,500 for festive dry fruit hampers, ₹1,000 to ₹2,500 for gourmet and wellness hampers, and ₹3,000 to ₹8,000 for executive hampers. Larger orders get better pricing.',
    },
    {
      q: 'What is the minimum order for corporate hampers?',
      a: `Minimums vary between vendors. MintBox starts at ${FACTS.moq} units per hamper, which suits startups and smaller teams.`,
    },
    {
      q: 'Can I get same-day hamper delivery in Bangalore?',
      a: 'Ready-stock hampers can often go out the same day within Bangalore. Branded or custom hampers take longer, and we confirm the date in your quote. See our <a href="/bangalore-corporate-gifting/same-day-delivery">same-day gift delivery in Bangalore</a> page for details.',
    },
    {
      q: 'Can hampers be branded with our logo?',
      a: 'Yes, at three levels: a branded sleeve or ribbon, logo-printed items inside, or fully custom packaging. Most companies choose the first two.',
    },
    {
      q: 'Can we visit or collect samples in Bengaluru?',
      a: 'Yes. Samples of shortlisted hampers can be arranged in Bengaluru before you place a bulk order, and every quote includes a mockup showing your logo on the box.',
    },
  ],
  quote: {
    title: 'Get a hamper quote',
    subtitle: 'Tell us the occasion, how many hampers, your budget and where they are going. We reply with options, a mockup and delivery dates.',
    occasion: 'festival',
    cta: 'Get hamper quote',
  },
  related: [LINKS.hub, LINKS.bulk, LINKS.sameDay, LINKS.dryFruit, LINKS.clients, LINKS.companies],
  updated: '2026-09-27',
  published: '2026-09-26',
}
