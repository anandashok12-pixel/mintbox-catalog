'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import ContentProductShowcase from '@/components/content/ContentProductShowcase'
import FAQSection from '@/components/content/FAQSection'
import InlineQuoteForm from '@/components/content/InlineQuoteForm'
import QuickAnswerBox from '@/components/content/QuickAnswerBox'
import EATSignal from '@/components/content/EATSignal'
import LastUpdatedDate from '@/components/content/LastUpdatedDate'
import MidPageCTA from '@/components/content/MidPageCTA'

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

const DECISION_STEPS = [
  {
    num: '01',
    title: 'Define the Recipient',
    desc: "Employee (what team, what level?), client (existing vs. prospect), or event attendee. Gifts for employees should reflect culture; client gifts should reflect your brand's quality positioning.",
  },
  {
    num: '02',
    title: 'Identify the Occasion',
    desc: 'Onboarding, Diwali, work anniversary, conference, client appreciation, or recognition? Occasion sets the tone (celebratory vs. functional) and appropriate budget range.',
  },
  {
    num: '03',
    title: 'Set Your Budget per Head',
    desc: '₹100–₹200 (event giveaways), ₹300–₹500 (standard occasions), ₹500–₹1,500 (quality gifting), ₹1,500–₹5,000 (premium/VIP). Always account for packaging and delivery in your budget.',
  },
  {
    num: '04',
    title: 'Decide on Personalisation',
    desc: 'Logo-only (standard, no extra cost at 50+ units), name personalisation (+₹30–₹80/unit), or custom packaging (custom box, +₹40–₹80/unit). Personalisation dramatically increases perceived value.',
  },
  {
    num: '05',
    title: 'Choose the Category',
    desc: 'Drinkware (daily utility), stationery (desk use), tech accessories (premium perception), hampers (celebratory occasions), eco-friendly (values alignment), apparel (team identity).',
  },
]

const AVOID_TABLE = [
  { gift: 'Desk calendars', why: 'Used for 2 weeks, then ignored', better: 'Quality notebook (used all year)' },
  { gift: 'Cheap branded pens', why: 'Breaks in days, lost quickly', better: 'Bamboo pen set + stand' },
  { gift: 'Generic chocolate box', why: 'No personalisation, no brand recall', better: 'Curated snack hamper with branded packaging' },
  { gift: 'Plastic water bottle', why: 'Feels cheap, health concerns', better: 'BPA-free stainless bottle' },
  { gift: 'Branded USB drive', why: 'Low perceived value, often lost', better: 'Wireless charger with logo engraving' },
  { gift: 'Plain tote bag', why: 'Overused, generic', better: 'Custom tote with quality print + inner lining' },
]

const OCCASION_CARDS = [
  {
    icon: '🎒',
    bg: 'cp-img-green',
    title: 'Onboarding Kit',
    desc: 'Notebook + bottle + tee + card. Budget ₹750–₹1,500.',
  },
  {
    icon: '🪔',
    bg: 'cp-img-gold',
    title: 'Diwali Gifting',
    desc: 'Hamper with drinkware + sweets + packaging. ₹500–₹2,000.',
  },
  {
    icon: '🏆',
    bg: 'cp-img-warm',
    title: 'Work Anniversary',
    desc: 'Engraved bottle or pen. Personal, lasting. ₹500–₹1,500.',
  },
  {
    icon: '🤝',
    bg: 'cp-img-mid',
    title: 'Client Appreciation',
    desc: 'Premium curated hamper. Quality over quantity. ₹1,500–₹5,000.',
  },
  {
    icon: '🎤',
    bg: 'cp-img-green',
    title: 'Conference Giveaway',
    desc: 'Branded tote + pen + notebook. ₹200–₹500.',
  },
  {
    icon: '🎉',
    bg: 'cp-img-warm',
    title: 'Team Celebration',
    desc: 'Swag box with tee + mug + note. ₹600–₹1,200.',
  },
]

