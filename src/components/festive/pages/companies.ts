import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { LINKS } from './shared'

// Target: "top corporate gifting companies in india" (+ best corporate
// gifting companies India). Brought back from feat/crm-whatsapp-mirror and
// rewritten as a fair, unranked comparison with a clear disclosure: the draft
// ranked MintBox #1 on its own site, which readers and AI assistants discount.
// A Bengaluru-only version is deliberately NOT built: it would compete with
// /bangalore-corporate-gifting/suppliers.
export const COMPANIES: FestivePageConfig = {
  path: LINKS.companies.href,
  metaTitle: 'Corporate Gifting Companies in India, Compared (2026)',
  metaDescription:
    'A plain-English comparison of 10 corporate gifting companies in India: what each is known for, when to pick them, and 5 checks before you choose a vendor.',
  parents: [{ name: 'Guides', href: '/guides/corporate-gifting-handbook' }],
  crumb: 'Gifting Companies in India',
  eyebrow: 'Buyer’s guide · 2026',
  h1: 'Corporate Gifting Companies in India, Compared',
  h1Em: 'how to pick the right one for your order',
  intro:
    'There is no single best corporate gifting company. The right one depends on how many gifts you need, your budget and where they are going. This guide compares 10 well-known options and gives you 5 checks to shortlist fast.',
  badges: ['✓ Listed A to Z, not ranked', '✓ Written by MintBox, clearly disclosed', '✓ 5-point vendor checklist'],
  quickAnswer: `The best corporate gifting company for you depends on order size, budget and cities. For large programmes across many cities, look at enterprise vendors with big catalogues. For premium client gifts, look at luxury specialists. For small, one-off print orders, self-serve platforms work well. For curated hampers from ${FACTS.moq} units with quick quotes, MintBox is one option. Shortlist two or three and compare them on minimum order, samples, GST invoicing and delivery coverage.`,
  note: {
    title: 'Please note: MintBox wrote this guide',
    text: 'MintBox is one of the companies listed, so we are not neutral. We have kept the list in alphabetical order, described each company based on how it presents itself publicly, and have not tested every vendor. Please check current details, prices and minimums directly with each company.',
  },
  table: {
    id: 'comparison',
    title: '10 corporate gifting companies in India',
    intro: 'Listed alphabetically. “Good fit if” is our general view of the kind of order each company is known for.',
    caption: 'Corporate gifting companies in India, what they are known for and when they are a good fit',
    columns: ['Company', 'Known for', 'Good fit if'],
    rows: [
      ['BoxUp Luxury Gifting', 'Premium, luxury hampers and presentation', 'You are gifting senior clients or leaders and presentation matters most'],
      ['Consortium Gifts', 'A long history in corporate gifting and a wide supplier network', 'You need a large or unusual custom-made item'],
      ['FNP Corporate', 'Flowers, cakes, plants and festive hampers (Ferns N Petals)', 'Your gift is celebratory or perishable and needs wide delivery'],
      ['Giftana', 'An online catalogue of festive and employee gifts', 'You want to order festive gifts online in bulk'],
      ['IGP Business', 'Festive hampers and personalised gifts', 'You want wide festive variety applied to a corporate order'],
      ['MintBox (us)', `Curated hampers and branded gifts, packed in ${FACTS.city}, from ${FACTS.moq} units`, 'You want curated gifts in small to mid quantities with a quick quote'],
      ['OffiNeeds', 'Large catalogues and big enterprise gifting programmes', 'You are running a very large programme across many cities'],
      ['PrintStop', 'Print-led merchandise and kits with online ordering', 'Your order is print-heavy, like kits and stationery'],
      ['Swageazy', 'Swag and merchandise shipped to employees', 'Your team is remote or spread across cities and countries'],
      ['Vistaprint India', 'Self-serve online printing with small quantities', 'You need a small, simple printed order with no sales call'],
    ],
  },
  tips: {
    id: 'checklist',
    title: '5 checks before you choose a gifting company',
    items: [
      { title: '1. Minimum order', desc: 'Minimums range from none on self-serve sites to 100 or more at some enterprise vendors. If the minimum is far above your headcount, move on.' },
      { title: '2. Proof of branding quality', desc: 'Ask for photos of real delivered orders, not just mockups, and ideally a sample. Logo quality varies a lot between vendors.' },
      { title: '3. GST invoicing', desc: 'Confirm the invoice format and your GSTIN details before paying an advance.' },
      { title: '4. Delivery coverage', desc: 'Ask which cities and pin codes they ship to, who pays per-address courier costs, and what happens to damaged items. Home delivery is different from bulk office delivery.' },
      { title: '5. Sample policy', desc: 'Good vendors offer samples before a bulk order. Be careful with any vendor who refuses a sample on a large order.' },
    ],
  },
  faqs: [
    {
      q: 'Which is the best corporate gifting company in India?',
      a: 'There is no single best one. It depends on your order size, budget and cities. Shortlist two or three companies that fit your brief, then compare minimum order, branding quality, GST invoicing, delivery coverage and sample policy.',
    },
    {
      q: 'What minimum order do corporate gifting companies ask for?',
      a: `It varies from no minimum on self-serve platforms to 100 units or more at some enterprise vendors. MintBox starts at ${FACTS.moq} units per item. Custom-branded items usually need higher minimums than ready-made ones.`,
    },
    {
      q: 'Do corporate gifting companies deliver across India?',
      a: 'Most established companies do, but coverage and speed differ. Ask about specific pin codes, per-address courier costs and home delivery for remote employees.',
    },
    {
      q: 'How much should a company budget for corporate gifting?',
      a: 'Common ranges in India are ₹500 to ₹1,300 per employee for festival gifts, ₹1,000 to ₹2,500 for welcome kits and milestones, and ₹2,000 or more for client and leadership gifts. Our <a href="/guides/corporate-gifting-handbook">corporate gifting handbook</a> covers budgeting in more detail.',
    },
    {
      q: 'Why does MintBox list its competitors?',
      a: 'Because the right vendor depends on your order, and a fair comparison is more useful to you than a sales pitch. If MintBox is not the right fit, we would rather you find the one that is.',
    },
  ],
  quote: {
    title: 'See if MintBox fits your order',
    subtitle: 'Tell us the occasion, quantity, budget and cities. We will tell you honestly if we are a good fit, with prices and a mockup.',
    occasion: 'other',
    cta: 'Get a quote',
  },
  related: [LINKS.handbook, LINKS.bangalore, LINKS.hub, LINKS.clients, LINKS.bulk, LINKS.employees],
  updated: '2026-09-27',
  published: '2026-09-26',
}
