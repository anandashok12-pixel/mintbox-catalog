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

const IDEAS = [
  {
    name: "Gourmet Chocolate Trunk",
    price: "₹1,200–2,500",
    desc: "Single-origin dark chocolate, pralines and cocoa-dusted dry fruits in a rigid keepsake trunk. It reads premium without the dry-fruit fatigue, and the trunk survives on the client's shelf long after the chocolate is gone.",
  },
  {
    name: "Brass or Copper Décor",
    price: "₹800–2,000",
    desc: "An urli bowl, a pair of tealight holders or a small copper vase. Festive, culturally resonant and genuinely used at home every Diwali after this one - which is exactly what you want a client gift to do.",
  },
  {
    name: "Premium Candle + Diffuser Set",
    price: "₹900–1,800",
    desc: "A soy-wax candle with a reed diffuser in festive scents like sandalwood or mogra. Safe across dietary preferences and easy to courier - a reliable pick for clients you have never met in person.",
  },
  {
    name: "Artisan Tea Set",
    price: "₹1,000–2,200",
    desc: "A curated selection of Darjeeling, Nilgiri or blended chais with an infuser or a pair of cups. Skews thoughtful rather than transactional, and works for clients who do not eat sweets.",
  },
  {
    name: "Personalised Desk Décor",
    price: "₹700–1,500",
    desc: "An engraved nameplate, a marble coaster set or a brass paperweight with the client's name. Personalisation is the cheapest way to make a mid-budget gift feel bespoke - just triple-check the spelling.",
  },
  {
    name: "Eco Hamper",
    price: "₹800–1,600",
    desc: "Seed-paper diyas, plantable stationery and organic snacks in compostable packaging. Increasingly the safest choice for clients with visible sustainability commitments - it signals you pay attention to their brand.",
  },
  {
    name: "Silver-Plated Gift",
    price: "₹2,000–5,000",
    desc: "A silver-plated coin, bowl or photo frame. The most traditional premium gesture in Indian business gifting, best reserved for relationships measured in years rather than quarters.",
  },
  {
    name: "Channapatna Handicrafts",
    price: "₹600–1,500",
    desc: "GI-tagged lacquered wooden décor from Channapatna, an hour outside Bangalore. A conversation-starting gift with a real story - MintBox sources these directly from craft workshops for client orders.",
  },
  {
    name: "Premium 2027 Diary + Pen Set",
    price: "₹800–1,800",
    desc: "A leather-bound 2027 diary with a quality pen, debossed with the client's name rather than your logo. Lands right before planning season, so it actually gets used from January 1.",
  },
  {
    name: "Smart Gadgets",
    price: "₹1,500–3,500",
    desc: "A wireless charging pad, compact Bluetooth speaker or smart desk lamp. Best for younger, tech-forward client teams - keep your branding subtle (a laser-etched logo, not a printed billboard).",
  },
  {
    name: "Plant + Planter Set",
    price: "₹500–1,200",
    desc: "A low-maintenance snake plant or jade in a ceramic or terracotta planter. Symbolically right for Diwali - growth and prosperity - and it stays on the client's desk for years.",
  },
  {
    name: "Coffee-Table Book",
    price: "₹1,000–2,500",
    desc: "A well-chosen book on Indian art, architecture or the client's industry. An underrated premium gift that flatters the recipient's taste instead of shouting your logo.",
  },
  {
    name: "Festive Experience Voucher",
    price: "₹1,500–5,000",
    desc: "A dining, spa or curated-experience voucher for the client and their family. Zero logistics, no courier risk, and it gifts time rather than another object - just pair it with a handwritten festive card.",
  },
  {
    name: "Custom-Branded Premium Hamper",
    price: "₹1,500–4,000",
    desc: "A hamper built around the client's tastes - coffee for the coffee obsessive, wellness for the marathon runner - in packaging with restrained co-branding. MintBox builds these to brief at an MOQ of 10.",
  },
  {
    name: "Charity Donation in the Client's Name",
    price: "Any budget",
    desc: "A donation to a vetted NGO with a card telling the client what their gift funded. Powerful for clients whose gift policies bar them from accepting anything of value - it is a gesture, not a possession.",
  },
]

