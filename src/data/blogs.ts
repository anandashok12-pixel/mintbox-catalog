export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'hr' }
  | { type: 'ul'; items: string[] }
  | { type: 'bold-p'; text: string }

export interface Blog {
  slug: string
  title: string
  category: string
  categoryClass: string
  readTime: string
  excerpt: string
  date: string
  content: ContentBlock[]
}

export const blogs: Blog[] = [
  {
    slug: 'corporate-gifting-is-broken',
    title: "Corporate Gifting Is Broken. Here's What Companies Are Getting Wrong",
    category: 'Gifting Strategy',
    categoryClass: 'cat-guide',
    readTime: '8 min read',
    date: 'March 2025',
    excerpt:
      'Walk into most offices and ask someone about the last corporate gift they received. You will usually get one of three reactions.',
    content: [
      {
        type: 'p',
        text: 'Walk into most offices and ask someone about the last corporate gift they received. You will usually get one of three reactions. They do not remember it. They vaguely recall a box but not what was inside. Or they smile politely and say it is still lying unopened somewhere at home.',
      },
      {
        type: 'p',
        text: 'That is the reality of corporate gifting today. It exists. It costs money. It rarely creates any real impact.',
      },
      {
        type: 'p',
        text: 'The issue is not a lack of options. There are thousands of vendors, catalogs, and products available. The issue is that most companies approach gifting as a transaction, not as an experience.',
      },
      {
        type: 'p',
        text: 'If you are leading HR, marketing, or even running a company, this matters more than it seems.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'The real problem is not the gift. It is the intent behind it' },
      { type: 'p', text: 'Most corporate gifting decisions are made under constraints.' },
      {
        type: 'p',
        text: 'A budget is allocated. A deadline is fixed. A vendor is selected. A list is shared. Boxes are shipped.',
      },
      {
        type: 'p',
        text: 'Everything is optimized for completion, not for impact.',
      },
      {
        type: 'p',
        text: 'That is why most gifts feel interchangeable. A t-shirt, a bottle, a notebook, maybe some snacks. The combination changes, but the feeling does not.',
      },
      {
        type: 'p',
        text: 'The recipient can tell when something has been assembled quickly versus when it has been thought through. Even if they cannot explain it, they feel it.',
      },
      { type: 'p', text: 'And that feeling shapes how they perceive your company.' },
      { type: 'hr' },
      { type: 'h3', text: 'Gifting is not a cost center. It is a perception lever' },
      {
        type: 'p',
        text: "A new hire's first physical interaction with your brand is often their onboarding kit.",
      },
      {
        type: 'p',
        text: "A client's first tangible experience of your company may be a welcome or festive gift.",
      },
      {
        type: 'p',
        text: "An employee's milestone or recognition moment is often marked through something you send them.",
      },
      {
        type: 'p',
        text: 'Each of these moments carries meaning. Or at least, it should.',
      },
      {
        type: 'p',
        text: 'When gifting is done well, it reinforces culture, signals quality, and builds emotional connection. When it is done poorly, it does the opposite. It signals that the company did the bare minimum.',
      },
      {
        type: 'p',
        text: 'That gap between intent and execution is where most companies fall short.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'Why most gifting vendors fail to solve this' },
      {
        type: 'p',
        text: 'If you look at the market, most vendors fall into one of three buckets.',
      },
      {
        type: 'p',
        text: 'The first is bulk suppliers. They focus on volume. Large catalogs, low customization depth, fast turnaround. This works for scale, but rarely for experience.',
      },
      {
        type: 'p',
        text: 'The second is print and merchandise vendors. They are good at putting logos on products. But branding is not just about placement. It is about how everything comes together as a cohesive experience.',
      },
      {
        type: 'p',
        text: 'The third is online platforms that focus on rewards and vouchers. These remove operational friction, but they also remove the physical and emotional aspect of gifting.',
      },
      {
        type: 'p',
        text: 'None of these are inherently wrong. They just solve a different problem.',
      },
      {
        type: 'p',
        text: 'If your goal is to make gifting feel meaningful, you need a different approach.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'What great companies do differently' },
      {
        type: 'p',
        text: 'Companies that get gifting right think about it in layers.',
      },
      {
        type: 'bold-p',
        text: '1. They design for the moment, not the items',
      },
      {
        type: 'p',
        text: 'Instead of asking "what should we include", they ask "how should this feel when someone opens it".',
      },
      {
        type: 'p',
        text: 'That shift changes everything. Packaging, sequencing, messaging, and product selection all start aligning toward a single experience.',
      },
      { type: 'bold-p', text: '2. They align gifting with their brand' },
      {
        type: 'p',
        text: 'A premium brand sending a low-quality kit creates confusion. A design-led company sending something generic weakens its identity.',
      },
      {
        type: 'p',
        text: 'The best companies treat gifting as an extension of their brand system. Colors, materials, typography, and tone all feel consistent.',
      },
      { type: 'bold-p', text: '3. They care about timing and delivery' },
      {
        type: 'p',
        text: 'A welcome kit that arrives a week late loses its purpose. A festival gift that shows up after the occasion feels like an afterthought.',
      },
      {
        type: 'p',
        text: 'Operational reliability is not separate from experience. It is part of it.',
      },
      { type: 'bold-p', text: '4. They remove internal friction' },
      {
        type: 'p',
        text: 'HR teams should not spend hours coordinating addresses, tracking shipments, and fixing errors. Marketing teams should not chase vendors for quality control.',
      },
      { type: 'p', text: 'When the backend is smooth, the front-end experience improves.' },
      { type: 'hr' },
      { type: 'h3', text: 'From gift to gesture' },
      { type: 'p', text: 'There is a simple way to think about this.' },
      { type: 'p', text: 'A gift is something you send.' },
      { type: 'p', text: 'A gesture is something someone remembers.' },
      { type: 'p', text: 'The difference lies in intention, design, and execution.' },
      {
        type: 'p',
        text: 'A box with random items is a gift. A carefully curated experience that reflects your company\'s thinking is a gesture.',
      },
      { type: 'p', text: 'One gets acknowledged. The other gets talked about.' },
      { type: 'hr' },
      { type: 'h3', text: 'The hidden cost of getting it wrong' },
      { type: 'p', text: 'Poor gifting does not just waste money. It creates silent damage.' },
      { type: 'p', text: 'New hires form weaker first impressions.' },
      { type: 'p', text: 'Employees feel less valued than intended.' },
      {
        type: 'p',
        text: 'Clients see inconsistency between what you say and what you do.',
      },
      {
        type: 'p',
        text: 'And perhaps most importantly, you miss an opportunity to create moments that people carry with them.',
      },
      {
        type: 'p',
        text: 'In a world where attention is limited and experiences are shared instantly, these moments matter more than ever.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'A better way to think about corporate gifting' },
      {
        type: 'p',
        text: 'If you are rethinking your approach, start with a few simple questions.',
      },
      {
        type: 'ul',
        items: [
          'What should the recipient feel when they receive this',
          'What does this say about our company without using words',
          'Would we be proud if this was shared publicly',
          'Is the experience consistent from packaging to delivery',
        ],
      },
      { type: 'p', text: 'These questions are more useful than any product list.' },
      {
        type: 'p',
        text: 'Because gifting is not about finding better items. It is about creating better experiences.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'Where the shift is happening' },
      {
        type: 'p',
        text: 'More companies are starting to treat gifting as part of their culture and brand strategy, not just an operational task.',
      },
      {
        type: 'p',
        text: 'They are investing in design, in sourcing, in packaging, and in systems that make execution reliable.',
      },
      {
        type: 'p',
        text: 'They are also measuring outcomes differently. Not just cost per unit, but response, engagement, and retention.',
      },
      { type: 'p', text: 'This is where the space is evolving.' },
      { type: 'hr' },
      { type: 'h3', text: 'Closing thought' },
      {
        type: 'p',
        text: 'Corporate gifting is not broken because companies do not care. It is broken because the process has been reduced to a checklist.',
      },
      { type: 'p', text: 'The opportunity is to rebuild it with intention.' },
      {
        type: 'p',
        text: 'When done right, a simple box can do what emails, decks, and campaigns often cannot. It can make someone feel genuinely valued.',
      },
      { type: 'p', text: 'And that is something people remember.' },
    ],
  },

  {
    slug: 'employee-onboarding-kits',
    title: 'Employee Onboarding Kits: What Great Companies Do Differently',
    category: 'Onboarding',
    categoryClass: 'cat-occasion',
    readTime: '6 min read',
    date: 'March 2025',
    excerpt:
      "A new hire's first week is full of signals. Some are obvious. But one signal often gets overlooked — the physical experience of joining.",
    content: [
      { type: 'p', text: "A new hire's first week is full of signals." },
      {
        type: 'p',
        text: 'Some are obvious. The team they meet. The tools they get access to. The clarity of communication. But one signal often gets overlooked. The physical experience of joining.',
      },
      {
        type: 'p',
        text: "For many employees, their onboarding kit is the first tangible interaction with the company. It shows up at their home or desk before they have formed any real opinion. That moment carries more weight than most companies realize.",
      },
      {
        type: 'p',
        text: 'Yet in many cases, onboarding kits are treated as a checklist item. Order some merchandise. Add the logo. Ship it out.',
      },
      {
        type: 'p',
        text: 'The difference between an average onboarding kit and a thoughtful one is not budget. It is intent, design, and execution.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'Why onboarding kits matter more than they seem' },
      {
        type: 'p',
        text: 'The first few days of a new job shape how someone feels about their decision to join.',
      },
      {
        type: 'p',
        text: 'If everything feels organized, considered, and aligned, they settle in faster. If things feel rushed or inconsistent, it creates doubt.',
      },
      {
        type: 'p',
        text: 'An onboarding kit does not define the entire experience. But it acts as a strong signal. It tells the employee what level of detail and care they can expect from the company.',
      },
      {
        type: 'p',
        text: 'It also sets the tone for culture. Is this a company that pays attention? Does it value quality? Does it think through experiences end to end?',
      },
      { type: 'p', text: 'These are not abstract ideas. People infer them from small things.' },
      { type: 'hr' },
      { type: 'h3', text: 'Common mistakes companies make' },
      {
        type: 'p',
        text: 'Before looking at what works, it helps to understand what usually goes wrong.',
      },
      { type: 'bold-p', text: '1. Treating it as merchandise, not experience' },
      {
        type: 'p',
        text: 'Most kits are built by selecting items from a catalog. A t-shirt, a bottle, a notebook. The focus is on what goes inside, not how it comes together.',
      },
      { type: 'p', text: 'This often leads to kits that feel generic.' },
      { type: 'bold-p', text: '2. Poor timing' },
      {
        type: 'p',
        text: 'A kit that arrives late defeats its purpose. If a new hire joins on Monday and receives their kit the following week, the moment is lost.',
      },
      { type: 'p', text: 'Timing is part of the experience.' },
      { type: 'bold-p', text: '3. Inconsistent branding' },
      {
        type: 'p',
        text: 'Logos that are off-color, materials that do not match the brand, packaging that feels disconnected. These small inconsistencies add up.',
      },
      {
        type: 'p',
        text: 'They create a subtle sense that things are not fully thought through.',
      },
      { type: 'bold-p', text: '4. Operational friction' },
      {
        type: 'p',
        text: 'HR teams spending hours collecting addresses, coordinating with vendors, tracking shipments, and handling issues. This usually leads to errors and delays.',
      },
      {
        type: 'p',
        text: 'And when the process is messy internally, it shows externally.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'What great companies do differently' },
      {
        type: 'p',
        text: 'Companies that get onboarding kits right approach them as a designed experience.',
      },
      { type: 'bold-p', text: '1. They start with the feeling' },
      {
        type: 'p',
        text: 'Instead of asking what items to include, they ask how the new hire should feel.',
      },
      { type: 'p', text: 'Welcome. Excited. Confident in their decision.' },
      { type: 'p', text: 'Every choice then supports that outcome.' },
      { type: 'bold-p', text: '2. They design the unboxing experience' },
      {
        type: 'p',
        text: 'The order in which things are seen matters. The packaging matters. The messaging matters.',
      },
      {
        type: 'p',
        text: 'A well-designed kit feels intentional from the moment it is opened. It does not feel like a collection of items. It feels like a cohesive experience.',
      },
      { type: 'bold-p', text: '3. They align with brand identity' },
      {
        type: 'p',
        text: "Colors, materials, tone of voice, and overall aesthetic reflect the company's brand.",
      },
      {
        type: 'p',
        text: 'A premium company sends a premium kit. A design-led company pays attention to detail. A sustainability-focused company reflects that in sourcing and packaging.',
      },
      { type: 'p', text: 'There is no mismatch.' },
      { type: 'bold-p', text: '4. They think about usability' },
      { type: 'p', text: 'The best kits include items that people actually use.' },
      {
        type: 'p',
        text: 'Not everything needs to be branded heavily. In fact, subtle branding often works better. It makes the product feel more personal and less like promotional merchandise.',
      },
      { type: 'bold-p', text: '5. They build reliable systems behind it' },
      {
        type: 'p',
        text: 'Address collection, inventory management, shipping, and tracking are handled smoothly.',
      },
      {
        type: 'p',
        text: 'This reduces internal effort and ensures consistency across every new hire.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'What should go into a great onboarding kit' },
      {
        type: 'p',
        text: 'There is no fixed list, but there are some principles.',
      },
      {
        type: 'ul',
        items: [
          'Include a mix of functional and thoughtful items',
          'Avoid overloading the box with too many things',
          'Focus on quality over quantity',
          'Add a personal touch, even if it is small',
        ],
      },
      { type: 'p', text: 'A typical high-quality kit might include:' },
      {
        type: 'ul',
        items: [
          'A well-designed welcome note',
          'One or two premium everyday items',
          'Something that reflects company culture',
          'Packaging that ties everything together',
        ],
      },
      {
        type: 'p',
        text: 'The goal is not to impress with volume. It is to create a clear, memorable experience.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'The operational side is just as important' },
      {
        type: 'p',
        text: 'Even the best-designed kit fails if execution is poor.',
      },
      {
        type: 'p',
        text: 'Reliable delivery, correct addresses, consistent quality, and proper tracking all contribute to the overall experience.',
      },
      {
        type: 'p',
        text: 'This is where many companies struggle. The creative side gets attention, but the operational side is underestimated.',
      },
      { type: 'p', text: 'In reality, both are equally important.' },
      { type: 'hr' },
      { type: 'h3', text: 'Measuring impact' },
      {
        type: 'p',
        text: 'Most companies do not measure the impact of onboarding kits. They see it as a fixed cost.',
      },
      { type: 'p', text: 'But there are clear signals to look at.' },
      {
        type: 'ul',
        items: [
          'Feedback from new hires',
          'Early engagement levels',
          'Retention in the first few months',
          'Organic sharing or mentions',
        ],
      },
      {
        type: 'p',
        text: 'These indicators help understand whether the kit is doing its job.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'Closing thought' },
      {
        type: 'p',
        text: 'An onboarding kit is not just a welcome package. It is a statement.',
      },
      {
        type: 'p',
        text: 'It tells a new hire what kind of company they have joined, without needing a presentation or a speech.',
      },
      {
        type: 'p',
        text: 'When done well, it reinforces their decision. It makes them feel considered. It sets the tone for everything that follows.',
      },
      { type: 'p', text: 'And that is worth getting right.' },
    ],
  },

  {
    slug: 'how-to-choose-a-corporate-gifting-vendor',
    title: 'How to Choose a Corporate Gifting Vendor Without Regretting It Later',
    category: 'Vendor Guide',
    categoryClass: 'cat-case',
    readTime: '5 min read',
    date: 'April 2025',
    excerpt:
      'Choosing a corporate gifting vendor seems straightforward at first. But many teams realize later that the decision was more complex than it appeared.',
    content: [
      {
        type: 'p',
        text: 'Choosing a corporate gifting vendor seems straightforward at first.',
      },
      {
        type: 'p',
        text: 'You compare catalogs, check prices, maybe request a sample, and move forward.',
      },
      {
        type: 'p',
        text: 'But many teams realize later that the decision was more complex than it appeared.',
      },
      {
        type: 'p',
        text: 'Delays, inconsistent quality, hidden costs, and coordination issues start to show up. What looked simple becomes time-consuming.',
      },
      {
        type: 'p',
        text: 'This usually happens because the selection process focused on the wrong factors.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'Why vendor selection often goes wrong' },
      {
        type: 'p',
        text: 'Most teams evaluate vendors based on visible attributes.',
      },
      { type: 'p', text: 'Price per unit. Range of products. Turnaround time.' },
      { type: 'p', text: 'These are important, but they do not tell the full story.' },
      {
        type: 'p',
        text: 'Corporate gifting is not just about sourcing products. It involves design, customization, logistics, and reliability.',
      },
      { type: 'p', text: 'If any of these break down, the entire experience suffers.' },
      { type: 'hr' },
      { type: 'h3', text: 'What to evaluate instead' },
      { type: 'p', text: 'A better approach is to look at a few deeper factors.' },
      { type: 'bold-p', text: '1. Experience quality, not just product quality' },
      { type: 'p', text: 'Ask to see complete kits, not individual items.' },
      {
        type: 'p',
        text: 'How does everything come together. Does it feel cohesive. Is the packaging aligned with the brand.',
      },
      { type: 'p', text: 'A good product does not guarantee a good experience.' },
      { type: 'bold-p', text: '2. Consistency at scale' },
      {
        type: 'p',
        text: 'It is easy to deliver quality for small quantities. It is harder to maintain it across hundreds or thousands of units.',
      },
      { type: 'p', text: 'Ask about past projects of similar scale.' },
      { type: 'p', text: 'Consistency is what matters.' },
      { type: 'bold-p', text: '3. Customization capability' },
      { type: 'p', text: 'Can the vendor adapt to your brand requirements.' },
      {
        type: 'p',
        text: 'This includes colors, materials, packaging, and messaging.',
      },
      { type: 'p', text: 'Limited flexibility often leads to compromises.' },
      { type: 'bold-p', text: '4. Operational reliability' },
      {
        type: 'p',
        text: 'This is one of the most important and most overlooked aspects.',
      },
      {
        type: 'p',
        text: 'How are addresses collected. How are shipments tracked. What happens if something goes wrong.',
      },
      {
        type: 'p',
        text: 'A vendor with strong systems will reduce internal effort significantly.',
      },
      { type: 'bold-p', text: '5. Transparency in pricing' },
      { type: 'p', text: 'Hidden costs are common in this space.' },
      { type: 'p', text: 'Logistics charges, packaging add-ons, handling fees.' },
      {
        type: 'p',
        text: 'Clear, upfront pricing builds trust and avoids surprises later.',
      },
      { type: 'bold-p', text: '6. Compliance and documentation' },
      { type: 'p', text: 'For larger companies, this is critical.' },
      {
        type: 'p',
        text: 'GST compliance, proper invoicing, and if relevant, ESG documentation.',
      },
      { type: 'p', text: 'These are not optional in many organizations.' },
      { type: 'hr' },
      { type: 'h3', text: 'Questions worth asking before you decide' },
      {
        type: 'p',
        text: 'Instead of generic questions, focus on specifics.',
      },
      {
        type: 'ul',
        items: [
          'Can you walk me through a recent project end to end',
          'How do you handle address collection and validation',
          'What is your process for quality control',
          'How do you ensure consistency across large orders',
          'What happens if a shipment is delayed or lost',
        ],
      },
      { type: 'p', text: 'The answers will reveal more than any brochure.' },
      { type: 'hr' },
      { type: 'h3', text: 'Red flags to watch for' },
      {
        type: 'p',
        text: 'There are a few signs that usually indicate future issues.',
      },
      {
        type: 'ul',
        items: [
          'Over-promising on timelines without clear processes',
          'Lack of clarity on pricing components',
          'Inability to show past work in detail',
          'Heavy focus on catalogs without discussion of experience',
        ],
      },
      {
        type: 'p',
        text: 'These may not seem critical at first, but they often lead to problems later.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'The importance of alignment' },
      { type: 'p', text: 'Beyond capabilities, alignment matters.' },
      { type: 'p', text: 'Does the vendor understand what you are trying to achieve.' },
      {
        type: 'p',
        text: 'Are they thinking in terms of experience, not just products.',
      },
      { type: 'p', text: 'Do they ask the right questions.' },
      {
        type: 'p',
        text: 'A vendor who aligns with your intent will make better decisions throughout the process.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'Thinking long term' },
      { type: 'p', text: 'Corporate gifting is rarely a one-time activity.' },
      {
        type: 'p',
        text: 'Onboarding, client engagement, events, milestones. These happen throughout the year.',
      },
      {
        type: 'p',
        text: 'Choosing the right vendor can turn this into a smooth, repeatable process.',
      },
      { type: 'p', text: 'Choosing the wrong one creates ongoing friction.' },
      { type: 'p', text: 'It is worth investing time upfront.' },
      { type: 'hr' },
      { type: 'h3', text: 'A simple framework to decide' },
      {
        type: 'p',
        text: 'You can evaluate vendors across four dimensions.',
      },
      {
        type: 'ul',
        items: [
          'Experience quality',
          'Operational reliability',
          'Flexibility and customization',
          'Transparency and trust',
        ],
      },
      { type: 'p', text: 'A strong vendor will perform well across all four.' },
      {
        type: 'p',
        text: 'Weakness in any one area usually shows up during execution.',
      },
      { type: 'hr' },
      { type: 'h3', text: 'Closing thought' },
      { type: 'p', text: 'The right gifting vendor does more than supply products.' },
      {
        type: 'p',
        text: 'They reduce your workload. They improve consistency. They help you create better experiences.',
      },
      { type: 'p', text: 'And they make the entire process predictable.' },
      { type: 'p', text: 'That is what you should be selecting for.' },
      {
        type: 'p',
        text: 'Because in the end, the goal is not just to send gifts. It is to make sure those gifts land the way you intended.',
      },
    ],
  },
]

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug)
}
