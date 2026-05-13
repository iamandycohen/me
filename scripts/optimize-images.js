/**
 * Optimize source images in /public.
 *
 * Run with: node scripts/optimize-images.js
 *
 * - Converts photographic PNGs to JPEG (smaller, suitable for photos).
 * - Resizes oversized assets to a max dimension that comfortably covers
 *   the largest variant Next.js will generate.
 * - Keeps the original .png alongside the new .jpg (Next/<Image> updates
 *   point at .jpg).
 */
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const targets = [
  {
    input: 'treehouse.png',
    output: 'treehouse.jpg',
    maxWidth: 1600,
    quality: 78,
  },
  {
    input: 'headshot.png',
    output: 'headshot.jpg',
    maxWidth: 1024,
    quality: 82,
  },
];

(async () => {
  for (const t of targets) {
    const inputPath = path.join(PUBLIC_DIR, t.input);
    const outputPath = path.join(PUBLIC_DIR, t.output);

    const info = await sharp(inputPath)
      .resize({ width: t.maxWidth, withoutEnlargement: true })
      .jpeg({ quality: t.quality, mozjpeg: true, progressive: true })
      .toFile(outputPath);

    console.log(
      `✓ ${t.input} → ${t.output}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`
    );
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
