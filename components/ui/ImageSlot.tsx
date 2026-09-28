import Image from "next/image";
import type { ImageRef } from "@/data/company-profiles/types";
import { t } from "@/lib/i18n";

// Visar bilden om `image.src` finns, annars en neutral platshållare utan text.
// Platshållaren är dold för skärmläsare; `data-slot` gör platserna lätta att hitta.
export function ImageSlot({
  slot,
  image,
  className = "",
  sizes,
  priority = false,
}: {
  slot: string;
  image?: ImageRef;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  if (image?.src) {
    return (
      <div className={`relative overflow-hidden ${className}`} data-slot={slot}>
        <Image
          src={image.src}
          alt={image.alt ? t(image.alt) : ""}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      data-slot={slot}
      className={`relative overflow-hidden bg-forest/10 ${className}`}
    />
  );
}
