import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { DIWALI_BADGES, DIWALI_STEPS, GUIDES_PARENT, LINKS } from './shared'

// Target: "diwali gifts for clients" (+ corporate Diwali gifts for clients,
// best Diwali gifts for clients). Brought back from feat/crm-whatsapp-mirror
// with its ideas kept; dates, lead times and service claims corrected to the
// shared facts.
export const CLIENTS: FestivePageConfig = {
  path: LINKS.clients.href,
  metaTitle: "15 Diwali Gifts for Clients That Aren't Dry Fruits (2026)",
  metaDescription:
    'Diwali gift ideas for clients beyond dry fruits: copper décor, premium candles, tea, desk décor and tech, with budgets per client and gift-policy tips.',
  parents: [GUIDES_PARENT],
  crumb: 'Diwali Gifts for Clients',
  eyebrow: 'Diwali 2026 · Client gifting',
  h1: '15 Diwali Gifts for Clients',
  h1Em: "that aren't another box of dry fruits",
  intro:
    'Your clients will get plenty of dry fruit boxes this Diwali. These 15 ideas help your gift stand out, with a suggested budget for each and tips on gift policies, GST and timing.',
  badges: DIWALI_BADGES,
  diwaliStrip: true,
  quickAnswer: `Good Diwali gifts for clients that are not dry fruits include copper or brass décor, premium candle and diffuser sets, artisan tea, personalised desk décor and quality tech. Spend about ₹500 to ₹1,000 for your wider client list, ₹1,500 to ₹2,500 for key accounts and more for strategic partners. Check each client’s gift policy, and plan for gifts to arrive 3 to 7 days before Diwali.`,
  picksNoun: 'client gifts',
  picks: [
    {
      id: 'key-accounts',
      title: 'Ready-made gifts for key clients',
      intro: 'Copper sets, executive sets and premium fragrance gifts from our Diwali range, ₹1,300 and above.',
      filter: { scope: 'diwali', min: 1300, match: 'copper|executive|diffuser|candle|urli|wooden|warmer|tech|charger', sort: 'price-asc' },
    },
    {
      id: 'wider-list',
      title: 'Thoughtful gifts for your wider client list',
      intro: 'Décor, candles and drinkware from ₹500 to ₹1,299 that feel considered without breaking the budget.',
      filter: { scope: 'diwali', min: 500, max: 1299, match: 'copper|candle|diffuser|urli|figurine|lamp|aroma', sort: 'price-asc', limit: 12 },
    },
  ],
  ideas: {
    id: 'ideas',
    title: '15 Diwali gift ideas for clients',
    intro: 'Budgets are typical market prices per client. Many of these you can order from us; a few, like vouchers, books or donations, you would arrange directly.',
    items: [
      { name: 'Gourmet chocolate trunk', price: '₹1,200–₹2,500', desc: 'Dark chocolate, pralines and cocoa-dusted nuts in a keepsake box. Feels premium without the dry-fruit fatigue, and the box stays on the shelf.' },
      { name: 'Brass or copper décor', price: '₹800–₹2,000', desc: 'An urli, tealight holders or a small copper vase. Festive, meaningful and used again every Diwali.' },
      { name: 'Premium candle and diffuser set', price: '₹900–₹1,800', desc: 'A soy candle with a reed diffuser in scents like sandalwood or oudh. Safe for every diet and easy to courier.' },
      { name: 'Artisan tea set', price: '₹1,000–₹2,200', desc: 'Darjeeling, Nilgiri or masala chai blends with an infuser or cups. Thoughtful, and works for clients who avoid sweets.' },
      { name: 'Personalised desk décor', price: '₹700–₹1,500', desc: 'An engraved nameplate, coaster set or paperweight with the client’s name. Personalisation makes a mid-budget gift feel made for them. Check the spelling twice.' },
      { name: 'Eco hamper', price: '₹800–₹1,600', desc: 'Seed-paper stationery, a bamboo bottle and organic snacks in low-waste packaging. A good match for clients with visible sustainability goals.' },
      { name: 'Silver-plated gift', price: '₹2,000–₹5,000', desc: 'A silver-plated coin, bowl or frame. The most traditional premium gesture, best kept for long relationships.' },
      { name: 'Channapatna handicrafts', price: '₹600–₹1,500', desc: 'GI-tagged lacquered wooden toys and décor from near Bengaluru. A gift with a story. Ask us if you would like these in your order.' },
      { name: '2027 diary and pen set', price: '₹800–₹1,800', desc: 'A good diary with the client’s name on the cover rather than your logo. It arrives just before planning season and gets used all year.' },
      { name: 'Smart gadgets', price: '₹1,500–₹3,500', desc: 'A wireless charger, compact speaker or desk lamp. Best for tech-savvy client teams. Keep the logo small.' },
      { name: 'Plant with a planter', price: '₹500–₹1,200', desc: 'An easy plant like a snake plant or jade in a ceramic pot. It stands for growth and stays on the desk for years.' },
      { name: 'Coffee-table book', price: '₹1,000–₹2,500', desc: 'A book on Indian art, design or the client’s industry. It flatters their taste instead of advertising yours.' },
      { name: 'Experience voucher', price: '₹1,500–₹5,000', desc: 'A dining or spa voucher for the client and family. No courier risk. Pair it with a handwritten card.' },
      { name: 'Custom client hamper', price: '₹1,500–₹4,000', desc: `A hamper built around what the client likes, with light co-branding. MintBox builds these to your brief from ${FACTS.moq} units.` },
      { name: 'Donation in the client’s name', price: 'Any budget', desc: 'A donation to a trusted charity, with a card saying what it funded. Ideal when a client’s policy does not allow gifts.' },
    ],
  },
  tips: {
    id: 'before-you-send',
    title: 'Before you send client gifts',
    items: [
      { title: 'Check their gift policy', desc: 'Many companies, especially banks, MNCs and government-linked firms, cap gifts at a set value or ban them. One email to your contact avoids a returned gift.' },
      { title: 'Plan for GST', desc: 'You usually cannot claim back the GST on goods you give as gifts, so count it as part of the gift cost. Keep invoices and a gift register, and check the details with your CA.' },
      { title: 'Arrive before Diwali week', desc: 'Aim for gifts to arrive 3 to 7 days before Diwali, before offices empty out. Outstation gifts should leave by late October.' },
      { title: 'Order by mid-October', desc: `For client gifts to arrive a week before Diwali, confirm by mid-October. ${FACTS.orderBy} is the last date for guaranteed delivery before Diwali itself.` },
    ],
  },
  steps: { id: 'how-to-order', title: 'How to order', items: DIWALI_STEPS },
  faqs: [
    {
      q: 'What can I gift clients on Diwali besides dry fruits?',
      a: 'Strong options include copper or brass décor, premium candle and diffuser sets, artisan tea, personalised desk décor, eco hampers, 2027 diaries and quality tech. Gifts that clients keep or use tend to be remembered longer than food.',
    },
    {
      q: 'How much should I spend on Diwali gifts per client?',
      a: 'A common approach is ₹500 to ₹1,000 for the wider client list, ₹1,500 to ₹2,500 for key accounts and ₹3,000 or more for strategic partners. Stay within your client’s gift policy limit.',
    },
    {
      q: 'When should Diwali gifts reach clients?',
      a: `Aim for 3 to 7 days before Diwali, which is on ${FACTS.diwaliDate}. To get there, confirm by mid-October. ${FACTS.orderBy} is the last date for guaranteed delivery before Diwali.`,
    },
    {
      q: 'What is the GST treatment of Diwali gifts to clients?',
      a: 'You usually cannot claim input tax credit on goods given as gifts, so the GST you pay becomes part of the gift cost. Keep invoices and a gift register, and check the details with your chartered accountant.',
    },
    {
      q: 'Should client gifts carry our company logo?',
      a: 'Lightly. A logo on the sleeve or a branded card is fine. A large logo on the gift itself turns it into an advert. Many companies put the client’s name on the gift instead.',
    },
    {
      q: 'Can MintBox handle our client gifting end to end?',
      a: `Yes. We help you choose, add branding and a card, and ship to each client address across India with tracking. Minimum order is ${FACTS.moq} units and we reply to quote requests in ${FACTS.quoteTime}. If you prefer the classic option, see our <a href="/guides/diwali-dry-fruit-gift-boxes">Diwali dry fruit gift boxes</a>.`,
    },
  ],
  quote: {
    title: 'Get a quote for client gifts',
    subtitle: 'Tell us how many clients, your budget per client and where they are. We reply with options, a mockup and delivery dates.',
    occasion: 'client_gifting',
    cta: 'Get client gift quote',
  },
  related: [LINKS.hub, LINKS.dryFruit, LINKS.under2000, LINKS.clientsYearRound, LINKS.planning, LINKS.companies],
  updated: '2026-09-27',
  published: '2026-07-03',
}
