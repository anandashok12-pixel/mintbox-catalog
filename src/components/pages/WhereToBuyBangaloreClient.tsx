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
import LastUpdatedDate, { formatMonthYear } from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'
import { QUOTE_TIME } from '@/lib/businessFacts'

const PAGE_UPDATED = '2026-07-03'

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

const OPTIONS = [
  {
    rank: "1",
    name: "MintBox (online, serves all of Bangalore)",
    desc: "Order from a curated 200-product catalog online, get a quote within 24 hours, and receive branded gifts anywhere in Bangalore - same-day for in-stock items. MOQ 10 units with GST invoicing.",
    suits: "Suits HR and admin teams who want bulk pricing, branding, and an invoice without spending a day in traffic between markets.",
  },
  {
    rank: "2",
    name: "OffiNeeds (online, enterprise scale)",
    desc: "Known for one of the largest corporate gifting catalogs in Bangalore, spanning merchandise, office supplies, and gifting under one account.",
    suits: "Suits large enterprises running multi-thousand-unit programmes that want maximum SKU breadth.",
  },
  {
    rank: "3",
    name: "Chickpet & Avenue Road wholesale lanes",
    desc: "Bangalore's old wholesale heart - lane after lane of bags, stationery, festive items, and general merchandise at trade prices. Cash-friendly, negotiation expected, quality varies stall to stall.",
    suits: "Suits buyers with time to hunt, comfort with negotiation, and no need for branding or GST paperwork. Go on a weekday morning; weekends are impassable.",
  },
  {
    rank: "4",
    name: "SP Road (tech & electronics accessories)",
    desc: "The city's electronics wholesale strip - power banks, earphones, cables, gadgets, and computer accessories at some of the lowest street prices in South India. Warranty support varies by shop.",
    suits: "Suits tech-accessory gifting on a tight budget, if you can verify quality per batch yourself. For bulk branded tech, an online supplier who handles warranty is safer.",
  },
  {
    rank: "5",
    name: "Commercial Street (boutique finds)",
    desc: "Retail rather than wholesale, but strong for boutique and premium finds - accessories, home decor, and specialty stores useful for small-batch leadership gifts.",
    suits: "Suits small quantities of higher-touch gifts (5-20 units) where uniqueness beats bulk pricing.",
  },
  {
    rank: "6",
    name: "Koramangala (startup belt, same-day B2B delivery)",
    desc: "Bangalore's startup district is better served by delivery than by shopping - most online suppliers, MintBox included, treat Koramangala as a priority same-day zone.",
    suits: "Suits startups that decided at 10 am they need welcome kits by 5 pm. Keep an approved gift shortlist ready and same-day is realistic for in-stock items.",
  },
  {
    rank: "7",
    name: "HSR Layout (same-day B2B delivery)",
    desc: "Dense with startups and small offices, HSR sits comfortably inside every major supplier's same-day radius. No gifting market of its own worth a trip.",
    suits: "Suits smaller teams ordering 25-100 units online with same-day or next-day delivery expectations.",
  },
  {
    rank: "8",
    name: "Whitefield / ITPL (plan delivery windows)",
    desc: "The eastern tech corridor is well covered by suppliers, but distance means same-day orders should be placed before noon. Tech-park security gates add receiving time - name a receiving contact.",
    suits: "Suits large tech-park offices; brief your vendor on gate-pass procedures and loading-bay timings to avoid a truck idling at security.",
  },
  {
    rank: "9",
    name: "Electronic City (order a day ahead)",
    desc: "Far enough south that same-day is possible but tight - next-day delivery is the reliable default. Campus deliveries to large IT companies work best against a PO with a named receiver.",
    suits: "Suits big-campus buyers who plan a day ahead; bulk drops beat desk-by-desk distribution here.",
  },
  {
    rank: "10",
    name: "Indiranagar (boutique retail + fast delivery)",
    desc: "The 100 Feet Road stretch has design-led boutiques for one-off premium gifts, and the area is a fast same-day delivery zone for online bulk orders.",
    suits: "Suits mixed needs - walk the boutiques for 10 CXO gifts, order the 200-unit team batch online the same afternoon.",
  },
  {
    rank: "11",
    name: "MG Road / CBD (corporate core)",
    desc: "The central business district gets the fastest delivery coverage in the city, and nearby Brigade Road retail can cover emergency one-off purchases.",
    suits: "Suits corporate offices, banks, and consultancies in the CBD - practically every supplier delivers here same-day.",
  },
  {
    rank: "12",
    name: "Hebbal / Manyata (north Bangalore, book morning slots)",
    desc: "Manyata Tech Park's scale means suppliers service it daily, but north Bangalore traffic makes afternoon same-day promises fragile. Morning delivery slots are dependable.",
    suits: "Suits Manyata-based teams; place orders the previous evening and take the morning delivery window.",
  },
]

