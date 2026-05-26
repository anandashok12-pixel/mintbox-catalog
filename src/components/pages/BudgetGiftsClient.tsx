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

const PRICE_TIERS = [
  {
    label: 'Under ₹200',
    icon: '✏️',
    bg: 'cp-img-warm',
    items: ['Branded pens', 'Seed paper cards', 'Eco bookmarks', 'Custom stickers'],
    desc: 'Ideal for conferences, events, and large-volume giveaways where per-head spend must be minimal but branding still matters.',
    link: '/guides/corporate-gifts-under-100',
  },
  {
    label: '₹200–₹500',
    icon: '📓',
    bg: 'cp-img-green',
    items: ['Custom notebooks', 'Ceramic mugs', 'Tote bags', 'Desk accessories'],
    desc: 'The sweet spot for team gifts, event kits, and festive giveaways. Great branding impact without straining budgets.',
    link: '/guides/corporate-gifts-under-500',
  },
  {
    label: '₹500–₹1,000',
    icon: '💧',
    bg: 'cp-img-mid',
    items: ['Insulated bottles', 'Diary + pen sets', 'Onboarding kits', 'Premium mugs'],
    desc: 'Best balance of quality and cost for employee welcome kits, Diwali gifts, and client gifting at scale.',
    link: '/guides/corporate-gifts-under-1000',
  },
]

const COMPARISON_TABLE = [
  { item: 'Branded Ceramic Mug', recipient: 'All employees', custom: true, price: '₹250–₹400' },
  { item: 'Custom Notebook (A5)', recipient: 'Desk / field workers', custom: true, price: '₹300–₹550' },
  { item: 'Eco Cotton Tote Bag', recipient: 'Team gifting, events', custom: true, price: '₹200–₹380' },
  { item: 'Steel Water Bottle (500ml)', recipient: 'Active / outdoor teams', custom: true, price: '₹650–₹900' },
  { item: 'Diary + Pen Combo', recipient: 'Admin, sales, management', custom: true, price: '₹450–₹850' },
  { item: 'Desk Organiser', recipient: 'Office-based employees', custom: false, price: '₹350–₹700' },
  { item: 'Branded Pen (Metal)', recipient: 'Clients, CXOs, vendors', custom: true, price: '₹150–₹400' },
  { item: 'Jute Gift Bag', recipient: 'Eco-conscious brands', custom: true, price: '₹180–₹350' },
  { item: 'Travel Mug (480ml)', recipient: 'Remote / hybrid workers', custom: true, price: '₹600–₹950' },
  { item: 'USB + Notebook Kit', recipient: 'Tech teams, onboarding', custom: true, price: '₹750–₹1,000' },
]

const BULK_TIERS = [
  {
    qty: '100',
    label: 'Starter',
    saving: 'Listed price',
    desc: 'Base bulk rate. MOQ met on most products.',
    featured: false,
  },
  {
    qty: '250',
    label: 'Popular',
    saving: '10–15% off',
    desc: 'Mid-tier savings. Most logos included at no extra cost.',
    featured: true,
  },
  {
    qty: '500',
    label: 'Value',
    saving: '18–22% off',
    desc: 'Significant per-unit savings, priority production slot.',
    featured: false,
  },
  {
    qty: '1000+',
    label: 'Enterprise',
    saving: '25–35% off',
    desc: 'Best pricing, dedicated account manager, flexible delivery.',
    featured: false,
  },
]

const FREEBIES = [
  { icon: '🖨', title: 'Logo Printing', desc: 'At 100+ units, standard one-colour or full-colour logo print is included.' },
  { icon: '🎀', title: 'Custom Sleeve / Wrapper', desc: 'Branded kraft paper wrap or OPP bag for most products at 100+.' },
  { icon: '💌', title: 'Personalised Card', desc: 'Printed message or name card included at no extra cost for 50+ units.' },
  { icon: '📦', title: 'Branded Outer Box', desc: 'Standard shipping box with MintBox / client branding at 100+ units.' },
]

