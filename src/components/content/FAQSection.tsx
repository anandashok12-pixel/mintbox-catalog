'use client'

import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  eyebrow?: string
}

export default function FAQSection({ items, title = 'Frequently Asked Questions', eyebrow = 'FAQ' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.replace(/<[^>]+>/g, ''),
      },
    })),
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="cp-section-eyebrow">{eyebrow}</div>
      <h2 className="cp-section-title" style={{ marginBottom: '36px' }}>{title}</h2>
      <div className="cp-faq-list">
        {items.map((item, i) => (
          <div key={i} className={`cp-faq-item${openIndex === i ? ' open' : ''}`}>
            <button
              className="cp-faq-question"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              {item.q}
              <span className="cp-faq-chevron" aria-hidden="true">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <div className="cp-faq-answer">
              <p
                className="cp-faq-answer-text"
                dangerouslySetInnerHTML={{ __html: item.a }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
