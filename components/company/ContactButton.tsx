import { ArrowRightIcon } from "@/components/ui/icons";

// "Kontakta ➝". Öppnar kontaktformuläret (kopplas i nästa steg).
export function ContactButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-forest-deep transition-colors hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light ${className}`}
    >
      {label}
      <ArrowRightIcon className="h-4 w-4" />
    </button>
  );
}
