'use client'

import Image from 'next/image'
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

const OCCASION_CARDS = [
  {
    icon: '🖥️',
    bg: 'cp-img-green',
    title: 'Onboarding',
    desc: 'About belonging. A welcome kit that arrives before the new hire’s first email says the company already thought about them.',
    href: '/collections/employee-welcome-kit',
  },
  {
    icon: '🪔',
    bg: 'cp-img-gold',
    title: 'Festivals',
    desc: 'About recognition at scale. Diwali, Holi and Christmas hampers that feel curated, not the same dry-fruit box everyone sends.',
    href: '/guides/diwali-corporate-gifts',
  },
  {
    icon: '🤝',
    bg: 'cp-img-warm',
    title: 'Client Appreciation',
    desc: 'About sustaining a relationship. Tied to a specific moment - a deal milestone, a project wrap-up, a year-end thank-you.',
    href: '/guides/corporate-gifts-for-clients',
  },
]

const BUDGET_TIERS = [
  {
    label: '₹500–₹1,500',
    title: 'Practical & Scalable',
    desc: 'Insulated bottles, notebooks with pen sets, printed totes, desk organisers, curated snack boxes. Minimum order 10 units.',
    href: '/guides/corporate-gifts-under-1000',
    featured: false,
  },
  {
    label: '₹1,500–₹3,000',
    title: 'Curated & Premium-Feeling',
    desc: 'Onboarding kits, mid-senior gifting and regular client appreciation. A tumbler, a notebook, a tech accessory and a printed insert card.',
    href: '/collections/employee-welcome-kit',
    featured: true,
  },
  {
    label: '₹3,000 and above',
    title: 'Genuinely Impressive',
    desc: 'Key accounts, C-suite relationships, milestone recognition. Artisanal products, branded lifestyle merchandise, luxury packaging.',
    href: '/guides/corporate-gifts-for-clients',
    featured: false,
  },
]

const GIFT_CATEGORIES = [
  { icon: '🍶', bg: 'cp-img-gold', title: 'Drinkware & Desk Essentials', desc: 'Insulated bottles, tumblers and mugs - the most reliable workhorse category. Used daily, gender-neutral, travels well.' },
  { icon: '🔌', bg: 'cp-img-green', title: 'Tech Accessories', desc: 'Power banks, wireless chargers and earbuds - a close second, especially for tech-forward companies.' },
  { icon: '🎁', bg: 'cp-img-warm', title: 'Curated Hampers & Gourmet Boxes', desc: 'Branded merchandise mixed with artisanal food or premium local-brand products - feels considered, not assembled.' },
  { icon: '♻️', bg: 'cp-img-mid', title: 'Sustainable Merchandise', desc: 'Bamboo desk accessories, seed-paper notebooks, cotton totes, steel drinkware - increasingly a standard catalogue option.' },
]

const CHECKLIST_ITEMS = [
  'What is the MOQ, and does per-unit pricing include branding and packaging?',
  'What file format is required for the logo, and is a sample proof included?',
  'What is the production lead time from proof approval to dispatch?',
  'Does the vendor handle pan-India delivery, or do you need to arrange logistics separately?',
  'What is the return or replacement policy for items damaged in transit?',
  'Is bulk pricing tiered, and at what quantities do discounts apply?',
]

