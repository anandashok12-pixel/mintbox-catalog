'use client'

import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import '../app/(main)/landing.css'
import '../app/(main)/pages.css'

interface FAQItem {
  question: string
  answer: string
  searchText: string
  tag?: 'popular' | 'new'
}

interface FAQCategory {
  id: string
  title: string
  desc: string
  icon: React.ReactNode
  items: FAQItem[]
}

const faqData: FAQCategory[] = [
  {
    id: 'ordering',
    title: 'Ordering & MOQ',
    desc: 'Minimum quantities, how to place an order, and what happens next',
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <rect x="3" y="4" width="12" height="11" rx="2" stroke="#B8972E" strokeWidth="1" />
        <path d="M6 4V3C6 2.4 6.4 2 7 2H11C11.6 2 12 2.4 12 3V4" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 9H12M6 12H10" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { question: 'What is your minimum order quantity (MOQ)?', answer: 'Our standard MOQ is <strong>25 units</strong> per product. For curated multi-product kits (e.g. an onboarding kit with 4 items), the MOQ applies to the kit as a whole — not each individual item inside. If you\'re a seed-stage startup with a smaller team, reach out to us directly — we accommodate smaller runs on a case-by-case basis, particularly for onboarding kits.', searchText: 'what is your minimum order quantity moq', tag: 'popular' },
      { question: 'How do I place an order?', answer: 'You don\'t place an order directly — you start with a <strong>quote request</strong>. Fill the form on our website (or WhatsApp us directly), and we\'ll come back with a curated proposal within one business day. Once you approve the proposal and branding, we move to production. Payment is confirmed before production begins.', searchText: 'how do i place an order request a quote' },
      { question: 'Can I mix different products in a single order?', answer: 'Yes — in fact, this is how most of our clients order. A typical onboarding kit might combine a branded water bottle, a notebook, a tote bag, and a gourmet snack box. We curate the combination, handle all branding across every item, and pack everything into a single premium gift box. The MOQ of 25 applies to the assembled kit.', searchText: 'can i mix products in one order kit' },
      { question: 'How long does the whole process take — from enquiry to delivery?', answer: 'A typical order follows this timeline:<br /><br /><strong>Day 1–2:</strong> Enquiry → proposal from us<br /><strong>Day 3–4:</strong> Branding artwork approval<br /><strong>Day 5–18:</strong> Production (varies by product and quantity)<br /><strong>Day 19–21:</strong> Quality check + dispatch<br /><br />For standard orders of 25–200 units, plan for <strong>3–4 weeks end-to-end</strong>. Large orders (500+) or rush requests — speak to us early and we\'ll plan accordingly. Diwali season adds 1–2 weeks — order by early September to be safe.', searchText: 'how long does the whole process take from inquiry to delivery', tag: 'popular' },
      { question: 'Can I reorder the same kit again later?', answer: 'Absolutely. We keep your branding files, kit configuration, and product specifications on record. Reorders skip the design and approval stage entirely — just tell us the quantity and delivery address and we go straight to production. Most of our HR clients set up a monthly reorder cadence for new hire onboarding.', searchText: 'can i reorder the same kit again repeat order' },
      { question: 'Do you offer samples before I commit to a full order?', answer: 'Yes, for orders above 100 units we provide a <strong>branded sample</strong> for your approval before bulk production. For smaller orders, we share high-resolution digital mockups showing your branding on each product. Samples are charged at cost and adjusted against your final invoice on confirmation.', searchText: 'do you offer samples before i commit to a full order' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding & customisation',
    desc: 'Logo placement, printing methods, and quality guarantees',
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="#B8972E" strokeWidth="1" />
        <path d="M6 9L8 11L12 7" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      { question: 'What branding options do you offer?', answer: 'We support all major branding techniques, matched to each product type:<br /><br /><strong>Laser engraving</strong> — metal bottles, power banks, pens, keychains<br /><strong>UV printing</strong> — hard-surface products, phone stands, coasters<br /><strong>Screen printing</strong> — tote bags, apparel, notebooks<br /><strong>Embroidery</strong> — caps, jackets, premium apparel<br /><strong>Debossing / Foil stamping</strong> — notebooks, leather goods, packaging<br /><br />We recommend the appropriate method for each product — never just default to whatever is cheapest.', searchText: 'what branding options do you offer logo engraving printing' },
      { question: 'How do I share my logo and brand files?', answer: 'Once you confirm the order, we\'ll share a simple briefing form where you upload your logo files (we accept AI, EPS, SVG, or high-resolution PNG) and specify brand colours (Pantone or hex codes). If you have a brand guideline document, send that too. Our in-house team handles the rest — we never outsource artwork preparation to third-party print shops.', searchText: 'how do i share my logo artwork files brand guidelines' },
      { question: "What if the branding quality isn't right?", answer: 'We stand behind our branding quality completely. Before dispatch, every order goes through a <strong>physical quality check</strong> — we inspect a sample from each batch for colour accuracy, print alignment, and finish durability. If anything doesn\'t meet the approved standard, we redo it. If a quality issue reaches you, we replace the affected items at no charge. No arguments, no conditions.', searchText: 'what if the branding quality is not right guarantee', tag: 'popular' },
      { question: 'Can I see how my logo will look before production starts?', answer: 'Yes, always. We create <strong>high-fidelity digital mockups</strong> for every product in your order before a single unit goes into production. You\'ll see your exact logo, in your exact colours, on each item — with placement dimensions. Production only begins after you give written approval. This step cannot be skipped.', searchText: 'can i see a mockup before production digital preview' },
      { question: 'Can gifts be personalised with individual recipient names?', answer: 'Yes — we offer <strong>individual name personalisation</strong> on selected products (notebooks, bottles, card inserts) for orders of 50+ units. This works especially well for onboarding kits where a hand-written-style name on the gift box creates a strong first impression. Share the name list with us in a spreadsheet and we handle the rest. There is a small per-unit surcharge for personalisation.', searchText: 'can you add individual names personalisation on each gift' },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery & logistics',
    desc: 'Shipping to multiple addresses, tracking, and coverage',
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M3 13V7L9 4L15 7V13L9 16L3 13Z" stroke="#B8972E" strokeWidth="1" fill="none" />
        <path d="M9 4V16M3 7L15 7" stroke="#B8972E" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { question: 'Can you deliver to individual home addresses for remote employees?', answer: 'Yes — this is one of our core capabilities. We can ship each gift individually to hundreds of different addresses across India simultaneously. We\'ll share a simple address collection link you can send to your team — they fill it themselves and we import the data directly. No spreadsheet chasing, no manual data entry on your end.', searchText: 'do you deliver to individual home addresses remote employees wfh', tag: 'popular' },
      { question: 'Which cities do you deliver to?', answer: 'We deliver <strong>pan-India</strong> — all major metros and most tier-2 cities. Bengaluru deliveries are fastest (same-city courier, 1–2 days after dispatch). For the rest of India, standard courier transit is 3–5 business days depending on the destination. We partner with reliable courier networks and provide tracking for every shipment.', searchText: 'what cities do you deliver to pan india coverage' },
      { question: "Can I track my order after it's dispatched?", answer: 'Yes. Once dispatched, you receive a tracking link for every shipment — individual tracking per address for multi-location deliveries. We proactively flag any delivery exceptions (failed attempts, address issues) rather than waiting for you to chase us. You\'ll always know where your order is.', searchText: 'can i track my order real time shipment tracking' },
      { question: 'What if a gift arrives damaged?', answer: 'We take full responsibility. Share a photo of the damage via WhatsApp or email and we\'ll arrange a replacement within 3–5 business days at no charge. Our packaging is designed specifically to withstand courier transit — we use protective inserts and double-walled boxes for fragile items — but if something does go wrong, we make it right immediately.', searchText: 'what happens if a gift arrives damaged broken' },
      { question: 'Do you ship internationally?', answer: 'Currently, we ship <strong>within India only</strong>. International shipping — particularly to GCC countries, SE Asia, and the US — is on our roadmap for 2026. If you have an immediate need for international delivery, reach out to us directly and we\'ll explore what\'s possible case by case.', searchText: 'do you ship internationally outside india' },
    ],
  },
  {
    id: 'products',
    title: 'Products & catalogue',
    desc: 'What we carry, custom sourcing, and catalogue access',
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11.5 7L17 7.5L13 11.5L14 17L9 14.5L4 17L5 11.5L1 7.5L6.5 7L9 2Z" stroke="#B8972E" strokeWidth="1" fill="none" />
      </svg>
    ),
    items: [
      { question: 'How many products do you have in your catalogue?', answer: 'We currently carry <strong>200+ SKUs</strong> across categories including drinkware and bottles, gourmet and dairy, stationery and notebooks, tech and electronics, apparel and accessories, wellness, eco-friendly products, and premium packaging. The catalogue is updated regularly — if you\'re looking for something specific that you don\'t see, ask us. We source to order for established clients.', searchText: 'how many products do you have in your catalogue skus' },
      { question: "Can you source a product that isn't in your catalogue?", answer: 'Yes, for orders of 100+ units. If you have a specific product in mind — something you\'ve seen online, a reference image, or a detailed spec — share it with us. We\'ll source it, quality-check a sample, and brand it to your requirements. Custom sourcing typically adds 1–2 weeks to the production timeline and requires advance confirmation.', searchText: 'can you source a product not in your catalogue custom' },
      { question: 'Do you offer gourmet food and edible gifting options?', answer: 'Yes — gourmet and food gifting is one of our strongest categories, particularly for Diwali and New Year. We carry curated selections of premium chocolates, artisanal nuts and dried fruits, specialty teas and coffees, and branded dairy products. All edibles come with clearly marked shelf life and are packed with appropriate food-safe materials. Perishables have specific lead time and delivery requirements — we\'ll guide you through this.', searchText: 'do you offer gourmet food edibles perishable gifts' },
      { question: 'Can I browse the catalogue online?', answer: 'Yes — our full catalogue is available at <strong>getmintbox.com/catalogue</strong>. You can browse by category (drinkware, tech, gourmet, etc.), by occasion (onboarding, Diwali, client gifting), and by budget range. Select products you\'re interested in and add them to an enquiry basket — we\'ll come back with a combined quote. No account or login required.', searchText: 'can i see the catalogue online browse products' },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & billing',
    desc: 'How we price, GST, payment terms, and what\'s included',
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="#B8972E" strokeWidth="1" />
        <path d="M9 5.5V6.5M9 11.5V12.5M6.5 9C6.5 9 6.5 10.5 9 10.5C11.5 10.5 11.5 9 9 9C6.5 9 6.5 7.5 9 7.5C11.5 7.5 11.5 9 9 9Z" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { question: 'Are there any hidden charges I should know about?', answer: 'No. Our quotes include <strong>everything</strong>: product cost, branding, quality check, packaging, and standard logistics. What you see on the quote is what appears on the invoice — no logistics surcharges added at the end, no "admin fees", no surprise line items. This is one of the things we feel most strongly about. If you\'ve been burned by invoice surprises from other vendors, that stops here.', searchText: 'are there hidden charges logistics surcharge invoice', tag: 'popular' },
      { question: 'Do you provide GST-compliant invoices?', answer: 'Yes, always. Every invoice is fully GST-compliant with our GSTIN, HSN codes for each product category, and applicable tax breakdowns. If your procurement team or GCC parent company requires specific invoice formats or purchase order references, share the template and we\'ll match it. We\'re built for corporate procurement, not just casual orders.', searchText: 'do you provide gst invoice tax compliant billing' },
      { question: 'What are your payment terms?', answer: 'For first-time orders: <strong>50% advance</strong> on order confirmation, 50% before dispatch. For repeat clients with established history: we offer 30-day credit terms on request. We accept NEFT/RTGS, UPI, and cheque. For large enterprise or GCC orders, we can work within your standard purchase order and payment cycles — speak to us before placing the order.', searchText: 'what are your payment terms advance deposit' },
      { question: 'Do you offer bulk discounts for large orders?', answer: 'Yes — pricing scales with volume. Orders of 100+ units receive a meaningful discount over the base price, and 500+ unit orders are priced at our most competitive rates. Annual contracts (where you commit to a yearly volume across multiple occasions) get the best pricing of all. Our proposals always show the per-unit cost clearly so you can see exactly where the savings are.', searchText: 'do you offer bulk discounts volume pricing large orders' },
    ],
  },
  {
    id: 'esg',
    title: 'Sustainability & ESG',
    desc: 'Eco credentials, carbon tracking, and plastic-free options',
    icon: (
      <svg viewBox="0 0 18 18" fill="none">
        <path d="M9 2C9 2 4 5 4 9.5C4 12 6.2 14 9 14C11.8 14 14 12 14 9.5C14 5 9 2 9 2Z" stroke="#B8972E" strokeWidth="1" fill="none" />
        <path d="M9 14V16M7 16H11" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    items: [
      { question: 'Do you have plastic-free and sustainable gifting options?', answer: 'Yes — we have a dedicated <strong>eco-friendly range</strong> including cork-based products, bamboo stationery, seed paper, jute bags, recycled notebooks, and plastic-free packaging options. Every product in this range is clearly labelled with its material source. We\'re expanding this range actively and can filter the full catalogue to show only eco-certified products on request.', searchText: 'do you have plastic free sustainable eco friendly products', tag: 'new' },
      { question: 'Can you provide ESG documentation or a carbon footprint report for our gifting programme?', answer: 'This is on our active roadmap for 2025–26. Currently, we can provide <strong>material sourcing documentation</strong> for eco-range products (country of origin, material certification, plastic-free verification) which satisfies most MNC and GCC sustainability audit requirements. Full carbon footprint reporting per order is coming — if this is a hard requirement for your procurement cycle, speak to us directly and we\'ll work out what we can provide right now.', searchText: 'can you provide esg carbon footprint report documentation for our company' },
    ],
  },
]

