import Link from "next/link";
import type { Company } from "@/data/companies";
import { activityLabel } from "@/data/search";
import { searchContent } from "@/content/sok";
import { t } from "@/lib/i18n";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { ArrowRightIcon } from "@/components/ui/icons";

// Samma kortstil som PartnerCard, men i rutnätet (flexibel bredd) och med
// region, upplevelser och specialitet.
export function CompanyResultCard({ company }: { company: Company }) {
  const { results } = searchContent;
  const { profile } = company;

  const body = (
    <>
      <CompanyLogo
        name={company.name}
        logo={company.logo}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[8/5] w-full"
        textClassName="text-2xl"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-forest">{company.name}</h3>
          {profile && (
            <span className="inline-flex shrink-0 items-center gap-1 pt-1 text-xs font-semibold tracking-wide text-forest uppercase transition-all group-hover:gap-2">
              {t(results.readMore)}
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          )}
        </div>
        <p className="text-xs font-medium tracking-wide text-ink/70 uppercase">
          {profile ? t(profile.region) : company.country}
        </p>
        <dl className="mt-auto space-y-2 text-sm">
          <div>
            <dt className="sr-only">{t(results.activities)}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {company.activityTypes.map((activity) => (
                  <li
                    key={activity}
                    className="rounded-full bg-forest/10 px-3 py-1 text-xs text-forest"
                  >
                    {activityLabel(activity)}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          {profile && (
            <div className="flex gap-1.5 text-ink/80">
              <dt>{t(results.speciality)}:</dt>
              <dd className="font-medium text-forest">
                {t(profile.specialityLabel)}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </>
  );

  const cardClass =
    "flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-sm";

  // Utan profil finns ingen företagssida att länka till.
  return profile ? (
    <Link
      href={`/${company.slug}`}
      className={`group ${cardClass} transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold`}
    >
      {body}
    </Link>
  ) : (
    <article className={cardClass}>{body}</article>
  );
}