const COMPLIANCE_POINTS = [
  {
    title: "Check Their Gift Policy First",
    desc: "Many companies - especially MNCs, banks and government-linked firms - cap acceptable gifts at ₹2,500–5,000 or bar them entirely. One email to your contact asking about their policy avoids the awkwardness of a returned hamper.",
  },
  {
    title: "GST: No Input Credit on Client Gifts",
    desc: "Input tax credit on goods given as gifts is blocked, so the GST you pay on client gifts is a real cost - budget for it. Our guide to GST on corporate gifts covers the rules in plain English.",
  },
  {
    title: "Deliver Before Diwali Week",
    desc: "Client gifts should arrive 3–7 days before the festival, while gifting is top of mind and before the office empties out. That means dispatching outstation gifts by late October.",
  },
  {
    title: "Order by October 15",
    desc: "Customised client gifts - engraving, branded packaging, curated hampers - need production time. October 15 is the realistic cutoff for Diwali 2026; after that you are picking from ready stock.",
  },
]

const FAQ_ITEMS = [
  {
    q: "What can I gift clients on Diwali besides dry fruits?",
    a: "Strong alternatives include gourmet chocolate trunks (₹1,200–2,500), brass or copper décor (₹800–2,000), artisan tea sets, personalised desk décor, eco hampers with plantable stationery, premium 2027 diaries, and experience vouchers. The best picks are things a client keeps or uses - décor, diaries, plants - rather than consumables that disappear in a week.",
  },
  {
    q: "How much should I spend on Diwali gifts per client?",
    a: "A common tiering: ₹500–1,000 for the broad client list, ₹1,500–2,500 for key accounts, and ₹3,000–5,000 for strategic relationships. Stay aware that many companies cap acceptable gifts around ₹5,000 - a thoughtful mid-budget gift beats an extravagant one that compliance makes them return.",
  },
  {
    q: "When should Diwali gifts reach clients?",
    a: "Aim for 3–7 days before Diwali, which falls in early November 2026. Gifts arriving during festival week risk landing in an empty office. Work backwards: order by October 15, dispatch outstation gifts by late October.",
  },
  {
    q: "What is the GST treatment of Diwali gifts to clients?",
    a: "Input tax credit on goods disposed of as gifts is blocked, so GST paid on client gifts becomes part of your gift cost rather than a credit you can claim. Keep invoices and a gift register for audit. See our full guide to <a href=\"/guides/gst-on-corporate-gifts\">GST on corporate gifts</a> - and confirm specifics with your chartered accountant.",
  },
  {
    q: "Should client Diwali gifts carry our company logo?",
    a: "Lightly, if at all. A logo sleeve on the packaging or a branded card is fine; a logo printed across the gift itself turns a gesture into an advertisement. The most-kept client gifts carry the client's name more prominently than the giver's.",
  },
  {
    q: "Can MintBox handle our client Diwali gifting end to end?",
    a: "Yes. MintBox curates the gift, handles engraving and branded packaging in-house, and couriers to each client address pan-India from Bangalore with per-recipient tracking. MOQ is 10 units, quotes within 24 hours - and for Diwali 2026, orders should be placed by October 15.",
  },
]

