// Bredderna som next/image får välja mellan, i px. Delas av next.config.ts
// (srcset) och scripts/build-images.mjs (som skapar en WebP per bredd), så att
// varje bredd i srcset alltid har en fil.
//
// 2048 täcker startsidans hero på mobil (sizes="max(100vw, 1000px)" på
// 2x-skärm), de små bredderna logotyper och ikoner.
export const deviceSizes = [640, 1080, 2048, 3840];
export const imageSizes = [256, 384];
export const imageWidths = [...imageSizes, ...deviceSizes];

// Kvalitet för WebP-filerna (samma som next/image standard).
export const imageQuality = 75;
