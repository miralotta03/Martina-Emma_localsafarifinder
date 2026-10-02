"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false i serverns HTML och under hydreringen, true så fort JS har tagit över.
// Sökfälten visar native kontroller tills dess, så att formuläret fungerar
// innan (eller helt utan) JavaScript.
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
