import { Client } from 'pg'

// Category IDs (from current DB query)
const CAT = {
  cutleryHolder: 31,
  drinkware: 81,
  diaries: 2,
  desktopAccessories: 82,
  pensStationery: 83,
  bagsBackpacks: 7,
  teaCoffee: 86,
  homeLiving: 9,
  funGames: 36,
}

async function main() {
  const url = (process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '').replace(/\\n/g, '').trim()
  const c = new Client({ connectionString: url })
  await c.connect()

  console.log('▶ STEP 1 — Create new "Fragrances & Perfumes" category')
  const { rows: fragRows } = await c.query(
    `INSERT INTO categories (name, slug, emoji, "order", description, updated_at, created_at)
     VALUES ('Fragrances & Perfumes', 'fragrances-perfumes', '🌸', 14, 'Designer perfumes and signature scents for the modern professional.', NOW(), NOW())
     ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
  )
  const FRAGRANCES_ID = fragRows[0].id
  console.log(`  Created/found: id=${FRAGRANCES_ID}`)

  console.log('\n▶ STEP 2 — Move 6 perfumes to Fragrances & Perfumes')
  const perfumeIds = [431, 432, 449, 450, 451, 459]
  const { rowCount: perfMoved } = await c.query(
    `UPDATE products SET category_id = $1 WHERE id = ANY($2::int[])`,
    [FRAGRANCES_ID, perfumeIds],
  )
  console.log(`  Moved: ${perfMoved}`)

  console.log('\n▶ STEP 3 — Move bartender kits to Drinkware')
  const bartenderIds = [435, 436, 437]
  const { rowCount: bMoved } = await c.query(
    `UPDATE products SET category_id = $1 WHERE id = ANY($2::int[])`,
    [CAT.drinkware, bartenderIds],
  )
  console.log(`  Moved: ${bMoved}`)

  console.log('\n▶ STEP 4 — Move Borosil Blender (434) → Tea & Coffee')
  await c.query(`UPDATE products SET category_id = $1 WHERE id = 434`, [CAT.teaCoffee])
  console.log('  Moved 1')

  console.log('\n▶ STEP 5 — Move LAXMI JI coin (287) → Home & Living')
  await c.query(`UPDATE products SET category_id = $1 WHERE id = 287`, [CAT.homeLiving])
  console.log('  Moved 1')

  console.log('\n▶ STEP 6 — Move SaleOn Study Lamp (430) → Desktop Accessories')
  await c.query(`UPDATE products SET category_id = $1 WHERE id = 430`, [CAT.desktopAccessories])
  console.log('  Moved 1')

  console.log('\n▶ STEP 7 — Move Premium Vegan Leather Cutlery Holder (309) → Desktop Accessories')
  await c.query(`UPDATE products SET category_id = $1 WHERE id = 309`, [CAT.desktopAccessories])
  console.log('  Moved 1')

  console.log('\n▶ STEP 8 — Dissolve "Cutlery Holder" category (now empty)')
  const { rowCount: remaining } = await c.query(`SELECT 1 FROM products WHERE category_id = $1`, [CAT.cutleryHolder])
  if (remaining === 0) {
    await c.query(`DELETE FROM categories WHERE id = $1`, [CAT.cutleryHolder])
    console.log('  Deleted Cutlery Holder category')
  } else {
    console.log(`  ⚠️  Still has ${remaining} products — not deleting`)
  }

  console.log('\n▶ STEP 9 — Merge Pens & Stationery into Diaries & Notebooks; rename combined to "Stationery & Writing"')
  // Move all products from pens-stationery → diaries
  const { rowCount: penMoved } = await c.query(
    `UPDATE products SET category_id = $1 WHERE category_id = $2`,
    [CAT.diaries, CAT.pensStationery],
  )
  console.log(`  Moved ${penMoved} pens/stationery products to diaries`)
  // Rename diaries to "Stationery & Writing"
  await c.query(
    `UPDATE categories SET name = 'Stationery & Writing', slug = 'stationery-writing' WHERE id = $1`,
    [CAT.diaries],
  )
  console.log('  Renamed Diaries & Notebooks → Stationery & Writing')
  // Delete now-empty pens-stationery
  const { rowCount: pensLeft } = await c.query(`SELECT 1 FROM products WHERE category_id = $1`, [CAT.pensStationery])
  if (pensLeft === 0) {
    await c.query(`DELETE FROM categories WHERE id = $1`, [CAT.pensStationery])
    console.log('  Deleted empty Pens & Stationery category')
  }

  console.log('\n▶ STEP 10 — Rename Bags & Backpacks → "Bags, Backpacks & Travel Accessories"')
  await c.query(
    `UPDATE categories SET name = 'Bags, Backpacks & Travel Accessories', slug = 'bags-travel-accessories' WHERE id = $1`,
    [CAT.bagsBackpacks],
  )
  console.log('  Renamed')

  console.log('\n▶ STEP 11 — Fix typos in 6 product names')
  const typoFixes: { id: number; newName: string }[] = [
    { id: 82, newName: 'Large Table Calendar' },
    { id: 169, newName: 'Small Calendar' },
    { id: 318, newName: "Women's Jamawar Shawl, Faux Pashmina, Black" },
    { id: 334, newName: '3 in 1 Charging Cable' },
    { id: 359, newName: 'Coffee & Tea Maker' },
    { id: 362, newName: 'Bluetooth Speaker Gramophone' },
  ]
  for (const t of typoFixes) {
    await c.query(`UPDATE products SET name = $1 WHERE id = $2`, [t.newName, t.id])
    console.log(`  [${t.id}] → ${t.newName}`)
  }

  console.log('\n▶ FINAL STATE')
  const { rows: finalCats } = await c.query(`
    SELECT c.id, c."order", c.name, c.slug, COUNT(p.id) AS count
    FROM categories c LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id ORDER BY c."order"
  `)
  for (const r of finalCats) console.log(`  ${r.order}\t[${r.id}] ${r.name.padEnd(40)} ${r.count} items`)

  await c.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
