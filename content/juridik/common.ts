import type { LocalizedText } from "@/lib/i18n";

// Delade etiketter för de juridiska sidorna.
const text = (sv: string, en?: string): LocalizedText => ({ sv, en });

export const legalPageLabels = {
  updated: text("Senast uppdaterad: {date}"),
  toc: text("Innehåll"),
  metaTitle: text("{title} – Local Safari Finder"),
};
