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
          seo: {
            metaTitle: 'About MintBox | Premium Corporate Gifting in India',
            metaDescription:
              'Learn why MintBox was built, what we stand for, and how we deliver premium corporate gifting with transparent pricing and reliable Pan-India fulfillment.',
          },
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
            email: 'hello@themintbox.in', phone: '+91 9886537631', whatsappUrl: 'https://wa.me/919886537631',
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
          seo: {
            metaTitle: 'Contact MintBox | Request a Corporate Gifting Quote',
            metaDescription:
              'Contact MintBox to plan onboarding kits, festive gifting, client gifts, and team hampers. Share your team size, occasion, and budget to get a curated quote.',
          },
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
            phone: '+91 9886537631', email: 'hello@themintbox.in',
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
          seo: {
            metaTitle: 'MintBox FAQ | Corporate Gifting, MOQ, Branding, Delivery',
            metaDescription:
              'Get answers to common corporate gifting questions - minimum order quantity, branding quality, timelines, delivery coverage, pricing, and customisation with MintBox.',
          },
          hero: { eyebrow: 'Frequently asked questions', titleLine1: 'Everything you', titleLine2: 'need to know.', subtitle: "From minimum order quantities to branding quality and lead times \u2014 we\u2019ve answered the questions we hear most from HR teams, founders, and procurement leads." },
          categories: [
            { categoryId: 'ordering', title: 'Ordering & MOQ', desc: 'Minimum quantities, how to place an order, and what happens next', iconId: 'ordering', items: [
              { question: 'What is your minimum order quantity (MOQ)?', answer: 'Our standard MOQ is <strong>25 units</strong> per product. For curated multi-product kits (e.g. an onboarding kit with 4 items), the MOQ applies to the kit as a whole \u2014 not each individual item inside. If you\'re a seed-stage startup with a smaller team, reach out to us directly \u2014 we accommodate smaller runs on a case-by-case basis, particularly for onboarding kits.', searchText: 'minimum order quantity moq', tag: 'popular' },
              { question: 'How do I place an order?', answer: 'You don\'t place an order directly \u2014 you start with a <strong>quote request</strong>. Fill the form on our website (or WhatsApp us directly), and we\'ll come back with a curated proposal within one business day. Once you approve the proposal and branding, we move to production. Payment is confirmed before production begins.', searchText: 'how to place order request a quote', tag: 'none' },
              { question: 'Can I mix different products in a single order?', answer: 'Yes \u2014 in fact, this is how most of our clients order. A typical onboarding kit might combine a branded water bottle, a notebook, a tote bag, and a gourmet snack box. We curate the combination, handle all branding across every item, and pack everything into a single premium gift box. The MOQ of 25 applies to the assembled kit.', searchText: 'mix products in one order kit', tag: 'none' },
              { question: 'How long does the whole process take \u2014 from enquiry to delivery?', answer: 'A typical order follows this timeline:<br /><br /><strong>Day 1\u20132:</strong> Enquiry \u2192 proposal from us<br /><strong>Day 3\u20134:</strong> Branding artwork approval<br /><strong>Day 5\u201318:</strong> Production (varies by product and quantity)<br /><strong>Day 19\u201321:</strong> Quality check + dispatch<br /><br />For standard orders of 25\u2013200 units, plan for <strong>3\u20134 weeks end-to-end</strong>. Large orders (500+) or rush requests \u2014 speak to us early and we\'ll plan accordingly. Diwali season adds 1\u20132 weeks \u2014 order by early September to be safe.', searchText: 'how long process inquiry to delivery', tag: 'popular' },
              { question: 'Can I reorder the same kit again later?', answer: 'Absolutely. We keep your branding files, kit configuration, and product specifications on record. Reorders skip the design and approval stage entirely \u2014 just tell us the quantity and delivery address and we go straight to production.', searchText: 'reorder the same kit again repeat order', tag: 'none' },
              { question: 'Do you offer samples before I commit to a full order?', answer: 'Yes, for orders above 100 units we provide a <strong>branded sample</strong> for your approval before bulk production. For smaller orders, we share high-resolution digital mockups showing your branding on each product. Samples are charged at cost and adjusted against your final invoice on confirmation.', searchText: 'samples before full order', tag: 'none' },
            ]},
            { categoryId: 'branding', title: 'Branding & customisation', desc: 'Logo placement, printing methods, and quality guarantees', iconId: 'branding', items: [
              { question: 'What branding options do you offer?', answer: 'We support all major branding techniques, matched to each product type:<br /><br /><strong>Laser engraving</strong> \u2014 metal bottles, power banks, pens, keychains<br /><strong>UV printing</strong> \u2014 hard-surface products, phone stands, coasters<br /><strong>Screen printing</strong> \u2014 tote bags, apparel, notebooks<br /><strong>Embroidery</strong> \u2014 caps, jackets, premium apparel<br /><strong>Debossing / Foil stamping</strong> \u2014 notebooks, leather goods, packaging<br /><br />We recommend the appropriate method for each product \u2014 never just default to whatever is cheapest.', searchText: 'branding options logo engraving printing', tag: 'none' },
              { question: 'How do I share my logo and brand files?', answer: 'Once you confirm the order, we\'ll share a simple briefing form where you upload your logo files (we accept AI, EPS, SVG, or high-resolution PNG) and specify brand colours (Pantone or hex codes). If you have a brand guideline document, send that too. Our in-house team handles the rest \u2014 we never outsource artwork preparation to third-party print shops.', searchText: 'share my logo artwork files brand guidelines', tag: 'none' },
              { question: "What if the branding quality isn't right?", answer: 'We stand behind our branding quality completely. Before dispatch, every order goes through a <strong>physical quality check</strong> \u2014 we inspect a sample from each batch for colour accuracy, print alignment, and finish durability. If anything doesn\'t meet the approved standard, we redo it. If a quality issue reaches you, we replace the affected items at no charge. No arguments, no conditions.', searchText: 'branding quality not right guarantee', tag: 'popular' },
              { question: 'Can I see how my logo will look before production starts?', answer: 'Yes, always. We create <strong>high-fidelity digital mockups</strong> for every product in your order before a single unit goes into production. You\'ll see your exact logo, in your exact colours, on each item \u2014 with placement dimensions. Production only begins after you give written approval.', searchText: 'see mockup before production digital preview', tag: 'none' },
              { question: 'Can gifts be personalised with individual recipient names?', answer: 'Yes \u2014 we offer <strong>individual name personalisation</strong> on selected products (notebooks, bottles, card inserts) for orders of 50+ units. This works especially well for onboarding kits where a hand-written-style name on the gift box creates a strong first impression. Share the name list with us in a spreadsheet and we handle the rest. There is a small per-unit surcharge for personalisation.', searchText: 'individual names personalisation each gift', tag: 'none' },
            ]},
            { categoryId: 'delivery', title: 'Delivery & logistics', desc: 'Shipping to multiple addresses, tracking, and coverage', iconId: 'delivery', items: [
              { question: 'Can you deliver to individual home addresses for remote employees?', answer: 'Yes \u2014 this is one of our core capabilities. We can ship each gift individually to hundreds of different addresses across India simultaneously. We\'ll share a simple address collection link you can send to your team \u2014 they fill it themselves and we import the data directly. No spreadsheet chasing, no manual data entry on your end.', searchText: 'individual home addresses remote employees wfh', tag: 'popular' },
              { question: 'Which cities do you deliver to?', answer: 'We deliver <strong>pan-India</strong> \u2014 all major metros and most tier-2 cities. Bengaluru deliveries are fastest (same-city courier, 1\u20132 days after dispatch). For the rest of India, standard courier transit is 3\u20135 business days depending on the destination.', searchText: 'cities deliver pan india coverage', tag: 'none' },
              { question: "Can I track my order after it's dispatched?", answer: 'Yes. Once dispatched, you receive a tracking link for every shipment \u2014 individual tracking per address for multi-location deliveries. We proactively flag any delivery exceptions rather than waiting for you to chase us.', searchText: 'track order real time shipment tracking', tag: 'none' },
              { question: 'What if a gift arrives damaged?', answer: 'We take full responsibility. Share a photo of the damage via WhatsApp or email and we\'ll arrange a replacement within 3\u20135 business days at no charge.', searchText: 'gift arrives damaged broken', tag: 'none' },
              { question: 'Do you ship internationally?', answer: 'Currently, we ship <strong>within India only</strong>. International shipping is on our roadmap for 2026. If you have an immediate need, reach out directly and we\'ll explore what\'s possible.', searchText: 'ship internationally outside india', tag: 'none' },
            ]},
            { categoryId: 'products', title: 'Products & catalogue', desc: 'What we carry, custom sourcing, and catalogue access', iconId: 'products', items: [
              { question: 'How many products do you have in your catalogue?', answer: 'We currently carry <strong>200+ SKUs</strong> across categories including drinkware, gourmet, stationery, tech, apparel, wellness, eco-friendly products, and premium packaging.', searchText: 'how many products catalogue skus', tag: 'none' },
              { question: "Can you source a product that isn't in your catalogue?", answer: 'Yes, for orders of 100+ units. Share a reference and we\'ll source, quality-check, and brand it. Custom sourcing adds 1\u20132 weeks.', searchText: 'source product not in catalogue custom', tag: 'none' },
              { question: 'Do you offer gourmet food and edible gifting options?', answer: 'Yes \u2014 gourmet and food gifting is one of our strongest categories, particularly for Diwali and New Year.', searchText: 'gourmet food edibles perishable gifts', tag: 'none' },
              { question: 'Can I browse the catalogue online?', answer: 'Yes \u2014 our full catalogue is available at <strong>themintbox.in/catalog</strong>. Browse by category, occasion, or budget range.', searchText: 'catalogue online browse products', tag: 'none' },
            ]},
            { categoryId: 'pricing', title: 'Pricing & billing', desc: "How we price, GST, payment terms, and what's included", iconId: 'pricing', items: [
              { question: 'Are there any hidden charges I should know about?', answer: 'No. Our quotes include <strong>everything</strong>: product cost, branding, quality check, packaging, and standard logistics. What you see on the quote is what appears on the invoice.', searchText: 'hidden charges logistics surcharge invoice', tag: 'popular' },
              { question: 'Do you provide GST-compliant invoices?', answer: 'Yes, always. Every invoice is fully GST-compliant with our GSTIN, HSN codes, and applicable tax breakdowns.', searchText: 'gst invoice tax compliant billing', tag: 'none' },
              { question: 'What are your payment terms?', answer: 'First-time orders: <strong>50% advance</strong> on confirmation, 50% before dispatch. Repeat clients: 30-day credit terms on request.', searchText: 'payment terms advance deposit', tag: 'none' },
              { question: 'Do you offer bulk discounts for large orders?', answer: 'Yes \u2014 pricing scales with volume. 100+ units receive a meaningful discount, 500+ get our most competitive rates.', searchText: 'bulk discounts volume pricing large orders', tag: 'none' },
            ]},
            { categoryId: 'esg', title: 'Sustainability & ESG', desc: 'Eco credentials, carbon tracking, and plastic-free options', iconId: 'sustainability', items: [
              { question: 'Do you have plastic-free and sustainable gifting options?', answer: 'Yes \u2014 we have a dedicated <strong>eco-friendly range</strong> including cork, bamboo, seed paper, jute bags, recycled notebooks, and plastic-free packaging.', searchText: 'plastic free sustainable eco friendly products', tag: 'new' },
              { question: 'Can you provide ESG documentation or a carbon footprint report?', answer: 'Currently we provide <strong>material sourcing documentation</strong> for eco-range products. Full carbon footprint reporting is on our 2026 roadmap.', searchText: 'esg carbon footprint report documentation', tag: 'none' },
            ]},
          ],
          stillQuestions: {
            title: "We're a WhatsApp message away.",
            subtitle: "If your question isn\u2019t here, Anand picks up every WhatsApp personally. Most questions get a reply within 30 minutes during business hours.",
            contactCards: [
              { title: 'WhatsApp us directly', desc: 'Get In Touch \u2014 Director at MintBox. Real answers, not templates.', linkText: '+91 9886537631 \u2192', linkUrl: 'https://wa.me/919886537631' },
              { title: 'Send us a message', desc: "Fill the contact form and we'll reply within 4 hours on business days.", linkText: 'hello@themintbox.in \u2192', linkUrl: '/contact' },
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
