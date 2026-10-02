"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { format } from "@/lib/i18n";
import { CheckIcon } from "@/components/ui/icons";
import { useHydrated } from "./useHydrated";
import { useListbox } from "./useListbox";
import type { SelectOption } from "./SearchSelect";
import { FieldDecor, fieldClass, optionClass, popupClass } from "./fieldStyles";

type Props = {
  name: string;
  label: string;
  // Mall för "{count} valda" när namnen inte får plats.
  selectedCountLabel: string;
  icon: ReactNode;
  options: SelectOption[];
  defaultValue?: string[];
  className?: string;
};

// Fler än så visas som "{count} valda" i stället för namnen. Räknas på antal,
// inte på uppmätt bredd, så att texten inte hoppar när sidan laddas.
const MAX_NAMES = 2;

function summary(
  values: string[],
  options: SelectOption[],
  label: string,
  countLabel: string,
) {
  if (!values.length) return label;
  if (values.length > MAX_NAMES) {
    return format(countLabel, { count: values.length });
  }
  return options
    .filter((option) => values.includes(option.value))
    .map((option) => option.label)
    .join(", ");
}

// Flerval: <details> med checkboxar tills JS har laddats, sedan en combobox
// med en listbox som tillåter flera val.
export function SearchMultiSelect(props: Props) {
  const hydrated = useHydrated();
  const id = useId();
  const nativeId = `${id}-native`;
  const initial = props.defaultValue ?? [];
  const text = summary(
    initial,
    props.options,
    props.label,
    props.selectedCountLabel,
  );

  return (
    <div className={`relative ${props.className ?? ""}`}>
      {hydrated ? (
        <ComboboxMultiSelect {...props} id={id} nativeId={nativeId} />
      ) : (
        <details>
          <summary
            className={`${fieldClass} list-none [&::-webkit-details-marker]:hidden`}
          >
            <span className={`truncate ${initial.length ? "" : "text-ink/80"}`}>
              {text}
            </span>
          </summary>
          <fieldset id={nativeId} className={`${popupClass} px-4`}>
            <legend className="sr-only">{props.label}</legend>
            {props.options.map((option) => (
              <label key={option.value} className={`${optionClass} px-0`}>
                <input
                  type="checkbox"
                  name={props.name}
                  value={option.value}
                  defaultChecked={initial.includes(option.value)}
                  className="h-4 w-4 accent-forest"
                />
                {option.label}
              </label>
            ))}
          </fieldset>
        </details>
      )}
      {/* Utanför <details>, som döljer allt utom <summary> när den är stängd. */}
      {!hydrated && <FieldDecor icon={props.icon} />}
    </div>
  );
}

function ComboboxMultiSelect({
  id,
  nativeId,
  name,
  label,
  selectedCountLabel,
  icon,
  options,
  defaultValue,
}: Props & { id: string; nativeId: string }) {
  // Kryss som gjordes innan JS laddats följer med (se SearchSelect).
  const [values, setValues] = useState<string[]>(() => {
    const native = document.getElementById(nativeId);
    if (!native) return defaultValue ?? [];
    return [
      ...native.querySelectorAll<HTMLInputElement>("input:checked"),
    ].map((input) => input.value);
  });

  const optionIds = options.map((_, i) => `${id}-option-${i}`);
  const firstSelected = options.findIndex((o) => values.includes(o.value));

  const listRef = useRef<HTMLDivElement>(null);
  const listbox = useListbox({
    listRef,
    optionIds,
    labels: options.map((option) => option.label),
    initialIndex: firstSelected,
    onChoose: (index) => {
      const value = options[index].value;
      setValues((current) =>
        current.includes(value)
          ? current.filter((v) => v !== value)
          : // Behåll listans ordning, inte klickordningen.
            options
              .map((o) => o.value)
              .filter((v) => v === value || current.includes(v)),
      );
    },
    closeOnChoose: false,
  });

  const labelId = `${id}-label`;
  const listId = `${id}-listbox`;

  return (
    <>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <div
        role="combobox"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={listbox.open}
        aria-controls={listId}
        aria-activedescendant={listbox.activeId}
        onClick={listbox.toggle}
        onKeyDown={listbox.onKeyDown}
        onBlur={listbox.close}
        className={fieldClass}
      >
        <span className={`truncate ${values.length ? "" : "text-ink/80"}`}>
          {summary(values, options, label, selectedCountLabel)}
        </span>
      </div>
      <FieldDecor icon={icon} open={listbox.open} />

      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        aria-multiselectable="true"
        hidden={!listbox.open}
        onMouseDown={(event) => event.preventDefault()}
        className={popupClass}
      >
        {options.map((option, index) => {
          const isSelected = values.includes(option.value);
          return (
            <div
              key={option.value}
              id={optionIds[index]}
              role="option"
              aria-selected={isSelected}
              onClick={() => listbox.choose(index)}
              onMouseMove={() => listbox.setActive(index)}
              className={`${optionClass} ${
                index === listbox.active ? "bg-forest/10" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  isSelected
                    ? "border-forest bg-forest text-cream"
                    : "border-forest/40"
                }`}
              >
                {isSelected && <CheckIcon className="h-3.5 w-3.5" />}
              </span>
              {option.label}
            </div>
          );
        })}
      </div>

      <input
        type="hidden"
        name={name}
        value={values.join(",")}
        disabled={!values.length}
      />
    </>
  );
}
