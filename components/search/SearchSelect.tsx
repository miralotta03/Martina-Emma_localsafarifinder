"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { useHydrated } from "./useHydrated";
import { useListbox } from "./useListbox";
import {
  FieldDecor,
  fieldClass,
  groupLabelClass,
  optionClass,
  popupClass,
} from "./fieldStyles";

export type SelectOption = {
  value: string;
  label: string;
  // Texten i fältet när alternativet är valt, om den ska skilja sig från listan.
  selectedLabel?: string;
};
export type SelectGroup = { label?: string; options: SelectOption[] };

type Props = {
  name: string;
  label: string;
  // Första raden i listan, som tömmer fältet ("alla").
  allLabel: string;
  icon: ReactNode;
  groups: SelectGroup[];
  defaultValue?: string;
};

// Enkelval: native <select> tills JS har laddats, sedan en combobox.
export function SearchSelect(props: Props) {
  const hydrated = useHydrated();
  const id = useId();
  const nativeId = `${id}-native`;

  return (
    <div className="relative">
      {hydrated ? (
        <ComboboxSelect {...props} id={id} nativeId={nativeId} />
      ) : (
        <>
          <label htmlFor={nativeId} className="sr-only">
            {props.label}
          </label>
          <select
            id={nativeId}
            name={props.name}
            defaultValue={props.defaultValue ?? ""}
            className={`${fieldClass} appearance-none`}
          >
            <option value="">{props.label}</option>
            {props.groups.map((group, g) =>
              group.label ? (
                <optgroup key={g} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ) : (
                group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              ),
            )}
          </select>
          <FieldDecor icon={props.icon} />
        </>
      )}
    </div>
  );
}

function ComboboxSelect({
  id,
  nativeId,
  name,
  label,
  allLabel,
  icon,
  groups,
  defaultValue,
}: Props & { id: string; nativeId: string }) {
  // Ett val som gjordes i den native kontrollen innan JS laddats följer med.
  // Den finns fortfarande i DOM:en när den här komponenten renderas första gången.
  const [value, setValue] = useState(() => {
    const native = document.getElementById(nativeId);
    return native instanceof HTMLSelectElement
      ? native.value
      : (defaultValue ?? "");
  });

  const allOption: SelectOption = { value: "", label: allLabel };
  const options = [allOption, ...groups.flatMap((group) => group.options)];
  const optionIds = options.map((_, i) => `${id}-option-${i}`);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];

  const listRef = useRef<HTMLDivElement>(null);
  const listbox = useListbox({
    listRef,
    optionIds,
    labels: options.map((option) => option.label),
    initialIndex: selectedIndex,
    onChoose: (index) => setValue(options[index].value),
    closeOnChoose: true,
  });

  const labelId = `${id}-label`;
  const listId = `${id}-listbox`;

  function renderOption(option: SelectOption) {
    const index = options.indexOf(option);
    const isSelected = index === selectedIndex;
    return (
      <div
        key={option.value}
        id={optionIds[index]}
        role="option"
        aria-selected={isSelected}
        onClick={() => listbox.choose(index)}
        onMouseMove={() => listbox.setActive(index)}
        className={`${optionClass} justify-between ${
          index === listbox.active ? "bg-forest/10" : ""
        } ${isSelected ? "font-medium text-forest" : ""}`}
      >
        {option.label}
        {isSelected && <CheckIcon className="h-4 w-4 shrink-0 text-forest" />}
      </div>
    );
  }

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
        <span className={`truncate ${value ? "" : "text-ink/80"}`}>
          {value ? (selected?.selectedLabel ?? selected?.label) : label}
        </span>
      </div>
      <FieldDecor icon={icon} open={listbox.open} />

      {/* Klick i listan får inte ta fokus från comboboxen. */}
      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!listbox.open}
        onMouseDown={(event) => event.preventDefault()}
        className={popupClass}
      >
        {renderOption(allOption)}
        {groups.map((group, g) =>
          group.label ? (
            <div
              key={g}
              role="group"
              aria-labelledby={`${id}-group-${g}`}
            >
              <div
                id={`${id}-group-${g}`}
                role="presentation"
                className={groupLabelClass}
              >
                {group.label}
              </div>
              {group.options.map(renderOption)}
            </div>
          ) : (
            group.options.map(renderOption)
          ),
        )}
      </div>

      {/* Tomt fält skickas inte alls, så URL:en bara får valda filter. */}
      <input type="hidden" name={name} value={value} disabled={!value} />
    </>
  );
}
