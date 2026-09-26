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
    name: "Classic Dry Fruit Hamper",
    price: "₹800–1,500",
    contents: "Almonds, cashews, pistachios and raisins in a reusable wooden or tin box, with a festive card.",
    note: "The safest choice for a mixed office - no dietary landmines, long shelf life. Spend a little extra on packaging the recipient will reuse; that box on their shelf is your brand working past the festival.",
  },
  {
    name: "Sweets + Diya Hamper",
    price: "₹600–1,200",
    contents: "A mithai box (kaju katli, soan papdi or motichoor ladoo), a pair of brass or clay diyas, and a greeting card.",
    note: "The most traditional pick, but fresh sweets have a 5–7 day shelf life - schedule delivery inside Diwali week, not two weeks before. For outstation teams, switch to tinned or dry sweets.",
  },
  {
    name: "Gourmet Snack Hamper",
    price: "₹1,500–2,500",
    contents: "Dark chocolate, flavoured makhana, artisanal cookies, honey or preserves, and a savoury mix.",
    note: "For teams that have received the same dry-fruit box five Diwalis running. Everything here is sealed and courier-stable, so it travels well to remote employees.",
  },
  {
    name: "Wellness Hamper",
    price: "₹1,200–2,000",
    contents: "Herbal tea sampler, an aromatherapy candle, a dry fruit mix, and bath salts or a sleep balm.",
    note: "Positions the company as caring about recovery, not just celebration. Lands especially well after a heavy Q3 - HR teams reorder this one year after year.",
  },
  {
    name: "Eco Diwali Hamper",
    price: "₹800–1,600",
    contents: "Seed-paper diyas and cards, terracotta tealight holders, organic snacks, packed in a jute basket.",
    note: "Zero-waste and photogenic - these hampers get shared on LinkedIn more than any other type. A natural fit if sustainability is already part of your brand story.",
  },
  {
    name: "Premium Executive Hamper",
    price: "₹3,000–6,000",
    contents: "A leather accessory or premium barware piece, single-origin coffee, luxury chocolate, and dry fruits in a silk pouch.",
    note: "Reserve this tier for leadership and your most important clients. Presentation matters more than contents here - insist on rigid boxes, ribbon and a handwritten note.",
  },
  {
    name: "Snack-Box Team Hamper",
    price: "₹500–900",
    contents: "Individually portioned namkeen, roasted makhana, cookies and a chocolate bar in a branded mailer box.",
    note: "The workhorse for 200+ headcounts - light, courier-safe and easy to hand out at desks. MintBox assembles these from ₹500 per box at an MOQ of 10 units.",
  },
  {
    name: "Silver-Touch Hamper",
    price: "₹2,500+",
    contents: "A silver-plated coin, bowl or diya, paired with premium sweets and dry fruits.",
    note: "Traditional gravitas for long-standing client relationships - the silver piece is kept for years. Verify plating quality with a sample before committing to bulk.",
  },
  {
    name: "Coffee & Tea Festive Trunk",
    price: "₹1,200–2,200",
    contents: "Filter coffee or a specialty tea selection, a pair of mugs, and cookies in a keepsake trunk box.",
    note: "A strong Bangalore angle - locally roasted filter coffee reads as thoughtful, not generic. The trunk itself becomes desk storage after the festival.",
  },
  {
    name: "Personalised Family Hamper",
    price: "₹1,000–2,000",
    contents: "Family-sized sweets and snacks, a board game or puzzle, and a card printed with the employee's name.",
    note: "Diwali is a family festival - gifting to the household, not just the employee, is remembered longer than anything addressed to a desk.",
  },
  {
    name: "WFH Remote-Employee Hamper",
    price: "₹800–1,500",
    contents: "Sealed dry fruits, tinned sweets, a scented candle and a festive card - nothing fresh or fragile.",
    note: "Built to survive a 3–5 day courier journey. MintBox ships these pan-India from Bangalore with tracking shared per recipient, so HR is not fielding \"where is my hamper\" messages.",
  },
  {
    name: "Budget Bulk Hamper",
    price: "Under ₹500",
    contents: "A pair of diyas, a small dry-fruit pouch, a chocolate bar and a printed greeting card.",
    note: "Proof that a tight budget does not mean a forgettable gift - good packaging does most of the work at this tier. Ideal for extended workforce, contractors and support staff.",
  },
]

