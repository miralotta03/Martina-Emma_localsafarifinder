import type { LocalizedParagraphs, LocalizedText } from "@/lib/i18n";

// En bild är alltid valfri. Med `src` krävs alt-text; utan visas en platshållare.
// `position` (valfri) är bildens fokuspunkt när den beskärs, som CSS
// object-position, t.ex. "20% 50%" för att visa mer av vänstra delen.
export type ImageRef = { src?: string; alt?: LocalizedText; position?: string };

export type CompanyExperience = {
  // Kort etikett ovanför titeln, t.ex. "KILIMANJARO". Visas bara om den finns.
  tag?: LocalizedText;
  // Tom sträng om titeln saknas i originalet (renderas då utan rubrik).
  title: LocalizedText;
  description?: LocalizedText;
  // Fri text, t.ex. "6–9 dagar" eller "7 dagar · 6 nätter". Visas bara om det finns.
  duration?: LocalizedText;
  // Visas bara om det finns.
  priceFromUsd?: number;
  image: ImageRef;
  // Ofullständigt kort (t.ex. paket, dagar och pris saknas). Visas som
  // vanligt på sidan; markeringen finns bara för att hitta det i koden.
  draft?: boolean;
};

export type CompanyReview = {
  rating: 1 | 2 | 3 | 4 | 5;
  text: LocalizedText;
  author: string;
};

export type CompanyProfile = {
  // Namnet i sidans h1 och titel (kan skilja sig från namnet på korten/logotypen).
  pageName: string;
  region: LocalizedText;
  // Fri text under SPECIALITET (härleds inte från categories).
  specialityLabel: LocalizedText;
  heroImage: ImageRef;
  heroIntro: LocalizedText;
  history: { paragraphs: LocalizedParagraphs; image: ImageRef };
  quote: LocalizedText;
  founder: {
    name: string;
    displayName: LocalizedText;
    paragraphs: LocalizedParagraphs;
    image: ImageRef;
  };
  team: {
    heading: LocalizedText;
    paragraphs: LocalizedParagraphs;
    image: ImageRef;
  };
  experiences: {
    heading: LocalizedText;
    intro: LocalizedText;
    closing: LocalizedText;
    items: CompanyExperience[];
  };
  gallery: { intro: LocalizedText; slots: ImageRef[] };
  unique: { paragraphs: LocalizedParagraphs; image: ImageRef };
  reviews: { intro: LocalizedText; items: CompanyReview[] };
  closing: { label: LocalizedText; text: LocalizedText; image: ImageRef };
  contact: { intro: LocalizedParagraphs };
};
