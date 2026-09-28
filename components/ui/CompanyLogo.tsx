import Image from "next/image";

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
          className="object-cover"
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
