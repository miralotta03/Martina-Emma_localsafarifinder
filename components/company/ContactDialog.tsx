"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { CloseIcon } from "@/components/ui/icons";
import { useContactDialog } from "./contact-dialog-context";

// Formuläret laddas först när dialogen faktiskt öppnas, så resten av sidan
// förblir server-renderad.
const ContactForm = dynamic(
  () => import("./ContactForm").then((mod) => mod.ContactForm),
  { ssr: false },
);

// En delad <dialog> för hela sidan. `useContactDialog` styr vilket företag
// den just nu gäller och ger tillbaka fokus till knappen som öppnade den.
export function ContactDialog({
  companySlug,
  companyName,
  companyLogo,
  intro,
}: {
  companySlug: string;
  companyName: string;
  companyLogo?: string;
  intro: string[];
}) {
  const { isOpen, close } = useContactDialog();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onCancel={close}
      aria-labelledby="contact-dialog-heading"
      className="m-auto max-h-[90vh] w-[min(640px,92vw)] overflow-y-auto rounded-3xl bg-cream p-0 backdrop:bg-forest-deep/70"
    >
      <div className="sticky top-0 z-10 flex justify-end bg-cream/95 p-4">
        <button
          type="button"
          onClick={close}
          aria-label="Stäng"
          className="cursor-pointer rounded-full bg-forest-deep p-2 text-cream hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="px-6 pb-8 sm:px-10 sm:pb-10">
        <CompanyLogo
          name={companyName}
          logo={companyLogo}
          sizes="200px"
          className="h-16 w-40"
          textClassName="rounded-xl text-lg"
        />
        <h2 id="contact-dialog-heading" className="sr-only">
          {`Kontakta ${companyName}`}
        </h2>
        {isOpen && (
          <ContactForm
            companySlug={companySlug}
            companyName={companyName}
            intro={intro}
          />
        )}
      </div>
    </dialog>
  );
}
