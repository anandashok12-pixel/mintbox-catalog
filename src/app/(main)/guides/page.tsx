import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { GoogleReviews } from '@/components/GoogleReviews'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { QUOTE_TIME } from '@/lib/businessFacts'
import { isPublished } from '@/lib/publishGate'
import '../content-pages.css'

// Guides below are embargoed until their scheduled go-live (see each guide's
// own PUBLISH_AT); revalidate hourly so the hub picks up each unlock without
// a redeploy.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Corporate Gifting Guides | Tips, Ideas & Strategies | MintBox',
  description:
    'Browse all MintBox gifting guides — budget breakdowns, occasion planning, sustainable gifting, and strategic advice for Indian businesses. Updated for 2026.',
  alternates: { canonical: 'https://themintbox.in/guides' },
  openGraph: {
    title: 'Corporate Gifting Guides | MintBox',
    description:
      'All-in-one gifting resource: budget guides, occasion playbooks, and strategy articles for corporate gifting in India.',
    url: 'https://themintbox.in/guides',
    siteName: 'MintBox',
    locale: 'en_IN',
    type: 'website',
  },
}

const BUDGET_GUIDES = [
  {
    href: '/guides/corporate-gifts-under-100',
    title: 'Gifts Under ₹100',
    desc: 'High-impact giveaways that punch above their price point — seed packets, pens, and branded minis.',
  },
  {
    href: '/guides/corporate-gifts-under-500',
    title: 'Gifts Under ₹500',
    desc: 'Curated picks for everyday employee gifting and mid-scale campaigns, without compromising quality.',
  },
  {
    href: '/guides/corporate-gifts-under-1000',
    title: 'Gifts Under ₹1,000',
    desc: 'Premium-feel gifts for clients and senior employees — personalised drinkware, stationery sets, and hampers.',
  },
  {
    href: '/guides/budget-corporate-gifts',
    title: 'Budget Corporate Gifts',
    desc: 'Smart buying strategies to get the most from your gifting budget across bulk orders.',
  },
  {
    href: '/guides/corporate-gifting-budget',
    title: 'Gifting Budget Guide',
    desc: 'How to plan and allocate a corporate gifting budget by headcount, tier, and occasion.',
  },
  {
    href: '/guides/luxury-corporate-gifts',
    title: 'Luxury Corporate Gifts',
    desc: 'Premium gifting for VIP clients and leadership — 12 ideas from ₹2,000 to ₹10,000+.',
  },
  {
    href: '/guides/gst-on-corporate-gifts',
    title: 'GST on Corporate Gifts',
    desc: 'The ₹50,000 employee rule, blocked input tax credit, and 10 tax-smart gift ideas explained.',
  },
]

