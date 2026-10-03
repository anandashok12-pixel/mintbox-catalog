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

const BUDGET_BANDS = [
  {
    label: 'Under ₹1,500',
    title: 'For Large Teams',
    desc: 'Diya & candle sets, branded desk essentials, mithai boxes, potted plants, and greeting card + e-voucher combos.',
    href: '/guides/corporate-gifts-under-1000',
    featured: false,
  },
  {
    label: '₹1,500–₹3,000',
    title: 'The Company-Wide Sweet Spot',
    desc: 'Premium dry fruit hampers, personalised desk kits, wellness sets, eco totes with snacks, and branded steel bottles.',
    href: '/collections/hampers',
    featured: true,
  },
  {
    label: '₹3,000 and above',
    title: 'For Leadership & Key Clients',
    desc: 'Luxury dry fruit hampers in wooden crates, full branded desk kits, wireless earbuds, self-care sets, experiential vouchers.',
    href: '/collections/hampers',
    featured: false,
  },
]

const IDEAS_UNDER_1500 = [
  { icon: '🪔', bg: 'cp-img-gold', title: 'Artisan Diya & Candle Set', desc: 'Festive, universally appropriate, easy to brand at scale.' },
  { icon: '🖊️', bg: 'cp-img-warm', title: 'Branded Desk Essentials', desc: 'A quality pen with a printed notepad - utility meets personalisation.' },
  { icon: '🍫', bg: 'cp-img-green', title: 'Mithai or Chocolate Box', desc: 'Feels premium when packaged well; appreciated across every team.' },
  { icon: '🌱', bg: 'cp-img-mid', title: 'Potted Plant or Succulent', desc: 'Eco-conscious, and it stays on the desk long after Diwali.' },
  { icon: '💌', bg: 'cp-img-gold', title: 'Personalised Card + E-Voucher', desc: 'Maximum employee choice while keeping a tangible element.' },
]

const IDEAS_1500_3000 = [
  { icon: '🥜', bg: 'cp-img-warm', title: 'Premium Dry Fruit Hamper', desc: 'The most popular pick in this band - universal and easy to bulk order.' },
  { icon: '📓', bg: 'cp-img-green', title: 'Personalised Desk Kit', desc: 'Branded journal + pen + wireless charger for hybrid teams.' },
  { icon: '🧘', bg: 'cp-img-mid', title: 'Wellness Kit', desc: 'Herbal tea, essential oil roller and face mist - a well-being signal.' },
  { icon: '👜', bg: 'cp-img-gold', title: 'Eco Tote with Snacks', desc: 'A soy candle and curated snacks for strong visual appeal.' },
  { icon: '🍶', bg: 'cp-img-warm', title: 'Branded Steel Bottle or Coffee Set', desc: 'Practical and long-lasting, carries your identity daily.' },
]

const IDEAS_3000_PLUS = [
  { icon: '🎁', bg: 'cp-img-gold', title: 'Luxury Hamper in a Wooden Crate', desc: 'Artisan chocolates and dry fruits - looks exceptional, travels well.' },
  { icon: '💼', bg: 'cp-img-green', title: 'Full Branded Desk Kit', desc: 'Merchandise, premium notebook and a cable organiser - onboarding-grade.' },
  { icon: '🎧', bg: 'cp-img-mid', title: 'Wireless Earbuds or Power Bank', desc: 'Broadly well received and useful long after Diwali.' },
  { icon: '🧴', bg: 'cp-img-warm', title: 'Premium Self-Care Set', desc: 'Skincare, aromatherapy and gourmet coffee for senior hires.' },
  { icon: '🎟️', bg: 'cp-img-gold', title: 'Experiential Voucher', desc: 'Dining, wellness or spa - a memorable moment over a physical object.' },
]

const PLANNING_TIPS = [
  {
    icon: '📅',
    bg: 'cp-img-gold',
    title: 'Order Early',
    desc: 'Fully custom branded hampers: 6–8 weeks ahead. Semi-custom: 3–4 weeks. Ready-to-ship catalogue items: at least 2 weeks for pan-India delivery.',
  },
  {
    icon: '🖋️',
    bg: 'cp-img-warm',
    title: 'Personalise Without a High Budget',
    desc: "A printed card addressed by name, signed by leadership, achieves most of the emotional effect. Name engraving on drinkware raises perceived value further.",
  },
  {
    icon: '🎗️',
    bg: 'cp-img-green',
    title: 'Brand the Item, Not the Wrapper',
    desc: 'Logo merchandise works best on items employees will actually carry or use - a bottle, tote, charger or notebook. Keep the treatment subtle.',
  },
  {
    icon: '🌿',
    bg: 'cp-img-mid',
    title: 'Use Sustainable Packaging',
    desc: 'Kraft boxes, jute potlis and recycled cardboard photograph well and read as intentional, not wasteful.',
  },
]

