'use client'

import React, { useEffect, useRef, useState } from 'react'

// The Diwali hub earns a top-level link only while orders can still make it.
const DIWALI_LINK_UNTIL = new Date('2026-10-31T23:59:59+05:30')

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showDiwali, setShowDiwali] = useState(false)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowDiwali(Date.now() <= DIWALI_LINK_UNTIL.getTime())
    const onScroll = () => {
      const navbar = document.getElementById('navbar')
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Move focus into the menu when it opens, back to the trigger when it closes,
  // close on Escape, and keep Tab inside the overlay while it is open.
  useEffect(() => {
    if (!mobileOpen) return
    closeButtonRef.current?.focus()
    const openButton = openButtonRef.current

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button')
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      openButton?.focus()
    }
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  return (
    <>
      {/* MOBILE NAV OVERLAY */}
      <div
        ref={panelRef}
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        id="mobileNav"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <button
          ref={closeButtonRef}
          className="mobile-nav-close"
          aria-label="Close menu"
          onClick={close}
        >
          <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <a href="/" onClick={close}>Home</a>
        <a href="/catalog" onClick={close}>Catalogue</a>
        {showDiwali && <a href="/diwali-corporate-gifts" onClick={close}>Diwali 2026</a>}
        <a href="/about" onClick={close}>About</a>
        <a href="/faq" onClick={close}>FAQ</a>
        <a href="/contact" onClick={close}>Contact</a>
      </div>

      {/* NAVBAR */}
      <nav id="navbar" aria-label="Main navigation">
        <a href="/" className="nav-logo" aria-label="MintBox Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.webp" alt="MintBox" className="nav-logo-img" width={600} height={234} />
        </a>

        <ul className="nav-links" role="list">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/catalog" className="nav-link">Catalogue</a></li>
          {showDiwali && <li><a href="/diwali-corporate-gifts" className="nav-link">Diwali 2026</a></li>}
          <li><a href="/about" className="nav-link">About</a></li>
          <li><a href="/faq" className="nav-link">FAQ</a></li>
        </ul>

        <div className="nav-actions">
          <a href="/contact" className="btn-primary nav-cta-desktop">Request a Quote</a>
          <button
            ref={openButtonRef}
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobileNav"
            onClick={() => setMobileOpen(true)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </>
  )
}
