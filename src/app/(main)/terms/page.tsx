import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service - MintBox',
  description:
    'The terms that govern your use of themintbox.in, our quotation process, and any corporate gifting orders you place with MintBox.',
}

const LAST_UPDATED = 'May 23, 2026'

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <p>
            These Terms govern your use of <a href="https://themintbox.in">themintbox.in</a> (the
            &ldquo;Site&rdquo;), the quotation process, and any corporate gifting order you place with
            MintBox. By browsing the Site or submitting a quote request, you agree to these Terms.
          </p>
          <p>
            MintBox is a corporate gifting brand operated from 2nd Floor, Sobha Alexander Plaza,
            Ashok Nagar, Bengaluru 560 025, India.
          </p>
        </>
      }
      sections={[
        {
          heading: 'Catalogue and pricing',
          body: (
            <>
              <p>
                Product listings on the Site are illustrative. Photographs, colours, packaging, and
                accompanying items are indicative of what the final gift will look like, but minor
                variations are inherent in handcrafted and branded products and do not constitute
                a defect.
              </p>
              <p>
                Unit prices shown on the Site are starting prices and do not include GST, branding
                charges, or shipping unless explicitly stated. The final price for your order is
                fixed only in the written quote we share with you in response to your enquiry. We
                quote everything upfront. The number we quote is the number on your invoice.
              </p>
              <p>
                We may add, remove, or modify products in the catalogue at any time. If a product
                you have already quoted on becomes unavailable, we will offer a comparable
                replacement or refund the corresponding portion of any advance.
              </p>
            </>
          ),
        },
        {
          heading: 'Quotes, orders, and minimums',
          body: (
            <>
              <p>
                A quote is valid for 14 days from the date we send it, unless explicitly stated
                otherwise. After that, raw material or vendor pricing may have shifted and we may
                need to re-confirm.
              </p>
              <p>
                Most products carry a minimum order quantity (MOQ) of 10 units. Curated hampers and
                fully-branded boxes typically have an MOQ of 25 units. Specific MOQs are confirmed
                in your written quote.
              </p>
              <p>
                An order is formally accepted only when you confirm the quote in writing (by email
                or WhatsApp) and pay the advance described below. Until then, an order is not
                considered placed.
              </p>
            </>
          ),
        },
        {
          heading: 'Payment terms',
          body: (
            <>
              <p>
                Unless agreed otherwise in writing, our standard payment terms are:
              </p>
              <ul>
                <li>
                  <strong>50% advance</strong> on confirmation of the order &mdash; this covers
                  procurement of raw materials and branding setup.
                </li>
                <li>
                  <strong>50% balance</strong> before dispatch, payable on sharing of the final
                  invoice and pre-dispatch quality-check images.
                </li>
              </ul>
              <p>
                Custom net-payment terms may be agreed for enterprises with established procurement
                processes. Any such terms are recorded in writing in the quote.
              </p>
              <p>
                Payment may be made by bank transfer (NEFT / RTGS), UPI, or credit/debit card via
                our payment gateway. Bank charges and gateway fees, if any, are absorbed by us.
              </p>
            </>
          ),
        },
        {
          heading: 'Branding, samples, and approvals',
          body: (
            <>
              <p>
                Once an order is confirmed, we share digital mockups of branded items (boxes,
                packaging, on-product print) for your approval. We will not proceed to bulk
                production without your written sign-off on the mockup.
              </p>
              <p>
                For first-time orders or new product categories, we ship a physical sample on
                request, charged at the unit price plus actual courier costs. Sample cost is
                credited against the final invoice if you proceed with the bulk order.
              </p>
              <p>
                Any artwork, logos, or brand guidelines you share with us are used solely for the
                purpose of fulfilling your order and are not used for any other client or in our
                marketing without your explicit permission.
              </p>
            </>
          ),
        },
        {
          heading: 'Delivery and risk',
          body: (
            <>
              <p>
                Lead times depend on order size and customisation. We confirm a target dispatch
                window in writing as part of the quote. Standard production lead times range from
                10&ndash;21 working days from order confirmation.
              </p>
              <p>
                Shipping is via reputed logistics partners. We provide tracking IDs once parcels
                are dispatched. Risk in the goods passes to you on delivery to the address you
                provide.
              </p>
              <p>
                For multi-address delivery (e.g. shipping to 200 individual employees), the
                quoted price includes per-address dispatch. We are responsible for arranging
                collection of delivery addresses through a secure tool we will share with you.
              </p>
              <p>
                Delivery dates are good-faith estimates. We are not liable for delays caused by
                events outside our reasonable control (courier disruption, weather, strikes,
                regulatory holds, and similar events).
              </p>
            </>
          ),
        },
        {
          heading: 'Quality, returns, and replacements',
          body: (
            <>
              <p>
                Every batch is inspected before dispatch. If any item arrives damaged, defective,
                or materially different from the approved mockup, notify us within 7 days of
                delivery with photographs and we will, at our option, replace the affected units
                or refund their cost.
              </p>
              <p>
                Corporate gifting products are made-to-order with branding. Returns of opened or
                used products, or returns based on change of mind after delivery, cannot be
                accommodated.
              </p>
            </>
          ),
        },
        {
          heading: 'Cancellations',
          body: (
            <>
              <p>
                You may cancel an order before we have begun production or branding without
                charge. Once production or branding has begun, the advance is non-refundable
                because materials have been procured and labour committed. We will provide an
                honest assessment of where the order stands when you ask.
              </p>
            </>
          ),
        },
        {
          heading: 'Intellectual property',
          body: (
            <>
              <p>
                The Site &mdash; including the MintBox name, logo, copy, photography, layout, and
                code &mdash; is owned by MintBox and protected by Indian and international
                intellectual property laws. You may not copy, redistribute, or use any part of the
                Site for commercial purposes without our written permission.
              </p>
              <p>
                Your brand assets (logos, fonts, brand guidelines) remain entirely your property.
                Our use of them is strictly limited to fulfilling your specific order.
              </p>
            </>
          ),
        },
        {
          heading: 'Acceptable use of the Site',
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>Submit false or misleading information through any form on the Site.</li>
                <li>Attempt to access non-public areas of the Site or interfere with its operation.</li>
                <li>Scrape or automate access to the Site beyond what robots.txt permits.</li>
                <li>Use the Site to send unsolicited communications or for any unlawful purpose.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Limitation of liability',
          body: (
            <>
              <p>
                To the maximum extent permitted by law, our total liability for any claim arising
                out of or related to your use of the Site or any order placed with us is limited
                to the amount you paid us for the order in question, or INR 25,000, whichever is
                lower.
              </p>
              <p>
                We are not liable for indirect, incidental, special, consequential, or punitive
                damages, including loss of revenue, profit, goodwill, or anticipated savings, even
                if we were advised of the possibility of such damages.
              </p>
              <p>
                Nothing in these Terms excludes liability that cannot be excluded by law.
              </p>
            </>
          ),
        },
        {
          heading: 'Governing law and disputes',
          body: (
            <>
              <p>
                These Terms are governed by the laws of India. Any dispute arising out of or in
                connection with these Terms or any order is subject to the exclusive jurisdiction
                of the courts of Bengaluru, Karnataka.
              </p>
              <p>
                We prefer to resolve issues directly and informally. Please email{' '}
                <a href="mailto:hello@themintbox.in">hello@themintbox.in</a> first &mdash; we
                respond promptly and take complaints seriously.
              </p>
            </>
          ),
        },
        {
          heading: 'Changes to these Terms',
          body: (
            <>
              <p>
                We may update these Terms from time to time. The current version is always
                available on this page, with the &ldquo;Last updated&rdquo; date at the top. The
                Terms in force when you confirm an order govern that order, even if these Terms
                are subsequently updated.
              </p>
            </>
          ),
        },
        {
          heading: 'Contact us',
          body: (
            <>
              <p>For any questions about these Terms, reach us at:</p>
              <ul>
                <li>
                  Email:{' '}
                  <a href="mailto:hello@themintbox.in">hello@themintbox.in</a>
                </li>
                <li>WhatsApp / Phone: +91 86182 37189</li>
                <li>
                  Office: 2nd Floor, Sobha Alexander Plaza, Ashok Nagar, Bengaluru 560 025, India
                </li>
              </ul>
            </>
          ),
        },
      ]}
    />
  )
}
