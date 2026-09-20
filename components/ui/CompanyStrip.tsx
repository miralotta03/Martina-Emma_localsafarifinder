import type { Company } from "@/data/companies";
import { PartnerCard } from "./PartnerCard";

function Half({
  companies,
  linkLabel,
  repeats,
  hidden = false,
}: {
  companies: Company[];
  linkLabel: string;
  repeats: number;
  hidden?: boolean;
}) {
  return (
    <ul
      className={`flex shrink-0 gap-6 pr-6 ${hidden ? "marquee-clone" : ""}`}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      {Array.from({ length: repeats }).flatMap((_, r) =>
        companies.map((company) => (
          <li key={`${r}-${company.slug}`}>
            <PartnerCard company={company} linkLabel={linkLabel} />
          </li>
        )),
      )}
    </ul>
  );
}

// Loopande remsa. Med `staticBelow` visas färre företag än så som en
// statisk, centrerad rad i stället för en loop.
export function CompanyStrip({
  companies,
  linkLabel,
  staticBelow,
}: {
  companies: Company[];
  linkLabel: string;
  staticBelow?: number;
}) {
  if (staticBelow !== undefined && companies.length < staticBelow) {
    return (
      <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-6 lg:px-10">
        {companies.map((company) => (
          <li key={company.slug}>
            <PartnerCard company={company} linkLabel={linkLabel} />
          </li>
        ))}
      </ul>
    );
  }

  // Varje halva av loopen upprepar listan så att den alltid är bredare än
  // skärmen, annars syns ett tomrum i slingan.
  const repeats = Math.max(1, Math.ceil(6 / companies.length));

  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track flex w-max">
        <Half companies={companies} linkLabel={linkLabel} repeats={repeats} />
        <Half
          companies={companies}
          linkLabel={linkLabel}
          repeats={repeats}
          hidden
        />
      </div>
    </div>
  );
}
