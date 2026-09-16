// Shared between the client page component and the server component that emits
// the FAQPage / CollectionPage JSON-LD, so the structured data can never drift
// from what is rendered on the page. Plain module (no 'use client') so the
// server component gets the real values rather than client references.

export const LAST_UPDATED = '2026-09-12'

export interface DiwaliFaq {
  q: string
  a: string
}

export const DIWALI_HUB_FAQS: DiwaliFaq[] = [
  {
    q: 'When is Diwali 2026 and when should we order corporate Diwali gifts?',
    a: 'Diwali 2026 falls on Sunday, 8 November. Orders confirmed by 24 October 2026 are guaranteed to be delivered before Diwali with full logo branding. Dispatch takes 7 to 10 working days after confirmation, so later orders are fulfilled from ready stock with limited branding.',
  },
  {
    q: 'What is the minimum order quantity for Diwali gift hampers?',
    a: 'The minimum order is 10 units per hamper. You can mix hampers from different tiers in a single order, for example a Team tier hamper for all staff and a Leadership tier hamper for clients, as long as each hamper meets the 10-unit minimum.',
  },
  {
    q: 'How much do corporate Diwali gift hampers cost?',
    a: 'MintBox Diwali hampers range from ₹434 to ₹2,170 per unit, exclusive of GST. Most companies spend ₹500 to ₹1,300 per employee and ₹1,300 to ₹2,200 per client. Every price on this page is the per-unit price at the minimum order; volume pricing for 100+ units is shared in your quote.',
  },
  {
    q: 'Can we add our company logo to the Diwali gift boxes?',
    a: 'Yes. Logo branding is available on the gift box or sleeve, on a printed insert card with your Diwali message, and on select items such as bottles, notebooks and mugs. Name personalisation for each recipient is available on request. Branding cost depends on quantity and print method and is confirmed in your quote.',
  },
  {
    q: 'Do you deliver Diwali gifts outside Bengaluru?',
    a: 'Yes. Hampers are assembled in Bengaluru and shipped across Karnataka and all of India. Share a city-wise breakdown or a list of employee home addresses and we coordinate dispatch so everything arrives before Diwali. Tracking details are shared on email and WhatsApp.',
  },
  {
    q: 'Are the dry fruits and sweets in the hampers safe and fresh?',
    a: 'All food items are sealed, FSSAI-compliant packs with shelf-life labelling. Dry fruits are packed in 50g to 200g jars or pouches, and chocolates are branded retail packs such as Ferrero Rocher and Hershey’s Kisses. Certificates are available on request.',
  },
  {
    q: 'Will we get a GST invoice for corporate Diwali gifts?',
    a: 'Yes. Every order comes with a GST invoice in your company’s name. Prices on this page are exclusive of GST; applicable GST is added on the invoice.',
  },
  {
    q: 'Can we see a sample before placing a bulk Diwali order?',
    a: 'Yes. Physical samples of shortlisted hampers can be arranged in Bengaluru, and a branding mockup is shared with every quote so you can see how your logo will look on the box before you confirm.',
  },
]
