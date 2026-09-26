import type { CollectionConfig } from 'payload'

// Standard CRM stages the pipeline board drags cards between. Kept separate
// from Leads.status (new/quoted/won/lost) which is coarser and stays as the
// form-facing summary field.
export const DEAL_STAGES = [
  { label: 'New', value: 'new' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Quoted', value: 'quoted' },
  { label: 'Negotiation', value: 'negotiation' },
  { label: 'Won', value: 'won' },
  { label: 'Lost', value: 'lost' },
] as const

export const LOST_REASONS = [
  { label: 'Price', value: 'price' },
  { label: 'Timing', value: 'timing' },
  { label: 'Chose another supplier', value: 'competitor' },
  { label: 'Went silent', value: 'silent' },
  { label: 'Not a fit', value: 'not_a_fit' },
] as const

export const Deals: CollectionConfig = {
  slug: 'deals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'contact', 'stage', 'estimatedValue', 'nextActionAt', 'updatedAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // Track stage-change time whenever stage actually changes, so
        // "quoted N days ago" and time-in-stage on the board are free.
        if (data.stage && data.stage !== originalDoc?.stage) {
          data.stageChangedAt = new Date().toISOString()
          if (data.stage === 'quoted' && !data.quoteSentAt) {
            data.quoteSentAt = new Date().toISOString()
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Infosys - Diwali hampers, 500 units"',
      },
    },
    {
      name: 'contact',
      type: 'relationship',
      relationTo: 'contacts',
      required: true,
      hasMany: false,
    },
    {
      name: 'stage',
      type: 'select',
      defaultValue: 'new',
      options: DEAL_STAGES as unknown as { label: string; value: string }[],
      admin: {
        description: 'Dragged on the pipeline board, or set here. A drag always wins over the extractor’s suggestion.',
      },
    },
    {
      // The extractor writes here, never to `stage` directly. Shown as a
      // dismissable badge on the board; accepting it copies the value across.
      name: 'suggestedStage',
      type: 'select',
      options: DEAL_STAGES as unknown as { label: string; value: string }[],
      admin: {
        position: 'sidebar',
        description: 'Proposed by the extraction pass. Never applied automatically.',
      },
    },
    {
      name: 'stageChangedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'stageSetManually',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'True once a human has dragged/changed the stage - protects it from the nightly extraction pass.',
      },
    },
    {
      name: 'lostReason',
      type: 'select',
      options: LOST_REASONS as unknown as { label: string; value: string }[],
      admin: {
        condition: (data) => data?.stage === 'lost',
      },
    },
    {
      name: 'occasion',
      type: 'select',
      options: [
        { label: 'Employee Welcome Kit', value: 'welcome_kit' },
        { label: 'Diwali Gifting', value: 'diwali' },
        { label: 'Holi Gifting', value: 'holi' },
        { label: 'Corporate Event', value: 'corporate_event' },
        { label: 'Client Gifting', value: 'client_gifting' },
        { label: 'Festival Season', value: 'festival' },
        { label: 'Year-End Gifting', value: 'year_end' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'quantity', type: 'number', min: 1, admin: { width: '33%' } },
        { name: 'unitBudgetMin', type: 'number', min: 0, admin: { width: '33%', description: '₹ per unit' } },
        { name: 'unitBudgetMax', type: 'number', min: 0, admin: { width: '33%', description: '₹ per unit' } },
      ],
    },
    {
      name: 'estimatedValue',
      type: 'number',
      admin: {
        description: 'quantity × midpoint(unitBudgetMin, unitBudgetMax), else estimatedTotal from the form, else median for this occasion.',
      },
    },
    {
      name: 'estimatedValueConfidence',
      type: 'select',
      defaultValue: 'high',
      options: [
        { label: 'High (extracted or form-provided)', value: 'high' },
        { label: 'Low (guessed from occasion median)', value: 'low' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'deadlineDate',
      type: 'date',
      admin: {
        description: 'Resolved from phrases like "before Diwali" against the calendar.',
      },
    },
    {
      name: 'productInterest',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'blockers',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
      admin: { description: 'What the customer is waiting on.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Extractor-written, ≤3 lines, for picking the thread up cold.',
      },
    },
    {
      name: 'nextAction',
      type: 'text',
    },
    {
      name: 'nextActionAt',
      type: 'date',
      admin: {
        description: 'Snooze / next-action date. A deal leaves the queue until this date.',
      },
    },
    {
      name: 'awaitingWhom',
      type: 'select',
      defaultValue: 'us',
      options: [
        { label: 'Us', value: 'us' },
        { label: 'Them', value: 'them' },
        { label: 'Nobody', value: 'nobody' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Drives the "waiting on you" bucket more than anything else.',
      },
    },
    {
      name: 'quoteSentAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Set automatically on first move to Quoted. Starts the gone-quiet clock.',
      },
    },
    {
      name: 'wonValue',
      type: 'number',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.stage === 'won',
        description: 'Final confirmed order value, for attribution reporting.',
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Copied from the originating lead’s first-touch source, e.g. "google / organic".',
      },
    },
    {
      name: 'originLead',
      type: 'relationship',
      relationTo: 'leads',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'lastMessageAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Maintained by a Messages hook. Any direction, any channel.',
      },
    },
    {
      name: 'lastInboundMessageAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Last message FROM the customer. Drives "waiting on you" duration and the extraction debounce.',
      },
    },
    {
      name: 'lastOutboundMessageAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Last message we sent (from the phone, mirrored in). If this is after lastInboundMessageAt, we’re not waiting on anything.',
      },
    },
    {
      name: 'lastExtractedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime' },
        description: 'When the extraction pass last ran on this deal. Messages after this point are what the next pass reads.',
      },
    },
  ],
  timestamps: true,
}
