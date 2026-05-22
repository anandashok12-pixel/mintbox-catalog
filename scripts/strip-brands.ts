import { Client } from 'pg'

const RENAMES: { id: number; newName: string }[] = [
  { id: 441, newName: 'A5 Hard Bound Diary with Belt Lock (Grey Green)' },
  { id: 440, newName: 'A5 Combination-Lock PU Leather Diary (Black, 240pg)' },
  { id: 439, newName: 'A5 Notebook + Pocket Diary Set (160pg, Ruled)' },
  { id: 453, newName: 'Vintage Quill Feather Pen & Ink Set (Black)' },
  { id: 443, newName: 'Timeless Charm A5 PU Leather Notebook (Deep Brown)' },
  { id: 444, newName: 'PU Leather Diary with Pen Holder (Sea Green, 200pg)' },
  { id: 447, newName: 'Handmade Leather Diary, Leaf Embossed (240pg)' },
  { id: 448, newName: 'Legacy Notch A5 Notebook with Pen (Black)' },
  { id: 432, newName: 'Alcohol-Free Solid Perfumes Combo (Oud + Nomade)' },
  { id: 429, newName: 'Silicone Pear Night Lamp (7-Colour LED)' },
  { id: 430, newName: 'LED Study Lamp with Pen Stand & Mobile Holder' },
  { id: 433, newName: 'Touch-Control LED Night Lamp, USB Rechargeable' },
  { id: 428, newName: 'Rechargeable Table Lamp (Metal Gold, 3-Colour)' },
  { id: 436, newName: '10pc Gold Bartender Kit with Wooden Stand' },
  { id: 435, newName: '8pc Stainless Steel Bartender Kit' },
  { id: 437, newName: '10pc Bartender Kit with Gray Stand' },
  { id: 130, newName: 'True Wireless Earbuds (A6 Kapo)' },
  { id: 133, newName: 'True Wireless Earbuds (Pro 5)' },
  { id: 131, newName: 'True Wireless Earbuds (Dura A4)' },
  { id: 124, newName: 'Bluetooth Headphones (Elite 9)' },
  { id: 123, newName: 'Wireless Bluetooth Headphones' },
  { id: 132, newName: 'TWS Earbuds (Z22 Master Beats)' },
  { id: 134, newName: 'Wireless Neckband (N600)' },
  { id: 284, newName: 'Bluetooth Smartwatch (Hydra)' },
  { id: 137, newName: '10000mAh Wireless Power Bank (Rush)' },
  { id: 282, newName: '30000mAh Power Bank – PD 22.5W Fast Charge' },
  { id: 281, newName: '10000mAh Power Bank – Inbuilt Cable & Display' },
  { id: 136, newName: '5000mAh Magnetic Wireless Power Bank (Vox)' },
  { id: 135, newName: '10000mAh Wireless Power Bank (Prod)' },
  { id: 127, newName: '5W Wireless Bluetooth Speaker (Unix Bella)' },
  { id: 128, newName: 'Wireless Bluetooth Speaker (Unix Capri 52)' },
  { id: 125, newName: '5W Wireless Bluetooth Speaker (Unix Plato XB-U88)' },
  { id: 126, newName: '20W Wireless Bluetooth Speaker (Unix Taro Mantra)' },
  { id: 129, newName: '8W Portable Bluetooth Speaker (GEO Inspire)' },
]

async function main() {
  const url = (process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '').replace(/\\n/g, '').trim()
  const c = new Client({ connectionString: url })
  await c.connect()

  let updated = 0
  for (const r of RENAMES) {
    const result = await c.query('UPDATE products SET name = $1 WHERE id = $2 RETURNING name', [r.newName, r.id])
    if (result.rowCount === 0) {
      console.log(`  ⚠️  [${r.id}] Not found`)
    } else {
      console.log(`  ✅ [${r.id}] (${r.newName.length}) ${r.newName}`)
      updated++
    }
  }
  console.log(`\n${updated} renamed.`)
  await c.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
