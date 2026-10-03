'use client'

import { useMemo } from 'react'
import { BUCKET_LABELS, BUCKET_ORDER, scoreDeal } from '@/lib/scoring'
import { LEAD_SOURCES, STAGES } from '@/lib/constants'
import type { Deal, Message, WhatsappSession } from '@/lib/types'

function money(value: number) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

function pct(value: number) {
  return `${Math.round(value)}%`
}

function Bar({ label, count, value, max, formatValue }: { label: string; count: number; value?: number; max: number; formatValue?: (value: number) => string }) {
  const width = max === 0 ? 0 : Math.max(count > 0 ? 4 : 0, (count / max) * 100)
  return (
    <div className="analytics-bar-row">
      <span className="analytics-bar-label">{label}</span>
      <div className="analytics-bar-track"><div className="analytics-bar-fill" style={{ width: `${width}%` }} /></div>
      <span className="analytics-bar-value">{count}{value != null && formatValue ? ` · ${formatValue(value)}` : ''}</span>
    </div>
  )
}

export function AnalyticsView({ deals, messages, whatsappSession }: { deals: Deal[]; messages: Message[]; whatsappSession: WhatsappSession | null }) {
  const stats = useMemo(() => {
    const open = deals.filter((deal) => deal.stage !== 'won' && deal.stage !== 'lost')
    const won = deals.filter((deal) => deal.stage === 'won')
    const lost = deals.filter((deal) => deal.stage === 'lost')
    const openValue = open.reduce((sum, deal) => sum + (deal.estimatedValue || 0), 0)
    const wonValue = won.reduce((sum, deal) => sum + (deal.wonValue || deal.estimatedValue || 0), 0)
    const dealsWithValue = deals.filter((deal) => deal.estimatedValue != null)
    const avgDealValue = dealsWithValue.length ? dealsWithValue.reduce((sum, deal) => sum + (deal.estimatedValue || 0), 0) / dealsWithValue.length : 0
    const closedCount = won.length + lost.length
    const winRate = closedCount ? (won.length / closedCount) * 100 : 0

    const closeDurations = won
      .map((deal) => (new Date(deal.updatedAt).getTime() - new Date(deal.createdAt).getTime()) / 86_400_000)
      .filter((days) => days >= 0)
    const avgDaysToClose = closeDurations.length ? closeDurations.reduce((sum, d) => sum + d, 0) / closeDurations.length : null

    const byStage = STAGES.map((stage) => ({
      ...stage,
      stage: stage.value,
      count: deals.filter((deal) => deal.stage === stage.value).length,
      value: deals.filter((deal) => deal.stage === stage.value).reduce((sum, deal) => sum + (deal.estimatedValue || 0), 0),
    }))

    const sourceGroups = [...LEAD_SOURCES, { label: 'Not set', value: '__unset' }]
    const bySource = sourceGroups.map((source) => ({
      ...source,
      count: deals.filter((deal) => (deal.leadSource || '__unset') === source.value).length,
    }))

    const byBucket = BUCKET_ORDER.map((bucket) => ({
      value: bucket,
      label: BUCKET_LABELS[bucket],
      count: open.filter((deal) => scoreDeal(deal)?.bucket === bucket).length,
    }))

    const inbound = messages.filter((m) => m.direction === 'inbound').length
    const outbound = messages.filter((m) => m.direction === 'outbound').length

    return { open, won, lost, openValue, wonValue, avgDealValue, winRate, avgDaysToClose, byStage, bySource, byBucket, inbound, outbound }
  }, [deals, messages])

  // Open stages share one scale; won/lost get their own so 48 lost deals don't flatten the live pipeline.
  const openStages = stats.byStage.filter((s) => s.stage !== 'won' && s.stage !== 'lost')
  const closedStages = stats.byStage.filter((s) => s.stage === 'won' || s.stage === 'lost')
  const maxStageCount = Math.max(1, ...openStages.map((s) => s.count))
  const maxClosedCount = Math.max(1, ...closedStages.map((s) => s.count))
  const maxSourceCount = Math.max(1, ...stats.bySource.map((s) => s.count))
  const maxBucketCount = Math.max(1, ...stats.byBucket.map((s) => s.count))

  return (
    <div className="view analytics-view">
      <section className="analytics-tiles">
        <div className="stat-tile"><span>Open deals</span><strong>{stats.open.length}</strong><small>{money(stats.openValue)} open value</small></div>
        <div className="stat-tile"><span>Won</span><strong>{stats.won.length}</strong><small>{money(stats.wonValue)} total</small></div>
        <div className="stat-tile"><span>Win rate</span><strong>{pct(stats.winRate)}</strong><small>{stats.won.length} of {stats.won.length + stats.lost.length} closed</small></div>
        <div className="stat-tile"><span>Avg deal value</span><strong>{money(stats.avgDealValue)}</strong><small>across all deals</small></div>
        <div className="stat-tile"><span>Avg time to close</span><strong>{stats.avgDaysToClose == null ? 'n/a' : `${Math.round(stats.avgDaysToClose)}d`}</strong><small>won deals</small></div>
      </section>

      <div className="analytics-grid">
        <section className="analytics-card">
          <h3>Pipeline by stage</h3>
          {openStages.map((stage) => <Bar key={stage.stage} label={stage.label} count={stage.count} value={stage.value} max={maxStageCount} formatValue={money} />)}
          <h4 className="analytics-subhead">Closed</h4>
          {closedStages.map((stage) => <Bar key={stage.stage} label={stage.label} count={stage.count} value={stage.value} max={maxClosedCount} formatValue={money} />)}
        </section>

        <section className="analytics-card">
          <h3>Priority queue</h3>
          {stats.byBucket.map((bucket) => <Bar key={bucket.value} label={bucket.label} count={bucket.count} max={maxBucketCount} />)}
          {stats.open.length === 0 && <p className="analytics-empty">No open deals.</p>}
        </section>

        <section className="analytics-card">
          <h3>Lead source</h3>
          {stats.bySource.map((source) => <Bar key={source.value} label={source.label} count={source.count} max={maxSourceCount} />)}
        </section>

        <section className="analytics-card">
          <h3>Activity</h3>
          <dl className="analytics-facts">
            <div><dt>WhatsApp mirror</dt><dd className={whatsappSession?.status === 'connected' ? 'status-good' : 'status-warn'}>{whatsappSession?.status === 'connected' ? 'Connected' : 'Not connected'}</dd></div>
            <div><dt>Messages mirrored</dt><dd>{messages.length.toLocaleString('en-IN')}</dd></div>
            <div><dt>Inbound / outbound</dt><dd>{stats.inbound.toLocaleString('en-IN')} / {stats.outbound.toLocaleString('en-IN')}</dd></div>
            <div><dt>Deals gone quiet</dt><dd>{stats.byBucket.find((b) => b.value === 'quoted_gone_quiet')?.count ?? 0}</dd></div>
          </dl>
        </section>
      </div>
    </div>
  )
}
