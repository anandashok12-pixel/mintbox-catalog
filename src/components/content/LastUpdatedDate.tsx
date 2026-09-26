interface LastUpdatedDateProps {
  date?: string
}

// Month + year for hero eyebrows ("Updated May 2026"), from the same ISO date
// the page passes to <LastUpdatedDate>, so the two can never disagree.
export function formatMonthYear(date: string) {
  return new Date(date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export default function LastUpdatedDate({ date = '2026-05-25' }: LastUpdatedDateProps) {
  // 'YYYY-MM-DD' parses as UTC midnight, so the timezone must be pinned:
  // formatting in the runtime's local zone renders a different day on
  // clients west of UTC than on the (UTC) server — a hydration mismatch.
  const formatted = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
  return (
    <div className="cp-last-updated">
      <time dateTime={date}>Last Updated: {formatted}</time>
    </div>
  )
}
