import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { BANGALORE_HAMPERS } from '@/components/festive/pages/bangaloreHampers'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(BANGALORE_HAMPERS)
}

export default function Page() {
  return <FestiveRoute config={BANGALORE_HAMPERS} />
}
