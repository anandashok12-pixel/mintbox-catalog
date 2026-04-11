import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

/**
 * Temporary one-time seed endpoint.
 * Hit GET /api/seed-pages?secret=mintbox-seed to populate globals.
 * Delete this file after seeding.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'mintbox-seed') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })

  try {
    // About Page
    await payload.updateGlobal({
      slug: 'about-page',
      data: {
        hero: {
          titleLine1: 'We exist because',
          titleLine2: 'gifting deserved better.',
          manifesto: "The corporate gifting market doesn\u2019t have a product problem. It has a meaning problem. Every box that arrives late, every logo that peels, every invoice that doesn\u2019t match the quote \u2014 these aren\u2019t vendor failures. They\u2019re failures of care. MintBox exists to give every gift its meaning back.",
        },
        imageBanner: {
          caption: 'Every product is sourced, sampled, and physically evaluated before it earns a place in a MintBox.',
        },
        foundingStory: {
          label: 'The founding story',
          title: 'Born from a box that disappointed.',
          paragraph1: "It started with a bad experience. Not one bad experience \u2014 dozens of them. As a founder who had hired teams, managed vendors, and sat through more than a few uncomfortable conversations about why the Diwali gifts arrived three days late and with the wrong logo \u2014 we knew something was fundamentally broken about how corporate gifting worked in India.",
          pullQuote: "\u201CThe industry had hundreds of vendors. It had no one who actually cared about what happened when the box was opened.\u201D",
          paragraph2: "The problem wasn\u2019t a lack of products. India has extraordinary manufacturers, brilliant artisans, and a gifting culture that runs deep. The problem was the layer between \u2014 the opaque pricing, the outsourced branding, the \u201Cwe\u2019ll check with the courier\u201D non-answers, and the invoices that bore no resemblance to the quote.",
          paragraph3: "We started MintBox with a simple conviction: a premium corporate gift should work like a premium product. It should arrive on time. The logo should look exactly like the mockup. The invoice should match the quote. The person who opens it should feel \u2014 genuinely \u2014 that someone thought about them specifically.",
          paragraph4: "We launched in Bengaluru because this city \u2014 with its density of tech companies, its globally minded workforce, and its founders who understand what brand quality means \u2014 is the perfect place to build a gifting brand that holds itself to a higher standard. If we can earn the trust of teams building India\u2019s most ambitious companies, we\u2019ve done something worth doing.",
          paragraph5: "MintBox is still early. We\u2019re a small team, we\u2019re pre-launch, and we\u2019re building every process and every partnership from scratch with quality as the only non-negotiable. We won\u2019t ship a gift we wouldn\u2019t be proud to receive ourselves.",
        },
        whatBroke: {
          label: 'What we set out to fix',
          title: 'The five things that were broken before MintBox existed.',
          cards: [
            { num: '01', title: 'The invoice surprise', desc: 'Vendors quote one number, invoice another. Logistics surcharges, admin fees, and branding corrections appeared after approval \u2014 sometimes adding 20\u201330% to the cost. We quote everything upfront. What you approve is what you pay.' },
            { num: '02', title: 'The peeling logo', desc: 'Most vendors outsource branding to whoever is cheapest. Logos that shift, colours that drift, prints that peel after one wash. We keep artwork in-house, match every mockup, and physically inspect every batch before dispatch.' },
            { num: '03', title: 'The Diwali chaos', desc: 'Every October, HR teams across India chase vendors, follow up on missing shipments, and apologise to employees whose gifts arrived broken or not at all. We plan lead times honestly and track every delivery individually.' },
            { num: '04', title: 'The creativity plateau', desc: "Same mug. Same diary. Same power bank. Every vendor, every year, pulls from the same catalogue. We curate with intention \u2014 matching products to brand personality, not just what\u2019s in stock." },
            { num: '05', title: 'The remote gifting failure', desc: 'Post-2020, teams are everywhere. Collecting 200 individual addresses, managing missed deliveries, tracking each shipment \u2014 an administrative nightmare. We built the tools to make it effortless.' },
          ],
          closingCard: { title: 'MintBox is the answer to all five.', desc: 'Every process we have built \u2014 from branding in-house to transparent quoting to individual address delivery \u2014 exists to fix one of these five failures. Not as a feature. As a founding principle.' },
        },
        values: {
          label: 'Our commitments',
          titleLine1: 'Four things we',
          titleLine2: 'never compromise on.',
          subtitle: "These aren\u2019t values we put on a wall. They\u2019re the criteria every product, vendor, and process has to pass before it becomes part of MintBox. If something fails even one of these tests, we don\u2019t do it \u2014 no matter how convenient or profitable it might be.",
          items: [
            { num: '01', title: 'Craftsmanship', tag: 'Quality first', desc: "Every product in our catalogue has been sourced, sampled, and physically evaluated \u2014 not just browsed from a supplier PDF. We match every branding technique to the material it goes on, inspect every batch before dispatch, and maintain a standard we set ourselves rather than inherit from whoever is cheapest. The result is a gift that looks exactly like the mockup, every single time.", example: "\u201CWe rejected three notebook suppliers before finding one whose debossing held to our spec. That decision never appears on a quote \u2014 but it\u2019s exactly what you feel the moment you open the box.\u201D" },
            { num: '02', title: 'Transparency', tag: 'No surprises', desc: "What you see on the quote is what appears on the invoice \u2014 line for line. Products, branding, packaging, logistics, and GST are all itemised from the start. We don\u2019t bury costs, round up quietly, or introduce new charges at billing. If anything changes during an order, we tell you before it affects the price, not after. Trust in this industry is rare because honesty is rare. We\u2019re changing that.", example: "\u201CIf a product goes out of stock after quoting and the alternative costs more, we absorb the difference or present options clearly. We have never billed a rupee that wasn\u2019t discussed upfront.\u201D" },
            { num: '03', title: 'Reliability', tag: 'On time, always', desc: "A Diwali gift that arrives on December 3rd is not a Diwali gift. We set honest lead times at the start \u2014 never the optimistic ones \u2014 and we track every individual shipment rather than treating an order as done once it leaves our hands. If something goes wrong in transit, you hear from us before you have to ask.", example: "\u201CWe plan every festive order with a minimum three-week buffer. We would rather confirm a later date and deliver early than promise a date we can\u2019t keep.\u201D" },
            { num: '04', title: 'Human connection', tag: 'People, not portals', desc: "A gift is a human act \u2014 it says that someone thought of you specifically. We never let that get lost in a process. Every new client speaks to a person. Every enquiry gets a response from Anand personally. Every order has someone accountable for it by name, not a ticket number.", example: "\u201CAnand picks up every WhatsApp. That won\u2019t change when we\u2019re at ten times the order volume. The moment it does, we\u2019ll have stopped being MintBox.\u201D" },
          ],
        },
        founder: {
          label: 'The person behind MintBox',
          title: 'Built by someone who felt the problem firsthand.',
          bioParagraph1: "Anand Ashok is the Director of MintBox and the driving force behind its founding. With a background spanning brand-building, web development, and product strategy, Anand has spent years working with early-stage startups and established companies through Quixta Ventures \u2014 his design and development firm based in Bengaluru.",
          bioParagraph2: "The frustration that became MintBox came from lived experience \u2014 managing gifting vendors, watching quality fall short of expectations, and spending hours chasing suppliers during Diwali season instead of running a business. MintBox is his attempt to build the gifting company he wished had existed.",
          email: 'anand@getmintbox.com', phone: '+91 86182 37189', whatsappUrl: 'https://wa.me/918618237189',
          cardName: 'Anand Ashok', cardRole: 'Director, MintBox',
        },
        cta: {
          title: 'Work with a team that takes gifting seriously.',
          subtitle: "Tell us about your occasion, your team size, and your budget. We\u2019ll come back with a curated proposal \u2014 products, branding, and pricing \u2014 within one business day.",
          primaryButtonLabel: 'Request a quote \u2192', primaryButtonUrl: '/contact',
          secondaryButtonLabel: 'Browse catalogue', secondaryButtonUrl: '/catalog',
        },
      },
    })

    // Contact Page
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        hero: { label: 'Get in touch', titleLine1: "Let's talk", titleLine2: 'about your team.', subtitle: "Whether you have a brief, a budget, or just a feeling, we\u2019d love to hear from you. Most enquiries get a response within 4 hours." },
        formInfo: {
          eyebrow: 'Send us a message', title: "We'd love to hear from you.",
          subtitle: "Have a gifting requirement, a question about our catalogue, or just want to say hello? Fill in the form and Anand will get back to you personally.",
          promises: [
            { bold: '4-hour response', desc: 'On all business day enquiries' },
            { bold: 'No commitment', desc: 'Just a conversation to start' },
            { bold: 'No hidden costs', desc: 'Transparent quotes every time' },
          ],
        },
        formConfig: {
          occasionOptions: [
            { label: 'Employee onboarding kits', value: 'Employee onboarding kits' },
            { label: 'Diwali & festive gifting', value: 'Diwali & festive gifting' },
            { label: 'Client appreciation', value: 'Client appreciation' },
            { label: 'Work anniversary gifts', value: 'Work anniversary gifts' },
            { label: 'Conference & event swag', value: 'Conference & event swag' },
            { label: 'New Year gifts', value: 'New Year gifts' },
            { label: 'Custom / other', value: 'Custom / other' },
          ],
          teamSizeOptions: [
            { label: 'Under 25', value: 'Under 25' },
            { label: '25 to 100', value: '25 to 100' },
            { label: '100 to 500', value: '100 to 500' },
            { label: '500+', value: '500+' },
          ],
          budgetOptions: [
            { label: 'Under \u20B9500', value: 'Under \u20B9500' },
            { label: '\u20B9500 \u2013 \u20B91,500', value: '\u20B9500 \u2013 \u20B91,500' },
            { label: '\u20B91,500 \u2013 \u20B93,500', value: '\u20B91,500 \u2013 \u20B93,500' },
            { label: '\u20B93,500 \u2013 \u20B98,000', value: '\u20B93,500 \u2013 \u20B98,000' },
            { label: '\u20B98,000+', value: '\u20B98,000+' },
          ],
          successTitle: 'Message sent!',
          successMessage: 'Anand will get back to you within 4 hours on business days.',
        },
        contactDetails: {
          phone: '+91 86182 37189', email: 'anand@getmintbox.com',
          emailSubNote: 'Reply within 4 hours on business days',
          officeAddress: "2nd Floor, Building 16/2\nSobha Alexander Plaza\nAshok Nagar, Bengaluru 560025",
          mapLabel: 'Sobha Alexander Plaza, Ashok Nagar',
          mapSublabel: 'Commissariat Rd, Bengaluru 560025',
          whatsappUrl: 'https://wa.me/918618237189',
        },
      },
    })

    // FAQ Page
    await payload.updateGlobal({
      slug: 'faq-page',
      data: {
        hero: { eyebrow: 'Frequently asked questions', titleLine1: 'Everything you', titleLine2: 'need to know.', subtitle: "From minimum order quantities to branding quality and lead times \u2014 we\u2019ve answered the questions we hear most from HR teams, founders, and procurement leads." },
        categories: [
          { categoryId: 'ordering', title: 'Ordering & MOQ', desc: 'Minimum quantities, how to place an order, and what happens next', iconId: 'ordering', items: [
            { question: 'What is your minimum order quantity (MOQ)?', answer: 'Our standard MOQ is <strong>25 units</strong> per product.', searchText: 'what is your minimum order quantity moq', tag: 'popular' },
            { question: 'How do I place an order?', answer: 'Start with a <strong>quote request</strong>. Fill the form or WhatsApp us.', searchText: 'how do i place an order', tag: 'none' },
            { question: 'Can I mix different products in a single order?', answer: 'Yes \u2014 this is how most clients order.', searchText: 'can i mix products', tag: 'none' },
            { question: 'How long does the whole process take?', answer: 'Plan for <strong>3\u20134 weeks end-to-end</strong>.', searchText: 'how long does it take', tag: 'popular' },
            { question: 'Can I reorder the same kit again later?', answer: 'Absolutely. Reorders skip design and approval.', searchText: 'can i reorder', tag: 'none' },
            { question: 'Do you offer samples?', answer: 'Yes, for orders above 100 units.', searchText: 'do you offer samples', tag: 'none' },
          ]},
          { categoryId: 'branding', title: 'Branding & customisation', desc: 'Logo placement, printing methods, and quality guarantees', iconId: 'branding', items: [
            { question: 'What branding options do you offer?', answer: 'Laser engraving, UV printing, screen printing, embroidery, debossing.', searchText: 'branding options', tag: 'none' },
            { question: 'How do I share my logo?', answer: 'We accept AI, EPS, SVG, or high-resolution PNG.', searchText: 'share logo', tag: 'none' },
            { question: "What if the branding quality isn't right?", answer: 'We replace affected items at no charge.', searchText: 'branding quality', tag: 'popular' },
            { question: 'Can I see a mockup before production?', answer: 'Yes, always. <strong>High-fidelity digital mockups</strong> for every product.', searchText: 'mockup preview', tag: 'none' },
            { question: 'Can gifts be personalised with names?', answer: 'Yes \u2014 for orders of 50+ units.', searchText: 'personalisation names', tag: 'none' },
          ]},
          { categoryId: 'delivery', title: 'Delivery & logistics', desc: 'Shipping to multiple addresses, tracking, and coverage', iconId: 'delivery', items: [
            { question: 'Can you deliver to individual home addresses?', answer: 'Yes \u2014 this is one of our core capabilities.', searchText: 'individual home addresses', tag: 'popular' },
            { question: 'Which cities do you deliver to?', answer: 'We deliver <strong>pan-India</strong>.', searchText: 'cities deliver', tag: 'none' },
            { question: 'Can I track my order?', answer: 'Yes, tracking link for every shipment.', searchText: 'track order', tag: 'none' },
            { question: 'What if a gift arrives damaged?', answer: 'We replace within 3\u20135 business days at no charge.', searchText: 'damaged', tag: 'none' },
            { question: 'Do you ship internationally?', answer: 'Currently <strong>India only</strong>. International on roadmap for 2026.', searchText: 'international', tag: 'none' },
          ]},
          { categoryId: 'products', title: 'Products & catalogue', desc: 'What we carry, custom sourcing, and catalogue access', iconId: 'products', items: [
            { question: 'How many products do you have?', answer: '<strong>200+ SKUs</strong> across all categories.', searchText: 'how many products', tag: 'none' },
            { question: 'Can you source custom products?', answer: 'Yes, for orders of 100+ units.', searchText: 'custom source', tag: 'none' },
            { question: 'Do you offer gourmet food options?', answer: 'Yes \u2014 one of our strongest categories.', searchText: 'gourmet food', tag: 'none' },
            { question: 'Can I browse the catalogue online?', answer: 'Yes \u2014 at <strong>getmintbox.com/catalogue</strong>.', searchText: 'browse catalogue', tag: 'none' },
          ]},
          { categoryId: 'pricing', title: 'Pricing & billing', desc: "How we price, GST, payment terms, and what's included", iconId: 'pricing', items: [
            { question: 'Are there any hidden charges?', answer: 'No. Quotes include <strong>everything</strong>.', searchText: 'hidden charges', tag: 'popular' },
            { question: 'Do you provide GST-compliant invoices?', answer: 'Yes, always. Fully GST-compliant.', searchText: 'gst invoice', tag: 'none' },
            { question: 'What are your payment terms?', answer: '<strong>50% advance</strong>, 50% before dispatch.', searchText: 'payment terms', tag: 'none' },
            { question: 'Do you offer bulk discounts?', answer: 'Yes \u2014 pricing scales with volume.', searchText: 'bulk discounts', tag: 'none' },
          ]},
          { categoryId: 'esg', title: 'Sustainability & ESG', desc: 'Eco credentials, carbon tracking, and plastic-free options', iconId: 'sustainability', items: [
            { question: 'Do you have sustainable gifting options?', answer: 'Yes \u2014 dedicated <strong>eco-friendly range</strong>.', searchText: 'sustainable eco', tag: 'new' },
            { question: 'Can you provide ESG documentation?', answer: 'Material sourcing docs available now. Full carbon reporting on roadmap.', searchText: 'esg documentation', tag: 'none' },
          ]},
        ],
        stillQuestions: {
          title: "We're a WhatsApp message away.",
          subtitle: "If your question isn\u2019t here, Anand picks up every WhatsApp personally. Most questions get a reply within 30 minutes during business hours.",
          contactCards: [
            { title: 'WhatsApp us directly', desc: 'Chat with Anand \u2014 Director at MintBox. Real answers, not templates.', linkText: '+91 86182 37189 \u2192', linkUrl: 'https://wa.me/918618237189' },
            { title: 'Send us a message', desc: "Fill the contact form and we'll reply within 4 hours on business days.", linkText: 'anand@getmintbox.com \u2192', linkUrl: '/contact' },
          ],
        },
      },
    })

    return NextResponse.json({ success: true, message: 'All 3 globals seeded' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
