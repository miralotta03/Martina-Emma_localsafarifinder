"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, type EventData } from "@/lib/analytics";

const SCROLL_LEVELS = [25, 50, 75, 100];

// Klick: element med data-track-event="namn" skickar det eventet, och varje
// data-track-<egenskap>="värde" blir eventdata ({ <egenskap>: värde }).
// Lyssnaren stoppar inte klicket, så länkar navigerar som vanligt.
function onClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const el = target.closest<HTMLElement>("[data-track-event]");
  if (!el) return;

  const data: EventData = {};
  for (const [key, value] of Object.entries(el.dataset)) {
    // dataset gör data-track-company till trackCompany.
    if (key === "trackEvent" || !key.startsWith("track") || !value) continue;
    const name = key.slice("track".length);
    data[name.charAt(0).toLowerCase() + name.slice(1)] = value;
  }
  trackEvent(
    el.dataset.trackEvent!,
    Object.keys(data).length ? data : undefined,
  );
}

// Klick- och scrollspårning för Umami. Renderas bara när Umami-skriptet laddas
// (se app/layout.tsx), och skickar bara när window.umami finns.
export function UmamiEvents() {
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Scrolldjup: "scroll-djup" med { niva: "25" | "50" | "75" | "100" }, en gång
  // per nivå och sida (börjar om vid byte av sida). Högst en mätning per
  // bildruta, och lyssnaren är passiv så att scrollen aldrig väntar på den.
  useEffect(() => {
    const sent = new Set<number>();
    let frame = 0;

    function measure() {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // En sida som får plats på skärmen har inget scrolldjup att mäta.
      if (scrollable <= 0) return;
      const percent =
        ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
      for (const level of SCROLL_LEVELS) {
        // 100 % räknas 2 px före botten (avrundning i webbläsaren).
        const reached =
          level === 100 ? window.scrollY >= scrollable - 2 : percent >= level;
        // Utan Umami (ännu) markeras nivån inte som skickad, så att den
        // skickas vid nästa scroll när skriptet har laddats.
        if (
          reached &&
          !sent.has(level) &&
          trackEvent("scroll-djup", { niva: String(level) })
        ) {
          sent.add(level);
        }
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
