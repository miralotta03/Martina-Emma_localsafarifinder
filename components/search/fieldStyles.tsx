import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

// Native kontroll och custom combobox delar exakt samma ruta (fast höjd), så
// bytet när JS laddats inte flyttar något på sidan.
export const fieldClass =
  "flex h-14 w-full cursor-pointer items-center rounded-xl border border-forest/15 bg-white/70 pr-11 pl-12 text-left text-[15px] text-ink shadow-sm transition-colors hover:border-forest/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export const popupClass =
  "absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-xl border border-forest/15 bg-cream py-2 shadow-xl";

export const optionClass =
  "flex min-h-11 cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-ink";

export const groupLabelClass =
  "px-4 pt-3 pb-1 text-xs font-semibold tracking-[0.15em] text-ink/70 uppercase";

// Listan tonar in och glider ner när den öppnas, och tonar ut när den stängs.
// (visibility: hidden gör att den stängda listan varken syns, kan klickas på
// eller läses upp, precis som med hidden-attributet.)
export function popupState(open: boolean) {
  return `transition-[opacity,translate,visibility] duration-200 ease-out motion-reduce:transition-none ${
    open
      ? "visible opacity-100"
      : "pointer-events-none invisible -translate-y-1 opacity-0"
  }`;
}

// Ikonen till vänster och pilen till höger, ovanpå fältet. Pilen glider ner
// lite när musen är över fältet (group/field på fältets omslag).
export function FieldDecor({
  icon,
  open,
}: {
  icon: ReactNode;
  open?: boolean;
}) {
  return (
    <>
      <span className="pointer-events-none absolute top-0 left-4 flex h-14 items-center text-forest [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <ChevronDownIcon
        className={`pointer-events-none absolute top-[18px] right-4 h-5 w-5 text-forest/70 transition-[rotate,translate,color] duration-200 ease-out group-hover/field:translate-y-0.5 group-hover/field:text-forest motion-reduce:transition-none ${
          open ? "rotate-180" : ""
        }`}
      />
    </>
  );
}
