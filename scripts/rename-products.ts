import { Client } from 'pg'

const RENAMES: { id: number; newName: string }[] = [
  { id: 444, newName: 'CAVALO PU Leather Diary with Pen Holder (Sea Green, 200pg)' },
  { id: 440, newName: 'WEMATE A5 Combination-Lock PU Leather Diary (Black, 240pg)' },
  { id: 453, newName: 'PLUSPOINT Vintage Quill Feather Pen & Ink Set (Black)' },
  { id: 447, newName: 'CAVALO Handmade Leather Diary, Leaf Embossed (240pg)' },
  { id: 436, newName: 'Car-O-Bar 10pc Gold Bartender Kit with Wooden Stand' },
  { id: 435, newName: 'Perch Craft 8pc Stainless Steel Bartender Kit' },
  { id: 442, newName: 'Anupam Fluct A6 Ruled Journal (Black, 160pg)' },
  { id: 437, newName: 'SAKI 10pc Bartender Kit with Gray Stand' },
  { id: 424, newName: 'AGARO Royal Drip Coffee Maker, 600ml, 750W (Black/Silver)' },
  { id: 426, newName: 'InstaCuppa 2-in-1 Moka Pot Espresso Maker, 300ml (Red)' },
  { id: 456, newName: 'Cello Signature Jubilee Pen + Birthday Scroll Gift Set' },
  { id: 446, newName: 'Personalised 7-in-1 Corporate Gift Set' },
  { id: 455, newName: 'Indian Art Villa Copper Drinkware Set (Bottle + 2 Glasses)' },
  { id: 445, newName: '4-in-1 Corporate Gift Set (Diary, Pen, Keychain, Card Holder)' },
  { id: 434, newName: 'Borosil NutriGrip Portable Blender, 300ml (Blue)' },
  { id: 425, newName: 'Traditional Brass Coffee Filter Set with 2 Dabra (200ml)' },
  { id: 454, newName: 'Cello Bharat Heritage Pen with Warli Art Wooden Box' },
  { id: 450, newName: 'Bella Vita Luxury CEO Man Perfume (100ml)' },
  { id: 429, newName: 'One94Store Silicone Pear Night Lamp (7-Colour LED)' },
  { id: 459, newName: 'Bellavita White Oud Unisex Perfume (100ml)' },
  { id: 428, newName: 'NYRWANA Rechargeable Table Lamp (Metal Gold, 3-Colour)' },
  { id: 432, newName: 'EM5 Alcohol-Free Solid Perfumes Combo (Oud + Nomade)' },
  { id: 449, newName: 'Bella Vita Luxury Men Perfume Gift Set (4×20ml)' },
  { id: 451, newName: 'Bella Vita Luxury Date Perfume for Women (100ml)' },
  { id: 430, newName: 'SaleOn LED Study Lamp with Pen Stand & Mobile Holder' },
  { id: 448, newName: 'Kitabby Legacy Notch A5 Notebook with Pen (Black)' },
  { id: 433, newName: 'FLYNGO Touch-Control LED Night Lamp, USB Rechargeable' },
  { id: 439, newName: 'KALP A5 Notebook + Pocket Diary Set (160pg, Ruled)' },
  { id: 427, newName: 'Homesake Retro Metal Table Lamp with Pleated Shade' },
  { id: 431, newName: 'Bella Vita Luxury Unisex Perfume Gift Set (4×20ml)' },
  { id: 458, newName: 'Parker Vector Roller Pen + Keychain Gift Set' },
  { id: 452, newName: 'Pierre Cardin Ball Pen + Leather Diary Gift Set' },
  { id: 438, newName: 'Paperkraft Vintage Series A5 Notebook (Pack of 3)' },
  { id: 443, newName: 'REGAL Timeless Charm A5 PU Leather Notebook (Deep Brown)' },
  { id: 441, newName: 'AccuPrints A5 Hard Bound Diary with Belt Lock (Grey Green)' },
  { id: 423, newName: 'Borosil Brew Pro Drip Coffee Machine (600ml, 6 Cups)' },
  { id: 420, newName: 'Kettle Studio Chips – Jalapeños & Cream Cheese' },
  { id: 405, newName: '4700BC Mocha Walnut Chocolate Popcorn Tin (135g)' },
  { id: 393, newName: 'Third Wave Instant Coffee – Arabica Light Roast (10 bags)' },
  { id: 421, newName: "Shim's Gourmet Crunchy Cassava Chips (Assorted Combo)" },
]

async function main() {
  const url = (process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '').replace(/\\n/g, '').trim()
  const c = new Client({ connectionString: url })
  await c.connect()

  let updated = 0
  let skipped = 0

  for (const r of RENAMES) {
    if (r.newName.length > 70) {
      console.log(`  ⚠️  [${r.id}] Proposed name still ${r.newName.length} chars: ${r.newName}`)
    }
    const result = await c.query('UPDATE products SET name = $1 WHERE id = $2 RETURNING name', [r.newName, r.id])
    if (result.rowCount === 0) {
      console.log(`  ⚠️  [${r.id}] Not found`)
      skipped++
    } else {
      console.log(`  ✅ [${r.id}] (${r.newName.length}) ${r.newName}`)
      updated++
    }
  }

  console.log(`\n${updated} renamed, ${skipped} skipped.`)
  await c.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
