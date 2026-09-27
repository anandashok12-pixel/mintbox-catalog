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

const PAGE_UPDATED = '2026-10-02'

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

const OCCASIONS = [
  {
    title: 'Welcome Kits',
    tag: 'Onboarding',
    desc: 'A branded onboarding kit that arrives on a new hire\'s desk - or at their doorstep if remote - signals the company has already thought about them before they\'ve written a single email. The best kits combine utility with personality: a quality notebook, a branded bottle or mug, a T-shirt or tote, and a handwritten-style welcome card.',
    link: { href: '/guides/employee-joining-kit', label: 'Full joining-kit checklist →' },
  },
  {
    title: 'Festive Hampers',
    tag: 'Diwali, Holi, Christmas',
    desc: 'Festival gifting is where many companies default to the same dry-fruit box everyone sends - employees notice. A curated hamper that mixes artisanal snacks, a premium drinkware piece and a branded accessory lands very differently from a shrink-wrapped tin of cashews.',
    link: { href: '/guides/diwali-hampers-for-employees-vs-clients', label: 'Diwali hampers by recipient →' },
  },
  {
    title: 'Client Appreciation',
    tag: 'Deal milestones, year-end',
    desc: 'Client gifts work best when tied to a specific moment - a deal milestone, a project wrap-up, a year-end thank-you, or a festive occasion. Premium personalised gifts communicate that the relationship is worth investing in.',
    link: { href: '/guides/corporate-gifts-for-clients', label: 'Client gifting guide →' },
  },
]

const BUDGET_TIERS = [
  {
    range: '₹500 - ₹1,500 per unit',
    title: 'Practical, Branded and Scalable',
    desc: 'Works well for large employee batches, junior-level onboarding, or bulk festive gifting where quantity matters - insulated water bottles, notebooks with pen sets, printed tote bags, desk organisers or curated snack boxes. Most vendors offer logo printing as standard at this tier; the focus is usefulness and brand visibility, not luxury.',
  },
  {
    range: '₹1,500 - ₹3,000 per unit',
    title: 'Curated and Premium-Feeling',
    desc: 'The sweet spot for onboarding kits, mid-senior employee gifting and client appreciation for regular accounts. Layer multiple items into a well-packaged set: a quality tumbler, a branded notebook, a tech accessory like a wireless charger or earbuds, and a printed insert card.',
  },
  {
    range: '₹3,000 and above',
    title: 'Gifts That Genuinely Impress',
    desc: 'Reserved for key accounts, C-suite relationships, long-term clients or high-value employees being recognised for milestones. Hampers can include artisanal products, branded lifestyle merchandise, premium drinkware and luxury packaging - the focus shifts from functional to memorable.',
  },
]

const CATEGORIES_SECTIONS = [
  {
    title: 'Drinkware, Tech & Desk Essentials',
    desc: 'Insulated bottles, tumblers and mugs are the most reliable workhorse category in Indian corporate gifting - used daily, gender-neutral, and carrying branding without feeling overtly promotional. Tech accessories (power banks, wireless chargers, earbuds) come a close second, and desk accessories like notebooks and organisers are popular onboarding staples.',
  },
  {
    title: 'Curated Hampers & Gourmet Boxes',
    desc: 'Hampers work especially well for festive and client gifting because they feel considered - branded merchandise mixed with consumables, artisanal food, or premium products from emerging local brands. Packaging matters as much as the contents: a well-designed box with a ribbon and personalised card elevates the perceived value significantly.',
  },
  {
    title: 'Sustainable Corporate Merchandise',
    desc: 'Eco-friendly gifts are increasingly requested by companies with strong ESG commitments - bamboo desk accessories, seed-paper notebooks, reusable cotton totes, stainless steel drinkware and recycled packaging. Worth prioritising for brand alignment; employees and clients notice when values are backed by action.',
  },
]

