export interface FaqItem {
  q: string
  a: string
}

// Shared between the rendered FAQ section and the FAQPage JSON-LD so the
// structured data always matches what's on the page.
export const DIWALI_FAQS: FaqItem[] = [
  {
    q: 'What are the best Diwali corporate gifts?',
    a: 'Curated hampers — sweets, dry fruits or gourmet combinations — are the most popular, followed by branded products and premium gift boxes for clients. Personalisation and festive packaging lift the impact.',
  },
  {
    q: 'When should we order Diwali corporate gifts?',
    a: 'Place bulk Diwali orders six to eight weeks before Diwali — for Diwali 2026 (early November), that means confirming by mid-September. Earlier means better choice, pricing and lead times.',
  },
  {
    q: 'What is a good budget for Diwali employee gifts?',
    a: 'Most companies spend ₹500–₹1,500 per employee on Diwali gifts; premium and client gifts run higher.',
  },
  {
    q: 'Can Diwali hampers be customised with our logo?',
    a: 'Yes — MintBox personalises hampers with branded packaging, festive cards and logo-printed items.',
  },
  {
    q: 'Do you deliver Diwali gifts across Bengaluru?',
    a: 'Yes — MintBox delivers across the city and can ship to a single office or to employees’ homes.',
  },
]

export const DIWALI_GUIDE = {
  url: 'https://themintbox.in/guides/diwali-corporate-gifts',
  title: 'Diwali Corporate Gifts 2026: The Complete Guide',
  metaTitle: 'Diwali Corporate Gifts 2026 — Ideas, Hampers & Bulk Ordering | MintBox',
  metaDescription:
    'A complete guide to Diwali corporate gifts — ideas for employees and clients, hampers, budgets, personalisation and bulk ordering timelines. By MintBox, Bangalore.',
}
