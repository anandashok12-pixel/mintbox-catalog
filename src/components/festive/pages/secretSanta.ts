import { FACTS } from '@/lib/festiveFacts'
import type { FestivePageConfig } from '../types'
import { GUIDES_PARENT, LINKS } from './shared'

const NOT_GIFTS = 'lapel pin|gift tag|packaging|basket|coconut shell boat|tea spoon'

// Target: "secret santa gifts for colleagues" (+ office Secret Santa gifts,
// Secret Santa gifts under 500). Already ranks 22–28 in Google for office
// Secret Santa terms. Brought back from feat/crm-whatsapp-mirror.
export const SECRET_SANTA: FestivePageConfig = {
  path: LINKS.secretSanta.href,
  metaTitle: 'Secret Santa Gifts for Colleagues Under ₹500 | MintBox',
  metaDescription:
    '20 Secret Santa gift ideas for colleagues under ₹500, plus how to run an office Secret Santa: budget, draw, rules and HR-safe humour. Bulk bundles available.',
  parents: [GUIDES_PARENT],
  crumb: 'Secret Santa Gifts',
  eyebrow: 'Christmas 2026 · Office Secret Santa',
  h1: 'Secret Santa Gifts for Colleagues',
  h1Em: '20 ideas under ₹500',
  intro:
    'Drew someone you barely know? These 20 gifts are safe, useful and a little fun, all under ₹500. There is also a simple guide to running Secret Santa at work.',
  badges: ['✓ All under ₹500', '✓ Office-safe', '✓ Bulk bundles for teams', '✓ GST invoice'],
  quickAnswer: `Good Secret Santa gifts for colleagues under ₹500 are useful with a touch of fun: a quirky mug, a mini desk plant, fun socks, a snack or chocolate box, a phone stand or a small Bluetooth speaker. Set a clear budget cap (₹300 to ₹500 is common in Indian offices) and keep jokes kind. Companies can also order ready Secret Santa bundles from ${FACTS.moq} units.`,
  picksNoun: 'gifts under ₹500',
  picks: [
    {
      id: 'under-300',
      title: 'Secret Santa gifts under ₹300',
      intro: 'Small, useful gifts for a ₹300 cap: desk items, notebooks, candles and keychains.',
      filter: { scope: 'other', max: 300, exclude: NOT_GIFTS, min: 80, limit: 16, sort: 'price-asc' },
    },
    {
      id: '300-500',
      title: 'Secret Santa gifts from ₹300 to ₹500',
      intro: 'For a ₹500 cap: bottles, mugs, planters and gift sets that feel like more than they cost.',
      filter: { scope: 'other', min: 301, max: 500, exclude: NOT_GIFTS, limit: 16, sort: 'price-asc' },
    },
  ],
  ideas: {
    id: 'ideas',
    title: '20 Secret Santa gift ideas for colleagues',
    intro: 'Typical prices in India. Use them as a shopping list, or ask us for a ready bundle for your whole team.',
    items: [
      { name: 'Quirky coffee mug', price: '₹250–₹400', desc: 'A mug with a light, work-safe joke. It gets used every day, so the joke keeps working.' },
      { name: 'Mini desk plant', price: '₹200–₹350', desc: 'A succulent or money plant. Safe for anyone, even someone you barely know.' },
      { name: 'Fun printed socks', price: '₹150–₹300', desc: 'Nobody buys them for themselves, and everyone wears them. Pick fun prints rather than slogans.' },
      { name: 'Chocolate box', price: '₹300–₹500', desc: 'A good brand, nicely packed. It never becomes clutter and usually gets shared.' },
      { name: 'Mini board game or puzzle', price: '₹250–₹450', desc: 'A travel card game or wooden puzzle. Often ends up in the office break area.' },
      { name: 'Scented candle', price: '₹250–₹450', desc: 'A soy candle in a light scent like vanilla or sandalwood. Feels more premium than it costs.' },
      { name: 'Coffee or chai sampler', price: '₹300–₹500', desc: 'A few sachets of good coffee or chai. Perfect for the colleague who loves their daily cup.' },
      { name: 'Phone stand', price: '₹150–₹300', desc: 'Ends the propping-the-phone-on-the-monitor routine. Used within an hour.' },
      { name: 'Funny desk sign', price: '₹200–₹400', desc: 'A small sign with a self-deprecating joke. Funny, but never aimed at anyone.' },
      { name: 'Pocket journal', price: '₹150–₹300', desc: 'An A6 notebook for meeting notes. Add a good pen if you have budget left.' },
      { name: 'Cable organiser kit', price: '₹200–₹350', desc: 'Velcro ties and a small pouch. Not glamorous, but used every day.' },
      { name: 'Sipper bottle', price: '₹300–₹500', desc: 'A steel sipper in a nice colour. Great for air-conditioned offices.' },
      { name: 'Snack box', price: '₹250–₹450', desc: 'Makhana, trail mix and dark chocolate. Opened the same afternoon and shared around.' },
      { name: 'Stationery kit', price: '₹200–₹400', desc: 'Sticky notes, gel pens and page flags in a pouch. For the most organised person on the team.' },
      { name: 'Personalised keychain', price: '₹100–₹250', desc: 'With their initial or name. The cheapest way to make a gift feel personal.' },
      { name: 'Stress ball', price: '₹150–₹300', desc: 'A squishy stress toy. Office-safe humour that everyone understands.' },
      { name: 'Premium playing cards', price: '₹200–₹350', desc: 'A good deck in a nice case. Comes out at every offsite and long evening.' },
      { name: 'Canvas tote bag', price: '₹250–₹450', desc: 'A sturdy tote for the daily commute. Pick a simple design over slogans.' },
      { name: '2027 pocket diary', price: '₹200–₹400', desc: 'Secret Santa is in late December, exactly when people need next year’s diary.' },
      { name: 'Mini Bluetooth speaker', price: '₹450–₹500', desc: 'The top of the budget. A palm-sized speaker feels like a much bigger gift.' },
    ],
  },
  steps: {
    id: 'how-to-run',
    title: 'How to run Secret Santa at work',
    items: [
      { title: 'Set the budget cap', desc: 'Announce one clear cap, such as ₹500 (or ₹300 for bigger groups), and ask people to spend at least half of it, so ₹250 on a ₹500 cap. Put it in writing.' },
      { title: 'Draw names', desc: 'Use a free online draw tool or paper chits about a week before the exchange. Online tools let remote colleagues join too.' },
      { title: 'Share the rules', desc: 'One short message: budget, date, whether to wrap, and a line on keeping humour kind. A shared wishlist helps people who drew a stranger.' },
      { title: 'Hold the exchange', desc: 'Mid to late December, before year-end leave. Hand gifts over one by one and let people guess who drew them.' },
      { title: 'Keep jokes HR-safe', desc: 'Would the joke still work if the person’s manager opened it in front of everyone? Nothing about looks, relationships or performance.' },
    ],
  },
  faqs: [
    {
      q: 'What are good Secret Santa gifts for coworkers?',
      a: 'Useful-plus-fun gifts work best: a quirky mug, fun socks, a mini desk plant, a snack box or a small Bluetooth speaker. When in doubt, choose something consumable or useful for the desk.',
    },
    {
      q: 'What is the right budget for office Secret Santa?',
      a: 'One clear cap for everyone. ₹300 to ₹500 is common in Indian offices. If the team has very different salary levels, set the cap at what the most junior person can comfortably spend.',
    },
    {
      q: 'What are good Secret Santa gifts under ₹300?',
      a: 'Fun socks, a personalised keychain, a phone stand, a pocket journal or a stress ball all fit under ₹300. For even smaller budgets, see our guide to <a href="/guides/corporate-gifts-under-100">corporate gifts under ₹100</a>.',
    },
    {
      q: 'When should we do Secret Santa at work?',
      a: 'Draw names in the first week of December and exchange gifts in mid to late December. Planning company-wide gifts too? See our <a href="/guides/christmas-corporate-gifts">Christmas corporate gifts</a> guide.',
    },
    {
      q: 'Can MintBox make Secret Santa bundles for our office?',
      a: `Yes. We can put together a set of wrapped, budget-capped gifts so nobody has to shop alone. Minimum order is ${FACTS.moq} units, with a GST invoice. Order by the end of November for a December exchange.`,
    },
  ],
  quote: {
    title: 'Get a Secret Santa bundle quote',
    subtitle: 'Tell us your team size, budget cap and exchange date. We reply with a bundle, prices and delivery dates.',
    occasion: 'year_end',
    cta: 'Get bundle quote',
  },
  related: [LINKS.christmas, LINKS.newYear, LINKS.bangalore, LINKS.handbook, LINKS.employees, LINKS.companies],
  updated: '2026-09-27',
  published: '2026-09-26',
}
