import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "../context/themeContext";
import { useLanguage } from "../context/languageContext";

interface ThemeLanguageControlsProps {
  /** Cor do texto/ícone: "secondary" (navbar) ou "primary" (menu mobile). */
  tone?: "secondary" | "primary";
  className?: string;
}

/**
 * Botões de troca de idioma e tema, compartilhados entre a navbar (desktop) e o
 * menu do Bubble (mobile). Evita a duplicação do markup entre os dois lugares.
 */
export default function ThemeLanguageControls({
  tone = "secondary",
  className = "",
}: ThemeLanguageControlsProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const textColor =
    tone === "primary"
      ? "text-(--color-text-primary)"
      : "text-(--color-text-secondary)";
  const buttonBase = `flex h-10 items-center rounded-full border border-(--color-border-soft) bg-(--color-surface) px-3 ${textColor} shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer sm:h-12 sm:px-4`;

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={
          language === "pt"
            ? "Alternar idioma para inglês"
            : "Switch language to Portuguese"
        }
        className={buttonBase}
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
        className={`${buttonBase} gap-1.5 sm:gap-2`}
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
  );
}
