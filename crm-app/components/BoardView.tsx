'use client'

import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { BUCKET_ACCENT, LOST_REASONS, STAGES } from '@/lib/constants'
import { scoreDeal } from '@/lib/scoring'
import type { Deal, Stage } from '@/lib/types'

interface BoardProps {
  deals: Deal[]
  onOpen: (deal: Deal) => void
  onMove: (deal: Deal, stage: Stage, lostReason?: string) => Promise<void>
}

function contactFor(deal: Deal) {
  return typeof deal.contact === 'object' ? deal.contact : null
}

function money(value?: number | null) {
  return value == null ? 'Value unknown' : `₹${Math.round(value).toLocaleString('en-IN')}`
}

function DealCard({ deal, overlay = false, reasonOpen, onOpen, onReason }: { deal: Deal; overlay?: boolean; reasonOpen?: boolean; onOpen?: () => void; onReason?: (reason: string) => void }) {
  const score = scoreDeal(deal)
  const contact = contactFor(deal)
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(deal.id),
    disabled: overlay,
    data: { stage: deal.stage },
  })
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined

  return (
    <div ref={setNodeRef} className={`board-card ${overlay ? 'board-card-overlay' : ''} ${isDragging ? 'board-card-dragging' : ''}`} style={{ ...style, '--accent': score ? BUCKET_ACCENT[score.bucket] : '#D8D2C5' } as React.CSSProperties} {...listeners} {...attributes}>
      <button className="board-card-body" onClick={onOpen}>
        <span className="drag-grip" aria-hidden="true"><i /><i /><i /><i /></span>
        <strong>{contact?.company || contact?.name || deal.title}</strong>
        {contact?.company && <small>{contact.name}</small>}
        <div className="board-card-meta"><span>{money(deal.estimatedValue)}</span>{score && score.bucket !== 'open_no_next_action' && <em>{score.bucket.replaceAll('_', ' ')}</em>}</div>
        {deal.nextAction && <p>{deal.nextAction}</p>}
        {deal.suggestedStage && deal.suggestedStage !== deal.stage && <div className="stage-suggestion">Suggests {deal.suggestedStage}</div>}
      </button>
      {reasonOpen && (
        <div className="reason-picker" onPointerDown={(event) => event.stopPropagation()}>
          <span>Why was it lost?</span>
          <div>{LOST_REASONS.map((reason) => <button key={reason.value} onClick={() => onReason?.(reason.value)}>{reason.label}</button>)}</div>
        </div>
      )}
      {deal.stage === 'lost' && deal.lostReason && <div className="lost-reason">Lost · {LOST_REASONS.find((reason) => reason.value === deal.lostReason)?.label || deal.lostReason}</div>}
    </div>
  )
}

function Column({ stage, deals, pendingReason, onOpen, onReason }: { stage: typeof STAGES[number]; deals: Deal[]; pendingReason: string | number | null; onOpen: (deal: Deal) => void; onReason: (deal: Deal, reason: string) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.value })
  const total = deals.reduce((sum, deal) => sum + (deal.estimatedValue || 0), 0)

  return (
    <section ref={setNodeRef} className={`board-column stage-${stage.value} ${isOver ? 'board-column-over' : ''}`}>
      <header className="board-column-header">
        <span>{stage.number}</span>
        <div><h2>{stage.label}</h2><p>{deals.length} deal{deals.length === 1 ? '' : 's'} · {money(total)}</p></div>
      </header>
      <div className="board-column-cards">
        {deals.map((deal) => <DealCard key={deal.id} deal={deal} reasonOpen={pendingReason === deal.id} onOpen={() => onOpen(deal)} onReason={(reason) => onReason(deal, reason)} />)}
        {deals.length === 0 && <div className="empty-column">Drop a deal here</div>}
      </div>
    </section>
  )
}

export function BoardView({ deals, onOpen, onMove }: BoardProps) {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null)
  const [pendingReason, setPendingReason] = useState<string | number | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 7 } }))
  const byStage = useMemo(() => new Map(STAGES.map((stage) => [stage.value, deals.filter((deal) => deal.stage === stage.value)])), [deals])
  const openValue = deals.filter((deal) => deal.stage !== 'won' && deal.stage !== 'lost').reduce((sum, deal) => sum + (deal.estimatedValue || 0), 0)

  function dragStart(event: DragStartEvent) {
    setActiveDeal(deals.find((deal) => String(deal.id) === String(event.active.id)) || null)
  }

  async function dragEnd(event: DragEndEvent) {
    setActiveDeal(null)
    if (!event.over) return
    const deal = deals.find((item) => String(item.id) === String(event.active.id))
    const stage = String(event.over.id) as Stage
    if (!deal || deal.stage === stage) return
    if (stage === 'lost') setPendingReason(deal.id)
    else setPendingReason(null)
    await onMove(deal, stage)
  }

  async function setLostReason(deal: Deal, reason: string) {
    await onMove(deal, 'lost', reason)
    setPendingReason(null)
  }

  return (
    <div className="view board-view">
      <header className="view-heading board-heading">
        <div><span className="eyebrow">Every live opportunity</span><h1>Pipeline</h1><p>Move the work with your hand. Every drag is a human decision.</p></div>
        <div className="board-total"><span>Open potential</span><strong>{money(openValue)}</strong></div>
      </header>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={dragStart} onDragEnd={dragEnd}>
        <div className="board-scroll">
          {STAGES.map((stage) => <Column key={stage.value} stage={stage} deals={byStage.get(stage.value) || []} pendingReason={pendingReason} onOpen={onOpen} onReason={setLostReason} />)}
        </div>
        <DragOverlay>{activeDeal ? <DealCard deal={activeDeal} overlay /> : null}</DragOverlay>
      </DndContext>
    </div>
  )
}
