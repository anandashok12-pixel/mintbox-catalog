/**
 * MintBox-side identity for each of the 50 products: id, slug, rewritten name,
 * category and customisation defaults. Kept separate from product-list.ts (the
 * supplier-facing list) so this file is safe to import from the local review
 * dataset builder without ever touching supplier data directly.
 */
export interface CatalogPlanItem {
  num: number
  id: string
  slug: string
  name: string
  category: string
  imagesToUse: number
  moq: number
  leadTimeDays: number
  customisable: boolean
}

export const CATEGORIES = [
  { id: 'cat-candles', slug: 'candles', name: 'Candles', emoji: '🕯️' },
  { id: 'cat-urli', slug: 'urli', name: 'Urli & Floating Décor', emoji: '🪷' },
  { id: 'cat-reed-diffusers', slug: 'reed-diffusers', name: 'Reed Diffusers', emoji: '🌸' },
  { id: 'cat-aroma-gift-sets', slug: 'aroma-gift-sets', name: 'Aroma Gift Sets', emoji: '🧴' },
  { id: 'cat-decor', slug: 'decor', name: 'Décor & Figurines', emoji: '🏺' },
  { id: 'cat-festive-sets', slug: 'festive-sets', name: 'Festive Gift Sets', emoji: '🪔' },
]

