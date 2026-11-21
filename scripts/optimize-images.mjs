/**
 * Creates web-optimised copies of the raw product photographs.
 *
 * - Originals are only READ, never modified.
 * - Output: public/images/<category>/<file>.webp (1400px) and <file>-sm.webp (640px)
 * - EXIF orientation is applied so portrait phone photos display upright.
 *
 * Usage:
 *   npm run images
 *   RAW_IMAGES_DIR="D:/path/to/Raw image" npm run images
 *
 * When upgraded product photography is ready, drop the new files into the raw
 * folders (or a new folder) and re-run this script — the layout does not change.
 */
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readdir, mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW_DIR =
  process.env.RAW_IMAGES_DIR ||
  path.resolve(ROOT, '..', '..', 'Bangles', 'Raw image');
const OUT_DIR = path.join(ROOT, 'public', 'images');

// Raw folder name -> category slug used in the website.
const FOLDER_MAP = {
  Bangles: 'bangles',
  'Hair accessories': 'hair-accessories',
  'Saree pin': 'saree-pins',
};

const SIZES = [
  { suffix: '', width: 1400, quality: 80 },
  { suffix: '-sm', width: 640, quality: 76 },
];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  console.log(`Reading raw images from: ${RAW_DIR}`);
  const seenHashes = new Map();
  let written = 0;

  for (const [folder, slug] of Object.entries(FOLDER_MAP)) {
    const src = path.join(RAW_DIR, folder);
    if (!(await exists(src))) {
      console.warn(`  ! Missing folder: ${src}`);
      continue;
    }
    const dest = path.join(OUT_DIR, slug);
    await mkdir(dest, { recursive: true });

    const files = (await readdir(src)).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f));
    for (const file of files) {
      const input = path.join(src, file);
      const buf = await readFile(input);
      const hash = createHash('md5').update(buf).digest('hex');
      if (seenHashes.has(hash)) {
        console.log(`  - skip duplicate ${folder}/${file} (same as ${seenHashes.get(hash)})`);
        continue;
      }
      seenHashes.set(hash, `${folder}/${file}`);

      const base = path.parse(file).name.toLowerCase();
      for (const size of SIZES) {
        const out = path.join(dest, `${base}${size.suffix}.webp`);
        if (await exists(out)) continue;
        await sharp(buf)
          .rotate() // honour EXIF orientation
          .resize({ width: size.width, withoutEnlargement: true })
          .webp({ quality: size.quality })
          .toFile(out);
        written++;
      }
      process.stdout.write('.');
    }
    console.log(`\n  ✓ ${folder} -> public/images/${slug}`);
  }
  console.log(`Done. ${written} files written.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
