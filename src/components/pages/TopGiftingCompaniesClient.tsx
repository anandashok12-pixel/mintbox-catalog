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

const COMPANIES = [
  {
    rank: "1",
    name: "MintBox",
    what: "Curated corporate gifting from a Bangalore HQ - roughly 200 products spanning welcome kits, festive hampers, drinkware, and tech accessories, all customisable in-house.",
    strengths: "MOQ of just 10 units, quotes within 24 hours, in-house branding and engraving, GST invoicing on every order, and same-day delivery within Bangalore for urgent orders. Standard bulk turnaround is 3-5 business days; 48-hour express is possible.",
    bestFor: "Startups and mid-size teams that want a shortlist, not a warehouse. Full disclosure: we are not the biggest catalog in the city - we curate ~200 products rather than list 10,000.",
  },
  {
    rank: "2",
    name: "OffiNeeds",
    what: "One of Bangalore's largest corporate gifting and office supplies players, known for a huge catalog that runs into thousands of SKUs across merchandise, gifting, and stationery.",
    strengths: "Scale. Known for handling very large enterprise gifting programmes and combining office supplies procurement with gifting under one vendor.",
    bestFor: "Pick them instead of a boutique vendor when you are running a multi-thousand-unit enterprise programme and want maximum catalog breadth from a single account.",
  },
  {
    rank: "3",
    name: "Consortium Gifts",
    what: "A pan-India corporate gifting veteran with decades in the trade, serving large corporates across metros including Bangalore.",
    strengths: "Known for deep experience with large-format corporate accounts and a wide network of manufacturers, which helps on unusual custom-manufactured items.",
    bestFor: "Legacy enterprises with procurement teams that want an established pan-India vendor with a long track record.",
  },
  {
    rank: "4",
    name: "Tantam Gifting",
    what: "A Bangalore boutique gifting studio focused on design-led curation and premium presentation.",
    strengths: "Known for aesthetic, design-forward gift boxes and attention to unboxing detail.",
    bestFor: "Design-conscious brands where the look of the box matters as much as what is inside.",
  },
  {
    rank: "5",
    name: "Giveaway Smiles",
    what: "A Bangalore promotional products company covering branded giveaways, event merchandise, and corporate gifts.",
    strengths: "Known for promotional and event-driven merchandise - the high-volume, lower-ticket end of gifting.",
    bestFor: "Conference kits, expo giveaways, and bulk branded merchandise where unit cost is the deciding factor.",
  },
  {
    rank: "6",
    name: "Kambar Group",
    what: "A Bangalore corporate merchandise supplier working across apparel, branded goods, and gifting.",
    strengths: "Known for corporate apparel and merchandise programmes alongside gifting.",
    bestFor: "Companies that want branded T-shirts, hoodies, and uniforms handled by the same vendor as their gifts.",
  },
  {
    rank: "7",
    name: "BoxUp Luxury Gifting",
    what: "A luxury gifting brand known for premium curated hampers and high-end presentation.",
    strengths: "Known for genuinely premium hampers and polished packaging at the top of the market.",
    bestFor: "Pick them instead when the brief is pure luxury - CXO gifts and VIP client hampers where budget per unit runs well past ₹3,000 and presentation is everything.",
  },
  {
    rank: "8",
    name: "PrintStop",
    what: "A print-led merchandise and corporate kits company with a strong online ordering platform.",
    strengths: "Known for print quality and a self-serve platform that makes repeat orders of printed merch straightforward.",
    bestFor: "Print-heavy kits - notebooks, cards, calendars, and printed onboarding material at volume.",
  },
  {
    rank: "9",
    name: "Vistaprint India",
    what: "The Indian arm of the global self-serve printing platform, covering small-batch branded merchandise ordered entirely online.",
    strengths: "No minimum-order pressure - you can order a handful of branded items without negotiating with a sales team.",
    bestFor: "Pick them instead for tiny one-off orders below bulk MOQs - 5 mugs for a small team, a single banner, a short run of cards.",
  },
  {
    rank: "10",
    name: "Nurserylive Corporate",
    what: "The corporate gifting arm of the online plants marketplace, focused entirely on green gifting - plants, planters, and grow kits.",
    strengths: "Known for the deepest plant-gifting range in the market and pan-India plant logistics, which is genuinely hard to do.",
    bestFor: "Pick them instead when the entire programme is plant gifting at scale and you want maximum variety in live plants.",
  },
]

