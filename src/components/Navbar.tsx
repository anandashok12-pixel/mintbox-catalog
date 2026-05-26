'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   Mega-menu data
───────────────────────────────────────────── */
const GUIDES_COLS = [
  {
    heading: 'By Budget',
    links: [
      { label: 'Gifts Under ₹100',   href: '/guides/corporate-gifts-under-100' },
      { label: 'Gifts Under ₹500',   href: '/guides/corporate-gifts-under-500' },
      { label: 'Gifts Under ₹1,000', href: '/guides/corporate-gifts-under-1000' },
      { label: 'Budget Gifting',     href: '/guides/budget-corporate-gifts' },
      { label: 'Gifting Budget Guide', href: '/guides/corporate-gifting-budget' },
    ],
  },
  {
    heading: 'By Occasion',
    links: [
      { label: 'Diwali Corporate Gifts',    href: '/guides/diwali-corporate-gifts' },
      { label: 'Diwali Gifts for Employees', href: '/guides/diwali-gifts-for-employees' },
      { label: 'Christmas Corporate Gifts', href: '/guides/christmas-corporate-gifts' },
      { label: 'Work Anniversary Gifts',    href: '/guides/work-anniversary-gifts' },
      { label: 'New Employee Gifts',        href: '/guides/corporate-gifts-for-new-employees' },
      { label: 'Gifts for Clients',         href: '/guides/corporate-gifts-for-clients' },
    ],
  },
  {
    heading: 'Strategy & Ideas',
    links: [
      { label: 'Corporate Gifting Handbook', href: '/guides/corporate-gifting-handbook' },
      { label: 'How to Choose Gifts',        href: '/guides/how-to-choose-corporate-gifts' },
      { label: 'Gifting Etiquette',          href: '/guides/corporate-gifting-etiquette' },
      { label: 'What to Gift Employees',     href: '/guides/what-to-gift-employees' },
      { label: 'Gifting Trends 2026',        href: '/guides/corporate-gifting-trends-2026' },
      { label: 'Gift Ideas 2026',            href: '/guides/corporate-gift-ideas-2026' },
      { label: 'Unique Corporate Gifts',     href: '/guides/unique-corporate-gifts' },
      { label: 'Sustainable Gifts',          href: '/guides/sustainable-corporate-gifts' },
    ],
  },
]

const COLLECTIONS_COLS = [
  {
    heading: 'Browse Collections',
    links: [
      { label: 'All Corporate Gifts',       href: '/collections/corporate-gifts' },
      { label: 'Drinkware',                 href: '/collections/drinkware' },
      { label: 'Stationery',                href: '/collections/stationery' },
      { label: 'Hampers',                   href: '/collections/hampers' },
      { label: 'Tech Gifts',                href: '/collections/tech-gifts' },
    ],
  },
  {
    heading: 'Specialty',
    links: [
      { label: 'Eco-Friendly Gifts',         href: '/collections/eco-friendly-gifts' },
      { label: 'Employee Welcome Kit',        href: '/collections/employee-welcome-kit' },
      { label: 'Customized Water Bottles',    href: '/collections/drinkware/customized-water-bottles' },
      { label: 'Personalised Coffee Mugs',    href: '/collections/drinkware/personalized-coffee-mugs' },
      { label: 'Personalised Gifts',          href: '/customization/personalized-corporate-gifts' },
    ],
  },
]

const BANGALORE_LINKS = [
  { label: 'Bangalore Corporate Gifting', href: '/bangalore-corporate-gifting' },
  { label: 'Same-Day Delivery',           href: '/bangalore-corporate-gifting/same-day-delivery' },
  { label: 'Bulk Gifting',                href: '/bangalore-corporate-gifting/bulk-gifting' },
  { label: 'Gifting Suppliers Guide',     href: '/bangalore-corporate-gifting/suppliers' },
]

const INDUSTRY_LINKS = [
  { label: 'Startups',      href: '/industry-solutions/startups' },
  { label: 'Tech Companies', href: '/industry-solutions/tech-companies' },
]

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type MenuId = 'guides' | 'collections' | 'bangalore' | 'industry' | null

