// Strukturen för de juridiska sidorna. Texterna ligger i en fil per sida
// (anvandarvillkor.ts, integritetspolicy.ts, cookiepolicy.ts) så att de kan
// uppdateras utan att röra komponenten.

// En del av ett stycke: vanlig text, fetstil eller en intern länk.
export type LegalInline =
  string | { strong: string } | { link: string; href: string };

export type LegalBlock =
  // Ett stycke (en rad i originaltexten).
  | { p: LegalInline[] }
  // En punktlista.
  | { list: string[] };

export type LegalSection = {
  // Rubriken som den står, inklusive numret: "1. Om Local Safari Finder".
  heading: string;
  blocks: LegalBlock[];
};

export type LegalPageContent = {
  title: string;
  // Kundens datum, ändras bara när kunden reviderar texten.
  updated: string;
  description: string;
  sections: LegalSection[];
};
