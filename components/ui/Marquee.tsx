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

// Den rullande remsan (.marquee / .marquee-track i globals.css). När musen
// förs in bromsar den mjukt till stillastående, och accelererar mjukt igen när
// musen lämnar, i stället för att stanna tvärt. Med fokus i remsan stannar den
// direkt, så att länken inte flyttar sig. Utan JS sköter CSS pausen. På touch
// och vid reducerad rörelse rullar den inte alls (CSS), så då gör komponenten
// ingenting.
//
// All paus går via playbackRate. CSS:ens animation-play-state får inte slå in
// samtidigt: i Chrome hoppar remsan då tillbaka till start när en länk får
// fokus (t.ex. vid klick), och klicket hamnar på fel kort.
export function Marquee({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const hovered = useRef(false);

  useEffect(() => {
    const root = ref.current;
    // Tar över hovern från CSS-regeln (se .marquee-eased i globals.css).
    root?.classList.add("marquee-eased");
    return () => cancelAnimationFrame(frame.current);
  }, []);

  function getAnimation() {
    const track = ref.current?.querySelector<HTMLElement>(".marquee-track");
    return track?.getAnimations()[0];
  }

  function easeTo(target: number) {
    const animation = getAnimation();
    if (!animation) return;

    cancelAnimationFrame(frame.current);
    const from = animation.playbackRate;
    const start = performance.now();

    const step = (now: number) => {
      // Bildrutans tidsstämpel kan ligga strax före `start`, därav max(0, …).
      const progress = Math.min(Math.max((now - start) / EASE_MS, 0), 1);
      // Ease-out: snabb förändring i början, mjuk på slutet.
      const eased = 1 - (1 - progress) ** 3;
      animation.playbackRate = from + (target - from) * eased;
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
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
  const onFocus = () => {
    const animation = getAnimation();
    if (!animation) return;
    cancelAnimationFrame(frame.current);
    animation.playbackRate = 0;
  };
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
