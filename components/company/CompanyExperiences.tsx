import type { CompanyProfile } from "@/data/company-profiles/types";
import { companyPageContent } from "@/content/foretag";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ContactButton } from "./ContactButton";

export function CompanyExperiences({
  slug,
  profile,
  locale,
}: {
  slug: string;
  profile: CompanyProfile;
  locale: Locale;
}) {
  const { experiences: text } = companyPageContent;
  const { experiences } = profile;

  return (
    <section
      aria-labelledby="company-experiences-heading"
      className="bg-cream py-16 lg:py-24"
    >
      <Container>
        <Eyebrow>{t(text.eyebrow, locale)}</Eyebrow>
        <h2
          id="company-experiences-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {t(experiences.heading, locale)}
        </h2>
        <p className="mt-5 max-w-5xl text-base text-forest lg:text-lg">
          {t(experiences.intro, locale)}
        </p>

        {/* Korten är inte länkar. */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.items.map((item, index) => {
            const title = t(item.title, locale);
            return (
              <li
                key={`${t(item.tag, locale)}-${index}`}
                aria-label={title ? undefined : t(item.tag, locale)}
                className="flex flex-col overflow-hidden rounded-3xl border border-forest/5 bg-white/60"
              >
                <ImageSlot
                  slot={`${slug}/experience-${index + 1}`}
                  image={item.image}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
                  className="aspect-[4/3] w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                    {t(item.tag, locale)}
                  </p>
                  {title && (
                    <h3 className="mt-3 font-serif text-xl text-forest lg:text-2xl">
                      {title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="mt-3 text-base text-forest/90">
                      {t(item.description, locale)}
                    </p>
                  )}
                  <ul className="mt-auto space-y-1 pt-5 text-sm text-forest">
                    <li>{t(item.duration, locale)}</li>
                    {item.priceFromUsd !== undefined && (
                      <li>
                        {`${t(text.pricePrefix, locale)} ${item.priceFromUsd.toLocaleString("sv-SE")} ${t(text.priceSuffix, locale)}`}
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl font-serif text-lg text-forest lg:text-xl">
            {t(experiences.closing, locale)}
          </p>
          <ContactButton
            label={t(companyPageContent.contact, locale)}
            className="self-start"
          />
        </div>
      </Container>
    </section>
  );
}
