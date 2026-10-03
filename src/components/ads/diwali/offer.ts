// The page's offer, in one plain module so both server pages and client
// components can read it.

/** One label for the page's main action, used on every button that leads to the form. */
export const PRIMARY_CTA = 'Get the catalogue'

/**
 * The Diwali catalogue PDF. While this is null the thank-you page says the
 * team will send it; once set (e.g. '/diwali-ads/mintbox-diwali-2026.pdf',
 * saved under public/), the thank-you page offers an instant download.
 */
export const CATALOGUE_PDF_URL: string | null = null
