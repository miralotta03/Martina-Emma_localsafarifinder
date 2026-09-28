import type { ActivityTypeSlug } from "@/lib/types";
import type { CompanyProfile } from "@/data/company-profiles/types";
import { defaultActivities } from "@/data/categories";
import { companyPageContent } from "@/content/foretag";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon } from "@/components/ui/icons";

// Aktivitetstyperna kommer från företagets activityTypes, med samma namn som på
// korten på kategorisidorna.
function activityTitle(slug: ActivityTypeSlug) {
  return (
    defaultActivities.find((activity) => activity.slug === slug)?.title ?? slug
  );
}

export function CompanyFacts({
  profile,
  activityTypes,
  locale,
}: {
  profile: CompanyProfile;
  activityTypes: ActivityTypeSlug[];
  locale: Locale;
}) {
  const { facts } = companyPageContent;

  return (
    <section
      aria-labelledby="company-facts-heading"
      className="bg-cream py-16 lg:py-20"
    >
      <Container>
        <Eyebrow>{t(facts.eyebrow, locale)}</Eyebrow>
        <h2
          id="company-facts-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {t(facts.heading, locale)}
        </h2>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-cream-dark px-8 py-7">
            <dt className="text-xs tracking-wide text-ink uppercase">
              {t(facts.region, locale)}
            </dt>
            <dd className="mt-2 font-serif text-xl text-forest lg:text-2xl">
              {t(profile.region, locale)}
            </dd>
          </div>
          <div className="rounded-3xl bg-cream-dark px-8 py-7">
            <dt className="text-xs tracking-wide text-ink uppercase">
              {t(facts.speciality, locale)}
            </dt>
            <dd className="mt-2 font-serif text-xl text-forest lg:text-2xl">
              {t(profile.specialityLabel, locale)}
            </dd>
          </div>
        </dl>

        <ul className="mt-6 space-y-4">
          {activityTypes.map((slug) => (
            <li
              key={slug}
              className="flex items-center gap-3 rounded-full border border-forest/10 bg-white/60 px-8 py-4 text-base text-forest"
            >
              <CheckIcon className="h-4 w-4 shrink-0 text-gold" />
              {activityTitle(slug)}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
