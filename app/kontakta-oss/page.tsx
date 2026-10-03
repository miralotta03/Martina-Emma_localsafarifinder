import type { Metadata } from "next";
import { contactPageContent } from "@/content/kontakt";
import { t } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactPageForm } from "@/components/contact/ContactPageForm";

const { metaTitle, eyebrow, heading, intro } = contactPageContent;

export const metadata: Metadata = {
  title: t(metaTitle),
  description: t(intro[0]),
};

export default function ContactPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow>{t(eyebrow)}</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl text-forest sm:text-5xl lg:text-6xl">
              {t(heading)}
            </h1>
            <div className="mx-auto mt-6 max-w-3xl space-y-4 text-ink/85 sm:text-lg">
              {intro.map((paragraph) => (
                <p key={paragraph.sv}>{t(paragraph)}</p>
              ))}
            </div>
          </div>
          <div className="mt-10 lg:mt-14">
            <ContactPageForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
