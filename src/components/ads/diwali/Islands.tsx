'use client'

import { useEffect, useState } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { PRIMARY_CTA } from './offer'
import { track, useQuote, whatsappHref } from './quoteStore'

/** WhatsApp link whose pre-filled message carries what step 1 already knows. */
export function WhatsAppLink({ className, label = 'WhatsApp' }: { className?: string; label?: string }) {
  const { qty, budget, hampers } = useQuote()
  return (
    <a
      className={className}
      href={whatsappHref({ qty, budget, hampers })}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click', { location: className })}
    >
      <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
      <span>{label}</span>
    </a>
  )
}

/** Round WhatsApp button, bottom right on desktop, as on the main site. */
export function WhatsAppFloat() {
  const { qty, budget, hampers } = useQuote()
  return (
    <a
      className="dl-wa-float"
      href={whatsappHref({ qty, budget, hampers })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MintBox on WhatsApp"
      onClick={() => track('whatsapp_click', { location: 'float' })}
    >
      <WhatsappLogo size={28} weight="fill" aria-hidden="true" />
    </a>
  )
}

/** Mobile-only bottom bar, shown once the hero form has scrolled away. */
export function MobileBar() {
  const [show, setShow] = useState(false)
  const count = useQuote(st => st.hampers.length)
  useEffect(() => {
    const hero = document.getElementById('quote')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return (
    <div className={`dl-mobilebar${show ? ' is-on' : ''}`} aria-hidden={!show}>
      <a href="#quote" className="dl-btn dl-btn--primary" tabIndex={show ? 0 : -1}>
        {PRIMARY_CTA}
        {count > 0 && (
          <span className="dl-mobilebar-count" aria-label={`${count} ${count === 1 ? 'hamper' : 'hampers'} in your quote`}>
            {count}
          </span>
        )}
      </a>
      <WhatsAppLink className="dl-btn dl-btn--wa" />
    </div>
  )
}

/**
 * Adds `is-in` to every `.dl-reveal` element as it enters the viewport.
 * The CSS only hides them when motion is allowed and JS has run, so content
 * is never stuck invisible.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.dl-reveal')
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('dl-motion')
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    els.forEach(el => io.observe(el))
    return () => {
      io.disconnect()
      document.documentElement.classList.remove('dl-motion')
    }
  }, [])
  return null
}
