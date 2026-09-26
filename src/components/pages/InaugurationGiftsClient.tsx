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

const FOR_THE_OFFICE = [
  {
    name: "1. Indoor Plants & Statement Planters — ₹300–2,000",
    desc: "The default office inauguration gift for a reason: a money plant, areca palm, or snake plant in a good ceramic planter greens a new space instantly and lives on for years. Add a small brass nameplate with your company's wishes for a permanent reminder of who sent it.",
  },
  {
    name: "2. Brass Decor & Lamp for the Pooja — ₹500–3,000",
    desc: "Most Indian office inaugurations open with a pooja, and a brass diya, urli, or small idol arrives exactly on cue. It is the most culturally fluent gift a partner or vendor can send - traditional, auspicious, and never out of place at a griha-pravesh-style opening.",
  },
  {
    name: "3. Wall Art or a Framed Print — ₹800–3,500",
    desc: "New offices have blank walls and no budget line for filling them. A framed print - city skyline, abstract piece, or a map of the neighbourhood - gives the space character. Skip anything with your own logo on it; this one is about their walls, not your branding.",
  },
  {
    name: "4. Coffee Machine or Brew-Station Contribution — ₹2,000–5,000",
    desc: "For close partners: contribute a French press, pour-over kit, or filter-coffee setup with a starter stock of beans. The pantry is the heart of a new office, and the team remembers who equipped it every single morning.",
  },
  {
    name: "5. Reception Clock or Desk Clock — ₹800–2,500",
    desc: "A classic inauguration gift that has quietly stayed relevant: a well-made wall or desk clock for the reception marks the office's 'time begins now' moment. Choose a design-forward piece, and have the presentation box engraved with the inauguration date.",
  },
  {
    name: "6. Zen Decor: Aquarium, Fountain, or Garden Tray — ₹600–3,000",
    desc: "A small tabletop fountain, zen garden tray, or low-maintenance aquarium setup gives the reception or breakout corner a calming focal point. Pick self-contained, low-upkeep options - the gift should add serenity, not a maintenance chore.",
  },
]

const FOR_THE_PEOPLE = [
  {
    name: "7. Sweet Boxes for Opening Day — ₹150–500 per box",
    desc: "Inauguration day runs on sweets. Individual boxes of Mysore Pak, dry-fruit assortments, or premium chocolates handed to every guest and employee are the simplest gesture that no opening ceremony should skip. Order 10–15% extra; sweets always run out.",
  },
  {
    name: "8. Branded Welcome Kits for the Team — ₹800–1,500 per kit",
    desc: "Moving into a new office is a day-one moment for the whole team. A kit with a notebook, bottle, and tee marking the new address turns relocation chaos into an occasion - MintBox assembles these from ₹800 per kit at MOQ 10.",
  },
  {
    name: "9. Plant Saplings for Every Guest — ₹80–200 each",
    desc: "A small sapling or succulent handed to each attendee is the giveaway guests actually keep - and it photographs beautifully in inauguration posts. Tie a card with the company name and opening date to each pot.",
  },
  {
    name: "10. Personalised Desk Items — ₹200–600 each",
    desc: "Nameplates, engraved pen stands, or coasters marking the move ('New office, new chapter') give every employee a personal stake in the new space. Small, useful, and tied to the date - the formula for desk items that survive desk cleanups.",
  },
  {
    name: "11. Snack Hampers for Teams & Neighbours — ₹500–1,200",
    desc: "Shared snack hampers for each team - and one for the neighbouring offices - spread the celebration beyond the ribbon-cutting. A gourmet mix of dry fruits, cookies, and savouries covers all dietary lines safely.",
  },
  {
    name: "12. Commemorative Mementos — ₹400–1,500",
    desc: "A small engraved memento marking the inauguration date - for founders, chief guests, and the project team who delivered the fit-out. See our corporate memento ideas guide for engraving styles and inscription lines that work.",
  },
]

