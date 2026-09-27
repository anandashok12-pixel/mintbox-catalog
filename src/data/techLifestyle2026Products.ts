/**
 * 20 tech and lifestyle products (Sep 2026 brief) plus 3 optional bundles,
 * mapped onto the existing flat Products schema (no slug/brand/tags/variant/
 * collection fields - see scripts/import-tech-lifestyle-2026.ts for why).
 * Each product's vendor cost/source/contact is a comment only, never sent to
 * the API. MintBox price = computeMrp(vendorCost) from src/config/pricing.ts,
 * the same markup function used for the Diwali 2026 catalog.
 */
import { computeMrp } from '../config/pricing'

export interface TechLifestyle2026Product {
  slug: string
  name: string
  categorySlug: string
  price: number
  description: string
  features: string[]
  moq: number
  customisable: boolean
  inStock: boolean
  emoji: string
}

const products: TechLifestyle2026Product[] = [
  // Source: Stuffcool, https://www.stuffcool.com/products/nomad-pro-140w-multi-port-gan-fast-charger-with-world-travel-plugs
  // Vendor cost 6499, MRP 6999. Corporate contact: WhatsApp 8879758984.
  {
    slug: 'stuffcool-nomad-pro-140w-travel-charger',
    name: 'Stuffcool Nomad Pro 140W Travel Charger',
    categorySlug: 'electronics',
    price: computeMrp(6499),
    description:
      'One 140W charger for a laptop, phone and tablet, with plugs for the US, UK, EU and India.\n\n' +
      'Charges a laptop and a phone from the same brick, in almost any country. A small screen shows how many watts each port is drawing. It comes packed as a travel kit with four swappable plugs.\n\n' +
      'Colours: one colourway.\n' +
      'Customisation: laser engraving or pad print on the body, printed sleeve on the travel-kit box.\n' +
      'Good fit for: travel, Diwali gifting.',
    features: [
      '140W total, with up to 140W from a single USB-C port',
      '2 USB-C ports and 1 USB-A port',
      'US plug built in, with swappable EU, UK and India plugs',
      'Screen shows live wattage per port',
      'BIS certified, 260 g',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🔌',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/pivot-meridian-convertible-briefpack-basalt/dp?f=pid~BSLT-PVT-MRDAN-CNVRTBL-BREFCASE
  // Vendor cost 6999, MRP 7999. Corporate contact: corporatesales@dailyobjects.com.
  {
    slug: 'dailyobjects-pivot-meridian-briefpack',
    name: 'DailyObjects Pivot Meridian Convertible Briefpack',
    categorySlug: 'bags-travel-accessories',
    price: computeMrp(6999),
    description:
      'A work bag that switches between backpack and briefcase, for laptops up to 16 inches.\n\n' +
      'Made from recycled nylon ripstop that sheds light rain. Carry it by the handle into a meeting, then clip on the straps for the commute home. A trolley sleeve slides it over a suitcase handle.\n\n' +
      'Colours: Basalt, Sand, Seagrass, Lagoon, Coral.\n' +
      'Customisation: woven label, patch or heat-transfer logo on the front panel.\n' +
      'Good fit for: travel.',
    features: [
      'Fits laptops up to 16 inches, 13.6 litres',
      'Converts between backpack and briefcase',
      'Detachable shoulder strap',
      'Water-repellent recycled nylon ripstop',
      'Trolley sleeve for travel',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '💼',
  },
  // Source: Cover It Up, https://coveritup.com/products/native-union-fold-laptop-stand-the-ultra-slim-foldable-laptop-stand
  // Vendor cost 4500. Cover It Up does not brand Native Union products - engraving needs MintBox's own finisher.
  {
    slug: 'native-union-fold-laptop-stand',
    name: 'Native Union Fold Laptop Stand',
    categorySlug: 'desktop-accessories',
    price: computeMrp(4500),
    description:
      'An aluminium laptop stand that folds flat and travels in its own pouch.\n\n' +
      'Raises the screen to eye level, at a desk or in a hotel room. It folds down to a flat bar that fits in a laptop bag. Works with 13 to 16 inch laptops and tablets.\n\n' +
      'Colours: Sandstone, Black.\n' +
      'Customisation: laser engraving on the aluminium, or print on the pouch.\n' +
      'Good fit for: home office setups, travel.',
    features: [
      'Aluminium with silicone grip pads',
      'Holds up to 3 kg',
      'Fits 13 to 16 inch laptops and tablets',
      'Folds flat, with a carry pouch',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '💻',
  },
  // Source: Portronics, https://www.portronics.com/products/harmony-ii
  // Vendor cost 4999, MRP 11999. Page showed "Coming Soon" on 26 Sep 2026 - confirm supply before enabling.
  // Corporate contact: +91 9555-245-245.
  {
    slug: 'portronics-harmony-ii-speaker',
    name: 'Portronics Harmony II Speaker',
    categorySlug: 'audio',
    price: computeMrp(4999),
    description:
      'A 60W Bluetooth speaker with a built-in woofer, finished in leather with a carry handle.\n\n' +
      'Loud enough for a living room and good-looking enough to leave on a shelf. The 5000mAh battery lets it go out to the balcony or a party without a cable.\n\n' +
      'Colours: Gold, Grey.\n' +
      'Customisation: debossed logo or metal badge on the leather panel, to be confirmed with Portronics.\n' +
      'Good fit for: Diwali gifting, home use.',
    features: [
      '60W output, 2.1 channel with woofer',
      'Bluetooth 5.3',
      '5000mAh battery',
      'Leather finish with carry handle',
    ],
    moq: 10,
    customisable: true,
    inStock: false, // TODO: confirm supply with Portronics (listed "Coming Soon" as of 26 Sep 2026) before setting inStock: true
    emoji: '🔊',
  },
  // Source: Mivi, https://www.mivi.in/products/mivi-nex-800
  // Vendor cost 11999 (Mivi's listed MRP of 52999 is not a real reference price). Corporate contact: support@mivi.in, +91 8099973333.
  {
    slug: 'mivi-nex-800-soundbar',
    name: 'Mivi Nex 800 Soundbar',
    categorySlug: 'audio',
    price: computeMrp(11999),
    description:
      'An 800W 5.1 Dolby soundbar with a subwoofer, made in Hyderabad.\n\n' +
      'A gift for the whole family, suited to senior clients at Diwali. It connects to the TV by HDMI or optical cable and to phones by Bluetooth.\n\n' +
      'Colours: Black.\n' +
      "Customisation: branded outer packaging through Mivi's corporate programme. The product itself is not branded.\n" +
      'Good fit for: Diwali gifting, home use. Made in India.',
    features: [
      '800W, 5.1 channel, Dolby Audio',
      'Separate subwoofer',
      'HDMI, optical, coaxial, USB and Bluetooth inputs',
      'Piano-black finish',
      'Designed and made in India',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '📻',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/slate-array-desk-organiser/dp?f=pid~SLAT-ARAY-DESK-ORGNSR
  // Vendor cost 4999, MRP 5999.
  {
    slug: 'dailyobjects-array-desk-organiser',
    name: 'DailyObjects Array Desk Organiser',
    categorySlug: 'desktop-accessories',
    price: computeMrp(4999),
    description:
      'Three stacking desk trays with a phone stand built into the base.\n\n' +
      'Holds pens, cards, cables and small things in stacked trays, with a felt panel and a metal panel for pinning notes. It sits on the desk and stays in view every day.\n\n' +
      'Colours: Ember, Sand, Slate.\n' +
      'Customisation: print or engraving on the metal panel, to be confirmed with DailyObjects.\n' +
      'Good fit for: home office setups.',
    features: [
      'Three stacking trays',
      'Base doubles as a phone stand',
      'Cable management',
      'Felt panel and metal clip panel',
      '177 x 218 x 134 mm',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🗂️',
  },
  // Source: Cover It Up, https://coveritup.com/products/laptop-carry-sleeve
  // Vendor cost 6499. Needs each recipient's laptop size, defaulting to 14 inch. Branding needs MintBox's own finisher.
  {
    slug: 'moft-laptop-carry-sleeve',
    name: 'MOFT Laptop Carry Sleeve',
    categorySlug: 'bags-travel-accessories',
    price: computeMrp(6499),
    description:
      'A vegan leather laptop sleeve that folds into a laptop stand.\n\n' +
      'Protects the laptop inside a bag, then folds under it to raise the screen to 15 or 25 degrees. An expandable pocket holds the charger and cables.\n\n' +
      'Colours: Night Black, Brown, Deep Blue, Terracotta and six more.\n' +
      'Customisation: debossed or printed logo on the front.\n' +
      'Good fit for: home office setups, travel.',
    features: [
      'Vegan leather over a fibreglass frame',
      'Works as a stand at 15 or 25 degrees',
      'Expandable accessory pocket',
      'Available for 14 inch and 16 inch laptops (defaults to 14 inch unless recipient laptop size is given)',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '💻',
  },
  // Source: Cover It Up, https://coveritup.com/products/native-union-w-f-a-crossbody-pouch
  // Vendor cost 5760. Branding needs MintBox's own finisher. Pairs well with the PhotoTag tracker.
  {
    slug: 'native-union-wfa-crossbody-pouch',
    name: 'Native Union W.F.A Crossbody Pouch',
    categorySlug: 'bags-travel-accessories',
    price: computeMrp(5760),
    description:
      'A small recycled-fabric crossbody bag for phone, wallet, keys and passport.\n\n' +
      'Sized for the things you carry every day, with a hidden pocket that fits a tracker. It is water-resistant, with YKK zips and an organic cotton strap.\n\n' +
      'Colours: Black, Kraft, Slate Green.\n' +
      'Customisation: woven patch or print on the front.\n' +
      'Good fit for: travel.',
    features: [
      '1.5 litres',
      'Recycled PET fabric, water-resistant',
      'YKK zips',
      'Hidden tracker pocket',
      'Organic cotton strap',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '👝',
  },
  // Source: Stuffcool, https://www.stuffcool.com/products/giga-max-smallest-25000mah-powerbank-with-100w-built-in-type-c-cable
  // Vendor cost 5499, MRP 5999.
  {
    slug: 'stuffcool-giga-max-25000mah-power-bank',
    name: 'Stuffcool Giga Max 25000mAh Laptop Power Bank',
    categorySlug: 'electronics',
    price: computeMrp(5499),
    description:
      'A 25,000mAh power bank that charges laptops at 100W and is cleared for flights.\n\n' +
      'Enough to top up a laptop and a phone on a long travel day. At 96Wh it stays under the 100Wh cabin baggage limit. The USB-C cable is built in, so there is nothing to forget.\n\n' +
      'Colours: one colourway.\n' +
      'Customisation: print or laser engraving on the large flat face.\n' +
      'Good fit for: travel. Made in India.',
    features: [
      '25,000mAh, 96Wh, allowed in cabin baggage',
      '100W built-in USB-C cable, plus 100W USB-C and 18W USB-A ports',
      'Screen shows charge and output',
      'BIS, CE and RoHS certified',
      'Made in India, 430 g',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🔋',
  },
  // Source: Portronics, https://www.portronics.com/products/talk-one
  // Vendor cost 6999, MRP 14999. Page showed "Coming Soon" on 26 Sep 2026 - confirm supply before enabling.
  {
    slug: 'portronics-talk-one-speakerphone',
    name: 'Portronics Talk One Conference Speakerphone',
    categorySlug: 'audio',
    price: computeMrp(6999),
    description:
      'A conference speakerphone with three mics that pick up everyone around a table.\n\n' +
      'Made for managers and client teams who spend the day on calls. It picks up voices from up to 5 metres in every direction and lasts 12 hours on a charge.\n\n' +
      'Colours: Black.\n' +
      'Customisation: UV print on the top rim.\n' +
      'Good fit for: home office setups.',
    features: [
      '360 degree voice pickup, 3 mics, 5 metre range',
      '12 hours talk time',
      'Bluetooth, USB and AUX',
      '300 g',
    ],
    moq: 10,
    customisable: true,
    inStock: false, // TODO: confirm supply with Portronics (listed "Coming Soon" as of 26 Sep 2026) before setting inStock: true
    emoji: '📞',
  },
  // Source: Cover It Up, https://coveritup.com/products/phototag-smart-air-tracker-tags-finder-for-android-ios-apple-find-my-google-find-my-device-bluetooth-locator-for-luggage-keys-wallet-personalized-e-ink-display-tech-gift
  // Vendor cost 3499 (pack of 2: 6499, pack of 3: 8999).
  {
    slug: 'phototag-smart-tracker',
    name: 'PhotoTag Smart Tracker',
    categorySlug: 'bags-travel-accessories',
    price: computeMrp(3499),
    description:
      'A luggage and key tracker with a small e-ink screen that can show your logo.\n\n' +
      "Works with Apple Find My on iPhone and Google Find My Device on Android, so every recipient can use it. The colour e-ink screen can show a company logo or the recipient's name, with no printing.\n\n" +
      'Colours: Cement, Sapphire.\n' +
      'Customisation: logo or name shown on the e-ink screen.\n' +
      'Good fit for: travel.',
    features: [
      'Colour e-ink display',
      'Works with Apple Find My and Google Find My Device',
      'IP65 water and dust resistant',
      'About 10 months on a replaceable CR2032 battery',
      'Sold singly or in packs of 2 and 3',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🏷️',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/loop-universal-aluminium-power-bank-10000-mah-black/dp?f=pid~BLK-LOP-UNVRSAL-PWR-BNK-10000MH
  // Vendor cost 2999, MRP 5499.
  {
    slug: 'dailyobjects-loop-aluminium-power-bank',
    name: 'DailyObjects Loop Aluminium Power Bank',
    categorySlug: 'electronics',
    price: computeMrp(2999),
    description:
      'A slim 10,000mAh aluminium power bank that charges any USB-C phone.\n\n' +
      'The aluminium body feels solid in the hand and takes a clean laser engraving. It charges in and out at 20W over USB-C, and a display shows how much charge is left.\n\n' +
      'Colours: Black, Space Blue, Titanium.\n' +
      'Customisation: laser engraving on the flat aluminium face.\n' +
      'Good fit for: travel, onboarding kits.',
    features: [
      '10,000mAh',
      '20W USB-C fast charging, in and out',
      'Charge display',
      'Aluminium body, 12.9 x 6.65 x 1.3 cm',
      '1 year warranty',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🔋',
  },
  // Source: Stuffcool, https://www.stuffcool.com/products/zeno-100-smallest-gan-desktop-charging-station-with-dual-type-c-ports-and-built-in-65w-retractable-cable
  // Vendor cost 3999, MRP 4299.
  {
    slug: 'stuffcool-zeno-100-desk-charging-station',
    name: 'Stuffcool Zeno 100 Desktop Charging Station',
    categorySlug: 'electronics',
    price: computeMrp(3999),
    description:
      'A 100W desk charger with a built-in retractable USB-C cable.\n\n' +
      'Sits on the desk and charges a laptop, phone and earbuds together. The 65W cable pulls out when needed and winds back in, so the desk stays tidy.\n\n' +
      'Colours: one colourway.\n' +
      'Customisation: print on the flat top panel, about 9.7 cm across.\n' +
      'Good fit for: home office setups.',
    features: [
      '100W total',
      '2 USB-C ports and 1 USB-A port',
      'Built-in 65W retractable USB-C cable, 93 cm',
      '1.5 m ISI-approved power cord',
      'BIS certified',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🔌',
  },
  // Source: Mivi, https://www.mivi.in/products/superpods-immersio-pro
  // Vendor cost 2499 (MRP 7999).
  {
    slug: 'mivi-superpods-immersio-pro',
    name: 'Mivi SuperPods Immersio Pro',
    categorySlug: 'audio',
    price: computeMrp(2499),
    description:
      'Noise-cancelling earbuds with Dolby Audio and a wireless-charging case, made in India.\n\n' +
      '40dB noise cancelling for the commute and four mics for clear calls. Up to 60 hours of playback with the case, which also charges on any wireless pad.\n\n' +
      'Colours: Ethereal Black.\n' +
      "Customisation: logo on the case and custom packaging through Mivi's corporate programme.\n" +
      'Good fit for: home office setups. Made in India.',
    features: [
      '40dB active noise cancelling',
      '4 mics for calls',
      'Dolby Audio',
      'Up to 60 hours with the case',
      'Wireless charging case, IPX4, Bluetooth 5.3',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🎧',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/pivot-taiga-backpack-basalt/dp?f=pid~BSLT-PVOT-TAIGA-BACKPACK
  // Vendor cost 3499, MRP 5499.
  {
    slug: 'dailyobjects-pivot-taiga-backpack',
    name: 'DailyObjects Pivot Taiga Backpack',
    categorySlug: 'bags-travel-accessories',
    price: computeMrp(3499),
    description:
      'A 16-litre everyday backpack in recycled nylon, with a padded 14 inch laptop sleeve.\n\n' +
      'Light enough for the daily commute, with bottle pockets, a trolley strap and a leather key tab. It matches the Pivot Meridian Briefpack, so a company can give teams and leadership bags from the same range.\n\n' +
      'Colours: Basalt, Sand, Seagrass, Lagoon, Coral.\n' +
      'Customisation: patch or label on the front pocket, or deboss on the leather tab.\n' +
      'Good fit for: onboarding kits.',
    features: [
      '16.2 litres',
      'Padded sleeve for laptops up to 14 inches',
      'Water-repellent recycled nylon ripstop',
      'Trolley strap and bottle pockets',
      'Leather key tab',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🎒',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/marshal-tech-kit-organiser-leatherite-blue/dp?f=pid~BLU-MARSAL-TECH-KIT-LTHRT
  // Vendor cost 1999, MRP 3499.
  {
    slug: 'dailyobjects-marshal-tech-kit',
    name: 'DailyObjects Marshal Tech Kit Organiser',
    categorySlug: 'bags-travel-accessories',
    price: computeMrp(1999),
    description:
      'A hard-shell pouch for chargers, cables, earbuds and cards.\n\n' +
      'Stops the small things from tangling at the bottom of a bag. It has a foam-backed shell, canvas pockets inside and a YKK zip.\n\n' +
      'Colours: Black, Blue, Tan, Mustard, Red.\n' +
      'Customisation: debossed or foil-stamped logo on the lid.\n' +
      'Good fit for: travel, onboarding kits.',
    features: [
      'Leatherite shell with EVA foam',
      'Canvas pockets inside',
      'YKK zip',
      '16 x 20.5 x 5.5 cm',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🧳',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/black-align-a5-hardcover-notebook-2-0/dp?f=pid~BLK-ALIG-A5-HNDCVER-NTBK-2-0
  // Vendor cost 999, MRP 1299.
  {
    slug: 'dailyobjects-align-a5-notebook',
    name: 'DailyObjects Align A5 Hardcover Notebook',
    categorySlug: 'desktop-accessories',
    price: computeMrp(999),
    description:
      'An A5 hardcover notebook with leather loops for a pen and a ruler.\n\n' +
      '192 pages of 80 gsm plain paper in a hard cover, with a leather slip pocket for loose notes and cards.\n\n' +
      'Colours: Beige, Black, Blue, Green.\n' +
      'Customisation: foil stamping or deboss on the cover.\n' +
      'Good fit for: onboarding kits.',
    features: [
      'A5, hardcover',
      '192 pages, 80 gsm plain paper',
      'Genuine leather pen loop and ruler loop',
      'Leather slip pocket',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '📓',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/turf-vegan-leather-desk-mat-black/dp?f=pid~TURF-LETHER-DESK-MAT-BLK
  // Vendor cost 999 (from the listing page - the product page itself showed no price).
  {
    slug: 'dailyobjects-turf-desk-mat',
    name: 'DailyObjects Turf Vegan Leather Desk Mat',
    categorySlug: 'desktop-accessories',
    price: computeMrp(999),
    description:
      'A reversible vegan leather and felt desk mat, handmade in India.\n\n' +
      'Covers the space under the keyboard and mouse, and handles spills and hot mugs. It has the largest surface for a logo of anything in this range.\n\n' +
      'Colours: Black, Tan.\n' +
      'Customisation: debossed or printed logo.\n' +
      'Good fit for: home office setups. Made in India.',
    features: [
      'Vegan leather on one side, felt on the other',
      'Water and heat resistant',
      'Handmade in India',
      // TODO: confirm exact dimensions with DailyObjects before publishing
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '⌨️',
  },
  // Source: Portronics, https://www.portronics.com/products/tricharge-ultra
  // Vendor cost 1699, MRP 2999. Page showed "Coming Soon" on 26 Sep 2026 - confirm supply before enabling.
  // TODO: confirm which smartwatches the watch charging pad supports before publishing the feature list.
  {
    slug: 'portronics-tricharge-ultra',
    name: 'Portronics TriCharge Ultra 3-in-1 Wireless Charger',
    categorySlug: 'electronics',
    price: computeMrp(1699),
    description:
      'A wireless charging stand for a phone, earbuds and a watch at once, with a night light.\n\n' +
      'Charges a phone at 15W alongside earbuds and a smartwatch. The touch night light means it works on a bedside table as well as a desk.\n\n' +
      'Colours: Black.\n' +
      'Customisation: pad or UV print on the base.\n' +
      'Good fit for: home office setups.',
    features: [
      '15W phone, 5W earbuds and 2.5W watch charging at the same time',
      'Qi wireless charging',
      'Touch night light with 3 modes',
    ],
    moq: 10,
    customisable: true,
    inStock: false, // TODO: confirm supply with Portronics (listed "Coming Soon" as of 26 Sep 2026) before setting inStock: true
    emoji: '🔌',
  },
  // Source: DailyObjects, https://www.dailyobjects.com/black-ripstop-pivot-passport-wallet/dp?f=pid~BLK-RPSTP-LUNG-PASPRT-WLLT
  // Vendor cost 1499, MRP 1999. Leatherite version (Check-in Passport Wallet, cost 999, in Red/Blue/Black/Tan/Mustard)
  // takes a deboss better if branding matters more - swap in if Anand wants that variant instead.
  {
    slug: 'dailyobjects-lounge-passport-wallet',
    name: 'DailyObjects Lounge Passport Wallet',
    categorySlug: 'bags-travel-accessories',
    price: computeMrp(1499),
    description:
      'A ripstop passport wallet with slots for cards, boarding passes and a SIM.\n\n' +
      'Keeps a passport, cards and boarding pass together at the airport. It closes with a magnetic flap and has a satin lining.\n\n' +
      'Colours: Black with green lining.\n' +
      'Customisation: label on the flap.\n' +
      'Good fit for: travel.',
    features: [
      'Passport, card, boarding pass and SIM slots',
      'Magnetic flap',
      'Polyester ripstop with satin lining',
      '12 x 15.4 cm',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🛂',
  },
]

// Step 6 bundles: no bundle/hamper relation type exists in this schema, so each
// is modelled as an ordinary product (existing precedent: the "N-in-1 Gift Set"
// products already in the "Executive Sets" category list their contents in
// `features`). Bundle price = computeMrp(sum of component vendor costs) - no
// separate bundle discount was specified in the brief.
const bundles: TechLifestyle2026Product[] = [
  {
    slug: 'the-traveller-executive-bundle',
    name: 'The Traveller',
    categorySlug: 'executive-sets',
    price: computeMrp(6499 + 3499 + 1499 + 1999),
    description:
      'A travel kit for senior leadership: a universal charger, a luggage tracker, a passport wallet and a tech pouch.\n\n' +
      'Four travel essentials in one gift: the Stuffcool Nomad Pro 140W charger, a PhotoTag smart tracker, the DailyObjects Lounge Passport Wallet and the DailyObjects Marshal Tech Kit organiser.\n\n' +
      'Gifting tier: Executive (for senior leadership and key clients).',
    features: [
      'Stuffcool Nomad Pro 140W Travel Charger',
      'PhotoTag Smart Tracker',
      'DailyObjects Lounge Passport Wallet',
      'DailyObjects Marshal Tech Kit Organiser',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🧳',
  },
  {
    slug: 'the-desk-set-premium-bundle',
    name: 'The Desk Set',
    categorySlug: 'executive-sets',
    price: computeMrp(4500 + 999 + 3999 + 999),
    description:
      'A desk upgrade for managers and client teams: a laptop stand, a desk mat, a charging station and a notebook.\n\n' +
      'Four desk essentials in one gift: the Native Union Fold Laptop Stand, the DailyObjects Turf Desk Mat, the Stuffcool Zeno 100 charging station and the DailyObjects Align A5 Notebook.\n\n' +
      'Gifting tier: Premium (for managers, client teams and milestone gifts).',
    features: [
      'Native Union Fold Laptop Stand',
      'DailyObjects Turf Vegan Leather Desk Mat',
      'Stuffcool Zeno 100 Desktop Charging Station',
      'DailyObjects Align A5 Hardcover Notebook',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🖥️',
  },
  {
    slug: 'the-first-day-kit-team-bundle',
    name: 'The First Day Kit',
    categorySlug: 'executive-sets',
    price: computeMrp(3499 + 999 + 2999 + 1999),
    description:
      'A starter kit for new joiners: a backpack, a notebook, a power bank and a tech pouch.\n\n' +
      'Four onboarding essentials in one gift: the DailyObjects Pivot Taiga Backpack, the DailyObjects Align A5 Notebook, the DailyObjects Loop Power Bank and the DailyObjects Marshal Tech Kit organiser.\n\n' +
      'Gifting tier: Team (for employee gifting at scale, onboarding kits and hamper fillers).',
    features: [
      'DailyObjects Pivot Taiga Backpack',
      'DailyObjects Align A5 Hardcover Notebook',
      'DailyObjects Loop Aluminium Power Bank',
      'DailyObjects Marshal Tech Kit Organiser',
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    emoji: '🎒',
  },
]

export const TECH_LIFESTYLE_2026_PRODUCTS: TechLifestyle2026Product[] = [...products, ...bundles]
