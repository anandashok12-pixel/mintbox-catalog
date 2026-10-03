import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { ELECTRONIC } from '@/components/festive/pages/electronic'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(ELECTRONIC)
}

export default function Page() {
  return <FestiveRoute config={ELECTRONIC} />
}