const OCCASION_GUIDES = [
  {
    href: '/guides/diwali-corporate-gifts',
    title: 'Diwali Corporate Gifts',
    desc: "India's biggest gifting moment — curated hampers, sweets, and branded festive packs for teams of any size.",
  },
  {
    href: '/guides/diwali-gifts-for-employees',
    title: 'Diwali Gifts for Employees',
    desc: 'Meaningful Diwali gifting that builds morale and shows every employee they are valued.',
  },
  {
    href: '/guides/christmas-corporate-gifts',
    title: 'Christmas Corporate Gifts',
    desc: 'Year-end gifting done right — premium gift sets, edible treats, and branded merch for clients and teams.',
  },
  {
    href: '/guides/work-anniversary-gifts',
    title: 'Work Anniversary Gifts',
    desc: 'Recognise tenure milestones with personalised gifts that mark the moment and reinforce loyalty.',
  },
  {
    href: '/guides/corporate-gifts-for-new-employees',
    title: 'New Employee Gifts',
    desc: 'First-day onboarding kits that welcome new hires, set the culture tone, and reduce early attrition.',
  },
  {
    href: '/guides/corporate-diwali-gift-hampers',
    title: 'Diwali Gift Hampers',
    desc: 'Top 12 corporate Diwali hampers ranked by budget — from bulk boxes under ₹500 to executive trunks.',
  },
  {
    href: '/guides/diwali-gifts-for-clients',
    title: 'Diwali Gifts for Clients',
    desc: "15 client-worthy Diwali ideas that aren't dry fruits — artisan, premium, and compliance-safe.",
  },
  {
    href: '/guides/secret-santa-gifts-for-colleagues',
    title: 'Secret Santa Gifts',
    desc: '20 office-safe Secret Santa picks under ₹500, plus how to run the exchange at work.',
  },
  {
    href: '/guides/new-year-corporate-gifts',
    title: 'New Year Corporate Gifts',
    desc: 'Start the year right — planners, wellness kits, and 15 fresh ideas for teams and clients.',
  },
  {
    href: '/guides/womens-day-gifts-for-employees',
    title: "Women's Day Gifts",
    desc: 'Thoughtful, non-clichéd Women’s Day gifting for employees — and what to avoid.',
  },
  {
    href: '/guides/farewell-gifts-for-colleagues',
    title: 'Farewell Gifts',
    desc: '25 farewell gift ideas for colleagues across every budget, plus card message examples.',
  },
  {
    href: '/guides/employee-appreciation-gifts',
    title: 'Employee Appreciation Gifts',
    desc: 'Spot, quarterly, and annual recognition gifts HR teams actually use — with a gifting calendar.',
  },
  {
    href: '/guides/office-inauguration-gifts',
    title: 'Office Inauguration Gifts',
    desc: 'What to gift for a new office opening — décor, pooja-day essentials, and attendee gifts.',
  },
  ...[
    {
      publishAt: '2026-09-27T00:00:00+05:30',
      href: '/guides/diwali-gifts-for-employees-by-budget',
      title: 'Diwali Gifts for Employees, by Budget',
      desc: '15 Diwali gift ideas for employees sorted into three budget bands — from festive diyas to premium self-care sets.',
    },
    {
      publishAt: '2026-09-29T00:00:00+05:30',
      href: '/guides/diwali-hampers-for-employees-vs-clients',
      title: 'Diwali Hampers: Employees vs Clients',
      desc: 'Budget corporate Diwali hampers by recipient — employees, regular clients, and VIP or leadership.',
    },
  ].filter((g) => isPublished(g.publishAt)),
]

const STRATEGY_GUIDES = [
  {
    href: '/guides/corporate-gifting-handbook',
    title: 'The Corporate Gifting Handbook',
    desc: 'Complete A–Z guide for Indian businesses — budgeting, customisation, bulk ordering, and occasion planning.',
  },
  {
    href: '/guides/how-to-choose-corporate-gifts',
    title: 'How to Choose Corporate Gifts',
    desc: 'A practical decision framework: matching gift type to recipient, occasion, and budget.',
  },
  {
    href: '/guides/corporate-gifting-etiquette',
    title: 'Corporate Gifting Etiquette in India',
    desc: "Dos and don'ts, cultural considerations, GST compliance, and timing best practices.",
  },
  {
    href: '/guides/what-to-gift-employees',
    title: 'What to Gift Employees',
    desc: 'Research-backed ideas that actually motivate — from recognition gifts to wellness packs.',
  },
  {
    href: '/guides/corporate-gifts-for-clients',
    title: 'Gifts for Clients',
    desc: 'Premium gifting that strengthens relationships, reinforces your brand, and is GST-compliant.',
  },
  {
    href: '/guides/unique-corporate-gifts',
    title: 'Unique Corporate Gifts',
    desc: 'Stand-out ideas beyond the usual mugs and pens — experiential, personalised, and memorable.',
  },
  {
    href: '/guides/sustainable-corporate-gifts',
    title: 'Sustainable Corporate Gifts',
    desc: 'Eco-friendly gifting for ESG-conscious businesses — bamboo, seed paper, organic, and zero-waste options.',
  },
  {
    href: '/guides/corporate-gifting-trends-2026',
    title: 'Corporate Gifting Trends 2026',
    desc: 'What Indian companies are buying this year — wellness, personalisation, and sustainability are leading.',
  },
  {
    href: '/guides/corporate-gift-ideas-2026',
    title: 'Corporate Gift Ideas 2026',
    desc: 'Fresh ideas for every occasion, budget, and recipient type — curated for the current gifting landscape.',
  },
  {
    href: '/guides/corporate-gift-items-list',
    title: 'Corporate Gift Items List',
    desc: 'The master list — 50 gift items across 8 categories with price ranges for every budget.',
  },
  {
    href: '/guides/office-gift-ideas',
    title: 'Office Gift Ideas',
    desc: '20 office gifting ideas organised by occasion — appreciation, festivals, milestones, and team events.',
  },
  {
    href: '/guides/electronic-corporate-gifts',
    title: 'Electronic Corporate Gifts',
    desc: '15 tech gifts employees actually use — earbuds, power banks, and smart desk gear with branding notes.',
  },
  {
    href: '/guides/employee-joining-kit',
    title: 'Employee Joining Kit',
    desc: 'The 15-item joining kit checklist with budget tiers from ₹800 starter to ₹3,000 premium.',
  },
  {
    href: '/guides/corporate-memento-ideas',
    title: 'Memento & Award Ideas',
    desc: '12 memento ideas for annual days, sales awards, and milestones — with engraving copy that works.',
  },
  ...[
    {
      publishAt: '2026-10-02T00:00:00+05:30',
      href: '/guides/corporate-gifts-by-occasion',
      title: 'Corporate Gifts by Occasion',
      desc: 'Match the right corporate gift to onboarding, festivals or client appreciation, with budget tiers and a procurement checklist.',
    },
  ].filter((g) => isPublished(g.publishAt)),
]

