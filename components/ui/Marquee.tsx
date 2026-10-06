"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

// Hur lång tid inbromsningen och accelerationen tar.
const EASE_MS = 600;

// Den rullande remsan (.marquee / .marquee-track i globals.css). När musen
// förs in bromsar den mjukt till stillastående, och accelererar mjukt igen när
// musen lämnar, i stället för att stanna tvärt. Utan JS pausas den direkt vid
// hover (CSS). Med tangentbordsfokus stannar den direkt, och på touch och vid
// reducerad rörelse rullar den inte alls (CSS), så då gör komponenten ingenting.
export function Marquee({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const root = ref.current;
    // Tar över hovern från CSS-regeln (se .marquee-eased i globals.css).
    root?.classList.add("marquee-eased");
    return () => cancelAnimationFrame(frame.current);
  }, []);

  function easeTo(target: number) {
    const track = ref.current?.querySelector<HTMLElement>(".marquee-track");
    const animation = track?.getAnimations()[0];
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
    if (event.pointerType === "mouse") easeTo(0);
  };
  const onLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") easeTo(1);
  };

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`marquee ${className}`}
    >
      {children}
    </div>
  );
}
