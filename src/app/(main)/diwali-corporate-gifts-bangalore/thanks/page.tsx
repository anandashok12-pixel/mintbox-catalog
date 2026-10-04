import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle } from '@phosphor-icons/react/dist/ssr'
import PaperworkForm from '@/components/ads/diwali/PaperworkForm'
import { WhatsAppLink } from '@/components/ads/diwali/Islands'
import '../diwali-ads.css'

export const metadata: Metadata = {
  title: 'Request received | MintBox',
  robots: { index: false, follow: false },
}

export default async function DiwaliAdsThanks({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const ref = typeof sp.ref === 'string' ? sp.ref.slice(0, 20) : null

  return (
    <div className="dl">
      <header className="dl-nav-wrap">
        <nav className="dl-nav" aria-label="MintBox">
          <a href="/diwali-corporate-gifts-bangalore" aria-label="Back to MintBox Diwali gifts">
            <Image src="/mintbox-logo-white.webp" alt="MintBox" width={118} height={32} className="dl-logo" loading="eager" />
          </a>
          <WhatsAppLink className="dl-btn dl-btn--light dl-btn--sm" />
        </nav>
      </header>

      <main className="dl-section dl-thanks">
        <div className="dl-wrap dl-paper">
          <div>
            <CheckCircle size={40} weight="fill" color="#b8972e" aria-hidden="true" />
            <h1 className="dl-h1" style={{ marginTop: 16 }}>
              Got it. <em>Your quote is on its way.</em>
            </h1>
            <p className="dl-lede">
              We reply within 1 hour on business days, on WhatsApp and email, and send your written quote within 24
              hours.
              {ref ? (
                <>
                  {' '}Your reference is <strong>{ref}</strong>.
                </>
              ) : null}
            </p>
            <div className="dl-final-ctas" style={{ justifyContent: 'flex-start' }}>
              <WhatsAppLink className="dl-btn dl-btn--wa" label="Chat with us now" />
            </div>
          </div>
          <div>
            <h2 className="dl-h2" style={{ fontSize: '1.375rem', marginBottom: 16 }}>
              Need to get it approved?
            </h2>
            <PaperworkForm />
          </div>
        </div>
      </main>
    </div>
  )
}
