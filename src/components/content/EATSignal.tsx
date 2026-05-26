const DEFAULT_CREDENTIALS = [
  '200+ corporate clients across India',
  'Delivered 50,000+ gifts since 2019',
  'Bangalore-based with Pan-India logistics',
  'GST-compliant invoicing, transparent pricing',
  'Dedicated account manager for every bulk order',
]

interface EATSignalProps {
  credentials?: string[]
}

export default function EATSignal({ credentials = DEFAULT_CREDENTIALS }: EATSignalProps) {
  return (
    <div className="cp-eat-signal">
      <div className="cp-eat-signal-label">Why Trust MintBox</div>
      <ul className="cp-eat-signal-list">
        {credentials.map((c, i) => (
          <li key={i}>
            <span className="cp-eat-check" aria-hidden="true">✓</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}
