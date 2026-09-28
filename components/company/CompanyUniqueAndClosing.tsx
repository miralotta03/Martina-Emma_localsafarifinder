import type { CompanyProfile } from "@/data/company-profiles/types";
import { companyPageContent } from "@/content/foretag";
import { t, tp, type Locale } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CircleFeature } from "./CircleFeature";

const headingClass =
  "mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl";

// Det som gör oss unika (bild vänster) och avslutningen (bild höger).
export function CompanyUnique({
  slug,
  profile,
  locale,
}: {
  slug: string;
  profile: CompanyProfile;
  locale: Locale;
}) {
  const { unique } = companyPageContent;

  return (
    <CircleFeature
      slot={`${slug}/unique`}
      image={profile.unique.image}
      imageSide="left"
      labelledBy="company-unique-heading"
    >
      <Eyebrow>{t(unique.eyebrow, locale)}</Eyebrow>
      <h2 id="company-unique-heading" className={headingClass}>
        {t(unique.heading, locale)}
      </h2>
      <div className="mt-6 space-y-5 text-base text-forest lg:text-lg">
        {tp(profile.unique.paragraphs, locale).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </CircleFeature>
  );
}

export function CompanyClosing({
  slug,
  profile,
  locale,
}: {
  slug: string;
  profile: CompanyProfile;
  locale: Locale;
}) {
  const { closing } = companyPageContent;

  return (
    <CircleFeature
      slot={`${slug}/closing`}
      image={profile.closing.image}
      imageSide="right"
      labelledBy="company-closing-heading"
    >
      <Eyebrow>{t(profile.closing.label, locale)}</Eyebrow>
      <h2 id="company-closing-heading" className={headingClass}>
        {t(closing.heading, locale)}
      </h2>
      <p className="mt-6 text-base text-forest lg:text-lg">
        {t(profile.closing.text, locale)}
      </p>
    </CircleFeature>
  );
}
