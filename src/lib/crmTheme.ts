/**
 * MintBox's own brand tokens (matching src/app/globals.css), reused here so
 * the CRM reads as MintBox's internal tool - not a screen inside Payload's
 * generic admin theme. Duplicated rather than imported from globals.css
 * because that stylesheet is only loaded by the public-site layout, not
 * the (payload) admin route group.
 */
export const CRM_THEME = {
  green: '#0D3D2B',
  greenDeep: '#092A1E',
  gold: '#B8972E',
  goldLight: '#E8C97A',
  cream: '#F5F3EE',
  paper: '#FFFFFF',
  border: '#E2DCCE',
  ink: '#1A1A18',
  inkMuted: '#5F5F59',
  inkFaint: '#8A857A',
  danger: '#B4472A',
  amber: '#C08A2E',
  fontBody: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontDisplay: "'Libre Baskerville', Georgia, serif",
  shadowSm: '0 1px 2px rgba(13,61,43,0.06), 0 1px 3px rgba(13,61,43,0.08)',
  shadowMd: '0 4px 16px rgba(13,61,43,0.12)',
} as const

// Accent colour per queue bucket - a card's left-edge bar, reused from the
// same bucket badge the queue shows, so a card carries the queue's urgency
// signal at a glance (see the PRD: "cards carry queue state").
export const BUCKET_ACCENT: Record<string, string> = {
  waiting_on_you: CRM_THEME.gold,
  deadline_at_risk: CRM_THEME.danger,
  quoted_gone_quiet: CRM_THEME.amber,
  dormant: CRM_THEME.inkFaint,
}

export const STAGE_ACCENT: Record<string, string> = {
  won: CRM_THEME.green,
  lost: CRM_THEME.danger,
}
