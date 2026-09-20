import { aboutSteps } from "@/content/om-oss";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function AboutSteps() {
  return (
    <section
      aria-labelledby="about-steps-heading"
      className="bg-cream py-16 lg:py-24"
    >
      <Container>
        <Eyebrow>{aboutSteps.eyebrow}</Eyebrow>
        <h2
          id="about-steps-heading"
          className="mt-4 font-serif text-3xl text-forest sm:text-4xl lg:text-5xl"
        >
          {aboutSteps.heading}
        </h2>

        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
          {aboutSteps.items.map((step) => (
            <li
              key={step.number}
              className="rounded-3xl border border-forest/5 bg-white/60 p-8"
            >
              <p
                aria-hidden="true"
                className="font-serif text-5xl text-gold"
              >
                {step.number}
              </p>
              <h3 className="mt-4 font-serif text-xl text-forest lg:text-2xl">
                <span className="sr-only">{`Steg ${step.number}: `}</span>
                {step.title}
              </h3>
              <p className="mt-3 text-base text-forest/90">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex sm:justify-end">
          <Button
            href={aboutSteps.cta.href}
            variant="forest"
            className="max-sm:w-full max-sm:justify-center"
          >
            {aboutSteps.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
