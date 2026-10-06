import Image from "next/image";
import { whyLocalSection, whyLocalFeatures } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function WhyLocal() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <Eyebrow>{whyLocalSection.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl text-forest sm:text-4xl">
          {whyLocalSection.heading}
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {whyLocalFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-cream-dark/60 p-8"
            >
              {/* Bildfilen innehåller både ikonen och den ljusa rundade rutan. */}
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <h3 className="mt-6 font-serif text-xl text-forest">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-ink/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
