'use client'

import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import { getFaqIcon } from '@/lib/faqIcons'
import '../app/(main)/landing.css'
import '../app/(main)/pages.css'

interface FAQItemData {
  question: string
  answer: string
  searchText?: string
  tag?: 'none' | 'popular' | 'new'
}

interface FAQCategoryData {
  categoryId: string
  title: string
  desc: string
  iconId: string
  items: FAQItemData[]
}

interface FAQPageData {
  hero: { eyebrow: string; titleLine1: string; titleLine2: string; subtitle: string }
  categories: FAQCategoryData[]
  stillQuestions: {
    title: string; subtitle: string;
    contactCards: Array<{ title: string; desc: string; linkText: string; linkUrl: string }>
  }
}

const EMPTY: FAQPageData = {
  hero: { eyebrow: 'Frequently asked questions', titleLine1: 'Everything you', titleLine2: 'need to know.', subtitle: '' },
  categories: [],
  stillQuestions: { title: '', subtitle: '', contactCards: [] },
}

export function FAQPage({ data: raw }: { data: FAQPageData }) {
  const data = { ...EMPTY, ...raw, hero: { ...EMPTY.hero, ...raw?.hero }, stillQuestions: { ...EMPTY.stillQuestions, ...raw?.stillQuestions } }
  const faqData = (data.categories || []).map((cat) => ({
    id: cat.categoryId,
    title: cat.title,
    desc: cat.desc,
    icon: getFaqIcon(cat.iconId),
    items: cat.items.map((item) => ({
      question: item.question,
      answer: item.answer,
      searchText: item.searchText || item.question.toLowerCase(),
      tag: item.tag === 'none' ? undefined : item.tag,
    })),
  }))

  const totalQuestions = faqData.reduce((sum, cat) => sum + cat.items.length, 0)

  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ [`${faqData[0]?.id}-0`]: true })
  const [activeCategory, setActiveCategory] = useState(faqData[0]?.id ?? '')

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const scrollToCategory = (id: string) => {
    setActiveCategory(id)
    document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredData = searchQuery.trim()
    ? faqData.map(cat => ({
        ...cat,
        items: cat.items.filter(item => {
          const q = searchQuery.toLowerCase()
          return item.searchText.includes(q) || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
        }),
      })).filter(cat => cat.items.length > 0)
    : faqData

  const visibleCount = filteredData.reduce((sum, cat) => sum + cat.items.length, 0)

  const contactCardIcons = [
    /* WhatsApp */
    <svg key="wa" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 9.2 1.8 10.3 2.4 11.3L1.5 14.5L4.8 13.6C5.8 14.2 6.9 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5Z" stroke="#B8972E" strokeWidth="0.9" fill="none" />
    </svg>,
    /* Email */
    <svg key="email" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#B8972E" strokeWidth="0.9" fill="none" />
      <path d="M2 5L8 9L14 5" stroke="#B8972E" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    </svg>,
  ]

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO */}
      <div className="page-hero">
        <div className="geo-pattern-overlay" style={{ opacity: 0.06, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\'%3E%3Cg fill=\'none\' stroke=\'%23B8972E\' stroke-width=\'0.6\'%3E%3Cpolygon points=\'30,4 53,17 53,43 30,56 7,43 7,17\'/%3E%3Cpolygon points=\'30,12 46,21 46,39 30,48 14,39 14,21\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">{data.hero.eyebrow}</div>
          <h1 className="page-hero-title">
            {data.hero.titleLine1}<br />{data.hero.titleLine2}
          </h1>
          <p className="page-hero-sub">
            {data.hero.subtitle}
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="faq-search-bar">
        <div className="faq-search-inner">
          <div className="faq-search-icon">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="rgba(245,240,230,0.4)" strokeWidth="1" />
              <path d="M10.5 10.5L13.5 13.5" stroke="rgba(245,240,230,0.4)" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search questions - e.g. 'minimum order', 'lead time', 'branding'"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="faq-search-count">
          {searchQuery.trim() ? `${visibleCount} result${visibleCount !== 1 ? 's' : ''}` : `${totalQuestions} questions`}
        </div>
      </div>

      {/* BODY */}
      <div className="faq-body">
        {/* SIDEBAR */}
        <div className="faq-sidebar">
          <div className="faq-sidebar-label">Browse by topic</div>
          {faqData.map(cat => (
            <button
              key={cat.id}
              className={`faq-sidebar-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              <span>{cat.title}</span>
              <span className="faq-sidebar-count">{cat.items.length}</span>
            </button>
          ))}
          <div className="faq-sidebar-divider" />
          <a href="/contact" className="faq-sidebar-btn" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            <span>Ask a question ↗</span>
          </a>
        </div>

        {/* FAQ CONTENT */}
        <div className="faq-content">
          {filteredData.map(cat => (
            <div key={cat.id} className="faq-category" id={`faq-${cat.id}`}>
              <div className="faq-cat-header">
                <div className="faq-cat-icon">{cat.icon}</div>
                <div>
                  <div className="faq-cat-title">{cat.title}</div>
                  <div className="faq-cat-desc">{cat.desc}</div>
                </div>
              </div>
              {cat.items.map((item, idx) => {
                const key = `${cat.id}-${idx}`
                const isOpen = !!openItems[key]
                return (
                  <div key={key} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button className="faq-question" onClick={() => toggleItem(key)}>
                      <span>{item.question}</span>
                      <div className="faq-chevron">
                        <svg viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#B8972E" strokeWidth="1.2" strokeLinecap="round" /></svg>
                      </div>
                    </button>
                    <div className="faq-answer">
                      {item.tag === 'popular' && <div className="faq-tag faq-tag-popular">Most asked</div>}
                      {item.tag === 'new' && <div className="faq-tag faq-tag-new">New</div>}
                      <div className="faq-answer-text" dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* STILL HAVE QUESTIONS */}
      <div className="faq-still-qs">
        <div className="geo-pattern-overlay" style={{ opacity: 0.05 }} />
        <div className="faq-still-inner">
          <div>
            <div className="section-eyebrow" style={{ marginBottom: 12 }}>{data.stillQuestions.title}</div>
            <div className="faq-still-title">{data.stillQuestions.subtitle}</div>
          </div>
          {data.stillQuestions.contactCards.map((card, i) => (
            <div key={i} className="faq-contact-card">
              <div className="faq-contact-icon">
                {contactCardIcons[i] ?? contactCardIcons[0]}
              </div>
              <div className="faq-contact-title">{card.title}</div>
              <div className="faq-contact-desc">{card.desc}</div>
              <a href={card.linkUrl} target="_blank" rel="noopener" className="faq-contact-action">{card.linkText} &rarr;</a>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
