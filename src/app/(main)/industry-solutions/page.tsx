import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { GoogleReviews } from '@/components/GoogleReviews'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import '../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting by Industry | Sector Solutions | MintBox',
  description:
    'Industry-specific corporate gifting solutions from MintBox — tailored gifting programmes for startups, tech companies, and growing Indian businesses.',
  alternates: { canonical: 'https://themintbox.in/industry-solutions' },
  openGraph: {
    title: 'Corporate Gifting by Industry | MintBox',
    description:
      'Tailored corporate gifting for startups, tech companies, and Indian enterprises. MOQ from 10 units, pan-India delivery.',
    url: 'https://themintbox.in/industry-solutions',
    siteName: 'MintBox',
    locale: 'en_IN',
    type: 'website',
  },
}

const INDUSTRIES = [
  {
    href: '/industry-solutions/startups',
    tag: 'Startups',
    title: 'Corporate Gifts for Startups',
    desc: 'Budget-conscious, brand-forward gifting for fast-moving teams — onboarding kits, team swag, investor gifts, and milestone packs. Low MOQ, fast turnaround.',
    highlights: ['MOQ from 10 units', 'Brand-consistent packaging', 'Fast lead times', 'GST invoicing'],
  },
  {
    href: '/industry-solutions/tech-companies',
    tag: 'Tech Companies',
    title: 'Corporate Gifts for Tech Companies',
    desc: 'Premium gifting for tech teams that have seen it all — meaningful, useful, and on-brand. Employee appreciation, hackathon prizes, client gifting, and global team packs.',
    highlights: ['Global shipping available', 'Premium drinkware & tech accessories', 'Custom branded boxes', 'Bulk pricing'],
  },
]

const STATS = [
  { value: '10+', label: 'Units minimum order' },
  { value: '24hrs', label: 'Quote turnaround' },
  { value: '200+', label: 'Products in catalogue' },
  { value: 'Pan-India', label: 'Delivery coverage' },
]

