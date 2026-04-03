import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding MintBox catalog...')

  const categories = [
    { name: 'Packaging', slug: 'packaging', emoji: '📦', order: 1, description: 'Premium gift boxes, bags and wrapping solutions' },
    { name: 'Diaries & Notebooks', slug: 'diaries', emoji: '📔', order: 2, description: 'Branded journals and notebooks for every professional' },
    { name: 'Flasks & Mugs', slug: 'flasks-mugs', emoji: '☕', order: 3, description: 'Drinkware that keeps your brand top of mind' },
    { name: 'Holi Specials', slug: 'holi-specials', emoji: '🎨', order: 4, description: 'Vibrant gifting for the festival of colours' },
    { name: 'Tech Items', slug: 'tech-items', emoji: '💻', order: 5, description: 'Smart gadgets and accessories for the modern professional' },
    { name: 'Apparel', slug: 'apparel', emoji: '👕', order: 6, description: 'Custom branded clothing and accessories' },
    { name: 'Bags & Backpacks', slug: 'bags-backpacks', emoji: '🎒', order: 7, description: 'Carry your brand everywhere with premium bags' },
    { name: 'Bottles', slug: 'bottles', emoji: '🍶', order: 8, description: 'Sustainable and stylish hydration solutions' },
    { name: 'Home & Living', slug: 'home-living', emoji: '🏠', order: 9, description: 'Thoughtful gifts for the home and lifestyle' },
    { name: 'Cool Extras', slug: 'cool-extras', emoji: '✨', order: 10, description: 'Unique add-ons that make every pack memorable' },
  ]

  const createdCategories: Record<string, number> = {}

  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })
    if (existing.docs.length > 0) {
      console.log(`  ⏭  Category already exists: ${cat.name}`)
      createdCategories[cat.slug] = existing.docs[0].id as number
      continue
    }
    const created = await payload.create({
      collection: 'categories',
      data: cat,
    })
    createdCategories[cat.slug] = created.id as number
    console.log(`  ✅ Created category: ${cat.name}`)
  }

  const products = [
    // Packaging
    {
      name: 'Premium Kraft Gift Box',
      categorySlug: 'packaging',
      price: 120,
      emoji: '📦',
      description: 'Sturdy kraft paper gift box with magnetic closure. Perfect for assembling corporate gift hampers with a premium unboxing experience.',
      features: [
        { feature: 'Magnetic snap closure' },
        { feature: 'Ribbon pull tab' },
        { feature: 'Available in 4 sizes' },
        { feature: 'Custom printing available' },
        { feature: 'Eco-friendly material' },
      ],
      moq: 50,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Luxury Rigid Gift Box',
      categorySlug: 'packaging',
      price: 280,
      emoji: '🎁',
      description: 'Hard-cover rigid gift box with velvet interior lining. Ideal for premium gifting where presentation matters most.',
      features: [
        { feature: 'Velvet inner lining' },
        { feature: 'Gold foil stamping option' },
        { feature: 'Custom sleeve insert' },
        { feature: 'Multiple size options' },
      ],
      moq: 25,
      customisable: true,
      inStock: true,
      order: 2,
    },

    // Diaries
    {
      name: 'Executive Leather Diary',
      categorySlug: 'diaries',
      price: 450,
      emoji: '📔',
      description: 'A5 soft-touch PU leather diary with ribbon bookmark, elastic band, and 192 ruled pages. A timeless classic for executive gifting.',
      features: [
        { feature: 'A5 size, 192 pages' },
        { feature: 'Soft-touch PU leather cover' },
        { feature: 'Ribbon bookmark' },
        { feature: 'Business card pocket' },
        { feature: 'Debossing available' },
      ],
      moq: 50,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Spiral Notebook Set',
      categorySlug: 'diaries',
      price: 180,
      emoji: '📓',
      description: 'Set of two A5 spiral notebooks with 120 pages each. Smooth writing experience with perforated pages for easy tear-out.',
      features: [
        { feature: 'Set of 2 notebooks' },
        { feature: '120 pages each' },
        { feature: 'Perforated pages' },
        { feature: 'Pen loop included' },
        { feature: 'Custom cover print' },
      ],
      moq: 100,
      customisable: true,
      inStock: true,
      order: 2,
    },
    {
      name: 'Bamboo Cover Journal',
      categorySlug: 'diaries',
      price: 320,
      emoji: '🌿',
      description: 'Eco-friendly journal with natural bamboo cover and cream-toned recycled pages. A sustainable choice for conscious corporate gifting.',
      features: [
        { feature: 'Natural bamboo cover' },
        { feature: 'Recycled paper pages' },
        { feature: '180 pages dotted/ruled' },
        { feature: 'Elastic closure' },
        { feature: 'Engraving available' },
      ],
      moq: 30,
      customisable: true,
      inStock: true,
      order: 3,
    },

    // Flasks & Mugs
    {
      name: 'Double Wall Ceramic Mug',
      categorySlug: 'flasks-mugs',
      price: 220,
      emoji: '☕',
      description: '350ml double-wall ceramic mug with silicone grip sleeve. Keeps beverages warm for longer while looking premium on any desk.',
      features: [
        { feature: '350ml capacity' },
        { feature: 'Double wall insulation' },
        { feature: 'BPA-free ceramic' },
        { feature: 'Silicone grip sleeve' },
        { feature: 'Full colour print' },
      ],
      moq: 50,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Stainless Steel Travel Flask',
      categorySlug: 'flasks-mugs',
      price: 480,
      emoji: '🍵',
      description: '500ml vacuum insulated stainless steel flask. Keeps hot for 12 hours and cold for 24. The go-to for commuters and travelers.',
      features: [
        { feature: '500ml capacity' },
        { feature: '12h hot / 24h cold' },
        { feature: '18/8 stainless steel' },
        { feature: 'Leak-proof lid' },
        { feature: 'Laser engraving' },
      ],
      moq: 25,
      customisable: true,
      inStock: true,
      order: 2,
    },

    // Holi Specials
    {
      name: 'Holi Colour Gift Set',
      categorySlug: 'holi-specials',
      price: 350,
      emoji: '🎨',
      description: 'Festive gift set with 5 premium herbal gulaal pouches in vibrant colours, packed in a branded kraft box. Safe for all skin types.',
      features: [
        { feature: '5 herbal colour pouches' },
        { feature: 'Skin-safe, natural dyes' },
        { feature: 'Festive kraft box' },
        { feature: 'Custom message card' },
        { feature: 'Bulk hamper ready' },
      ],
      moq: 25,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Holi Sweets & Colours Hamper',
      categorySlug: 'holi-specials',
      price: 750,
      emoji: '🌸',
      description: 'Premium Holi hamper with artisanal gujiyas, 4 herbal colour packets, a pichkari, and a personalised greeting card.',
      features: [
        { feature: 'Artisanal gujiya box (6 pcs)' },
        { feature: '4 herbal colour packets' },
        { feature: 'Mini pichkari included' },
        { feature: 'Personalised card' },
        { feature: 'Luxury box packaging' },
      ],
      moq: 15,
      customisable: true,
      inStock: true,
      order: 2,
    },

    // Tech Items
    {
      name: 'Wireless Charging Pad',
      categorySlug: 'tech-items',
      price: 650,
      emoji: '⚡',
      description: '10W Qi wireless charging pad compatible with all modern smartphones. Slim, non-slip design with LED indicator and USB-C input.',
      features: [
        { feature: '10W fast wireless charging' },
        { feature: 'Qi universal compatible' },
        { feature: 'Non-slip silicone base' },
        { feature: 'LED charging indicator' },
        { feature: 'Custom logo printing' },
      ],
      moq: 25,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'USB-C Hub 5-in-1',
      categorySlug: 'tech-items',
      price: 1200,
      emoji: '💻',
      description: 'Compact 5-in-1 USB-C hub with 4K HDMI, 2x USB-A, SD card reader, and USB-C PD passthrough. Ideal for remote workers and travellers.',
      features: [
        { feature: '4K HDMI output' },
        { feature: '2x USB-A 3.0 ports' },
        { feature: 'SD + microSD reader' },
        { feature: '100W PD passthrough' },
        { feature: 'Aluminium body' },
      ],
      moq: 10,
      customisable: false,
      inStock: true,
      order: 2,
    },
    {
      name: 'Wireless Earbuds',
      categorySlug: 'tech-items',
      price: 1450,
      emoji: '🎧',
      description: 'True wireless earbuds with 6hr playback + 18hr charging case. Touch controls, IPX4 water resistance, and deep bass drivers.',
      features: [
        { feature: '6h + 18h battery life' },
        { feature: 'IPX4 water resistant' },
        { feature: 'Touch control' },
        { feature: 'Noise isolation' },
        { feature: 'Branded case lid print' },
      ],
      moq: 10,
      customisable: true,
      inStock: true,
      order: 3,
    },

    // Apparel
    {
      name: 'Premium Cotton T-Shirt',
      categorySlug: 'apparel',
      price: 320,
      emoji: '👕',
      description: '180 GSM 100% cotton round-neck t-shirt with pre-shrunk fabric. Available in S/M/L/XL/XXL. Ideal for team events and onboarding kits.',
      features: [
        { feature: '180 GSM combed cotton' },
        { feature: 'Pre-shrunk fabric' },
        { feature: 'Sizes S to XXL' },
        { feature: 'Screen/DTF print' },
        { feature: '15+ colour options' },
      ],
      moq: 50,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Fleece Zip Hoodie',
      categorySlug: 'apparel',
      price: 750,
      emoji: '🧥',
      description: '280 GSM polar fleece zip-up hoodie. Anti-pilling fabric with front pockets and YKK zipper. Great for team gifting in cooler months.',
      features: [
        { feature: '280 GSM polar fleece' },
        { feature: 'YKK zipper' },
        { feature: 'Anti-pilling' },
        { feature: 'Embroidery ready' },
        { feature: 'Unisex sizing' },
      ],
      moq: 25,
      customisable: true,
      inStock: true,
      order: 2,
    },

    // Bags & Backpacks
    {
      name: 'Canvas Tote Bag',
      categorySlug: 'bags-backpacks',
      price: 180,
      emoji: '👜',
      description: '12oz natural canvas tote with reinforced stitching and long handles. Eco-friendly, spacious, and perfect for everyday carry.',
      features: [
        { feature: '12oz natural canvas' },
        { feature: 'Reinforced handles' },
        { feature: '38 x 42cm size' },
        { feature: 'Full-colour screen print' },
        { feature: '8kg load capacity' },
      ],
      moq: 100,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Laptop Backpack 15.6"',
      categorySlug: 'bags-backpacks',
      price: 980,
      emoji: '🎒',
      description: 'Water-resistant 28L laptop backpack with padded 15.6" compartment, USB charging port, and organiser pockets. Office meets travel.',
      features: [
        { feature: '28L capacity' },
        { feature: '15.6" padded laptop sleeve' },
        { feature: 'USB charging port' },
        { feature: 'Water-resistant 600D fabric' },
        { feature: 'Custom embroidery' },
      ],
      moq: 15,
      customisable: true,
      inStock: true,
      order: 2,
    },

    // Bottles
    {
      name: 'Tritan Sports Bottle 750ml',
      categorySlug: 'bottles',
      price: 280,
      emoji: '🍶',
      description: '750ml BPA-free Tritan plastic sports bottle with flip lid and carry loop. Dishwasher safe and shatterproof — built for active use.',
      features: [
        { feature: '750ml BPA-free Tritan' },
        { feature: 'Flip-top leak-proof lid' },
        { feature: 'Dishwasher safe' },
        { feature: 'Shatterproof' },
        { feature: 'Full wrap print' },
      ],
      moq: 50,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Copper Insulated Bottle 1L',
      categorySlug: 'bottles',
      price: 520,
      emoji: '🏺',
      description: '1L copper-finished stainless steel bottle with vacuum insulation. Keeps water cold for 24h. An elevated everyday companion.',
      features: [
        { feature: '1000ml capacity' },
        { feature: 'Copper finish exterior' },
        { feature: '24h cold / 12h hot' },
        { feature: 'Wide mouth opening' },
        { feature: 'Engraving available' },
      ],
      moq: 25,
      customisable: true,
      inStock: true,
      order: 2,
    },

    // Home & Living
    {
      name: 'Scented Soy Candle',
      categorySlug: 'home-living',
      price: 380,
      emoji: '🕯️',
      description: 'Hand-poured 200g soy wax candle with cotton wick. Available in 6 artisan fragrances. A luxurious, thoughtful gift for home and office.',
      features: [
        { feature: '200g soy wax' },
        { feature: '45+ hour burn time' },
        { feature: 'Cotton wick, no toxins' },
        { feature: '6 fragrance options' },
        { feature: 'Custom label printing' },
      ],
      moq: 20,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Bamboo Desk Organiser',
      categorySlug: 'home-living',
      price: 450,
      emoji: '🏠',
      description: 'Natural bamboo desk organiser with 5 compartments for pens, phones, cards, and more. Elegant, functional, and sustainable.',
      features: [
        { feature: '5 compartments' },
        { feature: 'Natural bamboo finish' },
        { feature: 'Non-slip base' },
        { feature: 'Laser engraving' },
        { feature: 'Eco-certified material' },
      ],
      moq: 20,
      customisable: true,
      inStock: true,
      order: 2,
    },

    // Cool Extras
    {
      name: 'Custom Metal Pen',
      categorySlug: 'cool-extras',
      price: 85,
      emoji: '✒️',
      description: 'Slim executive metal ballpoint pen with smooth German ink refill. A small touch that adds class to every gifting pack.',
      features: [
        { feature: 'German ink refill' },
        { feature: 'Matte metal finish' },
        { feature: 'Clip closure' },
        { feature: 'Laser engraving' },
        { feature: 'Velvet pen sleeve' },
      ],
      moq: 100,
      customisable: true,
      inStock: true,
      order: 1,
    },
    {
      name: 'Seed Paper Thank You Cards',
      categorySlug: 'cool-extras',
      price: 45,
      emoji: '🌱',
      description: 'Plantable seed paper cards embedded with wildflower seeds. Recipients can plant the card and grow flowers. Zero waste gifting.',
      features: [
        { feature: 'Plantable seed paper' },
        { feature: 'Wildflower seed mix' },
        { feature: 'Custom message print' },
        { feature: '100% zero waste' },
        { feature: 'Set of 5 cards' },
      ],
      moq: 100,
      customisable: true,
      inStock: true,
      order: 2,
    },
    {
      name: 'Magnetic Phone Stand',
      categorySlug: 'cool-extras',
      price: 290,
      emoji: '📱',
      description: 'Adjustable aluminium magnetic phone stand compatible with MagSafe and all smartphones. Sleek desk accessory for the modern workspace.',
      features: [
        { feature: 'MagSafe compatible' },
        { feature: 'Adjustable angle 0–90°' },
        { feature: 'Aluminium body' },
        { feature: 'Weighted non-slip base' },
        { feature: 'Logo etching option' },
      ],
      moq: 25,
      customisable: true,
      inStock: true,
      order: 3,
    },
  ]

  for (const product of products) {
    const { categorySlug, ...productData } = product
    const categoryId = createdCategories[categorySlug]

    if (!categoryId) {
      console.log(`  ⚠️  Category not found for: ${product.name} (slug: ${categorySlug})`)
      continue
    }

    const existing = await payload.find({
      collection: 'products',
      where: { name: { equals: product.name } },
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Product already exists: ${product.name}`)
      continue
    }

    await payload.create({
      collection: 'products',
      data: {
        ...productData,
        category: categoryId,
      },
    })
    console.log(`  ✅ Created product: ${product.name}`)
  }

  console.log('\n🎉 Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
