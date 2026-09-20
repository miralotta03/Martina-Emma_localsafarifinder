import { faqSection, faqItems } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChevronDownIcon } from "@/components/ui/icons";

export function Faq() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <Eyebrow>{faqSection.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl text-forest sm:text-4xl">
          {faqSection.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-ink/80">{faqSection.body}</p>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-forest px-6 py-5 text-cream open:pb-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:content-none">
                <span className="font-medium">{item.question}</span>
                <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-sm text-cream/80">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
