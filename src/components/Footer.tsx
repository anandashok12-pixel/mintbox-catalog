'use client'

import React from 'react'

export function Footer() {
  return (
    <footer id="footer" role="contentinfo">
      <div className="footer-grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.webp" alt="MintBox" className="footer-logo-img" />
          <p className="footer-tagline">&ldquo;Gifting that says what words can&apos;t.&rdquo;</p>
          <a href="https://themintbox.in" className="footer-url" target="_blank" rel="noopener">themintbox.in</a>
        </div>

        <div>
          <span className="footer-col-label">Navigate</span>
          <ul className="footer-nav-links">
            <li><a href="/">Home</a></li>

            <li><a href="/catalog">Catalogue</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Request A Quote</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <span className="footer-col-label">Reach Us</span>
          <p className="footer-contact-item"><a href="tel:+919886537631">+91 9886537631</a></p>
          <p className="footer-contact-item"><a href="mailto:hello@themintbox.in">hello@themintbox.in</a></p>
          <p className="footer-contact-item" style={{ marginTop: '8px' }}>2nd Floor, Sobha Alexander Plaza,<br/>Ashok Nagar, Bengaluru 560 025</p>
          <p className="footer-contact-item" style={{ marginTop: '10px' }}>
            <a href="https://wa.me/919886537631" target="_blank" rel="noopener" style={{ color: 'var(--gold)' }}>Get In Touch &rarr;</a>
          </p>
        </div>

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
