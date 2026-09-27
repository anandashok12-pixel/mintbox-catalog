import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { UNDER_2000 } from '@/components/festive/pages/under2000'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(UNDER_2000)
}

export default function Page() {
  return <FestiveRoute config={UNDER_2000} />
}
