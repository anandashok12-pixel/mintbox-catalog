/**
 * Master list for the Diwali 2026 / corporate gifting catalog build (local-only
 * review phase). Source: the 50-product brief for the MintBox catalog expansion.
 * `handle` is the supplier's public Shopify product handle, used only to fetch
 * reference facts (contents, size, fragrance) — never rendered or stored anywhere
 * client-facing. See scripts/supplier-data/fetch-supplier-data.ts.
 */

export type Tier = 'premium' | 'mid' | 'budget'

export interface SourceListItem {
  num: number
  tier: Tier
  workingName: string
  supplierPriceRaw: string
  handle: string
}

export const PRODUCT_LIST: SourceListItem[] = [
  // Premium (Rs 700+)
  { num: 1, tier: 'premium', workingName: 'Maharaja Royal Votive Candle Gift Set', supplierPriceRaw: '1200', handle: 'maharaja-royal-votive-candle-gift-set' },
  { num: 2, tier: 'premium', workingName: 'Wooden Whisper Duo Gift Set', supplierPriceRaw: '1399', handle: 'auradecor-wooden-whisper-duo-gift-set' },
  { num: 3, tier: 'premium', workingName: 'Wooden Urli Candle', supplierPriceRaw: '1149-1499', handle: 'auradecor-grandeur-wooden-urli-candle' },
  { num: 4, tier: 'premium', workingName: 'Luxe Noir 500ml Reed Diffuser', supplierPriceRaw: '1599', handle: 'auradecor-luxe-noir-500ml-reed-diffuser' },
  { num: 5, tier: 'premium', workingName: 'Candle Warmer Lamp with Aroma Candle', supplierPriceRaw: '1499', handle: 'auradecor-candle-warmer-lamp-with-an-aroma-candle' },
  { num: 6, tier: 'premium', workingName: 'Electric Candle Warmer with Aroma Candle', supplierPriceRaw: '1599', handle: 'auradecor-electric-candle-warmer-with-an-aroma-candle' },
  { num: 7, tier: 'premium', workingName: 'Smart Aroma Diffuser (app controlled)', supplierPriceRaw: '3500', handle: 'auradecor-plug2-smart-aroma-diffuser-app-controlled-fragrance-for-modern-spaces' },
  { num: 8, tier: 'premium', workingName: 'Set of 3 Lotus Urli Gift Set (Oudh)', supplierPriceRaw: '999', handle: 'set-of-3-urli-gift-set-oudh-fragrance-tin-urli-gift-set-festival-gift-set' },
  { num: 9, tier: 'premium', workingName: 'Set of 2 Fragrance Urli Candles Gift Pack', supplierPriceRaw: '999', handle: 'auradecor-set-of-2-fragrance-urli-candles-in-a-gift-pack' },
  { num: 10, tier: 'premium', workingName: 'Sanskrit Serenity Candle Gift Set', supplierPriceRaw: '900', handle: 'auradecor-sanskrit-serenity-candle-gift-set' },
  { num: 11, tier: 'premium', workingName: 'Golfer Figurine, Black & Gold', supplierPriceRaw: '999', handle: 'auradecor-golfer-figurine-modern-abstract-resin-showpiece-in-black-gold' },
  { num: 12, tier: 'premium', workingName: 'Saxophone Player Figurine, Black & Gold', supplierPriceRaw: '999', handle: 'auradecor-saxophone-player-figurine-modern-abstract-resin-showpiece-in-black-gold' },
  { num: 13, tier: 'premium', workingName: 'Aromatherapy Flame Humidifier', supplierPriceRaw: '999', handle: 'auradecor-aromatherapy-flame-humidifier-quiet-mist-humidifiers-aroma-air-diffusers-with-auto-shut-off-protection-mini-flame-light-humidifier-atomization' },
  { num: 14, tier: 'premium', workingName: 'Black Gold Dust Pillar Candles Gift Set', supplierPriceRaw: '749', handle: 'auradecor-black-gold-dust-pillar-candles-gift-set-3-4-6-inches-each' },
  { num: 15, tier: 'premium', workingName: 'Aromatherapy Combo Gift Pack', supplierPriceRaw: '749', handle: 'aura-combo-gift-pack-for-aromatherapy-corporate-gifting' },
  { num: 16, tier: 'premium', workingName: 'Blue Premium Reed Diffuser Gift Set', supplierPriceRaw: '749', handle: 'solar-reed-diffuser-gift-set' },

  // Mid (Rs 400 to 699)
  { num: 17, tier: 'mid', workingName: 'Premium Amber Jar Candle Set of 4', supplierPriceRaw: '699', handle: 'auradecor-amber-jar-set-4-in-2-variants-in-a-gift-box' },
  { num: 18, tier: 'mid', workingName: 'Phool-2 Diwali Gift Set', supplierPriceRaw: '650', handle: 'phool-2-diwali-gift-set' },
  { num: 19, tier: 'mid', workingName: 'Urli Gift Set with Floating Candles', supplierPriceRaw: '600', handle: 'auradecor-urli-gift-set-with-floating-candles-potpourri-in-a-gift-box' },
  { num: 20, tier: 'mid', workingName: 'Moroccan Tin Gift Set of 4', supplierPriceRaw: '599', handle: 'morrocan-tin-gift-set-set-of-4' },
  { num: 21, tier: 'mid', workingName: 'Aromatherapy Gift Set (diffuser, reed, potpourri)', supplierPriceRaw: '599', handle: 'auradecor-aromatherapy-giftset-aroma-diffuser-reed-diffuser-potpourri-tealights-gs-18' },
  { num: 22, tier: 'mid', workingName: 'Hammered Golden Urli Bowl 12 inch', supplierPriceRaw: '599', handle: 'auradecor-decorative-urli-bowl-for-floating-flowers-potpourri-and-tea-light-candles-home-office-and-table-decor-hammerd-golden-urli-12-inch-dia' },
  { num: 23, tier: 'mid', workingName: 'Set of 3 Gold Pillar Candles', supplierPriceRaw: '550', handle: 'set-of-3-gold-pillar-candles' },
  { num: 24, tier: 'mid', workingName: 'Elegante Reed Diffuser Gift Set 100ml', supplierPriceRaw: '549', handle: 'auradecor-elegante-reed-diffuser-gift-set-premium-home-fragrance-with-dried-flowers-100-ml' },
  { num: 25, tier: 'mid', workingName: 'Luxury Pillar Candles Set of 3', supplierPriceRaw: '499-899', handle: 'copy-of-auradecor-set-of-3-pillar-candles-3-3-3-4-3-6-inch' },
  { num: 26, tier: 'mid', workingName: 'Single Lotus Urli Candle Gift Set', supplierPriceRaw: '499', handle: 'lotus-urli-candle-gift-set-single-oudh-fragrance-festival-gift-set' },
  { num: 27, tier: 'mid', workingName: 'Amber Gold Gift Set', supplierPriceRaw: '499', handle: 'auradecor-amber-gold-gift-set-scented-candles-potpourri' },
  { num: 28, tier: 'mid', workingName: 'Velvet Addiction Candle, Single Malt', supplierPriceRaw: '499', handle: 'auradecor-velvet-addiction-bold-scented-candle-single-malt' },
  { num: 29, tier: 'mid', workingName: 'Embrace Soy Candle, Oudh & Honey', supplierPriceRaw: '499', handle: 'auradecor-embrace-scented-soy-candle-oudh-honey-blend' },
  { num: 30, tier: 'mid', workingName: 'Set of 4 Frosted Fragrance Glass Candles', supplierPriceRaw: '499', handle: 'set-of-4-frosted-fragrance-glass-candle' },
  { num: 31, tier: 'mid', workingName: 'Reed Diffuser Gift Set with Potpourri', supplierPriceRaw: '499', handle: 'reed-diffuser-gift-set-with-potpourri-master-box' },
  { num: 32, tier: 'mid', workingName: 'Aroma Diffuser Gift Set, Lavender', supplierPriceRaw: '499', handle: 'aroma-diffuser-gift-set-with-incense-sticks-floating-candles-1' },
  { num: 33, tier: 'mid', workingName: 'Set of 12 Fragrance Votive Glass Candles', supplierPriceRaw: '459', handle: 'auradecor-set-of-12-fragrance-votive-glass-candles-burn-upto-12-hour' },
  { num: 34, tier: 'mid', workingName: 'Elysian Reed Diffuser, Lavender & Oudh', supplierPriceRaw: '449', handle: 'auradecor-elysian-reed-diffuser-lavender-oudh-aroma-diffuser' },
  { num: 35, tier: 'mid', workingName: 'Fragrance Urli Candle, Oudh', supplierPriceRaw: '400-1015', handle: 'auradecor-urli-candle-for-festivals' },
  { num: 36, tier: 'mid', workingName: 'Phool-1 Diwali Gift Set', supplierPriceRaw: '400', handle: 'phool-1-diwali-gift-set' },

  // Budget (under Rs 400)
  { num: 37, tier: 'budget', workingName: 'Royal Flush Playing Card Candle Gift Set', supplierPriceRaw: '399', handle: 'auradecor-royal-flush-playing-card-theme-candle-gift-set-poker-teen-patti-inspired' },
  { num: 38, tier: 'budget', workingName: 'Floral Bloom Scented Candle', supplierPriceRaw: '399', handle: 'floral-bloom-scented-candle' },
  { num: 39, tier: 'budget', workingName: 'Aromatherapy Gift Set (AD 05)', supplierPriceRaw: '360', handle: 'auradecor-aromatherapy-gift-set' },
  { num: 40, tier: 'budget', workingName: 'Camphor Reed Diffuser 100ml', supplierPriceRaw: '349', handle: 'auradecor-camphor-reed-diffuser-100ml-long-lasting-home-fragrance-with-black-reed-sticks' },
  { num: 41, tier: 'budget', workingName: 'Scented Tomb Lid Jar Candle', supplierPriceRaw: '349', handle: 'auradecor-scented-tomb-lid-jar-candle' },
  { num: 42, tier: 'budget', workingName: 'Divine Pooja Diwali Gift Box', supplierPriceRaw: '299', handle: 'auradecor-divine-pooja-diwali-gift-box-premium-spiritual-gift-hamper-with-lotus-urli-candle-diyas' },
  { num: 43, tier: 'budget', workingName: 'Black Lid Jar Candle in Gift Box', supplierPriceRaw: '299', handle: 'auradecor-black-lid-jar-candle' },
  { num: 44, tier: 'budget', workingName: 'Playing Deck Pillar Candle Set', supplierPriceRaw: '299', handle: 'playing-deck-pillar-candle-set-hearts-diamonds-spades-clubs' },
  { num: 45, tier: 'budget', workingName: 'Jharokha Wall Decor with LED Candles', supplierPriceRaw: '250-400', handle: 'traditional-jharokha-wall-decor-set-with-led-candles-festive-indian-home-decoration' },
  { num: 46, tier: 'budget', workingName: 'Shubh Labh Scented Candle Set of 2', supplierPriceRaw: '199', handle: 'shubh-labh-scented-candle-set-of-2-festive-home-decor-gifting' },
  { num: 47, tier: 'budget', workingName: 'Golden Mercury Votive Candles, Set of 2', supplierPriceRaw: '179', handle: 'golden-mercury-votive-glass-candle-jasmine-fragrance-set-of-2' },
  { num: 48, tier: 'budget', workingName: 'Floating Flower Candle Set, Aromatic Duo', supplierPriceRaw: '175', handle: 'floating-flower-candle-set-aromatic-duo' },
  { num: 49, tier: 'budget', workingName: 'Festive Ladoo Candle Gift Set of 4', supplierPriceRaw: '169', handle: 'festive-laddoo-candle-gift-set-set-of-4' },
  { num: 50, tier: 'budget', workingName: 'Festive Sutli Pataka Candle', supplierPriceRaw: '149', handle: 'festive-sutli-pataka-candle-festive-fun-without-the-bang' },
]

