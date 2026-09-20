import { whyLocalSection, whyLocalFeatures } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HandshakeIcon, PinIcon, StarIcon } from "@/components/ui/icons";
import type { WhyLocalFeature } from "@/lib/types";

const icons: Record<WhyLocalFeature["icon"], typeof HandshakeIcon> = {
  handshake: HandshakeIcon,
  pin: PinIcon,
  star: StarIcon,
};

export function WhyLocal() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <Eyebrow>{whyLocalSection.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl text-forest sm:text-4xl">
          {whyLocalSection.heading}
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {whyLocalFeatures.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-cream-dark/60 p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-6 font-serif text-xl text-forest">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-ink/80">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