const FAQS = [
  {
    q: 'What are the most popular Diwali gift ideas for employees?',
    a: 'Dry fruit and nut hampers, branded desk kits, wellness sets, artisan diya sets, and personalised stationery bundles are consistently popular. Hampers in the ₹1,500–₹3,000 range work best for company-wide gifting.',
  },
  {
    q: 'What is a reasonable Diwali gift budget per employee?',
    a: 'Most mid-sized companies spend ₹1,500–₹3,000 per employee for company-wide gifting, with senior staff and key clients typically in the ₹3,000+ band. Choose the tier that matches your team size and company stage.',
  },
  {
    q: 'How early should I place a bulk Diwali gift order?',
    a: 'Fully custom branded hampers need 6–8 weeks of lead time. Semi-custom or pre-curated options need 3–4 weeks. Ready-to-ship catalogue items typically need at least 2 weeks for pan-India delivery.',
  },
  {
    q: 'What is the minimum order quantity for bulk Diwali gifting?',
    a: 'MintBox has a 10-unit MOQ on curated hampers and individual products.',
  },
  {
    q: 'Are Diwali gifts for employees tax exempt in India?',
    a: 'Non-cash gifts to an employee - hampers, vouchers, tokens - are treated as a perquisite. Under Rule 3(7)(iv) of the Income Tax Rules (read with Section 17(2)), the exemption applies only while the aggregate value in the financial year stays under ₹5,000; once that threshold is reached, the full amount becomes taxable, not just the excess. This is general information, not tax advice - confirm the current rule with your finance team or a qualified tax adviser before finalising your gifting policy.',
  },
]

export default function DiwaliGiftsByBudgetClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Diwali Gifts for Employees by Budget", "item": "https://themintbox.in/guides/diwali-gifts-for-employees-by-budget" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "15 Diwali Gift Ideas for Employees by Budget",
        "description": "15 Diwali gift ideas for employees sorted into 3 budget bands, from ₹1,500 to ₹3,000+. Personalisation tips, packaging ideas, MOQs and lead times for bulk orders.",
        "url": "https://themintbox.in/guides/diwali-gifts-for-employees-by-budget",
        "datePublished": "2026-09-27T00:00:00+05:30",
        "dateModified": "2026-09-27T00:00:00+05:30",
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
              <span className="cp-breadcrumb-current">Diwali Gifts by Budget</span>
            </nav>
            <div className="cp-hero-eyebrow">Seasonal Guide · Diwali 2026</div>
            <h1 className="cp-hero-title">
              15 Diwali Gift Ideas for{' '}<br />
              <em>Employees, By Budget</em>
            </h1>
            <div className="cp-hero-rule" />
            <p className="cp-hero-sub">
              Three budget bands, five ideas each - shortlist quickly for a team of 20 or 2,000,
              without defaulting to the same dry-fruit box everyone else sends.
            </p>
            <div className="cp-hero-ctas">
              <a href="#ideas" className="cp-hero-cta-primary">See All 15 Ideas ↓</a>
              <a href="#quote" className="cp-hero-cta-secondary">Request a quote</a>
            </div>
          </div>
          <div className="cp-hero-visual">
            <div className="cp-hero-visual-grid">
              <div className="cp-hero-visual-card">
                <Image src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/tea-ceremony.webp" alt="Tea Ceremony" width={600} height={600} sizes="(max-width: 768px) 50vw, 320px" className="cp-hero-img-actual" loading="eager" />
              </div>
              <div className="cp-hero-visual-card">
                <Image src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/urli-celebration.webp" alt="Urli Celebration" width={600} height={600} sizes="(max-width: 768px) 50vw, 320px" className="cp-hero-img-actual" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero chips */}
      <div className="cp-hero-chips">
        <div className="cp-container">
          <div className="cp-hero-badge-group">
            <span className="cp-hero-badge">✓ 3 budget bands</span>
            <span className="cp-hero-badge">✓ From 10 units</span>
            <span className="cp-hero-badge">✓ Pan-India delivery</span>
            <span className="cp-hero-badge">✓ Sample kits available</span>
          </div>
        </div>
      </div>

      {/* 2. AEO BAND */}
      <div className="cp-aeo-band">
        <div className="cp-container--narrow">
          <QuickAnswerBox
            title="Quick Answer"
            content="15 Diwali gift ideas for employees split across 3 budgets: under ₹1,500 (diya sets, desk essentials, mithai boxes), ₹1,500–₹3,000 (dry fruit hampers, wellness kits, personalised desk kits - the most common company-wide band), and ₹3,000+ (luxury hampers, tech accessories, experiential vouchers for leadership). MintBox hampers start from 10 units with pan-India delivery."
          />
          <EATSignal credentials={[
            'Diwali gifting for 200+ companies across India',
            'Bulk pricing for teams of 10–2,000',
            'Sample kits available before you commit',
            'FSSAI-certified food items only',
            'Name personalisation on kits and boxes',
          ]} />
        </div>
      </div>

      {/* 3. STATS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">3</div>
              <div className="cp-stat-label">budget bands</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">15</div>
              <div className="cp-stat-label">gift ideas</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">25<span className="cp-stat-unit"> units</span></div>
              <div className="cp-stat-label">minimum hamper order</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">6–8<span className="cp-stat-unit"> wks</span></div>
              <div className="cp-stat-label">lead time for fully custom orders</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IDEAS BY BAND */}
      <section id="ideas" className="cp-section cp-section--cream">
        <div className="cp-container">
          <h2 className="cp-section-title">Festive Ideas for Large Teams</h2>
          <p className="cp-section-sub">
            Deliberate curation beats spend at this band - a thoughtfully chosen set of simple items always
            outperforms a single generic one.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {IDEAS_UNDER_1500.map(card => (
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

      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">The Company-Wide Sweet Spot</h2>
          <p className="cp-section-sub">
            Enough budget for a genuinely multi-item hamper that feels curated rather than assembled.
            MintBox&apos;s Diwali hamper collection starts here, from 10 units.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {IDEAS_1500_3000.map(card => (
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

      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">₹3,000 and Above</div>
          <h2 className="cp-section-title">Premium Picks for Leadership &amp; Key Clients</h2>
          <p className="cp-section-sub">
            For long-tenured employees and key relationships where the gifting moment carries extra weight.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {IDEAS_3000_PLUS.map(card => (
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
          <h2 className="cp-section-title">Browse Diwali Gift Products by Budget</h2>
          <p className="cp-section-sub">
            Filter by price to match whichever of the three bands fits your team.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Diwali Gifts by Budget"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* 6. BUDGET TIERS SUMMARY */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <h2 className="cp-section-title">Choose Your Budget Band</h2>
          <p className="cp-section-sub">
            A quick summary of what each band typically includes.
          </p>
          <div className="cp-budget-grid">
            {BUDGET_BANDS.map(card => (
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
        <Image src="https://tsg7nlowf2bnsaf0.public.blob.vercel-storage.com/copper-wellness.webp" alt="Copper Wellness" width={1200} height={600} sizes="(max-width: 1200px) 100vw, 1200px" />
      </figure>

      {/* 7. QUOTE PULL */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <span className="cp-quote-mark">"</span>
          <p className="cp-quote-text">
            {"A thoughtfully chosen set of simple items always beats a single generic one - curation, not spend, is what makes a Diwali gift memorable."}
          </p>
          <cite className="cp-quote-cite">MintBox Gifting Philosophy</cite>
        </div>
      </div>

      {/* 8. PLANNING TIPS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Planning Tips</div>
          <h2 className="cp-section-title">Personalisation, Packaging &amp; Timing</h2>
          <p className="cp-section-sub">
            Four things that make any budget look considered, not last-minute.
          </p>
          <div className="cp-cards-grid cp-cards-grid--2">
            {PLANNING_TIPS.map(tip => (
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
            <h2 className="cp-cta-title">Get Your Diwali{' '}<br />Gift Shortlist</h2>
            <p className="cp-cta-sub">
              Tell us your team size and budget band - we will send curated options with mockups. We reply within 1 hour on business days.
            </p>
          </div>
          <div className="cp-quote-form-panel">
            <InlineQuoteForm
              title="Get Your Diwali Gift Shortlist"
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
            title="Diwali Gift Ideas for Employees - Frequently Asked Questions"
          />
        </div>
      </section>

      {/* 11. RELATED LINKS */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <h2 className="cp-section-title">Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Seasonal', title: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
              { label: 'Seasonal', title: 'Diwali Corporate Gifts', href: '/guides/diwali-corporate-gifts' },
              { label: 'Collections', title: 'Gift Hampers', href: '/collections/hampers' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
              { label: 'Strategy', title: 'Gifts for Clients', href: '/guides/corporate-gifts-for-clients' },
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
        <LastUpdatedDate date="2026-09-27" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
