'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
import type { BoardColumn, BoardCard } from '@/lib/board'
import type { DEAL_STAGES, LOST_REASONS } from '@/collections/Deals'

interface Props {
  initialColumns: BoardColumn[]
  lostReasons: typeof LOST_REASONS
}

type StageOption = (typeof DEAL_STAGES)[number]

async function patchStage(id: string | number, stage: string, lostReason?: string) {
  await fetch(`/api/deals/${id}/stage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage, lostReason }),
  })
}

export function BoardClient({ initialColumns, lostReasons }: Props) {
  const router = useRouter()
  const [columns, setColumns] = useState(initialColumns)

  // router.refresh() re-renders BoardView server-side and passes a fresh
  // initialColumns prop, but useState's initial value is only read on
  // mount - without this, a value written by one action (e.g. the lost
  // reason, set a moment after the optimistic move) never appears until a
  // full page reload, even though it's already correctly saved.
  useEffect(() => {
    setColumns(initialColumns)
  }, [initialColumns])
  const [activeCard, setActiveCard] = useState<BoardCard | null>(null)
  // A card sitting in Lost with no reason yet shows a small inline picker
  // right there rather than a blocking modal - see the PRD's "Lost requires
  // a reason" rule.
  const [pendingReasonFor, setPendingReasonFor] = useState<string | number | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const moveCard = (cardId: string | number, fromStage: string, toStage: string) => {
    if (fromStage === toStage) return
    setColumns((prev) =>
      prev.map((col) => {
        if (col.stage === fromStage) {
          const card = col.cards.find((c) => c.id === cardId)
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId), totalValue: col.totalValue - (card?.estimatedValue || 0) }
        }
        if (col.stage === toStage) {
          const card = prev.find((c) => c.stage === fromStage)?.cards.find((c) => c.id === cardId)
          if (!card) return col
          return { ...col, cards: [{ ...card, stage: toStage }, ...col.cards], totalValue: col.totalValue + (card.estimatedValue || 0) }
        }
        return col
      }),
    )

    if (toStage === 'lost') {
      setPendingReasonFor(cardId)
      // Stage is set immediately (the card really is in Lost); the reason
      // follows as soon as it's picked.
      patchStage(cardId, toStage)
    } else {
      patchStage(cardId, toStage).then(() => router.refresh())
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const card = columns.flatMap((c) => c.cards).find((c) => String(c.id) === event.active.id)
    setActiveCard(card || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null)
    const { active, over } = event
    if (!over) return
    const fromStage = String(active.data.current?.stage)
    const toStage = String(over.id)
    moveCard(active.id, fromStage, toStage)
  }

  const submitLostReason = (cardId: string | number, reason: string) => {
    patchStage(cardId, 'lost', reason).then(() => {
      setPendingReasonFor(null)
      router.refresh()
    })
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        {columns.map((column) => (
          <Column
            key={column.stage}
            column={column}
            allStages={initialColumns.map((c) => ({ label: c.label, value: c.stage }))}
            lostReasons={lostReasons}
            pendingReasonFor={pendingReasonFor}
            onDropdownChange={(cardId, newStage) => moveCard(cardId, column.stage, newStage)}
            onSubmitLostReason={submitLostReason}
          />
        ))}
      </div>
      <DragOverlay>{activeCard ? <CardBody card={activeCard} /> : null}</DragOverlay>
    </DndContext>
  )
}

function Column({
  column,
  allStages,
  lostReasons,
  pendingReasonFor,
  onDropdownChange,
  onSubmitLostReason,
}: {
  column: BoardColumn
  allStages: { label: string; value: string }[]
  lostReasons: typeof LOST_REASONS
  pendingReasonFor: string | number | null
  onDropdownChange: (cardId: string | number, newStage: string) => void
  onSubmitLostReason: (cardId: string | number, reason: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.stage })

  return (
    <div
      ref={setNodeRef}
      className="mb-board-column"
      style={{
        minWidth: 260,
        maxWidth: 260,
        background: isOver ? 'rgba(13,61,43,0.06)' : '#fafafa',
        color: '#1a1a1a',
        border: '1px solid #e5e5e5',
        borderRadius: 8,
        padding: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        flexShrink: 0,
      }}
    >
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{column.label}</div>
        <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>
          {column.cards.length} · ₹{Math.round(column.totalValue).toLocaleString('en-IN')}
        </div>
      </div>
      {column.cards.map((card) => (
        <DraggableCard
          key={card.id}
          card={card}
          allStages={allStages}
          lostReasons={lostReasons}
          showReasonPicker={pendingReasonFor === card.id}
          onDropdownChange={onDropdownChange}
          onSubmitLostReason={onSubmitLostReason}
        />
      ))}
    </div>
  )
}

function DraggableCard({
  card,
  allStages,
  lostReasons,
  showReasonPicker,
  onDropdownChange,
  onSubmitLostReason,
}: {
  card: BoardCard
  allStages: { label: string; value: string }[]
  lostReasons: typeof LOST_REASONS
  showReasonPicker: boolean
  onDropdownChange: (cardId: string | number, newStage: string) => void
  onSubmitLostReason: (cardId: string | number, reason: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(card.id),
    data: { stage: card.stage },
  })

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CardBody card={card} />
      <div style={{ marginTop: '0.4rem' }} onPointerDown={(e) => e.stopPropagation()}>
        <select
          value={card.stage}
          onChange={(e) => onDropdownChange(card.id, e.target.value)}
          style={{ width: '100%', fontSize: '0.75rem', padding: '0.2rem' }}
        >
          {allStages.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {showReasonPicker && (
          <div style={{ marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {lostReasons.map((r) => (
              <button
                key={r.value}
                onClick={() => onSubmitLostReason(card.id, r.value)}
                style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer' }}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CardBody({ card }: { card: BoardCard }) {
  const suggestionMismatch = card.suggestedStage && card.suggestedStage !== card.stage
  return (
    <div
      className="mb-board-card"
      style={{
        background: '#fff',
        color: '#1a1a1a',
        border: '1px solid #e5e5e5',
        borderRadius: 6,
        padding: '0.6rem 0.7rem',
        cursor: 'grab',
        fontSize: '0.85rem',
      }}
    >
      <div style={{ fontWeight: 600 }}>{card.contactCompany || card.contactName}</div>
      {card.estimatedValue != null && (
        <div style={{ opacity: 0.6, fontSize: '0.75rem' }}>₹{Math.round(card.estimatedValue).toLocaleString('en-IN')}</div>
      )}
      {card.queueBadge && (
        <span
          style={{
            display: 'inline-block',
            marginTop: '0.3rem',
            fontSize: '0.65rem',
            padding: '0.1rem 0.4rem',
            borderRadius: 4,
            background: 'rgba(184,151,46,0.15)',
            color: '#8a6d1f',
          }}
        >
          {card.queueBadge}
        </span>
      )}
      {suggestionMismatch && (
        <div style={{ marginTop: '0.3rem', fontSize: '0.65rem', opacity: 0.5 }}>
          Extractor suggests: {card.suggestedStage}
        </div>
      )}
      {card.stage === 'lost' && card.lostReason && (
        <div style={{ marginTop: '0.3rem', fontSize: '0.65rem', opacity: 0.5 }}>Reason: {card.lostReason}</div>
      )}
    </div>
  )
}
