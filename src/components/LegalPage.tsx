'use client'

import React from 'react'
import '../app/(main)/landing.css'
import './LegalPage.css'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'

export interface LegalSection {
  heading: string
  body: React.ReactNode
}

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: {
  eyebrow: string
  title: string
  lastUpdated: string
  intro: React.ReactNode
  sections: LegalSection[]
}) {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-pat" aria-hidden="true" />
          <div className="legal-hero-inner">
            <div className="legal-hero-eyebrow">{eyebrow}</div>
            <h1 className="legal-hero-title">{title}</h1>
            <p className="legal-hero-meta">Last updated: {lastUpdated}</p>
          </div>
        </header>

        <article className="legal-body">
          <div className="legal-body-inner">
            <div className="legal-intro">{intro}</div>

            <nav className="legal-toc" aria-label="On this page">
              <p className="legal-toc-label">On this page</p>
              <ol>
                {sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#${slugify(s.heading)}`}>{s.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>

            {sections.map((s, i) => (
              <section key={i} id={slugify(s.heading)} className="legal-section">
                <h2 className="legal-section-heading">
                  <span className="legal-section-num">{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </h2>
                <div className="legal-section-body">{s.body}</div>
              </section>
            ))}

            <footer className="legal-foot">
              <p>
                Questions about this policy? Email{' '}
                <a href="mailto:hello@themintbox.in">hello@themintbox.in</a> or use the{' '}
                <a href="/contact">contact form</a>.
              </p>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
