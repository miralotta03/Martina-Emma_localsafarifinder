// Umami-event (https://docs.umami.is/docs/track-events). Skickas med
// umami.track() i stället för data-umami-event-attribut: på länkar stoppar
// Umamis attributhantering klicket och laddar om hela sidan, vilket bryter
// Next.js snabba navigering, och attributen kan inte spärra dubbelklick.

export type EventData = Record<string, string>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

// Samma event (namn + data) igen inom så här kort tid räknas som dubbelklick.
const DEDUPE_MS = 1000;
const lastSent = new Map<string, number>();

// Skickar ett event om Umami-skriptet har laddats; annars händer ingenting
// (t.ex. lokalt utan website-ID, eller om skriptet blockeras).
export function trackEvent(name: string, data?: EventData): boolean {
  if (typeof window === "undefined" || !window.umami) return false;

  const key = `${name}:${JSON.stringify(data ?? {})}`;
  const now = Date.now();
  if (now - (lastSent.get(key) ?? 0) < DEDUPE_MS) return true;
  lastSent.set(key, now);

  window.umami.track(name, data);
  return true;
}
