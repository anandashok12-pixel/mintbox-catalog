import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { UNDER_1000 } from '@/components/festive/pages/under1000'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(UNDER_1000)
}

export default function Page() {
  return <FestiveRoute config={UNDER_1000} />
}
