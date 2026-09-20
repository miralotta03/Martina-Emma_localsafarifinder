import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export function CategoryCard({
  title,
  description,
  href,
  image,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  linkLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-forest-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:aspect-[5/4]"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1280px) 620px, (min-width: 640px) 45vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <h3 className="font-serif text-2xl text-cream sm:text-3xl">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-cream/90 sm:text-base">
          {description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-light transition-all group-hover:gap-3">
          {linkLabel}
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
