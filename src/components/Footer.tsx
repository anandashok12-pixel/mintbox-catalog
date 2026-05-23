'use client'

import React from 'react'

export function Footer() {
  return (
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
          <p className="footer-contact-item"><a href="mailto:anand@getmintbox.com">anand@getmintbox.com</a></p>
          <p className="footer-contact-item" style={{ marginTop: '8px' }}>2nd Floor, Sobha Alexander Plaza,<br/>Ashok Nagar, Bengaluru 560 025</p>
          <p className="footer-contact-item" style={{ marginTop: '10px' }}>
            <a href="https://wa.me/919886537631" target="_blank" rel="noopener" style={{ color: 'var(--gold)' }}>Chat on WhatsApp &rarr;</a>
          </p>
        </div>

        <div>
          <span className="footer-col-label">The Journal</span>
          <p className="footer-newsletter-copy">Gifting guides, occasion edits, and MintBox news &mdash; monthly.</p>
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
