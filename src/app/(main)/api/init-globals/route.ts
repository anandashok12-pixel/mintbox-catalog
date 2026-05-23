import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'mintbox-seed') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const results: string[] = []

    // Seed about page with full content
    try {
      await payload.updateGlobal({
        slug: 'about-page' as any,
        data: {
          hero: {
            titleLine1: 'We exist because',
            titleLine2: 'gifting deserved better.',
            manifesto: "The corporate gifting market doesn\u2019t have a product problem. It has a meaning problem. Every box that arrives late, every logo that peels, every invoice that doesn\u2019t match the quote \u2014 these aren\u2019t vendor failures. They\u2019re failures of care. MintBox exists to give every gift its meaning back.",
          },
          imageBanner: { caption: 'Every product is sourced, sampled, and physically evaluated before it earns a place in a MintBox.' },
          foundingStory: {
            label: 'The founding story',
            title: 'Born from a box that disappointed.',
            paragraph1: "It started with a bad experience. Not one bad experience \u2014 dozens of them. As a founder who had hired teams, managed vendors, and sat through more than a few uncomfortable conversations about why the Diwali gifts arrived three days late and with the wrong logo \u2014 we knew something was fundamentally broken about how corporate gifting worked in India.",
            pullQuote: "\u201CThe industry had hundreds of vendors. It had no one who actually cared about what happened when the box was opened.\u201D",
            paragraph2: "The problem wasn\u2019t a lack of products. India has extraordinary manufacturers, brilliant artisans, and a gifting culture that runs deep. The problem was the layer between \u2014 the opaque pricing, the outsourced branding, the \u201Cwe\u2019ll check with the courier\u201D non-answers, and the invoices that bore no resemblance to the quote.",
            paragraph3: "We started MintBox with a simple conviction: a premium corporate gift should work like a premium product. It should arrive on time. The logo should look exactly like the mockup. The invoice should match the quote. The person who opens it should feel \u2014 genuinely \u2014 that someone thought about them specifically.",
            paragraph4: "We launched in Bengaluru because this city \u2014 with its density of tech companies, its globally minded workforce, and its founders who understand what brand quality means \u2014 is the perfect place to build a gifting brand that holds itself to a higher standard.",
            paragraph5: "MintBox is still early. We\u2019re a small team, we\u2019re pre-launch, and we\u2019re building every process and every partnership from scratch with quality as the only non-negotiable. We won\u2019t ship a gift we wouldn\u2019t be proud to receive ourselves.",
          },
          whatBroke: {
            label: 'What we set out to fix',
            title: 'The five things that were broken before MintBox existed.',
            cards: [
              { num: '01', title: 'The invoice surprise', desc: 'Vendors quote one number, invoice another. We quote everything upfront. What you approve is what you pay.' },
              { num: '02', title: 'The peeling logo', desc: 'We keep artwork in-house, match every mockup, and physically inspect every batch before dispatch.' },
              { num: '03', title: 'The Diwali chaos', desc: 'We plan lead times honestly and track every delivery individually.' },
              { num: '04', title: 'The creativity plateau', desc: 'We curate with intention \u2014 matching products to brand personality, not just what\u2019s in stock.' },
              { num: '05', title: 'The remote gifting failure', desc: 'We built the tools to make individual address delivery effortless.' },
            ],
            closingCard: { title: 'MintBox is the answer to all five.', desc: 'Every process we have built exists to fix one of these five failures. Not as a feature. As a founding principle.' },
          },
          values: {
            label: 'Our commitments', titleLine1: 'Four things we', titleLine2: 'never compromise on.',
            subtitle: "These aren\u2019t values we put on a wall. They\u2019re the criteria every product, vendor, and process has to pass before it becomes part of MintBox.",
            items: [
              { num: '01', title: 'Craftsmanship', tag: 'Quality first', desc: 'Every product in our catalogue has been sourced, sampled, and physically evaluated.', example: '\u201CWe rejected three notebook suppliers before finding one whose debossing held to our spec.\u201D' },
              { num: '02', title: 'Transparency', tag: 'No surprises', desc: 'What you see on the quote is what appears on the invoice \u2014 line for line.', example: '\u201CWe have never billed a rupee that wasn\u2019t discussed upfront.\u201D' },
              { num: '03', title: 'Reliability', tag: 'On time, always', desc: 'We set honest lead times and track every individual shipment.', example: '\u201CWe plan every festive order with a minimum three-week buffer.\u201D' },
              { num: '04', title: 'Human connection', tag: 'People, not portals', desc: 'Every new client speaks to a person. Every enquiry gets a response from Anand personally.', example: '\u201CAnand picks up every WhatsApp. That won\u2019t change.\u201D' },
            ],
          },
          founder: {
            label: 'The person behind MintBox', title: 'Built by someone who felt the problem firsthand.',
            bioParagraph1: 'Anand Ashok is the Director of MintBox and the driving force behind its founding.',
            bioParagraph2: 'The frustration that became MintBox came from lived experience \u2014 managing gifting vendors, watching quality fall short of expectations.',
            email: 'anand@getmintbox.com', phone: '+91 9886537631', whatsappUrl: 'https://wa.me/919886537631',
            cardName: 'Anand Ashok', cardRole: 'Director, MintBox',
          },
          cta: {
            title: 'Work with a team that takes gifting seriously.',
            subtitle: 'Tell us about your occasion, your team size, and your budget.',
            primaryButtonLabel: 'Request a quote \u2192', primaryButtonUrl: '/contact',
            secondaryButtonLabel: 'Browse catalogue', secondaryButtonUrl: '/catalog',
          },
        },
      })
      results.push('about-page: seeded')
    } catch (e: any) { results.push('about-page: ' + e.message?.slice(0, 150)) }

    // Seed contact page
    try {
      await payload.updateGlobal({
        slug: 'contact-page' as any,
        data: {
          hero: { label: 'Get in touch', titleLine1: "Let's talk", titleLine2: 'about your team.', subtitle: "Whether you have a brief, a budget, or just a feeling, we\u2019d love to hear from you. Most enquiries get a response within 4 hours." },
          formInfo: {
            eyebrow: 'Send us a message', title: "We'd love to hear from you.",
            subtitle: 'Have a gifting requirement, a question about our catalogue, or just want to say hello? Fill in the form and Anand will get back to you personally.',
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
            phone: '+91 9886537631', email: 'anand@getmintbox.com',
            emailSubNote: 'Reply within 4 hours on business days',
            officeAddress: "2nd Floor, Building 16/2\nSobha Alexander Plaza\nAshok Nagar, Bengaluru 560025",
            mapLabel: 'Sobha Alexander Plaza, Ashok Nagar',
            mapSublabel: 'Commissariat Rd, Bengaluru 560025',
            whatsappUrl: 'https://wa.me/919886537631',
          },
        },
      })
      results.push('contact-page: seeded')
    } catch (e: any) { results.push('contact-page: ' + e.message?.slice(0, 150)) }

    // Seed FAQ page
    try {
      await payload.updateGlobal({
        slug: 'faq-page' as any,
        data: {
          hero: { eyebrow: 'Frequently asked questions', titleLine1: 'Everything you', titleLine2: 'need to know.', subtitle: "From minimum order quantities to branding quality and lead times \u2014 we\u2019ve answered the questions we hear most from HR teams, founders, and procurement leads." },
          categories: [
            { categoryId: 'ordering', title: 'Ordering & MOQ', desc: 'Minimum quantities, how to place an order, and what happens next', iconId: 'ordering', items: [
              { question: 'What is your minimum order quantity (MOQ)?', answer: 'Our standard MOQ is <strong>25 units</strong> per product.', searchText: 'minimum order quantity moq', tag: 'popular' },
              { question: 'How do I place an order?', answer: 'Start with a <strong>quote request</strong> via our form or WhatsApp.', searchText: 'how to place order', tag: 'none' },
            ]},
            { categoryId: 'branding', title: 'Branding & customisation', desc: 'Logo placement, printing methods, and quality guarantees', iconId: 'branding', items: [
              { question: 'What branding options do you offer?', answer: 'Laser engraving, UV printing, screen printing, embroidery, debossing.', searchText: 'branding options', tag: 'none' },
            ]},
            { categoryId: 'delivery', title: 'Delivery & logistics', desc: 'Shipping, tracking, and coverage', iconId: 'delivery', items: [
              { question: 'Can you deliver to individual home addresses?', answer: 'Yes \u2014 this is one of our core capabilities.', searchText: 'individual delivery', tag: 'popular' },
            ]},
            { categoryId: 'products', title: 'Products & catalogue', desc: 'What we carry and custom sourcing', iconId: 'products', items: [
              { question: 'How many products do you have?', answer: '<strong>200+ SKUs</strong> across all categories.', searchText: 'how many products', tag: 'none' },
            ]},
            { categoryId: 'pricing', title: 'Pricing & billing', desc: 'Pricing, GST, and payment terms', iconId: 'pricing', items: [
              { question: 'Are there any hidden charges?', answer: 'No. Quotes include <strong>everything</strong>.', searchText: 'hidden charges', tag: 'popular' },
            ]},
            { categoryId: 'esg', title: 'Sustainability & ESG', desc: 'Eco credentials and plastic-free options', iconId: 'sustainability', items: [
              { question: 'Do you have sustainable options?', answer: 'Yes \u2014 dedicated <strong>eco-friendly range</strong>.', searchText: 'sustainable eco', tag: 'new' },
            ]},
          ],
          stillQuestions: {
            title: "We're a WhatsApp message away.",
            subtitle: 'Anand picks up every WhatsApp personally. Most questions get a reply within 30 minutes.',
            contactCards: [
              { title: 'WhatsApp us directly', desc: 'Get In Touch \u2014 real answers, not templates.', linkText: '+91 9886537631 \u2192', linkUrl: 'https://wa.me/919886537631' },
              { title: 'Send us a message', desc: "We'll reply within 4 hours on business days.", linkText: 'anand@getmintbox.com \u2192', linkUrl: '/contact' },
            ],
          },
        },
      })
      results.push('faq-page: seeded')
    } catch (e: any) { results.push('faq-page: ' + e.message?.slice(0, 150)) }

    return NextResponse.json({ success: true, results })
  } catch (e: any) {
    return NextResponse.json({ error: e.message?.slice(0, 300) }, { status: 500 })
  }
}
