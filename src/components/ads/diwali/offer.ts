// The page's offers, in one plain module so both server pages and client
// components can read them.

/** The page form's action: a written quote. Used on every button that leads to the form. */
export const PRIMARY_CTA = 'Get my quote'

/** The nav's lighter offer: the Diwali catalogue, via a short pop-up form. */
export const CATALOGUE_CTA = 'Download catalogue'

/**
 * The Diwali catalogue PDF. While this is null the pop-up says the team will
 * send it on WhatsApp; once set, submitting the pop-up downloads it straight away.
 * Hosted on Google Drive (shared as "anyone with the link"); the uc?export=download
 * form serves it as an attachment, so the visitor stays on the page.
 */
export const CATALOGUE_PDF_URL: string | null =
  'https://drive.google.com/uc?export=download&id=16bB4U9aXXF4XdpbhoEN7HxkufD17k4UH'
