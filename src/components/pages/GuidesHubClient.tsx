'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

interface GuideLink {
  emoji: string
  title: string
  desc: string
  href: string
}

interface GuideGroup {
  eyebrow: string
  heading: string
  guides: GuideLink[]
}

const GROUPS: GuideGroup[] = [
  {
    eyebrow: 'Shop by Budget',
    heading: 'Budget Guides',
    guides: [
      { emoji: '💰', title: 'Budget Corporate Gifts', desc: 'Smart gifting ideas that don’t overspend.', href: '/guides/budget-corporate-gifts' },
      { emoji: '📊', title: 'Corporate Gifting Budget', desc: 'How to plan and optimise your gifting spend.', href: '/guides/corporate-gifting-budget' },
      { emoji: '🪙', title: 'Gifts Under ₹100', desc: 'Affordable bulk ideas for large teams.', href: '/guides/corporate-gifts-under-100' },
      { emoji: '💵', title: 'Gifts Under ₹500', desc: 'The best picks at a mid-range budget.', href: '/guides/corporate-gifts-under-500' },
      { emoji: '💎', title: 'Gifts Under ₹1,000', desc: 'Premium-feel options without going over budget.', href: '/guides/corporate-gifts-under-1000' },
    ],
  },
  {
    eyebrow: 'Festive Season',
    heading: 'Diwali & Festive Guides',
    guides: [
      { emoji: '🪔', title: 'Diwali Corporate Gifts', desc: 'Ideas for every budget, for 2026.', href: '/guides/diwali-corporate-gifts' },
      { emoji: '🎁', title: 'Diwali Gifts for Employees', desc: 'Planning Diwali gifting for your whole team.', href: '/guides/diwali-gifts-for-employees' },
      { emoji: '📦', title: 'Diwali Gifts by Budget', desc: '15 employee gift ideas at every price point.', href: '/guides/diwali-gifts-for-employees-by-budget' },
      { emoji: '⚖️', title: 'Employees vs Clients vs VIPs', desc: 'How Diwali hampers should differ by recipient.', href: '/guides/diwali-hampers-for-employees-vs-clients' },
      { emoji: '🎄', title: 'Christmas Corporate Gifts', desc: 'Ideas for employees and clients this Christmas.', href: '/guides/christmas-corporate-gifts' },
    ],
  },
  {
    eyebrow: 'Occasion & Audience',
    heading: 'Gifting by Occasion',
    guides: [
      { emoji: '📅', title: 'Gifts by Occasion', desc: 'Onboarding, festivals, and client moments.', href: '/guides/corporate-gifts-by-occasion' },
      { emoji: '🤝', title: 'Gifts for Clients', desc: 'Premium ideas to strengthen key relationships.', href: '/guides/corporate-gifts-for-clients' },
      { emoji: '👋', title: 'Gifts for New Employees', desc: 'Welcome kits that make day one memorable.', href: '/guides/corporate-gifts-for-new-employees' },
      { emoji: '🎯', title: 'What to Gift Employees', desc: 'A practical shortlist for any team.', href: '/guides/what-to-gift-employees' },
      { emoji: '🏆', title: 'Work Anniversary Gifts', desc: 'Recognising tenure milestones the right way.', href: '/guides/work-anniversary-gifts' },
      { emoji: '🧭', title: 'How to Choose Corporate Gifts', desc: 'A practical 2026 decision framework.', href: '/guides/how-to-choose-corporate-gifts' },
    ],
  },
  {
    eyebrow: 'Planning & Strategy',
    heading: 'Strategy, Trends & Ideas',
    guides: [
      { emoji: '📘', title: 'Corporate Gifting Handbook', desc: 'The complete India guide for 2026.', href: '/guides/corporate-gifting-handbook' },
      { emoji: '🎓', title: 'Corporate Gifting Etiquette', desc: 'Do’s and don’ts for gifting in India.', href: '/guides/corporate-gifting-etiquette' },
      { emoji: '📈', title: 'Gifting Trends 2026', desc: 'What Indian businesses are gifting this year.', href: '/guides/corporate-gifting-trends-2026' },
      { emoji: '✨', title: 'Corporate Gift Ideas 2026', desc: 'Trending ideas across every category.', href: '/guides/corporate-gift-ideas-2026' },
      { emoji: '🌿', title: 'Sustainable Corporate Gifts', desc: 'Eco-friendly options for conscious brands.', href: '/guides/sustainable-corporate-gifts' },
      { emoji: '⭐', title: 'Unique Corporate Gift Ideas', desc: 'Stand-out picks beyond the usual mugs and pens.', href: '/guides/unique-corporate-gifts' },
    ],
  },
]

export default function GuidesHubClient() {
  return (
    <div className="cp-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://themintbox.in' },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://themintbox.in/guides' },
            ],
          }),
        }}
      />
      <Navbar />

      <section className="cp-hero">
        <div className="cp-hero-pattern" aria-hidden="true" />
        <div className="cp-container--narrow" style={{ position: 'relative', zIndex: 2, padding: '0 24px' }}>
          <nav className="cp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="cp-breadcrumb-sep">›</span>
            <span className="cp-breadcrumb-current">Guides</span>
          </nav>
          <div className="cp-hero-eyebrow">Corporate Gifting Guides</div>
          <h1 className="cp-hero-title">Everything You Need to Get<br />Corporate Gifting Right</h1>
          <div className="cp-hero-rule" />
          <p className="cp-hero-sub">
            22 practical guides covering budgets, festivals, occasions, and gifting strategy - built
            from what actually works for Indian businesses.
          </p>
        </div>
      </section>

      {GROUPS.map(group => (
        <section key={group.heading} className="cp-section cp-section--white">
          <div className="cp-container">
            <div className="cp-section-eyebrow">{group.eyebrow}</div>
            <h2 className="cp-section-title">{group.heading}</h2>
            <div className="cp-cards-grid cp-cards-grid--3">
              {group.guides.map(guide => (
                <a key={guide.href} href={guide.href} className="cp-card">
                  <div className="cp-card-icon">{guide.emoji}</div>
                  <div className="cp-card-title">{guide.title}</div>
                  <p className="cp-card-desc">{guide.desc}</p>
                  <span className="cp-card-tag">Read guide</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="cp-section cp-section--cream">
        <div className="cp-container">
          <div className="cp-section-eyebrow">Explore More</div>
          <h2 className="cp-section-title" style={{ marginBottom: '28px' }}>Related Pages</h2>
          <div className="cp-related-grid">
            {[
              { label: 'Catalogue', title: 'Browse the Full Catalogue', href: '/catalog' },
              { label: 'Collections', title: 'Corporate Gift Collections', href: '/collections/corporate-gifts' },
              { label: 'By Role', title: 'Solutions for HR, Sales & Founders', href: '/solutions' },
              { label: 'By Industry', title: 'Solutions by Industry', href: '/industry-solutions' },
            ].map(link => (
              <a key={link.href} href={link.href} className="cp-related-card">
                <div className="cp-related-card-label">{link.label}</div>
                <div className="cp-related-card-title">{link.title}</div>
                <div className="cp-related-card-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
