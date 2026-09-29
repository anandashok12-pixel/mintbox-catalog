export type Stage = 'new' | 'qualified' | 'sample' | 'quoted' | 'negotiation' | 'won' | 'lost'
export type Bucket = 'waiting_on_you' | 'deadline_at_risk' | 'quoted_gone_quiet' | 'open_no_next_action' | 'dormant'
export type LeadSource = 'referral' | 'organic' | 'inorganic'
export type ContactChannel = 'contact_form' | 'call' | 'whatsapp' | 'email' | 'walk_in' | 'referral' | 'other'

export interface User {
  id: string | number
  email: string
  name?: string | null
}

export interface Contact {
  id: string | number
  name: string
  company?: string | null
  phoneE164?: string | null
  email?: string | null
}

export interface PayloadMedia {
  id: string | number
  url?: string | null
  filename?: string | null
  alt?: string | null
}

export interface WhatsappSession {
  status: 'never_connected' | 'needs_qr' | 'connecting' | 'connected' | 'disconnected' | 'logged_out'
  qrMedia?: PayloadMedia | string | number | null
  qrGeneratedAt?: string | null
  lastHeartbeatAt?: string | null
  lastConnectionEventAt?: string | null
  lastError?: string | null
  updatedAt?: string | null
}

export interface Message {
  id: string | number
  contact: Contact | string | number
  deal?: Deal | string | number | null
  channel: 'whatsapp' | 'email' | 'form'
  direction: 'inbound' | 'outbound'
  body?: string | null
  preview?: string | null
  media?: (PayloadMedia | string | number)[] | null
  providerId?: string | null
  sentAt: string
  createdAt: string
  updatedAt: string
}

export interface LabelItem {
  id?: string | number | null
  label?: string | null
}

export interface DealTask {
  id?: string | number | null
  label: string
  done?: boolean | null
  dueDate?: string | null
  doneAt?: string | null
}

export interface Deal {
  id: string | number
  title: string
  contact: Contact | string | number
  stage: Stage
  suggestedStage?: Stage | null
  stageSetManually?: boolean | null
  lostReason?: string | null
  occasion?: string | null
  quantity?: number | null
  unitBudgetMin?: number | null
  unitBudgetMax?: number | null
  estimatedValue?: number | null
  deadlineDate?: string | null
  productInterest?: LabelItem[] | null
  blockers?: LabelItem[] | null
  summary?: string | null
  remarks?: string | null
  nightlySummary?: string | null
  nightlySummaryAt?: string | null
  tasks?: DealTask[] | null
  nextAction?: string | null
  nextActionAt?: string | null
  awaitingWhom?: 'us' | 'them' | 'nobody' | null
  quoteSentAt?: string | null
  wonValue?: number | null
  source?: string | null
  leadSource?: LeadSource | null
  contactChannel?: ContactChannel | null
  attribution?: string | null
  lastMessageAt?: string | null
  lastInboundMessageAt?: string | null
  lastOutboundMessageAt?: string | null
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string | number
  label: string
  done?: boolean | null
  dueDate?: string | null
  doneAt?: string | null
  createdAt: string
  updatedAt: string
}

export interface ScoredDeal extends Deal {
  bucket: Bucket
  sortValue: number
}

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  hasNextPage: boolean
  nextPage?: number | null
}
