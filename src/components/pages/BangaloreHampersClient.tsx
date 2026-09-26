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

const HAMPERS = [
  {
    rank: "1",
    name: "Festive Dry-Fruit & Sweets Hamper — ₹800–1,500",
    desc: "The Diwali workhorse: almonds, cashews, and raisins in reusable jars, plus a box of mithai and a diya or two. Safe across dietary preferences and seniority levels, which is why it never goes out of rotation.",
    note: "Check sweet shelf life if delivery is staggered across a week - dry fruits forgive delays, fresh mithai does not.",
  },
  {
    rank: "2",
    name: "Gourmet Snack Hamper — ₹1,000–2,000",
    desc: "Artisan cookies, flavoured makhana, granola bars, hummus-style dips, and a premium chocolate bar. Reads younger and more current than the dry-fruit classic, and suits year-round occasions, not just festivals.",
    note: "Ask for the packed-on dates; gourmet brands have shorter shelf lives than commodity snacks.",
  },
  {
    rank: "3",
    name: "Wellness / Self-Care Hamper — ₹1,200–2,500",
    desc: "Herbal teas, a scented candle, essential-oil roll-on, bath salts, and a small journal. The strongest post-appraisal and burnout-season gift in the lineup, and a reliable Women's Day option done tastefully.",
    note: "Skip strong fragrances at volume - mild, universally likeable scents get fewer desk-drawer burials.",
  },
  {
    rank: "4",
    name: "Coffee-Lover's Bangalore Hamper — ₹900–1,800",
    desc: "The local hero: South Indian filter coffee powder from a Bangalore roaster, a traditional dabara-tumbler set or branded mug, and a couple of biscotti. In a coffee-proud city, this one gets photographed and posted.",
    note: "A MintBox favourite to assemble - we source roaster-fresh powder and brand the mug in-house.",
  },
  {
    rank: "5",
    name: "Desk Essentials Hamper — ₹700–1,400",
    desc: "A5 notebook, pen, sticky-note set, cable organiser, and a sipper bottle - the practical daily-use kit. The highest usage-per-rupee option here, ideal for onboarding batches and large teams.",
    note: "This is where logo branding belongs - people genuinely carry these items around the office.",
  },
  {
    rank: "6",
    name: "Eco / Green Hamper — ₹800–1,600",
    desc: "A desk plant in a ceramic planter, seed-paper stationery, a bamboo pen, and a jute pouch. Lands especially well with sustainability-conscious teams and ESG-minded clients.",
    note: "Live plants need same-day or next-day delivery locally - a plant that spends three days in a courier box arrives as compost.",
  },
  {
    rank: "7",
    name: "Luxury Executive Hamper — ₹3,000–8,000",
    desc: "Leather accessories, a premium pen, single-origin chocolates, artisan tea or coffee, presented in a rigid keepsake box. For CXO gifting, board members, and top-tier clients - quantity is small, presentation is everything.",
    note: "Add a handwritten note from your leadership; at this price point the note carries half the impact.",
  },
  {
    rank: "8",
    name: "New-Joinee Welcome Hamper — ₹1,200–2,200",
    desc: "Branded T-shirt or hoodie, bottle, notebook, pen, and a welcome card, boxed to be photographed for the day-one LinkedIn post. MintBox assembles these as standing programmes with ready stock for monthly joiner batches.",
    note: "Collect T-shirt sizes during offer acceptance, not on joining day - it saves every batch.",
  },
  {
    rank: "9",
    name: "Diwali Premium Hamper — ₹1,500–3,500",
    desc: "The upgraded festive tier: dry fruits plus gourmet additions, a brass diya or small decor piece, and premium rigid-box packaging. This is the client-facing Diwali gift, one level above the employee batch.",
    note: "Diwali 2026 falls in early November - lock orders by October 15 to get this tier delivered on time.",
  },
  {
    rank: "10",
    name: "Custom Branded Hamper — ₹1,000+",
    desc: "Built to your brief: pick the box, contents, colour story, and branding level, from subtle sleeve to fully custom packaging. Cost scales with contents - the ₹1,000 floor buys a clean 3-4 item build.",
    note: "MintBox builds these from a 200-product catalog at MOQ 10, with a physical sample before the bulk run on orders of 100+ units.",
  },
]

