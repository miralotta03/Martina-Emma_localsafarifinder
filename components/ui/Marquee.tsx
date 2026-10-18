"use client";

import {
  useEffect,
  useRef,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

// Hur lång tid inbromsningen och accelerationen tar.
const EASE_MS = 600;
// Samma tid per varv som CSS-animationen (.marquee-track i globals.css).
const LOOP_MS = 40_000;
// Lägen där remsan står still (CSS gör den scrollbar i stället).
const STILL = "(prefers-reduced-motion: reduce), (hover: none)";

// Den rullande remsan (.marquee / .marquee-track i globals.css). När musen
// förs in bromsar den mjukt till stillastående, och accelererar mjukt igen när
// musen lämnar, i stället för att stanna tvärt. Med fokus i remsan stannar den
// direkt, så att länken inte flyttar sig. På touch och vid reducerad rörelse
// rullar den inte alls.
//
// Utan JS rullar remsan med en CSS-animation som pausas vid hover. Med JS
// (.marquee-eased) stängs den av och komponenten flyttar remsan själv, en
// bildruta i taget. Att i stället bromsa CSS-animationen (playbackRate, pause)
// gav i Chrome både hopp vid klick och sönderritade kort vid paus, eftersom
// webbläsaren då kan räkna med två olika lägen för remsan samtidigt.
export function Marquee({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  // Fart (0–1, där 1 är ett varv per LOOP_MS) och pågående fartändring.
  const speed = useRef(1);
  const ease = useRef<{ from: number; to: number; start: number } | null>(null);

  useEffect(() => {
    const root = ref.current;
    const track = root?.querySelector<HTMLElement>(".marquee-track");
    if (!root || !track) return;

    // Börja där CSS-animationen är, så att remsan inte hoppar när JS tar över.
    const animation = track.getAnimations()[0];
    const startTime = Number(animation?.currentTime ?? 0);
    let offset = ((startTime % LOOP_MS) / LOOP_MS) * (track.scrollWidth / 2);
    const still = window.matchMedia(STILL);
    // Läget sätts innan animationen stängs av, annars syns startläget en bildruta.
    if (!still.matches) {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }
    root.classList.add("marquee-eased");

    let last = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const dt = Math.min(now - last, 100);
      last = now;

      const change = ease.current;
      if (change) {
        // Bildrutans tidsstämpel kan ligga strax före `start`, därav max(0, …).
        const progress = Math.min(
          Math.max((now - change.start) / EASE_MS, 0),
          1,
        );
        // Ease-out: snabb förändring i början, mjuk på slutet.
        const eased = 1 - (1 - progress) ** 3;
        speed.current = change.from + (change.to - change.from) * eased;
        if (progress === 1) ease.current = null;
      }

      if (still.matches) {
        track.style.transform = "";
      } else {
        // En halva (originalet) är exakt ett varv; kopian tar vid sömlöst.
        const half = track.scrollWidth / 2;
        if (half > 0) {
          offset = (offset + (speed.current * dt * half) / LOOP_MS) % half;
          track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        }
      }
      frame = requestAnimationFrame(step);
    });

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("marquee-eased");
      track.style.transform = "";
    };
  }, []);

  function easeTo(target: number) {
    ease.current = {
      from: speed.current,
      to: target,
      start: performance.now(),
    };
  }

  function stop() {
    ease.current = null;
    speed.current = 0;
  }

  // Bara mus: på touch rullar remsan inte (CSS), och en tap ska inte bromsa.
  const onEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    hovered.current = true;
    easeTo(0);
  };
  const onLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    hovered.current = false;
    // Tangentbordsfokus håller remsan stilla, fokus efter musklick gör det inte.
    const focused = ref.current?.querySelector(":focus-visible");
    if (!focused) easeTo(1);
  };

  // Fokus i remsan (tangentbord eller klick): stopp direkt. Rullar igen när
  // fokus lämnar remsan, om inte musen fortfarande är över den.
  const onFocus = () => stop();
  const onBlur = (event: FocusEvent) => {
    if (ref.current?.contains(event.relatedTarget) || hovered.current) return;
    easeTo(1);
  };

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`marquee ${className}`}
    >
      {children}
    </div>
  );
}