export default function DiwaliClientGiftsClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Diwali Gifts for Clients", "item": "https://themintbox.in/guides/diwali-gifts-for-clients" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "15 Diwali Gift Ideas for Clients That Aren't Dry Fruits (2026)",
        "description": "15 Diwali gift ideas for clients that skip the dry-fruit cliché - gourmet trunks, brass décor, artisan crafts and more, with budgets per client tier for 2026.",
        "url": "https://themintbox.in/guides/diwali-gifts-for-clients",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "15 Diwali Gift Ideas for Clients That Aren't Dry Fruits (2026)",
        "itemListElement": IDEAS.map((idea, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${idea.name} — ${idea.price}`,
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
              <span className="cp-breadcrumb-current">Diwali Gifts for Clients</span>
            </nav>
            <div className="cp-hero-eyebrow">Client Gifting · Diwali 2026</div>
            <h1 className="cp-hero-title">
              15 Diwali Gift Ideas for Clients<br />
              <em>That Aren&apos;t Dry Fruits (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Your clients will receive a dozen dry-fruit boxes this Diwali. These 15 Diwali
              gifts for clients are what they will actually remember - gourmet trunks, brass
              décor, artisan crafts and more, with ₹ budgets per client tier and the compliance
              notes that keep the gesture professional.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 15 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Zero dry-fruit boxes</span>
              <span className="cp-hero-badge">✓ Order by Oct 15, 2026</span>
              <span className="cp-hero-badge">✓ Per-client courier + tracking</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80" alt="Handing over a wrapped Diwali gift for a client" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80" alt="Festive Diwali celebration sparkle for corporate client gifting" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best Diwali gifts for clients that are not dry fruits: gourmet chocolate trunks (₹1,200–2,500), brass or copper décor (₹800–2,000), artisan tea sets, personalised desk décor, eco hampers, premium 2027 diaries and experience vouchers. Budget ₹500–1,000 for the broad list and ₹1,500–5,000 for key accounts, and order by October 15, 2026."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "Engraving and branded packaging in-house",
              "Per-recipient pan-India courier with tracking",
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
              <div className="cp-stat-label">Quote Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE MAIN LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The List</div>
          <h2 className="cp-section-title">15 Diwali Gifts for Clients Beyond the Dry-Fruit Box</h2>
          <p className="cp-section-sub">
            Every idea below is something a client keeps, uses or genuinely remembers. If you
            still want the hamper format - just better - see our ranked list of
            {' '}<a href="/guides/corporate-diwali-gift-hampers">corporate Diwali gift hampers</a>.
          </p>
          <div className="cp-steps">
            {IDEAS.map((idea, i) => (
              <div key={idea.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {idea.name}
                    <span
                      style={{
                        marginLeft: '12px',
                        fontSize: '0.85em',
                        fontWeight: 400,
                        color: 'var(--forest-green, #1B4D3E)',
                        opacity: 0.75,
                      }}
                    >
                      {idea.price}
                    </span>
                  </div>
                  <div className="cp-step-desc">{idea.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPLIANCE + TIMING */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Do It Properly</div>
          <h2 className="cp-section-title">Client Gifting Compliance and Timing at Diwali</h2>
          <p className="cp-section-sub">
            Client gifting has rules that employee gifting does not - their compliance policy,
            your GST treatment, and a delivery window that closes fast. Get these four things
            right and the rest is taste.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {COMPLIANCE_POINTS.map((point) => (
              <div key={point.title} className="cp-card">
                <div className="cp-card-title">{point.title}</div>
                <p className="cp-card-desc">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Client-Ready Products</div>
          <h2 className="cp-section-title">Browse Client Diwali Gift Products</h2>
          <p className="cp-section-sub">
            Curated products that work for client tiers from ₹500 to ₹5,000. Filter by price
            to match your client list.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Diwali Client Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80" alt="Elegantly wrapped Diwali gifts for clients awaiting dispatch" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The dry-fruit box is not a bad gift - it is an invisible one. At Diwali, a client
            remembers exactly two gifts: the most thoughtful one and the laziest one. Choose
            which list you are on.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Client Gifting</div>
            <h2 className="cp-cta-title">Plan Your Client<br />Diwali Gifting</h2>
            <p className="cp-cta-sub">
              Share your client list size, budget tiers and delivery cities - we will propose
              gift options per tier and handle dispatch to every address, with tracking.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Client Gifting Quote"
              ctaLabel="Get Client Gifting Quote"
              defaultOccasion="diwali"
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
            title="Diwali Gifts for Clients - Frequently Asked Questions"
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
              { label: 'Diwali Hub', title: 'Diwali Corporate Gifts Guide', href: '/guides/diwali-corporate-gifts' },
              { label: 'Clients', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Hampers', title: 'Top Corporate Diwali Gift Hampers', href: '/guides/corporate-diwali-gift-hampers' },
              { label: 'Premium', title: 'Luxury Corporate Gifts', href: '/guides/luxury-corporate-gifts' },
              { label: 'Tax', title: 'GST on Corporate Gifts', href: '/guides/gst-on-corporate-gifts' },
              { label: 'Employees', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
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