const ETIQUETTE_POINTS = [
  {
    title: "Time gifts to the pooja, not the party",
    desc: "Most office inaugurations in India begin with a pooja at a muhurat time, often early morning. Gifts for the office (brass lamp, plants) should arrive before or at the ceremony; team kits and giveaways can wait for the office-warming gathering after.",
  },
  {
    title: "What partners and vendors typically send",
    desc: "The unwritten convention: vendors and service partners send plants, brass decor, or sweets (₹500–1,500 range); close business partners and investors go bigger - wall art, pantry equipment, or premium hampers (₹2,000–5,000). Sending nothing is noticed; overspending can be awkward. Match your relationship.",
  },
  {
    title: "Budget bands that fit the occasion",
    desc: "₹500–1,000 covers a respectable plant or sweets-and-card combo; ₹1,000–2,500 suits most vendor relationships; ₹2,500–5,000 is partner-and-investor territory. Whatever the band, include a handwritten congratulations card - it is read aloud more often than you would think.",
  },
]

const FAQ_ITEMS = [
  {
    q: "What is a good gift for an office inauguration?",
    a: "The most appreciated office inauguration gifts are indoor plants in quality planters (₹300–2,000), brass decor or a diya for the pooja (₹500–3,000), wall art for the new space, and sweet boxes for everyone present on opening day. Pair any gift with a handwritten congratulations card mentioning the company and the new address.",
  },
  {
    q: "What should a vendor gift a client for their new office opening?",
    a: "Vendors typically send a plant with a nameplate, brass decor, or premium sweets in the ₹500–1,500 range - thoughtful without being extravagant. If the client relationship is significant, step up to wall art or a pantry contribution (₹2,000–5,000). Avoid heavily self-branded items; the day is about their milestone, not your logo.",
  },
  {
    q: "Are plants a good office inauguration gift?",
    a: "Yes - plants are the single safest inauguration gift. They symbolise growth, suit the pooja-day setting, and improve the new space permanently. Choose low-maintenance varieties (money plant, snake plant, ZZ plant) in a good planter, and attach a card with the inauguration date.",
  },
  {
    q: "How much should I spend on an office inauguration gift?",
    a: "Budget by relationship: ₹500–1,000 for acquaintances and standard vendor relationships, ₹1,000–2,500 for regular business partners, ₹2,500–5,000 for close partners and investors. For gifting the whole team inside the new office, per-person items run ₹150–500 (sweets, saplings) to ₹800–1,500 (welcome kits) - see our <a href=\"/guides/office-gift-ideas\">office gift ideas guide</a> for more per-occasion budgets.",
  },
  {
    q: "Can MintBox deliver inauguration gifts same-day in Bangalore?",
    a: "Yes. MintBox offers <a href=\"/bangalore-corporate-gifting/same-day-delivery\">same-day delivery within Bangalore</a> for inauguration-day sweets, plants, and hampers, plus 48-hour express assembly for bulk team kits. Share the muhurat date and we will work the dispatch backwards from it - quotes within 24 hours.",
  },
]

