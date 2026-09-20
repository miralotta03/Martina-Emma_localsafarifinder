import { partnerCta } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function PartnerCta() {
  return (
    <section className="bg-cream px-6 pb-20 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-forest px-8 py-14 sm:px-14 sm:py-16">
        <Container className="!max-w-none !px-0">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
            {partnerCta.eyebrow}
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl text-cream sm:text-4xl">
            {partnerCta.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-cream/85">{partnerCta.body}</p>
          <Button href={partnerCta.cta.href} className="mt-8">
            {partnerCta.cta.label}
          </Button>
        </Container>
      </div>
    </section>
  );
}
