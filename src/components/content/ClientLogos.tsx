import './social-proof.css'

// Logos are official artwork: Wikimedia Commons (public domain) for most,
// the company's own site for Epsilon and JumpCloud. `h` evens out the
// visual weight of wide wordmarks against square marks.
const CLIENTS = [
  { name: 'Quixta', src: '/clients/quixta.png', h: 46 },
  { name: 'Target', src: '/clients/target.svg', h: 48 },
  { name: 'HP Inc', src: '/clients/hp.svg', h: 36 },
  { name: 'Hitachi', src: '/clients/hitachi.svg', h: 20 },
  { name: 'Daimler', src: '/clients/daimler.svg', h: 18 },
  { name: 'Oracle', src: '/clients/oracle.svg', h: 18 },
  { name: 'Opendoor', src: '/clients/opendoor.svg', h: 26 },
  { name: 'Epsilon', src: '/clients/epsilon.svg', h: 26 },
  { name: 'Cargill', src: '/clients/cargill.svg', h: 34 },
  { name: 'JumpCloud', src: '/clients/jumpcloud.svg', h: 26 },
  { name: 'Federal Bank', src: '/clients/federal-bank.svg', h: 32 },
  { name: 'Skoda', src: '/clients/skoda.svg', h: 20 },
]

export default function ClientLogos({ tone = 'light' }: { tone?: 'light' | 'cream' }) {
  return (
    <section className={`sp-logos sp-logos--${tone}`} aria-labelledby="sp-logos-title">
      <p id="sp-logos-title" className="sp-logos-title">Trusted by teams at</p>
      <div className="sp-marquee">
        {/* The list is rendered twice so the scroll loops seamlessly; the
            copy is hidden from screen readers. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className="sp-marquee-track" aria-hidden={copy === 1 ? true : undefined}>
            {CLIENTS.map((c) => (
              <li key={c.name} className="sp-logo">
                {/* eslint-disable-next-line @next/next/no-img-element -- small SVG logos, nothing to optimise */}
                <img src={c.src} alt={copy === 0 ? c.name : ''} style={{ height: c.h }} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
