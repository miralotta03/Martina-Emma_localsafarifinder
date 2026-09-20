import Image from "next/image";
import Link from "next/link";
import type { TravelerType } from "@/lib/types";

// Med `href` blir hela kortet en länk, annars visas det som ett vanligt kort.
export function TravelerTypeCard({
  type,
  href,
}: {
  type: TravelerType;
  href?: string;
}) {
  const content = (
    <>
      <Image
        src={type.image}
        alt={type.title}
        fill
        sizes="(min-width: 640px) 300px, 260px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-serif text-2xl text-cream">{type.title}</h3>
        <p className="mt-1 text-sm text-cream/85">{type.description}</p>
      </div>
    </>
  );

  const className =
    "relative block aspect-[3/4] w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[300px]";

  return href ? (
    <Link
      href={href}
      className={`${className} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold`}
    >
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}
