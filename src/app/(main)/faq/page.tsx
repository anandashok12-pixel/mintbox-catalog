'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import '../landing.css'
import './faq.css'

/* ─── SVG icon components for categories ─── */
const CatIcons: Record<string, React.ReactNode> = {
  ordering: (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="12" height="11" rx="2" stroke="#B8972E" strokeWidth="1"/>
      <path d="M6 4V3C6 2.4 6.4 2 7 2H11C11.6 2 12 2.4 12 3V4" stroke="#B8972E" strokeWidth="1" strokeLinecap="round"/>
      <path d="M6 9H12M6 12H10" stroke="#B8972E" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  branding: (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6.5" stroke="#B8972E" strokeWidth="1"/>
      <path d="M6 9L8 11L12 7" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13V7L9 4L15 7V13L9 16L3 13Z" stroke="#B8972E" strokeWidth="1" fill="none"/>
      <path d="M9 4V16M3 7L15 7" stroke="#B8972E" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  ),
  products: (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2L11.5 7L17 7.5L13 11.5L14 17L9 14.5L4 17L5 11.5L1 7.5L6.5 7L9 2Z" stroke="#B8972E" strokeWidth="1" fill="none"/>
    </svg>
  ),
  pricing: (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6.5" stroke="#B8972E" strokeWidth="1"/>
      <path d="M9 5.5V6.5M9 11.5V12.5M6.5 9C6.5 9 6.5 10.5 9 10.5C11.5 10.5 11.5 9 9 9C6.5 9 6.5 7.5 9 7.5C11.5 7.5 11.5 9 9 9Z" stroke="#B8972E" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  esg: (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2C9 2 4 5 4 9.5C4 12 6.2 14 9 14C11.8 14 14 12 14 9.5C14 5 9 2 9 2Z" stroke="#B8972E" strokeWidth="1" fill="none"/>
      <path d="M9 14V16M7 16H11" stroke="#B8972E" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
}

/* ─── FAQ data ─── */
interface FaqItem { q: string; a: string; tag?: 'popular' | 'new'; searchData?: string }
interface Category { id: string; name: string; desc: string; faqs: FaqItem[] }

const categories: Category[] = [
  {
    id: 'ordering', name: 'Ordering & MOQ',
    desc: 'Minimum quantities, how to place an order, and what happens next',
    faqs: [
      { q: 'What is your minimum order quantity (MOQ)?', tag: 'popular', a: 'Our standard MOQ is <strong>25 units</strong> per product. For curated multi-product kits (e.g. an onboarding kit with 4 items), the MOQ applies to the kit as a whole — not each individual item inside. If you\u2019re a seed-stage startup with a smaller team, reach out to us directly — we accommodate smaller runs on a case-by-case basis, particularly for onboarding kits.' },
      { q: 'How do I place an order?', a: 'You don\u2019t place an order directly — you start with a <strong>quote request</strong>. Fill the form on our website (or WhatsApp us directly), and we\u2019ll come back with a curated proposal within one business day. Once you approve the proposal and branding, we move to production. Payment is confirmed before production begins.' },
      { q: 'Can I mix different products in a single order?', a: 'Yes — in fact, this is how most of our clients order. A typical onboarding kit might combine a branded water bottle, a notebook, a tote bag, and a gourmet snack box. We curate the combination, handle all branding across every item, and pack everything into a single premium gift box. The MOQ of 25 applies to the assembled kit.' },
      { q: 'How long does the whole process take \u2014 from enquiry to delivery?', tag: 'popular', a: 'A typical order follows this timeline:<br><br><strong>Day 1\u20132:</strong> Enquiry \u2192 proposal from us<br><strong>Day 3\u20134:</strong> Branding artwork approval<br><strong>Day 5\u201318:</strong> Production (varies by product and quantity)<br><strong>Day 19\u201321:</strong> Quality check + dispatch<br><br>For standard orders of 25\u2013200 units, plan for <strong>3\u20134 weeks end-to-end</strong>. Large orders (500+) or rush requests \u2014 speak to us early and we\u2019ll plan accordingly. Diwali season adds 1\u20132 weeks \u2014 order by early September to be safe.' },
      { q: 'Can I reorder the same kit again later?', a: 'Absolutely. We keep your branding files, kit configuration, and product specifications on record. Reorders skip the design and approval stage entirely — just tell us the quantity and delivery address and we go straight to production. Most of our HR clients set up a monthly reorder cadence for new hire onboarding.' },
      { q: 'Do you offer samples before I commit to a full order?', a: 'Yes, for orders above 100 units we provide a <strong>branded sample</strong> for your approval before bulk production. For smaller orders, we share high-resolution digital mockups showing your branding on each product. Samples are charged at cost and adjusted against your final invoice on confirmation.' },
    ],
  },
  {
    id: 'branding', name: 'Branding & customisation',
    desc: 'Logo placement, printing methods, and quality guarantees',
    faqs: [
      { q: 'What branding options do you offer?', a: 'We support all major branding techniques, matched to each product type:<br><br><strong>Laser engraving</strong> \u2014 metal bottles, power banks, pens, keychains<br><strong>UV printing</strong> \u2014 hard-surface products, phone stands, coasters<br><strong>Screen printing</strong> \u2014 tote bags, apparel, notebooks<br><strong>Embroidery</strong> \u2014 caps, jackets, premium apparel<br><strong>Debossing / Foil stamping</strong> \u2014 notebooks, leather goods, packaging<br><br>We recommend the appropriate method for each product \u2014 never just default to whatever is cheapest.' },
      { q: 'How do I share my logo and brand files?', a: 'Once you confirm the order, we\u2019ll share a simple briefing form where you upload your logo files (we accept AI, EPS, SVG, or high-resolution PNG) and specify brand colours (Pantone or hex codes). If you have a brand guideline document, send that too. Our in-house team handles the rest \u2014 we never outsource artwork preparation to third-party print shops.' },
      { q: 'What if the branding quality isn\u2019t right?', tag: 'popular', a: 'We stand behind our branding quality completely. Before dispatch, every order goes through a <strong>physical quality check</strong> \u2014 we inspect a sample from each batch for colour accuracy, print alignment, and finish durability. If anything doesn\u2019t meet the approved standard, we redo it. If a quality issue reaches you, we replace the affected items at no charge. No arguments, no conditions.' },
      { q: 'Can I see how my logo will look before production starts?', a: 'Yes, always. We create <strong>high-fidelity digital mockups</strong> for every product in your order before a single unit goes into production. You\u2019ll see your exact logo, in your exact colours, on each item \u2014 with placement dimensions. Production only begins after you give written approval. This step cannot be skipped.' },
      { q: 'Can gifts be personalised with individual recipient names?', a: 'Yes \u2014 we offer <strong>individual name personalisation</strong> on selected products (notebooks, bottles, card inserts) for orders of 50+ units. This works especially well for onboarding kits where a hand-written-style name on the gift box creates a strong first impression. Share the name list with us in a spreadsheet and we handle the rest. There is a small per-unit surcharge for personalisation.' },
    ],
  },
  {
    id: 'delivery', name: 'Delivery & logistics',
    desc: 'Shipping to multiple addresses, tracking, and coverage',
    faqs: [
      { q: 'Can you deliver to individual home addresses for remote employees?', tag: 'popular', a: 'Yes \u2014 this is one of our core capabilities. We can ship each gift individually to hundreds of different addresses across India simultaneously. We\u2019ll share a simple address collection link you can send to your team \u2014 they fill it themselves and we import the data directly. No spreadsheet chasing, no manual data entry on your end.' },
      { q: 'Which cities do you deliver to?', a: 'We deliver <strong>pan-India</strong> \u2014 all major metros and most tier-2 cities. Bengaluru deliveries are fastest (same-city courier, 1\u20132 days after dispatch). For the rest of India, standard courier transit is 3\u20135 business days depending on the destination. We partner with reliable courier networks and provide tracking for every shipment.' },
      { q: 'Can I track my order after it\u2019s dispatched?', a: 'Yes. Once dispatched, you receive a tracking link for every shipment \u2014 individual tracking per address for multi-location deliveries. We proactively flag any delivery exceptions (failed attempts, address issues) rather than waiting for you to chase us. You\u2019ll always know where your order is.' },
      { q: 'What if a gift arrives damaged?', a: 'We take full responsibility. Share a photo of the damage via WhatsApp or email and we\u2019ll arrange a replacement within 3\u20135 business days at no charge. Our packaging is designed specifically to withstand courier transit \u2014 we use protective inserts and double-walled boxes for fragile items \u2014 but if something does go wrong, we make it right immediately.' },
      { q: 'Do you ship internationally?', a: 'Currently, we ship <strong>within India only</strong>. International shipping \u2014 particularly to GCC countries, SE Asia, and the US \u2014 is on our roadmap for 2026. If you have an immediate need for international delivery, reach out to us directly and we\u2019ll explore what\u2019s possible case by case.' },
    ],
  },
  {
    id: 'products', name: 'Products & catalogue',
    desc: 'What we carry, custom sourcing, and catalogue access',
    faqs: [
      { q: 'How many products do you have in your catalogue?', a: 'We currently carry <strong>200+ SKUs</strong> across categories including drinkware and bottles, gourmet and dairy, stationery and notebooks, tech and electronics, apparel and accessories, wellness, eco-friendly products, and premium packaging. The catalogue is updated regularly \u2014 if you\u2019re looking for something specific that you don\u2019t see, ask us. We source to order for established clients.' },
      { q: 'Can you source a product that isn\u2019t in your catalogue?', a: 'Yes, for orders of 100+ units. If you have a specific product in mind \u2014 something you\u2019ve seen online, a reference image, or a detailed spec \u2014 share it with us. We\u2019ll source it, quality-check a sample, and brand it to your requirements. Custom sourcing typically adds 1\u20132 weeks to the production timeline and requires advance confirmation.' },
      { q: 'Do you offer gourmet food and edible gifting options?', a: 'Yes \u2014 gourmet and food gifting is one of our strongest categories, particularly for Diwali and New Year. We carry curated selections of premium chocolates, artisanal nuts and dried fruits, specialty teas and coffees, and branded dairy products. All edibles come with clearly marked shelf life and are packed with appropriate food-safe materials. Perishables have specific lead time and delivery requirements \u2014 we\u2019ll guide you through this.' },
      { q: 'Can I browse the catalogue online?', a: 'Yes \u2014 our full catalogue is available at <strong><a href="/catalog">getmintbox.com/catalogue</a></strong>. You can browse by category (drinkware, tech, gourmet, etc.), by occasion (onboarding, Diwali, client gifting), and by budget range. Select products you\u2019re interested in and add them to an enquiry basket \u2014 we\u2019ll come back with a combined quote. No account or login required.' },
    ],
  },
  {
    id: 'pricing', name: 'Pricing & billing',
    desc: 'How we price, GST, payment terms, and what\u2019s included',
    faqs: [
      { q: 'Are there any hidden charges I should know about?', tag: 'popular', a: 'No. Our quotes include <strong>everything</strong>: product cost, branding, quality check, packaging, and standard logistics. What you see on the quote is what appears on the invoice \u2014 no logistics surcharges added at the end, no \u201cadmin fees\u201d, no surprise line items. This is one of the things we feel most strongly about. If you\u2019ve been burned by invoice surprises from other vendors, that stops here.' },
      { q: 'Do you provide GST-compliant invoices?', a: 'Yes, always. Every invoice is fully GST-compliant with our GSTIN, HSN codes for each product category, and applicable tax breakdowns. If your procurement team or GCC parent company requires specific invoice formats or purchase order references, share the template and we\u2019ll match it. We\u2019re built for corporate procurement, not just casual orders.' },
      { q: 'What are your payment terms?', a: 'For first-time orders: <strong>50% advance</strong> on order confirmation, 50% before dispatch. For repeat clients with established history: we offer 30-day credit terms on request. We accept NEFT/RTGS, UPI, and cheque. For large enterprise or GCC orders, we can work within your standard purchase order and payment cycles \u2014 speak to us before placing the order.' },
      { q: 'Do you offer bulk discounts for large orders?', a: 'Yes \u2014 pricing scales with volume. Orders of 100+ units receive a meaningful discount over the base price, and 500+ unit orders are priced at our most competitive rates. Annual contracts (where you commit to a yearly volume across multiple occasions) get the best pricing of all. Our proposals always show the per-unit cost clearly so you can see exactly where the savings are.' },
    ],
  },
  {
    id: 'esg', name: 'Sustainability & ESG',
    desc: 'Eco credentials, carbon tracking, and plastic-free options',
    faqs: [
      { q: 'Do you have plastic-free and sustainable gifting options?', tag: 'new', a: 'Yes \u2014 we have a dedicated <strong>eco-friendly range</strong> including cork-based products, bamboo stationery, seed paper, jute bags, recycled notebooks, and plastic-free packaging options. Every product in this range is clearly labelled with its material source. We\u2019re expanding this range actively and can filter the full catalogue to show only eco-certified products on request.' },
      { q: 'Can you provide ESG documentation or a carbon footprint report for our gifting programme?', a: 'This is on our active roadmap for 2025\u201326. Currently, we can provide <strong>material sourcing documentation</strong> for eco-range products (country of origin, material certification, plastic-free verification) which satisfies most MNC and GCC sustainability audit requirements. Full carbon footprint reporting per order is coming \u2014 if this is a hard requirement for your procurement cycle, speak to us directly and we\u2019ll work out what we can provide right now.' },
    ],
  },
]

const totalQuestions = categories.reduce((s, c) => s + c.faqs.length, 0)

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'ordering-0': true })
  const [activeCategory, setActiveCategory] = useState('ordering')
  const [searchQuery, setSearchQuery] = useState('')

  const toggle = useCallback((key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  /* scroll-spy */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveCategory((e.target as HTMLElement).id.replace('cat-', ''))
        })
      },
      { rootMargin: '-80px 0px -60% 0px' },
    )
    document.querySelectorAll('.fq-cat-section').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToCat = (id: string) => {
    setActiveCategory(id)
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* search filter */
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return categories
    const q = searchQuery.toLowerCase()
    return categories.map((c) => ({ ...c, faqs: c.faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)) })).filter((c) => c.faqs.length > 0)
  }, [searchQuery])

  const filteredCount = filtered.reduce((s, c) => s + c.faqs.length, 0)

  return (
    <div className="fq-page">
      {/* NAV — same as homepage */}
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-logo" aria-label="MintBox Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.png" alt="MintBox" className="nav-logo-img" />
        </a>
        <ul className="nav-links" role="list">
          <li><a href="/#occasions">Catalogue</a></li>
          <li><a href="/#occasions">Occasions</a></li>
          <li><a href="/#how-it-works">How it works</a></li>
          <li><a href="/#footer">About</a></li>
          <li><a href="/#journal">Journal</a></li>
        </ul>
        <div className="nav-actions">
          <a href="/#quote-cta" className="btn-primary">Request a Quote</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="fq-hero">
        <div className="fq-hero-pat" aria-hidden="true"></div>
        <div className="fq-hero-inner">
          <div className="fq-hero-label">Frequently asked questions</div>
          <h1 className="fq-hero-title">Everything you<br />need to know.</h1>
          <p className="fq-hero-sub">From minimum order quantities to branding quality and lead times — we&apos;ve answered the questions we hear most from HR teams, founders, and procurement leads.</p>
        </div>
        <div className="fq-hero-rule"></div>
      </div>

      {/* SEARCH */}
      <div className="fq-search-wrap">
        <div className="fq-search-inner">
          <div className="fq-search-icon">
            <svg viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="rgba(245,240,230,0.4)" strokeWidth="1"/><path d="M10.5 10.5L13.5 13.5" stroke="rgba(245,240,230,0.4)" strokeWidth="1" strokeLinecap="round"/></svg>
          </div>
          <input
            type="text"
            className="fq-search-input"
            placeholder="Search questions — e.g. 'minimum order', 'lead time', 'branding'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="fq-search-count">{searchQuery ? `${filteredCount} result${filteredCount !== 1 ? 's' : ''}` : `${totalQuestions} questions`}</div>
      </div>

      {/* BODY */}
      <div className="fq-body">
        {/* SIDEBAR */}
        <div className="fq-sidebar">
          <div className="fq-sidebar-label">Browse by topic</div>
          {categories.map((cat) => (
            <button key={cat.id} className={`fq-cat-btn ${activeCategory === cat.id ? 'active' : ''}`} onClick={() => scrollToCat(cat.id)}>
              <span className="fq-cat-btn-text">{cat.name}</span>
              <span className="fq-cat-count">{cat.faqs.length}</span>
            </button>
          ))}
          <div className="fq-sidebar-divider"></div>
          <button className="fq-cat-btn" onClick={() => scrollToCat('ordering')}>
            <span className="fq-cat-btn-text" style={{ color: 'var(--gold)' }}>Ask a question &nearr;</span>
          </button>
        </div>

        {/* FAQ CONTENT */}
        <div className="fq-content">
          {filtered.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="fq-cat-section">
              <div className="fq-cat-header">
                <div className="fq-cat-icon">{CatIcons[cat.id]}</div>
                <div>
                  <div className="fq-cat-title">{cat.name}</div>
                  <div className="fq-cat-desc">{cat.desc}</div>
                </div>
              </div>

              {cat.faqs.map((faq, i) => {
                const key = `${cat.id}-${i}`
                const isOpen = !!openItems[key]
                return (
                  <div key={key} className={`fq-item ${isOpen ? 'open' : ''}`}>
                    <button className="fq-q" onClick={() => toggle(key)}>
                      <span className={`fq-q-text ${faq.tag === 'popular' && !isOpen ? '' : ''}`}>{faq.q}</span>
                      <div className="fq-chevron">
                        <svg viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#B8972E" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="fq-a">
                        {faq.tag === 'popular' && <div className="fq-tag fq-tag-popular">Most asked</div>}
                        {faq.tag === 'new' && <div className="fq-tag fq-tag-new">New</div>}
                        <div className="fq-a-text" dangerouslySetInnerHTML={{ __html: faq.a }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* STILL HAVE QUESTIONS */}
      <div className="fq-still">
        <div className="fq-still-pat" aria-hidden="true"></div>
        <div className="fq-still-inner">
          <div className="fq-still-text">
            <div className="fq-still-label">Still have questions?</div>
            <div className="fq-still-title">We&apos;re a WhatsApp message away.</div>
            <p className="fq-still-sub">If your question isn&apos;t here, Anand picks up every WhatsApp personally. Most questions get a reply within 30 minutes during business hours.</p>
          </div>
          <a href="https://wa.me/919916996642" target="_blank" rel="noopener" className="fq-contact-card">
            <div className="fq-cc-icon">
              <svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 9.2 1.8 10.3 2.4 11.3L1.5 14.5L4.8 13.6C5.8 14.2 6.9 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z" stroke="#B8972E" strokeWidth="0.9" fill="none"/><path d="M6.2 5.8C6.2 5.8 5.9 8.2 8.2 10.2C10.5 10.2 10.2 9.9 10.2 9.9L9.2 8.7L7.8 9C7.8 9 6.8 7.8 6.8 6.8L8 6.5L7 5.8H6.2Z" fill="#B8972E" opacity="0.7"/></svg>
            </div>
            <div className="fq-cc-title">WhatsApp us directly</div>
            <div className="fq-cc-desc">Chat with Anand. Real answers, not templates.</div>
            <span className="fq-cc-action">+91 9916996642 &rarr;</span>
          </a>
          <a href="mailto:anand@getmintbox.com" className="fq-contact-card">
            <div className="fq-cc-icon">
              <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#B8972E" strokeWidth="0.9" fill="none"/><path d="M2 5L8 9L14 5" stroke="#B8972E" strokeWidth="0.9" fill="none" strokeLinecap="round"/></svg>
            </div>
            <div className="fq-cc-title">Send us a message</div>
            <div className="fq-cc-desc">Fill the contact form and we&apos;ll reply within 4 hours on business days.</div>
            <span className="fq-cc-action">anand@getmintbox.com &rarr;</span>
          </a>
        </div>
      </div>

      {/* FOOTER — same as homepage */}
      <footer id="footer" role="contentinfo">
        <div className="footer-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mintbox-logo-white.png" alt="MintBox" className="footer-logo-img" />
            <p className="footer-tagline">&ldquo;Gifting that says what words can&apos;t.&rdquo;</p>
            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '20px', height: '20px', color: 'rgba(245,240,230,0.6)' }}>
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', color: 'rgba(245,240,230,0.6)' }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <a href="https://getmintbox.com" className="footer-url" target="_blank" rel="noopener">getmintbox.com</a>
          </div>
          <div>
            <span className="footer-col-label">Navigate</span>
            <ul className="footer-nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/#occasions">Solutions</a></li>
              <li><a href="/catalog">Catalog</a></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/#journal">Journal</a></li>
              <li><a href="/#quote-cta">Request A Quote</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <span className="footer-col-label">Reach Us</span>
            <p className="footer-contact-item"><a href="tel:+919916996642">+91 9916996642</a></p>
            <p className="footer-contact-item"><a href="mailto:anand@getmintbox.com">anand@getmintbox.com</a></p>
            <p className="footer-contact-item" style={{ marginTop: '8px' }}>2nd Floor, Sobha Alexander Plaza,<br/>Ashok Nagar, Bengaluru 560 025</p>
            <p className="footer-contact-item" style={{ marginTop: '10px' }}>
              <a href="https://wa.me/919916996642" target="_blank" rel="noopener" style={{ color: 'var(--gold)' }}>Chat on WhatsApp &rarr;</a>
            </p>
          </div>
          <div>
            <span className="footer-col-label">The Journal</span>
            <p className="footer-newsletter-copy">Gifting guides, occasion edits, and MintBox news — monthly.</p>
            <form className="newsletter-form" noValidate onSubmit={(e) => { e.preventDefault(); const btn = (e.target as HTMLFormElement).querySelector('button'); if (btn) { btn.textContent = '\u2713'; (btn as HTMLButtonElement).disabled = true; } }}>
              <input type="email" name="email" placeholder="your@email.com" autoComplete="email" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-bottom-text">&copy; 2026 MintBox. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a id="wa-float" href="https://wa.me/919916996642" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="wa-tooltip">Chat with Anand &rarr;</span>
      </a>
    </div>
  )
}