export const CATALOG_PLAN: CatalogPlanItem[] = [
  { num: 1, id: 'mb-diwali-001', slug: 'maharaja-royal-votive-candle-set', name: 'Maharaja Royal Votive Candle Set', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 2, id: 'mb-diwali-002', slug: 'wooden-whisper-candle-diffuser-duo', name: 'Wooden Whisper Candle & Diffuser Duo', category: 'aroma-gift-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 3, id: 'mb-diwali-003', slug: 'grandeur-wooden-urli-candle', name: 'Grandeur Wooden Urli Candle', category: 'urli', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 4, id: 'mb-diwali-004', slug: 'luxe-noir-reed-diffuser-500ml', name: 'Luxe Noir Reed Diffuser, 500ml', category: 'reed-diffusers', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 5, id: 'mb-diwali-005', slug: 'candle-warmer-lamp-with-aroma-candle', name: 'Candle Warmer Lamp with Aroma Candle', category: 'decor', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 6, id: 'mb-diwali-006', slug: 'electric-candle-warmer-with-aroma-candle', name: 'Electric Candle Warmer with Aroma Candle', category: 'decor', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 7, id: 'mb-diwali-007', slug: 'smart-plug-in-aroma-diffuser', name: 'Smart Plug-In Aroma Diffuser', category: 'aroma-gift-sets', imagesToUse: 4, moq: 10, leadTimeDays: 10, customisable: false },
  { num: 8, id: 'mb-diwali-008', slug: 'lotus-urli-trio-oudh', name: 'Lotus Urli Trio, Oudh', category: 'urli', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 9, id: 'mb-diwali-009', slug: 'fragrance-urli-candle-pair-gift-pack', name: 'Fragrance Urli Candle Pair, Gift Pack', category: 'urli', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 10, id: 'mb-diwali-010', slug: 'sanskrit-serenity-candle-set', name: 'Sanskrit Serenity Candle Set', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 11, id: 'mb-diwali-011', slug: 'golfer-figurine-black-gold', name: 'Golfer Figurine, Black & Gold', category: 'decor', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 12, id: 'mb-diwali-012', slug: 'saxophone-player-figurine-black-gold', name: 'Saxophone Player Figurine, Black & Gold', category: 'decor', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 13, id: 'mb-diwali-013', slug: 'aromatherapy-flame-humidifier', name: 'Aromatherapy Flame Humidifier', category: 'aroma-gift-sets', imagesToUse: 4, moq: 10, leadTimeDays: 10, customisable: false },
  { num: 14, id: 'mb-diwali-014', slug: 'black-gold-dust-pillar-candle-set', name: 'Black & Gold Dust Pillar Candle Set', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 15, id: 'mb-diwali-015', slug: 'aromatherapy-combo-gift-pack', name: 'Aromatherapy Combo Gift Pack', category: 'aroma-gift-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 16, id: 'mb-diwali-016', slug: 'blue-horizon-reed-diffuser-set', name: 'Blue Horizon Reed Diffuser Set', category: 'reed-diffusers', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 17, id: 'mb-diwali-017', slug: 'amber-jar-candle-set-of-4', name: 'Amber Jar Candle Set of 4', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 18, id: 'mb-diwali-018', slug: 'phool-serenity-diwali-gift-set', name: 'Phool Serenity Diwali Gift Set', category: 'festive-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 19, id: 'mb-diwali-019', slug: 'urli-gift-set-with-floating-candles', name: 'Urli Gift Set with Floating Candles', category: 'urli', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 20, id: 'mb-diwali-020', slug: 'moroccan-tin-candle-set-of-4', name: 'Moroccan Tin Candle Set of 4', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 21, id: 'mb-diwali-021', slug: 'aromatherapy-gift-set-diffuser-reed-potpourri', name: 'Aromatherapy Gift Set, Diffuser & Potpourri', category: 'aroma-gift-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 22, id: 'mb-diwali-022', slug: 'hammered-golden-urli-bowl-12-inch', name: 'Hammered Golden Urli Bowl, 12 Inch', category: 'urli', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: false },
  { num: 23, id: 'mb-diwali-023', slug: 'gold-pillar-candle-set-of-3', name: 'Gold Pillar Candle Set of 3', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 24, id: 'mb-diwali-024', slug: 'elegante-reed-diffuser-100ml', name: 'Elegante Reed Diffuser, 100ml', category: 'reed-diffusers', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 25, id: 'mb-diwali-025', slug: 'luxury-pillar-candle-set-of-3', name: 'Luxury Pillar Candle Set of 3', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 26, id: 'mb-diwali-026', slug: 'single-lotus-urli-candle', name: 'Single Lotus Urli Candle', category: 'urli', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 27, id: 'mb-diwali-027', slug: 'amber-gold-candle-gift-set', name: 'Amber Gold Candle Gift Set', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 28, id: 'mb-diwali-028', slug: 'velvet-addiction-candle-single-malt', name: 'Velvet Addiction Candle, Single Malt', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 29, id: 'mb-diwali-029', slug: 'embrace-soy-candle-oudh-honey', name: 'Embrace Soy Candle, Oudh & Honey', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 30, id: 'mb-diwali-030', slug: 'frosted-fragrance-glass-candle-set-of-4', name: 'Frosted Fragrance Glass Candle Set of 4', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 31, id: 'mb-diwali-031', slug: 'reed-diffuser-gift-set-with-potpourri', name: 'Reed Diffuser Gift Set with Potpourri', category: 'reed-diffusers', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 32, id: 'mb-diwali-032', slug: 'lavender-aroma-diffuser-gift-set', name: 'Lavender Aroma Diffuser Gift Set', category: 'aroma-gift-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 33, id: 'mb-diwali-033', slug: 'fragrance-votive-glass-candle-set-of-12', name: 'Fragrance Votive Glass Candle Set of 12', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 34, id: 'mb-diwali-034', slug: 'elysian-reed-diffuser-lavender-oudh', name: 'Elysian Reed Diffuser, Lavender & Oudh', category: 'reed-diffusers', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 35, id: 'mb-diwali-035', slug: 'fragrance-urli-candle-oudh', name: 'Fragrance Urli Candle, Oudh', category: 'urli', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 36, id: 'mb-diwali-036', slug: 'diwali-elegance-gift-set', name: 'Diwali Elegance Gift Set', category: 'festive-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 37, id: 'mb-diwali-037', slug: 'royal-flush-playing-card-candle-set', name: 'Royal Flush Playing Card Candle Set', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 38, id: 'mb-diwali-038', slug: 'floral-bloom-scented-candle', name: 'Floral Bloom Scented Candle', category: 'candles', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 39, id: 'mb-diwali-039', slug: 'aromatherapy-gift-set-mercury-tealight', name: 'Aromatherapy Gift Set, Mercury & Tealight', category: 'aroma-gift-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 40, id: 'mb-diwali-040', slug: 'camphor-reed-diffuser-100ml', name: 'Camphor Reed Diffuser, 100ml', category: 'reed-diffusers', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 41, id: 'mb-diwali-041', slug: 'scented-tomb-lid-jar-candle', name: 'Scented Tomb-Lid Jar Candle', category: 'candles', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 42, id: 'mb-diwali-042', slug: 'divine-pooja-diwali-gift-box', name: 'Divine Pooja Diwali Gift Box', category: 'festive-sets', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 43, id: 'mb-diwali-043', slug: 'black-lid-jar-candle', name: 'Black Lid Jar Candle', category: 'candles', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 44, id: 'mb-diwali-044', slug: 'playing-deck-pillar-candle-set', name: 'Playing Deck Pillar Candle Set', category: 'candles', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 45, id: 'mb-diwali-045', slug: 'jharokha-wall-decor-with-led-candles', name: 'Jharokha Wall Décor with LED Candles', category: 'decor', imagesToUse: 4, moq: 10, leadTimeDays: 7, customisable: false },
  { num: 46, id: 'mb-diwali-046', slug: 'shubh-labh-scented-candle-set', name: 'Shubh Labh Scented Candle Set', category: 'festive-sets', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 47, id: 'mb-diwali-047', slug: 'golden-mercury-votive-candle-set', name: 'Golden Mercury Votive Candle Set', category: 'candles', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: true },
  { num: 48, id: 'mb-diwali-048', slug: 'floating-flower-candle-duo', name: 'Floating Flower Candle Duo', category: 'candles', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: false },
  { num: 49, id: 'mb-diwali-049', slug: 'festive-ladoo-candle-set-of-4', name: 'Festive Ladoo Candle Set of 4', category: 'festive-sets', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: false },
  { num: 50, id: 'mb-diwali-050', slug: 'festive-sutli-pataka-candle', name: 'Festive Sutli Pataka Candle', category: 'festive-sets', imagesToUse: 3, moq: 10, leadTimeDays: 7, customisable: false },
]

if (CATALOG_PLAN.length !== 50) throw new Error(`Expected 50 plan items, got ${CATALOG_PLAN.length}`)
