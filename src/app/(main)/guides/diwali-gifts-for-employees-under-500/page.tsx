import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { UNDER_500 } from '@/components/festive/pages/under500'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(UNDER_500)
}

export default function Page() {
  return <FestiveRoute config={UNDER_500} />
}