const BRIEFING = [
  {
    title: "The 60 / 25 / 15 budget rule",
    desc: "Split any hamper budget: roughly 60% on contents, 25% on packaging, 15% on branding. A ₹1,500 hamper with ₹900 of genuine contents feels generous; the same budget blown on a fancy box around two chocolates feels like marketing.",
  },
  {
    title: "Fix the headline item first",
    desc: "Every good hamper has one item people remember - the filter coffee, the plant, the leather notebook. Choose that first, then build supporting items around it. Five forgettable items lose to three where one is a star.",
  },
  {
    title: "Brief quantities honestly",
    desc: "Give your vendor the real number plus 3-5% buffer for new joiners, misses, and damaged units. Reprinting packaging for 12 extra hampers costs more per unit than the buffer ever will.",
  },
  {
    title: "Bangalore delivery logistics",
    desc: "In-stock hampers can move same-day within Bangalore; custom builds need 3-5 business days, 48 hours on express. For tech parks (Whitefield, Electronic City, Manyata), name a receiving contact and book a delivery window - security gates eat unplanned hours.",
  },
]

const FAQ_ITEMS = [
  {
    q: "How much do corporate gift hampers cost in Bangalore?",
    a: "Typical Bangalore pricing: ₹700-1,400 for desk-essentials hampers, ₹800-1,500 for festive dry-fruit hampers, ₹1,000-2,500 for gourmet and wellness builds, and ₹3,000-8,000 for luxury executive hampers. Bulk pricing improves above 100 units, and packaging choice can swing cost by 20-30% at any tier.",
  },
  {
    q: "What is the minimum order quantity for corporate hampers?",
    a: "Most Bangalore vendors ask 50-100 hampers minimum for custom builds. MintBox works from 10 units, which suits startups and smaller teams.",
  },
  {
    q: "Can I get same-day gift hamper delivery in Bangalore?",
    a: "Yes, for ready-stock hampers. MintBox delivers in-stock hampers same-day across Bangalore; custom-branded hampers need 3-5 business days, or 48 hours on express. Our <a href=\"/bangalore-corporate-gifting/same-day-delivery\">same-day delivery guide</a> covers zone-wise cut-off times.",
  },
  {
    q: "Can corporate hampers be customised with our branding?",
    a: "Yes - at three levels: a branded sleeve or ribbon on a standard hamper (cheapest), logo-printed items inside the box, or fully custom packaging designed around your brand colours. Level two is the sweet spot for most orders; full custom packaging makes sense above roughly 100 units.",
  },
  {
    q: "Does MintBox build custom hampers in Bangalore?",
    a: "Yes. Pick contents from our 200-product catalog or give us a budget and a theme - we design the build, courier a physical sample for approval (orders of 100+ units), and produce the batch with in-house branding. MOQ 10 hampers, quotes within 24 hours, GST invoice included, same-day Bangalore delivery on ready stock.",
  },
]

