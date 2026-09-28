import type { CompanyWithProfile } from "@/data/companies";
import { defaultLocale } from "@/lib/i18n";
import { CompanyHero } from "./CompanyHero";
import { CompanyFacts } from "./CompanyFacts";
import { CompanyStory } from "./CompanyStory";
import { CompanyExperiences } from "./CompanyExperiences";
import { CompanyGallery } from "./CompanyGallery";
import { CompanyUnique, CompanyClosing } from "./CompanyUniqueAndClosing";
import { CompanyReviews } from "./CompanyReviews";

// Mall för /{företag}. Allt innehåll styrs av företagets profil i data/.
export function CompanyPage({ company }: { company: CompanyWithProfile }) {
  const { slug, profile, activityTypes } = company;
  const locale = defaultLocale;

  return (
    <>
      <CompanyHero slug={slug} profile={profile} locale={locale} />
      <CompanyFacts
        profile={profile}
        activityTypes={activityTypes}
        locale={locale}
      />
      <CompanyStory slug={slug} profile={profile} locale={locale} />
      <CompanyExperiences slug={slug} profile={profile} locale={locale} />
      <CompanyGallery slug={slug} profile={profile} locale={locale} />
      <CompanyUnique slug={slug} profile={profile} locale={locale} />
      <CompanyReviews profile={profile} locale={locale} />
      <CompanyClosing slug={slug} profile={profile} locale={locale} />
    </>
  );
}
