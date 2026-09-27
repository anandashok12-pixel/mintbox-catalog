import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { NEW_YEAR } from '@/components/festive/pages/newYear'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(NEW_YEAR)
}

export default function Page() {
  return <FestiveRoute config={NEW_YEAR} />
}
