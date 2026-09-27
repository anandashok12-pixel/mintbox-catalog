import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { GUIDES_PARENT, LINKS } from './shared'

// Target: "new year corporate gifts" (+ New Year gifts for employees / for
// clients 2027). Brought back from feat/crm-whatsapp-mirror; unverifiable
// client claims and lead times removed.
export const NEW_YEAR: FestivePageConfig = {
  path: LINKS.newYear.href,
  metaTitle: 'New Year Corporate Gifts for 2027: 15 Ideas | MintBox',
  metaDescription:
    'New Year corporate gifts for employees and clients: 2027 planners, desk calendars, wellness kits, tech and hampers, with budgets, timing and live prices.',
  parents: [GUIDES_PARENT],
  crumb: 'New Year Corporate Gifts',
  eyebrow: 'New Year 2027 · Corporate gifts',
  h1: 'New Year Corporate Gifts for 2027',
  h1Em: '15 ideas to start the year well',
  intro:
    'A New Year gift arrives when nobody else is sending one, so it gets noticed. Here are 15 ideas with budgets, the best time to send them, and gifts you can order now.',
  badges: [`✓ Minimum ${FACTS.moq} units`, '✓ Logo or name branding', '✓ GST invoice', '✓ Pan-India delivery'],
  quickAnswer: `Good New Year corporate gifts are things people use through the year: a 2027 planner or diary (₹300 to ₹900), a desk calendar (₹150 to ₹400), a wellness kit (₹800 to ₹1,800), tech accessories (₹500 to ₹1,500) or a gourmet hamper (₹1,000 to ₹2,500). Send them between mid-December and mid-January, and order by early December.`,
  picksNoun: 'gifts',
  picks: [
    {
      id: 'planners',
      title: 'Diaries, notebooks and desk calendars',
      intro: 'The classic New Year gift. Choose good paper and put the person’s name on the cover.',
      filter: { scope: 'other', match: 'diary|planner|calendar|notebook|journal', exclude: 'bottle|flask|mug|tumbler|power bank|speaker|mouse|clock', max: 1500, limit: 12, sort: 'price-asc' },
    },
    {
      id: 'desk-tech',
      title: 'Desk and tech gifts',
      intro: 'Useful every working day: stands, organisers, chargers and desk sets.',
      filter: { scope: 'other', match: 'mobile stand|desk|organi[sz]er|wireless|power bank|mouse pad|clock|laptop', limit: 12, sort: 'price-asc' },
    },
    {
      id: 'drinkware',
      title: 'Bottles and mugs',
      intro: 'January is resolution season. A good bottle or mug fits right in.',
      filter: { scope: 'other', match: 'bottle|flask|tumbler|mug', exclude: 'set|notebook', limit: 12, sort: 'price-asc' },
    },
  ],
  ideas: {
    id: 'ideas',
    title: '15 New Year corporate gift ideas',
    intro: 'Budgets are typical per person. Some are in our catalogue above; for others, ask us or arrange them directly.',
    items: [
      { name: '2027 planner or diary', price: '₹300–₹900', desc: 'Good paper, a ribbon marker and the person’s name on the cover. A thin freebie diary gets thrown away; a good one gets used all year.' },
      { name: 'Branded desk calendar', price: '₹150–₹400', desc: 'The cheapest way to stay on 365 desks. Add useful extras like holiday lists and quarter markers.' },
      { name: 'Motivational desk item', price: '₹300–₹800', desc: 'An engraved quote block or goal tracker. Use a line from your company values instead of a generic slogan.' },
      { name: 'Premium notebook', price: '₹400–₹1,000', desc: 'Undated, thick paper, a nice cover. Pair it with a good pen for a neat kit under ₹1,000.' },
      { name: 'Wellness kit', price: '₹800–₹1,800', desc: 'Herbal tea, a candle and a small self-care item. It fits the new-year mood of looking after yourself.' },
      { name: 'Smart water bottle', price: '₹800–₹1,500', desc: 'A temperature-display bottle suits January health goals. Choose models with good build quality for bulk orders.' },
      { name: 'Goal-setting journal', price: '₹350–₹700', desc: 'Guided prompts for quarterly goals and weekly reviews. A natural fit for teams that use OKRs.' },
      { name: 'Team experience voucher', price: '₹1,000–₹3,000', desc: 'A team lunch or workshop in January doubles as a kick-off. A shared memory can mean more than an object.' },
      { name: 'Gourmet New Year hamper', price: '₹1,000–₹2,500', desc: `Chocolate, coffee, cookies and honey in a keepsake box. We build these to your budget from ${FACTS.moq} units.` },
      { name: 'Tech accessories', price: '₹500–₹1,500', desc: 'Wireless chargers, cable organisers and USB hubs are some of the most used gifts. Keep the logo small.' },
      { name: 'Plant kit', price: '₹400–₹900', desc: 'A herb kit or small succulent with a “new beginnings” card. Cheap, meaningful and very photogenic.' },
      { name: 'Branded hoodie', price: '₹700–₹1,500', desc: 'January is the one cold month in most Indian offices. Choose a heavy fabric and keep the branding small.' },
      { name: 'Coffee kit', price: '₹600–₹1,400', desc: 'Filter coffee or a pour-over kit with a mug. Locally roasted coffee gives it a story.' },
      { name: 'Fitness band', price: '₹1,500–₹3,000', desc: 'The premium end of resolution gifts. Best offered as one choice among several, since many people already wear one.' },
      { name: 'Thank-you card with a small gift', price: '₹250–₹600', desc: 'A handwritten thank-you for the year, with a small gift like chocolate or a notebook. The card does most of the work.' },
    ],
  },
  tips: {
    id: 'timing',
    title: 'When and how to send New Year gifts',
    items: [
      { title: 'Why New Year works', desc: 'Diwali is crowded: your gift is one of many in the same week. A New Year gift usually arrives on its own, so it is noticed and remembered.' },
      { title: 'A split that works', desc: 'Many companies keep Diwali for clients and tradition, and use New Year for employees and a fresh start.' },
      { title: 'Order by early December', desc: 'For delivery in the first week of January, confirm by early December. Branding, year-end holidays and courier load all add time.' },
      { title: 'Send between mid-Dec and mid-Jan', desc: 'Late December pairs the gift with year-end thanks. Early January frames it as a kick-off. After mid-January, the moment has passed.' },
    ],
  },
  faqs: [
    {
      q: 'What are good New Year gifts for employees?',
      a: 'Strong choices are a 2027 planner, a wellness kit, a gourmet hamper, a hoodie for the January cold, or tech accessories like a wireless charger. Add a short personal note about the year ahead.',
    },
    {
      q: 'What should we send clients for the New Year?',
      a: 'Keep it premium and useful: a quality 2027 diary with their name, a coffee or tea kit, or a gourmet hamper. Because few companies send New Year gifts, even a ₹800 to ₹1,500 gift stands out. See our <a href="/guides/corporate-gifts-for-clients">corporate gifts for clients</a> guide for budgets.',
    },
    {
      q: 'When should New Year corporate gifts be sent?',
      a: 'Between mid-December and mid-January. Order by early December so there is time for branding and delivery during the busy holiday period.',
    },
    {
      q: 'Are diaries still a good corporate gift?',
      a: 'Yes, if they are good quality. Spend a bit more, put the person’s name on the cover rather than only your logo, and it will be used all year.',
    },
    {
      q: 'How much should we spend per employee on New Year gifts?',
      a: 'Most companies spend ₹300 to ₹800 for a single useful item, or ₹1,000 to ₹2,500 for a hamper. If you already gave Diwali gifts, a smaller, well-chosen New Year gift works well.',
    },
  ],
  quote: {
    title: 'Get a New Year gift quote',
    subtitle: 'Tell us how many people, your budget and where they are. We reply with options, a mockup and delivery dates.',
    occasion: 'year_end',
    cta: 'Get New Year quote',
  },
  related: [LINKS.secretSanta, LINKS.christmas, LINKS.clientsYearRound, LINKS.handbook, LINKS.bangalore, LINKS.employees],
  updated: '2026-09-27',
  published: '2026-09-26',
}