const totalQuestions = faqData.reduce((sum, cat) => sum + cat.items.length, 0)

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'ordering-0': true })
  const [activeCategory, setActiveCategory] = useState('ordering')

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const scrollToCategory = (id: string) => {
    setActiveCategory(id)
    document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredData = searchQuery.trim()
    ? faqData.map(cat => ({
        ...cat,
        items: cat.items.filter(item => {
          const q = searchQuery.toLowerCase()
          return item.searchText.includes(q) || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
        }),
      })).filter(cat => cat.items.length > 0)
    : faqData

  const visibleCount = filteredData.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO */}
      <div className="page-hero">
        <div className="geo-pattern-overlay" style={{ opacity: 0.06, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'%3E%3Cg fill=\'none\' stroke=\'%23B8972E\' stroke-width=\'0.6\'%3E%3Cpolygon points=\'30,4 53,17 53,43 30,56 7,43 7,17\'/%3E%3Cpolygon points=\'30,12 46,21 46,39 30,48 14,39 14,21\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Frequently asked questions</div>
          <h1 className="page-hero-title">
            Everything you<br />need to know.
          </h1>
          <p className="page-hero-sub">
            From minimum order quantities to branding quality and lead times &mdash; we&apos;ve answered the questions we hear most from HR teams, founders, and procurement leads.
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="faq-search-bar">
        <div className="faq-search-inner">
          <div className="faq-search-icon">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="rgba(245,240,230,0.4)" strokeWidth="1" />
              <path d="M10.5 10.5L13.5 13.5" stroke="rgba(245,240,230,0.4)" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search questions — e.g. 'minimum order', 'lead time', 'branding'"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="faq-search-count">
          {searchQuery.trim() ? `${visibleCount} result${visibleCount !== 1 ? 's' : ''}` : `${totalQuestions} questions`}
        </div>
      </div>

      {/* BODY */}
      <div className="faq-body">
        {/* SIDEBAR */}
        <div className="faq-sidebar">
          <div className="faq-sidebar-label">Browse by topic</div>
          {faqData.map(cat => (
            <button
              key={cat.id}
              className={`faq-sidebar-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              <span>{cat.title}</span>
              <span className="faq-sidebar-count">{cat.items.length}</span>
            </button>
          ))}
          <div className="faq-sidebar-divider" />
          <a href="/contact" className="faq-sidebar-btn" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            <span>Ask a question &nearr;</span>
          </a>
        </div>

        {/* FAQ CONTENT */}
        <div className="faq-content">
          {filteredData.map(cat => (
            <div key={cat.id} className="faq-category" id={`faq-${cat.id}`}>
              <div className="faq-cat-header">
                <div className="faq-cat-icon">{cat.icon}</div>
                <div>
                  <div className="faq-cat-title">{cat.title}</div>
                  <div className="faq-cat-desc">{cat.desc}</div>
                </div>
              </div>
              {cat.items.map((item, idx) => {
                const key = `${cat.id}-${idx}`
                const isOpen = !!openItems[key]
                return (
                  <div key={key} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button className="faq-question" onClick={() => toggleItem(key)}>
                      <span>{item.question}</span>
                      <div className="faq-chevron">
                        <svg viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#B8972E" strokeWidth="1.2" strokeLinecap="round" /></svg>
                      </div>
                    </button>
                    <div className="faq-answer">
                      {item.tag === 'popular' && <div className="faq-tag faq-tag-popular">Most asked</div>}
                      {item.tag === 'new' && <div className="faq-tag faq-tag-new">New</div>}
                      <div className="faq-answer-text" dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* STILL HAVE QUESTIONS */}
      <div className="faq-still-qs">
        <div className="geo-pattern-overlay" style={{ opacity: 0.05 }} />
        <div className="faq-still-inner">
          <div>
            <div className="section-eyebrow" style={{ marginBottom: 12 }}>Still have questions?</div>
            <div className="faq-still-title">We&apos;re a WhatsApp message away.</div>
            <p className="faq-still-sub">If your question isn&apos;t here, Anand picks up every WhatsApp personally. Most questions get a reply within 30 minutes during business hours.</p>
          </div>
          <div className="faq-contact-card">
            <div className="faq-contact-icon">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 9.2 1.8 10.3 2.4 11.3L1.5 14.5L4.8 13.6C5.8 14.2 6.9 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z" stroke="#B8972E" strokeWidth="0.9" fill="none" />
              </svg>
            </div>
            <div className="faq-contact-title">WhatsApp us directly</div>
            <div className="faq-contact-desc">Chat with Anand &mdash; Director at MintBox. Real answers, not templates.</div>
            <a href="https://wa.me/919916996642" target="_blank" rel="noopener" className="faq-contact-action">+91 9916996642 &rarr;</a>
          </div>
          <div className="faq-contact-card">
            <div className="faq-contact-icon">
              <svg viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#B8972E" strokeWidth="0.9" fill="none" />
                <path d="M2 5L8 9L14 5" stroke="#B8972E" strokeWidth="0.9" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div className="faq-contact-title">Send us a message</div>
            <div className="faq-contact-desc">Fill the contact form and we&apos;ll reply within 4 hours on business days.</div>
            <a href="/contact" className="faq-contact-action">anand@getmintbox.com &rarr;</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
