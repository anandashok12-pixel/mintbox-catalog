'use client'

import React from 'react'
import '../app/(main)/landing.css'
import './LegalPage.css'
import './DiwaliGuide.css'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'
import { DIWALI_FAQS } from './diwaliGuideData'

const SECTIONS = [
  'Why Diwali corporate gifting matters',
  'Diwali gifts for employees vs clients',
  'Diwali hampers — the signature gift',
  'Diwali gift ideas by budget',
  'Personalised and branded Diwali gifts',
  'Eco-friendly Diwali gifting',
  'Diwali gifting etiquette and inclusivity',
  'Ordering timeline — when to place bulk Diwali orders',
  'Why order Diwali corporate gifts from MintBox',
  'Frequently asked questions',
]

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function DiwaliGuide() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-pat" aria-hidden="true" />
          <div className="legal-hero-inner">
            <div className="legal-hero-eyebrow">Corporate Gifting Guides</div>
            <h1 className="legal-hero-title">Diwali Corporate Gifts 2026: The Complete Guide</h1>
            <p className="legal-hero-meta">A MintBox guide · Bengaluru</p>
          </div>
        </header>

        <article className="legal-body">
          <div className="legal-body-inner">
            <div className="legal-intro">
              <p>
                Diwali is the most important moment in the Indian corporate gifting calendar. It is
                when companies thank the people who carried the year — employees, clients, partners
                and vendors — and when a thoughtful gift does the most to strengthen a relationship.
                For a Bengaluru business with large teams and long client relationships, Diwali
                gifting is not a nicety; it is one of the most visible things your company does all
                year.
              </p>
              <p>
                This guide covers everything you need to plan Diwali corporate gifting well — who to
                gift, what to give, how much to spend, how to personalise it, and, most importantly,
                when to order. Diwali 2026 falls in early November. The best Diwali gifting is decided
                and ordered weeks before that, so read the timeline section before you do anything
                else.
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
                  Diwali gifting works on two levels. For employees, it is recognition — a tangible
                  signal that the company values them, delivered at the one time of year when that
                  gesture is most expected and most felt. For clients and partners, it is
                  relationship maintenance — a way to stay warm and top of mind going into a new year.
                </p>
                <p>
                  It also carries a quiet risk. Because Diwali gifting is expected, its absence is
                  noticed — and so is a careless version of it. A generic, hastily assembled gift can
                  do more harm than no gift at all. The companies that get the most from Diwali treat
                  it as a planned exercise: budget agreed, recipients mapped, gifts chosen with care
                  and ordered in good time.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[1])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">02</span>
                {SECTIONS[1]}
              </h2>
              <div className="legal-section-body">
                <p>Diwali gifting splits into two audiences with genuinely different needs.</p>
                <p>
                  <strong>Employees</strong> want gifts that feel personal and useful — festive
                  hampers, sweets and dry fruits, branded products they will actually use, or a
                  thoughtful combination. The volume is usually large, so consistency, packaging and
                  logistics matter as much as the gift itself.
                </p>
                <p>
                  <strong>Clients</strong> want gifts that feel premium and considered, and they
                  should be tiered by relationship — a key account and a new prospect do not receive
                  the same box. Keep the recipient’s own gifting policy in mind, too: many companies
                  cap the value of gifts their staff may accept, and an over-generous gift can put a
                  client contact in an awkward position.
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
                  The hamper is the defining Diwali corporate gift: a curated set of items presented
                  together in festive, branded packaging. It works because it feels generous and
                  complete, and because it lets you combine something traditional with something
                  practical. The common formats, with examples from the MintBox catalogue:
                </p>
                <ul>
                  <li>
                    <strong>Sweets and mithai hampers</strong> — the traditional choice, always well
                    received. Catalogue picks: EAT Better Co. Assorted Laddoo Box (₹285), SMOOR Luxe
                    Assorted Chocolate Box (₹445), Loyka Almond Brittle Gold Chocolate Box (₹900).
                  </li>
                  <li>
                    <strong>Dry fruit and nut hampers</strong> — premium, long-lasting and appropriate
                    across dietary preferences; a safe, well-regarded choice for both employees and
                    clients. Catalogue picks: 7 Bazaari Nuts in Dates Assorted Gift Box (₹220),
                    POPULAR GOURMET Pecan Nuts (₹750).
                  </li>
                  <li>
                    <strong>Gourmet hampers</strong> — chocolates, artisanal snacks and specialty
                    treats, for a modern feel that suits younger teams. Catalogue picks: 4700BC
                    Tiramisu Chocolate Popcorn Tin (₹225), Open Secret Gourmet Cookie Gift Box (₹280),
                    Ferrero Rocher 24-piece box (₹855).
                  </li>
                  <li>
                    <strong>Tea and coffee hampers</strong> — a considered, premium option. Catalogue
                    picks: Sancha Original Masala Chai (₹320), Sancha Brewing Tales Tea Gift Box
                    (₹950), Borosil Brew Pro Drip Coffee Machine (₹3,170).
                  </li>
                  <li>
                    <strong>Eco-friendly hampers</strong> — plantable items, scented candles and
                    natural-material packaging. Catalogue picks: presented in a Jute Basket (₹170) or
                    Bamboo Basket (₹460), with a Wooden Glass Scented Candle (₹200) or a planter.
                  </li>
                  <li>
                    <strong>Mixed premium hampers</strong> — a curated combination of food and a
                    quality branded product, suited to senior staff and key clients.
                  </li>
                </ul>
                <p>
                  MintBox runs a build-your-pack catalogue: choose items, add them to a gifting pack
                  and request a quote. Browse and build at the{' '}
                  <a href="/catalog">MintBox catalogue</a>.
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
                  Diwali gifting works at every price point — the budget decides the format, not
                  whether the gift lands. The examples below are real items from the MintBox catalogue
                  (prices per unit; most items have a minimum order of 10 units).
                </p>
                <div className="guide-table-wrap">
                  <table className="guide-table">
                    <thead>
                      <tr>
                        <th>Budget tier</th>
                        <th>Catalogue examples</th>
                        <th>Best suited to</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Up to ₹500</td>
                        <td>
                          Chocolate Box (₹170), EAT Better Co. Assorted Laddoo Box (₹285), Open Secret
                          Chocolate Brownie Gift Box (₹265), 4700BC gourmet popcorn tins (₹200–₹225),
                          Wooden Glass Scented Candle (₹200)
                        </td>
                        <td>Large teams, high-volume gifting, support staff</td>
                      </tr>
                      <tr>
                        <td>₹500–₹1,500</td>
                        <td>
                          A small curated hamper — a laddoo or chocolate box with Sancha Original
                          Masala Chai (₹320) in a Jute Basket (₹170); or a single premium item such as
                          the Loyka Almond Brittle Gold Chocolate Box (₹900)
                        </td>
                        <td>Company-wide employee gifting — the most popular tier</td>
                      </tr>
                      <tr>
                        <td>₹1,500–₹3,000</td>
                        <td>
                          A larger hamper combining gourmet treats, a Ferrero Rocher 24-piece box
                          (₹855) and a Sancha Brewing Tales Tea Gift Box (₹950)
                        </td>
                        <td>Senior staff, a premium company-wide gift, mid-tier clients</td>
                      </tr>
                      <tr>
                        <td>₹3,000+</td>
                        <td>
                          Premium gifts — a Borosil Brew Pro Drip Coffee Machine (₹3,170) or a curated
                          executive hamper
                        </td>
                        <td>Key clients, CXOs and long-tenure employees</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  <strong>Example hamper build:</strong> a ₹500–₹1,500 Diwali hamper might combine an
                  EAT Better Co. Assorted Laddoo Box (₹285), Sancha Original Masala Chai (₹320) and a
                  Wooden Glass Scented Candle (₹200) in a Jute Basket (₹170) — around ₹975 before
                  branding and packaging. Build and price your own at the{' '}
                  <a href="/catalog">MintBox catalogue</a>.
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
                  A Diwali gift carries your brand into your employees’ and clients’ homes during the
                  most visible season of the year — personalisation is what makes that count. Branded
                  packaging, a festive card carrying your company’s Diwali message, or logo-printed
                  items inside the hamper turn a bought product into a considered gift. For larger
                  budgets and client gifts, adding the recipient’s name lifts it further. MintBox
                  personalises Diwali hampers and gifts with your branding — start at the{' '}
                  <a href="/catalog">MintBox catalogue</a> or{' '}
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
                  A growing number of companies want their Diwali gifting to reflect a sustainability
                  commitment — and Diwali, a festival traditionally associated with excess, is a
                  meaningful place to show it. Options that work well: plantable seed products,
                  natural and recycled materials, reusable items, and minimal-waste packaging. Done
                  well, an eco-friendly Diwali hamper feels intentional rather than austere.
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
                  A few practical points keep Diwali gifting smooth across a diverse workforce and
                  client base. Keep food hampers vegetarian by default and clearly labelled — it is
                  the safest universal choice. Offer a sugar-free or dry-fruit-led option alongside
                  traditional sweets. Be cautious with alcohol; many recipients will not want it and
                  some workplaces prohibit it. For client gifts, stay within sensible value limits so
                  you do not put a contact in conflict with their own company’s policy.
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
                  This is the part most companies get wrong. Diwali demand peaks across the entire
                  gifting industry through October, and lead times stretch at exactly the moment you
                  need them shortest. Work backwards from Diwali:
                </p>
                <ul>
                  <li>
                    <strong>8–10 weeks before Diwali</strong> — agree the budget, the audiences and
                    the gift type; request quotes.
                  </li>
                  <li>
                    <strong>6–8 weeks before</strong> — confirm the order and approve personalisation
                    mock-ups.
                  </li>
                  <li>
                    <strong>3–4 weeks before</strong> — production and packing.
                  </li>
                  <li>
                    <strong>1–2 weeks before</strong> — delivery and distribution to offices or
                    employees’ homes.
                  </li>
                </ul>
                <p>
                  For a Bengaluru company, placing the bulk Diwali order by early-to-mid September is
                  comfortable. Leaving it to October means fewer choices, rushed personalisation and
                  tight delivery windows. Plan early.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[8])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">09</span>
                {SECTIONS[8]}
              </h2>
              <div className="legal-section-body">
                <p>
                  MintBox is a Bangalore-based corporate gifting partner. The{' '}
                  <a href="/catalog">MintBox catalogue</a> carries chocolates and sweets, gourmet
                  snacks, tea and coffee, drinkware, executive sets, festive home items and
                  natural-material packaging — everything needed to build a Diwali hamper. Choose your
                  items, add them to a gifting pack and request a quote; MintBox personalises the
                  gifts with your branding, packs them and delivers across Bengaluru, with GST
                  invoicing and bulk pricing. Most catalogue items have a minimum order of 10 units.
                </p>
              </div>
            </section>

            <section id={slugify(SECTIONS[9])} className="legal-section">
              <h2 className="legal-section-heading">
                <span className="legal-section-num">10</span>
                {SECTIONS[9]}
              </h2>
              <div className="legal-section-body">
                <div className="guide-faq">
                  {DIWALI_FAQS.map((f) => (
                    <div className="guide-faq-item" key={f.q}>
                      <p className="guide-faq-q">{f.q}</p>
                      <p className="guide-faq-a">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="guide-cta">
              <p className="guide-cta-title">Plan your Diwali gifting early.</p>
              <p className="guide-cta-sub">
                Build your Diwali hamper at the MintBox catalogue and request a quote — pre-book early
                for the best pricing and lead times.
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
