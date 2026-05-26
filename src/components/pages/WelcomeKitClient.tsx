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
  category: { id: string; name: string; emoji?: string | null; slug: string } | string
}

const KIT_COMPONENTS = [
  {
    icon: '📓',
    bg: 'cp-img-green',
    title: 'Branded Notebook',
    desc: 'A5 hardcover with custom cover print and branded inside pages.',
  },
  {
    icon: '🍶',
    bg: 'cp-img-gold',
    title: 'Stainless Bottle',
    desc: '350–500ml insulated bottle, logo engraved or printed for daily visibility.',
  },
  {
    icon: '👕',
    bg: 'cp-img-warm',
    title: 'Company Tee or Hoodie',
    desc: 'Printed with your logo, available in sizes S–3XL. Signals belonging from day one.',
  },
  {
    icon: '💌',
    bg: 'cp-img-mid',
    title: 'Welcome Card',
    desc: 'Personalised with the employee name and a message from the team.',
  },
  {
    icon: '🍫',
    bg: 'cp-img-green',
    title: 'Snack Pack',
    desc: 'Local treats, individually wrapped, FSSAI-certified. A warm touch for the first day.',
  },
  {
    icon: '🛍',
    bg: 'cp-img-gold',
    title: 'Branded Tote or Pouch',
    desc: 'Outer carry bag printed with your logo - practical and memorable.',
  },
]

const ORDER_STEPS = [
  {
    num: '01',
    title: 'Define Your Kit Theme',
    desc: 'Share your culture, brand palette, and budget. We send 3 curated kit options to choose from.',
  },
  {
    num: '02',
    title: 'Choose Items and Customisations',
    desc: 'Pick the items, colours, and personalisation options. We handle all vendor coordination.',
  },
  {
    num: '03',
    title: 'Approve Digital Mockup',
    desc: 'Review a full digital render of your kit before production begins. Changes are free at this stage.',
  },
  {
    num: '04',
    title: 'Pay and Confirm Delivery Addresses',
    desc: 'Pay the production advance and upload your delivery address spreadsheet.',
  },
  {
    num: '05',
    title: 'Kits Packed and Dispatched',
    desc: 'Production and quality check complete in 7–10 days. Tracking shared for every shipment.',
  },
]

const BUDGET_TIERS = [
  {
    label: '₹750–₹1,000',
    title: 'Essentials Kit',
    desc: 'Notebook + bottle + welcome card. Clean, functional, and fully branded.',
    items: ['Hardcover A5 notebook', 'Stainless bottle (350ml)', 'Personalised welcome card'],
    featured: false,
  },
  {
    label: '₹1,000–₹1,500',
    title: 'Standard Kit',
    desc: 'The most popular option - covers everything a new hire needs on day one.',
    items: ['Hardcover A5 notebook', 'Stainless bottle (500ml)', 'Company tee or hoodie', 'Snack pack', 'Welcome card'],
    featured: true,
  },
  {
    label: '₹1,500–₹2,500',
    title: 'Premium Kit',
    desc: 'All standard items plus a tech accessory and premium rigid-box packaging.',
    items: ['All Standard Kit items', 'Tech accessory (charger/USB)', 'Premium rigid box', 'Custom foam insert'],
    featured: false,
  },
]

