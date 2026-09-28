"use client";

import { useId, useState } from "react";

// Avkortad recensionstext med en tillgänglig "Läs mer"/"Visa mindre"-knapp.
export function ReviewText({
  text,
  readMoreLabel,
  readLessLabel,
}: {
  text: string;
  readMoreLabel: string;
  readLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div>
      <p
        id={id}
        className={`text-base text-forest/90 italic ${expanded ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded((value) => !value)}
        className="mt-3 cursor-pointer text-sm font-semibold text-forest italic hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {expanded ? readLessLabel : readMoreLabel}
      </button>
    </div>
  );
}
