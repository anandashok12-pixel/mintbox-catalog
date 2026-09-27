'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import FAQSection from '@/components/content/FAQSection'
import InlineQuoteForm from '@/components/content/InlineQuoteForm'
import QuickAnswerBox from '@/components/content/QuickAnswerBox'
import EATSignal from '@/components/content/EATSignal'
import LastUpdatedDate from '@/components/content/LastUpdatedDate'
import { FACTS } from '@/lib/festiveFacts'
import FestivePicks from './FestivePicks'
import type { FestivePageConfig, PickSection } from './types'

interface Props {
  config: FestivePageConfig
  sections: PickSection[]
}

/**
 * One simple, consistent layout for every festive guide page:
 * answer first, then picks, then advice, then how to order, then FAQs.
 * Sections only render when the page config provides them.
 */
export default function FestivePage({ config, sections }: Props) {
  const heroImages = sections
    .flatMap(s => s.products)
    .filter(p => p.image?.url)
    .slice(0, 3)

  const toc: Array<{ id: string; label: string }> = [
    ...sections.map(s => ({ id: `picks-${s.id}`, label: s.title })),
    ...(config.ideas ? [{ id: config.ideas.id, label: config.ideas.title }] : []),
    ...(config.table ? [{ id: config.table.id, label: config.table.title }] : []),
    ...(config.tips ? [{ id: config.tips.id, label: config.tips.title }] : []),
    ...(config.steps ? [{ id: config.steps.id, label: config.steps.title }] : []),
    { id: 'faq', label: 'Questions people ask' },
    { id: 'quote', label: 'Get a quote' },
  ]

  const firstAnchor = sections[0]
    ? `#picks-${sections[0].id}`
    : config.ideas
      ? `#${config.ideas.id}`
      : config.table
        ? `#${config.table.id}`
        : '#faq'
  const productCount = sections.reduce((n, s) => n + s.products.length, 0)

  return (
    <div className="cp-wrapper fp-page">
      <Navbar />
      <main id="main">
        {/* HERO: what this page is, in one breath */}
        <section className="cp-hero">
          <div className="cp-hero-pattern" aria-hidden="true" />
          <div className="cp-hero-inner">
            <div>
              <nav className="cp-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                {config.parents.map(p => (
                  <span key={p.href}>
                    <span className="cp-breadcrumb-sep" aria-hidden="true">›</span>
                    <Link href={p.href}>{p.name}</Link>
                  </span>
                ))}
                <span className="cp-breadcrumb-sep" aria-hidden="true">›</span>
                <span className="cp-breadcrumb-current" aria-current="page">{config.crumb}</span>
              </nav>
              <div className="cp-hero-eyebrow">{config.eyebrow}</div>
              <h1 className="cp-hero-title">
                {config.h1}
                {config.h1Em && (<><br /><em>{config.h1Em}</em></>)}
              </h1>
              <div className="cp-hero-rule" />
              <p className="cp-hero-sub fp-rich" dangerouslySetInnerHTML={{ __html: config.intro }} />
              <div className="cp-hero-ctas">
                <a href={firstAnchor} className="cp-hero-cta-primary">
                  {productCount > 0 ? `See ${productCount} ${config.picksNoun ?? 'picks'} ↓` : 'Start reading ↓'}
                </a>
                <a href="#quote" className="cp-hero-cta-secondary">Get a quote in {FACTS.quoteTime}</a>
              </div>
              <ul className="cp-hero-badge-group fp-badges" aria-label="Key facts">
                {config.badges.map(b => <li key={b} className="cp-hero-badge">{b}</li>)}
              </ul>
            </div>
            {heroImages.length > 0 && (
              <div className="cp-hero-visual" aria-hidden="true">
                <div className="cp-hero-visual-grid">
                  {heroImages.map((p, i) => (
                    <div key={p.id} className="cp-hero-visual-card">
                      <Image
                        src={p.image!.url!}
                        alt=""
                        width={600}
                        height={600}
                        className={`cp-hero-img-actual${i === 0 ? ' cp-hero-img-actual--tall' : ''}`}
                        loading="lazy"
                        sizes={i === 0 ? '(max-width: 1024px) 60vw, 270px' : '(max-width: 1024px) 40vw, 140px'}
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {config.diwaliStrip && (
          <div className="dh-deadline" role="note" aria-label="Diwali 2026 ordering deadlines">
            <div className="cp-container dh-deadline-inner">
              <span className="dh-deadline-item"><strong>Diwali 2026:</strong> {FACTS.diwaliDate}</span>
              <span className="dh-deadline-sep" aria-hidden="true">·</span>
              <span className="dh-deadline-item"><strong>Confirm by:</strong> {FACTS.orderBy} for guaranteed delivery</span>
              <span className="dh-deadline-sep" aria-hidden="true">·</span>
              <span className="dh-deadline-item"><strong>Dispatch:</strong> {FACTS.dispatch}</span>
            </div>
          </div>
        )}

        {/* QUICK ANSWER: the 50-word answer search engines and AI assistants quote */}
        <div className="cp-aeo-band">
          <div className="cp-container--narrow">
            <QuickAnswerBox title="Quick answer" content={config.quickAnswer} />
            {config.trust && <EATSignal credentials={config.trust} />}
          </div>
        </div>

        {/* ON THIS PAGE */}
        <nav className="fp-toc" aria-label="On this page">
          <div className="cp-container--narrow">
            <span className="fp-toc-label">On this page</span>
            <ul>
              {toc.map(t => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}
            </ul>
          </div>
        </nav>

        {config.note && (
          <div className="cp-container--narrow">
            <aside className="fp-note" aria-label={config.note.title}>
              <strong>{config.note.title}</strong>
              <p className="fp-rich" dangerouslySetInnerHTML={{ __html: config.note.text }} />
            </aside>
          </div>
        )}

        {/* PICKS: live from the catalogue */}
        {sections.length > 0 && (
          <FestivePicks sections={sections} />
        )}

        {/* IDEAS: editorial list */}
        {config.ideas && (
          <section id={config.ideas.id} className="cp-section cp-section--white fp-anchor" aria-labelledby={`${config.ideas.id}-title`}>
            <div className="cp-container--narrow">
              <h2 id={`${config.ideas.id}-title`} className="cp-section-title">{config.ideas.title}</h2>
              <p className="fp-lead fp-rich" dangerouslySetInnerHTML={{ __html: config.ideas.intro }} />
              <ol className="fp-ideas">
                {config.ideas.items.map(idea => (
                  <li key={idea.name} className="fp-idea">
                    <div className="fp-idea-head">
                      <h3 className="fp-idea-name">{idea.name}</h3>
                      {idea.price && <span className="fp-idea-price">{idea.price}</span>}
                    </div>
                    <p className="fp-rich" dangerouslySetInnerHTML={{ __html: idea.desc }} />
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* TABLE */}
        {config.table && (
          <section id={config.table.id} className="cp-section cp-section--cream fp-anchor" aria-labelledby={`${config.table.id}-title`}>
            <div className="cp-container--narrow">
              <h2 id={`${config.table.id}-title`} className="cp-section-title">{config.table.title}</h2>
              <p className="fp-lead fp-rich" dangerouslySetInnerHTML={{ __html: config.table.intro }} />
              <div className="cp-table-wrap" tabIndex={0} role="region" aria-label={config.table.caption}>
                <table className="cp-table fp-stack">
                  <caption className="fp-sr-only">{config.table.caption}</caption>
                  <thead>
                    <tr>{config.table.columns.map(c => <th key={c} scope="col">{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {config.table.rows.map(row => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => i === 0
                          ? <th key={i} scope="row">{cell}</th>
                          : <td key={i} data-label={config.table!.columns[i]}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* TIPS */}
        {config.tips && (
          <section id={config.tips.id} className="cp-section cp-section--white fp-anchor" aria-labelledby={`${config.tips.id}-title`}>
            <div className="cp-container--narrow">
              <h2 id={`${config.tips.id}-title`} className="cp-section-title">{config.tips.title}</h2>
              {config.tips.intro && <p className="fp-lead fp-rich" dangerouslySetInnerHTML={{ __html: config.tips.intro }} />}
              <ul className="fp-tips">
                {config.tips.items.map(t => (
                  <li key={t.title} className="fp-tip">
                    <h3 className="fp-tip-title">{t.title}</h3>
                    <p className="fp-rich" dangerouslySetInnerHTML={{ __html: t.desc }} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* STEPS */}
        {config.steps && (
          <section id={config.steps.id} className="cp-section cp-section--cream fp-anchor" aria-labelledby={`${config.steps.id}-title`}>
            <div className="cp-container--narrow">
              <h2 id={`${config.steps.id}-title`} className="cp-section-title">{config.steps.title}</h2>
              {config.steps.intro && <p className="fp-lead fp-rich" dangerouslySetInnerHTML={{ __html: config.steps.intro }} />}
              <ol className="fp-steps">
                {config.steps.items.map(s => (
                  <li key={s.title} className="fp-step">
                    <h3 className="fp-step-title">{s.title}</h3>
                    <p className="fp-rich" dangerouslySetInnerHTML={{ __html: s.desc }} />
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="cp-section cp-section--white fp-anchor">
          <div className="cp-container--narrow">
            <FAQSection items={config.faqs} eyebrow="FAQ" title="Questions people ask" emitSchema={false} />
          </div>
        </section>

        {/* QUOTE */}
        <section id="quote" className="cp-cta-section fp-anchor">
          <div className="cp-cta-section-inner">
            <div>
              <h2 className="cp-cta-title">{config.quote.title}</h2>
              <p className="cp-cta-sub">{config.quote.subtitle}</p>
              <ul className="fp-quote-points">
                <li>Reply in {FACTS.quoteTime}, with a logo mockup</li>
                <li>Minimum order {FACTS.moq} units per item</li>
                <li>GST invoice in your company&rsquo;s name</li>
                <li>
                  Prefer to talk? <a href={FACTS.whatsapp} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
                </li>
              </ul>
            </div>
            <div className="cp-quote-form-panel">
              <InlineQuoteForm title={config.quote.title} ctaLabel={config.quote.cta} defaultOccasion={config.quote.occasion} />
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="cp-section cp-section--cream" aria-labelledby="related-title">
          <div className="cp-container">
            <h2 id="related-title" className="cp-section-title">Related guides</h2>
            <div className="cp-related-grid">
              {config.related.map(link => (
                <Link key={link.href} href={link.href} className="cp-related-card">
                  <div className="cp-related-card-label">{link.label}</div>
                  <div className="cp-related-card-title">{link.title}</div>
                  <div className="cp-related-card-arrow" aria-hidden="true">→</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="cp-container--narrow fp-byline">
          <p>
            Written by the MintBox gifting team in {FACTS.city}.
            {productCount > 0 && ' Prices are per unit, exclusive of GST, and update automatically from our catalogue.'}
          </p>
          <LastUpdatedDate date={config.updated} />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
