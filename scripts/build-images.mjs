// Körs efter `next build` (se package.json). Skapar skalade WebP-versioner av
// alla JPEG/PNG/WebP i public/ till out/_img/, en per bredd i
// lib/image-sizes.mjs, med samma sökväg som originalet:
//   public/home/hero-1.jpg → out/_img/home/hero-1.jpg-640.webp
// lib/image-loader.ts pekar next/image på de här filerna. Bilder förstoras
// aldrig: är originalet smalare än bredden används originalets bredd.
//
// Färdiga filer sparas i node_modules/.cache/images (nyckel: sökväg, storlek
// och ändringstid), så att bara nya eller ändrade bilder skalas om.
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { imageQuality, imageWidths } from "../lib/image-sizes.mjs";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outDir = path.join(root, "out", "_img");
const cacheDir = path.join(root, "node_modules", ".cache", "images");
const RASTER = /\.(jpe?g|png|webp)$/i;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (RASTER.test(entry.name)) yield full;
  }
}

async function exists(file) {
  return fs.access(file).then(
    () => true,
    () => false,
  );
}

const start = Date.now();
let generated = 0;
let cached = 0;
let images = 0;

try {
  await fs.access(path.join(root, "out"));
} catch {
  console.error("[bilder] Mappen out/ saknas. Kör `next build` först.");
  process.exit(1);
}

for await (const file of walk(publicDir)) {
  images++;
  const rel = path.relative(publicDir, file).split(path.sep).join("/");
  const stat = await fs.stat(file);
  const key = createHash("sha1")
    .update(`${rel}:${stat.size}:${stat.mtimeMs}:${imageQuality}`)
    .digest("hex");

  const targets = imageWidths.map((width) => ({
    width,
    out: path.join(outDir, `${rel}-${width}.webp`),
    cache: path.join(cacheDir, `${key}-${width}.webp`),
  }));
  await fs.mkdir(path.dirname(targets[0].out), { recursive: true });

  if ((await Promise.all(targets.map((t) => exists(t.cache)))).every(Boolean)) {
    await Promise.all(targets.map((t) => fs.copyFile(t.cache, t.out)));
    cached++;
    continue;
  }

  await fs.mkdir(cacheDir, { recursive: true });
  const input = await fs.readFile(file);
  await Promise.all(
    targets.map(async ({ width, out, cache }) => {
      await sharp(input)
        .rotate() // följer EXIF-orienteringen
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: imageQuality })
        .toFile(cache);
      await fs.copyFile(cache, out);
    }),
  );
  generated++;
}

console.log(
  `[bilder] ${images} bilder × ${imageWidths.length} bredder → out/_img (${generated} skalade, ${cached} från cache) på ${((Date.now() - start) / 1000).toFixed(1)} s`,
);
