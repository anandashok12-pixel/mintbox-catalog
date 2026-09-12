/**
 * Import the 55 Diwali gift boxes from "New - Diwali Catalogue 2026 with Price.pdf"
 * into a new "Diwali Gift Boxes" category.
 *
 * Images were rendered from the PDF pages with the supplier code / price badge
 * removed (content-aware fill) and saved as <CODE>.jpg in IMAGES_DIR.
 *
 * Usage:
 *   npm run import-diwali-boxes            # create category + products
 *   npm run import-diwali-boxes -- --dry   # print what would happen, no writes
 *   npm run import-diwali-boxes -- --update  # also update price/desc/image on existing
 *
 * Idempotent: products are matched by name; categories by slug; media by filename.
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const IMAGES_DIR =
  process.env.DIWALI_IMAGES_DIR || '/Users/anandashok/Downloads/Diwali Catalogue 2026 Images'

const CATEGORY = {
  name: 'Diwali Gift Boxes',
  slug: 'diwali-gift-boxes',
  emoji: '🪔',
  order: 0, // show first in the sidebar for the season
  description:
    'Curated Diwali gift boxes and hampers for employees and clients - dry fruits, copper drinkware, eco-friendly kits and premium tech combos. Prices per unit, exclusive of GST.',
}

type Box = { code: string; price: number; name: string; desc: string; items: string[] }

// price = MintBox selling price per unit, ex-GST (supplier catalogue price x 1.4, per Anand 2026-09-12)
const BOXES: Box[] = [
  { code: 'DK01', price: 448, name: 'Dry Fruits 4-in-1 Combo Box (50g each)',
    desc: 'Four-compartment printed gift box with 50g each of raisins, cashews, pistachios and almonds. A neat, budget-friendly Diwali sweet-box alternative.',
    items: ['Raisins 50g', 'Cashews 50g', 'Pistachios 50g', 'Almonds 50g', 'Printed rigid gift box'] },
  { code: 'DK02', price: 700, name: 'Dry Fruits 4-in-1 Combo Box (100g each)',
    desc: 'Premium four-compartment gift box with 100g each of pistachios, raisins, cashews and almonds in a rich purple box.',
    items: ['Pistachios 100g', 'Raisins 100g', 'Cashews 100g', 'Almonds 100g', 'Premium rigid gift box'] },
  { code: 'DK03', price: 770, name: '6-in-1 Unique Diwali Combo',
    desc: 'Everyday-use Diwali hamper with a matte black bottle, ceramic mug and wooden coasters, finished with festive diyas in a premium box.',
    items: ['Rubber-finish bottle', 'Ceramic mug', 'Diyas', 'Wooden coasters', 'Decorative grass', 'Premium box'] },
  { code: 'DK04', price: 1050, name: '6-in-1 Diwali Combo with Dry Fruits & LED Lamp',
    desc: 'Festive box with 200g jars of cashews, almonds and raisins, a crystal LED lamp and two hand-decorated diyas.',
    items: ['Diyas (2 pcs)', 'LED lamp', 'Cashews 200g', 'Almonds 200g', 'Raisins 200g', 'Premium box'] },
  { code: 'DK05', price: 840, name: '4-in-1 Diwali Combo with Remote Lamp',
    desc: 'Mixed dry fruit box paired with a remote-controlled mood lamp and two decorated diyas on a bed of festive grass.',
    items: ['Mixed dry fruit box 200g', 'Lamp with remote', 'Diyas (2 pcs)', 'Decorative grass'] },
  { code: 'DK06', price: 1365, name: 'New Diwali Collection - Desk & Drinkware Set',
    desc: 'Modern desk-and-drinkware set: silicone-sleeve glass bottle, wooden-lid straw mug, A5 notebook, wireless charger and almond brittle.',
    items: ['Silicone glass bottle', 'Wooden straw mug', 'A5 notebook', 'Almond brittle', 'Wireless charger'] },
  { code: 'DK07', price: 1400, name: 'Premium Combo - Glass Bottle, Straw Mug & Wireless Charger',
    desc: 'White-on-kraft premium combo with a silicone glass bottle, wooden straw glass mug, wireless charger, diya and almond brittle.',
    items: ['Silicone glass bottle', 'Wooden straw glass mug', 'Wireless charger', 'Diya', 'Almond brittle'] },
  { code: 'DK08', price: 1400, name: 'Festive Collection - Bamboo Bottle & Chocolates',
    desc: 'Bamboo bottle and mug set with a multi-charging cable, decorated diya and three packs of Hershey\'s Kisses.',
    items: ['Bamboo bottle', 'Bamboo mug', 'Charging cable', 'Diya', 'Chocolates (Hershey\'s Kisses)'] },
  { code: 'DK09', price: 588, name: 'Eco Friendly Diwali Gift - Wooden Desk Set',
    desc: 'Sustainable desk gift with a wooden perpetual calendar pen stand, keychain, coasters, glass mug and wooden pen.',
    items: ['Pen stand with calendar', 'Pen stand', 'Keychain', 'Coasters', 'Glass mug', 'Wooden pen'] },
  { code: 'DK10', price: 434, name: 'Eco Friendly Diwali Gift - Husk Mug & Seed Stationery',
    desc: 'Plantable stationery set with a rice-husk mug, seed-paper notebook, seed pen, coasters and pencils in a kraft box.',
    items: ['Husk mug', 'Seed notebook', 'Coasters', 'Seed pen', 'Pencils with box'] },
  { code: 'DK11', price: 1211, name: '5-in-1 Eco Friendly Bamboo Combo',
    desc: 'All-bamboo drinkware combo: two bamboo mugs, a bamboo bottle and wooden coasters in a kraft gift box.',
    items: ['Wooden coasters (2)', 'Bamboo mugs (2)', 'Bamboo bottle'] },
  { code: 'DK12', price: 840, name: 'Diwali 3-in-1 Drinkware Combo',
    desc: 'Black insulated tumbler with handle, cork-sleeve glass mug and reusable straw in a black gift box.',
    items: ['Insulated tumbler mug', 'Glass mug', 'Straw'] },
  { code: 'DK13', price: 1470, name: 'Premium Copper Gift Set - Bottle & 2 Tumblers',
    desc: '100% pure copper bottle with two copper tumblers in a "Gifting Happiness" presentation box. Leak-proof, Ayurvedic and easy to clean.',
    items: ['Copper bottle', 'Copper tumblers (2)', 'Presentation box'] },
  { code: 'DK14', price: 1470, name: 'Copper Bottle Combo 3-in-1 (Hammered Finish)',
    desc: 'Hammered-finish pure copper bottle with two matching tumblers in a premium presentation box.',
    items: ['Hammered copper bottle', 'Copper tumblers (2)', 'Presentation box'] },
  { code: 'DK15', price: 1680, name: 'Premium Combo - Engraved Copper Bottle & 2 Tumblers',
    desc: 'Etched-pattern pure copper bottle with two engraved tumblers in a premium presentation box.',
    items: ['Engraved copper bottle', 'Engraved copper tumblers (2)', 'Presentation box'] },
  { code: 'DK16', price: 2170, name: 'Premium Diwali Collection - Copper Bottle, Tumbler, Lamp & Dry Fruits',
    desc: 'Top-tier Diwali box with a copper bottle and tumbler, brass-finish lamp, diyas, chocolate and mixed dry fruits.',
    items: ['Copper bottle', 'Copper tumbler', 'Diyas', 'Lamp', 'Chocolate', 'Mixed dry fruits'] },
  { code: 'DK17', price: 1400, name: 'Premium Diwali Collection - Straw Flask, Wireless Charger & Ferrero',
    desc: 'White premium set with a wooden-lid straw flask, wireless charger, wine mug, Ferrero Rocher and decorated diyas.',
    items: ['Wooden straw flask', 'Wireless charger', 'Wine mug', 'Ferrero Rocher', 'Diya'] },
  { code: 'DK18', price: 1190, name: 'Festive Diwali Gift Set - Straw Flask, Almonds & Ferrero',
    desc: 'Festive set with a wooden-lid straw flask, sterling glass mug, 200g almonds, Ferrero Rocher and a decorated diya.',
    items: ['Wooden straw flask', 'Ferrero Rocher', 'Almonds 200g', 'Sterling mug', 'Diya'] },
  { code: 'DK19', price: 1631, name: 'Premium Diwali Tech Collection (7-in-1)',
    desc: 'All-white tech hamper: notebook, pen, mobile stand, power bank, wireless charger, foldable laptop stand and matte bottle.',
    items: ['Notebook', 'Pen', 'Mobile stand', 'Power bank', 'Wireless charger', 'Laptop stand', 'Rubber-finish bottle'] },
  { code: 'DK20', price: 1197, name: 'Premium Tech Hamper - Laptop Stand, Mug & Lamp',
    desc: 'Work-from-anywhere hamper with a foldable laptop stand, ceramic mug, desk lamp, mobile stand and pen drive.',
    items: ['Laptop stand', 'Mug', 'Lamp', 'Mobile stand', 'Pen drive'] },
  { code: 'DK21', price: 945, name: '4-in-1 Gift Hamper - Temperature Bottle & Ferrero',
    desc: 'Push-button travel mug and temperature-display bottle with Ferrero Rocher and diyas in a purple gift box.',
    items: ['Push-button mug', 'Temperature bottle', 'Ferrero Rocher', 'Diyas'] },
  { code: 'DK22', price: 980, name: 'Gift Hamper - Tumbler, RFID Cardholder & Cashews',
    desc: 'Everyday-occasion hamper with an insulated tumbler mug, RFID cardholder, Loyka chocolate and 200g cashews.',
    items: ['Loyka chocolate', 'RFID cardholder', 'Insulated tumbler mug', 'Cashews 200g'] },
  { code: 'DK23', price: 910, name: 'Joy in a Box Gift Set - Bamboo Bottle & Dry Fruits',
    desc: 'Bamboo bottle with 200g jars of almonds and cashews and a decorated diya, packed on maroon shred.',
    items: ['Diya', 'Bamboo bottle', 'Almonds 200g', 'Cashews 200g'] },
  { code: 'DK24', price: 1610, name: '8-in-1 Premium Combo',
    desc: 'Generous black hamper with A5 notebook, pen, bottle, temperature mug, mixed dry fruits, wafer sticks and two diyas.',
    items: ['A5 notebook', 'Pen', 'Bottle', 'Mixed dry fruits', 'Temperature mug', 'Diyas (2)', 'Wafer sticks'] },
  { code: 'DK25', price: 1239, name: '8-in-1 Cork Hamper',
    desc: 'Cork-themed hamper with notebook, pen, mug and coaster plus dry fruit mix, dry fruit pack, mini light and candle.',
    items: ['Cork notebook', 'Cork pen', 'Mug', 'Coaster', 'Dry fruit mix in bottle 200g', 'Mini light', 'Candle', 'Dry fruit pack'] },
  { code: 'DK26', price: 560, name: 'Tiny Combo - Glass Bottle, Husk Mug & Tote',
    desc: 'Compact eco combo: 750ml jute-sleeve glass bottle, husk mug, wooden coaster, two mini lights, almond brittle and tote bag.',
    items: ['Glass bottle 750ml', 'Husk mug', 'Mini lights (2)', 'Wooden coaster', 'Loyka almond brittle', 'Tote bag'] },
  { code: 'DK27', price: 1281, name: 'Thoughtful Gift Combo - Vacuum Flask & Hanging Lamp',
    desc: 'Vacuum flask with handle, multi-charging cable, tin of cookies and a hanging metal lantern in a black box.',
    items: ['Vacuum flask', 'Charging cable', 'Cookies', 'Hanging metal light'] },
  { code: 'DK28', price: 1260, name: 'A Little Joy, Thoughtfully Packed - Dry Fruits & Diya',
    desc: 'Loyka chocolate with 200g jars of almonds and cashews and a brass diya with glass, in a black gift box.',
    items: ['Loyka chocolate', 'Almonds 200g', 'Cashews 200g', 'Diya with glass'] },
  { code: 'DK29', price: 1141, name: 'Healthy Combo - 5 Jar Dry Fruits Set',
    desc: 'Five 200g jars: almonds, kishmish, cashews, pistachios and wafer sticks, presented in a black box.',
    items: ['Almonds 200g', 'Kishmish 200g', 'Cashews 200g', 'Pistachios 200g', 'Wafer sticks 200g'] },
  { code: 'DK30', price: 1330, name: 'Thoughtful Essentials - Bottle, Mug & Pen Stand',
    desc: 'Matte black bottle and mug with a wooden pen stand, 100g almonds, 100g cashews and almond brittle.',
    items: ['Bottle', 'Wooden pen stand', 'Almonds 100g', 'Cashews 100g', 'Mug', 'Almond brittle'] },
  { code: 'DK31', price: 525, name: 'Everyday Essentials - Tote, Glass Mug & Bottle',
    desc: 'Light, useful kit with a cotton tote bag, glass mug, glass bottle, pistachios and two mini lights.',
    items: ['Tote bag', 'Mini lights (2)', 'Glass mug', 'Glass bottle', 'Pistachios'] },
  { code: 'DK32', price: 658, name: 'Wellness Combo - Sticky Notebook, Mug & Tote',
    desc: 'Desk wellness combo with a sticky-note notebook, pen, mug, mini light, Loyka almond brittle and black tote bag.',
    items: ['Sticky notebook', 'Pen', 'Mug', 'Mini light', 'Loyka almond brittle', 'Tote bag'] },
  { code: 'DK33', price: 700, name: 'Eco-friendly Festive Combo - Jute Bag & Glass Mug',
    desc: 'Jute-bag festive combo with a glass mug, coaster, keychain, mini chocolate pack, wooden pen with stand and mini light.',
    items: ['Glass mug', 'Coaster', 'Keychain', 'Jute bag', 'Mini chocolate pack', 'Wooden pen with stand', 'Mini light'] },
  { code: 'DK34', price: 1015, name: 'Eco-friendly Festive Combo - Notebook, Mug & Dry Fruits',
    desc: 'Tan leatherette notebook, glass mug, keychain, pen and lamp with 100g pistachios and 100g cashews.',
    items: ['Notebook', 'Mug', 'Keychain', 'Pen', 'Lamp', 'Pistachios 100g', 'Cashews 100g'] },
  { code: 'DK35', price: 1015, name: 'Festive Combo - Copper Tumblers & Hanging Lamp',
    desc: 'Two copper tumblers with a hanging lamp, 100g cashews and 100g pistachios in a black bow box.',
    items: ['Copper tumblers (2)', 'Hanging lamp', 'Cashews 100g', 'Pistachios 100g'] },
  { code: 'DK36', price: 1071, name: 'Celebrate Naturally - Eco Gift Box',
    desc: 'Green gift box with a 750ml rubber-finish bottle, seed notebook, seed pen, two coasters, candle and Loyka coffee almond brittle.',
    items: ['Coasters (2)', 'Candle', 'Seed pen with box', 'Seed notebook', 'Loyka almond brittle (coffee)', 'Rubber-finish bottle 750ml'] },
  { code: 'DK37', price: 1071, name: 'Mindful Gifts - Bamboo Flask & Dry Fruits',
    desc: '350ml bamboo flask with 100g almonds, 100g mixed dry fruits, two wooden coasters and a candle.',
    items: ['Wooden coasters (2)', 'Almonds 100g', 'Mixed dry fruits 100g', 'Bamboo flask 350ml', 'Candle'] },
  { code: 'DK38', price: 770, name: 'Thoughtful Gifts - Temperature Bottle & Travel Pouch',
    desc: 'Temperature-display bottle, mini travel pouch, hanging lamp and 100g pistachios.',
    items: ['Temperature bottle', 'Mini travel pouch', 'Hanging lamp', 'Pistachios 100g'] },
  { code: 'DK39', price: 560, name: 'Mini Festive Gift - Tote & Wooden Stand',
    desc: 'Black tote bag with a wooden clock stand and pen, diya and 100g pistachios.',
    items: ['Tote bag', 'Wooden stand with pen', 'Diya', 'Pistachios 100g'] },
  { code: 'DK40', price: 693, name: '3-in-1 Combo - Remote Lamp, Diya & Almond Brittle',
    desc: 'Remote-controlled crystal lamp with a decorated diya and Loyka almond brittle in a kraft box.',
    items: ['Lamp with remote', 'Diya', 'Loyka almond brittle'] },
  { code: 'DK41', price: 770, name: 'Diwali Combo - Bottle, Calendar & Dry Fruits',
    desc: 'Black bottle and wooden desk calendar with a diya, 200g raisins and 200g cashews.',
    items: ['Bottle', 'Desk calendar', 'Diya', 'Raisins 200g', 'Cashews 200g'] },
  { code: 'DK42', price: 497, name: 'Eco-Friendly Hamper - Glass Mug, Bottle & Desk Calendar',
    desc: 'Cotton tote with a cork-sleeve glass mug, jute-sleeve glass bottle and wooden desk calendar.',
    items: ['Glass mug', 'Glass bottle', 'Tote bag', 'Desk calendar'] },
  { code: 'DK43', price: 469, name: 'Thoughtfully Simple - Green Gift Tote',
    desc: 'Cotton tote with a hanging lamp, 100g dry fruits and a leather-sleeve glass mug.',
    items: ['Hanging lamp', 'Dry fruits 100g', 'Glass mug', 'Tote bag'] },
  { code: 'DK44', price: 980, name: 'Festive Gift Combo - Bamboo Bottle, Candle & Pouch',
    desc: 'Black bow gift box with a bamboo bottle, scented candle, mini travel pouch and chocolate pack.',
    items: ['Bamboo bottle', 'Candle', 'Mini travel pouch', 'Chocolate pack', 'Gift box'] },
  { code: 'DK45', price: 1512, name: 'Festive Combo - Copper Bottle, Tumblers & Cashews',
    desc: 'Pure copper bottle and two tumblers with two decorated diyas and 100g cashews in a gift box.',
    items: ['Copper bottle', 'Copper tumblers (2)', 'Diyas (2)', 'Cashews 100g', 'Gift box'] },
  { code: 'DK46', price: 1680, name: 'Healthy Combo - Printed Copper Bottle & Tumblers',
    desc: 'Floral-printed copper bottle and two printed tumblers with two diyas and 100g cashews in a gift box.',
    items: ['Printed copper bottle', 'Printed copper tumblers (2)', 'Diyas (2)', 'Cashews 100g', 'Gift box'] },
  { code: 'DK47', price: 1470, name: 'Healthy Combo - Copper Bottle, Tumblers & Raisins',
    desc: 'Plain copper bottle and two tumblers with two diyas and 100g raisins in a gift box.',
    items: ['Copper bottle', 'Copper tumblers (2)', 'Diyas (2)', 'Raisins 100g', 'Gift box'] },
  { code: 'DK48', price: 896, name: 'Wellness & Delight Combo',
    desc: 'Purple-and-pink set with a temperature bottle, notebook, pen, scented candle, screen cleaner and a jute pouch of five chocolates.',
    items: ['Temperature bottle', 'Candle', 'Cleaner', 'Notebook', 'Pen', 'Chocolate pack (5 pcs) in jute'] },
  { code: 'DK49', price: 798, name: 'Diwali Gift Hamper - Bamboo Flask & Stationery',
    desc: 'Bamboo flask with a wooden notebook, pen, keychain, scented candle and chocolates in a kraft box.',
    items: ['Bamboo flask', 'Notebook', 'Pen', 'Keychain', 'Candle', 'Chocolates'] },
  { code: 'DK50', price: 672, name: 'Thoughtful Hamper - Glass Mug, Wallet & Luggage Tag',
    desc: 'Tan leather wallet and luggage tag with a leather-sleeve glass mug, scented candle and chocolates.',
    items: ['Glass mug', 'Chocolates', 'Candle', 'Luggage tag', 'Wallet'] },
  { code: 'DK51', price: 784, name: 'Special Moments Hamper - Humidifier, Wallet & Glass Mug',
    desc: 'Tan leather wallet, luggage tag and pen with a glass mug, terracotta humidifier and chocolates.',
    items: ['Glass mug', 'Chocolates', 'Luggage tag', 'Wallet', 'Humidifier', 'Pen'] },
  { code: 'DK52', price: 1540, name: 'Diwali Thoughtful Gifts - Executive Black Set',
    desc: 'Executive black set with notebook, wallet, pen, keychain, temperature mug and Ferrero Rocher.',
    items: ['Notebook', 'Keychain', 'Pen', 'Wallet', 'Ferrero Rocher', 'Temperature mug'] },
  { code: 'DK53', price: 1351, name: 'Festive Selections - Flask, Ferrero & Candle',
    desc: 'Pink flask with Ferrero Rocher and a scented candle in a black gift box.',
    items: ['Flask', 'Ferrero Rocher', 'Candle'] },
  { code: 'DK54', price: 728, name: 'Little Things, Big Smiles - Mug, Candle & Pen Set',
    desc: 'Bamboo-finish steel mug with chocolates, scented candle, wooden pen and keychain.',
    items: ['Mug', 'Chocolates', 'Candle', 'Pen', 'Keychain'] },
  { code: 'DK55', price: 770, name: 'Useful Festive Kit - Jute Bag Set',
    desc: 'Jute bag kit with a glass bottle, glass mug, hanging light, almond brittle and Hershey\'s Kisses.',
    items: ['Jute bag', 'Glass bottle', 'Glass mug', 'Hanging light', 'Almond brittle', 'Hershey\'s Kisses'] },
]

const DRY = process.argv.includes('--dry')
const UPDATE = process.argv.includes('--update')

async function run() {
  if (BOXES.length !== 55) throw new Error(`Expected 55 boxes, got ${BOXES.length}`)
  const missing = BOXES.filter((b) => !fs.existsSync(path.join(IMAGES_DIR, `${b.code}.jpg`)))
  if (missing.length) throw new Error(`Missing images: ${missing.map((b) => b.code).join(', ')}`)

  const payload = await getPayload({ config: configPromise })
  console.log(`\n🪔 Importing ${BOXES.length} Diwali gift boxes${DRY ? ' (DRY RUN)' : ''}\n`)

  // --- category ---
  let categoryId: number
  const existingCat = await payload.find({ collection: 'categories', where: { slug: { equals: CATEGORY.slug } } })
  if (existingCat.docs.length) {
    categoryId = existingCat.docs[0].id as number
    console.log(`  ⏭  Category exists: ${CATEGORY.name} (id ${categoryId})`)
  } else if (DRY) {
    categoryId = -1
    console.log(`  ➕ Would create category: ${CATEGORY.name}`)
  } else {
    const created = await payload.create({ collection: 'categories', data: CATEGORY })
    categoryId = created.id as number
    console.log(`  ✅ Created category: ${CATEGORY.name} (id ${categoryId})`)
  }

  // --- media ---
  async function getOrUploadImage(box: Box): Promise<number | null> {
    const filename = `diwali-${box.code.toLowerCase()}.jpg`
    const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } } })
    if (existing.docs.length) return existing.docs[0].id as number
    if (DRY) return null
    const buffer = fs.readFileSync(path.join(IMAGES_DIR, `${box.code}.jpg`))
    const media = await payload.create({
      collection: 'media',
      data: { alt: `${box.name} - Diwali corporate gift box` },
      file: { data: buffer, mimetype: 'image/jpeg', name: filename, size: buffer.length },
    })
    return media.id as number
  }

  // --- products ---
  let created = 0, updated = 0, skipped = 0
  for (let i = 0; i < BOXES.length; i++) {
    const box = BOXES[i]
    const existing = await payload.find({ collection: 'products', where: { name: { equals: box.name } } })
    const data = {
      name: box.name,
      category: categoryId,
      price: box.price,
      description: box.desc,
      features: box.items.map((feature) => ({ feature })),
      moq: 10,
      customisable: true,
      inStock: true,
      order: i + 1,
    }
    if (existing.docs.length) {
      if (!UPDATE) { console.log(`  ⏭  Exists: ${box.code} ${box.name}`); skipped++; continue }
      if (!DRY) {
        const imageId = await getOrUploadImage(box)
        await payload.update({ collection: 'products', id: existing.docs[0].id as number, data: { ...data, ...(imageId ? { image: imageId } : {}) } })
      }
      console.log(`  🔄 Updated: ${box.code} ${box.name}`); updated++; continue
    }
    if (DRY) { console.log(`  ➕ Would create: ${box.code} ₹${box.price} ${box.name}`); created++; continue }
    const imageId = await getOrUploadImage(box)
    await payload.create({ collection: 'products', data: { ...data, ...(imageId ? { image: imageId } : {}) } })
    console.log(`  ✅ Created: ${box.code} ₹${box.price} ${box.name}`); created++
  }

  console.log(`\n🎉 Done. Created ${created}, updated ${updated}, skipped ${skipped}.`)
  process.exit(0)
}

run().catch((err) => { console.error('Failed:', err); process.exit(1) })