const FAQS = [
  {
    q: 'What should a corporate welcome kit for new employees include?',
    a: 'A practical welcome kit typically includes a branded notebook, a quality water bottle or mug, a T-shirt or tote, a pen set and a personalised welcome card. Budgets start around ₹1,500 per unit, with higher-end kits going up to ₹3,000+.',
  },
  {
    q: 'How is a client appreciation gift different from an employee gift?',
    a: 'Client gifts are tied to a specific moment - a deal milestone, a project wrap-up, a festive occasion - and typically sit in the ₹2,000–₹5,000 range per recipient for mid-to-large accounts. Employee gifts prioritise collective warmth over individual spend.',
  },
  {
    q: 'What is the minimum order quantity for corporate gifts in India?',
    a: 'Most Indian gifting vendors set an MOQ of 25–50 units for branded corporate gifts. MintBox has a 10-unit MOQ on everything, kits included.',
  },
  {
    q: 'How far in advance should I order gifts for a festival like Diwali?',
    a: 'Plan to place your order at least 4–6 weeks before your intended delivery date. If your order involves custom packaging, a large volume, or multiple delivery locations, 6 weeks ahead is the safer target - October is peak season for gifting vendors.',
  },
  {
    q: 'Are corporate gifts tax-deductible, and are employee gifts tax-exempt?',
    a: 'Corporate gifts to employees and clients are generally deductible as a business promotion or employee welfare expense, provided they are properly documented - a GST-compliant invoice, a recipient list and a clear business purpose on file. Separately, non-cash gifts to an individual employee are exempt from tax as a perquisite only while the aggregate value in the financial year stays under ₹5,000 (Rule 3(7)(iv) of the Income Tax Rules); at or above that threshold, the full amount becomes taxable. This is general information, not tax advice - confirm current rules with your finance team or a qualified tax adviser.',
  },
]

