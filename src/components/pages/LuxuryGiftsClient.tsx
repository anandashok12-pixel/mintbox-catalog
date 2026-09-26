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

const LUXURY_GIFTS = [
  {
    name: "Premium Leather Portfolio",
    price: "₹2,000–4,500",
    desc: "A full-grain leather portfolio with a notepad, card slots, and a pen loop - the boardroom gift that gets carried into every meeting after. Debossed initials in one corner read as far more premium than any logo. Choose vegetable-tanned leather; it ages into character instead of peeling.",
  },
  {
    name: "Engraved Copper & Brass Barware Set",
    price: "₹2,500–5,000",
    desc: "Hammered copper tumblers or a brass serving set, engraved with the recipient's name. Rooted in Indian craft tradition, so it works equally for domestic clients and international leadership. Presentation box matters - budget for a lined wooden case.",
  },
  {
    name: "Luxury Gift Hamper",
    price: "₹3,000–8,000",
    desc: "The flexible flagship - artisan chocolates, single-estate teas, a premium candle, and one keepsake item in a rigid trunk-style box. MintBox builds bespoke luxury hampers in this band with client branding on the outer trunk only, keeping the contents personal.",
  },
  {
    name: "Artisan Tea & Coffee Trunk",
    price: "₹2,500–6,000",
    desc: "Single-origin Coorg coffee or Darjeeling first-flush tea with a French press or brewing kit in a wooden trunk. A connoisseur gift that invites a ritual, not just a thank-you. Include brewing notes - the detail people remember.",
  },
  {
    name: "Premium Pen (Lamy / Parker Tier)",
    price: "₹2,000–5,000",
    desc: "The oldest executive gift for a reason - a serious pen signals a serious relationship. Engrave the name, never the company logo. Present it in the original brand box; repackaging a branded pen diminishes it.",
  },
  {
    name: "Silk Accessories",
    price: "₹2,000–6,000",
    desc: "A Mysore silk stole or a pocket-square set - elegant, lightweight, and effortlessly giftable across genders when chosen thoughtfully. Strong for international visitors who want something authentically Indian that is not a trinket.",
  },
  {
    name: "Executive Desk Set",
    price: "₹2,500–6,000",
    desc: "A matched wooden or leather set - organiser, card holder, paperweight, and pen stand. Lives on the desk of a decision-maker for years, which no consumable gift can claim. Pick muted tones over gloss; the desk it lands on is probably minimalist.",
  },
  {
    name: "Premium Smart Gadgets",
    price: "₹3,500–10,000",
    desc: "Noise-cancelling headphones, premium smartwatches, or high-end speakers for the technophile executive. Never engrave the device - brand the sleeve and gift note instead. Our electronic gifts guide covers which tech holds up at this tier.",
  },
  {
    name: "Personalised Whisky-Glass Set",
    price: "₹2,500–5,000",
    desc: "Cut-crystal glasses with a stone-chilling set, engraved with initials - glassware only, no alcohol, which keeps it compliant with most corporate gift policies while still feeling indulgent. Confirm the recipient's comfort with barware before sending; when in doubt, choose the tea trunk instead.",
  },
  {
    name: "Handcrafted Channapatna-Art Décor",
    price: "₹2,000–4,500",
    desc: "GI-tagged Channapatna lacquerware from just outside Bangalore, reimagined as desk décor and display pieces. A gift with a genuine story - traditional craft, natural dyes, and a Karnataka provenance card in the box. Unbeatable for clients visiting your Bangalore office.",
  },
  {
    name: "Luxury Candle + Diffuser Set",
    price: "₹2,000–4,000",
    desc: "A hand-poured soy candle and reed diffuser set from a premium Indian fragrance house. The rare luxury gift that suits homes rather than desks - which is exactly why senior recipients rate it. Choose woody or citrus profiles over floral for broad appeal.",
  },
  {
    name: "Bespoke Gift Trunk",
    price: "₹5,000–10,000+",
    desc: "The top of the range - a made-to-order trunk curated around one person: their city, their interests, their milestones with your company. MintBox designs these one-off builds for founder-to-founder and board-level gifting, typically 8–12 curated pieces per trunk.",
  },
]

