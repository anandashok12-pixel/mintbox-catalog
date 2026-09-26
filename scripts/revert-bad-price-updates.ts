import { getPayload } from 'payload'
import configPromise from '../payload.config'

const REVERTS: { name: string; price: number }[] = [
  { name: 'LAXMI JI 50 mg coin', price: 1860 },
  { name: 'PASSPORT HOLDER TERRA', price: 630 },
  { name: 'Kapila Bottle', price: 1540 },
  { name: "Women's Jamawar Shawl, Faux Pashmina, Black", price: 2100 },
  { name: 'Rechargeable Table Lamp', price: 625 },
  { name: 'Pen', price: 340 },
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  for (const { name, price } of REVERTS) {
    const result = await payload.find({
      collection: 'products',
      where: { name: { equals: name } },
      limit: 5,
      depth: 0,
    })
    if (result.docs.length === 0) {
      // fallback: like search
      const fuzzy = await payload.find({
        collection: 'products',
        where: { name: { like: name } },
        limit: 5,
        depth: 0,
      })
      if (fuzzy.docs.length === 0) {
        console.log(`  ❌ Not found: ${name}`)
        continue
      }
      result.docs.push(...fuzzy.docs)
    }
    const doc = result.docs[0]
    await payload.update({ collection: 'products', id: doc.id as number, data: { price } })
    console.log(`  ✅ Reverted "${doc.name}" → ₹${price}`)
  }

  console.log('\nDone.')
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
