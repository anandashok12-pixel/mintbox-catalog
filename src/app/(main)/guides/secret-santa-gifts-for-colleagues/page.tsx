import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { SECRET_SANTA } from '@/components/festive/pages/secretSanta'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(SECRET_SANTA)
}

export default function Page() {
  return <FestiveRoute config={SECRET_SANTA} />
}
