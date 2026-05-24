import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Resend } from 'resend'

// Vercel's default for hobby is 10s. Payload cold-start + two Resend sends can
// exceed that and the function returns a non-JSON 504, which the browser
// surfaces as "Network error" to the user. Give the route headroom.
export const maxDuration = 60
export const dynamic = 'force-dynamic'

// Lazy: Resend's constructor throws when the API key is missing. Initialising
// at module top-level breaks `next build`'s page-data collection on Vercel
// where env vars are not populated during that step.
let resendClient: Resend | null = null
function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY?.trim() || 're_placeholder')
  }
  return resendClient
}

interface LeadItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
}

interface LeadRequest {
  name: string
  company?: string
  email: string
  phone?: string
  occasion?: string
  notes?: string
  items?: LeadItem[]
}

function formatOccasion(occasion: string): string {
  const map: Record<string, string> = {
    welcome_kit: 'Employee Welcome Kit',
    diwali: 'Diwali Gifting',
    holi: 'Holi Gifting',
    corporate_event: 'Corporate Event',
    client_gifting: 'Client Gifting',
    festival: 'Festival Season',
    year_end: 'Year-End Gifting',
    other: 'Other',
  }
  return map[occasion] || occasion
}

function teamEmailHtml(lead: LeadRequest, refCode: string, estimatedTotal: number): string {
  const leadItems = lead.items ?? []
  const itemRows = leadItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;">${item.productName}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">₹${item.unitPrice.toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e0d0;text-align:right;">₹${(item.quantity * item.unitPrice).toLocaleString('en-IN')}</td>
      </tr>`,
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F8F4ED;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F4ED;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(13,61,43,0.1);">
        <tr>
          <td style="background:#0D3D2B;padding:28px 32px;">
            <h1 style="margin:0;color:#C9A84C;font-size:24px;font-weight:700;letter-spacing:2px;">MINTBOX</h1>
            <p style="margin:4px 0 0;color:#a8c4b8;font-size:13px;">New Quote Request  -  ${refCode}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h2 style="color:#0D3D2B;font-size:18px;margin:0 0 20px;">Contact Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;color:#666;width:120px;">Name</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.name}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Company</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.company}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.email}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.phone || ' - '}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Occasion</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.occasion ? formatOccasion(lead.occasion) : ' - '}</td></tr>
            </table>
            ${lead.notes ? `<div style="margin-top:16px;padding:12px 16px;background:#f5f2ec;border-left:3px solid #C9A84C;border-radius:4px;"><p style="margin:0;color:#555;font-size:14px;">${lead.notes}</p></div>` : ''}
            <h2 style="color:#0D3D2B;font-size:18px;margin:28px 0 16px;">Requested Items</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d0;border-radius:8px;overflow:hidden;">
              <tr style="background:#0D3D2B;">
                <th style="padding:10px 12px;color:#C9A84C;text-align:left;font-size:12px;font-weight:600;letter-spacing:1px;">PRODUCT</th>
                <th style="padding:10px 12px;color:#C9A84C;text-align:center;font-size:12px;font-weight:600;letter-spacing:1px;">QTY</th>
                <th style="padding:10px 12px;color:#C9A84C;text-align:right;font-size:12px;font-weight:600;letter-spacing:1px;">UNIT</th>
                <th style="padding:10px 12px;color:#C9A84C;text-align:right;font-size:12px;font-weight:600;letter-spacing:1px;">SUBTOTAL</th>
              </tr>
              ${itemRows}
              <tr style="background:#f5f2ec;">
                <td colspan="3" style="padding:12px;text-align:right;font-weight:700;color:#0D3D2B;">Estimated Total</td>
                <td style="padding:12px;text-align:right;font-weight:700;color:#0D3D2B;font-size:16px;">₹${estimatedTotal.toLocaleString('en-IN')}</td>
              </tr>
            </table>
            <p style="margin:24px 0 0;font-size:12px;color:#999;">This is an automated notification from the MintBox catalog. Reply to ${lead.email} to respond.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function customerEmailHtml(lead: LeadRequest, refCode: string, estimatedTotal: number): string {
  const leadItems = lead.items ?? []
  const itemList = leadItems
    .map(
      (item) =>
        `<li style="padding:6px 0;border-bottom:1px solid #e8e0d0;display:flex;justify-content:space-between;">${item.productName} × ${item.quantity} &mdash; <strong>₹${(item.quantity * item.unitPrice).toLocaleString('en-IN')}</strong></li>`,
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F8F4ED;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F4ED;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(13,61,43,0.1);">
        <tr>
          <td style="background:#0D3D2B;padding:32px;text-align:center;">
            <h1 style="margin:0;color:#C9A84C;font-size:28px;font-weight:700;letter-spacing:3px;">MINTBOX</h1>
            <p style="margin:8px 0 0;color:#a8c4b8;font-size:14px;">Premium Corporate Gifting</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 32px;">
            <h2 style="color:#0D3D2B;font-size:22px;margin:0 0 8px;">Thank you, ${lead.name}!</h2>
            <p style="color:#555;line-height:1.6;margin:0 0 24px;">We've received your gifting request from <strong>${lead.company}</strong>. Our team will review your pack and reach out with final pricing and customisation options within 24 hours.</p>
            <div style="background:#f5f2ec;border-radius:8px;padding:16px 20px;margin-bottom:28px;text-align:center;">
              <p style="margin:0;color:#666;font-size:13px;letter-spacing:1px;">YOUR REFERENCE CODE</p>
              <p style="margin:8px 0 0;color:#0D3D2B;font-size:24px;font-weight:700;letter-spacing:3px;">${refCode}</p>
            </div>
            <h3 style="color:#0D3D2B;font-size:16px;margin:0 0 12px;">Details You Shared</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
              <tr><td style="padding:6px 0;color:#666;width:140px;">Name</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.name}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Company</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.company || ' - '}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.email}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Phone</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.phone || ' - '}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Occasion</td><td style="padding:6px 0;color:#1a1a1a;font-weight:500;">${lead.occasion ? formatOccasion(lead.occasion) : ' - '}</td></tr>
            </table>
            ${lead.notes ? `<div style="margin:0 0 20px;padding:12px 16px;background:#f5f2ec;border-left:3px solid #C9A84C;border-radius:4px;"><p style="margin:0;color:#555;font-size:14px;">${lead.notes}</p></div>` : ''}
            <h3 style="color:#0D3D2B;font-size:16px;margin:0 0 12px;">Your Pack Summary</h3>
            <ul style="list-style:none;padding:0;margin:0 0 16px;">
              ${itemList}
            </ul>
            <p style="text-align:right;margin:0;font-weight:700;color:#0D3D2B;font-size:16px;">Estimated Total: ₹${estimatedTotal.toLocaleString('en-IN')}</p>
            <p style="margin:24px 0 0;color:#888;font-size:12px;">* Final pricing may vary based on quantity, customisation, and delivery. We'll send you a detailed quote soon.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0D3D2B;padding:20px 32px;text-align:center;">
            <p style="margin:0;color:#a8c4b8;font-size:13px;">Questions? Email us at <a href="mailto:hello@themintbox.in" style="color:#C9A84C;">hello@themintbox.in</a></p>
            <p style="margin:8px 0 0;color:#6a9d8a;font-size:12px;">© 2025 MintBox  -  themintbox.in</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadRequest = await req.json()

    const { name, email } = body
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields: name, email' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const items = Array.isArray(body.items) ? body.items : []
    const estimatedTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    const company = body.company?.trim() || 'Not provided'

    const payload = await getPayload({ config: configPromise })

    const lead = await payload.create({
      collection: 'leads',
      data: {
        name,
        company,
        email,
        phone: body.phone,
        occasion: body.occasion as any,
        notes: body.notes,
        items: items.map((item) => ({
          product: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        estimatedTotal,
        status: 'new',
      },
    })

    const refCode = lead.referenceCode || 'MB-XXXXX'

    const notifyEmail = process.env.NOTIFY_EMAIL || 'hello@themintbox.in'

    const resend = getResend()
    const [teamMailResult, customerMailResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'MintBox <noreply@themintbox.in>',
        to: notifyEmail,
        subject: `New Quote Request ${refCode}  -  ${company}`,
        html: teamEmailHtml(body, refCode, estimatedTotal),
      }),
      resend.emails.send({
        from: 'MintBox <noreply@themintbox.in>',
        to: email,
        subject: `Your MintBox request is confirmed  -  ${refCode}`,
        html: customerEmailHtml(body, refCode, estimatedTotal),
      }),
    ])

    const teamEmailSent = teamMailResult.status === 'fulfilled'
    const confirmationEmailSent = customerMailResult.status === 'fulfilled'

    if (!teamEmailSent) {
      console.error('Team lead email send failed:', teamMailResult.reason)
    }
    if (!confirmationEmailSent) {
      console.error('Customer confirmation email send failed:', customerMailResult.reason)
    }

    return NextResponse.json({
      success: true,
      referenceCode: refCode,
      estimatedTotal,
      teamEmailSent,
      confirmationEmailSent,
    })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ error: 'Failed to process request. Please try again.' }, { status: 500 })
  }
}
