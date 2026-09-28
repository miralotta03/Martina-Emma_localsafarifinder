import type { ReactNode } from "react";
import type { ImageRef } from "@/data/company-profiles/types";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";

// Cirkelbild med guldkant och text, bilden till vänster eller höger från lg.
// På små skärmar ligger bilden alltid före texten.
export function CircleFeature({
  slot,
  image,
  imageSide,
  labelledBy,
  className = "bg-cream-dark",
  children,
}: {
  slot: string;
  image: ImageRef;
  imageSide: "left" | "right";
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`py-16 lg:py-24 ${className}`}
    >
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ImageSlot
          slot={slot}
          image={image}
          sizes="(min-width: 1024px) 544px, (min-width: 640px) 384px, 320px"
          className={`mx-auto aspect-square w-full max-w-xs rounded-full border-8 border-gold sm:max-w-sm lg:max-w-[34rem] ${
            imageSide === "right"
              ? "max-lg:order-first lg:order-2 lg:ml-auto"
              : "lg:mr-auto"
          }`}
        />
        <div className={imageSide === "right" ? "lg:order-1" : undefined}>
          {children}
        </div>
      </Container>
    </section>
  );
}
