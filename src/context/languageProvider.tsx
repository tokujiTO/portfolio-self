import { useCallback, useMemo, useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./languageContext";
import type { Localized } from "../types/content";

const STORAGE_KEY = "portfolio-lang";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en") return stored;
  return "pt";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "pt" ? "en" : "pt";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (value: Localized) => value[language],
    [language],
  );

  const value = useMemo(
    () => ({ language, toggleLanguage, t }),
    [language, toggleLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
