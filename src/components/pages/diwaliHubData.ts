// Shared between the client page component and the server component that emits
// the metadata, FAQPage and CollectionPage JSON-LD, so the structured data can
// never drift from what is rendered on the page. Plain module (no 'use client')
// so the server component gets the real values rather than client references.
//
// Every price, count and tier range on /diwali-corporate-gifts is derived from
// the live product list via diwaliStats(). Never hard-code a price range in the
// page copy: the catalogue changes and hard-coded ranges went stale twice.

export const LAST_UPDATED = '2026-10-03'

// Deadline maths: Diwali is Sun 8 Nov, and most offices close for it after
// Fri 6 Nov. Orders confirmed by Sun 25 Oct (confirmed 2026-10-03) dispatch
// within 5 working days, i.e. by Fri 30 Oct, leaving 2-3 days of courier time
// outside Bengaluru and a buffer before the last working day.
export const DIWALI_DATE_LABEL = 'Sunday, 8 November 2026'
export const LAST_WORKING_DAY_LABEL = 'Friday, 6 November'
export const ORDER_BY = {
  short: '25 Oct',
  day: '25 October',
  long: 'Sunday, 25 October 2026',
}
export const DISPATCH_LABEL = 'within 5 working days'
export const COURIER_LABEL = '2 to 3 days'

export const MOQ = 10
export const GSTIN = '29ADHPN7960Q1ZH'
// MOQ is 10 for everything (confirmed 2026-10-03); a few CMS records still
// carry an older lower value, so never go below the policy minimum.
export const moqFor = (p: { moq?: number | null }) => Math.max(p.moq || 0, MOQ)

// Category that holds single products (candles, diyas, drinkware) rather than
// assembled hampers. Everything else on the page is a hamper or gift box.
export const SINGLE_GIFTS_CATEGORY_SLUG = 'diwali-2026-products'

export type TierKey = 'under500' | 'team' | 'manager' | 'leader' | 'client'

export interface Tier {
  key: TierKey
  /** Short chip label: the band boundaries */
  label: string
  title: string
  min: number
  max: number
  desc: string
  bestFor: string
  typical: string
}

// The five budget bands for this page (set by Anand 2026-10-03). Boundaries
// are inclusive of the lower bound: ₹1,000 sits in the ₹1,000–₹2,000 band.
export const TIERS: Tier[] = [
  {
    key: 'under500',
    label: 'Under ₹500',
    title: 'All-staff tier',
    min: 0,
    max: 499.99,
    desc: 'Diyas, candles, sweets and small dry-fruit boxes for gifting every person on the payroll.',
    bestFor: 'Every employee, interns, support and facility staff',
    typical: 'Diya sets, candles, dry-fruit and chocolate boxes',
  },
  {
    key: 'team',
    label: '₹500–₹1,000',
    title: 'Team tier',
    min: 500,
    max: 999.99,
    desc: 'Dry-fruit hampers, eco desk sets and bottle-and-mug combos. Generous and useful, no filler.',
    bestFor: 'Whole teams, 50 to 500 units',
    typical: 'Dry-fruit combos, eco desk sets, bottle + mug hampers',
  },
  {
    key: 'manager',
    label: '₹1,000–₹2,000',
    title: 'Manager tier',
    min: 1000,
    max: 1999.99,
    desc: 'Copper and bamboo drinkware with dry fruits, lamps or chocolates, in printed rigid boxes.',
    bestFor: 'Managers, top performers, long-standing vendors',
    typical: 'Copper or bamboo drinkware with dry fruits and a lamp',
  },
  {
    key: 'leader',
    label: '₹2,000–₹3,500',
    title: 'Leadership tier',
    min: 2000,
    max: 3499.99,
    desc: 'Premium copper sets, tech hampers and executive combos for senior people and key partners.',
    bestFor: 'Senior leadership, key partners',
    typical: 'Copper bottle sets, tech hampers, executive combos',
  },
  {
    key: 'client',
    label: '₹3,500 & above',
    title: 'Client & CXO tier',
    min: 3500,
    max: Number.POSITIVE_INFINITY,
    desc: 'Large luxury hampers and statement gift boxes for the relationships you cannot get wrong.',
    bestFor: 'Top clients, board members, CXOs',
    typical: 'Large luxury hampers, premium gourmet and décor boxes',
  },
]

