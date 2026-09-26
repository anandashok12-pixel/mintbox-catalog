import { getPayload } from 'payload'
import configPromise from '../payload.config'

// Confirmed mapping: exact current DB name → new price
const UPDATES: { dbName: string; sl: number; price: number }[] = [
  { sl: 16,  dbName: 'Small Calendar',                                            price: 310  },
  { sl: 73,  dbName: '10000mAh Power Bank – Inbuilt Cable & Display',             price: 2100 },
  { sl: 74,  dbName: '30000mAh Power Bank – PD 22.5W Fast Charge',               price: 3500 },
  { sl: 76,  dbName: 'Bluetooth Smartwatch (Hydra)',                              price: 3080 },
  { sl: 158, dbName: 'Coffee Mug',                                                price: 700  },
  { sl: 177, dbName: 'Cinnamon Kitchen Berry, Cacao & Oat Cookies – 175g',       price: 465  },
  { sl: 178, dbName: 'Natch Thai Sticky Rice Chips – Wasabi 100g',               price: 380  },
  { sl: 184, dbName: 'The Whole Truth Double Cocoa Protein Bars – Pack of 8',    price: 525  },
  { sl: 193, dbName: 'Third Wave Instant Coffee – Arabica Light Roast (10 bags)',price: 755  },
  { sl: 195, dbName: 'Sancha Happy Breathing Herbal Tea – Tin Caddy (25 Bags)',  price: 420  },
  { sl: 196, dbName: 'Sancha Original Masala Chai – 100g',                       price: 450  },
  { sl: 197, dbName: 'Sancha Ceremonial Grade Matcha – 50g',                     price: 1610 },
  { sl: 203, dbName: '5:15PM Dubai-Style Kunafa Chocolate Bar – 120g',           price: 560  },
  { sl: 204, dbName: 'Ferrero Rocher Chocolate Box – 24 pcs',                    price: 1195 },
  { sl: 207, dbName: 'Entisi Nutties Hazelnut Chocolate Dragees – 120g',         price: 630  },
  { sl: 209, dbName: 'Ferrero Rocher Dark Chocolate Bar with Hazelnut – 90g',    price: 700  },
  { sl: 216, dbName: 'SMOOR Toasted Coconut Cookies – 150g (Pack of 3)',         price: 650  },
]

async function run() {
  const payload = await getPayload({ config: configPromise })
  const allDocs = (await payload.find({ collection: 'products', limit: 1000, depth: 0 })).docs as any[]

  for (const { sl, dbName, price } of UPDATES) {
    const doc = allDocs.find(d => d.name === dbName)
    if (!doc) {
      console.log(`  ❌ [${sl}] Not found in DB: "${dbName}"`)
      continue
    }
    if (doc.price === price) {
      console.log(`  ✓  [${sl}] Already ₹${price}: "${dbName}"`)
      continue
    }
    await payload.update({ collection: 'products', id: doc.id, data: { price } })
    console.log(`  ✅ [${sl}] ₹${doc.price} → ₹${price}: "${dbName}"`)
  }

  console.log('\nDone.')
  process.exit(0)
}

run().catch(e => { console.error(e); process.exit(1) })
