'use client'

import React from 'react'
import Link from 'next/link'
import '../landing.css'
import './about.css'

/* ───────────────────────────────────
   Bow SVG (reusable)
   ─────────────────────────────────── */
function BowSvg({ width = 88, className }: { width?: number; className?: string }) {
  return (
    <svg className={className} width={width} height={32} viewBox="0 0 80 28" fill="none">
      <path d="M40 16C33 10,18 4,5 9C-3 13,2 21,14 18C26 15,35 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M40 16C47 10,62 4,75 9C83 13,78 21,66 18C54 15,45 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M34 13C37 10,39 9,40 9C41 9,43 10,46 13C43 16,41 16,40 16C39 16,37 16,34 13Z" stroke="#B8972E" strokeWidth="1.1" fill="none" />
      <path d="M40 16L38 24M40 16L42 24" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}

/* ───────────────────────────────────
   About Page
   ─────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="ab-page">
      {/* NAV */}
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

      {/* HERO — MANIFESTO */}
      <section className="ab-hero">
        <div className="ab-hero-pat" />
        <div className="ab-hero-inner">
          <div className="ab-hero-label">About MintBox</div>
          <BowSvg className="ab-hero-bow" />
          <h1 className="ab-hero-title">
            We exist because<br />
            <em>gifting deserved<br />better.</em>
          </h1>
          <div className="ab-hero-rule-gold" />
          <p className="ab-hero-manifesto">
            &ldquo;The corporate gifting market doesn&rsquo;t have a product problem. It has a meaning
            problem. Every box that arrives late, every logo that peels, every invoice that
            doesn&rsquo;t match the quote &mdash; these aren&rsquo;t vendor failures. They&rsquo;re
            failures of care. MintBox exists to give every gift its meaning back.&rdquo;
          </p>
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-story-left">
            <div className="ab-story-label">The founding story</div>
            <h2 className="ab-story-title">Born from a box that disappointed.</h2>
            <div className="ab-story-rule" />
          </div>
          <div className="ab-story-right">
            <p className="ab-story-p">
              It started with a bad experience. Not one bad experience &mdash; dozens of them. As a
              founder who had hired teams, managed vendors, and sat through more than a few
              uncomfortable conversations about why the Diwali gifts arrived three days late and with
              the wrong logo &mdash; we knew something was fundamentally broken about how corporate
              gifting worked in India.
            </p>

            <div className="ab-story-pull">
              &ldquo;The industry had hundreds of vendors. It had no one who actually cared about what
              happened when the box was opened.&rdquo;
            </div>

            <p className="ab-story-p">
              The problem wasn&rsquo;t a lack of products. India has extraordinary manufacturers,
              brilliant artisans, and a gifting culture that runs deep. The problem was the layer
              between &mdash; the opaque pricing, the outsourced branding, the &ldquo;we&rsquo;ll
              check with the courier&rdquo; non-answers, and the invoices that bore no resemblance to
              the quote.
            </p>

            <p className="ab-story-p">
              We started MintBox with a simple conviction:{' '}
              <strong>
                a premium corporate gift should work like a premium product
              </strong>
              . It should arrive on time. The logo should look exactly like the mockup. The invoice
              should match the quote. The person who opens it should feel &mdash; genuinely &mdash;
              that someone thought about them specifically.
            </p>

            <p className="ab-story-p">
              We launched in Bengaluru because this city &mdash; with its density of tech companies,
              its globally minded workforce, and its founders who understand what brand quality means
              &mdash; is the perfect place to build a gifting brand that holds itself to a higher
              standard. If we can earn the trust of teams building India&rsquo;s most ambitious
              companies, we&rsquo;ve done something worth doing.
            </p>

            <p className="ab-story-p">
              MintBox is still early. We&rsquo;re a small team, we&rsquo;re pre-launch, and
              we&rsquo;re building every process and every partnership from scratch with quality as the
              only non-negotiable. We won&rsquo;t ship a gift we wouldn&rsquo;t be proud to receive
              ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WAS BROKEN */}
      <section className="ab-broke">
        <div className="ab-broke-pat" />
        <div className="ab-broke-inner">
          <div className="ab-broke-label">What we set out to fix</div>
          <h2 className="ab-broke-title">
            The five things that were broken<br />before MintBox existed.
          </h2>
          <div className="ab-broke-grid">
            <div className="ab-broke-item">
              <div className="ab-broke-num">01</div>
              <div className="ab-broke-item-title">The invoice surprise</div>
              <div className="ab-broke-item-desc">
                Vendors quote one number, invoice another. Logistics surcharges, &ldquo;admin
                fees,&rdquo; and branding corrections appeared after approval &mdash; sometimes adding
                20&ndash;30% to the cost. We quote everything upfront. What you approve is what you
                pay.
              </div>
            </div>
            <div className="ab-broke-item">
              <div className="ab-broke-num">02</div>
              <div className="ab-broke-item-title">The peeling logo</div>
              <div className="ab-broke-item-desc">
                Most vendors outsource branding to whoever is cheapest. Logos that shift, colours that
                drift, prints that peel after one wash. We keep artwork in-house, match every mockup,
                and physically inspect every batch before dispatch.
              </div>
            </div>
            <div className="ab-broke-item">
              <div className="ab-broke-num">03</div>
              <div className="ab-broke-item-title">The Diwali chaos</div>
              <div className="ab-broke-item-desc">
                Every October, HR teams across India chase vendors, follow up on missing shipments, and
                apologise to employees whose gifts arrived broken or not at all. We plan lead times
                honestly, communicate proactively, and track every delivery individually.
              </div>
            </div>
            <div className="ab-broke-item">
              <div className="ab-broke-num">04</div>
              <div className="ab-broke-item-title">The creativity plateau</div>
              <div className="ab-broke-item-desc">
                Same mug. Same diary. Same power bank. Every vendor, every year, pulls from the same
                Alibaba catalogue. We curate with intention &mdash; matching products to brand
                personality, not just what&rsquo;s in stock.
              </div>
            </div>
            <div className="ab-broke-item">
              <div className="ab-broke-num">05</div>
              <div className="ab-broke-item-title">The remote gifting failure</div>
              <div className="ab-broke-item-desc">
                Post-2020, teams are everywhere. Delivering to one office is the exception. Collecting
                200 individual addresses, managing missed deliveries, tracking each shipment &mdash;
                this was an administrative nightmare. We built the tools to make it effortless.
              </div>
            </div>
            <div className="ab-broke-item ab-broke-highlight">
              <div className="ab-broke-num">&rarr;</div>
              <div className="ab-broke-item-title">MintBox is the answer to all five.</div>
              <div className="ab-broke-item-desc">
                Every process we&rsquo;ve built &mdash; from branding in-house to transparent quoting
                to individual address delivery &mdash; exists to fix one of these five failures. Not as
                a feature. As a founding principle.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ab-values">
        <div className="ab-values-inner">
          <div className="ab-values-header">
            <h2 className="ab-values-title">
              Four things we<br />never compromise on.
            </h2>
            <div className="ab-values-sub">
              These aren&rsquo;t marketing values &mdash; they&rsquo;re operational commitments. Every
              process, partnership, and product decision runs through all four of them. If something
              fails any one of these tests, we don&rsquo;t do it.
            </div>
          </div>
          <div className="ab-values-grid">
            <div className="ab-val-card">
              <div className="ab-val-num">01</div>
              <div className="ab-val-title">Craftsmanship</div>
              <div className="ab-val-desc">
                Every product in our catalogue has been sourced, sampled, and evaluated. Every branding
                technique is matched to the material. Every batch is physically inspected. We
                don&rsquo;t ship what we wouldn&rsquo;t receive ourselves.
              </div>
              <div className="ab-val-example">
                In practice: We rejected three notebook manufacturers before finding one whose
                debossing met our standard. That&rsquo;s the kind of thing we don&rsquo;t talk about
                in sales &mdash; but it&rsquo;s what makes the difference when you open the box.
              </div>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-num">02</div>
              <div className="ab-val-title">Transparency</div>
              <div className="ab-val-desc">
                What you see on the quote is what appears on the invoice. No exceptions. Logistics,
                branding, packaging, and GST are all itemised upfront. If something changes, we tell
                you before it affects the invoice &mdash; not after.
              </div>
              <div className="ab-val-example">
                In practice: If a product we quoted goes out of stock and the alternative costs more,
                we absorb the difference or present options. We never quietly substitute and bill
                later.
              </div>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-num">03</div>
              <div className="ab-val-title">Sustainability</div>
              <div className="ab-val-desc">
                We don&rsquo;t use sustainability as a marketing badge. We source responsibly, offer a
                dedicated eco range, and are building toward full carbon-footprint documentation for
                every order. We&rsquo;re honest about where we are on this journey.
              </div>
              <div className="ab-val-example">
                In practice: Our eco range uses cork, bamboo, and recycled materials &mdash; every item
                comes with material sourcing documentation. We don&rsquo;t call something
                &ldquo;eco&rdquo; unless we can prove it.
              </div>
            </div>
            <div className="ab-val-card">
              <div className="ab-val-num">04</div>
              <div className="ab-val-title">Human connection</div>
              <div className="ab-val-desc">
                Behind every order is a relationship &mdash; between a company and its people, between
                a vendor and its clients. We never lose sight of that. The goal isn&rsquo;t to ship a
                box. It&rsquo;s to make someone feel genuinely valued.
              </div>
              <div className="ab-val-example">
                In practice: Anand picks up every WhatsApp. Every new client speaks to a person, not a
                ticketing system. For us this is non-negotiable &mdash; scale will never change it.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="ab-founder">
        <div className="ab-founder-inner">
          <div className="ab-founder-left">
            <div className="ab-founder-label">The person behind MintBox</div>
            <h2 className="ab-founder-title">Built by someone who felt the problem firsthand.</h2>
            <div className="ab-founder-bio">
              <p>
                <strong>Anand Ashok</strong> is the Director of MintBox and the driving force behind
                its founding. With a background spanning brand-building, web development, and product
                strategy, Anand has spent years working with early-stage startups and established
                companies through Quixta Ventures &mdash; his design and development firm based in
                Bengaluru.
              </p>
              <p>
                The frustration that became MintBox came from lived experience &mdash; managing gifting
                vendors, watching quality fall short of expectations, and spending hours chasing
                suppliers during Diwali season instead of running a business. MintBox is his attempt to
                build the gifting company he wished had existed.
              </p>
            </div>
            <div className="ab-founder-contact">
              <div className="ab-fc-item">
                <div className="ab-fc-icon">
                  <svg viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="#1B4D3E" strokeWidth="0.9" fill="none" />
                    <path d="M1.5 5L7 8L12.5 5" stroke="#1B4D3E" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="ab-fc-label">Email</div>
                  <div className="ab-fc-val">anand@getmintbox.com</div>
                </div>
              </div>
              <div className="ab-fc-item">
                <div className="ab-fc-icon">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M12.5 9.5C12.5 9.8 12.4 10.1 12.2 10.4C12 10.7 11.7 11 11.4 11.2C10.9 11.6 10.3 11.8 9.7 11.8C8.8 11.8 7.9 11.6 6.9 11.1C6 10.6 5.1 10 4.3 9.2C3.5 8.4 2.9 7.5 2.4 6.6C1.9 5.6 1.7 4.7 1.7 3.8C1.7 3.2 1.9 2.6 2.2 2.1C2.5 1.6 2.9 1.2 3.5 1C3.7 0.9 3.9 0.9 4.1 0.9C4.3 0.9 4.5 0.9 4.6 1C4.8 1.1 4.9 1.2 5 1.4L5.8 2.9C5.9 3.1 6 3.3 6 3.5C6 3.7 5.9 3.9 5.8 4.1L5.3 4.8C5.2 4.9 5.2 5 5.2 5.1C5.2 5.2 5.3 5.4 5.4 5.5C5.8 6.2 6.3 6.8 6.8 7.2C7 7.4 7.1 7.4 7.3 7.4C7.4 7.4 7.5 7.3 7.6 7.2L8.1 6.7C8.3 6.5 8.5 6.4 8.7 6.4C8.9 6.4 9.1 6.5 9.3 6.6L10.8 7.6C11 7.7 11.2 7.9 11.2 8.1C11.5 8.2 12.5 9.3 12.5 9.5Z" stroke="#1B4D3E" strokeWidth="0.8" fill="none" />
                  </svg>
                </div>
                <div>
                  <div className="ab-fc-label">Phone</div>
                  <div className="ab-fc-val">+91 9916996642</div>
                </div>
              </div>
              <div className="ab-fc-item">
                <a
                  href="https://wa.me/919916996642"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'contents' }}
                >
                  <div className="ab-fc-icon">
                    <svg viewBox="0 0 14 14" fill="none">
                      <path d="M7 1.5C4.4 1.5 1.5 4.4 1.5 7C1.5 8.2 1.8 9.3 2.4 10.3L1.5 13.5L4.8 12.6C5.8 13.2 6.9 13.5 8 13.5C11.6 13.5 13.5 10.6 13.5 7C13.5 4.4 10.6 1.5 7 1.5Z" stroke="#1B4D3E" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                  <div>
                    <div className="ab-fc-label">WhatsApp</div>
                    <div className="ab-fc-val">Chat directly &rarr;</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="ab-founder-right">
            <div className="ab-founder-card">
              <div className="ab-fc-pat" />
              <div className="ab-fc-avatar">
                <div className="ab-fc-initials">AA</div>
              </div>
              <div className="ab-fc-name">Anand Ashok</div>
              <div className="ab-fc-role">Director, MintBox &middot; Bengaluru, India</div>
              <div className="ab-fc-divider" />
              <div className="ab-fc-quote">
                &ldquo;I built MintBox because I got tired of explaining to my own team why the Diwali
                gifts were late again. If I was experiencing this with five people, imagine what HR
                teams at 500 people were going through. The product problem was straightforward. The
                will to actually fix it &mdash; that took time.&rdquo;
              </div>
              <a
                href="https://wa.me/919916996642"
                target="_blank"
                rel="noopener noreferrer"
                className="ab-fc-wa"
              >
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 18, height: 18, flexShrink: 0 }}>
                  <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 9.2 1.8 10.3 2.4 11.3L1.5 14.5L4.8 13.6C5.8 14.2 6.9 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z" stroke="#B8972E" strokeWidth="0.9" fill="none" />
                  <path d="M6.2 5.8L5.9 8.2L8.2 10.2L10.2 9.9L9.2 8.7L7.8 9C7.8 9 6.8 7.8 6.8 6.8L8 6.5L7 5.8H6.2Z" fill="#B8972E" opacity="0.7" />
                </svg>
                <div>
                  <div className="ab-fc-wa-text">WhatsApp Anand directly</div>
                  <div className="ab-fc-wa-sub">+91 9916996642 &middot; replies within 30 min</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENGALURU */}
      <section className="ab-bengaluru">
        <div className="ab-b-inner">
          <div className="ab-b-left">
            <div className="ab-b-label">Where we are</div>
            <h2 className="ab-b-title">
              Built in Bengaluru.<br />For Bengaluru&rsquo;s best teams.
            </h2>
            <p className="ab-b-text">
              We chose Bengaluru deliberately. This city has the highest density of ambitious,
              quality-conscious companies in India &mdash; the kind of teams that understand what brand
              quality means because they live it every day. We started here to earn the trust of the
              most demanding buyers first, and build outward from that foundation.
            </p>
            <div className="ab-b-addr">
              <div className="ab-b-addr-icon">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M8 2C5.2 2 3 4.2 3 7C3 9.8 8 14 8 14C8 14 13 9.8 13 7C13 4.2 10.8 2 8 2Z" stroke="#1B4D3E" strokeWidth="1" fill="none" />
                  <circle cx="8" cy="7" r="1.5" stroke="#1B4D3E" strokeWidth="0.9" fill="none" />
                </svg>
              </div>
              <div>
                <div className="ab-b-addr-label">Our office</div>
                <div className="ab-b-addr-text">
                  2nd Floor, Building 16/2, Sobha Alexander Plaza<br />
                  Commissariat Road, Ashok Nagar<br />
                  Bengaluru, Karnataka 560025
                </div>
                <a
                  className="ab-b-addr-link"
                  href="https://maps.google.com/?q=Sobha+Alexander+Plaza+Commissariat+Road+Ashok+Nagar+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
          <div className="ab-b-right">
            <div className="ab-b-stats">
              <div className="ab-b-stat">
                <div className="ab-b-stat-num">200+</div>
                <div className="ab-b-stat-label">SKUs curated and ready to brand</div>
              </div>
              <div className="ab-b-stat">
                <div className="ab-b-stat-num">25</div>
                <div className="ab-b-stat-label">Unit minimum &mdash; no massive commitments to get started</div>
              </div>
              <div className="ab-b-stat">
                <div className="ab-b-stat-num">3&ndash;4</div>
                <div className="ab-b-stat-label">Weeks from enquiry to your team&rsquo;s doorstep</div>
              </div>
              <div className="ab-b-stat">
                <div className="ab-b-stat-num">4 hrs</div>
                <div className="ab-b-stat-label">Maximum response time on any business day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="ab-cta">
        <div className="ab-cta-pat" />
        <div className="ab-cta-inner">
          <BowSvg className="ab-cta-bow" />
          <h2 className="ab-cta-title">
            Work with a team that<br />takes gifting seriously.
          </h2>
          <p className="ab-cta-sub">
            Tell us about your occasion, your team size, and your budget. We&rsquo;ll come back with
            a curated proposal &mdash; products, branding, and pricing &mdash; within one business
            day.
          </p>
          <div className="ab-cta-btns">
            <Link href="/contact" className="ab-cta-btn-primary">
              Request a quote &rarr;
            </Link>
            <Link href="/catalog" className="ab-cta-btn-secondary">
              Browse catalogue
            </Link>
          </div>
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
            <form className="newsletter-form" noValidate onSubmit={(e) => { e.preventDefault(); const btn = (e.target as HTMLFormElement).querySelector('button'); if (btn) { btn.textContent = '✓'; (btn as HTMLButtonElement).disabled = true; } }}>
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
