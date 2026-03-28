import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { LanguageContext } from "./languageContext";
import type { Language } from "../types/language";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "pt";
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (storedLanguage === "pt" || storedLanguage === "en") {
    return storedLanguage;
  }

  return window.navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const previousLanguageRef = useRef<Language | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

    let timeoutId: number | undefined;

    if (
      previousLanguageRef.current &&
      previousLanguageRef.current !== language
    ) {
      document.documentElement.setAttribute("data-language-changing", "true");

      timeoutId = window.setTimeout(() => {
        document.documentElement.removeAttribute("data-language-changing");
      }, 340);
    }

    previousLanguageRef.current = language;

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((prev) => (prev === "pt" ? "en" : "pt")),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
