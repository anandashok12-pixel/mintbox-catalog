'use client'

import React, { useEffect } from 'react'
import '../app/(main)/landing.css'

export function LandingPage() {

  useEffect(() => {
    /* ---------- STICKY NAV ---------- */
    const navbar = document.getElementById('navbar')
    const onScroll = () => {
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ---------- MOBILE NAV ---------- */
    const hamburger = document.getElementById('hamburgerBtn')
    const mobileNav = document.getElementById('mobileNav')
    const mobileNavClose = document.getElementById('mobileNavClose')
    const openNav = () => mobileNav?.classList.add('open')
    const closeNav = () => mobileNav?.classList.remove('open')
    hamburger?.addEventListener('click', openNav)
    mobileNavClose?.addEventListener('click', closeNav)
    mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav))

    /* ---------- SCROLL REVEAL ---------- */
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    reveals.forEach((el) => observer.observe(el))

    /* Trigger hero reveals immediately */
    document.querySelectorAll('#hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 150)
    })

    /* ---------- FORM SUBMIT ---------- */
    const quoteForm = document.getElementById('quoteForm') as HTMLFormElement | null
    const onQuoteSubmit = function (this: HTMLFormElement, e: Event) {
      e.preventDefault()
      // Clear previous errors
      this.querySelectorAll('.form-error').forEach(el => (el as HTMLElement).style.display = 'none')
      this.querySelectorAll('.form-input-error').forEach(el => el.classList.remove('form-input-error'))

      // Validate required fields
      let valid = true
      const fields = [
        { id: 'form-name', errorId: 'form-name-error' },
        { id: 'form-email', errorId: 'form-email-error' },
        { id: 'form-company', errorId: 'form-company-error' },
      ]
      fields.forEach(({ id, errorId }) => {
        const input = document.getElementById(id) as HTMLInputElement
        const error = document.getElementById(errorId)
        if (input && !input.value.trim()) {
          input.classList.add('form-input-error')
          if (error) error.style.display = 'block'
          valid = false
        }
        if (id === 'form-email' && input?.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          input.classList.add('form-input-error')
          if (error) error.style.display = 'block'
          valid = false
        }
      })

      if (!valid) return

      // Show loading state
      const btn = this.querySelector('.form-submit') as HTMLButtonElement | null
      const btnText = this.querySelector('.form-submit-text') as HTMLElement | null
      const btnLoading = this.querySelector('.form-submit-loading') as HTMLElement | null
      if (btn && btnText && btnLoading) {
        btn.disabled = true
        btnText.style.display = 'none'
        btnLoading.style.display = 'inline'
      }

      // Simulate submission
      setTimeout(() => {
        if (btn && btnText && btnLoading) {
          btnLoading.style.display = 'none'
          btnText.textContent = "Sent! We'll be in touch soon ✦"
          btnText.style.display = 'inline'
          btn.style.background = 'rgba(184,151,46,0.5)'
        }
      }, 1200)
    }
    quoteForm?.addEventListener('submit', onQuoteSubmit)

    const newsletterForm = document.getElementById('newsletterForm') as HTMLFormElement | null
    const onNewsletterSubmit = function (this: HTMLFormElement, e: Event) {
      e.preventDefault()
      const btn = this.querySelector('button') as HTMLButtonElement | null
      if (btn) {
        btn.textContent = '✓'
        btn.disabled = true
      }
    }
    newsletterForm?.addEventListener('submit', onNewsletterSubmit)

    /* ---------- ACTIVE NAV LINK ---------- */
    const sectionIds = ['occasions', 'how-it-works', 'collections', 'why-mintbox', 'catalog', 'testimonials', 'quote-cta', 'journal', 'footer']
    const navLinks = document.querySelectorAll('.nav-link')
    const onNavScroll = () => {
      let current = ''
      sectionIds.forEach(id => {
        const section = document.getElementById(id)
        if (section && window.scrollY >= section.offsetTop - 200) {
          current = id
        }
      })
      navLinks.forEach(link => {
        link.classList.remove('nav-active')
        const href = link.getAttribute('href')
        if (href && href === '#' + current) {
          link.classList.add('nav-active')
        }
      })
    }
    window.addEventListener('scroll', onNavScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onNavScroll)

      hamburger?.removeEventListener('click', openNav)
      mobileNavClose?.removeEventListener('click', closeNav)
      observer.disconnect()
      quoteForm?.removeEventListener('submit', onQuoteSubmit)
      newsletterForm?.removeEventListener('submit', onNewsletterSubmit)
    }
  }, [])

  return (
    <>
      {/* MOBILE NAV OVERLAY */}
      <div className="mobile-nav" id="mobileNav">
        <button className="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">✕</button>
        <a href="#occasions">Catalogue</a>
        <a href="#occasions">Occasions</a>
        <a href="#how-it-works">How it works</a>
        <a href="#footer">About</a>
        <a href="#journal">Journal</a>
        <a href="#quote-cta" style={{ color: 'var(--gold)' }}>Request a Quote</a>
      </div>

      {/* NAVBAR */}
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <a href="#" className="nav-logo" aria-label="MintBox Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.png" alt="MintBox" className="nav-logo-img" />
        </a>

        <ul className="nav-links" role="list">
          <li><a href="#occasions" className="nav-link">Catalogue</a></li>
          <li><a href="#occasions" className="nav-link">Occasions</a></li>
          <li><a href="#how-it-works" className="nav-link">How it works</a></li>
          <li><a href="#footer" className="nav-link">About</a></li>
          <li><a href="#journal" className="nav-link">Journal</a></li>
        </ul>

        <div className="nav-actions">
          <a href="#quote-cta" className="btn-primary">Request a Quote</a>
          <button className="hamburger" id="hamburgerBtn" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* SECTION 1: HERO — Centered */}
      <section id="hero" aria-label="Hero">
        <div className="geo-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <h1 className="hero-headline reveal reveal-delay-1">
            Gifting that says<br/><em>what words can&apos;t.</em>
          </h1>
          <p className="hero-sub reveal reveal-delay-2">
            Premium corporate gifts for India&apos;s most ambitious teams. From onboarding kits to Diwali hampers — delivered with the precision your brand deserves.
          </p>
          <div className="hero-ctas reveal reveal-delay-3">
            <a href="#quote-cta" className="hero-btn-primary">Request a Quote</a>
            <a href="#occasions" className="hero-btn-secondary">Browse Catalogue</a>
          </div>
        </div>
      </section>

      {/* AUTO-SCROLLING HAMPER STRIP */}
      <div className="hamper-strip" aria-label="Gift hamper gallery">
          <div className="hamper-track">
            {/* Cards × 2 for seamless loop */}
            {(() => {
              const items = [
                { src: '/hampers/hamper7.png',  label: 'Festive Hamper' },
                { src: '/hampers/hamper8.png',  label: 'Artisan Gift Box' },
                { src: '/hampers/hamper9.png',  label: 'Luxury Corporate Kit' },
                { src: '/hampers/hamper10.png', label: 'Premium Gift Box' },
                { src: '/hampers/hamper11.png', label: 'Branded Corporate Box' },
                { src: '/hampers/hamper12.png', label: 'Wellness Hamper' },
                { src: '/hampers/hamper6.png',  label: 'Bamboo Office Kit' },
                { src: '/hampers/hamper1.png',  label: 'Araku Coffee Kit' },
              ];
              return [...items, ...items];
            })().map((card, i) => (
              <div className="hamper-card" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.src} alt={card.label} loading={i < 7 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        </div>

      {/* SECTION 2: TRUST BAR */}
      <div id="trust-bar" aria-label="Client trust bar">
        <div className="trust-bar-inner">
          {/* Left: scrolling logos */}
          <div className="trust-logos">
            <p className="trust-logos-label">Trusted by teams at</p>
            <div className="marquee-wrap">
              <div className="marquee-track" aria-hidden="true">
                {/* set × 2 for seamless loop */}
                {[
                  { src: '/clients/icici.png', alt: 'ICICI Bank' },
                  { src: '/clients/quixta.png', alt: 'Quixta' },
                  { src: '/clients/tedx.png', alt: 'TEDx' },
                  { src: '/clients/open.png', alt: 'Open' },
                  { src: '/clients/mana.png', alt: 'MANA' },
                  { src: '/clients/excitel.png', alt: 'Excitel' },
                  { src: '/clients/practo.png', alt: 'Practo' },
                  { src: '/clients/plivo.png', alt: 'Plivo' },
                  { src: '/clients/icici.png', alt: 'ICICI Bank' },
                  { src: '/clients/quixta.png', alt: 'Quixta' },
                  { src: '/clients/tedx.png', alt: 'TEDx' },
                  { src: '/clients/open.png', alt: 'Open' },
                  { src: '/clients/mana.png', alt: 'MANA' },
                  { src: '/clients/excitel.png', alt: 'Excitel' },
                  { src: '/clients/practo.png', alt: 'Practo' },
                  { src: '/clients/plivo.png', alt: 'Plivo' },
                ].map((logo, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img key={i} src={logo.src} alt={logo.alt} className="client-logo" />
                ))}
              </div>
            </div>
          </div>
          {/* Right: stats */}
          <div className="trust-stats">
            <div className="trust-stat">
              <span className="trust-stat-num">500+</span>
              <span className="trust-stat-label">Curated Products</span>
            </div>
            <div className="trust-stat-divider" />
            <div className="trust-stat">
              <span className="trust-stat-num">10 Units</span>
              <span className="trust-stat-label">Min. Order Qty</span>
            </div>
            <div className="trust-stat-divider" />
            <div className="trust-stat">
              <span className="trust-stat-num">Pan India</span>
              <span className="trust-stat-label">Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: OCCASIONS */}
      <section id="occasions" aria-label="Shop by occasion">
        <div className="section-header-center reveal">
          <span className="section-label">Shop by Occasion</span>
          <h2 className="section-headline">Every moment deserves a MintBox.</h2>
          <span className="gold-rule"></span>
        </div>

        <div className="occasions-grid">
          <article className="occasion-card reveal reveal-delay-1" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/employee-onboarding.png')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Employee Onboarding</h3>
                <p className="occasion-desc">Make Day 1 unforgettable</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-2" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/diwali-and-festive.png')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Diwali &amp; Festive</h3>
                <p className="occasion-desc">The gift they actually keep</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-3" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/client-appreciation.png')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Client Appreciation</h3>
                <p className="occasion-desc">Strengthen every relationship</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-1" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/work-anniversary.png')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Work Anniversary</h3>
                <p className="occasion-desc">Celebrate the ones who stayed</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-2" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/team-and-events.png')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">Team &amp; Events</h3>
                <p className="occasion-desc">Brand that travels with them</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
          <article className="occasion-card reveal reveal-delay-3" tabIndex={0}>
            <div className="occasion-card-img" style={{ backgroundImage: "url('/occasions/new-year.png')" }}></div>
            <div className="occasion-card-overlay">
              <div className="occasion-overlay-text">
                <h3 className="occasion-name">New Year</h3>
                <p className="occasion-desc">Start the year with intention</p>
              </div>
              <span className="occasion-arrow"><svg viewBox="0 0 18 18" fill="none"><path d="M4 9h10M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </article>
        </div>

        <a href="#" className="view-all-link reveal">View all occasions →</a>
      </section>

      {/* SECTION 4: HOW IT WORKS — Split layout with step indicators */}
      <section id="how-it-works" className="hiw-split" aria-label="How MintBox works">
        {[
          { num: '01', title: 'Share your requirements', desc: 'Tell us your occasion, team size, and budget. WhatsApp, email, or fill a quick form — we work around you.', img: '/hampers/hamper7.png' },
          { num: '02', title: 'We curate & brand', desc: 'We select products, apply your branding, and share samples for approval. No surprises on the final invoice.', img: '/hampers/hamper3.png' },
          { num: '03', title: 'Delivered to your team', desc: 'Individual addresses or single office delivery — tracked, on time, beautifully packaged.', img: '/hampers/hamper5.png' },
        ].map((step, i) => (
          <div key={i} className={`hiw-step reveal ${i % 2 === 1 ? 'hiw-step-reverse' : ''}`}>
            <div className="hiw-step-text">
              <div className="hiw-step-tag">Step {step.num}</div>
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.desc}</p>
              <div className="hiw-step-dots" aria-hidden="true">
                {[0, 1, 2].map(d => (
                  <span key={d} className={`hiw-dot ${d === i ? 'hiw-dot-active' : ''}`}></span>
                ))}
              </div>
            </div>
            <div className="hiw-step-img">
              <div className="hiw-step-img-inner" style={{ backgroundImage: `url('${step.img}')` }}></div>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION: SCORECARD */}
      <section id="scorecard" aria-label="Why MintBox">
        <div className="section-header-center reveal">
          <span className="section-label">Why MintBox</span>
          <h2 className="section-headline">The honest comparison <em>nobody else makes.</em></h2>
        </div>

        <div className="scorecard-table reveal">
          <div className="scorecard-header">
            <div className="scorecard-feature-col"></div>
            <div className="scorecard-mintbox-col">MintBox</div>
            <div className="scorecard-vendor-col">Typical Vendor</div>
          </div>
          {[
            { feature: 'In-house branding', mintbox: 'Always', vendor: 'Outsourced' },
            { feature: 'Transparent pricing', mintbox: 'Fixed quote', vendor: 'Hidden fees' },
            { feature: 'Minimum order', mintbox: '10 units', vendor: '100+ units' },
            { feature: 'Pan India delivery', mintbox: 'Included', vendor: 'Extra charge' },
            { feature: 'HRMS integration', mintbox: 'Available', vendor: 'Manual only' },
            { feature: 'Sample approval', mintbox: 'Before order', vendor: 'Post-payment' },
            { feature: 'ESG documentation', mintbox: 'On request', vendor: 'Not available' },
            { feature: 'Quote turnaround', mintbox: '48 hours', vendor: '5–7 days' },
          ].map((row, i) => (
            <div key={i} className="scorecard-row">
              <div className="scorecard-feature-col">{row.feature}</div>
              <div className="scorecard-mintbox-col">
                <svg className="scorecard-check" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#1B4D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {row.mintbox}
              </div>
              <div className="scorecard-vendor-col">
                <svg className="scorecard-x" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="rgba(26,26,24,0.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                {row.vendor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: COLLECTIONS */}
      <section id="collections" aria-label="Featured collections">
        <div className="section-header-center reveal">
          <span className="section-label">Curated For You</span>
          <h2 className="section-headline">The MintBox Edit.</h2>
          <p className="collections-sub" style={{ marginTop: '10px' }}>Our most-loved collections, ready to brand and ship.</p>
          <span className="gold-rule"></span>
        </div>

        <div className="products-grid">
          <article className="product-card reveal reveal-delay-1">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/hamper1.png') center/cover" }}></div>
              <span className="product-category">Onboarding</span>
            </div>
            <div className="product-body">
              <h3 className="product-name">The Onboarding Kit</h3>
              <p className="product-desc">Everything they need from Day 1 — branded, curated, and unforgettable.</p>
              <p className="product-price">From ₹1,500 / unit</p>
              <p className="product-moq">Min. order: 25 units</p>
            </div>
            <div className="product-footer">
              <a href="#quote-cta" className="add-enquiry">+ Add to enquiry</a>
              <a href="#" className="view-details">View details →</a>
            </div>
          </article>
          <article className="product-card reveal reveal-delay-2">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/hamper2.png') center/cover" }}></div>
              <span className="product-category">Festive</span>
            </div>
            <div className="product-body">
              <h3 className="product-name">The Diwali Edit</h3>
              <p className="product-desc">Festive gifting that earns a second look — and a post on their stories.</p>
              <p className="product-price">From ₹2,200 / unit</p>
              <p className="product-moq">Min. order: 25 units</p>
            </div>
            <div className="product-footer">
              <a href="#quote-cta" className="add-enquiry">+ Add to enquiry</a>
              <a href="#" className="view-details">View details →</a>
            </div>
          </article>
          <article className="product-card reveal reveal-delay-3">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/hamper3.png') center/cover" }}></div>
              <span className="product-category">WFH</span>
            </div>
            <div className="product-body">
              <h3 className="product-name">The WFH Essentials</h3>
              <p className="product-desc">For the team that works everywhere — tools that travel as well as they do.</p>
              <p className="product-price">From ₹1,800 / unit</p>
              <p className="product-moq">Min. order: 25 units</p>
            </div>
            <div className="product-footer">
              <a href="#quote-cta" className="add-enquiry">+ Add to enquiry</a>
              <a href="#" className="view-details">View details →</a>
            </div>
          </article>
          <article className="product-card reveal reveal-delay-4">
            <div className="product-image-wrap">
              <div className="product-img-placeholder" style={{ background: "url('/hampers/hamper5.png') center/cover" }}></div>
              <span className="product-category">Executive</span>
            </div>
            <div className="product-body">
              <h3 className="product-name">The Executive Gift</h3>
              <p className="product-desc">For clients worth impressing — luxury presentation, no compromise.</p>
              <p className="product-price">From ₹3,500 / unit</p>
              <p className="product-moq">Min. order: 10 units</p>
            </div>
            <div className="product-footer">
              <a href="#quote-cta" className="add-enquiry">+ Add to enquiry</a>
              <a href="#" className="view-details">View details →</a>
            </div>
          </article>
        </div>

        <div className="catalogue-cta-wrap reveal">
          <a href="#" className="btn-outlined">Browse the full catalogue</a>
        </div>
      </section>

      {/* SECTION: OUR STANDARDS */}
      <section id="why-mintbox" aria-label="Our standards">
        <div className="geo-overlay-light" aria-hidden="true"></div>
        <div className="section-header-center reveal">
          <span className="section-label">Our standards</span>
          <h2 className="section-headline">Four things we <em>never</em> compromise on.</h2>
          <p className="standards-sub">Non-negotiables that shape every kit we ship — from the first quote to the last mile.</p>
          <span className="gold-rule"></span>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card reveal reveal-delay-1">
            <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <h3 className="pillar-title">Unboxing quality</h3>
            <p className="pillar-desc">Every MintBox is designed to be the best thing someone opens that day. We control branding in-house — no outsourced print shops, no peeling logos.</p>
          </div>
          <div className="pillar-card reveal reveal-delay-2">
            <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
              <path d="M6 8h4M6 11h3"/>
            </svg>
            <h3 className="pillar-title">Tech-enabled fulfillment</h3>
            <p className="pillar-desc">HRMS integrations, address collection tools, real-time tracking. Gifting that works like software.</p>
          </div>
          <div className="pillar-card reveal reveal-delay-3">
            <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
            <h3 className="pillar-title">Transparent pricing</h3>
            <p className="pillar-desc">What you see on the quote is what you pay. No logistics surcharges added post-approval. No hidden admin fees.</p>
          </div>
          <div className="pillar-card reveal reveal-delay-4">
            <svg className="pillar-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <h3 className="pillar-title">Responsible sourcing</h3>
            <p className="pillar-desc">We track the sustainability footprint of every product. Plastic-free options, Indian artisan sourcing, and ESG documentation available.</p>
          </div>
        </div>
      </section>

      {/* SECTION: CATALOG CATEGORIES */}
      <section id="catalog" aria-label="Product categories">
        <div className="section-header-center reveal">
          <span className="section-label">What We Gift</span>
          <h2 className="section-headline">The MintBox Edit.</h2>
          <p className="catalog-sub">Four categories. Hundreds of products. All brandable, all deliverable.</p>
          <span className="gold-rule"></span>
        </div>

        <div className="catalog-grid">
          <article className="catalog-card reveal reveal-delay-1">
            <div className="catalog-card-img" style={{ backgroundImage: "url('/hampers/hamper4.png')" }}></div>
            <div className="catalog-card-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="catalog-card-title">Drinkware</h3>
            <p className="catalog-card-desc">Mugs, tumblers, and flasks — the gifts that earn a permanent spot on their desk.</p>
            <a href="/catalog" className="catalog-card-link">Browse category →</a>
          </article>
          <article className="catalog-card reveal reveal-delay-2">
            <div className="catalog-card-img" style={{ backgroundImage: "url('/hampers/hamper6.png')" }}></div>
            <div className="catalog-card-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2 2 0 012-2h13a1 1 0 011 1v13M4 19.5v.5A2.5 2.5 0 006.5 22H18a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="catalog-card-title">Stationery</h3>
            <p className="catalog-card-desc">Notebooks, planners, and pens they&apos;ll actually reach for — every single day.</p>
            <a href="/catalog" className="catalog-card-link">Browse category →</a>
          </article>
          <article className="catalog-card reveal reveal-delay-3">
            <div className="catalog-card-img" style={{ backgroundImage: "url('/hampers/hamper8.png')" }}></div>
            <div className="catalog-card-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <h3 className="catalog-card-title">Gadgets</h3>
            <p className="catalog-card-desc">Earbuds, chargers, and desk tech that make a genuinely useful impression.</p>
            <a href="/catalog" className="catalog-card-link">Browse category →</a>
          </article>
          <article className="catalog-card reveal reveal-delay-4">
            <div className="catalog-card-img" style={{ backgroundImage: "url('/hampers/hamper2.png')" }}></div>
            <div className="catalog-card-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <h3 className="catalog-card-title">Gourmet Food</h3>
            <p className="catalog-card-desc">Artisan teas, gourmet snacks, and curated hampers that delight every palate.</p>
            <a href="/catalog" className="catalog-card-link">Browse category →</a>
          </article>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section id="testimonials" aria-label="Client testimonials">
        <div className="geo-overlay-dark" aria-hidden="true"></div>
        <div className="testi-header">
          <span className="section-label reveal">From the teams we&apos;ve gifted</span>
          <h2 className="testi-headline reveal reveal-delay-1">&ldquo;Words from the people who matter most.&rdquo;</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testi-card reveal reveal-delay-1">
            <div className="testi-quote-mark" aria-hidden="true">&ldquo;</div>
            <p className="testi-text">Our new hires post about the onboarding kit on LinkedIn. We didn&apos;t ask them to — the box was just that good.</p>
            <div className="testi-divider"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="testi-name">Priya S.</p>
                <p className="testi-role">Head of People, Series B Startup</p>
              </div>
              <div className="testi-avatar">PS</div>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-2">
            <div className="testi-quote-mark" aria-hidden="true">&ldquo;</div>
            <p className="testi-text">Finally a gifting vendor that doesn&apos;t send a different invoice than the quote. MintBox has our Diwali budget locked in for the next three years.</p>
            <div className="testi-divider"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="testi-name">Karan M.</p>
                <p className="testi-role">Founder, Bengaluru</p>
              </div>
              <div className="testi-avatar">KM</div>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-3">
            <div className="testi-quote-mark" aria-hidden="true">&ldquo;</div>
            <p className="testi-text">The branding quality is the closest I&apos;ve seen to what we get from international vendors — but delivered locally and on time.</p>
            <div className="testi-divider"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="testi-name">Vikram N.</p>
                <p className="testi-role">Procurement Lead, GCC</p>
              </div>
              <div className="testi-avatar">VN</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: QUOTE CTA BAND */}
      <section id="quote-cta" aria-label="Request a quote">
        <div className="geo-overlay-cta" aria-hidden="true"></div>
        <div className="quote-cta-inner">
          <div className="reveal">
            <h2 className="quote-cta-headline">Ready to make your people feel valued?</h2>
            <p className="quote-cta-sub">Tell us about your team, your occasion, and your budget. We&apos;ll handle everything else.</p>
            <p className="quote-reassurance">✦ Respond within 4 hours · No commitment required</p>
          </div>
          <div className="quote-form-card reveal reveal-delay-2">
            <form id="quoteForm" noValidate>
              <div className="form-group">
                <label htmlFor="form-name">Your name <span className="form-required">*</span></label>
                <input type="text" id="form-name" name="name" placeholder="e.g. Priya Sharma" autoComplete="name" required />
                <span className="form-error" id="form-name-error">Please enter your name</span>
              </div>
              <div className="form-group">
                <label htmlFor="form-email">Email address <span className="form-required">*</span></label>
                <input type="email" id="form-email" name="email" placeholder="e.g. priya@company.com" autoComplete="email" required />
                <span className="form-error" id="form-email-error">Please enter a valid email</span>
              </div>
              <div className="form-group">
                <label htmlFor="form-company">Company name <span className="form-required">*</span></label>
                <input type="text" id="form-company" name="company" placeholder="e.g. Acme Technologies" autoComplete="organization" required />
                <span className="form-error" id="form-company-error">Please enter your company name</span>
              </div>
              <div className="form-group">
                <label htmlFor="form-size">Team size</label>
                <select id="form-size" name="teamSize" defaultValue="">
                  <option value="" disabled>Select team size</option>
                  <option value="under25">Under 25</option>
                  <option value="25-100">25 – 100</option>
                  <option value="100-500">100 – 500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="form-occasion">Occasion</label>
                <select id="form-occasion" name="occasion" defaultValue="">
                  <option value="" disabled>Select occasion</option>
                  <option value="onboarding">Onboarding</option>
                  <option value="diwali">Diwali</option>
                  <option value="client">Client Gifting</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="form-submit" id="quoteSubmitBtn">
                <span className="form-submit-text">Send enquiry →</span>
                <span className="form-submit-loading" style={{ display: 'none' }}>Sending...</span>
              </button>
              <a href="https://wa.me/918618237189" className="form-wa-link" target="_blank" rel="noopener">Prefer WhatsApp? →</a>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 9: JOURNAL */}
      <section id="journal" aria-label="MintBox Journal">
        <div className="journal-header-row">
          <div className="reveal">
            <span className="section-label">The MintBox Journal</span>
            <h2 className="journal-headline">Gifting, thoughtfully<br/>considered.</h2>
          </div>
          <a href="#" className="see-all-link reveal">See all articles →</a>
        </div>

        <div className="journal-grid">
          <article className="article-card reveal reveal-delay-1">
            <div className="article-img">
              <div className="article-img-inner" style={{ backgroundImage: "url('/hampers/hamper7.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <div className="article-body">
              <span className="article-cat-pill cat-guide">Gifting Guide</span>
              <h3 className="article-title">The 2025 guide to employee onboarding gifts in Bengaluru</h3>
              <p className="article-time">5 min read</p>
              <p className="article-excerpt">What your new hire&apos;s first box says about your company — and how to get it right.</p>
              <a href="#" className="article-read-link">Read article →</a>
            </div>
          </article>
          <article className="article-card reveal reveal-delay-2">
            <div className="article-img">
              <div className="article-img-inner" style={{ backgroundImage: "url('/hampers/hamper3.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <div className="article-body">
              <span className="article-cat-pill cat-occasion">Occasion Edit</span>
              <h3 className="article-title">The Diwali corporate gifting edit: premium options under ₹3,500</h3>
              <p className="article-time">4 min read</p>
              <p className="article-excerpt">Curated picks for teams that want to stand out from the usual box of dry fruits.</p>
              <a href="#" className="article-read-link">Read article →</a>
            </div>
          </article>
        </div>
      </section>

      {/* FOOTER */}
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
              <li><a href="#">Home</a></li>
              <li><a href="#occasions">Solutions</a></li>
              <li><a href="#catalog">Catalog</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="#footer">About Us</a></li>
              <li><a href="#journal">Journal</a></li>
              <li><a href="#quote-cta">Request A Quote</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <span className="footer-col-label">Reach Us</span>
            <p className="footer-contact-item"><a href="tel:+919916996642">+91 9916996642</a></p>
            <p className="footer-contact-item"><a href="mailto:anand@getmintbox.com">anand@getmintbox.com</a></p>
            <p className="footer-contact-item" style={{ marginTop: '8px' }}>2nd Floor, Sobha Alexander Plaza,<br/>Ashok Nagar, Bengaluru 560 025</p>
            <p className="footer-contact-item" style={{ marginTop: '10px' }}>
              <a href="https://wa.me/919916996642" target="_blank" rel="noopener" style={{ color: 'var(--gold)' }}>Chat on WhatsApp →</a>
            </p>
          </div>

          <div>
            <span className="footer-col-label">The Journal</span>
            <p className="footer-newsletter-copy">Gifting guides, occasion edits, and MintBox news — monthly.</p>
            <form className="newsletter-form" id="newsletterForm" noValidate>
              <input type="email" name="email" placeholder="your@email.com" autoComplete="email" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-bottom-text">© 2026 MintBox. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a id="wa-float" href="https://wa.me/918618237189" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="wa-tooltip">Chat with Anand →</span>
      </a>
    </>
  )
}