const FAQS = [
  {
    q: 'What is the best corporate gift under ₹500?',
    a: 'Custom ceramic mugs (₹280–₹380), branded notebooks (₹320–₹500), and eco tote bags (₹200–₹350) are consistent favourites. They have high daily visibility, broad appeal, and support logo branding at no extra cost at 50+ units.',
  },
  {
    q: 'Is it possible to customise gifts in this price range?',
    a: 'Yes - almost all products under ₹1,000 support logo printing or engraving. At 50+ units, customisation is included in the listed price. See our <a href="/customization/personalized-corporate-gifts">personalisation guide</a> for full details.',
  },
  {
    q: 'What is the minimum order for budget gifts?',
    a: 'Most products start from 50 units; notebooks and stationery from 25 units. We can accommodate smaller test orders (10–24 units) at a small per-unit premium for first-time buyers.',
  },
  {
    q: 'How do bulk discounts work under ₹1,000?',
    a: 'Listed prices are indicative at 100 units. At 250 units you save 10–15%; at 500 units, 18–22%; at 1,000+ units, 25–35%. Request a quote with your quantity for exact pricing.',
  },
  {
    q: 'Can gifts under ₹1,000 be delivered across India?',
    a: 'Yes. We deliver Pan-India from Bangalore. Delivery charges are calculated at checkout and vary by location and order weight. Bangalore same-day delivery is available for in-stock items - see our <a href="/bangalore-corporate-gifting/same-day-delivery">same-day delivery page</a>.',
  },
  {
    q: 'How do I make a budget gift feel premium?',
    a: 'Presentation matters. A ₹300 mug in a well-branded kraft box with a handwritten note feels like a ₹600 gift. We help with custom packaging, tissue wrapping, and personalised cards that dramatically lift perceived value at minimal cost.',
  },
  {
    q: 'Can I get GST invoicing on small orders?',
    a: 'Yes - all orders regardless of value receive a full GST-compliant tax invoice with itemised breakdowns for procurement and HR expense reporting.',
  },
]


