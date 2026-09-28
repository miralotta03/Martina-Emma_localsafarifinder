"use client";

import { ArrowRightIcon } from "@/components/ui/icons";
import { useContactDialog } from "./contact-dialog-context";

// "Kontakta ➝". Öppnar sidans delade kontaktformulär.
export function ContactButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const { open } = useContactDialog();

  return (
    <button
      type="button"
      onClick={open}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-forest-deep transition-colors hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light ${className}`}
    >
      {label}
      <ArrowRightIcon className="h-4 w-4" />
    </button>
  );
}
