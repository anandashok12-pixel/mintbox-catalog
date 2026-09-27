/**
 * 20 tech and lifestyle products (plus 3 optional bundles) sourced on
 * 2026-09-26 for the corporate catalogue, per Anand's brief.
 *
 * Fields under "// internal only" are vendor sourcing data: cost reference,
 * source store/URL and vendor corporate contact. They exist ONLY on this
 * object so scripts/import-tech-lifestyle-2026.ts can compute the MintBox
 * selling price - they are never included in the Payload `create`/`update`
 * data object, so they never reach the database or the public site.
 *
 * MintBox price = vendor price x 1.2, rounded to the nearest rupee (per
 * Anand, 2026-09-27 - the same "cost x markup" approach already used for
 * the gift sets import, see scripts/gift-sets-data.ts).
 */

export type Tier = 'Executive' | 'Premium' | 'Team'
export type Tag = 'diwali' | 'travel' | 'onboarding' | 'wfh' | 'made-in-india' | 'home'

export interface TechLifestyleItem {
  slug: string
  name: string
  categorySlug: string
  tier: Tier
  tags: Tag[]
  description: string
  features: string[]
  emoji: string
  customisable: boolean
  /** Set false when supply is unconfirmed - keeps the product off the live catalogue until checked. */
  inStock: boolean
  /** Slugs of component items, for bundle rows only. Bundle price = sum of these items' computed MintBox prices. */
  bundleOf?: string[]
  // --- internal only, never sent to Payload ---
  vendorPrice: number
  vendorMrp?: number
  sourceStore: string
  sourceUrl: string
  corporateContact?: string
  supplyNote?: string
}

