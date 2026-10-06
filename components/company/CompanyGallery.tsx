import type { CompanyProfile } from "@/data/company-profiles/types";
import { companyPageContent } from "@/content/foretag";
import { t, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ContactButton } from "./ContactButton";
import { Marquee } from "@/components/ui/Marquee";

function Half({
  slug,
  slots,
  hidden = false,
}: {
  slug: string;
  slots: CompanyProfile["gallery"]["slots"];
  hidden?: boolean;
}) {
  return (
    <ul
      className={`flex shrink-0 gap-6 pr-6 ${hidden ? "marquee-clone" : ""}`}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      {slots.map((image, index) => (
        <li key={index}>
          <ImageSlot
            slot={`${slug}/gallery-${index + 1}${hidden ? "-loop-copy" : ""}`}
            image={image}
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 260px"
            className="aspect-square w-[260px] rounded-2xl sm:w-[340px] lg:w-[420px]"
          />
        </li>
      ))}
    </ul>
  );
}

// Loopande remsa med ren CSS (marquee-klasserna i globals.css): listan
// dupliceras för en sömlös loop, pausar vid hover och är statisk vid
// prefers-reduced-motion. Bilderna lazy-laddas.
export function CompanyGallery({
  slug,
  profile,
  locale,
}: {
  slug: string;
  profile: CompanyProfile;
  locale: Locale;
}) {
  const { gallery: text } = companyPageContent;

  return (
    <section
      aria-labelledby="company-gallery-heading"
      className="bg-cream pb-16 lg:pb-24"
    >
      <Container>
        <Eyebrow>{t(text.eyebrow, locale)}</Eyebrow>
        <h2
          id="company-gallery-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {t(text.heading, locale)}
        </h2>
        <p className="mt-5 max-w-5xl text-base text-forest lg:text-lg">
          {t(profile.gallery.intro, locale)}
        </p>
      </Container>

      <Marquee className="mt-10 overflow-hidden lg:mt-12">
        <div className="marquee-track flex w-max">
          <Half slug={slug} slots={profile.gallery.slots} />
          <Half slug={slug} slots={profile.gallery.slots} hidden />
        </div>
      </Marquee>

      <Container className="mt-10 flex sm:justify-end">
        <ContactButton label={t(companyPageContent.contact, locale)} />
      </Container>
    </section>
  );
}