// Internal reference only for bulkNote / internal.bulkCost — never create products from these.
export const BULK_PACKS: Array<{ relatesToNum: number; label: string; priceRaw: string; handle: string }> = [
  { relatesToNum: 49, label: 'Festive Ladoo Candle Gift Set, 100 boxes', priceRaw: '6500', handle: 'festive-ladoo-candle-gift-set-set-of-4-master-pack-of-100box' },
  { relatesToNum: 48, label: 'Floating Flower Aromatic Duo, 50 sets', priceRaw: '5000', handle: 'bulk-buy-floating-flower-candle-set-aromatic-duo-master-pack-of-50-set' },
  { relatesToNum: 45, label: 'Jharokha Wall Decor with LED, 100 pcs', priceRaw: '2500', handle: 'bulk-buy-traditional-jharokha-wall-decor-set-with-led-candles-festive-indian-home-decoration' },
  { relatesToNum: 21, label: 'Aromatherapy Gift Set GS-15, 16 pcs', priceRaw: '4000', handle: 'auradecor-aromatheraphy-gift-set-gs-15' },
  { relatesToNum: -1, label: 'Electric Burner Gift Set, 24 pcs', priceRaw: '5800', handle: 'electric-burner-gift-set-new-master-box-24-pcs' },
]

if (PRODUCT_LIST.length !== 50) throw new Error(`Expected 50 products, got ${PRODUCT_LIST.length}`)
