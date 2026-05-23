import { Libre_Baskerville } from 'next/font/google'

// Self-hosted via next/font - no runtime Google round-trip, no FOIT, no CLS.
// Exposed as a CSS variable so existing `font-family: 'Libre Baskerville'`
// rules continue to work alongside `--font-libre-baskerville`.
export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-libre-baskerville',
})
