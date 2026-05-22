'use client'

import React, { useEffect, useState } from 'react'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.getElementById('navbar')
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* MOBILE NAV OVERLAY */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`} id="mobileNav">
        <button
          className="mobile-nav-close"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        <a href="/catalog" onClick={() => setMobileOpen(false)}>Catalogue</a>

        <a href="/about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="/faq" onClick={() => setMobileOpen(false)}>FAQ</a>
        <a href="/contact" onClick={() => setMobileOpen(false)}>Contact</a>
        <a href="/contact" onClick={() => setMobileOpen(false)} style={{ color: 'var(--gold)' }}>Request a Quote</a>
      </div>

      {/* NAVBAR */}
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-logo" aria-label="MintBox Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.png" alt="MintBox" className="nav-logo-img" />
        </a>

        <ul className="nav-links" role="list">
          <li><a href="/catalog" className="nav-link">Catalogue</a></li>

          <li><a href="/about" className="nav-link">About</a></li>
          <li><a href="/faq" className="nav-link">FAQ</a></li>
          <li><a href="/contact" className="nav-link">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <a href="/contact" className="btn-primary">Request a Quote</a>
          <button
            className="hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </>
  )
}
