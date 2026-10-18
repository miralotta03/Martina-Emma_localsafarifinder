"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Delas av alla "Kontakta ➝"-knappar och den enda dialogen på sidan.
type ContactDialogContextValue = {
  // Företaget sidan gäller (för spårning av Kontakta-klick).
  companySlug: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(
  null,
);

export function ContactDialogProvider({
  companySlug,
  children,
}: {
  companySlug: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      companySlug,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [companySlug, isOpen],
  );

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) {
    throw new Error(
      "useContactDialog måste användas inuti ContactDialogProvider.",
    );
  }
  return context;
}
