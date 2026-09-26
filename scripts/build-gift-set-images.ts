/**
 * Render one clean product image per gift set from "Price Gift Sets.pdf".
 *
 * Each PDF page is rebuilt from its embedded images only (composited in draw
 * order), so the "Price : Rs. X" text laid over the slide never appears in the
 * output. Pages whose slides share one centred heading get that heading painted
 * out first - otherwise a half-cut title bleeds into each product's crop.
 *
 * Usage: npm run build-gift-set-images
 * Output: ~/Downloads/Gift Sets 2026 Images/<key>.jpg  (see keyOf in gift-sets-data)
 */
import { execFileSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { GIFT_SETS, keyOf } from './gift-sets-data'

const PDF = process.env.GIFT_SETS_PDF || path.join(os.homedir(), 'Downloads', 'Price Gift Sets.pdf')
const OUT = process.env.GIFT_SETS_IMAGES_DIR || path.join(os.homedir(), 'Downloads', 'Gift Sets 2026 Images')

/**
 * Shared headings to paint out before cropping, as page fractions [x0,y0,x1,y1].
 * The fill is a vertical gradient between the rows just outside the rect, which
 * disappears into these soft studio backdrops.
 */
const PAGE_MASKS: Record<number, [number, number, number, number][]> = {
  18: [[0.355, 0.0, 0.645, 0.245]], // "6 in 1 PREMIUM GIFT SET" centred over B021/B022
  23: [[0.3, 0.02, 0.7, 0.185]], // "PREMIUM GIFT SETS" centred over V912/V926
}

const spec = GIFT_SETS.map((g) => ({ key: keyOf(g), page: g.page, crop: g.crop }))

const py = `
import fitz, io, json, os, sys
from PIL import Image

pdf, out, spec_json, masks_json = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
spec, masks = json.loads(spec_json), json.loads(masks_json)
os.makedirs(out, exist_ok=True)
doc = fitz.open(pdf)
SCALE = 1.7417  # page points -> native image pixels

def base(page_no):
    page = doc[page_no - 1]
    W, H = int(round(page.rect.width * SCALE)), int(round(page.rect.height * SCALE))
    canvas = Image.new('RGB', (W, H), 'white')
    for info in page.get_image_info(xrefs=True):  # draw order: later images paint over earlier
        im = Image.open(io.BytesIO(doc.extract_image(info['xref'])['image'])).convert('RGB')
        x0, y0, x1, y1 = info['bbox']
        box = (int(round(x0*SCALE)), int(round(y0*SCALE)), int(round(x1*SCALE)), int(round(y1*SCALE)))
        size = (box[2]-box[0], box[3]-box[1])
        if size != im.size:
            im = im.resize(size, Image.LANCZOS)
        canvas.paste(im, (box[0], box[1]))
    for mx0, my0, mx1, my1 in masks.get(str(page_no), []):
        a, b, c, d = int(mx0*W), int(my0*H), int(mx1*W), int(my1*H)
        if c <= a or d <= b:
            continue
        top = canvas.crop((a, max(b-1, 0), c, max(b-1, 0)+1))
        bot = canvas.crop((a, min(d, H-1), c, min(d, H-1)+1))
        # vertical gradient from the row above the rect to the row below it
        ramp = Image.linear_gradient('L').resize((c-a, d-b), Image.BILINEAR)
        grad = Image.composite(bot.resize((c-a, d-b), Image.BILINEAR),
                               top.resize((c-a, d-b), Image.BILINEAR), ramp)
        canvas.paste(grad, (a, b))
    return canvas

cache = {}
for it in spec:
    pg = it['page']
    if pg not in cache:
        cache[pg] = base(pg)
    src = cache[pg]
    W, H = src.size
    if it['crop'] is None:
        im = src
    else:
        x0, y0, x1, y1 = it['crop']
        im = src.crop((round(x0*W), round(y0*H), round(x1*W), round(y1*H)))
    im.save(os.path.join(out, it['key'] + '.jpg'), 'JPEG', quality=90, optimize=True)
print('wrote', len(spec), 'images ->', out)
`

if (!fs.existsSync(PDF)) throw new Error(`PDF not found: ${PDF}`)
execFileSync('python3', ['-c', py, PDF, OUT, JSON.stringify(spec), JSON.stringify(PAGE_MASKS)], {
  stdio: 'inherit',
})
