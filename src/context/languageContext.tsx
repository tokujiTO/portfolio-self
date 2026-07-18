import { createContext, useContext } from "react";
import type { Localized } from "../types/content";

export type Language = "pt" | "en";

export interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (value: Localized) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(
  null,
);

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
