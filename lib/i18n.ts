// Textfält kan hålla flera språk. Svenska är alltid ifyllt; övriga språk är
// valfria och faller tillbaka på svenska.
export type Locale = "sv" | "en";

export const defaultLocale: Locale = "sv";

export type LocalizedText = { sv: string } & Partial<
  Record<Exclude<Locale, "sv">, string>
>;
export type LocalizedParagraphs = { sv: string[] } & Partial<
  Record<Exclude<Locale, "sv">, string[]>
>;

export function t(
  value: LocalizedText,
  locale: Locale = defaultLocale,
): string {
  return value[locale] ?? value.sv;
}

export function tp(
  value: LocalizedParagraphs,
  locale: Locale = defaultLocale,
): string[] {
  return value[locale] ?? value.sv;
}

// Fyller i {namn} i en text, t.ex. format("{count} företag", { count: 3 }).
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
