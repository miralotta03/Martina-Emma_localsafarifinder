"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INTERVAL_MS = 5500;

// Bakgrundsbilderna i startsidans hero, som tonar över i varandra. Alla
// bilder ligger på samma plats ovanpå varandra, så inget flyttar sig vid
// byte. Med prefers-reduced-motion visas bara den första bilden.
export function HeroSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    // Slås reducerad rörelse på medan sidan är öppen stannar bildspelet där
    // det är; från början (och vid omladdning) visas den första bilden.
    function update() {
      clearInterval(timer);
      timer = undefined;
      if (!reducedMotion.matches) {
        timer = setInterval(
          () => setCurrent((index) => (index + 1) % images.length),
          INTERVAL_MS,
        );
      }
    }

    update();
    reducedMotion.addEventListener("change", update);
    return () => {
      clearInterval(timer);
      reducedMotion.removeEventListener("change", update);
    };
  }, [images.length]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out motion-reduce:transition-none ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
