import Image from "next/image";

// Platshållarbilderna under /images/companies är illustrationer som ska fylla
// rutan. Riktiga logotyper (t.ex. /companies/<företag>/logo/…) visas hela och
// centrerade med lite luft runt, så att inget av logotypen klipps bort.
export function logoFitClass(logo: string) {
  return logo.startsWith("/images/companies/")
    ? "object-cover"
    : "object-contain p-[8%]";
}

// Logotypen om den finns, annars företagsnamnet som text i samma ruta.
export function CompanyLogo({
  name,
  logo,
  sizes,
  className = "",
  textClassName = "",
}: {
  name: string;
  logo?: string;
  sizes: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {logo ? (
        <Image
          src={logo}
          alt={name}
          fill
          sizes={sizes}
          className={logoFitClass(logo)}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-forest/10 p-4 text-center font-serif text-forest ${textClassName}`}
        >
          {name}
        </div>
      )}
    </div>
  );
}
