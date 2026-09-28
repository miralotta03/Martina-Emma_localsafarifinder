import type { CompanyWithProfile } from "@/data/companies";
import { defaultLocale, tp } from "@/lib/i18n";
import { CompanyHero } from "./CompanyHero";
import { CompanyFacts } from "./CompanyFacts";
import { CompanyStory } from "./CompanyStory";
import { CompanyExperiences } from "./CompanyExperiences";
import { CompanyGallery } from "./CompanyGallery";
import { CompanyUnique, CompanyClosing } from "./CompanyUniqueAndClosing";
import { CompanyReviews } from "./CompanyReviews";
import { ContactDialogProvider } from "./contact-dialog-context";
import { ContactDialog } from "./ContactDialog";

// Mall för /{företag}. Allt innehåll styrs av företagets profil i data/.
export function CompanyPage({ company }: { company: CompanyWithProfile }) {
  const { slug, name, logo, profile, activityTypes } = company;
  const locale = defaultLocale;

  return (
    <ContactDialogProvider>
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
      <ContactDialog
        companySlug={slug}
        companyName={name}
        companyLogo={logo}
        intro={tp(profile.contact.intro, locale)}
      />
    </ContactDialogProvider>
  );
}