export const TECH_LIFESTYLE_PRODUCTS: TechLifestyleItem[] = [
  {
    slug: 'stuffcool-nomad-pro-140w-travel-charger',
    name: 'Stuffcool Nomad Pro 140W Travel Charger',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['travel', 'diwali'],
    description:
      'One 140W charger for a laptop, phone and tablet, with plugs for the US, UK, EU and India. Charges a laptop and a phone from the same brick, in almost any country. A small screen shows how many watts each port is drawing. It comes packed as a travel kit with four swappable plugs. Available in one colour. Customisation: laser engraving or pad print on the body, printed sleeve on the travel kit box.',
    features: [
      '140W total, with up to 140W from a single USB-C port',
      '2 USB-C ports and 1 USB-A port',
      'US plug built in, with swappable EU, UK and India plugs',
      'Screen shows live wattage per port',
      'BIS certified, 260 g',
    ],
    emoji: '🔌',
    customisable: true,
    inStock: true,
    vendorPrice: 6499,
    vendorMrp: 6999,
    sourceStore: 'Stuffcool',
    sourceUrl: 'https://www.stuffcool.com/products/nomad-pro-140w-multi-port-gan-fast-charger-with-world-travel-plugs',
    corporateContact: 'WhatsApp 8879758984',
  },
  {
    slug: 'dailyobjects-pivot-meridian-briefpack',
    name: 'DailyObjects Pivot Meridian Convertible Briefpack',
    categorySlug: 'bags-backpacks',
    tier: 'Executive',
    tags: ['travel'],
    description:
      'A work bag that switches between backpack and briefcase, for laptops up to 16 inches. Made from recycled nylon ripstop that sheds light rain. Carry it by the handle into a meeting, then clip on the straps for the commute home. A trolley sleeve slides it over a suitcase handle. Colours: Basalt, Sand, Seagrass, Lagoon, Coral. Customisation: woven label, patch or heat-transfer logo on the front panel.',
    features: [
      'Fits laptops up to 16 inches, 13.6 litres',
      'Converts between backpack and briefcase',
      'Detachable shoulder strap',
      'Water-repellent recycled nylon ripstop',
      'Trolley sleeve for travel',
    ],
    emoji: '💼',
    customisable: true,
    inStock: true,
    vendorPrice: 6999,
    vendorMrp: 7999,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/pivot-meridian-convertible-briefpack-basalt/dp?f=pid~BSLT-PVT-MRDAN-CNVRTBL-BREFCASE',
    corporateContact: 'corporatesales@dailyobjects.com',
  },
  {
    slug: 'native-union-fold-laptop-stand',
    name: 'Native Union Fold Laptop Stand',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['wfh', 'travel'],
    description:
      'An aluminium laptop stand that folds flat and travels in its own pouch. Raises the screen to eye level, at a desk or in a hotel room. It folds down to a flat bar that fits in a laptop bag. Works with 13 to 16 inch laptops and tablets. Colours: Sandstone, Black. Customisation: laser engraving on the aluminium, or print on the pouch.',
    features: [
      'Aluminium with silicone grip pads',
      'Holds up to 3 kg',
      'Fits 13 to 16 inch laptops and tablets',
      'Folds flat, with a carry pouch',
    ],
    emoji: '💻',
    customisable: true,
    inStock: true,
    vendorPrice: 4500,
    sourceStore: 'Cover It Up',
    sourceUrl: 'https://coveritup.com/products/native-union-fold-laptop-stand-the-ultra-slim-foldable-laptop-stand',
    supplyNote: 'Cover It Up does not brand Native Union products - engraving needs MintBox’s own finisher.',
  },
  {
    slug: 'portronics-harmony-ii-speaker',
    name: 'Portronics Harmony II Speaker',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['diwali', 'home'],
    description:
      'A 60W Bluetooth speaker with a built-in woofer, finished in leather with a carry handle. Loud enough for a living room and good-looking enough to leave on a shelf. The 5000mAh battery lets it go out to the balcony or a party without a cable. Colours: Gold, Grey. Customisation: debossed logo or metal badge on the leather panel, to be confirmed with Portronics.',
    features: [
      '60W output, 2.1 channel with woofer',
      'Bluetooth 5.3',
      '5000mAh battery',
      'Leather finish with carry handle',
    ],
    emoji: '🔊',
    customisable: true,
    inStock: false,
    vendorPrice: 4999,
    vendorMrp: 11999,
    sourceStore: 'Portronics',
    sourceUrl: 'https://www.portronics.com/products/harmony-ii',
    corporateContact: '+91 9555-245-245',
    supplyNote: 'Page showed "Coming Soon" on 26 Sep 2026 - kept off the live catalogue (inStock: false) until supply is confirmed.',
  },
  {
    slug: 'mivi-nex-800-soundbar',
    name: 'Mivi Nex 800 Soundbar',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['diwali', 'home', 'made-in-india'],
    description:
      'An 800W 5.1 Dolby soundbar with a subwoofer, made in Hyderabad. A gift for the whole family, suited to senior clients at Diwali. It connects to the TV by HDMI or optical cable and to phones by Bluetooth. Colour: Black. The product itself is not branded; customisation is limited to branded outer packaging through Mivi’s corporate programme.',
    features: [
      '800W, 5.1 channel, Dolby Audio',
      'Separate subwoofer',
      'HDMI, optical, coaxial, USB and Bluetooth inputs',
      'Piano-black finish',
      'Designed and made in India',
    ],
    emoji: '📺',
    customisable: true,
    inStock: true,
    vendorPrice: 11999,
    sourceStore: 'Mivi',
    sourceUrl: 'https://www.mivi.in/products/mivi-nex-800',
    corporateContact: 'support@mivi.in, +91 8099973333',
    supplyNote: 'Mivi lists MRP ₹52,999 on-site, which is not a real reference - no vendorMrp recorded.',
  },
  {
    slug: 'dailyobjects-array-desk-organiser',
    name: 'DailyObjects Array Desk Organiser',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['wfh'],
    description:
      'Three stacking desk trays with a phone stand built into the base. Holds pens, cards, cables and small things in stacked trays, with a felt panel and a metal panel for pinning notes. It sits on the desk and stays in view every day. Colours: Ember, Sand, Slate. Customisation: print or engraving on the metal panel, to be confirmed with DailyObjects.',
    features: [
      'Three stacking trays',
      'Base doubles as a phone stand',
      'Cable management',
      'Felt panel and metal clip panel',
      '177 x 218 x 134 mm',
    ],
    emoji: '🗂️',
    customisable: true,
    inStock: true,
    vendorPrice: 4999,
    vendorMrp: 5999,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/slate-array-desk-organiser/dp?f=pid~SLAT-ARAY-DESK-ORGNSR',
  },
  {
    slug: 'moft-laptop-carry-sleeve',
    name: 'MOFT Laptop Carry Sleeve',
    categorySlug: 'bags-backpacks',
    tier: 'Executive',
    tags: ['wfh', 'travel'],
    description:
      'A vegan leather laptop sleeve that folds into a laptop stand. Protects the laptop inside a bag, then folds under it to raise the screen to 15 or 25 degrees. An expandable pocket holds the charger and cables. Colours: Night Black, Brown, Deep Blue, Terracotta and six more. Customisation: debossed or printed logo on the front.',
    features: [
      'Vegan leather over a fibreglass frame',
      'Works as a stand at 15 or 25 degrees',
      'Expandable accessory pocket',
      'Available for 14 inch and 16 inch laptops',
    ],
    emoji: '💻',
    customisable: true,
    inStock: true,
    vendorPrice: 6499,
    sourceStore: 'Cover It Up',
    sourceUrl: 'https://coveritup.com/products/laptop-carry-sleeve',
    supplyNote: 'Needs each recipient’s laptop size at order time; defaults to 14 inch if not specified. Branding needs MintBox’s own finisher.',
  },
  {
    slug: 'native-union-wfa-crossbody-pouch',
    name: 'Native Union W.F.A Crossbody Pouch',
    categorySlug: 'bags-backpacks',
    tier: 'Executive',
    tags: ['travel'],
    description:
      'A small recycled-fabric crossbody bag for phone, wallet, keys and passport. Sized for the things you carry every day, with a hidden pocket that fits a tracker. It is water-resistant, with YKK zips and an organic cotton strap. Colours: Black, Kraft, Slate Green. Customisation: woven patch or print on the front.',
    features: [
      '1.5 litres',
      'Recycled PET fabric, water-resistant',
      'YKK zips',
      'Hidden tracker pocket',
      'Organic cotton strap',
    ],
    emoji: '👝',
    customisable: true,
    inStock: true,
    vendorPrice: 5760,
    sourceStore: 'Cover It Up',
    sourceUrl: 'https://coveritup.com/products/native-union-w-f-a-crossbody-pouch',
    supplyNote: 'Pairs well with the PhotoTag tracker - see The Traveller bundle.',
  },
  {
    slug: 'stuffcool-giga-max-25000mah-power-bank',
    name: 'Stuffcool Giga Max 25000mAh Laptop Power Bank',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['travel', 'made-in-india'],
    description:
      'A 25,000mAh power bank that charges laptops at 100W and is cleared for flights. Enough to top up a laptop and a phone on a long travel day. At 96Wh it stays under the 100Wh cabin baggage limit. The USB-C cable is built in, so there is nothing to forget. Available in one colour. Customisation: print or laser engraving on the large flat face.',
    features: [
      '25,000mAh, 96Wh, allowed in cabin baggage',
      '100W built-in USB-C cable, plus 100W USB-C and 18W USB-A ports',
      'Screen shows charge and output',
      'BIS, CE and RoHS certified',
      'Made in India, 430 g',
    ],
    emoji: '🔋',
    customisable: true,
    inStock: true,
    vendorPrice: 5499,
    vendorMrp: 5999,
    sourceStore: 'Stuffcool',
    sourceUrl: 'https://www.stuffcool.com/products/giga-max-smallest-25000mah-powerbank-with-100w-built-in-type-c-cable',
  },
  {
    slug: 'portronics-talk-one-speakerphone',
    name: 'Portronics Talk One Conference Speakerphone',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['wfh'],
    description:
      'A conference speakerphone with three mics that pick up everyone around a table. Made for managers and client teams who spend the day on calls. It picks up voices from up to 5 metres in every direction and lasts 12 hours on a charge. Colour: Black. Customisation: UV print on the top rim.',
    features: [
      '360 degree voice pickup, 3 mics, 5 metre range',
      '12 hours talk time',
      'Bluetooth, USB and AUX',
      '300 g',
    ],
    emoji: '📞',
    customisable: true,
    inStock: false,
    vendorPrice: 6999,
    vendorMrp: 14999,
    sourceStore: 'Portronics',
    sourceUrl: 'https://www.portronics.com/products/talk-one',
    supplyNote: 'Page showed "Coming Soon" on 26 Sep 2026 - kept off the live catalogue (inStock: false) until supply is confirmed.',
  },
  {
    slug: 'phototag-smart-tracker',
    name: 'PhotoTag Smart Tracker',
    categorySlug: 'tech-items',
    tier: 'Premium',
    tags: ['travel'],
    description:
      'A luggage and key tracker with a small e-ink screen that can show your logo. Works with Apple Find My on iPhone and Google Find My Device on Android, so every recipient can use it. The colour e-ink screen can show a company logo or the recipient’s name, with no printing. Colours: Cement, Sapphire. Customisation: logo or name shown on the e-ink screen.',
    features: [
      'Colour e-ink display',
      'Works with Apple Find My and Google Find My Device',
      'IP65 water and dust resistant',
      'About 10 months on a replaceable CR2032 battery',
      'Sold singly or in packs of 2 and 3',
    ],
    emoji: '📍',
    customisable: true,
    inStock: true,
    vendorPrice: 3499,
    sourceStore: 'Cover It Up',
    sourceUrl: 'https://coveritup.com/products/phototag-smart-air-tracker-tags-finder-for-android-ios-apple-find-my-google-find-my-device-bluetooth-locator-for-luggage-keys-wallet-personalized-e-ink-display-tech-gift',
    supplyNote: 'Pack pricing at vendor: pack of 2 ₹6,499, pack of 3 ₹8,999. Priced here per single unit.',
  },
  {
    slug: 'dailyobjects-loop-aluminium-power-bank',
    name: 'DailyObjects Loop Aluminium Power Bank',
    categorySlug: 'tech-items',
    tier: 'Premium',
    tags: ['travel', 'onboarding'],
    description:
      'A slim 10,000mAh aluminium power bank that charges any USB-C phone. The aluminium body feels solid in the hand and takes a clean laser engraving. It charges in and out at 20W over USB-C, and a display shows how much charge is left. Colours: Black, Space Blue, Titanium. Customisation: laser engraving on the flat aluminium face.',
    features: [
      '10,000mAh',
      '20W USB-C fast charging, in and out',
      'Charge display',
      'Aluminium body, 12.9 x 6.65 x 1.3 cm',
      '1 year warranty',
    ],
    emoji: '🔋',
    customisable: true,
    inStock: true,
    vendorPrice: 2999,
    vendorMrp: 5499,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/loop-universal-aluminium-power-bank-10000-mah-black/dp?f=pid~BLK-LOP-UNVRSAL-PWR-BNK-10000MH',
  },
  {
    slug: 'stuffcool-zeno-100-desk-charging-station',
    name: 'Stuffcool Zeno 100 Desktop Charging Station',
    categorySlug: 'tech-items',
    tier: 'Premium',
    tags: ['wfh'],
    description:
      'A 100W desk charger with a built-in retractable USB-C cable. Sits on the desk and charges a laptop, phone and earbuds together. The 65W cable pulls out when needed and winds back in, so the desk stays tidy. Available in one colour. Customisation: print on the flat top panel, about 9.7 cm across.',
    features: [
      '100W total',
      '2 USB-C ports and 1 USB-A port',
      'Built-in 65W retractable USB-C cable, 93 cm',
      '1.5 m ISI-approved power cord',
      'BIS certified',
    ],
    emoji: '🔌',
    customisable: true,
    inStock: true,
    vendorPrice: 3999,
    vendorMrp: 4299,
    sourceStore: 'Stuffcool',
    sourceUrl: 'https://www.stuffcool.com/products/zeno-100-smallest-gan-desktop-charging-station-with-dual-type-c-ports-and-built-in-65w-retractable-cable',
  },
  {
    slug: 'mivi-superpods-immersio-pro',
    name: 'Mivi SuperPods Immersio Pro',
    categorySlug: 'tech-items',
    tier: 'Premium',
    tags: ['made-in-india', 'wfh'],
    description:
      'Noise-cancelling earbuds with Dolby Audio and a wireless-charging case, made in India. 40dB noise cancelling for the commute and four mics for clear calls. Up to 60 hours of playback with the case, which also charges on any wireless pad. Colour: Ethereal Black. Customisation: logo on the case and custom packaging through Mivi’s corporate programme.',
    features: [
      '40dB active noise cancelling',
      '4 mics for calls',
      'Dolby Audio',
      'Up to 60 hours with the case',
      'Wireless charging case, IPX4, Bluetooth 5.3',
    ],
    emoji: '🎧',
    customisable: true,
    inStock: true,
    vendorPrice: 2499,
    vendorMrp: 7999,
    sourceStore: 'Mivi',
    sourceUrl: 'https://www.mivi.in/products/superpods-immersio-pro',
  },
  {
    slug: 'dailyobjects-pivot-taiga-backpack',
    name: 'DailyObjects Pivot Taiga Backpack',
    categorySlug: 'bags-backpacks',
    tier: 'Premium',
    tags: ['onboarding'],
    description:
      'A 16-litre everyday backpack in recycled nylon, with a padded 14 inch laptop sleeve. Light enough for the daily commute, with bottle pockets, a trolley strap and a leather key tab. It matches the Pivot Meridian Briefpack, so a company can give teams and leadership bags from the same range. Colours: Basalt, Sand, Seagrass, Lagoon, Coral. Customisation: patch or label on the front pocket, or deboss on the leather tab.',
    features: [
      '16.2 litres',
      'Padded sleeve for laptops up to 14 inches',
      'Water-repellent recycled nylon ripstop',
      'Trolley strap and bottle pockets',
      'Leather key tab',
    ],
    emoji: '🎒',
    customisable: true,
    inStock: true,
    vendorPrice: 3499,
    vendorMrp: 5499,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/pivot-taiga-backpack-basalt/dp?f=pid~BSLT-PVOT-TAIGA-BACKPACK',
  },
  {
    slug: 'dailyobjects-marshal-tech-kit',
    name: 'DailyObjects Marshal Tech Kit Organiser',
    categorySlug: 'bags-backpacks',
    tier: 'Team',
    tags: ['travel', 'onboarding'],
    description:
      'A hard-shell pouch for chargers, cables, earbuds and cards. Stops the small things from tangling at the bottom of a bag. It has a foam-backed shell, canvas pockets inside and a YKK zip. Colours: Black, Blue, Tan, Mustard, Red. Customisation: debossed or foil-stamped logo on the lid.',
    features: [
      'Leatherite shell with EVA foam',
      'Canvas pockets inside',
      'YKK zip',
      '16 x 20.5 x 5.5 cm',
    ],
    emoji: '🧳',
    customisable: true,
    inStock: true,
    vendorPrice: 1999,
    vendorMrp: 3499,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/marshal-tech-kit-organiser-leatherite-blue/dp?f=pid~BLU-MARSAL-TECH-KIT-LTHRT',
  },
  {
    slug: 'dailyobjects-align-a5-notebook',
    name: 'DailyObjects Align A5 Hardcover Notebook',
    categorySlug: 'diaries',
    tier: 'Team',
    tags: ['onboarding'],
    description:
      'An A5 hardcover notebook with leather loops for a pen and a ruler. 192 pages of 80 gsm plain paper in a hard cover, with a leather slip pocket for loose notes and cards. Colours: Beige, Black, Blue, Green. Customisation: foil stamping or deboss on the cover.',
    features: [
      'A5, hardcover',
      '192 pages, 80 gsm plain paper',
      'Genuine leather pen loop and ruler loop',
      'Leather slip pocket',
    ],
    emoji: '📔',
    customisable: true,
    inStock: true,
    vendorPrice: 999,
    vendorMrp: 1299,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/black-align-a5-hardcover-notebook-2-0/dp?f=pid~BLK-ALIG-A5-HNDCVER-NTBK-2-0',
  },
  {
    slug: 'dailyobjects-turf-desk-mat',
    name: 'DailyObjects Turf Vegan Leather Desk Mat',
    categorySlug: 'home-living',
    tier: 'Team',
    tags: ['wfh', 'made-in-india'],
    description:
      'A reversible vegan leather and felt desk mat, handmade in India. Covers the space under the keyboard and mouse, and handles spills and hot mugs. It has the largest surface for a logo of anything in this range. Colours: Black, Tan. Customisation: debossed or printed logo.',
    features: [
      'Vegan leather on one side, felt on the other',
      'Water and heat resistant',
      'Handmade in India',
    ],
    emoji: '🖱️',
    customisable: true,
    inStock: true,
    vendorPrice: 999,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/turf-vegan-leather-desk-mat-black/dp?f=pid~TURF-LETHER-DESK-MAT-BLK',
    supplyNote: 'Size not confirmed - product page showed no dimensions on 26 Sep 2026, so the size line was dropped from the public feature list. TODO: confirm size with DailyObjects and add it back. Vendor price taken from the listing page; the product page itself showed no price.',
  },
  {
    slug: 'portronics-tricharge-ultra',
    name: 'Portronics TriCharge Ultra 3-in-1 Wireless Charger',
    categorySlug: 'tech-items',
    tier: 'Team',
    tags: ['wfh'],
    description:
      'A wireless charging stand for a phone, earbuds and a watch at once, with a night light. Charges a phone at 15W alongside earbuds and a smartwatch. The touch night light means it works on a bedside table as well as a desk. Colour: Black. Customisation: pad or UV print on the base.',
    features: [
      '15W phone, 5W earbuds and 2.5W watch charging at the same time',
      'Qi wireless charging',
      'Touch night light with 3 modes',
    ],
    emoji: '🔌',
    customisable: true,
    inStock: false,
    vendorPrice: 1699,
    vendorMrp: 2999,
    sourceStore: 'Portronics',
    sourceUrl: 'https://www.portronics.com/products/tricharge-ultra',
    supplyNote: 'Page showed "Coming Soon" on 26 Sep 2026 - kept off the live catalogue (inStock: false) until supply is confirmed. TODO: confirm which smartwatches the watch pad supports before publishing.',
  },
  {
    slug: 'dailyobjects-lounge-passport-wallet',
    name: 'DailyObjects Lounge Passport Wallet',
    categorySlug: 'bags-backpacks',
    tier: 'Team',
    tags: ['travel'],
    description:
      'A ripstop passport wallet with slots for cards, boarding passes and a SIM. Keeps a passport, cards and boarding pass together at the airport. It closes with a magnetic flap and has a satin lining. Colour: Black with green lining. Customisation: label on the flap.',
    features: [
      'Passport, card, boarding pass and SIM slots',
      'Magnetic flap',
      'Polyester ripstop with satin lining',
      '12 x 15.4 cm',
    ],
    emoji: '🛂',
    customisable: true,
    inStock: true,
    vendorPrice: 1499,
    vendorMrp: 1999,
    sourceStore: 'DailyObjects',
    sourceUrl: 'https://www.dailyobjects.com/black-ripstop-pivot-passport-wallet/dp?f=pid~BLK-RPSTP-LUNG-PASPRT-WLLT',
    supplyNote: 'A leatherite version (Check-in Passport Wallet, ₹999, in Red, Blue, Black, Tan, Mustard) takes a deboss better if branding matters more than material.',
  },
]