export function tierFor(price: number): Tier {
  return TIERS.find(t => price >= t.min && price <= t.max) ?? TIERS[TIERS.length - 1]
}

export const formatPrice = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`
export const formatRange = (low: number, high: number) =>
  low === high ? formatPrice(low) : `${formatPrice(low)}–${formatPrice(high)}`
/** Tier ranges are shown in whole hundreds, widened so every product fits: ₹280–₹497 → ₹200–₹500. */
export const formatTierRange = (low: number, high: number) => {
  const lo = Math.floor(low / 100) * 100
  return formatRange(lo, Math.max(Math.ceil(high / 100) * 100, lo + 100))
}

interface PricedProduct {
  price: number | string
  category?: { slug?: string | null } | string | null
}

export interface TierStat {
  tier: Tier
  count: number
  low: number
  high: number
  /** Actual price span of the products in this tier, e.g. "₹1,204–₹1,795" */
  range: string
}

export interface DiwaliStats {
  total: number
  hampers: number
  singles: number
  min: number
  max: number
  hamperMin: number
  hamperMax: number
  addOnMin: number
  addOnMax: number
  tiers: TierStat[]
}

export const isAddOn = (p: PricedProduct) =>
  typeof p.category === 'object' && p.category?.slug === SINGLE_GIFTS_CATEGORY_SLUG

export function diwaliStats(products: PricedProduct[]): DiwaliStats {
  const priced = products.map(p => ({ p, price: Number(p.price) })).filter(x => Number.isFinite(x.price))
  const prices = priced.map(x => x.price)
  const hamperPrices = priced.filter(x => !isAddOn(x.p)).map(x => x.price)
  const addOnPrices = priced.filter(x => isAddOn(x.p)).map(x => x.price)
  const lo = (xs: number[]) => (xs.length ? Math.min(...xs) : 0)
  const hi = (xs: number[]) => (xs.length ? Math.max(...xs) : 0)

  // Budget tiers hold hampers & gift boxes only; single products are listed
  // separately as add-ons.
  const tiers = TIERS.map(tier => {
    const inTier = hamperPrices.filter(n => tierFor(n).key === tier.key)
    const low = lo(inTier)
    const high = hi(inTier)
    return { tier, count: inTier.length, low, high, range: inTier.length ? formatTierRange(low, high) : tier.label }
  })

  return {
    total: priced.length,
    hampers: hamperPrices.length,
    singles: addOnPrices.length,
    min: lo(prices),
    max: hi(prices),
    hamperMin: lo(hamperPrices),
    hamperMax: hi(hamperPrices),
    addOnMin: lo(addOnPrices),
    addOnMax: hi(addOnPrices),
    tiers,
  }
}

/** "192 hampers & gift boxes and 90 add-on gifts" (drops an empty half). */
export function catalogueLabel(s: DiwaliStats): string {
  const h = `${s.hampers} hamper${s.hampers === 1 ? '' : 's'} & gift boxes`
  const g = `${s.singles} add-on gift${s.singles === 1 ? '' : 's'}`
  if (!s.singles) return h
  if (!s.hampers) return g
  return `${h} and ${g}`
}

export interface DiwaliFaq {
  q: string
  a: string
}

// Confirmed procurement facts (Terms of Service, May 2026). Kept here so the
// page section and FAQ say the same thing.
export const PAYMENT_TERMS = '50% advance on order confirmation, 50% before dispatch against the final invoice and pre-dispatch QC photos. Bank transfer (NEFT/RTGS), UPI or card. Net terms can be agreed in writing for enterprises with a PO process.'
export const DAMAGE_POLICY = 'Every batch is inspected before dispatch. If any unit arrives damaged, defective or different from the approved mockup, send photos within 7 days of delivery and we replace those units or refund their cost.'
export const QUOTE_VALIDITY = 'Quotes are valid for 14 days. The number we quote, including branding and delivery, is the number on your invoice.'

export function getDiwaliHubFaqs(s: DiwaliStats): DiwaliFaq[] {
  const tierLines = s.tiers
    .filter(t => t.count > 0)
    .map(t => `${t.tier.label} (${t.count})`)
    .join(', ')
  return [
    {
      q: 'When is Diwali 2026 and when should we order corporate Diwali gifts?',
      a: `Diwali 2026 falls on ${DIWALI_DATE_LABEL}, and most offices have their last working day on ${LAST_WORKING_DAY_LABEL}. Confirm by ${ORDER_BY.long} for guaranteed delivery anywhere in India with full logo branding: Diwali orders dispatch ${DISPATCH_LABEL} of confirmation, plus ${COURIER_LABEL} of courier time outside Bengaluru. After that, Bengaluru orders can still be fulfilled from ready stock.`,
    },
    {
      q: 'What is the minimum order quantity for Diwali gift hampers?',
      a: `The minimum order is ${MOQ} units per item. You can mix items from different budget tiers in one order, for example an All-staff tier gift for everyone and a Client tier hamper for key accounts, as long as each item meets the ${MOQ}-unit minimum.`,
    },
    {
      q: 'How much do corporate Diwali gift hampers cost?',
      a: `Our ${s.hampers} Diwali hampers and gift boxes cost ${formatRange(s.hamperMin, s.hamperMax)} per unit, exclusive of GST. By budget band: ${tierLines}. ${s.singles} add-on gifts such as diyas, candles and drinkware cost ${formatRange(s.addOnMin, s.addOnMax)} and can be added to any order. Prices shown are per unit at the ${MOQ}-unit minimum; larger quantities are priced lower in your quote.`,
    },
    {
      q: 'Can we add our company logo to the Diwali gift boxes?',
      a: 'Yes. Logo branding is available on the gift box or sleeve, on a printed insert card with your Diwali message, and on select items such as bottles, notebooks and mugs. You approve a digital mockup before production. Branding cost depends on quantity and print method and is itemised in your quote.',
    },
    {
      q: 'Do you deliver Diwali gifts outside Bengaluru?',
      a: `Yes. Gifts are assembled in Bengaluru and shipped across India. Share a city-wise breakdown or a list of employee home addresses and we dispatch to each, with tracking on email and WhatsApp. For delivery outside Bengaluru before ${LAST_WORKING_DAY_LABEL}, confirm by ${ORDER_BY.day}. Delivery charges are quoted upfront per address or per consignment.`,
    },
    {
      q: 'What are the payment terms?',
      a: PAYMENT_TERMS,
    },
    {
      q: 'What happens if a hamper arrives damaged?',
      a: DAMAGE_POLICY,
    },
    {
      q: 'Are the dry fruits and sweets in the hampers safe and fresh?',
      a: 'All food items are sealed, FSSAI-compliant packs with shelf-life labelling. Dry fruits are packed in 50g to 200g jars or pouches, and chocolates are branded retail packs such as Ferrero Rocher and Hershey’s Kisses. Certificates are available on request.',
    },
    {
      q: 'Will we get a GST invoice for corporate Diwali gifts?',
      a: `Yes. Every order comes with a GST invoice in your company’s name from MintBox (GSTIN ${GSTIN}), so you can claim input tax credit where eligible. Prices on this page are exclusive of GST; applicable GST is added on the invoice.`,
    },
    {
      q: 'Can we see a sample before placing a bulk Diwali order?',
      a: 'Yes. Physical samples of shortlisted hampers can be arranged in Bengaluru, and a branding mockup is shared with every quote so you can see how your logo will look on the box before you confirm.',
    },
  ]
}
