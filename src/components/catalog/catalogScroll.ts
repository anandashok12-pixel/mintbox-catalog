'use client'

// Sticky navbar height; section headers land just below it.
export const NAVBAR_OFFSET = 96

export const categorySectionId = (catName: string) => `cat-${catName}`

// While a programmatic jump is in flight, incremental "load more" sentinels
// that the smooth scroll flies past must not expand their section: doing so
// pushes the target down mid-scroll and the jump lands on the wrong category.
let jumpingUntil = 0

export function isJumping(): boolean {
  return Date.now() < jumpingUntil
}

export function scrollToCategory(catName?: string) {
  const top = (() => {
    if (!catName) return 0
    const el = document.getElementById(categorySectionId(catName))
    if (!el) return null
    return el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  })()
  if (top === null) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  jumpingUntil = Date.now() + (reduceMotion ? 150 : 1500)
  const release = () => {
    jumpingUntil = 0
  }
  window.addEventListener('scrollend', release, { once: true })
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
}