const BUYING_GUIDES = [
  {
    href: '/guides/top-corporate-gifting-companies-india',
    title: 'Top Gifting Companies in India',
    desc: 'The 12 leading corporate gifting companies in India, ranked and compared for 2026.',
  },
  {
    href: '/bangalore-corporate-gifting/top-companies',
    title: 'Top Gifting Companies in Bangalore',
    desc: "Bangalore's 10 best corporate gifting companies compared on MOQ, turnaround, and customisation.",
  },
  {
    href: '/bangalore-corporate-gifting/where-to-buy',
    title: 'Where to Buy in Bangalore',
    desc: 'The 12 best places to buy corporate gifts in Bangalore — by area, market, and supplier type.',
  },
  {
    href: '/bangalore-corporate-gifting/gift-hampers',
    title: 'Gift Hampers in Bangalore',
    desc: 'Top 10 corporate hamper styles with price ranges, contents, and Bangalore delivery notes.',
  },
  {
    href: '/bangalore-corporate-gifting/famous-bangalore-gifts',
    title: 'Famous Bangalore Gifts',
    desc: 'Channapatna toys, Mysore Pak, filter coffee — 15 local icons that elevate a corporate hamper.',
  },
]

function GuideCard({
  href,
  title,
  desc,
}: {
  href: string
  title: string
  desc: string
}) {
  return (
    <a href={href} className="hub-card">
      <div>
        <h3 className="hub-card-title">{title}</h3>
        <p className="hub-card-desc">{desc}</p>
      </div>
    </a>
  )
}

