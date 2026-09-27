import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { DRY_FRUIT_PAGE } from '@/components/festive/pages/dryFruit'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(DRY_FRUIT_PAGE)
}

export default function Page() {
  return <FestiveRoute config={DRY_FRUIT_PAGE} />
}
