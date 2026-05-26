interface LastUpdatedDateProps {
  date?: string
}

export default function LastUpdatedDate({ date = '2026-05-25' }: LastUpdatedDateProps) {
  const formatted = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <div className="cp-last-updated">
      <time dateTime={date}>Last Updated: {formatted}</time>
    </div>
  )
}