export default function GuidesHubPage() {
  return (
    <div className="cp-wrapper">
      <Navbar />
      <main id="main">

      <style>{`
        .hub-hero {
          background: var(--forest-deep, #122E25);
          padding: 130px 40px 72px;
          text-align: center;
        }
        .hub-hero-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold, #B8972E);
          margin-bottom: 20px;
        }
        .hub-hero-title {
          font-family: var(--font-libre-baskerville, serif);
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 700;
          color: var(--cream, #f5f0e6);
          margin: 0 0 20px;
          line-height: 1.15;
        }
        .hub-hero-subtitle {
          font-size: 18px;
          color: rgba(245,240,230,0.75);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .hub-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 40px 100px;
        }
        .hub-section {
          margin-bottom: 64px;
        }
        .hub-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--forest-green, #1A4A3A);
          margin-bottom: 8px;
        }
        .hub-section-title {
          font-family: var(--font-libre-baskerville, serif);
          font-size: 26px;
          font-weight: 700;
          color: var(--near-black, #1A1A18);
          margin: 0 0 8px;
        }
        .hub-section-desc {
          font-size: 15px;
          color: #555;
          margin: 0 0 32px;
          line-height: 1.5;
        }
        .hub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .hub-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #fff;
          border: 1px solid #e8e3d9;
          border-radius: 12px;
          padding: 24px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .hub-card:hover {
          border-color: var(--forest-green, #1A4A3A);
          box-shadow: 0 4px 20px rgba(26,74,58,0.1);
          transform: translateY(-2px);
        }
        .hub-card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--forest-deep, #122E25);
          margin: 0 0 6px;
        }
        .hub-card-desc {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
        .hub-cta-band {
          background: var(--forest-green, #1A4A3A);
          border-radius: 16px;
          padding: 48px 40px;
          text-align: center;
          margin-top: 72px;
        }
        .hub-cta-title {
          font-family: var(--font-libre-baskerville, serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--cream, #f5f0e6);
          margin: 0 0 12px;
        }
        .hub-cta-sub {
          font-size: 16px;
          color: rgba(245,240,230,0.75);
          margin: 0 0 28px;
        }
        .hub-cta-btn {
          display: inline-block;
          background: var(--gold, #B8972E);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .hub-cta-btn:hover { background: #a07d22; }
        @media (max-width: 640px) {
          .hub-hero { padding: 110px 20px 56px; }
          .hub-body { padding: 48px 20px 80px; }
          .hub-grid { grid-template-columns: 1fr; }
          .hub-cta-band { padding: 36px 20px; }
        }
      `}</style>

      <div className="hub-hero">
        <span className="hub-hero-eyebrow">Resource Centre</span>
        <h1 className="hub-hero-title">Corporate Gifting Guides</h1>
        <p className="hub-hero-subtitle">
          Practical advice, curated ideas, and expert strategies for corporate gifting in India —
          covering every budget, occasion, and recipient type.
        </p>
      </div>

      <div className="hub-body">

        <section className="hub-section">
          <p className="hub-section-label">By Budget</p>
          <h2 className="hub-section-title">Budget Guides</h2>
          <p className="hub-section-desc">
            Find the right gifts for every price point — from mass giveaways to premium client
            presentations.
          </p>
          <div className="hub-grid">
            {BUDGET_GUIDES.map((g) => (
              <GuideCard key={g.href} {...g} />
            ))}
          </div>
        </section>

        <section className="hub-section">
          <p className="hub-section-label">By Occasion</p>
          <h2 className="hub-section-title">Occasion & Seasonal Guides</h2>
          <p className="hub-section-desc">
            Diwali, Christmas, onboarding, anniversaries — a dedicated playbook for every gifting
            moment in the Indian corporate calendar.
          </p>
          <div className="hub-grid">
            {OCCASION_GUIDES.map((g) => (
              <GuideCard key={g.href} {...g} />
            ))}
          </div>
        </section>

        <section className="hub-section">
          <p className="hub-section-label">Strategy & Ideas</p>
          <h2 className="hub-section-title">Gifting Strategy</h2>
          <p className="hub-section-desc">
            Etiquette, decision frameworks, trends, and creative ideas to elevate your corporate
            gifting programme from transactional to memorable.
          </p>
          <div className="hub-grid">
            {STRATEGY_GUIDES.map((g) => (
              <GuideCard key={g.href} {...g} />
            ))}
          </div>
        </section>

        <section className="hub-section">
          <p className="hub-section-label">Vendors & Sourcing</p>
          <h2 className="hub-section-title">Buying Guides</h2>
          <p className="hub-section-desc">
            Who to buy from and where — ranked company comparisons and local Bangalore sourcing
            guides.
          </p>
          <div className="hub-grid">
            {BUYING_GUIDES.map((g) => (
              <GuideCard key={g.href} {...g} />
            ))}
          </div>
        </section>

        <div className="hub-cta-band">
          <h2 className="hub-cta-title">Ready to place a bulk order?</h2>
          <p className="hub-cta-sub">
            Share your requirements and receive a detailed quote within {QUOTE_TIME}.
          </p>
          <a href="/contact" className="hub-cta-btn">Get a Free Quote →</a>
        </div>

      </div>

      <GoogleReviews theme="light" />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
