import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import Bubble from "./bubble";
import { useTheme } from "../context/themeContext";
import { useLanguage } from "../context/languageContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-3 py-3 sm:px-4">
      <Bubble />
      <div className="flex shrink-0 items-center gap-2 sm:gap-3 max-md:hidden">
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={
            language === "pt"
              ? "Alternar idioma para inglês"
              : "Switch language to Portuguese"
          }
          className="flex h-10 items-center rounded-full border border-(--color-border-soft) bg-(--color-surface) px-3 text-(--color-text-primary) shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer sm:h-12 sm:px-4"
        >
          <span className="text-xs font-semibold uppercase sm:text-sm">
            {language === "pt" ? "EN" : "PT"}
          </span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            language === "pt"
              ? `Alternar para tema ${theme === "light" ? "escuro" : "claro"}`
              : `Switch to ${theme === "light" ? "dark" : "light"} theme`
          }
          className="flex h-10 items-center gap-1.5 rounded-full border border-(--color-border-soft) bg-(--color-surface) px-3 text-(--color-text-primary) shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer sm:h-12 sm:gap-2 sm:px-4"
        >
          {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          <span className="text-xs font-medium sm:text-sm">
            {theme === "light"
              ? language === "pt"
                ? "Escuro"
                : "Dark"
              : language === "pt"
                ? "Claro"
                : "Light"}
          </span>
        </button>
      </div>
    </nav>
  );
}
