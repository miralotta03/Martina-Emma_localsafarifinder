import type { Metadata } from "next";
import { partnerPageContent } from "@/content/for-foretag";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PartnerApplicationForm } from "@/components/partner/PartnerApplicationForm";

const { metaTitle, eyebrow, heading, intro } = partnerPageContent;

export const metadata: Metadata = {
  title: metaTitle,
  description: intro[0],
};

// "Bli Partner": ansökningsformulär för safariföretag. Samma upplägg som
// /kontakta-oss, men på engelska (därav lang="en" på sektionen).
export default function PartnerPage() {
  return (
    <section lang="en" className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl text-forest sm:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <div className="mx-auto mt-6 max-w-3xl space-y-4 text-ink/85 sm:text-lg">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="mt-10 lg:mt-14">
            <PartnerApplicationForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
