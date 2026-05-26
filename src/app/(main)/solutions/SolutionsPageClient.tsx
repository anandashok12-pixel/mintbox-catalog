'use client'

import { useState } from 'react'
import '../landing.css'
import './solutions.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

type PersonaKey = 'hr' | 'marketing' | 'sales' | 'founder'

/* ─── SVG icons (inline, small) ─── */
const PainX = (
  <svg viewBox="0 0 10 10" fill="none">
    <path d="M2 8L8 2M2 2L8 8" stroke="#C45050" strokeWidth="1" strokeLinecap="round" />
  </svg>
)
const SolutionCheck = (
  <svg viewBox="0 0 10 10" fill="none">
    <path d="M2 5L4 7L8 3" stroke="#1B4D3E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function SolutionsPageClient() {
  const [activeTab, setActiveTab] = useState<PersonaKey>('hr')
  const [activePreview, setActivePreview] = useState<PersonaKey>('hr')

  function switchTab(persona: PersonaKey) {
    setActiveTab(persona)
    setActivePreview(persona)
  }

  return (
    <div className="sl-page">
      <Navbar />

      {/* HERO */}
      <div className="sl-hero">
        <div className="sl-hero-pat" />
        <div className="sl-hero-inner">
          <div>
            <div className="sl-hero-label">Solutions by role</div>
            <svg style={{ display: 'block', marginBottom: '0.5rem' }} width="80" height="28" viewBox="0 0 80 28" fill="none">
              <path d="M40 16C33 10,18 4,5 9C-3 13,2 21,14 18C26 15,35 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M40 16C47 10,62 4,75 9C83 13,78 21,66 18C54 15,45 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M34 13C37 10,39 9,40 9C41 9,43 10,46 13C43 16,41 16,40 16C39 16,37 16,34 13Z" stroke="#B8972E" strokeWidth="1.1" fill="none" />
              <path d="M40 16L38 24M40 16L42 24" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <div className="sl-hero-title">MintBox is built<br />for the person<br />reading this.</div>
            <div className="sl-hero-sub">Whether you&apos;re running HR for a unicorn, closing deals for a SaaS company, or building culture from scratch - MintBox works the way you work.</div>
            <div className="sl-hero-ctas">
              <button className="sl-btn-primary" onClick={() => switchTab('hr')}>I&apos;m in HR &amp; People Ops →</button>
              <button className="sl-btn-ghost" onClick={() => switchTab('founder')}>I&apos;m a Founder →</button>
            </div>
          </div>
          <div>
            <div className="sl-persona-preview">
              <div className={`sl-pp-item${activePreview === 'hr' ? ' sl-active' : ''}`} onClick={() => switchTab('hr')}>
                <div className="sl-pp-icon"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.5" stroke="#B8972E" strokeWidth="0.9" /><path d="M3 13C3 10.2 5.2 8 8 8C10.8 8 13 10.2 13 13" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" /></svg></div>
                <div><div className="sl-pp-name">HR &amp; People Ops</div><div className="sl-pp-role">Head of HR · People Partner · Culture Lead</div></div>
                <div className="sl-pp-arrow">→</div>
              </div>
              <div className={`sl-pp-item${activePreview === 'marketing' ? ' sl-active' : ''}`} onClick={() => switchTab('marketing')}>
                <div className="sl-pp-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M3 8C3 8 5 4 8 4C11 4 13 8 13 8C13 8 11 12 8 12C5 12 3 8 3 8Z" stroke="#B8972E" strokeWidth="0.9" fill="none" /><circle cx="8" cy="8" r="1.5" stroke="#B8972E" strokeWidth="0.8" fill="none" /></svg></div>
                <div><div className="sl-pp-name">Marketing &amp; Brand</div><div className="sl-pp-role">Brand Manager · Marketing Head · Comms Lead</div></div>
                <div className="sl-pp-arrow">→</div>
              </div>
              <div className={`sl-pp-item${activePreview === 'sales' ? ' sl-active' : ''}`} onClick={() => switchTab('sales')}>
                <div className="sl-pp-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M3 12L6 9L9 11L13 4" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="13" cy="4" r="1.5" stroke="#B8972E" strokeWidth="0.8" fill="none" /></svg></div>
                <div><div className="sl-pp-name">Sales &amp; Account</div><div className="sl-pp-role">Sales Head · Account Executive · BD Lead</div></div>
                <div className="sl-pp-arrow">→</div>
              </div>
              <div className={`sl-pp-item${activePreview === 'founder' ? ' sl-active' : ''}`} onClick={() => switchTab('founder')}>
                <div className="sl-pp-icon"><svg viewBox="0 0 16 16" fill="none"><path d="M8 2L10 6H14L11 9L12 13L8 10.5L4 13L5 9L2 6H6L8 2Z" stroke="#B8972E" strokeWidth="0.9" fill="none" /></svg></div>
                <div><div className="sl-pp-name">Founders &amp; CEOs</div><div className="sl-pp-role">Founder · CEO · COO · Chief of Staff</div></div>
                <div className="sl-pp-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUYER TABS */}
      <div className="sl-buyer-tabs">
        <button className={`sl-btab${activeTab === 'hr' ? ' sl-active' : ''}`} onClick={() => switchTab('hr')}><div className="sl-btab-dot sl-dot-hr" />HR &amp; People Ops</button>
        <button className={`sl-btab${activeTab === 'marketing' ? ' sl-active' : ''}`} onClick={() => switchTab('marketing')}><div className="sl-btab-dot sl-dot-mkt" />Marketing &amp; Brand</button>
        <button className={`sl-btab${activeTab === 'sales' ? ' sl-active' : ''}`} onClick={() => switchTab('sales')}><div className="sl-btab-dot sl-dot-sales" />Sales &amp; Account</button>
        <button className={`sl-btab${activeTab === 'founder' ? ' sl-active' : ''}`} onClick={() => switchTab('founder')}><div className="sl-btab-dot sl-dot-founder" />Founders &amp; CEOs</button>
      </div>

      {/* ═══════ HR & PEOPLE OPS ═══════ */}
      <div className={`sl-persona-section${activeTab === 'hr' ? ' sl-active' : ''}`}>
        <div className="sl-persona-hero">
          <div>
            <div className="sl-ph-eyebrow" style={{ color: '#2A7A5E' }}>HR &amp; People Operations</div>
            <div className="sl-ph-title">Gifting that builds culture - not admin workload.</div>
            <div className="sl-ph-desc">You&apos;re responsible for how people feel about the company they work at. Every onboarding kit, every Diwali hamper, every work anniversary gift is a reflection of that care. MintBox makes sure the gift lives up to the intention - and takes the operational burden entirely off your plate.</div>
            <div className="sl-ph-pains">
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Spending 3–4 hours chasing couriers and collecting addresses during Diwali</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Logo that looked right on the mockup but arrived peeled or misaligned</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Final invoice 20–30% higher than the original quote</div>
              <div className="sl-ph-pain" style={{ marginTop: '0.5rem' }}><div className="sl-ph-pain-icon sl-solution">{SolutionCheck}</div>MintBox handles address collection, branding, QC, and tracking - you approve once and we do the rest</div>
            </div>
            <button className="sl-ph-cta">See HR solutions →</button>
          </div>
          <div>
            <div className="sl-stat-card">
              <div className="sl-sc-pat" />
              <div className="sl-sc-quote">&ldquo;Our new hires post about the onboarding kit on LinkedIn without us asking. The box is just that good.&rdquo;</div>
              <div className="sl-sc-attr">
                <div className="sl-sc-avatar">PS</div>
                <div><div className="sl-sc-name">Priya S.</div><div className="sl-sc-role">Head of People · Series B, Bengaluru</div><div className="sl-sc-pill">Employee Onboarding</div></div>
              </div>
            </div>
            <div className="sl-stats-row">
              <div className="sl-stat-mini"><div className="sl-sm-num">0</div><div className="sl-sm-label">Hours spent chasing vendors</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">3–4 wk</div><div className="sl-sm-label">Enquiry to doorstep</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">25+</div><div className="sl-sm-label">Min. order units</div></div>
            </div>
          </div>
        </div>

        <div className="sl-use-cases-label">HR use cases</div>
        <div className="sl-use-cases-title">Every moment in the employee journey.</div>
        <div className="sl-use-case-grid">
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#EAF0ED' }}><svg viewBox="0 0 18 18" fill="none"><rect x="3" y="4" width="12" height="11" rx="2" stroke="#1B4D3E" strokeWidth="1" /><path d="M6 4V3C6 2.4 6.4 2 7 2H11C11.6 2 12 2.4 12 3V4" stroke="#1B4D3E" strokeWidth="1" strokeLinecap="round" /><path d="M6 9H12M6 12H10" stroke="#1B4D3E" strokeWidth="1" strokeLinecap="round" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#EAF0ED', color: '#1B4D3E' }}>Day 1</span>
              </div>
              <div className="sl-uc-name">Employee Onboarding</div>
              <div className="sl-uc-desc">Make Day 1 feel designed for them. Pre-branded, multi-item kits delivered to home or office - automated as new hires join.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Branded bottle</span><span className="sl-uc-product">Premium notebook</span><span className="sl-uc-product">Tote bag</span><span className="sl-uc-product">Snack box</span><span className="sl-uc-product">Welcome card</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹1,500 – ₹3,500 / kit</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#F7F1E2' }}><svg viewBox="0 0 18 18" fill="none"><path d="M9 2L11.5 7L17 7.5L13 11.5L14 17L9 14.5L4 17L5 11.5L1 7.5L6.5 7L9 2Z" stroke="#B8972E" strokeWidth="1" fill="none" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#F7F1E2', color: '#7A6020' }}>Festive</span>
              </div>
              <div className="sl-uc-name">Diwali &amp; Festive Gifting</div>
              <div className="sl-uc-desc">Ship to 500 individual home addresses simultaneously. Address collection tool included - your team fills their own details.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Gourmet hampers</span><span className="sl-uc-product">Wellness kits</span><span className="sl-uc-product">Premium drinkware</span><span className="sl-uc-product">Eco packaging</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹1,000 – ₹5,000 / unit</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#EEF2FA' }}><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6.5" stroke="#2A4F7A" strokeWidth="1" /><path d="M9 6V9L11 11" stroke="#2A4F7A" strokeWidth="1" strokeLinecap="round" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#EEF2FA', color: '#2A4F7A' }}>Milestone</span>
              </div>
              <div className="sl-uc-name">Work Anniversary</div>
              <div className="sl-uc-desc">Tiered gifting that escalates with tenure - Year 1, 3, 5, 10. We keep your branding files for seamless reorders.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Luxury accessories</span><span className="sl-uc-product">Premium tech</span><span className="sl-uc-product">Personalised gifts</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹2,000 – ₹8,000 / unit</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
        </div>

        {/* Industry strip */}
        <div className="sl-industry-strip">
          <div><div className="sl-is-label">Industries we serve</div><div className="sl-is-title">HR teams across every sector in Bengaluru.</div></div>
          <div className="sl-industry-grid">
            <div className="sl-ind-card">
              <div className="sl-ind-icon"><svg viewBox="0 0 15 15" fill="none"><rect x="2" y="4" width="11" height="8" rx="1.5" stroke="#B8972E" strokeWidth="0.9" /><path d="M5 4V3C5 2.4 5.4 2 6 2H9C9.6 2 10 2.4 10 3V4" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" /><path d="M2 8H13" stroke="#B8972E" strokeWidth="0.8" /></svg></div>
              <div className="sl-ind-name">IT &amp; SaaS</div>
              <div className="sl-ind-desc">Onboarding kits for high-growth tech teams. Remote-first delivery.</div>
            </div>
            <div className="sl-ind-card">
              <div className="sl-ind-icon"><svg viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5" stroke="#B8972E" strokeWidth="0.9" /><path d="M7.5 4V7.5L10 9" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" /></svg></div>
              <div className="sl-ind-name">GCCs &amp; MNCs</div>
              <div className="sl-ind-desc">GST-compliant invoicing, ESG docs, enterprise procurement support.</div>
            </div>
            <div className="sl-ind-card">
              <div className="sl-ind-icon"><svg viewBox="0 0 15 15" fill="none"><path d="M3 13V7L7.5 4L12 7V13H9V10H6V13H3Z" stroke="#B8972E" strokeWidth="0.9" fill="none" /></svg></div>
              <div className="sl-ind-name">BFSI &amp; Consulting</div>
              <div className="sl-ind-desc">Premium gifting for high-value relationships and milestone recognition.</div>
            </div>
            <div className="sl-ind-card">
              <div className="sl-ind-icon"><svg viewBox="0 0 15 15" fill="none"><path d="M7.5 2C7.5 2 4 4.5 4 7.5C4 10 5.6 11.5 7.5 11.5C9.4 11.5 11 10 11 7.5C11 4.5 7.5 2 7.5 2Z" stroke="#B8972E" strokeWidth="0.9" fill="none" /></svg></div>
              <div className="sl-ind-name">Pharma &amp; Health</div>
              <div className="sl-ind-desc">Wellness economy gifting aligned with healthcare brand values.</div>
            </div>
            <div className="sl-ind-card">
              <div className="sl-ind-icon"><svg viewBox="0 0 15 15" fill="none"><rect x="2" y="6" width="11" height="7" rx="1" stroke="#B8972E" strokeWidth="0.9" /><path d="M5 6V4.5C5 3.4 6.1 2.5 7.5 2.5C8.9 2.5 10 3.4 10 4.5V6" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" /></svg></div>
              <div className="sl-ind-name">Manufacturing</div>
              <div className="sl-ind-desc">Safety milestone rewards and festive gifting for large shop-floor teams.</div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="sl-comparison">
          <div className="sl-cmp-head"><div><div className="sl-cmp-title">MintBox vs. the typical vendor</div><div className="sl-cmp-sub">What HR teams actually experience</div></div></div>
          <table className="sl-cmp-table">
            <thead><tr><th style={{ width: 200 }}>What matters to HR</th><th>Typical vendor</th><th className="sl-highlight">MintBox</th></tr></thead>
            <tbody>
              <tr><td className="sl-cmp-row-label">Address collection</td><td className="sl-cmp-no">Your spreadsheet, your problem</td><td className="sl-highlight sl-cmp-yes">Address collection tool - team fills their own</td></tr>
              <tr><td className="sl-cmp-row-label">Branding quality</td><td className="sl-cmp-no">Outsourced, inconsistent</td><td className="sl-highlight sl-cmp-yes">In-house, QC checked before dispatch</td></tr>
              <tr><td className="sl-cmp-row-label">Invoice accuracy</td><td className="sl-cmp-no">Surprises at final invoice stage</td><td className="sl-highlight sl-cmp-yes">Quote = invoice. Always.</td></tr>
              <tr><td className="sl-cmp-row-label">Delivery tracking</td><td className="sl-cmp-no">One link, no visibility</td><td className="sl-highlight sl-cmp-yes">Individual tracking per address</td></tr>
              <tr><td className="sl-cmp-row-label">Damage resolution</td><td className="sl-cmp-no">Dispute process, slow refund</td><td className="sl-highlight sl-cmp-yes">Replace within 3–5 days, no charge</td></tr>
              <tr><td className="sl-cmp-row-label">Reorder ease</td><td className="sl-cmp-no">Start the process again</td><td className="sl-highlight sl-cmp-yes">Files saved, one message to reorder</td></tr>
            </tbody>
          </table>
        </div>

        {/* Quote band */}
        <div className="sl-quote-band">
          <div className="sl-qb-pat" />
          <div>
            <div className="sl-qb-label">For HR &amp; People Ops teams</div>
            <div className="sl-qb-title">&ldquo;Tell us your headcount and the occasion. We&apos;ll handle everything else.&rdquo;</div>
            <div className="sl-qb-sub">Most HR teams spend 3–4 hours managing a gifting order. With MintBox, that drops to a single approval.</div>
          </div>
          <div className="sl-qb-form">
            <input className="sl-qbf" type="text" placeholder="Your name" />
            <input className="sl-qbf" type="text" placeholder="Company name" />
            <div className="sl-qbf-row">
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>Occasion</option>
                <option>Onboarding</option><option>Diwali</option><option>Anniversary</option><option>Other</option>
              </select>
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>Team size</option>
                <option>Under 25</option><option>25–100</option><option>100–500</option><option>500+</option>
              </select>
            </div>
            <button className="sl-qbf-submit">Request a quote →</button>
            <div className="sl-qbf-wa">WhatsApp us directly: <a href="https://wa.me/919886537631">+91 9886537631 →</a></div>
          </div>
        </div>
      </div>

      {/* ═══════ MARKETING & BRAND ═══════ */}
      <div className={`sl-persona-section${activeTab === 'marketing' ? ' sl-active' : ''}`}>
        <div className="sl-persona-hero">
          <div>
            <div className="sl-ph-eyebrow" style={{ color: '#B8972E' }}>Marketing &amp; Brand</div>
            <div className="sl-ph-title">Swag that becomes content. Gifting that earns reach.</div>
            <div className="sl-ph-desc">You think about brand equity in everything you touch. A gift is a physical extension of your brand - the unboxing moment is earned media waiting to happen. MintBox gives you the branding quality to make that moment Instagram-worthy, every time.</div>
            <div className="sl-ph-pains">
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Logo colour is off - PMS 356 becomes something closer to lime green</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Generic swag catalogue - same products your competitor ordered last Diwali</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Unboxing is forgettable - no one photographs it, no one shares it</div>
              <div className="sl-ph-pain" style={{ marginTop: '0.5rem' }}><div className="sl-ph-pain-icon sl-solution">{SolutionCheck}</div>MintBox matches your exact brand colours, curates products that photograph beautifully, and designs unboxings that get shared</div>
            </div>
            <button className="sl-ph-cta" style={{ background: '#B8972E', color: '#122E25' }}>See Marketing solutions →</button>
          </div>
          <div>
            <div className="sl-stat-card">
              <div className="sl-sc-pat" />
              <div className="sl-sc-quote">&ldquo;The branding quality is the closest I&apos;ve seen to international vendors - delivered locally and on time.&rdquo;</div>
              <div className="sl-sc-attr">
                <div className="sl-sc-avatar">VN</div>
                <div><div className="sl-sc-name">Vikram N.</div><div className="sl-sc-role">Brand Head · GCC, Bengaluru</div><div className="sl-sc-pill">Brand &amp; Swag</div></div>
              </div>
            </div>
            <div className="sl-stats-row">
              <div className="sl-stat-mini"><div className="sl-sm-num">6</div><div className="sl-sm-label">Branding techniques available</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">∞</div><div className="sl-sm-label">Mockup revisions until approved</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">In-house</div><div className="sl-sm-label">Artwork prep - never outsourced</div></div>
            </div>
          </div>
        </div>

        <div className="sl-use-cases-label">Marketing use cases</div>
        <div className="sl-use-cases-title">Brand at every touchpoint.</div>
        <div className="sl-use-case-grid">
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#F7F1E2' }}><svg viewBox="0 0 18 18" fill="none"><path d="M3 3H15V13H3V3Z" stroke="#B8972E" strokeWidth="1" fill="none" /><path d="M3 7H15M9 3V13" stroke="#B8972E" strokeWidth="0.8" strokeLinecap="round" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#F7F1E2', color: '#7A6020' }}>Events</span>
              </div>
              <div className="sl-uc-name">Conference &amp; Event Swag</div>
              <div className="sl-uc-desc">Swag that people take home - not leave in the delegate bag. Products that photograph well and keep your brand in the room long after the event ends.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Premium totes</span><span className="sl-uc-product">Branded apparel</span><span className="sl-uc-product">Tech accessories</span><span className="sl-uc-product">Notebooks</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹500 – ₹2,000 / unit</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#EEF2FA' }}><svg viewBox="0 0 18 18" fill="none"><path d="M9 2L12 7.5H16.5L13 11L14.5 16.5L9 13.5L3.5 16.5L5 11L1.5 7.5H6L9 2Z" stroke="#2A4F7A" strokeWidth="1" fill="none" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#EEF2FA', color: '#2A4F7A' }}>Launch</span>
              </div>
              <div className="sl-uc-name">Product Launch Kits</div>
              <div className="sl-uc-desc">Send journalists, creators, and key customers a launch kit that tells your product story physically. Premium unboxing designed to be opened on camera.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Custom packaging</span><span className="sl-uc-product">Product samples</span><span className="sl-uc-product">Brand collateral</span><span className="sl-uc-product">Premium inserts</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹2,000 – ₹8,000 / kit</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#EAF0ED' }}><svg viewBox="0 0 18 18" fill="none"><path d="M9 3C6.2 3 4 5.2 4 8C4 11 9 15 9 15C9 15 14 11 14 8C14 5.2 11.8 3 9 3Z" stroke="#1B4D3E" strokeWidth="1" fill="none" /><circle cx="9" cy="8" r="2" stroke="#1B4D3E" strokeWidth="0.9" fill="none" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#EAF0ED', color: '#1B4D3E' }}>Culture</span>
              </div>
              <div className="sl-uc-name">Employer Brand Kits</div>
              <div className="sl-uc-desc">Build visible culture through branded merchandise your team actually wears and uses. Seen on LinkedIn, Glassdoor, and beyond - organic employer brand at scale.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Branded hoodies</span><span className="sl-uc-product">Quality caps</span><span className="sl-uc-product">Lifestyle accessories</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹1,500 – ₹4,000 / unit</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
        </div>

        <div className="sl-quote-band">
          <div className="sl-qb-pat" />
          <div>
            <div className="sl-qb-label">For Marketing &amp; Brand teams</div>
            <div className="sl-qb-title">&ldquo;When the unboxing is worth photographing, the gift becomes content.&rdquo;</div>
            <div className="sl-qb-sub">Tell us about your brand and your next activation. We&apos;ll build a kit that looks as good as your best campaign.</div>
          </div>
          <div className="sl-qb-form">
            <input className="sl-qbf" type="text" placeholder="Your name" />
            <input className="sl-qbf" type="text" placeholder="Company name" />
            <div className="sl-qbf-row">
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>Use case</option>
                <option>Event swag</option><option>Product launch</option><option>Employer brand</option><option>Other</option>
              </select>
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>Volume</option>
                <option>Under 100</option><option>100–500</option><option>500–2,000</option><option>2,000+</option>
              </select>
            </div>
            <button className="sl-qbf-submit" style={{ background: '#B8972E' }}>Request a quote →</button>
            <div className="sl-qbf-wa">WhatsApp us: <a href="https://wa.me/919886537631">+91 9886537631 →</a></div>
          </div>
        </div>
      </div>

      {/* ═══════ SALES & ACCOUNT ═══════ */}
      <div className={`sl-persona-section${activeTab === 'sales' ? ' sl-active' : ''}`}>
        <div className="sl-persona-hero">
          <div>
            <div className="sl-ph-eyebrow" style={{ color: '#2A4F7A' }}>Sales &amp; Account Management</div>
            <div className="sl-ph-title">Gifts that close deals and renew contracts.</div>
            <div className="sl-ph-desc">You know the ROI of a well-timed gift. A premium gesture at the right moment - deal closure, contract renewal, a key client&apos;s birthday - can shift a relationship from transactional to loyal. MintBox gives you high-quality, branded gifts that signal you value the partnership, not just the revenue.</div>
            <div className="sl-ph-pains">
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Generic hampers that feel like a checkbox, not a thank-you</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>No way to scale - gifting 50 clients at renewal time is operationally painful</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Your brand is on the gift - but the quality doesn&apos;t match your pitch deck</div>
              <div className="sl-ph-pain" style={{ marginTop: '0.5rem' }}><div className="sl-ph-pain-icon sl-solution">{SolutionCheck}</div>MintBox curates high-value gifts at ₹4,000–₹12,000 per client, delivered individually to any address, with the premium branding your brand demands</div>
            </div>
            <button className="sl-ph-cta" style={{ background: '#2A4F7A' }}>See Sales solutions →</button>
          </div>
          <div>
            <div className="sl-stat-card">
              <div className="sl-sc-pat" />
              <div className="sl-sc-quote">&ldquo;We sent MintBox gifts to 40 clients before renewal season. Three mentioned it in the contract call. That&apos;s attribution you can&apos;t ignore.&rdquo;</div>
              <div className="sl-sc-attr">
                <div className="sl-sc-avatar">KM</div>
                <div><div className="sl-sc-name">Karan M.</div><div className="sl-sc-role">VP Sales · SaaS startup, Bengaluru</div><div className="sl-sc-pill">Client Appreciation</div></div>
              </div>
            </div>
            <div className="sl-stats-row">
              <div className="sl-stat-mini"><div className="sl-sm-num">₹4k+</div><div className="sl-sm-label">Premium client gift tier</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">1 day</div><div className="sl-sm-label">Quote turnaround</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">Any</div><div className="sl-sm-label">Address, any city in India</div></div>
            </div>
          </div>
        </div>

        <div className="sl-use-cases-label">Sales use cases</div>
        <div className="sl-use-cases-title">Every stage of the client relationship.</div>
        <div className="sl-use-case-grid">
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#EAF0ED' }}><svg viewBox="0 0 18 18" fill="none"><path d="M3 9C3 6 5.2 3.5 8 3.5C8 3.5 9 6 9 9C9 12 8 14.5 8 14.5C5.2 14.5 3 12 3 9Z" stroke="#1B4D3E" strokeWidth="1" fill="none" /><path d="M15 9C15 6 12.8 3.5 10 3.5C10 3.5 9 6 9 9C9 12 10 14.5 10 14.5C12.8 14.5 15 12 15 9Z" stroke="#1B4D3E" strokeWidth="1" fill="none" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#EAF0ED', color: '#1B4D3E' }}>Deal close</span>
              </div>
              <div className="sl-uc-name">Deal Closure Gift</div>
              <div className="sl-uc-desc">Celebrate a signed contract with a premium gift that lands the day of signing. A physical signal that this relationship matters from day one.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Luxury hamper</span><span className="sl-uc-product">Premium whisky/tea</span><span className="sl-uc-product">Leather accessories</span><span className="sl-uc-product">Personalised note</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹4,000 – ₹12,000 / gift</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#F7F1E2' }}><svg viewBox="0 0 18 18" fill="none"><path d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7L9 2Z" stroke="#B8972E" strokeWidth="1" fill="none" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#F7F1E2', color: '#7A6020' }}>Renewal</span>
              </div>
              <div className="sl-uc-name">Contract Renewal Gift</div>
              <div className="sl-uc-desc">Reach clients before renewal season with a considered gift that reinforces why they should stay. Scale across your entire book of business simultaneously.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Executive gift sets</span><span className="sl-uc-product">Premium notebooks</span><span className="sl-uc-product">Curated gourmet</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹3,500 – ₹8,000 / gift</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#EEF2FA' }}><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="#2A4F7A" strokeWidth="1" fill="none" /><path d="M4 15C4 12.2 6.2 10 9 10C11.8 10 14 12.2 14 15" stroke="#2A4F7A" strokeWidth="1" strokeLinecap="round" fill="none" /><path d="M13 5L15 7M13 7L15 5" stroke="#2A4F7A" strokeWidth="0.9" strokeLinecap="round" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#EEF2FA', color: '#2A4F7A' }}>Appreciation</span>
              </div>
              <div className="sl-uc-name">Key Account Appreciation</div>
              <div className="sl-uc-desc">For the accounts that matter most - a deeply personal, high-value gift that goes beyond the usual Diwali hamper. Memorable, branded, and delivered with intent.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Personalised luxury items</span><span className="sl-uc-product">Premium tech</span><span className="sl-uc-product">Artisan products</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹6,000 – ₹15,000 / gift</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
        </div>

        <div className="sl-quote-band">
          <div className="sl-qb-pat" />
          <div>
            <div className="sl-qb-label">For Sales &amp; Account teams</div>
            <div className="sl-qb-title">&ldquo;Tell us your client list and your budget. We&apos;ll handle the rest before renewal season.&rdquo;</div>
            <div className="sl-qb-sub">Scale client gifting across your entire book of business without adding administrative overhead.</div>
          </div>
          <div className="sl-qb-form">
            <input className="sl-qbf" type="text" placeholder="Your name" />
            <input className="sl-qbf" type="text" placeholder="Company name" />
            <div className="sl-qbf-row">
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>Occasion</option>
                <option>Deal closure</option><option>Contract renewal</option><option>Client appreciation</option><option>Diwali</option>
              </select>
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>No. of clients</option>
                <option>Under 10</option><option>10–50</option><option>50–200</option><option>200+</option>
              </select>
            </div>
            <button className="sl-qbf-submit" style={{ background: '#2A4F7A', color: 'white' }}>Request a quote →</button>
            <div className="sl-qbf-wa">WhatsApp us: <a href="https://wa.me/919886537631">+91 9886537631 →</a></div>
          </div>
        </div>
      </div>

      {/* ═══════ FOUNDERS & CEOs ═══════ */}
      <div className={`sl-persona-section${activeTab === 'founder' ? ' sl-active' : ''}`}>
        <div className="sl-persona-hero">
          <div>
            <div className="sl-ph-eyebrow" style={{ color: '#7A2A5E' }}>Founders &amp; CEOs</div>
            <div className="sl-ph-title">Your first 20 hires set the culture your next 200 inherits.</div>
            <div className="sl-ph-desc">At the early stage, every touchpoint is a culture signal. The box your first hire opens on Day 1 tells them whether you&apos;re building something that sweats the details - or something that doesn&apos;t. MintBox gives founders a way to signal premium culture from day one, without MOQ pressure or time investment.</div>
            <div className="sl-ph-pains">
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Minimum order quantities that don&apos;t make sense for a 15-person team</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>No time to design a kit - too many other priorities</div>
              <div className="sl-ph-pain"><div className="sl-ph-pain-icon sl-pain">{PainX}</div>Gifting that doesn&apos;t match the premium brand you&apos;re trying to build</div>
              <div className="sl-ph-pain" style={{ marginTop: '0.5rem' }}><div className="sl-ph-pain-icon sl-solution">{SolutionCheck}</div>MintBox starts at 25 units, curates the kit for you, and sets up a reorder system so every new hire gets the same premium experience automatically</div>
            </div>
            <button className="sl-ph-cta" style={{ background: '#7A2A5E' }}>See Founder solutions →</button>
          </div>
          <div>
            <div className="sl-stat-card">
              <div className="sl-sc-pat" />
              <div className="sl-sc-quote">&ldquo;We&apos;re 22 people. MintBox still made us feel like a 500-person company with a culture team. That&apos;s the brand signal we needed.&rdquo;</div>
              <div className="sl-sc-attr">
                <div className="sl-sc-avatar">AR</div>
                <div><div className="sl-sc-name">Arjun R.</div><div className="sl-sc-role">Founder &amp; CEO · Seed-stage SaaS, Bengaluru</div><div className="sl-sc-pill">Onboarding Kit</div></div>
              </div>
            </div>
            <div className="sl-stats-row">
              <div className="sl-stat-mini"><div className="sl-sm-num">25</div><div className="sl-sm-label">Minimum units - no pressure</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">1 day</div><div className="sl-sm-label">We curate your kit proposal</div></div>
              <div className="sl-stat-mini"><div className="sl-sm-num">Auto</div><div className="sl-sm-label">Reorder for every new hire</div></div>
            </div>
          </div>
        </div>

        <div className="sl-use-cases-label">Founder use cases</div>
        <div className="sl-use-cases-title">Build culture from day one.</div>
        <div className="sl-use-case-grid">
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#F5EEF8' }}><svg viewBox="0 0 18 18" fill="none"><rect x="3" y="4" width="12" height="11" rx="2" stroke="#7A2A5E" strokeWidth="1" /><path d="M6 4V3C6 2.4 6.4 2 7 2H11C11.6 2 12 2.4 12 3V4" stroke="#7A2A5E" strokeWidth="1" strokeLinecap="round" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#F5EEF8', color: '#7A2A5E' }}>Culture</span>
              </div>
              <div className="sl-uc-name">Founder&apos;s Onboarding Kit</div>
              <div className="sl-uc-desc">A curated, premium Day 1 kit that tells your culture story. We design it once - you reorder as the team grows. Sets the tone for every new hire that follows.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Branded bottle</span><span className="sl-uc-product">Premium notebook</span><span className="sl-uc-product">Tote bag</span><span className="sl-uc-product">Snack box</span><span className="sl-uc-product">Personalised card</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹1,500 – ₹3,500 / kit</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#EAF0ED' }}><svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3" stroke="#1B4D3E" strokeWidth="1" fill="none" /><path d="M4 15C4 12.2 6.2 10 9 10C11.8 10 14 12.2 14 15" stroke="#1B4D3E" strokeWidth="1" strokeLinecap="round" fill="none" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#EAF0ED', color: '#1B4D3E' }}>Investors</span>
              </div>
              <div className="sl-uc-name">Investor &amp; Advisor Gifts</div>
              <div className="sl-uc-desc">Show appreciation to your cap table and advisors with a premium, thoughtful gift that reflects the quality of what you&apos;re building - not a last-minute hamper.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Luxury hampers</span><span className="sl-uc-product">Premium artisanal</span><span className="sl-uc-product">Executive accessories</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹4,000 – ₹10,000 / gift</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
          <div className="sl-uc-card">
            <div className="sl-uc-top">
              <div className="sl-uc-icon-row">
                <div className="sl-uc-icon" style={{ background: '#F7F1E2' }}><svg viewBox="0 0 18 18" fill="none"><path d="M9 3L11.5 8.5H16.5L12.5 12L14 17L9 14L4 17L5.5 12L1.5 8.5H6.5L9 3Z" stroke="#B8972E" strokeWidth="1" fill="none" /></svg></div>
                <span className="sl-uc-occasion" style={{ background: '#F7F1E2', color: '#7A6020' }}>Milestone</span>
              </div>
              <div className="sl-uc-name">Founding Team Gift</div>
              <div className="sl-uc-desc">Celebrate a funding round, product launch, or company milestone with a gift that says &ldquo;we built something real.&rdquo; A founding team moment deserves more than a Slack message.</div>
            </div>
            <div className="sl-uc-body">
              <div className="sl-uc-products"><span className="sl-uc-product">Custom packaging</span><span className="sl-uc-product">Premium drinkware</span><span className="sl-uc-product">Personalised mementos</span></div>
              <div className="sl-uc-footer"><div className="sl-uc-budget">₹3,000 – ₹8,000 / gift</div><span className="sl-uc-link">Explore →</span></div>
            </div>
          </div>
        </div>

        <div className="sl-quote-band">
          <div className="sl-qb-pat" />
          <div>
            <div className="sl-qb-label">For Founders &amp; CEOs</div>
            <div className="sl-qb-title">&ldquo;Tell us your team size and what you&apos;re building. We&apos;ll design the kit.&rdquo;</div>
            <div className="sl-qb-sub">Most founders spend 2 hours choosing products, 1 hour designing the brief, and 3 hours chasing delivery. With MintBox, you approve once.</div>
          </div>
          <div className="sl-qb-form">
            <input className="sl-qbf" type="text" placeholder="Your name" />
            <input className="sl-qbf" type="text" placeholder="Company / startup name" />
            <div className="sl-qbf-row">
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>Use case</option>
                <option>Onboarding kit</option><option>Investor gift</option><option>Team milestone</option><option>Diwali</option>
              </select>
              <select className="sl-qbf" style={{ appearance: 'none', cursor: 'pointer' }} defaultValue="">
                <option value="" disabled>Team size</option>
                <option>Under 10</option><option>10–25</option><option>25–100</option><option>100+</option>
              </select>
            </div>
            <button className="sl-qbf-submit" style={{ background: '#7A2A5E', color: 'white' }}>Request a quote →</button>
            <div className="sl-qbf-wa">WhatsApp us directly: <a href="https://wa.me/919886537631">+91 9886537631 →</a></div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
