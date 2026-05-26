'use client'

import React from 'react'

export function Footer() {
  return (
    <footer id="footer" role="contentinfo">
      <div className="footer-grid">

        {/* ── Brand ─────────────────────── */}
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.webp" alt="MintBox" className="footer-logo-img" />
          <p className="footer-tagline">&ldquo;Gifting that says what words can&apos;t.&rdquo;</p>
          <div className="footer-contact-block">
            <p className="footer-contact-item"><a href="tel:+919886537631">+91 9886537631</a></p>
            <p className="footer-contact-item"><a href="mailto:hello@themintbox.in">hello@themintbox.in</a></p>
            <p className="footer-contact-item">2nd Floor, Sobha Alexander Plaza,<br />Ashok Nagar, Bengaluru 560 025</p>
          </div>
          <a href="https://wa.me/919886537631" target="_blank" rel="noopener nofollow" className="footer-whatsapp-link">
            Chat on WhatsApp &rarr;
          </a>
        </div>

        {/* ── Guides: Budget & Occasion ─── */}
        <div>
          <span className="footer-col-label">Guides</span>
          <p className="footer-sub-label">By Budget</p>
          <ul className="footer-nav-links">
            <li><a href="/guides/corporate-gifts-under-100">Gifts Under ₹100</a></li>
            <li><a href="/guides/corporate-gifts-under-500">Gifts Under ₹500</a></li>
            <li><a href="/guides/corporate-gifts-under-1000">Gifts Under ₹1,000</a></li>
            <li><a href="/guides/budget-corporate-gifts">Budget Gifting</a></li>
            <li><a href="/guides/corporate-gifting-budget">Gifting Budget Guide</a></li>
          </ul>
          <p className="footer-sub-label" style={{ marginTop: '20px' }}>By Occasion</p>
          <ul className="footer-nav-links">
            <li><a href="/guides/diwali-corporate-gifts">Diwali Corporate Gifts</a></li>
            <li><a href="/guides/diwali-gifts-for-employees">Diwali Gifts for Employees</a></li>
            <li><a href="/guides/christmas-corporate-gifts">Christmas Corporate Gifts</a></li>
            <li><a href="/guides/work-anniversary-gifts">Work Anniversary Gifts</a></li>
            <li><a href="/guides/corporate-gifts-for-new-employees">New Employee Gifts</a></li>
          </ul>
        </div>

        {/* ── Guides: Strategy ─────────── */}
        <div>
          <span className="footer-col-label">Strategy</span>
          <ul className="footer-nav-links">
            <li><a href="/guides/corporate-gifting-handbook">Gifting Handbook</a></li>
            <li><a href="/guides/how-to-choose-corporate-gifts">How to Choose Gifts</a></li>
            <li><a href="/guides/corporate-gifting-etiquette">Gifting Etiquette</a></li>
            <li><a href="/guides/what-to-gift-employees">What to Gift Employees</a></li>
            <li><a href="/guides/corporate-gifts-for-clients">Gifts for Clients</a></li>
            <li><a href="/guides/unique-corporate-gifts">Unique Corporate Gifts</a></li>
            <li><a href="/guides/sustainable-corporate-gifts">Sustainable Gifts</a></li>
            <li><a href="/guides/corporate-gifting-trends-2026">Gifting Trends 2026</a></li>
            <li><a href="/guides/corporate-gift-ideas-2026">Gift Ideas 2026</a></li>
          </ul>
        </div>

        {/* ── Collections ──────────────── */}
        <div>
          <span className="footer-col-label">Collections</span>
          <ul className="footer-nav-links">
            <li><a href="/collections/corporate-gifts">All Corporate Gifts</a></li>
            <li><a href="/collections/drinkware">Drinkware</a></li>
            <li><a href="/collections/drinkware/customized-water-bottles">Customized Water Bottles</a></li>
            <li><a href="/collections/drinkware/personalized-coffee-mugs">Personalised Coffee Mugs</a></li>
            <li><a href="/collections/stationery">Stationery</a></li>
            <li><a href="/collections/hampers">Hampers</a></li>
            <li><a href="/collections/tech-gifts">Tech Gifts</a></li>
            <li><a href="/collections/eco-friendly-gifts">Eco-Friendly Gifts</a></li>
            <li><a href="/collections/employee-welcome-kit">Employee Welcome Kit</a></li>
            <li><a href="/customization/personalized-corporate-gifts">Personalised Gifts</a></li>
          </ul>
        </div>

        {/* ── Bangalore + Industry + Site ─ */}
        <div>
          <span className="footer-col-label">Bangalore</span>
          <ul className="footer-nav-links">
            <li><a href="/bangalore-corporate-gifting">Bangalore Gifting</a></li>
            <li><a href="/bangalore-corporate-gifting/same-day-delivery">Same-Day Delivery</a></li>
            <li><a href="/bangalore-corporate-gifting/bulk-gifting">Bulk Gifting</a></li>
            <li><a href="/bangalore-corporate-gifting/suppliers">Gifting Suppliers</a></li>
          </ul>

          <p className="footer-sub-label" style={{ marginTop: '20px' }}>Industry</p>
          <ul className="footer-nav-links">
            <li><a href="/industry-solutions/startups">Startups</a></li>
            <li><a href="/industry-solutions/tech-companies">Tech Companies</a></li>
          </ul>

          <p className="footer-sub-label" style={{ marginTop: '20px' }}>Company</p>
          <ul className="footer-nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/catalog">Catalogue</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/solutions">Solutions</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* ── Newsletter ───────────────── */}
        <div>
          <span className="footer-col-label">The Journal</span>
          <p className="footer-newsletter-copy">Gifting guides, occasion edits, and MintBox news — monthly.</p>
          <form
            className="newsletter-form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              const btn = (e.target as HTMLFormElement).querySelector('button')
              if (btn) { btn.textContent = '✓'; (btn as HTMLButtonElement).disabled = true }
            }}
          >
            <input type="email" name="email" placeholder="your@email.com" autoComplete="email" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <span className="footer-bottom-text">&copy; 2026 MintBox. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
