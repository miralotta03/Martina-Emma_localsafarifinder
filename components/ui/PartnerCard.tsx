import Image from "next/image";
import Link from "next/link";
import type { Company } from "@/data/companies";
import { ArrowRightIcon } from "./icons";

export function PartnerCard({
  company,
  linkLabel,
}: {
  company: Company;
  linkLabel: string;
}) {
  return (
    <Link
      href={`/${company.slug}`}
      className="group block w-[260px] overflow-hidden rounded-2xl bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-[340px] lg:w-[415px]"
    >
      <div className="relative aspect-[8/5] w-full">
        <Image
          src={company.logo}
          alt={`${company.name} – ${company.country}`}
          fill
          sizes="(min-width: 1024px) 415px, (min-width: 640px) 340px, 260px"
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg text-forest sm:text-xl">
            {company.name}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 pt-1 text-xs font-semibold tracking-wide text-gold uppercase transition-all group-hover:gap-2">
            {linkLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
        <p className="text-xs font-medium tracking-wide text-ink/60 uppercase">
          {company.country}
        </p>
        <p className="text-sm text-ink/80">{company.description}</p>
      </div>
    </Link>
  );
}