export default function IndustrySolutionsPage() {
  return (
    <div className="cp-wrapper">
      <Navbar />
      <main id="main">

      <style>{`
        .ind-hero {
          background: var(--forest-deep, #122E25);
          padding: 130px 40px 72px;
          text-align: center;
        }
        .ind-hero-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold, #B8972E);
          margin-bottom: 20px;
        }
        .ind-hero-title {
          font-family: var(--font-libre-baskerville, serif);
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 700;
          color: var(--cream, #f5f0e6);
          margin: 0 0 20px;
          line-height: 1.15;
        }
        .ind-hero-subtitle {
          font-size: 18px;
          color: rgba(245,240,230,0.75);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .ind-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
          margin-top: 48px;
          padding-top: 40px;
          border-top: 1px solid rgba(245,240,230,0.12);
        }
        .ind-stat-value {
          font-family: var(--font-libre-baskerville, serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--gold, #B8972E);
          display: block;
        }
        .ind-stat-label {
          font-size: 13px;
          color: rgba(245,240,230,0.6);
          margin-top: 4px;
          display: block;
        }
        .ind-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px 100px;
        }
        .ind-intro {
          text-align: center;
          margin-bottom: 64px;
        }
        .ind-intro-title {
          font-family: var(--font-libre-baskerville, serif);
          font-size: 30px;
          font-weight: 700;
          color: var(--near-black, #1A1A18);
          margin: 0 0 16px;
        }
        .ind-intro-text {
          font-size: 16px;
          color: #555;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .ind-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
          gap: 28px;
          margin-bottom: 80px;
        }
        .ind-card {
          background: #fff;
          border: 1px solid #e8e3d9;
          border-radius: 16px;
          padding: 40px;
          text-decoration: none;
          color: inherit;
          display: block;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .ind-card:hover {
          border-color: var(--forest-green, #1A4A3A);
          box-shadow: 0 6px 28px rgba(26,74,58,0.12);
          transform: translateY(-3px);
        }
        .ind-card-top {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .ind-card-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--forest-green, #1A4A3A);
          background: rgba(26,74,58,0.08);
          padding: 4px 10px;
          border-radius: 4px;
        }
        .ind-card-title {
          font-family: var(--font-libre-baskerville, serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--forest-deep, #122E25);
          margin: 0 0 12px;
        }
        .ind-card-desc {
          font-size: 15px;
          color: #555;
          line-height: 1.6;
          margin: 0 0 24px;
        }
        .ind-card-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .ind-card-pill {
          font-size: 12px;
          font-weight: 500;
          color: var(--forest-green, #1A4A3A);
          border: 1px solid rgba(26,74,58,0.25);
          border-radius: 100px;
          padding: 4px 12px;
        }
        .ind-card-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 700;
          color: var(--forest-green, #1A4A3A);
        }
        .ind-bottom-section {
          background: #f7f4ee;
          border-radius: 16px;
          padding: 56px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .ind-bottom-title {
          font-family: var(--font-libre-baskerville, serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--forest-deep, #122E25);
          margin: 0 0 16px;
        }
        .ind-bottom-text {
          font-size: 15px;
          color: #555;
          line-height: 1.65;
          margin: 0 0 28px;
        }
        .ind-bottom-btn {
          display: inline-block;
          background: var(--forest-green, #1A4A3A);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .ind-bottom-btn:hover { background: #122E25; }
        .ind-other-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ind-other-links li a {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 500;
          color: var(--forest-deep, #122E25);
          text-decoration: none;
          padding: 14px 18px;
          background: #fff;
          border: 1px solid #e8e3d9;
          border-radius: 10px;
          transition: border-color 0.2s, background 0.2s;
        }
        .ind-other-links li a:hover {
          border-color: var(--forest-green, #1A4A3A);
          background: rgba(26,74,58,0.03);
        }
        @media (max-width: 768px) {
          .ind-hero { padding: 110px 20px 56px; }
          .ind-body { padding: 56px 20px 80px; }
          .ind-cards { grid-template-columns: 1fr; }
          .ind-bottom-section { grid-template-columns: 1fr; padding: 36px 24px; gap: 28px; }
          .ind-stats { gap: 28px; }
          .ind-card { padding: 28px; }
        }
      `}</style>

      <div className="ind-hero">
        <span className="ind-hero-eyebrow">Industry Solutions</span>
        <h1 className="ind-hero-title">Gifting Built for Your Industry</h1>
        <p className="ind-hero-subtitle">
          Every industry has different gifting needs. MintBox tailors gifting programmes to match
          your culture, budget, and brand — from seed-stage startups to enterprise tech teams.
        </p>
        <div className="ind-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <span className="ind-stat-value">{s.value}</span>
              <span className="ind-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ind-body">

        <div className="ind-intro">
          <h2 className="ind-intro-title">Solutions by Sector</h2>
          <p className="ind-intro-text">
            Browse our industry-specific gifting guides. Each covers the right product categories,
            MOQ tiers, customisation options, and gifting occasions most relevant to your sector.
          </p>
        </div>

        <div className="ind-cards">
          {INDUSTRIES.map((ind) => (
            <a key={ind.href} href={ind.href} className="ind-card">
              <div className="ind-card-top">
                <span className="ind-card-tag">{ind.tag}</span>
              </div>
              <h2 className="ind-card-title">{ind.title}</h2>
              <p className="ind-card-desc">{ind.desc}</p>
              <div className="ind-card-highlights">
                {ind.highlights.map((h) => (
                  <span key={h} className="ind-card-pill">{h}</span>
                ))}
              </div>
              <span className="ind-card-link">Explore guide →</span>
            </a>
          ))}
        </div>

        <div className="ind-bottom-section">
          <div>
            <h2 className="ind-bottom-title">Don't see your industry?</h2>
            <p className="ind-bottom-text">
              MintBox works with companies across BFSI, healthcare, FMCG, consulting, and more.
              Share your requirements and we'll put together a tailored gifting programme — with
              pricing, product recommendations, and lead times.
            </p>
            <a href="/contact" className="ind-bottom-btn">Talk to Us →</a>
          </div>
          <div>
            <ul className="ind-other-links">
              <li><a href="/solutions">All Corporate Gifting Solutions</a></li>
              <li><a href="/guides/corporate-gifting-handbook">The Gifting Handbook</a></li>
              <li><a href="/collections/employee-welcome-kit">Employee Welcome Kits</a></li>
              <li><a href="/collections/corporate-gifts">Browse All Products</a></li>
              <li><a href="/contact">Request a Custom Quote</a></li>
            </ul>
          </div>
        </div>

      </div>

      <GoogleReviews theme="light" />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
