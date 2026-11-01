// Bildloader för next/image i den statiska exporten. Det finns ingen server som
// skalar bilder, så scripts/build-images.mjs skapar en WebP per bredd i
// lib/image-sizes.mjs vid bygget: /bild.jpg → /_img/bild.jpg-640.webp.
//
// SVG visas som de är. Under `next dev` finns inga skalade filer, så där visas
// originalet (bredden i frågesträngen visar att loadern tar hänsyn till den).
const RASTER = /\.(jpe?g|png|webp)$/i;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!RASTER.test(src)) return src;
  if (process.env.NODE_ENV === "development") return `${src}?w=${width}`;
  return `/_img${src}-${width}.webp`;
}