const CHECKLIST = [
  'What is the MOQ, and does per-unit pricing include branding and packaging?',
  'What file format is required for the logo, and is a sample proof included?',
  'What is the production lead time from proof approval to dispatch?',
  'Does the vendor handle pan-India delivery, or does your team arrange logistics separately?',
  'What is the return or replacement policy for items damaged in transit?',
  'Is bulk pricing tiered, and at what quantities do discounts apply?',
]

const FAQ_ITEMS = [
  {
    q: 'How do I match a corporate gift to the right occasion?',
    a: 'Match purpose first, then budget: welcome kits are about belonging (day-one onboarding), festive hampers are about recognition at scale (company-wide, tied to a festival), and client appreciation gifts are about sustaining a relationship (tied to a specific milestone). Picking the occasion before the product is the step most companies skip.',
  },
  {
    q: 'What should a corporate welcome kit include?',
    a: 'A practical welcome kit typically includes a branded notebook, a quality water bottle or mug, a T-shirt or tote bag, a pen set, and a personalised welcome card. Tech accessories such as a wireless charger or earbuds are popular additions at mid-range budgets. See our <a href="/guides/employee-joining-kit">employee joining kit guide</a> for the full 15-item checklist.',
  },
  {
    q: 'What branding methods are used on corporate gifts in India?',
    a: 'Common methods include screen printing, laser engraving, UV printing, embossing and heat transfer, depending on the material - laser engraving works well on metal drinkware, while screen printing suits fabric and paper. Most vendors need a print-ready logo file (AI or high-resolution PNG) and take 5-14 business days for standard bulk orders after proof approval.',
  },
  {
    q: 'How far in advance should I order corporate gifts for Diwali?',
    a: 'Plan to place your order at least four to six weeks before your intended delivery date, and lock it no later than October 15, 2026 for Diwali - October is peak season for gifting vendors and production slots fill quickly, especially for custom packaging or multi-city delivery.',
  },
  {
    q: 'Are corporate gifts tax-deductible in India?',
    a: 'Corporate gifts to employees and clients are generally deductible as business promotion or employee welfare expenses, provided they are properly documented - a GST-compliant invoice, a recipient list, and a ledger entry showing business purpose. Separately, non-cash gifts to employees are exempt from tax as a perquisite only up to ₹5,000 in aggregate per employee per financial year under Rule 3(7)(iv); beyond that, the full value becomes taxable. This is general information, not tax advice - confirm with your finance team.',
  },
  {
    q: 'What is the minimum order quantity for corporate gifts?',
    a: `Most Indian gifting vendors set MOQs of 25 to 50 units for branded corporate gifts. MintBox works with orders from ${MIN_ORDER_UNITS} units across onboarding kits, festive hampers and client gifts, which helps for smaller hiring batches or a pilot run before scaling up.`,
  },
]

