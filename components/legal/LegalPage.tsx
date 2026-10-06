import type { Metadata } from "next";
import Link from "next/link";
import { legalPageLabels } from "@/content/juridik/common";
import type {
  LegalBlock,
  LegalInline,
  LegalPageContent,
} from "@/content/juridik/types";
import { format, t } from "@/lib/i18n";
import { slugify } from "@/lib/search";
import { Container } from "@/components/ui/Container";

export function legalPageMetadata(page: LegalPageContent): Metadata {
  return {
    title: format(t(legalPageLabels.metaTitle), { title: page.title }),
    description: page.description,
  };
}

function Inline({ part }: { part: LegalInline }) {
  if (typeof part === "string") return part;
  if ("strong" in part) {
    return <strong className="font-semibold text-forest">{part.strong}</strong>;
  }
  return (
    <Link
      href={part.href}
      className="text-forest underline underline-offset-2 hover:text-gold-dark"
    >
      {part.link}
    </Link>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if ("list" in block) {
    return (
      <ul className="space-y-1">
        {block.list.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      {block.p.map((part, i) => (
        <Inline key={i} part={part} />
      ))}
    </p>
  );
}

// Delad layout för användarvillkor, integritetspolicy och cookiepolicy.
export function LegalPage({ page }: { page: LegalPageContent }) {
  const sections = page.sections.map((section) => ({
    ...section,
    id: slugify(section.heading),
  }));

  return (
    <article className="py-16 lg:py-24">
      <Container>
        <h1 className="font-serif text-4xl text-forest sm:text-5xl lg:text-6xl">
          {page.title}
        </h1>
        <p className="mt-3 text-lg text-forest sm:text-xl">
          {format(t(legalPageLabels.updated), { date: page.updated })}
        </p>

        <nav
          aria-labelledby="legal-toc-heading"
          className="mt-10 max-w-xl rounded-2xl bg-cream-dark/50 p-6"
        >
          <h2
            id="legal-toc-heading"
            className="text-xs font-semibold tracking-[0.2em] text-ink/70 uppercase"
          >
            {t(legalPageLabels.toc)}
          </h2>
          <ul className="mt-3 text-sm lg:space-y-1.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block py-3 text-forest underline-offset-2 hover:underline focus-visible:outline-2 lg:inline lg:py-0 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2
                id={section.id}
                // Den fasta headern får inte täcka rubriken vid ankarlänkar.
                className="scroll-mt-28 font-serif text-2xl text-forest sm:text-3xl"
              >
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-ink/90 sm:text-[17px]">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