interface MegaCol { heading: string; links: { label: string; href: string }[] }

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function MegaPanel({
  cols,
  flat,
  onNavigate,
}: {
  cols?: MegaCol[]
  flat?: { label: string; href: string }[]
  onNavigate: () => void
}) {
  return (
    <div className="mega-panel">
      <div className="mega-inner">
        {cols &&
          cols.map((col) => (
            <div key={col.heading} className="mega-col">
              <p className="mega-col-heading">{col.heading}</p>
              <ul className="mega-col-list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="mega-link" onClick={onNavigate}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {flat && (
          <div className="mega-col">
            <ul className="mega-col-list">
              {flat.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="mega-link" onClick={onNavigate}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function MobileAccordion({
  label,
  cols,
  flat,
  onNavigate,
}: {
  label: string
  cols?: MegaCol[]
  flat?: { label: string; href: string }[]
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mob-accordion">
      <button className="mob-accordion-trigger" onClick={() => setOpen((o) => !o)}>
        {label}
        <span className={`mob-accordion-arrow${open ? ' open' : ''}`}>›</span>
      </button>
      {open && (
        <div className="mob-accordion-body">
          {cols &&
            cols.map((col) =>
              col.links.map((l) => (
                <a key={l.href} href={l.href} className="mob-sub-link" onClick={onNavigate}>
                  {l.label}
                </a>
              )),
            )}
          {flat &&
            flat.map((l) => (
              <a key={l.href} href={l.href} className="mob-sub-link" onClick={onNavigate}>
                {l.label}
              </a>
            ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuId>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.getElementById('navbar')
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(id)
  }
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }
  const closeAll = () => setActiveMenu(null)

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
        <a href="/" onClick={() => setMobileOpen(false)}>Home</a>
        <a href="/catalog" onClick={() => setMobileOpen(false)}>Catalogue</a>
        <MobileAccordion
          label="Guides"
          cols={GUIDES_COLS}
          onNavigate={() => setMobileOpen(false)}
        />
        <MobileAccordion
          label="Collections"
          cols={COLLECTIONS_COLS}
          onNavigate={() => setMobileOpen(false)}
        />
        <MobileAccordion
          label="Bangalore"
          flat={BANGALORE_LINKS}
          onNavigate={() => setMobileOpen(false)}
        />
        <MobileAccordion
          label="Industry"
          flat={INDUSTRY_LINKS}
          onNavigate={() => setMobileOpen(false)}
        />
        <a href="/about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="/contact" onClick={() => setMobileOpen(false)}>Contact</a>
      </div>

      {/* MEGA MENU BACKDROP (closes on click outside) */}
      {activeMenu && (
        <div
          className="mega-backdrop"
          onMouseEnter={() => openMenu(activeMenu)}
          onMouseLeave={scheduleClose}
          onClick={closeAll}
        />
      )}

      {/* NAVBAR */}
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <a href="/" className="nav-logo" aria-label="MintBox Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mintbox-logo-white.webp" alt="MintBox" className="nav-logo-img" width={600} height={234} />
        </a>

        <ul className="nav-links" role="list">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/catalog" className="nav-link">Catalogue</a></li>

          {/* GUIDES */}
          <li
            className="has-mega"
            onMouseEnter={() => openMenu('guides')}
            onMouseLeave={scheduleClose}
          >
            <button className={`nav-link nav-link-btn${activeMenu === 'guides' ? ' nav-link-open' : ''}`}>
              Guides <span className="nav-caret">▾</span>
            </button>
            {activeMenu === 'guides' && (
              <MegaPanel cols={GUIDES_COLS} onNavigate={closeAll} />
            )}
          </li>

          {/* COLLECTIONS */}
          <li
            className="has-mega"
            onMouseEnter={() => openMenu('collections')}
            onMouseLeave={scheduleClose}
          >
            <button className={`nav-link nav-link-btn${activeMenu === 'collections' ? ' nav-link-open' : ''}`}>
              Collections <span className="nav-caret">▾</span>
            </button>
            {activeMenu === 'collections' && (
              <MegaPanel cols={COLLECTIONS_COLS} onNavigate={closeAll} />
            )}
          </li>

          {/* BANGALORE */}
          <li
            className="has-mega"
            onMouseEnter={() => openMenu('bangalore')}
            onMouseLeave={scheduleClose}
          >
            <button className={`nav-link nav-link-btn${activeMenu === 'bangalore' ? ' nav-link-open' : ''}`}>
              Bangalore <span className="nav-caret">▾</span>
            </button>
            {activeMenu === 'bangalore' && (
              <MegaPanel flat={BANGALORE_LINKS} onNavigate={closeAll} />
            )}
          </li>

          {/* INDUSTRY */}
          <li
            className="has-mega"
            onMouseEnter={() => openMenu('industry')}
            onMouseLeave={scheduleClose}
          >
            <button className={`nav-link nav-link-btn${activeMenu === 'industry' ? ' nav-link-open' : ''}`}>
              Industry <span className="nav-caret">▾</span>
            </button>
            {activeMenu === 'industry' && (
              <MegaPanel flat={INDUSTRY_LINKS} onNavigate={closeAll} />
            )}
          </li>

          <li><a href="/about" className="nav-link">About</a></li>
        </ul>

        <div className="nav-actions">
          <a href="/contact" className="btn-primary nav-cta-desktop">Request a Quote</a>
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
