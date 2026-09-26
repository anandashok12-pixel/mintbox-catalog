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
import { CRM_THEME, BUCKET_ACCENT, STAGE_ACCENT } from '@/lib/crmTheme'

interface Props {
  initialColumns: BoardColumn[]
  lostReasons: typeof LOST_REASONS
}

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
      <div className="mb-board-root" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', height: '100%' }}>
        {columns.map((column) => (
          <Column
            key={column.stage}
            column={column}
            lostReasons={lostReasons}
            pendingReasonFor={pendingReasonFor}
            onSubmitLostReason={submitLostReason}
          />
        ))}
      </div>
      <DragOverlay>{activeCard ? <CardBody card={activeCard} dragging /> : null}</DragOverlay>
    </DndContext>
  )
}

function Column({
  column,
  lostReasons,
  pendingReasonFor,
  onSubmitLostReason,
}: {
  column: BoardColumn
  lostReasons: typeof LOST_REASONS
  pendingReasonFor: string | number | null
  onSubmitLostReason: (cardId: string | number, reason: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.stage })
  const topAccent = STAGE_ACCENT[column.stage] || CRM_THEME.gold

  return (
    <div
      ref={setNodeRef}
      className="mb-board-column"
      style={{
        minWidth: 280,
        maxWidth: 280,
        background: isOver ? 'rgba(184,151,46,0.08)' : CRM_THEME.paper,
        border: `1px solid ${CRM_THEME.border}`,
        borderTopWidth: 3,
        borderTopColor: topAccent,
        borderRadius: 10,
        padding: '0.85rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        flexShrink: 0,
        boxShadow: CRM_THEME.shadowSm,
        transition: 'background 120ms ease',
      }}
    >
      <div style={{ paddingBottom: '0.5rem', borderBottom: `1px solid ${CRM_THEME.border}` }}>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: CRM_THEME.green }}>{column.label}</div>
        <div style={{ fontSize: '0.75rem', color: CRM_THEME.inkFaint, marginTop: '0.15rem' }}>
          {column.cards.length} deal{column.cards.length === 1 ? '' : 's'} &middot; &#8377;
          {Math.round(column.totalValue).toLocaleString('en-IN')}
        </div>
      </div>
      {column.cards.length === 0 && (
        <div style={{ fontSize: '0.75rem', color: CRM_THEME.inkFaint, textAlign: 'center', padding: '1.25rem 0' }}>No deals</div>
      )}
      {column.cards.map((card) => (
        <DraggableCard
          key={card.id}
          card={card}
          lostReasons={lostReasons}
          showReasonPicker={pendingReasonFor === card.id}
          onSubmitLostReason={onSubmitLostReason}
        />
      ))}
    </div>
  )
}

function DraggableCard({
  card,
  lostReasons,
  showReasonPicker,
  onSubmitLostReason,
}: {
  card: BoardCard
  lostReasons: typeof LOST_REASONS
  showReasonPicker: boolean
  onSubmitLostReason: (cardId: string | number, reason: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(card.id),
    data: { stage: card.stage },
  })

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.35 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CardBody card={card} />
      {showReasonPicker && (
        // Reasons are picked with a tap/click, not a drag - stop the pointer
        // event from being read as the start of a new drag on this card.
        <div
          style={{ marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {lostReasons.map((r) => (
            <button
              key={r.value}
              onClick={() => onSubmitLostReason(card.id, r.value)}
              style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.5rem',
                border: `1px solid ${CRM_THEME.border}`,
                borderRadius: 20,
                background: CRM_THEME.cream,
                color: CRM_THEME.inkMuted,
                cursor: 'pointer',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function CardBody({ card, dragging }: { card: BoardCard; dragging?: boolean }) {
  const suggestionMismatch = card.suggestedStage && card.suggestedStage !== card.stage
  const accent = (card.queueBucket && BUCKET_ACCENT[card.queueBucket]) || 'transparent'

  return (
    <div
      className="mb-board-card"
      style={{
        background: CRM_THEME.paper,
        border: `1px solid ${CRM_THEME.border}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 8,
        padding: '0.65rem 0.75rem',
        cursor: dragging ? 'grabbing' : 'grab',
        fontSize: '0.85rem',
        boxShadow: dragging ? CRM_THEME.shadowMd : CRM_THEME.shadowSm,
      }}
    >
      <div style={{ fontWeight: 700, color: CRM_THEME.ink }}>{card.contactCompany || card.contactName}</div>
      {card.contactCompany && (
        <div style={{ fontSize: '0.75rem', color: CRM_THEME.inkFaint, marginTop: '0.1rem' }}>{card.contactName}</div>
      )}
      <div style={{ fontSize: '0.7rem', color: CRM_THEME.inkFaint, marginTop: '0.3rem' }}>{formatDate(card.createdAt)}</div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
        {card.estimatedValue != null ? (
          <span style={{ fontWeight: 700, color: CRM_THEME.green, fontSize: '0.85rem' }}>
            &#8377;{Math.round(card.estimatedValue).toLocaleString('en-IN')}
          </span>
        ) : (
          <span />
        )}
        {card.queueBadge && (
          <span
            className="mb-accent-text"
            style={{
              display: 'inline-block',
              fontSize: '0.65rem',
              fontWeight: 600,
              padding: '0.12rem 0.45rem',
              borderRadius: 20,
              // accent is a 6-digit hex or the literal string 'transparent' -
              // appending an alpha suffix to 'transparent' itself would be
              // invalid CSS, so give that case a real (very light) fill.
              background: accent === 'transparent' ? '#00000010' : `${accent}1f`,
              color: accent === 'transparent' ? CRM_THEME.inkFaint : accent,
            }}
          >
            {card.queueBadge}
          </span>
        )}
      </div>

      {suggestionMismatch && (
        <div style={{ marginTop: '0.35rem', fontSize: '0.65rem', color: CRM_THEME.inkFaint, fontStyle: 'italic' }}>
          Extractor suggests: {card.suggestedStage}
        </div>
      )}
      {card.stage === 'lost' && card.lostReason && (
        <div style={{ marginTop: '0.35rem', fontSize: '0.65rem', color: CRM_THEME.danger }}>Reason: {card.lostReason}</div>
      )}
    </div>
  )
}
