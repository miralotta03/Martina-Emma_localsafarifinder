import type { CompanyProfile } from "@/data/company-profiles/types";
import { companyPageContent } from "@/content/foretag";
import { t, tp, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CircleFeature } from "./CircleFeature";
import { ContactButton } from "./ContactButton";

const headingClass =
  "mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl";

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-6 space-y-5 text-base text-forest lg:text-lg">
      {items.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

// Vår historia, citatet, Grundaren och Teamet.
export function CompanyStory({
  slug,
  profile,
  locale,
}: {
  slug: string;
  profile: CompanyProfile;
  locale: Locale;
}) {
  const { history, founder, team, contact } = companyPageContent;

  return (
    <>
      <CircleFeature
        slot={`${slug}/history`}
        image={profile.history.image}
        imageSide="left"
        labelledBy="company-history-heading"
      >
        <Eyebrow>{t(history.eyebrow, locale)}</Eyebrow>
        <h2 id="company-history-heading" className={headingClass}>
          {t(history.heading, locale)}
        </h2>
        <Paragraphs items={tp(profile.history.paragraphs, locale)} />
      </CircleFeature>

      <section className="bg-cream py-16 lg:py-24">
        <Container>
          <blockquote className="mx-auto max-w-5xl text-center font-serif text-2xl leading-snug text-forest italic sm:text-3xl lg:text-4xl lg:leading-[1.5]">
            {t(profile.quote, locale)}
          </blockquote>
        </Container>
      </section>

      <CircleFeature
        slot={`${slug}/founder`}
        image={profile.founder.image}
        imageSide="right"
        labelledBy="company-founder-heading"
      >
        <Eyebrow>{t(founder.eyebrow, locale)}</Eyebrow>
        <h2 id="company-founder-heading" className={headingClass}>
          {`${t(founder.headingPrefix, locale)} ${t(profile.founder.displayName, locale)}`}
        </h2>
        <Paragraphs items={tp(profile.founder.paragraphs, locale)} />
        <ContactButton label={t(contact, locale)} className="mt-8" />
      </CircleFeature>

      <CircleFeature
        slot={`${slug}/team`}
        image={profile.team.image}
        imageSide="left"
        labelledBy="company-team-heading"
      >
        <Eyebrow>{t(team.eyebrow, locale)}</Eyebrow>
        <h2 id="company-team-heading" className={headingClass}>
          {t(profile.team.heading, locale)}
        </h2>
        <Paragraphs items={tp(profile.team.paragraphs, locale)} />
      </CircleFeature>
    </>
  );
}
