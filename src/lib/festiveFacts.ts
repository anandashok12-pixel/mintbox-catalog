// Single source of truth for the business facts used on the festive guide
// pages. Every page reads from here so a date or policy change is made once
// and can never drift between pages (the Diwali guide and hub disagreed on
// the Diwali date, deadline and MOQ before this existed).
//
// Plain module (no 'use client') so both server and client components get the
// real values.

export const SITE_URL = 'https://themintbox.in'

export const FACTS = {
  diwaliDate: 'Sunday, 8 November 2026',
  diwaliDateShort: 'Sun 8 Nov',
  orderBy: 'Saturday, 24 October 2026',
  orderByShort: '24 Oct',
  dispatch: '7–10 working days after confirmation',
  moq: 10,
  quoteTime: '4 working hours',
  city: 'Bengaluru',
  whatsapp: 'https://wa.me/919886537631',
} as const

// Category slugs that make up the "Diwali Gifting" group in the catalogue.
// Same list the /diwali-corporate-gifts hub uses.
export const DIWALI_CATEGORY_SLUGS = ['diwali-gift-boxes', 'diwali-2026-products']

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`