const CRITERIA = [
  {
    title: "Minimum Order Quantity (MOQ)",
    desc: "Bangalore vendors typically ask for 50-100 units minimum; some enterprise-focused players want more. If you are a 30-person startup, MOQ is the first filter - MintBox works from 10 units, while self-serve platforms like Vistaprint have effectively no MOQ but no bulk pricing either.",
  },
  {
    title: "Turnaround Time",
    desc: "Standard bulk delivery in Bangalore runs 5-10 business days across the market. Ask every vendor two questions: what is standard, and what is the express option? For genuinely urgent orders, check who offers same-day delivery within Bangalore before committing.",
  },
  {
    title: "Customisation Depth",
    desc: "There is a big difference between slapping a logo sticker on a box and in-house engraving, embroidery, and custom packaging. Ask to see physical samples of past branded work - not renders - before placing a bulk order.",
  },
  {
    title: "GST Invoicing",
    desc: "Non-negotiable for any registered business. Every vendor on this list handles GST-compliant invoicing, but always confirm the invoice format your finance team needs before paying an advance.",
  },
  {
    title: "Delivery Coverage",
    desc: "If your team is split across Bangalore, Pune, and Gurgaon, a vendor who only delivers locally means you become the logistics company. Check pan-India courier capability and per-location delivery charges upfront.",
  },
]

const FAQ_ITEMS = [
  {
    q: "Which is the best corporate gifting company in Bangalore?",
    a: "It depends on your order profile. For curated gifting at startup-friendly MOQs (10 units) with same-day Bangalore delivery, MintBox is a strong fit. For very large enterprise programmes, OffiNeeds is known for scale. For pure luxury hampers, BoxUp Luxury Gifting specialises at the premium end. Shortlist two or three, request quotes, and compare samples before committing.",
  },
  {
    q: "What is the typical MOQ for corporate gifts in Bangalore?",
    a: "Most Bangalore corporate gifting companies work from 50-100 units minimum, though this varies by product and vendor. MintBox works from 10 units, and self-serve printing platforms accept even smaller runs at higher per-unit prices. If your order is under 25 units, expect retail-plus pricing rather than bulk rates.",
  },
  {
    q: "Can I get same-day corporate gift delivery in Bangalore?",
    a: "Yes, for in-stock items. MintBox offers same-day delivery within Bangalore on catalog products, and a 48-hour express option for branded orders. Most vendors need 5-10 business days for customised bulk orders, so same-day generally means unbranded or pre-branded stock. See our <a href=\"/bangalore-corporate-gifting/same-day-delivery\">same-day delivery guide</a> for details.",
  },
  {
    q: "How much do corporate gifts cost per employee in Bangalore?",
    a: "Typical budgets: ₹300-500 per head for festival giveaways at volume, ₹500-1,500 for standard employee gifting and welcome kits, and ₹2,000-5,000 for milestone or leadership gifts. Most Bangalore companies land between ₹500 and ₹1,000 per employee for Diwali. Bulk pricing improves meaningfully above 100 units.",
  },
  {
    q: "Can MintBox match a competitor's quote?",
    a: "Often, yes - send us the competitor quote with the product spec and quantity, and we will respond within 24 hours with our best price on a comparable or better product. We will also tell you honestly if a competitor's offer is the better deal for your specific brief - it happens, especially on ultra-high-volume promotional runs.",
  },
]

