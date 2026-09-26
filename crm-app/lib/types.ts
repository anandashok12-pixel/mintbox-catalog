export type Stage = 'new' | 'qualified' | 'quoted' | 'negotiation' | 'won' | 'lost'
export type Bucket = 'waiting_on_you' | 'deadline_at_risk' | 'quoted_gone_quiet' | 'open_no_next_action' | 'dormant'

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

export interface LabelItem {
  id?: string | number | null
  label?: string | null
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
  nextAction?: string | null
  nextActionAt?: string | null
  awaitingWhom?: 'us' | 'them' | 'nobody' | null
  quoteSentAt?: string | null
  lastMessageAt?: string | null
  lastInboundMessageAt?: string | null
  lastOutboundMessageAt?: string | null
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
