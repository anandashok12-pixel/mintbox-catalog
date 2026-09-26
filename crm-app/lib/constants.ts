import type { Stage } from './types'

export const STAGES: { value: Stage; label: string; number: string }[] = [
  { value: 'new', label: 'New', number: '01' },
  { value: 'qualified', label: 'Qualified', number: '02' },
  { value: 'quoted', label: 'Quoted', number: '03' },
  { value: 'negotiation', label: 'Negotiation', number: '04' },
  { value: 'won', label: 'Won', number: '05' },
  { value: 'lost', label: 'Lost', number: '06' },
]

export const LOST_REASONS = [
  { label: 'Price', value: 'price' },
  { label: 'Timing', value: 'timing' },
  { label: 'Another supplier', value: 'competitor' },
  { label: 'Went silent', value: 'silent' },
  { label: 'Not a fit', value: 'not_a_fit' },
]

export const BUCKET_ACCENT: Record<string, string> = {
  waiting_on_you: '#B8972E',
  deadline_at_risk: '#B45232',
  quoted_gone_quiet: '#C47A2C',
  open_no_next_action: '#6B8778',
  dormant: '#8B877D',
}