export default function TopGiftingCompaniesClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Bangalore Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting" },
          { "@type": "ListItem", "position": 3, "name": "Top Companies", "item": "https://themintbox.in/bangalore-corporate-gifting/top-companies" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Top 10 Corporate Gifting Companies in Bangalore (2026)",
        "description": "The 10 best corporate gifting companies in Bangalore, ranked and compared on MOQ, turnaround, customisation, and delivery. Updated July 2026.",
        "url": "https://themintbox.in/bangalore-corporate-gifting/top-companies",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top 10 Corporate Gifting Companies in Bangalore (2026)",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "MintBox" },
          { "@type": "ListItem", "position": 2, "name": "OffiNeeds" },
          { "@type": "ListItem", "position": 3, "name": "Consortium Gifts" },
          { "@type": "ListItem", "position": 4, "name": "Tantam Gifting" },
          { "@type": "ListItem", "position": 5, "name": "Giveaway Smiles" },
          { "@type": "ListItem", "position": 6, "name": "Kambar Group" },
          { "@type": "ListItem", "position": 7, "name": "BoxUp Luxury Gifting" },
          { "@type": "ListItem", "position": 8, "name": "PrintStop" },
          { "@type": "ListItem", "position": 9, "name": "Vistaprint India" },
          { "@type": "ListItem", "position": 10, "name": "Nurserylive Corporate" }
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
              <span className="cp-breadcrumb-current">Top Companies</span>
            </nav>
            <div className="cp-hero-eyebrow">Vendor Guide · Bangalore · 2026</div>
            <h1 className="cp-hero-title">
              Top 10 Corporate Gifting Companies in Bangalore<br />
              <em>Ranked &amp; Compared (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The corporate gifting companies in Bangalore worth your shortlist - ranked and
              compared on MOQ, turnaround, customisation depth, and delivery coverage. Written for
              HR and admin teams who need a vendor decision, not a directory dump.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See the Ranking ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 10 vendors compared</span>
              <span className="cp-hero-badge">✓ MOQ &amp; turnaround noted</span>
              <span className="cp-hero-badge">✓ Honest methodology</span>
              <span className="cp-hero-badge">✓ Updated {formatMonthYear(PAGE_UPDATED)}</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1556742212-5b321f3c261b?auto=format&fit=crop&w=800&q=80" alt="Business handshake with a corporate gifting company in Bangalore" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80" alt="Curated corporate gift boxes from a Bangalore gifting vendor" className="cp-hero-img-actual" loading="lazy" />
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
            content="Leading corporate gifting companies in Bangalore include MintBox (curated catalog, MOQ 10, same-day Bangalore delivery), OffiNeeds (largest catalogs, enterprise scale), Consortium Gifts (pan-India veteran), BoxUp Luxury Gifting (premium hampers), and Tantam Gifting (design-led boutique boxes). Compare vendors on MOQ, turnaround, customisation depth, and GST invoicing before committing."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients served across India",
              "50,000+ gifts delivered since 2019",
              "In-house branding, engraving, and personalisation",
              "Same-day delivery available within Bangalore",
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
              <div className="cp-stat-label">Years in Business</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">48hr</div>
              <div className="cp-stat-label">Express Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE RANKED LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Ranking</div>
          <h2 className="cp-section-title">The 10 Best Corporate Gifting Companies in Bangalore</h2>
          <p className="cp-section-sub">
            Full disclosure: MintBox publishes this guide. We have listed ourselves where we
            genuinely compete and noted what competitors do better. Every entry includes what the
            vendor is known for and who should pick them.
          </p>
          <div className="cp-steps">
            {COMPANIES.map((c) => (
              <div key={c.rank} className="cp-step">
                <div className="cp-step-num">{c.rank}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{c.name}</div>
                  <div className="cp-step-desc">{c.what}</div>
                  <div className="cp-step-desc" style={{ marginTop: '4px' }}>
                    <strong>Strengths:</strong> {c.strengths}
                  </div>
                  <div className="cp-step-desc" style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.85 }}>
                    <strong>Best for:</strong> {c.bestFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW WE RANKED / CRITERIA */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Methodology</div>
          <h2 className="cp-section-title">How We Ranked These Gifting Companies</h2>
          <p className="cp-section-sub">
            We ranked on five criteria that actually decide vendor fit for Bangalore buyers - not
            follower counts or catalog size alone. Competitor descriptions reflect what each company
            is publicly known for; we have not invented client counts or prices for anyone. Use the
            same five checks when you request quotes - and if you are placing a large order, our{' '}
            <a href="/bangalore-corporate-gifting/bulk-gifting">Bangalore bulk gifting guide</a>{' '}
            covers volume pricing in detail.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {CRITERIA.map((item) => (
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
          <div className="cp-section-eyebrow">The MintBox Catalog</div>
          <h2 className="cp-section-title">Browse Corporate Gifts Available in Bangalore</h2>
          <p className="cp-section-sub">
            A sample of what a curated catalog looks like - every product below ships across
            Bangalore, with same-day delivery on in-stock items.
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
        <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Corporate gift packages prepared by a Bangalore corporate gifting company" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The best gifting vendor is not the one with the biggest catalog - it is the one whose
            MOQ, turnaround, and customisation actually match your order. Compare on those three
            first; everything else is brochure copy.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Get Comparing</div>
            <h2 className="cp-cta-title">Add MintBox<br />to Your Shortlist</h2>
            <p className="cp-cta-sub">
              Tell us your quantity, budget per unit, and deadline - we respond with a full quote
              within {QUOTE_TIME}, so you can compare us against anyone on this list with real numbers.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a 24-Hour Quote"
              ctaLabel="Request My Quote"
              defaultOccasion="corporate_event"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Gifting Companies in Bangalore - FAQs"
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
              { label: 'Suppliers', title: 'Corporate Gift Suppliers in Bangalore', href: '/bangalore-corporate-gifting/suppliers' },
              { label: 'Where to Buy', title: 'Where to Buy Corporate Gifts in Bangalore', href: '/bangalore-corporate-gifting/where-to-buy' },
              { label: 'India-Wide', title: 'Top Corporate Gifting Companies in India', href: '/guides/top-corporate-gifting-companies-india' },
              { label: 'Same-Day', title: 'Same-Day Gift Delivery in Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { label: 'Handbook', title: 'The Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
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