export default function InaugurationGiftsClient({ products, categories }: Props) {
  const allItems = [...FOR_THE_OFFICE, ...FOR_THE_PEOPLE]
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Office Inauguration Gifts", "item": "https://themintbox.in/guides/office-inauguration-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "12 Office Inauguration Gift Ideas (2026)",
        "description": "12 thoughtful office inauguration gift ideas - for the new office and for opening-day guests, with ₹500–5,000 budget bands and Indian etiquette tips.",
        "url": "https://themintbox.in/guides/office-inauguration-gifts",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "12 Office Inauguration Gift Ideas",
        "itemListElement": allItems.map((item, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": item.name.replace(/^\d+\.\s*/, ''),
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
              <span className="cp-breadcrumb-current">Office Inauguration Gifts</span>
            </nav>
            <div className="cp-hero-eyebrow">New Beginnings · Openings & Poojas</div>
            <h1 className="cp-hero-title">
              12 Office Inauguration Gift Ideas<br />
              <em>For the Space & the People (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              An office inauguration gift has two possible audiences: the new office itself, and
              the people celebrating in it on opening day. This guide covers both - six gifts for
              the space, six for the guests and team, with real ₹ budgets and the etiquette that
              Indian office openings quietly run on.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See All 12 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Gifts from ₹80/unit</span>
              <span className="cp-hero-badge">✓ Same-day in Bangalore</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ GST invoicing</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" alt="Newly inaugurated office interior ready for opening-day gifts" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Green plants - a classic office inauguration gift idea" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best office inauguration gifts split two ways: for the office itself - indoor plants, brass decor and a diya for the pooja, wall art, or a pantry coffee setup (₹500–5,000); and for opening-day attendees - sweet boxes, plant saplings, and welcome kits (₹150–1,500 per person). Time delivery to the pooja, and always add a handwritten card."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "Same-day delivery within Bangalore for opening days",
              "In-house branding, engraving, and kit assembly",
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
              <div className="cp-stat-value">48hr</div>
              <div className="cp-stat-label">Express Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GIFTS FOR THE OFFICE */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Ideas 1–6 · For the Space</div>
          <h2 className="cp-section-title">Office Inauguration Gift Ideas for the New Office</h2>
          <p className="cp-section-sub">
            What partners, vendors, and well-wishers send to the office itself - gifts that stay
            in the space and keep telling the story of who showed up on day one.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {FOR_THE_OFFICE.map((item) => (
              <div key={item.name} className="cp-card">
                <div className="cp-card-title">{item.name}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GIFTS FOR THE PEOPLE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Ideas 7–12 · For the People</div>
          <h2 className="cp-section-title">Opening-Day Gifts for Guests, Staff & Neighbours</h2>
          <p className="cp-section-sub">
            What the host company hands out on inauguration day - from sweets for every guest to
            kits that make the team feel the move. For engraved keepsakes, our{' '}
            <a href="/guides/corporate-memento-ideas">corporate memento ideas guide</a> goes
            deeper on inscriptions and lead times.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {FOR_THE_PEOPLE.map((item) => (
              <div key={item.name} className="cp-card">
                <div className="cp-card-title">{item.name}</div>
                <p className="cp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ETIQUETTE */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Getting It Right</div>
          <h2 className="cp-section-title">Office Inauguration Gifting Etiquette in India</h2>
          <p className="cp-section-sub">
            Indian office openings follow conventions nobody writes down. Here are the three that
            matter most for gifting.
          </p>
          <div className="cp-steps">
            {ETIQUETTE_POINTS.map((point, i) => (
              <div key={point.title} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{point.title}</div>
                  <div className="cp-step-desc">{point.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Ready to Order</div>
          <h2 className="cp-section-title">Browse Inauguration-Ready Gift Products</h2>
          <p className="cp-section-sub">
            Plants, hampers, kits, and mementos suitable for office openings - filter by budget
            band.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Inauguration Gifts"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80" alt="Team celebrating an office inauguration with gifts and sweets" loading="lazy" />
      </figure>

      {/* 8. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            Years later, nobody remembers the ribbon. They remember the plant that is now taller
            than the bookshelf - and the card tied to it on day one.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 9. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Opening Day</div>
            <h2 className="cp-cta-title">Plan Your<br />Inauguration Gifting</h2>
            <p className="cp-cta-sub">
              Share the opening date, guest count, and budget - we will plan sweets, kits, and
              keepsakes backwards from your muhurat, with same-day delivery in Bangalore.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get an Inauguration Quote"
              ctaLabel="Get Opening-Day Quote"
              defaultOccasion="corporate_event"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Office Inauguration Gifts - Frequently Asked Questions"
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
              { label: 'Mementos', title: 'Corporate Memento & Award Ideas', href: '/guides/corporate-memento-ideas' },
              { label: 'Bangalore', title: 'Same-Day Delivery in Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { label: 'Occasions', title: 'Office Gift Ideas', href: '/guides/office-gift-ideas' },
              { label: 'Clients', title: 'Corporate Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Collection', title: 'All Corporate Gifts', href: '/collections/corporate-gifts' },
              { label: 'Local Hub', title: 'Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' },
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
