import { JournalPage } from '@/components/JournalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal — MintBox',
  description:
    'Gifting guides, occasion edits, case studies, and behind-the-scenes from the MintBox team.',
}

export default function JournalRoute() {
  return <JournalPage />
}
