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

        <div>
          <span className="footer-col-label">Shop</span>
          <ul className="footer-nav-links">
            <li><a href="/catalog">Catalogue</a></li>
            <li><a href="/collections/corporate-gifts">All Corporate Gifts</a></li>
            <li><a href="/collections/hampers">Hampers</a></li>
            <li><a href="/collections/drinkware">Drinkware</a></li>
            <li><a href="/diwali-corporate-gifts">Diwali Gift Hampers 2026</a></li>
          </ul>
        </div>

        <div>
          <span className="footer-col-label">Guides</span>
          <ul className="footer-nav-links">
            <li><a href="/guides">All Guides</a></li>
            <li><a href="/guides/diwali-gifts-for-employees">Diwali Gifts for Employees</a></li>
            <li><a href="/guides/corporate-gifting-handbook">Gifting Handbook</a></li>
            <li><a href="/bangalore-corporate-gifting">Bangalore Corporate Gifting</a></li>
          </ul>
        </div>

        <div>
          <span className="footer-col-label">Company</span>
          <ul className="footer-nav-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* ── Newsletter ───────────────── */}
        <div>
          <span className="footer-col-label">The Journal</span>
          <p className="footer-newsletter-copy">Gifting guides, occasion edits, and MintBox news - monthly.</p>
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
