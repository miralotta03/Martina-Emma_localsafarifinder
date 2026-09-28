import type { LocalizedText } from "@/lib/i18n";

// Delade texter för företagssidorna. Företagsspecifika texter ligger i
// data/company-profiles/.
const text = (sv: string, en?: string): LocalizedText => ({ sv, en });

export const companyPageContent = {
  contact: text("Kontakta"),
  hero: { eyebrow: text("BYGGT PÅ LOKAL KUNSKAP") },
  facts: {
    eyebrow: text("UPPLEVELSER"),
    heading: text("Resor skapade för dig"),
    region: text("REGION"),
    speciality: text("SPECIALITET"),
  },
  history: {
    eyebrow: text("VÅR HISTORIA"),
    heading: text("Hur allt började"),
  },
  founder: {
    eyebrow: text("GRUNDAREN"),
    headingPrefix: text("Möt"),
  },
  team: { eyebrow: text("TEAMET") },
  experiences: {
    eyebrow: text("UTVALDA UPPLEVELSER"),
    pricePrefix: text("Från"),
    priceSuffix: text("USD/person"),
  },
  gallery: {
    eyebrow: text("ÖGONBLICK FRÅN RESAN"),
    heading: text("Tanzania genom våra ögon"),
  },
  unique: {
    eyebrow: text("DET SOM GÖR OSS UNIKA"),
    heading: text("En resa skapad med omtanke"),
  },
  reviews: {
    eyebrow: text("RECENSIONER"),
    heading: text("Ord från tidigare gäster"),
    readMore: text("Läs mer"),
    readLess: text("Visa mindre"),
    starsLabel: text("5 av 5 stjärnor"),
  },
  closing: { heading: text("Att resa med oss innebär...") },
};
