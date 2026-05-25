'use client'

import React from 'react'
import '../app/(main)/landing.css'
import './LegalPage.css'
import './DiwaliGuide.css'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import { EMPLOYEE_GIFTS_FAQS } from './employeeGiftsGuideData'

const SECTIONS = [
  'Why Diwali employee gifting matters',
  'What makes a good Diwali employee gift',
  'Diwali gift ideas for employees, by budget',
  'Hampers vs single gifts vs gift cards',
  'Personalised Diwali gifts for employees',
  'Inclusive and considerate gifting',
  'Eco-friendly options',
  'Bulk ordering and delivery timing',
  'Frequently asked questions',
]

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function EmployeeGiftsGuide() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-pat" aria-hidden="true" />
          <div className="legal-hero-inner">
            <div className="legal-hero-eyebrow">Corporate Gifting Guides</div>
            <h1 className="legal-hero-title">Diwali Gifts for Employees: Ideas Teams Will Love</h1>
            <p className="legal-hero-meta">A MintBox guide · Bengaluru</p>
          </div>
        </header>

        <article className="legal-body">
          <div className="legal-body-inner">
            <div className="legal-intro">
              <p>
                Diwali is the moment to thank the people who carried the year. A well-chosen Diwali
                gift makes employees feel genuinely valued — and a generic, last-minute one quietly
                does the opposite. For companies in Bengaluru, where teams are large and the talent
                market is competitive, the Diwali gift is one of the most visible signals of how a
                company treats its people.
              </p>
              <p>
                This guide is a practical shortlist of Diwali gift ideas for employees, organised by
                budget, with the personalisation, inclusivity and logistics notes you will need to
                pull it off across a whole team.
              </p>
            </div>

            <nav className="legal-toc" aria-label="On this page">
              <p className="legal-toc-label">On this page</p>
              <ol>
                {SECTIONS.map((s) => (
                  <li key={s}>
                    <a href={`#${slugify(s)}`}>{s}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <section id={slugify(SECTIONS[0])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">01</span>
                {SECTIONS[0]}
              </h2>
              <div className="legal-section-body">
                <p>
                  Employee gifting at Diwali is recognition made tangible. It arrives at the one time
                  of year when the gesture is most expected, and it is shared — employees show Diwali
                  gifts to family and colleagues, so a good one earns goodwill well beyond the
                  individual. Equally, a careless gift is noticed and remembered. The aim is not
                  extravagance; it is evident thought.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[1])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">02</span>
                {SECTIONS[1]}
              </h2>
              <div className="legal-section-body">
                <p>
                  Three things. It should feel <strong>festive</strong> — a Diwali gift should look
                  and feel like the occasion, not like a routine purchase. It should be{' '}
                  <strong>useful or genuinely enjoyable</strong> — something the employee will use or
                  happily share, not a token that gathers dust. And it should feel{' '}
                  <strong>considered</strong> — branded packaging, a personal note, or a thoughtful
                  combination signals care even on a modest budget.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[2])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">03</span>
                {SECTIONS[2]}
              </h2>
              <div className="legal-section-body">
                <p>
                  The budget tier decides the format. The examples below are real items from the
                  MintBox catalogue (prices per unit; minimum order generally 10 units).
                </p>
                <div className="guide-table-wrap">
                  <table className="guide-table">
                    <thead>
                      <tr>
                        <th>Budget tier</th>
                        <th>Catalogue gift ideas</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Up to ₹500</td>
                        <td>
                          Chocolate Box (₹170), EAT Better Co. Assorted Laddoo Box (₹285), The
                          Baker’s Dozen Assorted Cookies (₹90), 4700BC gourmet popcorn tins
                          (₹200–₹225), Wooden Glass Scented Candle (₹200)
                        </td>
                        <td>
                          For large teams and giveaways. Presentation does the heavy lifting — branded
                          packaging and a festive card make a small gift feel complete.
                        </td>
                      </tr>
                      <tr>
                        <td>₹500–₹1,500</td>
                        <td>
                          A curated hamper — e.g. a laddoo box, Sancha Original Masala Chai (₹320) and
                          a scented candle in a Jute Basket (₹170)
                        </td>
                        <td>
                          The most popular tier for company-wide gifting — generous enough to feel
                          valued, practical enough to scale.
                        </td>
                      </tr>
                      <tr>
                        <td>₹1,500–₹3,000</td>
                        <td>
                          A larger hamper — gourmet treats, a Ferrero Rocher 24-piece box (₹855), a
                          Sancha Brewing Tales Tea Gift Box (₹950) and a branded item
                        </td>
                        <td>For senior staff, or as a premium company-wide gift.</td>
                      </tr>
                      <tr>
                        <td>₹3,000+</td>
                        <td>
                          Premium gifts — e.g. a Borosil Brew Pro Drip Coffee Machine (₹3,170) or a
                          curated executive box
                        </td>
                        <td>For senior management and long-tenure employees.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  <strong>Example hamper build:</strong> a popular ₹500–₹1,500 employee hamper
                  combines an EAT Better Co. Assorted Laddoo Box (₹285), Sancha Original Masala Chai
                  (₹320) and a Wooden Glass Scented Candle (₹200) in a Jute Basket (₹170). Build and
                  price your own at the <a href="/catalog">MintBox catalogue</a>.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[3])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">04</span>
                {SECTIONS[3]}
              </h2>
              <div className="legal-section-body">
                <p>
                  <strong>Hampers</strong> are the most popular choice — they feel festive and
                  generous and let you combine a traditional item with a practical one. For most
                  teams, a curated hamper is the safe, well-received default.
                </p>
                <p>
                  <strong>Single branded gifts</strong> work when you want something practical and
                  lasting — a quality bottle, a desk item — but pair it with festive packaging so it
                  still reads as a Diwali gift.
                </p>
                <p>
                  <strong>Gift cards</strong> offer choice but can feel impersonal for Diwali
                  specifically. If you use them, pair them with a small physical festive item so the
                  gesture still feels like a gift rather than a transaction.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[4])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">05</span>
                {SECTIONS[4]}
              </h2>
              <div className="legal-section-body">
                <p>
                  Personalisation turns a bulk purchase into something that feels individual. Options
                  that work well across a whole team: branded festive packaging, a card carrying the
                  company’s Diwali message, and logo-printed items inside the hamper. For larger
                  budgets, adding the employee’s name lifts it further. MintBox personalises gifts
                  with your branding — start at the <a href="/catalog">MintBox catalogue</a> or{' '}
                  <a href="/contact">request a quote</a>.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[5])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">06</span>
                {SECTIONS[5]}
              </h2>
              <div className="legal-section-body">
                <p>
                  A few practical notes for a diverse workforce. Keep food hampers vegetarian by
                  default and clearly labelled — it is the safest universal choice. Offer a sugar-free
                  or dry-fruit-led option alongside traditional sweets, for health-conscious
                  employees. Be cautious with alcohol. And remember remote and hybrid employees — plan
                  to ship to their homes so no one is left out.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[6])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">07</span>
                {SECTIONS[6]}
              </h2>
              <div className="legal-section-body">
                <p>
                  Many teams now appreciate an eco-friendly Diwali hamper — plantable products,
                  natural and recycled materials, and minimal-waste packaging. It is a thoughtful
                  message at a festival associated with excess, and it reflects well on the company.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[7])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">08</span>
                {SECTIONS[7]}
              </h2>
              <div className="legal-section-body">
                <p>
                  Gifting a whole team means planning the logistics early. Confirm your Diwali
                  employee gift order six to eight weeks before Diwali — for 2026, that means
                  September. Decide whether gifts go to one office for distribution or ship directly
                  to employees’ homes, which is increasingly common for hybrid teams. MintBox handles
                  branding, packing, GST invoicing and delivery across Bengaluru. Full detail is in
                  the <a href="/guides/diwali-corporate-gifts">Diwali corporate gifts guide</a>.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[8])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">09</span>
                {SECTIONS[8]}
              </h2>
              <div className="legal-section-body">
                <div className="guide-faq">
                  {EMPLOYEE_GIFTS_FAQS.map((f) => (
                    <div className="guide-faq-item" key={f.q}>
                      <p className="guide-faq-q">{f.q}</p>
                      <p className="guide-faq-a">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="guide-cta">
              <p className="guide-cta-title">Make your team feel valued this Diwali.</p>
              <p className="guide-cta-sub">
                Build your team’s Diwali hamper at the MintBox catalogue and request a quote — confirm
                bulk orders by mid-September.
              </p>
              <div className="guide-cta-btns">
                <a href="/catalog" className="guide-cta-primary">
                  Build your hamper →
                </a>
                <a href="/contact" className="guide-cta-secondary">
                  Request a quote
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