export default function BangaloreHampersClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Bangalore Corporate Gifting", "item": "https://themintbox.in/bangalore-corporate-gifting" },
          { "@type": "ListItem", "position": 3, "name": "Gift Hampers", "item": "https://themintbox.in/bangalore-corporate-gifting/gift-hampers" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Top 10 Corporate Gift Hampers in Bangalore (2026)",
        "description": "The 10 best corporate gift hampers in Bangalore, ranked with prices from ₹700 to ₹8,000 - contents, MOQs, and same-day delivery notes.",
        "url": "https://themintbox.in/bangalore-corporate-gifting/gift-hampers",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top 10 Corporate Gift Hampers in Bangalore (2026)",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Festive Dry-Fruit & Sweets Hamper" },
          { "@type": "ListItem", "position": 2, "name": "Gourmet Snack Hamper" },
          { "@type": "ListItem", "position": 3, "name": "Wellness / Self-Care Hamper" },
          { "@type": "ListItem", "position": 4, "name": "Coffee-Lover's Bangalore Hamper" },
          { "@type": "ListItem", "position": 5, "name": "Desk Essentials Hamper" },
          { "@type": "ListItem", "position": 6, "name": "Eco / Green Hamper" },
          { "@type": "ListItem", "position": 7, "name": "Luxury Executive Hamper" },
          { "@type": "ListItem", "position": 8, "name": "New-Joinee Welcome Hamper" },
          { "@type": "ListItem", "position": 9, "name": "Diwali Premium Hamper" },
          { "@type": "ListItem", "position": 10, "name": "Custom Branded Hamper" }
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
              <span className="cp-breadcrumb-current">Gift Hampers</span>
            </nav>
            <div className="cp-hero-eyebrow">Hamper Guide · Bangalore · 2026</div>
            <h1 className="cp-hero-title">
              Top 10 Corporate Gift Hampers in Bangalore<br />
              <em>Ranked with Prices (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The corporate gift hampers Bangalore companies actually order - ranked with real
              price ranges from ₹700 to ₹8,000, what goes inside each, and the delivery notes
              that save you a logistics headache.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See the 10 Hampers ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ ₹700–8,000 covered</span>
              <span className="cp-hero-badge">✓ MOQ 10 hampers</span>
              <span className="cp-hero-badge">✓ Custom builds available</span>
              <span className="cp-hero-badge">✓ Same-day on ready stock</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Corporate gift hamper basket assembled in Bangalore" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" alt="Gift-wrapped corporate hampers ready for Bangalore delivery" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best corporate gift hampers in Bangalore range from ₹700 desk-essentials kits to ₹8,000 luxury executive builds. Top picks: festive dry-fruit hampers (₹800–1,500), gourmet snack hampers (₹1,000–2,000), wellness hampers (₹1,200–2,500), and filter-coffee hampers (₹900–1,800). Custom branded hampers start around ₹1,000; MintBox's minimum order is 10 units."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients in Bangalore and beyond",
              "50,000+ gifts and hampers delivered since 2019",
              "Hampers assembled and branded in-house",
              "Same-day Bangalore delivery on ready-stock hampers",
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
          <h2 className="cp-section-title">The 10 Best Corporate Gift Hampers in Bangalore</h2>
          <p className="cp-section-sub">
            Ranked by how consistently they land across teams and occasions. Prices are per-hamper
            bulk ranges at typical Bangalore order volumes; two or three of these are builds we
            assemble at MintBox, flagged where relevant.
          </p>
          <div className="cp-steps">
            {HAMPERS.map((h) => (
              <div key={h.rank} className="cp-step">
                <div className="cp-step-num">{h.rank}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{h.name}</div>
                  <div className="cp-step-desc">{h.desc}</div>
                  <div className="cp-step-desc" style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.85 }}>
                    {h.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW TO BRIEF A HAMPER */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Briefing &amp; Logistics</div>
          <h2 className="cp-section-title">How to Brief a Corporate Hamper (and Get It Delivered)</h2>
          <p className="cp-section-sub">
            A good hamper is a budgeting exercise before it is a shopping exercise. Four rules
            that separate hampers people keep from hampers people re-gift - and if this is a
            Diwali order, our <a href="/guides/corporate-diwali-gift-hampers">Diwali hamper guide</a>{' '}
            has the full festive timeline.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {BRIEFING.map((item) => (
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
          <div className="cp-section-eyebrow">Build Your Hamper</div>
          <h2 className="cp-section-title">Browse Hamper Contents and Ready Gift Sets</h2>
          <p className="cp-section-sub">
            Mix and match from the catalog below to build a custom hamper, or pick a ready set -
            everything can be branded in-house and delivered across Bangalore.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Gift Hampers in Bangalore"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" alt="Premium corporate gift hamper in Bangalore with festive red packaging" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A hamper is the only corporate gift that gets opened in front of other people. Budget
            for that moment - one memorable headline item beats five fillers, every single time.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Custom Hampers</div>
            <h2 className="cp-cta-title">Get Your Hamper<br />Designed &amp; Quoted</h2>
            <p className="cp-cta-sub">
              Share your budget per hamper, quantity, and occasion - we send a build suggestion
              and full quote within {QUOTE_TIME}, with a physical sample before the bulk run on orders of 100+ units.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Hamper Quote"
              ctaLabel="Request Hamper Quote"
              defaultOccasion="client_gifting"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Gift Hampers in Bangalore - FAQs"
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
              { label: 'Collections', title: 'Shop All Gift Hampers', href: '/collections/hampers' },
              { label: 'Top Vendors', title: 'Top Gifting Companies in Bangalore', href: '/bangalore-corporate-gifting/top-companies' },
              { label: 'Diwali', title: 'Corporate Diwali Gift Hampers', href: '/guides/corporate-diwali-gift-hampers' },
              { label: 'Same-Day', title: 'Same-Day Gift Delivery in Bangalore', href: '/bangalore-corporate-gifting/same-day-delivery' },
              { label: 'Premium', title: 'Luxury Corporate Gifts', href: '/guides/luxury-corporate-gifts' },
              { label: 'Local Flavour', title: 'Famous Bangalore Gifts for Hampers', href: '/bangalore-corporate-gifting/famous-bangalore-gifts' },
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