const FAQS = [
  {
    q: 'What makes a corporate gift memorable?',
    a: "Three things: utility (they use it daily), personalisation (their name or your logo done well), and presentation (packaging that signals care). A ₹400 bottle in branded packaging with a handwritten note is more memorable than a ₹1,500 generic hamper in a plain box.",
  },
  {
    q: 'Should corporate gifts be branded with the company logo?',
    a: "For internal team gifts, subtle branding works best - a logo on the base of a bottle or inside a jacket collar. For client or prospect gifts, clear branding is appropriate. Over-branding (logo on every surface) feels promotional, not generous.",
  },
  {
    q: 'What gifts are appropriate for clients vs. employees?',
    a: "Clients: quality, premium items that reflect your brand positioning - curated hampers, premium tech, or personalised keepsakes. Employees: practical daily-use items that signal culture - notebooks, bottles, apparel, or experience kits. Both benefit from personalisation.",
  },
  {
    q: 'How do I choose between drinkware, stationery, and tech gifts?',
    a: "Drinkware (bottles, mugs) is the most versatile - works for all occasions and ages, highest daily utility. Stationery suits office-based teams. Tech accessories suit IT companies and premium gifting. Match the gift category to where the recipient spends their time.",
  },
  {
    q: 'Is it better to give one premium gift or a bundle of smaller items?',
    a: "For occasions like onboarding and Diwali, a bundle (3–4 complementary items) creates a richer experience. For work anniversaries and client gifting, one premium item with excellent packaging performs better. Avoid bundles that feel like leftovers thrown together.",
  },
  {
    q: 'How far in advance should I order corporate gifts?',
    a: "Standard orders: 7–10 business days. During Diwali season (October): order 3–4 weeks in advance - delays are common. For large orders (500+): allow 3–4 weeks. Same-day delivery in Bangalore is available for in-stock items only.",
  },
  {
    q: 'Can I request samples before placing a bulk order?',
    a: 'Yes. Physical samples are available for orders above ₹25,000. Sample delivery takes 2–3 days. We strongly recommend sampling for first-time orders - it eliminates surprises on quality, print placement, and colour accuracy.',
  },
]


