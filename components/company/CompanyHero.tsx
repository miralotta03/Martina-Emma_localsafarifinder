import type { CompanyProfile } from "@/data/company-profiles/types";
import { companyPageContent } from "@/content/foretag";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ContactButton } from "./ContactButton";

// Utan bakgrundsbild står texten på en enkel grön ton med gradient.
export function CompanyHero({
  slug,
  profile,
  locale,
}: {
  slug: string;
  profile: CompanyProfile;
  locale: Locale;
}) {
  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden bg-forest lg:min-h-[720px]">
      <ImageSlot
        slot={`${slug}/hero`}
        image={profile.heroImage}
        className="absolute inset-0"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/30" />

      <Container className="relative pt-28 pb-14 lg:pb-20">
        <Eyebrow className="!text-gold-light">
          {t(companyPageContent.hero.eyebrow, locale)}
        </Eyebrow>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-7xl">
          {profile.pageName}
        </h1>
        <p className="mt-6 max-w-5xl text-base text-cream/95 sm:text-lg">
          {t(profile.heroIntro, locale)}
        </p>
        <ContactButton
          label={t(companyPageContent.contact, locale)}
          className="mt-8"
        />
      </Container>
    </section>
  );
}
