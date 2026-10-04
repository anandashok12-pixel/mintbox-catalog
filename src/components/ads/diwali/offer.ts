// The page's offers, in one plain module so both server pages and client
// components can read them.

/** The page form's action: a written quote. Used on every button that leads to the form. */
export const PRIMARY_CTA = 'Get my quote'

/** The nav's lighter offer: the Diwali catalogue, via a short pop-up form. */
export const CATALOGUE_CTA = 'Download catalogue'

/**
 * The Diwali catalogue PDF. While this is null the pop-up says the team will
 * send it on WhatsApp; once set (e.g. '/diwali-ads/mintbox-diwali-2026.pdf',
 * saved under public/), submitting the pop-up downloads it straight away.
 */
export const CATALOGUE_PDF_URL: string | null = null