const FAQS = [
  {
    q: "What's the minimum order for employee welcome kits?",
    a: 'MOQ is 10 units. Many clients with smaller teams or rolling onboarding start with 10 kits and reorder as needed. Pre-approved kit designs can be dispatched in 5–7 days for repeat orders.',
  },
  {
    q: 'Can I personalise kits with individual employee names?',
    a: 'Yes. Name personalisation is available on notebooks (embossed or printed), bottles, and welcome cards. Provide a name list at least 3 days before dispatch. Name personalisation adds ₹50–₹100 per item.',
  },
  {
    q: 'Can kits be delivered to individual home addresses for remote employees?',
    a: 'Yes. Provide a spreadsheet with names, addresses, and phone numbers. Each kit is individually packed with the employee\'s name on the box and note card. Individual delivery rates apply (₹80–₹150 per address outside Bangalore).',
  },
  {
    q: 'What items are most impactful in a welcome kit?',
    a: 'A quality branded tee or hoodie has the highest emotional impact - it signals belonging. Pair with a hardcover notebook and a premium bottle for daily-use utility. A personalised note card elevates the entire kit. Avoid generic items like cheap pens or promotional-looking items.',
  },
  {
    q: 'Can I include branded snacks or food items?',
    a: 'Yes. MintBox sources FSSAI-certified packaged treats, artisan snacks, and specialty teas. All food items carry appropriate packaging and certification. Food items are recommended for premium kits (₹1,500+).',
  },
  {
    q: 'Do you handle recurring onboarding orders?',
    a: "Yes. Set up a standing order with your standard kit specs and we'll maintain a stock buffer. Send new hire details weekly/monthly and we dispatch on a rolling basis - typically within 3–5 business days of receiving an order.",
  },
]