const ETIQUETTE_POINTS = [
  {
    num: "1",
    title: "Check the Gift Policy Before You Spend",
    desc: "Many Indian corporates and most MNCs cap acceptable gifts at ₹2,500–5,000, and some government-linked organisations prohibit gifts entirely. Ask the recipient's office or check their published code of conduct first - a returned gift is worse than a modest one.",
  },
  {
    num: "2",
    title: "Presentation Is Half the Gift",
    desc: "At this price tier, packaging failures are unforgivable. Rigid boxes, tissue lining, ribbon, and a hand-finished label - never a courier flyer around bubble wrap. Budget 10–15% of the gift value for presentation.",
  },
  {
    num: "3",
    title: "Handwrite the Note",
    desc: "A two-line handwritten note from a named person outperforms any printed card. Reference something specific - the deal closed, the visit, the milestone. Generic luxury reads as expensive indifference.",
  },
  {
    num: "4",
    title: "Personalise the Person, Not the Logo",
    desc: "Engrave their initials, not your branding. At the luxury tier, your logo on the gift converts a gesture into an advertisement. Put your brand on the outer packaging and the note card only.",
  },
  {
    num: "5",
    title: "Time It to a Moment",
    desc: "Luxury gifts land hardest when tied to something real - a signed contract, a decade of partnership, a leadership transition. An unprompted expensive gift can feel transactional or, worse, obligating.",
  },
]

const FAQ_ITEMS = [
  {
    q: "What counts as a luxury corporate gift?",
    a: "In the Indian market, luxury corporate gifting generally starts around ₹2,000 per recipient and runs to ₹10,000+ for board-level gestures. The markers are material quality (full-grain leather, crystal, silk), personalisation (engraved initials, curated contents), and presentation (rigid boxes, handwritten notes) - not just price.",
  },
  {
    q: "How much should I budget for VIP client gifts?",
    a: "Common practice: ₹2,000–3,500 for important clients, ₹3,500–6,000 for key accounts, and ₹6,000–10,000+ for board-level or founder-to-founder gestures. Always check the recipient organisation's gift policy first - the right budget is the highest one their policy allows comfortably, not the highest one yours does.",
  },
  {
    q: "Are there compliance limits on gifts to clients in India?",
    a: "Many companies cap acceptable gifts at ₹2,500–5,000 per instance in their codes of conduct, and government and PSU officials face far stricter conduct rules. There is no single statutory limit for private-sector gifts, but exceeding a recipient's internal policy forces an awkward refusal. When unsure, ask their office - it reads as considerate, not naive. Our <a href=\"/guides/corporate-gifting-etiquette\">corporate gifting etiquette guide</a> covers this in detail.",
  },
  {
    q: "Can luxury corporate gifts be personalised in bulk?",
    a: "Yes - engraving, debossing, and monogramming scale well even for 25–100 recipients if you plan lead time. Name-level personalisation typically adds 3–5 business days and ₹100–300 per unit depending on the method. Collect recipient names and spellings early; that list is always the bottleneck.",
  },
  {
    q: "Does MintBox do premium and luxury corporate gifting?",
    a: "Yes. MintBox builds luxury hampers, bespoke trunks, and engraved premium gifts from ₹2,000 to ₹10,000+ per piece, with in-house personalisation, MOQ 10, GST invoicing, and pan-India delivery from Bangalore. Quotes within 24 hours.",
  },
]