export default function BudgetGiftsClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  return (
    <div className="cp-wrapper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://themintbox.in" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://themintbox.in/guides/corporate-gifting-handbook" },
          { "@type": "ListItem", "position": 3, "name": "Corporate Gifts Under ₹1,000", "item": "https://themintbox.in/guides/corporate-gifts-under-1000" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Corporate Gifts Under ₹1,000: Best Budget Options for 2026",
        "description": "Quality corporate gifts under ₹1,000. Browse mugs, notebooks, eco kits, and more. Bulk pricing from 50 units, logo customisation included. Pan-India delivery.",
        "url": "https://themintbox.in/guides/corporate-gifts-under-1000",
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
            <span className="cp-breadcrumb-current">Corporate Gifts Under ₹1,000</span>
          </nav>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="cp-hero-eyebrow">Budget Guide · Updated May 2026</div>
              <h1 className="cp-hero-title">
                Corporate Gifts Under ₹1,000:<br />
                <em>Best Budget Options for 2026</em>
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub">
                Quality gifting is absolutely possible under ₹1,000.
                These are MintBox's most-requested budget picks - practical, brandable,
                and genuinely appreciated by employees and clients.
              </p>
              <div className="cp-hero-ctas">
                <a href="#products" className="cp-hero-cta-primary">See Budget Products ↓</a>
                <a href="#quote" className="cp-hero-cta-secondary">Get Bulk Pricing</a>
              </div>
              <div className="cp-hero-badge-group">
                <span className="cp-hero-badge">✓ All under ₹1,000 / unit</span>
                <span className="cp-hero-badge">✓ Logo printing included</span>
                <span className="cp-hero-badge">✓ MOQ from 50 units</span>
                <span className="cp-hero-badge">✓ GST invoicing</span>
              </div>
            </div>
            <div className="cp-hero-visual">
              <div className="cp-hero-visual-grid">
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Branded corporate coffee mug gift" className="cp-hero-img-actual cp-hero-img-actual--tall" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80" alt="Premium corporate stationery notebook" className="cp-hero-img-actual" loading="lazy" />
                </div>
                <div className="cp-hero-visual-card">
                  <img src="https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=800&q=80" alt="Curated corporate gift set" className="cp-hero-img-actual" loading="lazy" />
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
            content="Corporate gifts under ₹1,000 include branded drinkware, notebooks, eco kits, and tech accessories - all available with logo printing. At 100+ units, per-unit costs drop 20–30%, making ₹600–₹800 hampers realistic. Logo printing is included free at 100+ units. Standard production is 7–10 business days; Pan-India delivery 3–5 days after dispatch."
          />
          <EATSignal credentials={[
            'Bulk pricing from 50 units - no hidden fees',
            'Logo printing included free at 100+ units',
            'All listed products priced ≤ ₹1,000 per unit',
            '7–10 day production, Pan-India delivery',
            'GST invoicing, net-30 terms for corporates',
          ]} />
        </div>
      </div>


      {/* ── PRICE TIERS EXPLAINER ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Price Breakdown</div>
          <h2 className="cp-section-title">What You Get at Each Budget Level</h2>
          <p className="cp-section-sub">
            Not all ₹1,000-and-under gifts are created equal. Here's a realistic breakdown of
            what's available at three sub-brackets.
          </p>
          <div className="cp-cards-grid cp-cards-grid--3">
            {PRICE_TIERS.map(tier => (
              <a key={tier.label} href={tier.link} className="cp-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className={`cp-card-icon ${tier.bg}`} style={{ fontSize: '22px', width: '52px', height: '52px' }}>
                  {tier.icon}
                </div>
                <div className="cp-card-title">{tier.label}</div>
                <p className="cp-card-desc" style={{ marginBottom: '14px' }}>{tier.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  {tier.items.map(i => (
                    <li key={i} style={{ fontSize: '13px', color: 'rgba(26,26,24,0.6)', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold,#B8972E)', fontSize: '11px' }}>✓</span> {i}
                    </li>
                  ))}
                </ul>
                <span className="cp-card-tag">See options →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section id="products" className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Products Under ₹1,000</div>
          <h2 className="cp-section-title">Browse Budget-Friendly Corporate Gifts</h2>
          <p className="cp-section-sub">
            All products below are under ₹1,000 per unit. Use the search or category tabs
            to narrow your shortlist. Click any product to add it to your quote pack.
          </p>
          <ContentProductShowcase
            products={products}
            categories={categories}
            heading="Corporate Gifts Under ₹1,000"
            maxPrice={1000}
            showPriceFilter={true}
            showSearch={true}
          />
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <figure className="cp-editorial-img">
            <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1200&q=80" alt="Curated corporate gift packages for employees" loading="lazy" />
          </figure>
          <div className="cp-section-eyebrow">Comparison Guide</div>
          <h2 className="cp-section-title">Top Picks Under ₹1,000 at a Glance</h2>
          <p className="cp-section-sub">
            Indicative per-unit prices at 100+ units. All figures include standard logo printing at that quantity.
          </p>
          <div className="cp-table-wrap">
            <table className="cp-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Ideal For</th>
                  <th>Logo Customisable</th>
                  <th>Price Range (100+ units)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map(row => (
                  <tr key={row.item}>
                    <td>{row.item}</td>
                    <td style={{ fontWeight: 300 }}>{row.recipient}</td>
                    <td>
                      <span className={`cp-table-badge ${row.custom ? 'cp-table-badge--yes' : 'cp-table-badge--extra'}`}>
                        {row.custom ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 500, color: 'var(--forest-green,#1B4D3E)' }}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(26,26,24,0.45)', fontWeight: 300 }}>
            * Prices are indicative and vary by material spec and customisation. <a href="/contact" style={{ color: 'var(--forest-green,#1B4D3E)' }}>Request a quote</a> for exact pricing.
          </p>
        </div>
      </section>

      {/* ── FREEBIES ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">What's Included</div>
          <h2 className="cp-section-title">Personalisation That Doesn't Add Cost</h2>
          <p className="cp-section-sub">
            At 100+ units, these four customisation extras are included in the base price - no
            hidden setup fees.
          </p>
          <div className="cp-cards-grid">
            {FREEBIES.map(f => (
              <div key={f.title} className="cp-card">
                <div className="cp-card-icon">{f.icon}</div>
                <div className="cp-card-title">{f.title}</div>
                <p className="cp-card-desc">{f.desc}</p>
                <span className="cp-card-tag" style={{ background: 'rgba(184,151,46,0.1)', color: '#7A6020' }}>Free at 100+ units</span>
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
            A ₹300 mug in a well-branded kraft box with a personalised note feels like a ₹700 gift.
            Presentation isn't a luxury - it's the point.
          </p>
          <cite className="cp-quote-cite">MintBox Packaging Philosophy</cite>
        </div>
      </div>

      {/* ── BULK PRICING ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Volume Discounts</div>
          <h2 className="cp-section-title">The More You Order, the More You Save</h2>
          <p className="cp-section-sub">
            Bulk pricing tiers apply across all products. Discounts are per-unit and stack
            with any promotional offers.
          </p>
          <div className="cp-tier-grid">
            {BULK_TIERS.map((tier, i) => (
              <div
                key={tier.qty}
                className={`cp-tier-cell ${tier.featured ? 'cp-tier-cell--featured' : i === 0 ? '' : ''}`}
                style={i > 0 && !tier.featured ? { background: 'white' } : {}}
              >
                <div className={`cp-tier-label ${tier.featured ? 'cp-tier-label--light' : 'cp-tier-label--dark'}`}>
                  {tier.label}
                </div>
                <div className={`cp-tier-qty ${tier.featured ? 'cp-tier-qty--light' : 'cp-tier-qty--dark'}`}>
                  {tier.qty}
                  {tier.qty !== '1000+' ? <span style={{ fontSize: '16px' }}> units</span> : ''}
                </div>
                <div className={`cp-tier-saving ${!tier.featured ? 'cp-tier-saving--muted' : ''}`}>
                  {tier.saving}
                </div>
                <div className={`cp-tier-desc ${tier.featured ? 'cp-tier-desc--light' : 'cp-tier-desc--dark'}`}>
                  {tier.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANGALORE DELIVERY ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <div className="cp-section-eyebrow">Ordering & Delivery</div>
              <h2 className="cp-section-title" style={{ marginBottom: '20px' }}>Ordering and Delivery in Bangalore</h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(26,26,24,0.6)', lineHeight: 1.8, marginBottom: '24px' }}>
                MintBox is Bangalore-based. Most in-stock budget gifts ship within 2–3 business days
                from order confirmation. Custom-printed orders take 7–10 business days.
              </p>
              <div className="cp-table-wrap">
                <table className="cp-table">
                  <thead>
                    <tr>
                      <th>Order Type</th>
                      <th>Lead Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'In-stock, no customisation', time: '2–3 business days' },
                      { type: 'Standard logo printing', time: '7–10 business days' },
                      { type: 'Name personalisation', time: '10–14 business days' },
                      { type: 'Rush order (50–100 units)', time: '4–6 business days (+fee)' },
                    ].map(r => (
                      <tr key={r.type}>
                        <td>{r.type}</td>
                        <td style={{ fontWeight: 400, color: 'var(--forest-green,#1B4D3E)' }}>{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="cp-section-eyebrow">GST & Invoicing</div>
              <h2 className="cp-section-title" style={{ marginBottom: '20px' }}>Invoice-Ready for Procurement</h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: 'rgba(26,26,24,0.6)', lineHeight: 1.8, marginBottom: '24px' }}>
                Every MintBox order includes a full GST-compliant tax invoice, HSN code, and itemised
                breakdown - ready for HR expense reporting and corporate procurement systems.
              </p>
              <div className="cp-cards-grid cp-cards-grid--2" style={{ gap: '12px' }}>
                {[
                  { icon: '🧾', title: 'GST Invoice', desc: 'Full GSTIN on every invoice, all applicable taxes itemised.' },
                  { icon: '🏦', title: 'NEFT / RTGS', desc: 'Bank transfer accepted. Credit terms for regular accounts.' },
                  { icon: '💳', title: 'Card / UPI', desc: 'Razorpay-powered online payment for smaller orders.' },
                  { icon: '📋', title: 'PO Accepted', desc: 'Purchase order workflow supported for enterprise accounts.' },
                ].map(c => (
                  <div key={c.title} className="cp-card" style={{ padding: '18px' }}>
                    <div className="cp-card-icon" style={{ width: '36px', height: '36px', fontSize: '16px' }}>{c.icon}</div>
                    <div className="cp-card-title" style={{ fontSize: '15px' }}>{c.title}</div>
                    <p className="cp-card-desc" style={{ fontSize: '13px' }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA + FORM ── */}
      <section id="quote" className="cp-cta-section">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-cta-section-inner">
          <div>
            <div className="cp-cta-eyebrow">Bulk Pricing</div>
            <h2 className="cp-cta-title">Get Bulk Pricing<br />Under ₹1,000</h2>
            <p className="cp-cta-desc">
              Tell us your quantity, products of interest, and timeline - we'll send back
              an itemised bulk quote within 4 hours.
            </p>
            <div className="cp-cta-promises">
              {[
                'Itemised quote within 4 business hours',
                'Volume discount applied automatically',
                'Logo customisation options included',
                'Delivery estimate to your city',
              ].map(p => (
                <div key={p} className="cp-cta-promise">
                  <span className="cp-cta-promise-dot" />
                  {p}
                </div>
              ))}
            </div>
          </div>
          <InlineQuoteForm
            title="Get Bulk Pricing Under ₹1,000"
            subtitle="Tell us what you need and we'll come back with a detailed quote within 4 hours."
            ctaLabel="Get Bulk Pricing"
            defaultOccasion=""
            interestHint="Interested in: (products / categories)\nApprox. quantity: "
          />
        </div>
      </section>

      <MidPageCTA variant="quote" />

      {/* ── FAQ ── */}
      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <FAQSection
            items={FAQS}
            title="Corporate Gifts Under ₹1,000 - FAQs"
            eyebrow="FAQ"
          />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="cp-section cp-section--white">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Guides</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹500', href: '/guides/corporate-gifts-under-500' },
              { label: 'Budget Guide', title: 'Corporate Gifts Under ₹100 & ₹200', href: '/guides/corporate-gifts-under-100' },
              { label: 'Collections', title: 'All Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'Personalisation', title: 'Personalised Corporate Gifts', href: '/customization/personalized-corporate-gifts' },
              { label: 'Onboarding', title: 'Employee Welcome & Joining Kits', href: '/collections/employee-welcome-kit' },
              { label: 'Bangalore', title: 'Same-Day Corporate Gift Delivery', href: '/bangalore-corporate-gifting/same-day-delivery' },
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
