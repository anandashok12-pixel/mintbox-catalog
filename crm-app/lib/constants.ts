import type { Stage } from './types'

export const STAGES: { value: Stage; label: string; number: string }[] = [
  { value: 'new', label: 'New', number: '01' },
  { value: 'qualified', label: 'Qualified', number: '02' },
  { value: 'sample', label: 'Sample', number: '03' },
  { value: 'quoted', label: 'Quoted', number: '04' },
  { value: 'negotiation', label: 'Negotiation', number: '05' },
  { value: 'won', label: 'Won', number: '06' },
  { value: 'lost', label: 'Lost', number: '07' },
]

export const LOST_REASONS = [
  { label: 'Price', value: 'price' },
  { label: 'Timing', value: 'timing' },
  { label: 'Another supplier', value: 'competitor' },
  { label: 'Went silent', value: 'silent' },
  { label: 'Not a fit', value: 'not_a_fit' },
]

export const OCCASIONS = [
  { label: 'Employee Welcome Kit', value: 'welcome_kit' },
  { label: 'Diwali Gifting', value: 'diwali' },
  { label: 'Holi Gifting', value: 'holi' },
  { label: 'Corporate Event', value: 'corporate_event' },
  { label: 'Client Gifting', value: 'client_gifting' },
  { label: 'Festival Season', value: 'festival' },
  { label: 'Year-End Gifting', value: 'year_end' },
  { label: 'Other', value: 'other' },
]

export const LEAD_SOURCES = [
  { label: 'Referral', value: 'referral' },
  { label: 'Organic', value: 'organic' },
  { label: 'Inorganic', value: 'inorganic' },
]

export const CONTACT_CHANNELS = [
  { label: 'Contact form', value: 'contact_form' },
  { label: 'Phone call', value: 'call' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Email', value: 'email' },
  { label: 'Walk-in', value: 'walk_in' },
  { label: 'Referral', value: 'referral' },
  { label: 'Other', value: 'other' },
]

export const BUCKET_ACCENT: Record<string, string> = {
  waiting_on_you: '#B8972E',
  deadline_at_risk: '#B45232',
  quoted_gone_quiet: '#C47A2C',
  open_no_next_action: '#6B8778',
  dormant: '#8B877D',
}