const TIMELINE = [
  {
    title: "By September 30 — Finalise",
    desc: "Lock your hamper type, budget per head and headcount. Collect delivery addresses for remote employees now - address-chasing is what actually delays Diwali orders.",
  },
  {
    title: "By October 15 — Place the Order",
    desc: "The hard deadline for customised bulk hampers. Production slots and packaging stock run out fast in the two weeks before Diwali; after this date you are choosing from ready stock.",
  },
  {
    title: "By October 22 — Outstation Dispatch",
    desc: "Couriered hampers for teams outside Bangalore should leave by this date to comfortably beat the festival rush and arrive before Diwali in early November.",
  },
  {
    title: "Diwali Week — Local Delivery",
    desc: "Within Bangalore, same-day and next-day hamper delivery is possible right up to festival week - useful for last-minute additions to the list.",
  },
]

const FAQ_ITEMS = [
  {
    q: "What are the best Diwali hampers for employees?",
    a: "For most teams, the classic dry fruit hamper (₹800–1,500) or a snack-box hamper (₹500–900) works best - long shelf life, no dietary issues, easy to distribute. For leadership, step up to a premium executive hamper at ₹3,000–6,000. See our full guide to <a href=\"/guides/diwali-gifts-for-employees\">Diwali gifts for employees</a> for non-hamper ideas too.",
  },
  {
    q: "How much do corporate Diwali gift hampers cost?",
    a: "Budget bulk hampers start under ₹500 per unit, mid-range hampers (dry fruits, gourmet, eco) run ₹800–2,500, and premium executive hampers cost ₹3,000–6,000. Most companies budget ₹500–1,500 per employee and ₹1,500–3,000 per client, with volume pricing kicking in at 50+ units.",
  },
  {
    q: "When should I order Diwali hampers for my company?",
    a: "Finalise your selection by September 30 and place the bulk order by October 15, 2026. Diwali falls in early November 2026, and production slots for customised hampers fill up through October. Orders placed after October 15 are generally limited to ready-stock hampers.",
  },
  {
    q: "Which hamper contents are courier-safe for remote employees?",
    a: "Sealed dry fruits, tinned or dry sweets (soan papdi travels; motichoor ladoo does not), packaged snacks, candles, diyas and non-fragile décor. Avoid fresh mithai, glass jars and anything heat-sensitive. A well-packed courier-safe hamper survives a 3–5 day journey anywhere in India.",
  },
  {
    q: "Can I mix hamper budgets for different teams?",
    a: "Yes, and most companies should. A typical split: <a href=\"/guides/corporate-gifts-under-500\">under-₹500 hampers</a> for extended workforce, ₹800–1,500 for the core team, and ₹3,000+ for leadership and key clients. Keep the packaging visually consistent across tiers so nobody feels short-changed.",
  },
  {
    q: "Can MintBox build custom Diwali hampers for my company?",
    a: "Yes. MintBox assembles custom Diwali hampers from ₹500 to ₹6,000+ per unit at an MOQ of 10, with branded packaging, logo sleeves and personalised cards done in-house in Bangalore. Quotes go out within 24 hours; standard bulk turnaround is 3–5 business days.",
  },
]

