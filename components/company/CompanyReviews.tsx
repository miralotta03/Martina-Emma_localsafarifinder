import type { CompanyProfile } from "@/data/company-profiles/types";
import { companyPageContent } from "@/content/foretag";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactButton } from "./ContactButton";
import { ReviewText } from "./ReviewText";

export function CompanyReviews({
  profile,
  locale,
}: {
  profile: CompanyProfile;
  locale: Locale;
}) {
  const { reviews: text } = companyPageContent;

  return (
    <section
      aria-labelledby="company-reviews-heading"
      className="bg-cream py-16 lg:py-24"
    >
      <Container>
        <Eyebrow>{t(text.eyebrow, locale)}</Eyebrow>
        <h2
          id="company-reviews-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {t(text.heading, locale)}
        </h2>
        <p className="mt-5 max-w-5xl text-base text-forest lg:text-lg">
          {t(profile.reviews.intro, locale)}
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile.reviews.items.map((review) => (
            <li
              key={review.author}
              className="flex flex-col rounded-2xl bg-white/70 p-6 shadow-sm"
            >
              <div
                role="img"
                aria-label={t(text.starsLabel, locale).replace(
                  "5",
                  String(review.rating),
                )}
                className="text-gold"
              >
                <span aria-hidden="true">{"★".repeat(review.rating)}</span>
              </div>
              <div className="mt-4 flex-1">
                <ReviewText
                  text={t(review.text, locale)}
                  readMoreLabel={t(text.readMore, locale)}
                  readLessLabel={t(text.readLess, locale)}
                />
              </div>
              <p className="mt-6 font-serif text-sm font-semibold text-forest">
                {review.author}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex sm:justify-end">
          <ContactButton label={t(companyPageContent.contact, locale)} />
        </div>
      </Container>
    </section>
  );
}
