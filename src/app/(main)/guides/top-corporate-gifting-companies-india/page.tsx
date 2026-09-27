import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { COMPANIES } from '@/components/festive/pages/companies'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(COMPANIES)
}

export default function Page() {
  return <FestiveRoute config={COMPANIES} />
}
