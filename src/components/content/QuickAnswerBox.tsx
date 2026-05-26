interface QuickAnswerBoxProps {
  content: string
  title?: string
}

export default function QuickAnswerBox({ content, title = 'Quick Answer' }: QuickAnswerBoxProps) {
  return (
    <div className="cp-quick-answer">
      <div className="cp-quick-answer-label">{title}</div>
      <p className="cp-quick-answer-text">{content}</p>
    </div>
  )
}
