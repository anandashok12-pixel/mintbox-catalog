'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { GoogleReviews } from '@/components/GoogleReviews'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import ContentProductShowcase from '@/components/content/ContentProductShowcase'
import FAQSection from '@/components/content/FAQSection'
import InlineQuoteForm from '@/components/content/InlineQuoteForm'
import QuickAnswerBox from '@/components/content/QuickAnswerBox'
import EATSignal from '@/components/content/EATSignal'
import LastUpdatedDate from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'
import { MIN_ORDER_UNITS, QUOTE_TIME } from '@/lib/businessFacts'

const PAGE_UPDATED = '2026-09-29'

interface Category {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

interface Product {
  id: string
  name: string
  price: number
  emoji?: string | null
  image?: { url?: string | null; sizes?: { card?: { url?: string | null } } } | null
  description: string
  features?: Array<{ feature: string; id?: string }> | null
  moq?: number | null
  customisable?: boolean | null
  inStock?: boolean | null
  category: Category | string
}

interface Props {
  products: Product[]
  categories: Category[]
}

const RECIPIENTS = [
  {
    title: 'Your Team',
    budget: '₹500 - ₹1,500 per head',
    desc: 'Employees value a festive gift that feels considered but not extravagant - something they can eat, use or display at home, packaged well enough to feel genuinely special. The goal is collective warmth, not individual luxury: a hamper that feels too premium can create awkwardness on the floor, one that feels too generic signals no thought went into it.',
  },
  {
    title: 'Clients & Partners',
    budget: '₹1,500 - ₹2,500 (regular) · ₹2,500 - ₹5,000 (key accounts)',
    desc: "A client-facing hamper carries your brand into someone else's office or home, so the standard shifts toward presentation quality, product sourcing and personalisation. For key accounts and long-term partners, the hamper becomes a relationship investment rather than a seasonal gesture.",
  },
  {
    title: 'VIP & Leadership',
    budget: 'Bespoke - no fixed ceiling',
    desc: 'Whether it is a founder gifting board members or a sales head acknowledging a handful of anchor clients, the hamper functions as a relationship statement. Product quality, packaging and personalisation all need to match the weight of that relationship - no generic boxes.',
  },
]

const TIERS = [
  {
    name: 'Budget Tier',
    price: '₹500 - ₹1,000',
    fit: 'Best for: large employee batches, extended workforce',
    contents: 'A small pouch of premium dry fruits, one box of artisan sweets or chocolates, a festive diya set, and branded packaging with a printed note card.',
    note: 'The packaging quality and the note card do most of the work on brand impression at this price - a rigid kraft box with your logo and a warm, signed message transforms a modest hamper into something people remember.',
  },
  {
    name: 'Mid-Range Tier',
    price: '₹1,000 - ₹2,500',
    fit: 'Best for: company-wide employee gifting, regular client outreach',
    contents: 'A curated pack of dry fruits and nuts, gourmet snacks or premium chocolates, a branded tumbler or ceramic mug, a candle or aromatic set, and a personalised message card - all packed in a rigid gift box.',
    note: 'This configuration scales most cleanly across large orders because the product mix is universally appropriate and the branding surface is generous. It is where most mid-sized and large Indian companies land for bulk Diwali orders.',
  },
  {
    name: 'Premium Tier',
    price: '₹2,500 - ₹5,000+',
    fit: 'Best for: key accounts, leadership recognition, high-stakes relationships',
    contents: 'A gourmet assortment of imported chocolates or specialty coffee and tea, a branded copper or ceramic drinkware piece, a home décor or fragrance set, and premium kraft or wooden crate packaging.',
    note: 'Every element communicates considered curation, and the unboxing experience itself becomes part of the gift.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What budget should I set for Diwali hampers - employees vs clients?',
    a: 'Employees typically sit at ₹500-1,500 per head for company-wide gifting. Regular clients move to ₹1,500-2,500, and key accounts or long-term partners to ₹2,500-5,000. VIP and leadership gifts are usually bespoke with no fixed ceiling. See our <a href="/guides/diwali-gifts-for-clients">Diwali gifts for clients</a> guide for client-specific ideas beyond hampers.',
  },
  {
    q: 'What goes inside a budget, mid-range and premium Diwali hamper?',
    a: 'Budget (₹500-1,000): a dry fruit pouch, a sweets or chocolate box, a diya set and branded packaging. Mid-range (₹1,000-2,500): dry fruits and nuts, gourmet snacks or chocolates, a branded tumbler or mug, a candle set and a personalised card. Premium (₹2,500-5,000+): imported chocolates or specialty coffee/tea, branded copper or ceramic drinkware, a home décor or fragrance set, and wooden crate packaging.',
  },
  {
    q: 'What is trending in corporate Diwali hampers for 2026?',
    a: 'A shift toward items with a life beyond the festival: reusable drinkware, desk plants, sustainable stationery, wellness kits with herbal teas or scented candles, and experiential vouchers. On packaging, kraft boxes, jute bags and bamboo trays are increasingly the default rather than a premium upgrade.',
  },
  {
    q: 'What is the minimum order quantity for corporate Diwali hampers?',
    a: `Many Indian gifting suppliers set MOQs of 25 to 50 units for customised hampers - always confirm the exact number with your vendor. MintBox works with orders from ${MIN_ORDER_UNITS} units, so smaller employee batches or a client-only run don't need to hit a higher threshold.`,
  },
  {
    q: 'When should I place my bulk Diwali hamper order for 2026?',
    a: 'Branded hamper orders should be placed at least three to four weeks before Diwali; orders above 500 units or with fully custom packaging need five to six weeks. For Diwali 2026, aim to lock your order by October 15 - after that, customisation options and delivery reliability both narrow.',
  },
  {
    q: 'Are corporate Diwali hampers to employees and clients tax-exempt?',
    a: 'For employees, non-cash gifts are exempt as a perquisite under Rule 3(7)(iv) only up to ₹5,000 in aggregate per employee per financial year - beyond that the full value becomes taxable, not just the excess. For GST, input tax credit on gifts is blocked under Section 17(5)(h) for both employee and client gifts. See our <a href="/guides/gst-on-corporate-gifts">GST on corporate gifts</a> guide for the full breakdown. This is general information, not tax advice - confirm with your finance team or a qualified adviser.',
  },
]

export default function DiwaliHampersRecipientClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://themintbox.in' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://themintbox.in/guides' },
          { '@type': 'ListItem', position: 3, name: 'Diwali Hampers for Employees vs Clients', item: 'https://themintbox.in/guides/diwali-hampers-for-employees-vs-clients' },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Diwali Hampers for Employees vs Clients: Budgets & Tiers (2026)',
        description: 'How to budget and build corporate Diwali hampers by recipient - employees, regular clients, and VIP/leadership.',
        url: 'https://themintbox.in/guides/diwali-hampers-for-employees-vs-clients',
        dateModified: `${PAGE_UPDATED}T00:00:00+05:30`,
        author: { '@type': 'Organization', name: 'MintBox', url: 'https://themintbox.in' },
        publisher: { '@type': 'Organization', name: 'MintBox', url: 'https://themintbox.in' },
      }) }} />
      <Navbar />
      <main id="main">

      {/* 1. HERO */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner">
          <div>
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="cp-breadcrumb-sep">›</span>
              <a href="/guides">Guides</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Hampers by Recipient</span>
            </nav>
            <div className="cp-hero-eyebrow">Diwali 2026 · Recipient Planning</div>
            <h1 className="cp-hero-title">
              Diwali Hampers for Employees<br />
              <em>vs Clients: Budgets &amp; Tiers</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The first decision in any corporate Diwali brief isn&apos;t the budget - it&apos;s the
              recipient. A single hamper tier for everyone falls flat at both ends. Here&apos;s how to
              match the right tier to employees, clients and VIP relationships, then lock the
              order before capacity runs out.
            </p>
            <div className="cp-hero-ctas">
              <a href="#tiers" className="cp-hero-cta-primary">See the 3 Tiers ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 3 recipient segments</span>
              <span className="cp-hero-badge">✓ 3 hamper tiers</span>
              <span className="cp-hero-badge">✓ Order by Oct 15, 2026</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80" alt="Festive Diwali hamper boxes for employees and clients" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Corporate Diwali gift hampers packed in festive baskets" className="cp-hero-img-actual" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AEO BAND */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content="Budget Diwali hampers for employees at ₹500-1,500 per head, regular clients at ₹1,500-2,500, key accounts at ₹2,500-5,000, and treat VIP or leadership gifts as bespoke. Map those budgets to three hamper tiers - budget (₹500-1,000), mid-range (₹1,000-2,500) and premium (₹2,500-5,000+) - and lock your bulk order by October 15, 2026 to protect branding options and delivery timelines."
          />
          <EATSignal
            credentials={[
              '200+ corporate clients across India',
              '50,000+ gifts delivered since 2019',
              'Hampers built across all three recipient tiers in one order',
              `MOQ ${MIN_ORDER_UNITS} units, quotes within ${QUOTE_TIME}`,
              'GST-compliant invoicing for all orders',
            ]}
          />
        </div>
      </div>

      {/* 3. RECIPIENT SEGMENTS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Start With the Recipient</div>
          <h2 className="cp-section-title">Who Is Receiving the Hamper?</h2>
          <p className="cp-section-sub">
            The expectation, the appropriate spend and the product mix all differ depending on
            whether you are gifting an employee, a regular client, or a strategic partner.
            Getting this right means the hamper lands with meaning rather than obligation.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {RECIPIENTS.map((r) => (
              <div key={r.title} className="cp-card">
                <div className="cp-card-title">{r.title}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold, #B8972E)', margin: '4px 0 10px' }}>{r.budget}</div>
                <p className="cp-card-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 3 HAMPER TIERS */}
      <section id="tiers" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Brief</div>
          <h2 className="cp-section-title">Three Corporate Diwali Hamper Tiers</h2>
          <p className="cp-section-sub">
            Once you know who you are gifting, translating that into a concrete brief is
            straightforward - here are three configurations to take directly to a supplier.
          </p>
          <div className="cp-steps">
            {TIERS.map((tier, i) => (
              <div key={tier.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {tier.name}
                    <span style={{ marginLeft: '12px', fontSize: '0.85em', fontWeight: 400, color: 'var(--forest-green, #1B4D3E)', opacity: 0.75 }}>
                      {tier.price}
                    </span>
                  </div>
                  <div className="cp-step-desc" style={{ fontWeight: 600 }}>{tier.fit}</div>
                  <div className="cp-step-desc" style={{ marginTop: '4px' }}>
                    <strong>Inside:</strong> {tier.contents}
                  </div>
                  <div className="cp-step-desc" style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.8 }}>
                    {tier.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRANDING, PERSONALISATION, COMPLIANCE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container cp-two-col">
          <div>
            <div className="cp-section-eyebrow">Branding</div>
            <h2 className="cp-section-title">Putting Your Brand on the Box</h2>
            <p className="cp-section-sub">
              Standard branding options include your logo on the outer box, a branded ribbon, a
              custom note card, and tissue paper in your brand colours. Restraint works better
              than coverage - a clean logo on a quality box reads as confident, while a logo on
              every surface reads as promotional. The goal is brand recall, not an advertisement.
            </p>
          </div>
          <div>
            <div className="cp-section-eyebrow">Compliance</div>
            <h2 className="cp-section-title">Staying Compliant</h2>
            <p className="cp-section-sub">
              Non-cash employee gifts are exempt as a perquisite only up to ₹5,000 in aggregate
              per employee per financial year under Rule 3(7)(iv); beyond that, the full value is
              taxable, not just the excess. Input tax credit on gifts is separately blocked under
              GST Section 17(5)(h) for both employee and client gifts. See our{' '}
              <a href="/guides/gst-on-corporate-gifts">GST on corporate gifts</a> guide for the
              full picture - this is general information, not tax advice.
            </p>
          </div>
        </div>
      </section>

      {/* 6. LEAD TIMES & DELIVERY */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Logistics</div>
          <h2 className="cp-section-title">Lead Times, MOQs and Pan-India Delivery</h2>
          <p className="cp-section-sub">
            Branded hamper orders need at least three to four weeks before Diwali; orders above
            500 units or requiring fully custom packaging need five to six weeks. For Diwali
            2026, lock your order no later than October 15 - orders placed after that face
            narrowing branding options and delivery reliability. Many vendors offer same-day or
            next-day delivery in metros like Bengaluru, Mumbai, Delhi, Hyderabad and Chennai;
            Tier 2 and Tier 3 cities commonly take two to seven business days after dispatch, so
            build in buffer for multi-city orders.
          </p>
          <div className="cp-cards-grid cp-cards-grid--2">
            <div className="cp-card">
              <div className="cp-card-title">Brief Your Supplier With</div>
              <p className="cp-card-desc">Total quantity, budget per unit, recipient type, branding specifications (logo file, colours, message), and a complete list of delivery destinations - a complete brief cuts revision cycles and protects your timeline.</p>
            </div>
            <div className="cp-card">
              <div className="cp-card-title">2026 Trend Watch</div>
              <p className="cp-card-desc">Reusable drinkware, desk plants, sustainable stationery, wellness kits and experiential vouchers are appearing consistently in employee-focused briefs this year, alongside kraft, jute and bamboo packaging as the new default.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Build Your Hamper</div>
          <h2 className="cp-section-title">Browse Products by Tier</h2>
          <p className="cp-section-sub">
            Mix and match from the MintBox catalog to build a hamper at your exact budget, for
            any of the three recipient tiers above.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Diwali Hamper Products"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80" alt="Assembled corporate Diwali gift hampers for employees and clients, ready for bulk dispatch" loading="lazy" />
      </figure>

      {/* 8. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">&ldquo;</span>
          <p className="cp-quote-text">
            A Diwali hamper is opened in front of the whole family, or read as a signal in a
            client&apos;s office. Match the tier to the relationship, and the same festive gesture can
            carry two very different messages - both intentional.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 9. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Diwali 2026</div>
            <h2 className="cp-cta-title">Brief Us on Your<br />Recipient Mix</h2>
            <p className="cp-cta-sub">
              Tell us your employee, client and VIP counts with a budget per tier - we&apos;ll send a
              detailed quote within {QUOTE_TIME}. Production slots close October 15.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Diwali Hamper Quote"
              ctaLabel="Get Diwali Quote"
              defaultOccasion="diwali"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="samples" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Diwali Hampers for Employees vs Clients - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Diwali Hub', title: 'Diwali Corporate Gifts Guide', href: '/guides/diwali-corporate-gifts' },
              { label: 'Ranked List', title: 'Top 12 Corporate Diwali Gift Hampers', href: '/guides/corporate-diwali-gift-hampers' },
              { label: 'Employees', title: 'Diwali Gifts for Employees, by Budget', href: '/guides/diwali-gifts-for-employees-by-budget' },
              { label: 'Clients', title: 'Diwali Gifts for Clients', href: '/guides/diwali-gifts-for-clients' },
              { label: 'Collection', title: 'Gift Hampers Collection', href: '/collections/hampers' },
              { label: 'Tax', title: 'GST on Corporate Gifts', href: '/guides/gst-on-corporate-gifts' },
            ].map((link) => (
              <a key={link.href} href={link.href} className="cp-related-card">
                <div className="cp-related-card-label">{link.label}</div>
                <div className="cp-related-card-title">{link.title}</div>
                <div className="cp-related-card-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="cp-container--narrow" style={{ padding: '0 24px' }}>
        <LastUpdatedDate date={PAGE_UPDATED} />
      </div>

      <GoogleReviews theme="light" initialCount={3} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