export default function LuxuryGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Luxury Corporate Gifts", "item": "https://themintbox.in/guides/luxury-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "12 Luxury Corporate Gifts for VIP Clients & Leadership (2026)",
        "description": "Luxury corporate gifts for VIP clients and leadership - 12 ideas from ₹2,000 to ₹10,000+ with compliance notes, presentation tips, and bulk options.",
        "url": "https://themintbox.in/guides/luxury-corporate-gifts",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "12 Luxury Corporate Gifts for VIP Clients & Leadership",
        "itemListElement": LUXURY_GIFTS.map((item, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${item.name} — ${item.price}`,
        })),
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
              <span className="cp-breadcrumb-current">Luxury Corporate Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">Premium Gifting · VIP Clients · 2026</div>
            <h1 className="cp-hero-title">
              12 Luxury Corporate Gifts<br />
              <em>For VIP Clients & Leadership (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Luxury corporate gifts operate by different rules - policy caps, presentation
              standards, and personalisation that puts the recipient first. Here are 12 ideas from
              ₹2,000 to ₹10,000+ that hold up at board level, plus the etiquette that makes them land.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See the 12 Gifts ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ ₹2,000–10,000+ range</span>
              <span className="cp-hero-badge">✓ Engraving in-house</span>
              <span className="cp-hero-badge">✓ Bespoke builds available</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" alt="Luxury corporate gift box with premium wrapping for a VIP client" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80" alt="Premium red gift presentation for executive leadership gifting" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best luxury corporate gifts in 2026 are full-grain leather portfolios (₹2,000–4,500), engraved copper barware sets (₹2,500–5,000), curated luxury hampers (₹3,000–8,000), and bespoke gift trunks (₹5,000+). Check the recipient's gift policy first - many companies cap gifts at ₹2,500–5,000 - and personalise with their initials, never your logo."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "In-house engraving, debossing, and personalisation",
              "Bespoke luxury trunks curated per recipient",
              "GST-compliant invoicing for all orders",
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
              <div className="cp-stat-label">Clients</div>
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
              <div className="cp-stat-value">24hr</div>
              <div className="cp-stat-label">Quote Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE MAIN LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Ranked List</div>
          <h2 className="cp-section-title">The 12 Best Luxury Corporate Gifts, Ranked</h2>
          <p className="cp-section-sub">
            Ranked for board-level reliability - gifts that impress without embarrassing anyone.
            For the premium tech options at positions 8 and beyond, our{' '}
            <a href="/guides/electronic-corporate-gifts">electronic corporate gifts guide</a>{' '}
            covers quality checks in depth.
          </p>
          <div className="cp-steps">
            {LUXURY_GIFTS.map((item, i) => (
              <div key={item.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {item.name}
                    <span
                      style={{
                        marginLeft: '12px',
                        fontSize: '0.85em',
                        fontWeight: 400,
                        color: 'var(--forest-green, #1B4D3E)',
                        opacity: 0.75,
                      }}
                    >
                      {item.price}
                    </span>
                  </div>
                  <div className="cp-step-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LUXURY ETIQUETTE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Etiquette & Compliance</div>
          <h2 className="cp-section-title">Luxury Gifting Etiquette in India: 5 Rules</h2>
          <p className="cp-section-sub">
            At the premium tier, how you give matters as much as what you give. These five rules
            separate a memorable gesture from an awkward one - and they apply whether the gift
            goes to <a href="/guides/corporate-gifts-for-clients">a client</a> or your own leadership team.
          </p>
          <div className="cp-steps">
            {ETIQUETTE_POINTS.map((item) => (
              <div key={item.num} className="cp-step">
                <div className="cp-step-num">{item.num}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{item.title}</div>
                  <div className="cp-step-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Premium Catalog</div>
          <h2 className="cp-section-title">Browse Premium & Luxury Corporate Gift Products</h2>
          <p className="cp-section-sub">
            Filter by price at the upper bands to see gifts suited to VIP clients and leadership.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Luxury Corporate Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80" alt="Curated luxury corporate gift hamper prepared for executive gifting" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A luxury gift is a message about how you see the relationship. Engrave their initials,
            write the note by hand, and keep your logo on the box - never on the gift.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>VIP Gifting</div>
            <h2 className="cp-cta-title">Brief Us on Your<br />VIP Gift List</h2>
            <p className="cp-cta-sub">
              Tell us the recipients, the occasion, and the budget band - we will propose curated
              options with personalisation and presentation mockups within {QUOTE_TIME}.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Luxury Gifting Quote"
              ctaLabel="Get VIP Gift Quote"
              defaultOccasion="client_gifting"
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
            title="Luxury Corporate Gifts - Frequently Asked Questions"
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
              { label: 'Client Gifting', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Hampers', title: 'Corporate Gift Hampers in Bangalore', href: '/bangalore-corporate-gifting/gift-hampers' },
              { label: 'Stand Out', title: 'Unique Corporate Gifts', href: '/guides/unique-corporate-gifts' },
              { label: 'Etiquette', title: 'Corporate Gifting Etiquette', href: '/guides/corporate-gifting-etiquette' },
              { label: 'Tech Tier', title: 'Electronic Corporate Gifts', href: '/guides/electronic-corporate-gifts' },
              { label: 'Collections', title: 'Gift Hampers Collection', href: '/collections/hampers' },
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