export default function GiftsByOccasionClient({ products, categories }: Props) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://themintbox.in' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://themintbox.in/guides' },
          { '@type': 'ListItem', position: 3, name: 'Corporate Gifts by Occasion', item: 'https://themintbox.in/guides/corporate-gifts-by-occasion' },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Corporate Gifts by Occasion: Onboarding, Festivals & Clients (2026)',
        description: 'Match the right corporate gift to the right moment - onboarding welcome kits, festive hampers, and client appreciation gifts.',
        url: 'https://themintbox.in/guides/corporate-gifts-by-occasion',
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
              <span className="cp-breadcrumb-current">Gifts by Occasion</span>
            </nav>
            <div className="cp-hero-eyebrow">Strategy Guide · 2026</div>
            <h1 className="cp-hero-title">
              Corporate Gifts by Occasion:<br />
              <em>Onboarding, Festivals &amp; Clients</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Not every corporate gift serves the same purpose, and treating them as
              interchangeable is where most gifting programmes fall flat. Here&apos;s how to match the
              right gift to the right moment, pick a budget tier, and place a bulk order without
              the last-minute scramble.
            </p>
            <div className="cp-hero-ctas">
              <a href="#occasions" className="cp-hero-cta-primary">Match Your Occasion ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Get a Quote</a>
            </div>
            <div className="cp-hero-badge-group">
              <span className="cp-hero-badge">✓ 3 occasions covered</span>
              <span className="cp-hero-badge">✓ 3 budget tiers</span>
              <span className="cp-hero-badge">✓ MOQ {MIN_ORDER_UNITS} units</span>
              <span className="cp-hero-badge">✓ Pan-India delivery</span>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80" alt="Employee onboarding kit items laid out on a new hire's desk" className="cp-hero-img-actual" loading="lazy" />
              </div>
              <div className="cp-hero-visual-card">
                <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages curated for different occasions" className="cp-hero-img-actual" loading="lazy" />
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
            content="Match the gift to the moment: welcome kits (₹1,500-3,000) for new-hire onboarding, festive hampers (₹500-3,000+ by budget band) for company-wide festival gifting, and client appreciation gifts (₹2,000-5,000) tied to a deal milestone or year-end. Layer in a budget tier - ₹500-1,500 for scale, ₹1,500-3,000 for curated mid-range, ₹3,000+ for leadership and key accounts - then confirm MOQ, branding lead time and delivery scope before placing a bulk order."
          />
          <EATSignal
            credentials={[
              '200+ corporate clients across India',
              '50,000+ gifts delivered since 2019',
              'Onboarding kits, festive hampers and client gifts in one catalog',
              `MOQ ${MIN_ORDER_UNITS} units, quotes within ${QUOTE_TIME}`,
              'GST-compliant invoicing for all orders',
            ]}
          />
        </div>
      </div>

      {/* 3. MATCH THE OCCASION */}
      <section id="occasions" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Start Here</div>
          <h2 className="cp-section-title">Matching the Right Gift to the Right Moment</h2>
          <p className="cp-section-sub">
            A welcome kit for a new hire is about belonging. A festive hamper for your whole team
            is about recognition at scale. A gift sent to a key client after a deal closes is
            about sustaining a relationship. Getting the occasion right before picking the
            product is the step most companies skip.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {OCCASIONS.map((occ) => (
              <div key={occ.title} className="cp-card">
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold, #B8972E)', marginBottom: '8px' }}>{occ.tag}</div>
                <div className="cp-card-title">{occ.title}</div>
                <p className="cp-card-desc">{occ.desc}</p>
                <a href={occ.link.href} style={{ display: 'inline-block', marginTop: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--forest-green, #1A4A3A)' }}>{occ.link.label}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUDGET TIERS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">By Budget</div>
          <h2 className="cp-section-title">Corporate Gifts by Budget: What Each Tier Gets You</h2>
          <p className="cp-section-sub">
            Budget clarity upfront prevents two common mistakes: over-speccing a gift for the
            wrong audience, or under-investing for a moment that deserved more.
          </p>
          <div className="cp-steps">
            {BUDGET_TIERS.map((tier, i) => (
              <div key={tier.title} className="cp-step">
                <div className="cp-step-num">{i + 1}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">
                    {tier.title}
                    <span style={{ marginLeft: '12px', fontSize: '0.85em', fontWeight: 400, color: 'var(--forest-green, #1B4D3E)', opacity: 0.75 }}>
                      {tier.range}
                    </span>
                  </div>
                  <div className="cp-step-desc">{tier.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GIFT CATEGORIES */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What to Gift</div>
          <h2 className="cp-section-title">Gift Categories That Consistently Land Well</h2>
          <p className="cp-section-sub">
            A few categories outperform the rest on everyday usefulness and long-term brand
            recall - knowing which to anchor your selection around saves a lot of back-and-forth
            during procurement.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {CATEGORIES_SECTIONS.map((cat) => (
              <div key={cat.title} className="cp-card">
                <div className="cp-card-title">{cat.title}</div>
                <p className="cp-card-desc">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRANDING & LEAD TIMES */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container cp-two-col">
          <div>
            <div className="cp-section-eyebrow">Customisation</div>
            <h2 className="cp-section-title">Branding Methods &amp; Lead Times</h2>
            <p className="cp-section-sub">
              Common branding methods include screen printing, laser engraving, UV printing,
              embossing and heat transfer, depending on the material. Most vendors need a
              print-ready logo file - typically AI or a high-resolution PNG - and take 5 to 14
              business days for standard bulk orders after proof approval. Always request a
              physical or digital sample proof before approving a full run.
            </p>
          </div>
          <div>
            <div className="cp-section-eyebrow">Worked Example</div>
            <h2 className="cp-section-title">What a Bulk Order Looks Like</h2>
            <p className="cp-section-sub">
              As an illustration: a mid-sized tech company needing onboarding kits for a hiring
              cohort spread across five cities - logo-branded items, consistent packaging, and
              delivery within two weeks - is a realistic scope at the ₹1,500-3,000 tier, with a
              digital proof turned around within 48 hours and pan-India dispatch completed inside
              two weeks. Feedback in scenarios like this most often highlights the packaging and
              the personalised card.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PROCUREMENT CHECKLIST */}
      <section className="cp-section cp-section--white">
        <div className="cp-container--narrow">
          <div className="cp-section-eyebrow">Before You Order</div>
          <h2 className="cp-section-title">A Procurement Checklist for Bulk Corporate Gifts</h2>
          <p className="cp-section-sub">
            Even experienced procurement teams overlook something when ordering at scale.
            Confirm these with your vendor before signing off:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0' }}>
            {CHECKLIST.map((item) => (
              <li key={item} style={{ display: 'flex', gap: '12px', padding: '14px 0', borderBottom: '1px solid rgba(27,77,62,0.1)', fontSize: '15px', color: 'rgba(26,26,24,0.85)' }}>
                <span style={{ color: 'var(--gold, #B8972E)', fontWeight: 700 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. STATS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">3</div>
              <div className="cp-stat-label">Occasions Covered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">200+</div>
              <div className="cp-stat-label">Clients</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">50,000+</div>
              <div className="cp-stat-label">Gifts Delivered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">{MIN_ORDER_UNITS}</div>
              <div className="cp-stat-label">Minimum Order Units</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Browse by Occasion</div>
          <h2 className="cp-section-title">Find the Right Gift for Your Moment</h2>
          <p className="cp-section-sub">
            Filter the MintBox catalog by price to match onboarding, festive, or client-gifting
            budgets.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts by Occasion"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" alt="Modern office desk set up with a corporate gift for onboarding" loading="lazy" />
      </figure>

      {/* 10. QUOTE BAND */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">&ldquo;</span>
          <p className="cp-quote-text">
            Corporate gifting doesn&apos;t need to be complicated - it needs a system: match the
            occasion, pick the tier, customise without chaos, and place an order you won&apos;t regret.
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Team</cite>
        </div>
      </div>

      {/* 11. INLINE QUOTE FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Any Occasion</div>
            <h2 className="cp-cta-title">Tell Us the<br />Occasion &amp; Budget</h2>
            <p className="cp-cta-sub">
              Onboarding, festival or client gifting - share your headcount and budget tier and
              we&apos;ll send a detailed quote within {QUOTE_TIME}.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get a Corporate Gifting Quote"
              ctaLabel="Get a Quote"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="catalog" />

      {/* 12. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQ_ITEMS}
            eyebrow="FAQ"
            title="Corporate Gifts by Occasion - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 13. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Onboarding', title: 'Employee Joining Kit', href: '/guides/employee-joining-kit' },
              { label: 'New Hires', title: 'Corporate Gifts for New Employees', href: '/guides/corporate-gifts-for-new-employees' },
              { label: 'Festivals', title: 'Diwali Hampers, by Recipient', href: '/guides/diwali-hampers-for-employees-vs-clients' },
              { label: 'Clients', title: 'Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Strategy', title: 'What to Gift Employees', href: '/guides/what-to-gift-employees' },
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
