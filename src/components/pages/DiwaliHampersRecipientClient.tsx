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

const RECIPIENT_CARDS = [
  {
    icon: '👥',
    bg: 'cp-img-green',
    title: 'Employees: ₹500–₹1,500',
    desc: 'Collective warmth, not individual luxury. Considered but not extravagant - something to eat, use or display at home.',
  },
  {
    icon: '🤝',
    bg: 'cp-img-gold',
    title: 'Regular Clients: ₹1,500–₹2,500',
    desc: 'Presentation quality and personalisation matter more here - the hamper carries your brand into someone else’s office.',
  },
  {
    icon: '⭐',
    bg: 'cp-img-warm',
    title: 'Key Accounts: ₹2,500–₹5,000',
    desc: 'A relationship investment, not a seasonal gesture. Product sourcing and packaging should reflect the account’s weight.',
  },
  {
    icon: '👑',
    bg: 'cp-img-mid',
    title: 'VIP & Leadership: Bespoke',
    desc: 'Board members and anchor clients. No compromises on sourcing or generic boxes - this is where bespoke curation earns its cost.',
  },
]

const HAMPER_TIERS = [
  {
    label: '₹500–₹1,000',
    title: 'Budget Tier',
    desc: 'Premium dry fruit pouch, one box of artisan sweets or chocolates, a festive diya set, branded packaging with a note card.',
    href: '/guides/corporate-gifts-under-1000',
    featured: false,
  },
  {
    label: '₹1,000–₹2,500',
    title: 'Mid-Range Tier',
    desc: 'Dry fruits & nuts, gourmet snacks or chocolates, a branded tumbler or mug, a candle set, and a personalised card - in a rigid gift box.',
    href: '/collections/hampers',
    featured: true,
  },
  {
    label: '₹2,500–₹5,000+',
    title: 'Premium Tier',
    desc: 'Imported chocolates or specialty coffee/tea, branded copper or ceramic drinkware, a home décor or fragrance set, wooden crate packaging.',
    href: '/collections/hampers',
    featured: false,
  },
]

const WHATS_TRENDING = [
  { icon: '♻️', bg: 'cp-img-green', title: 'Reusable Drinkware & Desk Plants', desc: 'Items with a life beyond the festival are showing up consistently in employee-focused briefs.' },
  { icon: '🧴', bg: 'cp-img-gold', title: 'Wellness Kits', desc: 'Herbal teas and scented candles - festive gifting is doubling as a well-being signal this year.' },
  { icon: '🎟️', bg: 'cp-img-warm', title: 'Experiential Vouchers', desc: 'A different kind of gift for VIP and leadership tiers - a moment instead of an object.' },
  { icon: '🌾', bg: 'cp-img-mid', title: 'Kraft, Jute & Bamboo Packaging', desc: 'Increasingly the default rather than the premium upgrade, at a similar or modestly higher cost.' },
]

const FAQS = [
  {
    q: 'How much should we budget for Diwali hampers per recipient type?',
    a: 'Employees: ₹500–₹1,500 per head. Regular clients: ₹1,500–₹2,500. Key accounts and long-term partners: ₹2,500–₹5,000. VIP and leadership gifts are typically bespoke and priced individually.',
  },
  {
    q: 'Should employees and clients receive the same Diwali hamper?',
    a: 'No - the expectation and appropriate spend differ by recipient. A hamper that feels too premium for employees can create awkwardness on the floor; one that feels too generic for a client under-delivers on the relationship.',
  },
  {
    q: 'What is the minimum order quantity for branded Diwali hampers?',
    a: 'Many Indian suppliers set a 25 to 50 unit MOQ for customised Diwali hampers. MintBox has a 10-unit MOQ on hampers and individual products.',
  },
  {
    q: 'When should we place a bulk Diwali hamper order for 2026?',
    a: 'Branded hamper orders need at least 3–4 weeks of lead time before Diwali. Orders above 500 units, or those needing fully custom packaging, need 5–6 weeks. Confirm your brief by late September and lock the order by early October.',
  },
  {
    q: 'Are Diwali hampers given to employees tax exempt in India?',
    a: 'Non-cash gifts to employees are treated as a perquisite. Under Rule 3(7)(iv) of the Income Tax Rules, the exemption holds only while the aggregate value per employee in the financial year stays under ₹5,000 - once it reaches that threshold, the entire amount becomes taxable, not just the excess. This is general information, not tax advice; confirm the current threshold with your finance team or a qualified tax adviser. Gifts to clients follow your internal gifting policy rather than this employee-perquisite rule.',
  },
]

export default function DiwaliHampersRecipientClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Diwali Hampers for Employees vs Clients", "item": "https://themintbox.in/guides/diwali-hampers-for-employees-vs-clients" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Diwali Hampers for Employees vs Clients vs VIPs",
        "description": "How to budget Diwali hampers by recipient: employees (₹500–1,500), clients (₹1,500–5,000), and VIPs (bespoke). Three ready-to-brief hamper tiers, lead times and MOQs.",
        "url": "https://themintbox.in/guides/diwali-hampers-for-employees-vs-clients",
        "datePublished": "2026-09-27T00:00:00+05:30",
        "dateModified": "2026-09-29T00:00:00+05:30",
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
              <span className="cp-breadcrumb-current">Hampers by Recipient</span>
            </nav>
            <div className="cp-hero-eyebrow">Seasonal Guide · Diwali 2026</div>
            <h1 className="cp-hero-title">
              Diwali Hampers for Employees{' '}<br />
              <em>vs Clients vs VIPs</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              The first decision in any Diwali gifting brief isn&apos;t the budget - it&apos;s the recipient.
              Three tiers, ready to hand straight to your supplier.
            </p>
            <div className="cp-hero-ctas">
              <a href="#tiers" className="cp-hero-cta-primary">See the 3 Hamper Tiers ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Request a quote</a>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <Image src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/candle-warmer-glow.webp" alt="Candle Warmer Glow" width={600} height={600} sizes="(max-width: 768px) 50vw, 320px" className="cp-hero-img-actual" loading="eager" />
              </div>
              <div className="cp-hero-visual-card">
                <Image src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/laxmi-blessing.webp" alt="Laxmi Blessing" width={600} height={600} sizes="(max-width: 768px) 50vw, 320px" className="cp-hero-img-actual" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero chips */}
      <div className="cp-hero-chips">
        <div className="cp-container">
          <div className="cp-hero-badge-group">
            <span className="cp-hero-badge">✓ Recipient-matched tiers</span>
            <span className="cp-hero-badge">✓ From 10 units</span>
            <span className="cp-hero-badge">✓ Pan-India delivery</span>
            <span className="cp-hero-badge">✓ Order by early October</span>
          </div>
        </div>
      </div>

      {/* 2. AEO BAND */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content="Diwali hamper budgets vary by recipient: employees ₹500–₹1,500, regular clients ₹1,500–₹2,500, key accounts ₹2,500–₹5,000, and VIP/leadership gifts are typically bespoke. MintBox hamper tiers start from 10 units, with lead times of 3–4 weeks for standard orders and 5–6 weeks for 500+ units or fully custom packaging."
          />
          <EATSignal credentials={[
            'Branded festive hamper orders for companies across India',
            'Recipient-matched tiers - employee, client and VIP',
            'Transparent bulk pricing from ₹1,500/unit',
            'Single point of contact, one delivery infrastructure',
            'Pan-India delivery including tier-2 and tier-3 cities',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">4</div>
              <div className="cp-stat-label">recipient categories</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹500<span className="cp-stat-unit">–₹5,000+</span></div>
              <div className="cp-stat-label">budget range by recipient</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum hamper order</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">3–4<span className="cp-stat-unit"> wks</span></div>
              <div className="cp-stat-label">standard lead time</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECIPIENT SEGMENTS */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <h2 className="cp-section-title">Who You&apos;re Gifting Changes Everything</h2>
          <p className="cp-section-sub">
            The expectation, the appropriate spend and the product mix differ significantly by recipient category.
          </p>
          <div className="cp-cards-grid cp-cards-grid--2">
            {RECIPIENT_CARDS.map(card => (
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

      {/* 5. PRODUCT SHOWCASE */}
      <section id="products" className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">Browse Hampers by Recipient</h2>
          <p className="cp-section-sub">
            Filter by price to match the tier appropriate for who you&apos;re gifting.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Diwali Hampers"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 6. HAMPER TIERS */}
      <section id="tiers" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Ready-to-Brief Tiers</div>
          <h2 className="cp-section-title">Three Hamper Tiers, Budget to Premium</h2>
          <p className="cp-section-sub">
            Take any of these directly to your supplier as a brief.
          </p>
          <div className="cp-budget-grid">
            {HAMPER_TIERS.map(card => (
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
        <Image src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/pooja-ready.webp" alt="Pooja Ready" width={1200} height={600} sizes="(max-width: 1200px) 100vw, 1200px" />
      </figure>

      {/* 7. QUOTE PULL */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            {"A client-facing hamper carries your brand into someone else's office. Match the tier to the relationship, not the other way around."}
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* 8. WHAT'S TRENDING */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">What&apos;s Trending in Corporate Diwali Hampers</h2>
          <p className="cp-section-sub">
            Based on the briefs we see - items with a life beyond the festival are gaining ground.
          </p>
          <div className="cp-cards-grid cp-cards-grid--2">
            {WHATS_TRENDING.map(tip => (
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

      {/* 9. CTA + FORM */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-cta-section-inner">
          <div>
            <h2 className="cp-cta-title">Brief Us by{' '}<br />Recipient Type</h2>
            <p className="cp-cta-sub">
              Tell us your recipient mix, headcount and budget - we&apos;ll send tiered options with mockups. We reply within 1 hour on business days.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Brief Us by Recipient Type"
              ctaLabel="Request a quote"
              defaultOccasion="diwali"
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
            title="Diwali Hampers by Recipient - Frequently Asked Questions"
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
              { label: 'Seasonal', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Seasonal', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
              { label: 'Strategy', title: 'Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
              { label: 'Collections', title: 'Gift Hampers', href: '/collections/hampers' },
              { label: 'Bangalore', title: 'Bulk Corporate Gifting', href: '/bangalore-corporate-gifting/bulk-gifting' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
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
        <LastUpdatedDate date="2026-09-29" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
