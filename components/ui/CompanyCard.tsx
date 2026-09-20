import Image from "next/image";
import type { Company } from "@/lib/types";
import { ArrowLink } from "./Button";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-cream sm:w-[320px]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={company.image}
          alt={`${company.name} – ${company.country}`}
          fill
          sizes="(min-width: 640px) 320px, 280px"
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-forest">{company.name}</h3>
          <ArrowLink
            href={`/foretag/${company.slug}`}
            className="shrink-0 pt-1 text-xs font-semibold tracking-wide text-gold uppercase"
          >
            Läs mer
          </ArrowLink>
        </div>
        <p className="text-xs font-medium tracking-wide text-ink/60 uppercase">
          {company.country}
        </p>
        <p className="text-sm text-ink/80">{company.description}</p>
      </div>
    </article>
  );
}