export default function WelcomeKitClient({ products }: { products: Product[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://themintbox.in/collections/corporate-gifts" },
          { "@type": "ListItem", "position": 3, "name": "Employee Welcome Kit", "item": "https://themintbox.in/collections/employee-welcome-kit" },
        ]
      }) }} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 40px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <a href="/collections/corporate-gifts">Collections</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Employee Welcome Kit</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Collections · Employee Onboarding</div>
              <h1 className="cp-hero-title">
                Employee Welcome Kits:<br />
                <em>Make Day 1 Unforgettable</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Custom employee welcome kits that communicate culture from day one - curated bundles of notebooks,
                bottles, branded apparel, and a personal note. MOQ from 10 units. Delivered to offices or individual addresses.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">Browse Welcome Kit Items ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Build My Kit</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ MOQ from 10 units</span>
                <span className="cp-hero-badge">✓ 4–6 items per kit</span>
                <span className="cp-hero-badge">✓ Culture-first curation</span>
                <span className="cp-hero-badge">✓ Individual address delivery</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80" alt="Corporate gift packages ready for delivery" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80" alt="Branded merchandise corporate gift" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" alt="Premium corporate stationery notebook" className="cp-hero-img-actual" loading="lazy" />
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
            content="Employee welcome kits are curated sets of 4–6 branded items - typically a notebook, bottle, branded tee, welcome card, and a small treat - delivered on or before the employee's first day. Budget range: ₹750–₹2,500 per kit. MOQ is 10 units. Individual delivery to employee addresses is available."
          />
          <EATSignal
            credentials={[
              'MOQ from 10 units - built for rolling onboarding',
              'Culture-first curation aligned to your brand values',
              '4–6 items per kit, all branded with your logo',
              'Individual delivery to 500+ cities in India',
              'Same-week dispatch for pre-approved kit designs',
            ]}
          />
        </div>
      </div>


      {/* ── STATS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-stats-grid cp-stats-grid--4">
            <div className="cp-stat-card">
              <div className="cp-stat-value">10</div>
              <div className="cp-stat-unit">units</div>
              <div className="cp-stat-label">minimum order</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">4–6</div>
              <div className="cp-stat-unit">items</div>
              <div className="cp-stat-label">per kit</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">₹750</div>
              <div className="cp-stat-unit">per kit</div>
              <div className="cp-stat-label">starting price</div>
            </div>
            <div className="cp-stat-card">
              <div className="cp-stat-value">500+</div>
              <div className="cp-stat-unit">cities</div>
              <div className="cp-stat-label">delivery coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KIT COMPONENTS ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What Goes Inside</div>
          <h2 className="cp-section-title">Welcome Kit Components</h2>
          <p className="cp-section-sub">
            Each kit is assembled from a menu of items - choose 4–6 based on your brand, culture, and budget.
            Every item is branded with your logo.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {KIT_COMPONENTS.map(item => (
              <div key={item.title} className="cp-card">
                <div className={`cp-card-icon ${item.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {item.icon}
                </div>
                <div className="cp-card-title">{item.title}</div>
                <div className="cp-card-desc">{item.desc}</div>
              </div>
            ))}
          </div>
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Employee welcome kit with branded notebook, bottle, and personalised welcome card" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">The Process</div>
          <h2 className="cp-section-title">How to Order Welcome Kits</h2>
          <p className="cp-section-sub">
            Five steps from brief to delivery - typically 7–10 business days for first-time orders.
            Repeat orders dispatch in 3–5 days.
          </p>
          <div className="cp-steps">
            {ORDER_STEPS.map(step => (
              <div key={step.num} className="cp-step">
                <div className="cp-step-num">{step.num}</div>
                <div className="cp-step-content">
                  <div className="cp-step-title">{step.title}</div>
                  <div className="cp-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Product Catalogue</div>
          <h2 className="cp-section-title">Browse Welcome Kit Items</h2>
          <p className="cp-section-sub">
            All products below are available for inclusion in welcome kits. Add items to your quote and we will
            curate the best combination for your brand and budget.
          </p>
          <ContentProductShowcase
            products={products}
            categories={[]}
            heading="Employee Welcome Kit - Notebooks, Bottles, Apparel & More"
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── BUDGET TIERS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Budget Guide</div>
          <h2 className="cp-section-title">Welcome Kit Budgets</h2>
          <p className="cp-section-sub">
            Three tiers to match your budget and culture ambition. All tiers include full branding and individual delivery.
          </p>
          <div className="cp-budget-grid">
            {BUDGET_TIERS.map(tier => (
              <div key={tier.title} className={`cp-budget-card${tier.featured ? ' cp-budget-card--featured' : ''}`}>
                <div className="cp-budget-label">{tier.label}</div>
                <div className="cp-budget-price">{tier.title}</div>
                <div className="cp-budget-desc">{tier.desc}</div>
                <ul className="cp-budget-items">
                  {tier.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#quote" className="cp-budget-cta">Get a Quote →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE PULL BAND ── */}
      <div className="cp-quote-band">
        <div className="cp-quote-band-inner">
          <p className="cp-quote-band-text">
            "The welcome kit is your new hire's first physical experience of your culture.
            It should answer the question: what kind of company have I just joined?"
          </p>
          <a href="#quote" className="cp-quote-band-cta">Design My Welcome Kit →</a>
        </div>
      </div>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Employee Onboarding</div>
            <h2 className="cp-cta-title">Design Your<br />Welcome Kit</h2>
            <p className="cp-cta-sub">
              Share your team size, budget, and brand vibe. We will send 3 curated kit options
              within 24 hours - no commitment needed.
            </p>
            <div className="cp-quote-form-panel" />
          </div>
          <InlineQuoteForm
            title="Design Your Welcome Kit"
            subtitle="Tell us your quantity, budget, and culture - we will curate the perfect kit."
            ctaLabel="Build My Welcome Kit"
            defaultOccasion="welcome_kit"
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Employee Welcome Kits - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Pages</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Industry', title: 'Gifting for Startups', href: '/industry-solutions/startups' },
              { label: 'Industry', title: 'Gifting for Tech Companies', href: '/industry-solutions/tech-companies' },
              { label: 'Customisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Collections', title: 'Corporate Hampers', href: '/collections/hampers' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Guides', title: 'How to Choose Corporate Gifts', href: '/guides/how-to-choose-corporate-gifts' },
              { label: 'New Hires', title: 'Corporate Gifts for New Employees', href: '/guides/corporate-gifts-for-new-employees' },
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
        <LastUpdatedDate date="2026-05-26" />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