export default function DiwaliHampersClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Diwali Gift Hampers", "item": "https://themintbox.in/guides/corporate-diwali-gift-hampers" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Top 12 Corporate Diwali Gift Hampers (2026)",
        "description": "Top 12 corporate Diwali gift hampers for 2026, ranked with prices and contents - from snack boxes under ₹500 to executive hampers. Order by Oct 15.",
        "url": "https://themintbox.in/guides/corporate-diwali-gift-hampers",
        "dateModified": `${PAGE_UPDATED}T00:00:00+05:30`,
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top 12 Corporate Diwali Gift Hampers (2026)",
        "itemListElement": HAMPERS.map((h, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${h.name} — ${h.price}`,
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
              <span className="cp-breadcrumb-current">Diwali Gift Hampers</span>
            </nav>
            <div className="cp-hero-eyebrow">Diwali 2026 · Ranked List</div>
            <h1 className="cp-hero-title">
              Top 12 Corporate Diwali Gift Hampers<br />
              <em>Ranked with Prices (2026)</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The 12 corporate Diwali gift hampers that actually land in 2026 - ranked, priced
              and broken down by contents. From budget bulk hampers under ₹500 to premium
              executive builds at ₹6,000, with the October 15 ordering deadline you need to hit.
            </p>
            <div className="cp-hero-ctas">
              <a href="#list" className="cp-hero-cta-primary">See the Top 12 ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ Order by Oct 15, 2026</span>
              <span className="cp-hero-badge">✓ MOQ 10 units</span>
              <span className="cp-hero-badge">✓ Custom branding in-house</span>
              <span className="cp-hero-badge">✓ Pan-India courier</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Corporate Diwali gift hampers packed in festive baskets" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80" alt="Festive red gift boxes ready for Diwali corporate gifting" className="cp-hero-img-actual" loading="lazy" />
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
            content="The best corporate Diwali gift hampers for 2026 range from budget snack boxes under ₹500 to premium executive hampers at ₹3,000–6,000. Classic dry fruit hampers (₹800–1,500) remain the safest team-wide pick, with eco and gourmet hampers rising fast. Order by October 15 to get customised hampers delivered before Diwali in early November."
          />
          <EATSignal
            credentials={[
              "200+ corporate clients across India",
              "50,000+ gifts delivered since 2019",
              "Custom hamper assembly and branding in-house",
              "MOQ 10 units, quotes within 24 hours",
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

      {/* 4. THE MAIN LIST */}
      <section id="list" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Ranked List</div>
          <h2 className="cp-section-title">The Top 12 Corporate Diwali Gift Hampers for 2026</h2>
          <p className="cp-section-sub">
            Ranked by how well they work for corporate teams - shelf life, courier safety,
            branding potential and per-unit value. Budgets tight? Numbers 7 and 12 pair well
            with our guide to <a href="/guides/corporate-gifts-under-500">corporate gifts under ₹500</a>.
          </p>
          <div className="cp-steps">
            {HAMPERS.map((hamper, i) => (
              <div key={hamper.name} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {hamper.name}
                    <span
                      style={{
                        marginLeft: '12px',
                        fontSize: '0.85em',
                        fontWeight: 400,
                        color: 'var(--forest-green, #1B4D3E)',
                        opacity: 0.75,
                      }}
                    >
                      {hamper.price}
                    </span>
                  </div>
                  <div className="cp-step-desc">
                    <strong>Inside:</strong> {hamper.contents}
                  </div>
                  <div
                    className="cp-step-desc"
                    style={{ marginTop: '4px', fontStyle: 'italic', opacity: 0.8 }}
                  >
                    {hamper.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ORDERING TIMELINE */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Plan Backwards</div>
          <h2 className="cp-section-title">Diwali 2026 Hamper Ordering Timeline</h2>
          <p className="cp-section-sub">
            Diwali 2026 falls in early November, and every gifting vendor in the country hits
            capacity through October. Work backwards from the festival - and if you are gifting
            employees and clients separately, our <a href="/guides/diwali-corporate-gifts">Diwali
            corporate gifting guide</a> covers the full programme, not just hampers.
          </p>
          <div className="cp-card-grid cp-card-grid--2">
            {TIMELINE.map((item) => (
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
          <h2 className="cp-section-title">Browse Diwali Hamper Products</h2>
          <p className="cp-section-sub">
            Mix and match from the MintBox catalog to build a hamper at your exact budget.
            Filter by price to match the tiers above.
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
        <img src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80" alt="Assembled corporate Diwali gift hampers ready for bulk dispatch" loading="lazy" />
      </figure>

      {/* 7. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            A Diwali hamper is opened in front of the whole family. It is the one corporate
            gift of the year with an audience - build it like people are watching, because they are.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 8. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Diwali 2026</div>
            <h2 className="cp-cta-title">Lock Your Diwali<br />Hamper Order</h2>
            <p className="cp-cta-sub">
              Tell us your headcount, budget per hamper and delivery cities - we will send a
              detailed quote within {QUOTE_TIME}. Production slots for customised hampers close
              October 15.
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

      <MidPageCTA variant="catalog" />

      {/* 9. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Diwali Gift Hampers - Frequently Asked Questions"
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
              { label: 'Employees', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
              { label: 'Clients', title: 'Diwali Gifts for Clients', href: '/guides/diwali-gifts-for-clients' },
              { label: 'Collection', title: 'Gift Hampers Collection', href: '/collections/hampers' },
              { label: 'Bangalore', title: 'Corporate Gift Hampers in Bangalore', href: '/bangalore-corporate-gifting/gift-hampers' },
              { label: 'Budget', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
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
