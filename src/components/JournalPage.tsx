'use client'

import React, { useState } from 'react'
import '../app/(main)/landing.css'
import '../app/(main)/journal/journal-index.css'

const categories = ['All', 'Gifting guides', 'Occasion edits', 'Case studies', 'Inside MintBox']

interface Article {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  imgClass: string
  catClass: string
  imgLabel: string
  slug?: string
}

const featuredArticle: Article = {
  title: 'The 2025 guide to employee onboarding gifts in Bengaluru',
  excerpt: 'What your new hire\u2019s first box says about your company \u2014 and how to get it exactly right without blowing the budget.',
  category: 'Gifting guides',
  date: 'March 2025',
  readTime: '8 min read',
  imgClass: 'jn-img-guide',
  catClass: 'jn-cat-guide',
  imgLabel: 'Featured article',
}

const articles: Article[] = [
  { title: 'The Diwali corporate gifting edit: premium options under \u20B93,500', excerpt: 'Curated picks for teams that want to stand out from the usual box of dry fruits and branded mugs.', category: 'Occasion edits', date: 'Feb 2025', readTime: '6 min read', imgClass: 'jn-img-occasion', catClass: 'jn-cat-occasion', imgLabel: 'Occasion edit' },
  { title: 'How a Series B startup onboarded 200 employees across 12 cities in one week', excerpt: 'When Bengaluru-based Finova scaled their hiring, their HR team needed gifting that could keep up. Here\u2019s how we did it.', category: 'Case studies', date: 'Jan 2025', readTime: '5 min read', imgClass: 'jn-img-case', catClass: 'jn-cat-case', imgLabel: 'Case study' },
  { title: 'How to choose branded merchandise that people actually keep', excerpt: 'The difference between a gift that lives on the desk and one that goes straight to the back of a drawer.', category: 'Gifting guides', date: 'Jan 2025', readTime: '7 min read', imgClass: 'jn-img-guide', catClass: 'jn-cat-guide', imgLabel: 'Gifting guide' },
  { title: 'Why we do branding in-house \u2014 and why it matters to you', excerpt: 'Most gifting vendors outsource printing to whoever is cheapest. We don\u2019t. Here\u2019s what that means for the quality of your brand.', category: 'Inside MintBox', date: 'Dec 2024', readTime: '4 min read', imgClass: 'jn-img-inside', catClass: 'jn-cat-inside', imgLabel: 'Inside MintBox' },
  { title: 'New Year corporate gifting: 8 ideas that don\u2019t feel like afterthoughts', excerpt: 'The window between Christmas and New Year is when most companies phone it in. Here\u2019s how to use it to stand out instead.', category: 'Occasion edits', date: 'Dec 2024', readTime: '5 min read', imgClass: 'jn-img-occasion', catClass: 'jn-cat-occasion', imgLabel: 'Occasion edit' },
  { title: 'Sustainable corporate gifting in India: what actually works', excerpt: 'Eco gifting in India is full of greenwashing. We break down which materials, certifications, and sourcing choices genuinely reduce impact.', category: 'Gifting guides', date: 'Nov 2024', readTime: '9 min read', imgClass: 'jn-img-wellness', catClass: 'jn-cat-guide', imgLabel: 'Gifting guide' },
]

const wideArticles: Article[] = [
  { title: 'Work anniversary gifts that don\u2019t feel like a HR checkbox', excerpt: 'Year 1, year 3, year 5 \u2014 each milestone deserves a different approach. A framework for gifting that actually recognises the individual.', category: 'Gifting guides', date: 'Oct 2024', readTime: '6 min read', imgClass: 'jn-img-guide', catClass: 'jn-cat-guide', imgLabel: 'Guide' },
  { title: 'How a GCC used gifting to close the culture gap with their India team', excerpt: 'A Singapore-headquartered company was struggling with engagement at their Bengaluru office. One Diwali gifting programme changed the conversation.', category: 'Case studies', date: 'Sep 2024', readTime: '7 min read', imgClass: 'jn-img-case', catClass: 'jn-cat-case', imgLabel: 'Case study' },
  { title: 'Conference swag that people actually take home \u2014 not leave behind', excerpt: 'The graveyard of branded pens and stress balls is long. Here\u2019s what actually works at events in 2025.', category: 'Occasion edits', date: 'Aug 2024', readTime: '5 min read', imgClass: 'jn-img-occasion', catClass: 'jn-cat-occasion', imgLabel: 'Occasion' },
  { title: 'The sourcing trip: how we find products that meet the MintBox standard', excerpt: 'We visit every manufacturer before listing a product. Here\u2019s what we look for \u2014 and what makes us walk away.', category: 'Inside MintBox', date: 'Jul 2024', readTime: '8 min read', imgClass: 'jn-img-inside', catClass: 'jn-cat-inside', imgLabel: 'Inside MintBox' },
]

const topics = [
  'Employee onboarding', 'Diwali gifting', 'Sustainable gifts',
  'Client appreciation', 'Budget guides', 'Branding quality',
  'WFH gifting', 'GCC procurement', 'New hire kits',
]