export default function GiftsByOccasionClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifts by Occasion", "item": "https://themintbox.in/guides/corporate-gifts-by-occasion" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts by Occasion: Onboarding, Festivals & Client Appreciation",
        "description": "Match the gift to the moment: onboarding kits, festive hampers, and client appreciation gifts. Budget tiers, gift categories, MOQs and a bulk-order checklist.",
        "url": "https://themintbox.in/guides/corporate-gifts-by-occasion",
        "datePublished": "2026-09-27T00:00:00+05:30",
        "dateModified": "2026-10-02T00:00:00+05:30",
        "author": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" },
        "publisher": { "@type": "Organization", "name": "MintBox", "url": "https://themintbox.in" }
      }) }} />
      <Navbar />

      {/* 1. HERO */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-hero-inner">
          <div>
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="cp-breadcrumb-sep">›</span>
              <a href="/guides/corporate-gifting-handbook">Guides</a>
              <span className="cp-breadcrumb-sep">›</span>
              <span className="cp-breadcrumb-current">Gifts by Occasion</span>
            </nav>
            <div className="cp-hero-eyebrow">Strategy Guide · 2026</div>
            <h1 className="cp-hero-title">
              Corporate Gifts by Occasion:{' '}<br />
              <em>Onboarding, Festivals &amp; Clients</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Not every corporate gift serves the same purpose. Match the occasion to the gift first,
              then the budget - this is the step most companies skip.
            </p>
            <div className="cp-hero-ctas">
              <a href="#occasions" className="cp-hero-cta-primary">See the 3 Occasions ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Request a quote</a>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <Image src="/hampers/hero5.webp" alt="Premium nuts gift collection" width={600} height={600} sizes="(max-width: 768px) 50vw, 320px" className="cp-hero-img-actual" loading="eager" />
              </div>
              <div className="cp-hero-visual-card">
                <Image src="/hampers/hamper7.webp" alt="Festive gift tray with planner and treats" width={600} height={600} sizes="(max-width: 768px) 50vw, 320px" className="cp-hero-img-actual" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero chips */}
      <div className="cp-hero-chips">
        <div className="cp-container">
          <div className="cp-hero-badge-group">
            <span className="cp-hero-badge">✓ 3 occasions, matched</span>
            <span className="cp-hero-badge">✓ From 10 units</span>
            <span className="cp-hero-badge">✓ Pan-India delivery</span>
            <span className="cp-hero-badge">✓ Sample proof included</span>
          </div>
        </div>
      </div>

      {/* 2. AEO BAND */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content="Corporate gifts serve three distinct occasions: onboarding (belonging, from ₹1,500), festivals (recognition at scale, ₹500–₹3,000+ depending on band), and client appreciation (relationship-building, ₹2,000–₹5,000). Match the occasion first, then pick the budget tier - MintBox kits and hampers start from 10 units with pan-India delivery."
          />
          <EATSignal credentials={[
            'Onboarding kits, festive hampers and client gifts for companies across India',
            'Branded onboarding kits from ₹1,500, minimum 10 units',
            'Transparent bulk pricing, no hidden packaging fees',
            'Digital proof approval before dispatch',
            'Pan-India delivery including tier-2 cities',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">3</div>
              <div className="cp-stat-label">occasions covered</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹1,500</div>
              <div className="cp-stat-label">starting price, onboarding kits</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum bulk order</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">5–14<span className="cp-stat-unit"> days</span></div>
              <div className="cp-stat-label">production after proof approval</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATCH THE OCCASION */}
      <section id="occasions" className="cp-section cp-section--cream">
        <div className="cp-container">
          <h2 className="cp-section-title">Three Occasions, Three Different Jobs</h2>
          <p className="cp-section-sub">
            Treating every corporate gift as interchangeable is where most gifting programmes fall flat.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {OCCASION_CARDS.map(card => (
              <a key={card.title} href={card.href} className="cp-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className={`cp-card-icon ${card.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {card.icon}
                </div>
                <div className="cp-card-title">{card.title}</div>
                <p className="cp-card-desc">{card.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">Browse Gifts by Budget</h2>
          <p className="cp-section-sub">
            Filter by price to match the occasion and tier you need.
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

      {/* 6. BUDGET TIERS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budget Tiers</div>
          <h2 className="cp-section-title">What Each Tier Actually Gets You</h2>
          <p className="cp-section-sub">
            Budget clarity upfront prevents over-speccing for the wrong audience or under-investing for a moment that deserved more.
          </p>
          <div className="cp-budget-grid">
            {BUDGET_TIERS.map(card => (
              <a
                key={card.label}
                href={card.href}
                className={`cp-budget-card${card.featured ? ' cp-budget-card--featured' : ''}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div className="cp-budget-label">{card.label}</div>
                <div className="cp-budget-price">{card.title}</div>
                <p className="cp-budget-desc">{card.desc}</p>
                <span className="cp-budget-cta">See options →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <figure className="cp-editorial-img">
        <Image src="/hampers/executive-gift.webp" alt="Executive leather gift set" width={1200} height={600} sizes="(max-width: 1200px) 100vw, 1200px" />
      </figure>

      {/* 7. QUOTE PULL */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            {"Getting the occasion right before picking the product is the step most companies skip - and it shows."}
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* 8. GIFT CATEGORIES */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">Gift Categories That Consistently Land Well</h2>
          <p className="cp-section-sub">
            A few categories outperform the rest for everyday usefulness and long-term brand recall.
          </p>
          <div className="cp-cards-grid cp-cards-grid--2">
            {GIFT_CATEGORIES.map(tip => (
              <div key={tip.title} className="cp-card">
                <div className={`cp-card-icon ${tip.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {tip.icon}
                </div>
                <div className="cp-card-title">{tip.title}</div>
                <p className="cp-card-desc">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8b. PROCUREMENT CHECKLIST */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <h2 className="cp-section-title">A Procurement Checklist for Bulk Orders</h2>
          <p className="cp-section-sub">
            Run through this before confirming any bulk corporate gifting order.
          </p>
          <ul className="cp-checklist">
            {CHECKLIST_ITEMS.map(item => (
              <li key={item} className="cp-checklist-item">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. CTA + FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-section-eyebrow" style={{ color: 'var(--gold)' }}>Onboarding · Festivals · Clients</div>
            <h2 className="cp-cta-title">Tell Us the{' '}<br />Occasion</h2>
            <p className="cp-cta-sub">
              Tell us the moment you&apos;re gifting for, headcount and budget - we&apos;ll send matched options with mockups. We reply within 1 hour on business days.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Tell Us the Occasion"
              ctaLabel="Request a quote"
            />
          </div>
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* 10. FAQ */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container--narrow">
          <FAQSection
            items={FAQS}
            title="Corporate Gifts by Occasion - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Onboarding', title: 'New Employee Gifts', href: '/guides/corporate-gifts-for-new-employees' },
              { label: 'Onboarding', title: 'What to Gift Employees', href: '/guides/what-to-gift-employees' },
              { label: 'Clients', title: 'Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Seasonal', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Collections', title: 'Employee Welcome Kit', href: '/collections/employee-welcome-kit' },
              { label: 'Strategy', title: 'Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
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
        <LastUpdatedDate date="2026-10-02" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