/**
 * Optional bundles (Step 6 of the brief). This catalogue has no relational
 * "bundle" type - the established equivalent (see scripts/gift-sets-data.ts)
 * is a single Product whose `features` list the included items. Price is
 * computed by the import script as the sum of the listed component items'
 * own computed MintBox prices, so it always stays consistent with them.
 */
export interface BundleItem {
  slug: string
  name: string
  categorySlug: string
  tier: Tier
  tags: Tag[]
  description: string
  bundleOf: string[]
  emoji: string
}

export const TECH_LIFESTYLE_BUNDLES: BundleItem[] = [
  {
    slug: 'the-traveller-bundle',
    name: 'The Traveller',
    categorySlug: 'tech-items',
    tier: 'Executive',
    tags: ['travel'],
    description:
      'Everything a frequent flyer needs in one pack: a world-travel charger, a luggage tracker, a passport wallet and a cable organiser.',
    bundleOf: [
      'stuffcool-nomad-pro-140w-travel-charger',
      'phototag-smart-tracker',
      'dailyobjects-lounge-passport-wallet',
      'dailyobjects-marshal-tech-kit',
    ],
    emoji: '✈️',
  },
  {
    slug: 'the-desk-set-bundle',
    name: 'The Desk Set',
    categorySlug: 'tech-items',
    tier: 'Premium',
    tags: ['wfh'],
    description:
      'A complete desk upgrade: a laptop stand, a desk mat, a fast charger and a notebook, for managers and client teams working from home or the office.',
    bundleOf: [
      'native-union-fold-laptop-stand',
      'dailyobjects-turf-desk-mat',
      'stuffcool-zeno-100-desk-charging-station',
      'dailyobjects-align-a5-notebook',
    ],
    emoji: '🖥️',
  },
  {
    slug: 'the-first-day-kit-bundle',
    name: 'The First Day Kit',
    categorySlug: 'bags-backpacks',
    tier: 'Team',
    tags: ['onboarding'],
    description:
      'A backpack, a notebook, a power bank and a cable organiser, ready to hand a new hire on day one.',
    bundleOf: [
      'dailyobjects-pivot-taiga-backpack',
      'dailyobjects-align-a5-notebook',
      'dailyobjects-loop-aluminium-power-bank',
      'dailyobjects-marshal-tech-kit',
    ],
    emoji: '🎒',
  },
]