export function JournalPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const matchesSearch = (a: Article) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
  }

  const matchesCategory = (a: Article) =>
    activeTab === 'All' || a.category === activeTab

  const filteredArticles = articles.filter(a => matchesCategory(a) && matchesSearch(a))
  const filteredWideArticles = wideArticles.filter(a => matchesCategory(a) && matchesSearch(a))
  const totalCount = filteredArticles.length + filteredWideArticles.length

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const btn = (e.target as HTMLFormElement).querySelector('button')
    if (btn) {
      btn.textContent = '\u2713 Subscribed'
      ;(btn as HTMLButtonElement).disabled = true
    }
  }

  return (
    <div className="jn-page">
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

      {/* HERO — split */}
      <div className="jn-hero">
        <div className="jn-hero-left">
          <div className="jn-hero-pat" />
          <div>
            <div className="jn-hero-label">The MintBox Journal</div>
          </div>
          <div className="jn-hero-title-wrap">
            <svg className="jn-hero-bow" width="72" height="26" viewBox="0 0 80 28" fill="none">
              <path d="M40 16C33 10,18 4,5 9C-3 13,2 21,14 18C26 15,35 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M40 16C47 10,62 4,75 9C83 13,78 21,66 18C54 15,45 19,40 16" stroke="#B8972E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              <path d="M34 13C37 10,39 9,40 9C41 9,43 10,46 13C43 16,41 16,40 16C39 16,37 16,34 13Z" stroke="#B8972E" strokeWidth="1.1" fill="none" />
              <path d="M40 16L38 24M40 16L42 24" stroke="#B8972E" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <div className="jn-hero-title">
              Gifting,<br />thoughtfully<br />considered.
            </div>
            <div className="jn-hero-sub">
              Guides, occasion edits, case studies, and the occasional behind-the-scenes from the MintBox team.
            </div>
          </div>
        </div>

        {/* FEATURED ARTICLE */}
        <div className="jn-hero-right">
          <div className="jn-feat-img">
            <div className={`jn-feat-img-inner ${featuredArticle.imgClass}`}>
              <span className="jn-feat-img-label">{featuredArticle.imgLabel}</span>
            </div>
          </div>
          <div className="jn-feat-body">
            <div className="jn-feat-meta">
              <span className="jn-feat-cat">{featuredArticle.category}</span>
              <span className="jn-feat-time">{featuredArticle.readTime} &middot; {featuredArticle.date}</span>
            </div>
            <div className="jn-feat-title">{featuredArticle.title}</div>
            <div className="jn-feat-excerpt">{featuredArticle.excerpt}</div>
            <div className="jn-feat-read">Read article &rarr;</div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="jn-filter-bar">
        <div className="jn-filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`jn-ftab${activeTab === cat ? ' active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="jn-filter-right">
          <input
            className="jn-filter-search"
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="jn-filter-count">{totalCount} articles</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="jn-main">
        {/* PRIMARY GRID */}
        <div className="jn-grid-label">
          <div className="jn-grid-label-text">Latest articles</div>
          <div className="jn-grid-label-link">View all &rarr;</div>
        </div>

        <div className="jn-article-grid">
          {filteredArticles.map((article, i) => (
            <div key={i} className="jn-card">
              <div className={`jn-card-img ${article.imgClass}`}>
                <div className="jn-card-img-inner">
                  <span className="jn-card-img-label">{article.imgLabel}</span>
                </div>
              </div>
              <div className="jn-card-body">
                <div className="jn-card-meta">
                  <span className={`jn-card-cat ${article.catClass}`}>{article.category}</span>
                  <span className="jn-card-date">{article.date}</span>
                </div>
                <div className="jn-card-title">{article.title}</div>
                <div className="jn-card-excerpt">{article.excerpt}</div>
                <div className="jn-card-footer">
                  <span className="jn-card-read-time">{article.readTime}</span>
                  <span className="jn-card-read-link">Read &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NEWSLETTER STRIP */}
        <div className="jn-mid-strip">
          <div className="jn-mid-pat" />
          <div className="jn-mid-left">
            <div className="jn-mid-eyebrow">The MintBox Letter</div>
            <div className="jn-mid-title">
              &ldquo;Gifting guides and occasion edits,<br />once a month. No noise.&rdquo;
            </div>
            <div className="jn-mid-sub">Join 400+ HR leaders and founders who read it.</div>
          </div>
          <form className="jn-mid-form" onSubmit={handleSubscribe} noValidate>
            <input className="jn-mid-input" type="email" placeholder="Your work email" />
            <button type="submit" className="jn-mid-btn">Subscribe &rarr;</button>
          </form>
        </div>

        {/* TOPICS ROW */}
        <div className="jn-topics-row">
          <span className="jn-topics-label">Browse topics</span>
          {topics.map(topic => (
            <span key={topic} className="jn-topic-tag">{topic}</span>
          ))}
        </div>

        {/* WIDE CARDS — MORE FROM THE JOURNAL */}
        <div className="jn-grid-label" style={{ marginTop: '2.5rem' }}>
          <div className="jn-grid-label-text">More from the journal</div>
        </div>

        <div className="jn-wide-grid">
          {filteredWideArticles.map((article, i) => (
            <div key={i} className="jn-wcard">
              <div className={`jn-wcard-img ${article.imgClass}`}>
                <div className="jn-wcard-img-inner">
                  <span className="jn-wcard-img-label">{article.imgLabel}</span>
                </div>
              </div>
              <div className="jn-wcard-body">
                <span className={`jn-wcard-cat ${article.catClass}`}>{article.category}</span>
                <div className="jn-wcard-title">{article.title}</div>
                <div className="jn-wcard-excerpt">{article.excerpt}</div>
                <div className="jn-wcard-footer">
                  <span className="jn-wcard-read-time">{article.readTime} &middot; {article.date}</span>
                  <span className="jn-wcard-read-link">Read &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="jn-load-more">
          <button className="jn-load-btn">Load more articles</button>
        </div>
      </div>

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
