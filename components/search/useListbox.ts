"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from "react";

// Tangentbord och öppet/stängt för en "select-only combobox" enligt ARIA APG:
// https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
// Fokus stannar på comboboxen; aktivt alternativ pekas ut med
// aria-activedescendant.
export function useListbox({
  optionIds,
  labels,
  initialIndex,
  onChoose,
  closeOnChoose,
  listRef,
}: {
  optionIds: string[];
  labels: string[];
  // Där markeringen hamnar när listan öppnas (det valda alternativet).
  initialIndex: number;
  onChoose: (index: number) => void;
  closeOnChoose: boolean;
  // Listan, som hålls synlig när den öppnas.
  listRef: RefObject<HTMLDivElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const typeahead = useRef({ text: "", time: 0 });
  const last = optionIds.length - 1;

  function openAt(index: number) {
    setOpen(true);
    setActive(Math.min(Math.max(index, 0), last));
  }

  function close() {
    setOpen(false);
  }

  function choose(index: number) {
    if (index < 0) return;
    onChoose(index);
    if (closeOnChoose) close();
  }

  // Tangenter som matchar början på ett alternativ hoppar dit.
  function findByTyping(key: string): number {
    const now = Date.now();
    const text =
      now - typeahead.current.time < 600 ? typeahead.current.text + key : key;
    typeahead.current = { text, time: now };
    const needle = text.toLocaleLowerCase("sv");
    const start = Math.max(active, 0);
    const order = [...labels.keys()].map(
      (i) => (start + (text.length === 1 ? 1 : 0) + i) % labels.length,
    );
    return (
      order.find((i) => labels[i].toLocaleLowerCase("sv").startsWith(needle)) ??
      -1
    );
  }

  function onKeyDown(event: KeyboardEvent) {
    const { key, altKey, ctrlKey, metaKey } = event;
    const printable = key.length === 1 && key !== " " && !ctrlKey && !metaKey;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        event.preventDefault();
        openAt(initialIndex >= 0 ? initialIndex : 0);
      } else if (key === "Home") {
        event.preventDefault();
        openAt(0);
      } else if (key === "End") {
        event.preventDefault();
        openAt(last);
      } else if (printable && !altKey) {
        const match = findByTyping(key);
        if (match >= 0) openAt(match);
      }
      return;
    }

    switch (key) {
      case "ArrowDown":
        event.preventDefault();
        if (!altKey) setActive(Math.min(active + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (altKey) {
          choose(active);
          close();
        } else {
          setActive(Math.max(active - 1, 0));
        }
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(last);
        break;
      case "PageDown":
        event.preventDefault();
        setActive(Math.min(active + 10, last));
        break;
      case "PageUp":
        event.preventDefault();
        setActive(Math.max(active - 10, 0));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        // Stäng och låt fokus gå vidare som vanligt.
        close();
        break;
      default:
        if (printable && !altKey) {
          const match = findByTyping(key);
          if (match >= 0) setActive(match);
        }
    }
  }

  // Håll listan och det aktiva alternativet synliga, t.ex. på en låg mobilskärm.
  useEffect(() => {
    if (open) listRef.current?.scrollIntoView({ block: "nearest" });
  }, [open, listRef]);

  const activeId = open && active >= 0 ? optionIds[active] : undefined;
  useEffect(() => {
    if (activeId) {
      document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
    }
  }, [activeId]);

  return {
    open,
    active,
    activeId,
    toggle: () =>
      open ? close() : openAt(initialIndex >= 0 ? initialIndex : 0),
    close,
    choose,
    setActive,
    onKeyDown,
  };
}