const COMPARISON = [
  {
    title: "Bulk invoicing & GST",
    desc: "Online suppliers issue GST-compliant invoices as standard - essential if your company claims the expense. Wholesale market purchases are often cash bills or kacha receipts, which finance teams reject. For anything above petty-cash scale, this alone decides the channel.",
  },
  {
    title: "Branding & customisation",
    desc: "Market stalls sell what is on the shelf; logo printing means finding a separate printer and coordinating both. Online suppliers like MintBox brand in-house - one vendor, one accountability chain, one delivery.",
  },
  {
    title: "Returns & replacements",
    desc: "A wholesale purchase is final the moment you drive away. Established suppliers replace damaged or misprinted units - ask for the replacement policy in writing before the bulk run.",
  },
  {
    title: "Real cost, not sticker price",
    desc: "Markets win on sticker price, but add a day of your time, transport, printing coordination, and rejection risk, and the gap narrows fast. Below roughly 50 units, the market trip rarely pays for itself.",
  },
]

const FAQ_ITEMS = [
  {
    q: "Where can I buy corporate gifts in Bangalore?",
    a: "You have three channels: online B2B suppliers (MintBox, OffiNeeds) that handle bulk pricing, branding, GST invoicing, and delivery; wholesale markets (Chickpet, Avenue Road, SP Road for electronics) for unbranded goods at trade prices; and retail streets (Commercial Street, Indiranagar) for small-batch premium finds. Most companies use online suppliers for bulk orders and retail for one-off leadership gifts.",
  },
  {
    q: "Which market is cheapest for corporate gifts in Bangalore?",
    a: "Chickpet and Avenue Road offer the lowest unit prices for general merchandise, and SP Road for electronics accessories - but prices assume negotiation, cash payment, and no branding or returns. Once you add logo printing, transport, and your own time, online bulk suppliers are usually comparable above 50 units, with GST invoices included.",
  },
  {
    q: "Do corporate gift suppliers deliver to Whitefield and Electronic City?",
    a: "Yes - all major Bangalore suppliers cover both corridors. Practical tips: place Whitefield same-day orders before noon, treat next-day as the default for Electronic City, and give your vendor a named receiving contact for tech-park gate passes. See our <a href=\"/bangalore-corporate-gifting/same-day-delivery\">same-day delivery guide</a> for zone-wise timelines.",
  },
  {
    q: "Can I get corporate gifts the same day in Bangalore?",
    a: "Yes, for in-stock catalog items. MintBox delivers same-day within Bangalore on unbranded or pre-branded stock; customised orders need 3-5 business days, or 48 hours on express. Central zones (MG Road, Koramangala, Indiranagar) have the most reliable same-day windows.",
  },
  {
    q: "Does MintBox cover all of Bangalore?",
    a: "Yes - we deliver across Bangalore including Whitefield, Electronic City, Hebbal, and Sarjapur, with same-day options on in-stock items and scheduled slots for tech parks. Orders start at 10 units with GST invoicing, and we also courier pan-India for teams outside the city.",
  },
]

export default function WhereToBuyBangaloreClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Bangalore Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting" },
          { "@type": "ListItem", "position": 3, "name": "Where to Buy", "item": "https://themintbox.in/bangalore-corporate-gifting/where-to-buy" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Where to Buy Corporate Gifts in Bangalore: 12 Best Options by Area (2026)",
        "description": "Where to buy corporate gifts in Bangalore: 12 best options by area - online suppliers, wholesale markets like Chickpet and SP Road, and same-day B2B delivery.",
        "url": "https://themintbox.in/bangalore-corporate-gifting/where-to-buy",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Where to Buy Corporate Gifts in Bangalore: 12 Best Options by Area",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "MintBox (online, all Bangalore)" },
          { "@type": "ListItem", "position": 2, "name": "OffiNeeds (online, enterprise scale)" },
          { "@type": "ListItem", "position": 3, "name": "Chickpet & Avenue Road wholesale lanes" },
          { "@type": "ListItem", "position": 4, "name": "SP Road (tech & electronics accessories)" },
          { "@type": "ListItem", "position": 5, "name": "Commercial Street (boutique finds)" },
          { "@type": "ListItem", "position": 6, "name": "Koramangala (same-day B2B delivery)" },
          { "@type": "ListItem", "position": 7, "name": "HSR Layout (same-day B2B delivery)" },
          { "@type": "ListItem", "position": 8, "name": "Whitefield / ITPL" },
          { "@type": "ListItem", "position": 9, "name": "Electronic City" },
          { "@type": "ListItem", "position": 10, "name": "Indiranagar (boutique retail + fast delivery)" },
          { "@type": "ListItem", "position": 11, "name": "MG Road / CBD (corporate core)" },
          { "@type": "ListItem", "position": 12, "name": "Hebbal / Manyata" }
        ]
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
              <a href="/bangalore-corporate-gifting">Bangalore Corporate Gifting</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Where to Buy</span>
            </nav>
            <div className="cp-hero-eyebrow">Buyer's Guide · By Area · 2026</div>
            <h1 className="cp-hero-title">
              Where to Buy Corporate Gifts in Bangalore<br />
              <em>12 Best Options by Area (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Searching "corporate gifts near me" in Bangalore returns noise. This is the real
              map: online suppliers, wholesale markets like Chickpet and SP Road, boutique streets,
              and how same-day B2B delivery actually works in each business district.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 12 Options ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Markets &amp; online compared</span>
              <span className="cp-hero-badge">✓ Area-wise delivery notes</span>
              <span className="cp-hero-badge">✓ Same-day options covered</span>
              <span className="cp-hero-badge">✓ Updated {formatMonthYear(PAGE_UPDATED)}</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80" alt="Corporate gifts ready to buy in Bangalore" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" alt="Bangalore office receiving a corporate gift delivery" className="cp-hero-img-actual" loading="lazy" />
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
            content="To buy corporate gifts in Bangalore, use online B2B suppliers for bulk branded orders with GST invoices; Chickpet and Avenue Road for wholesale unbranded goods; SP Road for budget electronics; and Commercial Street or Indiranagar for boutique small-batch gifts. Online suppliers such as MintBox deliver same-day across Bangalore on in-stock items."
          />
          <EATSignal
            credentials={[
              "200+ Bangalore and pan-India corporate clients",
              "50,000+ gifts delivered since 2019",
              "Same-day delivery across Bangalore on in-stock items",
              "In-house branding, engraving, and personalisation",
              "GST-compliant invoicing on every order",
            ]}
          />
        </div>
      </div>

      {/* 3. STATS BAND */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">Corporate Clients</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-label">Gifts Delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">6+</div>
              <div className="cp-stat-label">Years in Bangalore</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">Same-Day</div>
              <div className="cp-stat-label">Bangalore Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The 12 Options</div>
          <h2 className="cp-section-title">Where to Buy Corporate Gifts in Bangalore, Option by Option</h2>
          <p className="cp-section-sub">
            An honest buyer's guide by area and channel - what each option is genuinely good for,
            who it suits, and what delivery looks like. Not a fake directory; no invented shop
            addresses.
          </p>
          <div className="cp-steps">
            {OPTIONS.map((o) => (
              <div key={o.rank} className="cp-step">
                <div className="cp-step-num">{o.rank}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{o.name}</div>
                  <div className="cp-step-desc">{o.desc}</div>
                  <div className="cp-step-desc" style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.85 }}>
                    {o.suits}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ONLINE VS MARKET */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Real Trade-Off</div>
          <h2 className="cp-section-title">Online Supplier vs Local Market: What Actually Differs</h2>
          <p className="cp-section-sub">
            The market wins on sticker price; the supplier wins on everything that happens after
            payment. Four differences that decide it - and if your order is 100+ units, read our{' '}
            <a href="/bangalore-corporate-gifting/bulk-gifting">bulk gifting guide</a> before
            choosing either channel.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {COMPARISON.map((item) => (
              <div key={item.title} className="cp-card">
                <div className="cp-card-title">{item.title}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Skip the Traffic</div>
          <h2 className="cp-section-title">Buy Corporate Gifts Online, Delivered Across Bangalore</h2>
          <p className="cp-section-sub">
            Everything below ships anywhere in Bangalore - same-day for in-stock items - with
            branding and GST invoicing handled for you.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts in Bangalore"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Corporate gift packages out for delivery to Bangalore offices" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            We have watched buyers spend a full day between Chickpet and a printing shop to save
            two thousand rupees on a 40-unit order. The market has its place - but for branded
            bulk gifting, your time is the most expensive item in the cart.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>One Vendor, Done</div>
            <h2 className="cp-cta-title">Get It Delivered<br />Anywhere in Bangalore</h2>
            <p className="cp-cta-sub">
              Tell us what you need, how many, and where in Bangalore it is going - we quote within
              {QUOTE_TIME} and handle branding, packing, and delivery to your office gate.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Bangalore Delivery Quote"
              ctaLabel="Request My Quote"
              defaultOccasion="corporate_event"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="whatsapp" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Buying Corporate Gifts in Bangalore - FAQs"
          />
        </div>
      </section>

      {/* 10. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Local Hub', title: 'Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' },
              { label: 'Top Vendors', title: 'Top Gifting Companies in Bangalore', href: '/bangalore-corporate-gifting/top-companies' },
              { label: 'Same-Day', title: 'Same-Day Gift Delivery in Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { label: 'Bulk Orders', title: 'Bulk Corporate Gifting in Bangalore', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Hampers', title: 'Corporate Gift Hampers in Bangalore', href: '/bangalore-corporate-gifting/gift-hampers' },
              { label: 'Catalog', title: 'Browse the Full MintBox Catalog', href: '/catalog' },
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