export default function HowToChooseClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "How to Choose Corporate Gifts", "item": "https://themintbox.in/guides/how-to-choose-corporate-gifts" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Choose Corporate Gifts: A Practical 2026 Guide",
        "description": "Step-by-step guide to picking the right corporate gifts - by occasion, recipient, budget, and customisation. Avoid common mistakes. 200+ options from MintBox.",
        "url": "https://themintbox.in/guides/how-to-choose-corporate-gifts",
        "dateModified": "2026-05-26T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/guides/corporate-gifting-handbook">Guides</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">How to Choose Corporate Gifts</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Gift Selection Guide · Updated May 2026</div>
              <h1 className="cp-hero-title">
                How to Choose Corporate Gifts:<br />
                <em>A Practical 2026 Guide</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                A step-by-step framework for selecting the right corporate gift - by recipient, occasion,
                budget, and customisation. Avoid common mistakes and find gifts that get remembered.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse Gift Options ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get Free Consultation</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ Step-by-step framework</span>
                <span className="cp-hero-badge">✓ By occasion & recipient</span>
                <span className="cp-hero-badge">✓ Budget calculator</span>
                <span className="cp-hero-badge">✓ Free consultation</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1556742212-5b321f3c261b?auto=format&fit=crop&w=800&q=80" alt="Corporate gifting planning checklist" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" alt="Creative corporate gifting ideas workspace" className="cp-hero-img-actual" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AEO BAND ── */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content="Choosing corporate gifts comes down to four decisions: who you're gifting (employee, client, prospect), the occasion (onboarding, Diwali, anniversary), your budget per head (₹100–₹5,000), and whether personalisation is needed. Avoid generic gifts (diaries, calendars) in favour of useful, quality items that reflect your brand. The best gifts are used daily."
          />
          <EATSignal credentials={[
            '500+ companies guided through gift selection',
            'Dedicated gifting consultants for every order',
            '200+ products curated for every occasion and budget',
            'Sample approval before production',
            '96% client satisfaction rate',
          ]} />
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">200<span className="cp-stat-unit">+</span></div>
              <div className="cp-stat-label">Gift options curated</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">8<span className="cp-stat-unit"> occasions</span></div>
              <div className="cp-stat-label">Major occasions covered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹100<span className="cp-stat-unit">–₹5,000</span></div>
              <div className="cp-stat-label">Budget range served</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">1<span className="cp-stat-unit"> week</span></div>
              <div className="cp-stat-label">Standard turnaround</div>
            </div>
          </div>
        </div>
      </section>


      {/* ── DECISION FRAMEWORK ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Selection Framework</div>
          <h2 className="cp-section-title">5 Steps to the Right Corporate Gift</h2>
          <p className="cp-section-sub">
            Follow these steps in order. Each answer narrows the field until you have a clear,
            defensible choice that fits your occasion, recipient, and budget.
          </p>
          <div className="cp-steps">
            {DECISION_STEPS.map(step => (
              <div key={step.num} className="cp-step">
                <div className="cp-step-num">{step.num}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{step.title}</div>
                  <p className="cp-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Planning the right corporate gift selection for your team" loading="lazy" />
      </figure>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">All Options</div>
          <h2 className="cp-section-title">Browse 200+ Corporate Gift Options</h2>
          <p className="cp-section-sub">
            Search by category, filter by price, or browse all options. Click any product to
            add it to your quote.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts - Full Catalogue"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── AVOID TABLE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Common Mistakes</div>
          <h2 className="cp-section-title">What Not to Gift - and What to Do Instead</h2>
          <p className="cp-section-sub">
            These common gifts consistently underperform. Here is why they fall flat and
            what to choose instead.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Common Gift</th>
                  <th>Why It Falls Flat</th>
                  <th>Better Alternative</th>
                </tr>
              </thead>
              <tbody>
                {AVOID_TABLE.map(row => (
                  <tr key={row.gift}>
                    <td style={{ fontWeight: 500 }}>{row.gift}</td>
                    <td style={{ fontWeight: 300, color: 'rgba(26,26,24,0.6)' }}>{row.why}</td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.better}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Curated corporate gift packages ready for corporate clients" loading="lazy" />
      </figure>

      {/* ── OCCASION CARDS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Occasion Cheat-Sheet</div>
          <h2 className="cp-section-title">The Right Gift for Every Occasion</h2>
          <p className="cp-section-sub">
            Quick reference for the six most common corporate gifting occasions - what to give,
            and what to budget.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {OCCASION_CARDS.map(card => (
              <div key={card.title} className="cp-card">
                <div className={`cp-card-icon ${card.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {card.icon}
                </div>
                <div className="cp-card-title">{card.title}</div>
                <p className="cp-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE PULL ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            The one question that separates a memorable gift from a forgettable one:
            will the recipient use this every day? If yes, you've won.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Free Gift Consultation</div>
            <h2 className="cp-cta-title">Get a Free<br />Gift Consultation</h2>
            <p className="cp-cta-desc">
              Tell us your recipient, occasion, and budget and we will send back a curated
              shortlist of three options with real pricing - within 4 hours.
            </p>
            <div className="cp-cta-promises">
              {[
                'Personalised shortlist for your occasion',
                'Samples available before bulk order',
                'No obligation, no minimum',
                'Response within 4 business hours',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Get a Free Gift Consultation"
            subtitle="Tell us your occasion, recipient, and budget - we'll send personalised gift recommendations."
            ctaLabel="Start My Gift Search"
            defaultOccasion="other"
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="How to Choose Corporate Gifts - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides & Collections</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Collections', title: 'All Collections', href: '/collections/corporate-gifts' },
              { label: 'Gifting Guide', title: 'Budget Corporate Gifts', href: '/guides/budget-corporate-gifts' },
              { label: 'Personalisation', title: 'Personalised Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Budget Guide', title: 'Under ₹500 Gifts', href: '/guides/corporate-gifts-under-500' },
              { label: 'Seasonal', title: 'Diwali Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Collections', title: 'Hampers', href: '/collections/hampers' },
              { label: 'Handbook', title: 'The Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
            ].map(link => (
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
        <LastUpdatedDate date="2026-05-25" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
