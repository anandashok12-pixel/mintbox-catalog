import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { DIWALI_BADGES, DIWALI_QUOTE, DIWALI_STEPS, GUIDES_PARENT, LINKS } from './shared'

const GADGETS =
  'power bank|earbud|earphone|headphone|neckband|speaker|smartwatch|smart watch|wireless charg|charging (station|pad|mouse)|travel charger|mouse|keyboard|tracker|soundbar|usb|laptop stand|digital clock|portable fan|electronics|audio'

// Target: "electronic diwali gifts for employees" (+ tech Diwali gifts,
// Diwali gifts electronics). Tech hampers from the Diwali range plus
// gadgets from the main catalogue.
export const ELECTRONIC: FestivePageConfig = {
  path: LINKS.electronic.href,
  metaTitle: 'Electronic Diwali Gifts for Employees (2026) | MintBox',
  metaDescription:
    'Electronic Diwali gifts for employees: tech hampers, power banks, earbuds, speakers and wireless chargers with your logo. Real prices and GST invoice.',
  parents: [GUIDES_PARENT, { name: 'Diwali Gifts for Employees', href: LINKS.employees.href }],
  crumb: 'Electronic gifts',
  eyebrow: 'Diwali 2026 · Tech gifts',
  h1: 'Electronic Diwali Gifts for Employees',
  h1Em: 'gadgets your team will use every day',
  intro:
    'Tech gifts are used daily, so your Diwali gift stays in sight long after the festival. Below are tech hampers made for Diwali and single gadgets you can brand with your logo.',
  badges: DIWALI_BADGES,
  diwaliStrip: true,
  quickAnswer: `Popular electronic Diwali gifts for employees are power banks, wireless earbuds, Bluetooth speakers, wireless chargers and laptop stands. A tech hamper with 3 to 7 items costs about ₹1,200 to ₹1,600 per person; single gadgets start under ₹1,000. Choose known brands with a warranty, and confirm by ${FACTS.orderBy} for Diwali delivery.`,
  trust: [
    'Branded gadgets, with warranty details confirmed in your quote',
    'Laser-engraved or printed logo on many gadgets',
    'Packed in a Diwali gift box with a printed card',
    'GST invoice on every order, pan-India delivery with tracking',
  ],
  picksNoun: 'tech gifts',
  picks: [
    {
      id: 'tech-hampers',
      title: 'Diwali tech hampers',
      intro: 'Ready-made Diwali hampers built around a gadget, such as a wireless charger, laptop stand or power bank, with a festive touch.',
      filter: { scope: 'diwali', match: 'wireless charger|power bank|laptop stand|mobile stand|charging cable|pen drive|humidifier|tech', sort: 'price-asc' },
    },
    {
      id: 'gadgets-under-1500',
      title: 'Gadgets under ₹1,500',
      intro: 'Single gadgets for all-staff gifting: earbuds, speakers, chargers and desk tech.',
      filter: { scope: 'other', match: GADGETS, max: 1500, sort: 'price-asc', exclude: 'cable$|^3 in 1 charging cable' },
    },
    {
      id: 'premium-gadgets',
      title: 'Premium gadgets and tech gift sets',
      intro: 'For managers, leadership and client teams: smartwatches, bigger power banks, soundbars and tech gift sets.',
      filter: { scope: 'other', match: GADGETS, min: 1501, sort: 'price-asc' },
    },
  ],
  tips: {
    id: 'buying-tips',
    title: 'What to check before you buy tech gifts',
    items: [
      { title: 'Warranty and brand', desc: 'Pick known brands with a warranty card in the box. A gadget that fails in a month does more harm than no gift.' },
      { title: 'USB-C charging', desc: 'Most phones and laptops now use USB-C. Gadgets that charge the same way are easier to live with.' },
      { title: 'Small, neat logo', desc: 'A small laser-engraved logo looks premium. A large printed logo on a speaker or power bank looks promotional.' },
      { title: 'Shipping rules for batteries', desc: 'Power banks and gadgets with batteries can take longer to courier to some locations. Order early if you are shipping outside Bengaluru.' },
    ],
  },
  steps: { id: 'how-to-order', title: 'How to order', items: DIWALI_STEPS },
  faqs: [
    {
      q: 'What are the best electronic Diwali gifts for employees?',
      a: 'The most used tech gifts are power banks, wireless earbuds, compact Bluetooth speakers, wireless chargers and laptop stands. They suit almost everyone and get used every day.',
    },
    {
      q: 'How much does an electronic Diwali gift cost per employee?',
      a: 'Single gadgets start under ₹1,000. Diwali tech hampers with several items cost about ₹1,200 to ₹1,600. Premium gadgets such as smartwatches and larger power banks cost ₹2,000 and above.',
    },
    {
      q: 'Can our logo be added to gadgets?',
      a: 'Yes. Many gadgets can be laser-engraved or printed with your logo, and every gift can go in a Diwali box with a printed card. The branding method depends on the product and is confirmed in your quote.',
    },
    {
      q: 'Do electronic gifts come with a warranty?',
      a: 'Branded gadgets come with the manufacturer’s warranty. Engraving or printing a logo can affect the warranty on some products, so we confirm the warranty terms for each gadget in your quote.',
    },
    {
      q: 'Are tech gifts better than sweets or dry fruits for Diwali?',
      a: 'For teams that already get many food gifts, yes: tech gifts last longer and are used daily. If you prefer something traditional, see our <a href="/guides/diwali-dry-fruit-gift-boxes">Diwali dry fruit gift boxes</a>.',
    },
  ],
  quote: DIWALI_QUOTE,
  related: [LINKS.under1000, LINKS.under2000, LINKS.employees, LINKS.dryFruit, LINKS.hub, LINKS.planning],
  updated: '2026-09-27',
  published: '2026-09-27',
}
