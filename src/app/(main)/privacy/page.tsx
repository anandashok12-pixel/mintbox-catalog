import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - MintBox',
  description:
    'How MintBox collects, uses, and protects your information when you request a quote, browse the catalogue, or contact us.',
}

const LAST_UPDATED = 'May 23, 2026'

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <p>
            MintBox (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a corporate gifting brand
            operated from Bengaluru, India. This Privacy Policy explains what personal information we
            collect when you browse <a href="https://themintbox.in">themintbox.in</a>, request a quote,
            or otherwise interact with us, how we use that information, and the choices you have.
          </p>
          <p>
            We collect only the information we need to respond to your enquiry and run our business.
            We do not sell your data. We never share it with third parties for marketing purposes.
          </p>
        </>
      }
      sections={[
        {
          heading: 'Information we collect',
          body: (
            <>
              <p>
                We collect the following categories of personal information directly from you, only
                when you choose to share it with us:
              </p>
              <ul>
                <li>
                  <strong>Contact details</strong> &mdash; your name, work email, phone number, and
                  company name, submitted via the quote form or contact form.
                </li>
                <li>
                  <strong>Enquiry details</strong> &mdash; the occasion, team size, budget range, and
                  any additional notes you include with your request, along with the products you
                  add to your pack.
                </li>
                <li>
                  <strong>Communications</strong> &mdash; the content of any emails, WhatsApp
                  messages, or calls you exchange with our team, retained so that we have context
                  for follow-ups.
                </li>
              </ul>
              <p>
                We also collect a limited set of technical information automatically as you use the
                site, including your IP address (truncated for analytics), browser type, referring
                URL, pages visited, and approximate location at the city level. This is used to
                operate, secure, and improve the site.
              </p>
            </>
          ),
        },
        {
          heading: 'How we use your information',
          body: (
            <>
              <p>We use the personal information you share with us to:</p>
              <ul>
                <li>Respond to your enquiry, prepare a quote, and follow up on outstanding questions.</li>
                <li>Fulfil and deliver an order if you choose to place one with us.</li>
                <li>
                  Send transactional communications related to your enquiry or order &mdash; quote
                  confirmations, dispatch updates, invoices.
                </li>
                <li>Improve our products, processes, and the website itself.</li>
                <li>Comply with legal obligations (for example, tax and accounting records).</li>
              </ul>
              <p>
                We do not send marketing emails to people who have not asked to receive them. If you
                explicitly opt in to our newsletter, you can unsubscribe at any time.
              </p>
            </>
          ),
        },
        {
          heading: 'How we share information',
          body: (
            <>
              <p>
                We share your information only with the service providers that help us run MintBox,
                under contractual obligations that restrict their use of your data to providing the
                service to us:
              </p>
              <ul>
                <li>
                  <strong>Hosting and infrastructure</strong> &mdash; the cloud platform that runs
                  our website and database.
                </li>
                <li>
                  <strong>Email delivery</strong> &mdash; the transactional email provider we use
                  to send quote confirmations and respond to enquiries.
                </li>
                <li>
                  <strong>Payments and invoicing</strong> &mdash; if you transact with us, the
                  payment processor and accounting software handling that transaction.
                </li>
                <li>
                  <strong>Logistics</strong> &mdash; once you place an order, the courier or
                  logistics partner delivering the gifts receives the recipient name and address
                  required to ship the package.
                </li>
              </ul>
              <p>
                We may also disclose information when required by law, to enforce our agreements,
                or to protect the safety of our users.
              </p>
              <p>We do not sell, rent, or trade your personal information.</p>
            </>
          ),
        },
        {
          heading: 'Cookies and analytics',
          body: (
            <>
              <p>
                The site uses a small number of cookies and similar technologies for the following
                strictly-necessary purposes: keeping you signed in to the cart/pack, remembering
                your category filter preferences, and basic, privacy-respecting analytics to
                understand which pages are useful.
              </p>
              <p>
                We do not use third-party advertising cookies. You can clear or block cookies in
                your browser settings &mdash; the site will continue to function, though some
                preferences (like your cart contents) may not persist between visits.
              </p>
            </>
          ),
        },
        {
          heading: 'Data retention',
          body: (
            <>
              <p>
                We keep your personal information only for as long as we need it for the purposes
                described above:
              </p>
              <ul>
                <li>
                  <strong>Quote enquiries</strong> are retained for up to 24 months in case you
                  return with a follow-up. We will delete earlier on request.
                </li>
                <li>
                  <strong>Order and invoice records</strong> are kept for at least 7 years as
                  required under Indian tax and accounting law.
                </li>
                <li>
                  <strong>Email correspondence</strong> follows the same retention as the underlying
                  enquiry or order it relates to.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Your rights',
          body: (
            <>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you.</li>
                <li>Ask us to correct anything that is inaccurate or incomplete.</li>
                <li>
                  Ask us to delete your information, subject to record-keeping obligations we have
                  under Indian law.
                </li>
                <li>Withdraw consent for any communications you previously opted in to.</li>
              </ul>
              <p>
                To exercise any of these rights, email{' '}
                <a href="mailto:hello@themintbox.in">hello@themintbox.in</a> with your request. We
                will respond within 30 days.
              </p>
            </>
          ),
        },
        {
          heading: 'Security',
          body: (
            <>
              <p>
                We use industry-standard safeguards to protect your information: TLS encryption in
                transit, encrypted storage at rest, access controls for our team, and the
                production-grade security defaults of our hosting and email providers.
              </p>
              <p>
                No system is perfectly secure, but we take this seriously and review our
                practices regularly.
              </p>
            </>
          ),
        },
        {
          heading: 'Children',
          body: (
            <>
              <p>
                MintBox is a B2B corporate gifting service. The site is not directed at children
                under 18 and we do not knowingly collect information from anyone under 18.
              </p>
            </>
          ),
        },
        {
          heading: 'Changes to this policy',
          body: (
            <>
              <p>
                We may update this Privacy Policy from time to time to reflect changes to our
                practices or for legal reasons. We will update the &ldquo;Last updated&rdquo; date
                at the top of this page when we do. For material changes that affect how we use
                your information, we will give you reasonable advance notice.
              </p>
            </>
          ),
        },
        {
          heading: 'Contact us',
          body: (
            <>
              <p>
                If you have any questions or concerns about this policy or how we handle your
                information, please contact us:
              </p>
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
