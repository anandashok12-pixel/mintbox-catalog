import { DIWALI_2026_PRODUCTS } from '../../src/data/diwali2026Products'
import { PRODUCT_LIST } from './product-list'

const BASE_URL = 'http://localhost:3010/dev-preview/diwali-2026-catalog'
const rows = ['| # | Name | Category | Tier | Price (MRP) | Display Mode | Local URL |', '|---|---|---|---|---|---|---|']

DIWALI_2026_PRODUCTS.forEach((p, i) => {
  const num = i + 1
  const listItem = PRODUCT_LIST[i]
  rows.push(`| ${num} | ${p.name} | ${p.category.name} | ${listItem.tier} | ₹${p.price.toLocaleString('en-IN')} | ${p.displayMode} | [${BASE_URL}#product-${p.id}](${BASE_URL}#product-${p.id}) |`)
})

console.log(rows.join('\n'))
