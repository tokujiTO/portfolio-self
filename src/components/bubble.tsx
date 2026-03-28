import { ArrowLineLeftIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { ListIcon } from "@phosphor-icons/react/dist/icons/List";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/languageContext";
import { useTheme } from "../context/themeContext";

export default function Bubble() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  // Quando abrir a tela expandir o menu, depois de 3 segundos recolher o menu
  useEffect(() => {
    if (window.innerWidth < 640) return; // Não mostrar a animação em telas menores que 640px
    const timer = setTimeout(() => {
      setShowIcon(false);
      setTimeout(() => setIsExpanded((prev) => !prev), 100);
      setTimeout(() => setShowCloseIcon(true), 300);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const expand = () => {
    if (!isExpanded) {
      setShowIcon(false);
      setTimeout(() => setIsExpanded((prev) => !prev), 100);
      setTimeout(() => setShowCloseIcon(true), 300);
    } else {
      setShowCloseIcon(false);
      setTimeout(() => setIsExpanded((prev) => !prev), 100);
      setTimeout(() => setShowIcon(true), 300);
    }
  };

  if (window.innerWidth < 640) {
    return (
      <div
        className={`
        ${isExpanded ? "w-screen z-50 h-[50vh] justify-between flex-col" : "w-12  justify-center"}
        h-12 flex items-center
        delay-100
        px-3 sm:p-4 bg-(--color-surface) backdrop-blur-md rounded-lg shadow-lg border border-(--color-border-soft)
        cursor-pointer sm:text-lg text-(--color-text-primary)
        transition-all duration-500 ease-in-out overflow-hidden
      `}
      >
        <div
          className={`flex items-center w-full ${isExpanded ? "justify-between flex-col" : "justify-center"} gap-1.5 sm:gap-2 whitespace-nowrap`}
        >
          {!isExpanded && (
            <span
              className={`shrink-0 duration-100 transition-all ${showIcon ? "opacity-100 rotate-0" : "opacity-0 rotate-40"}`}
              onClick={expand}
            >
              <ListIcon size={32} />
            </span>
          )}
          {isExpanded && (
            <div
              className={`flex items-center gap-3 sm:gap-8 ${showCloseIcon ? "opacity-100 flex-col translate-x-0" : "opacity-0 -translate-x-20"} transition-all duration-300`}
            >
              <span
                className="text-xs font-bold tracking-tight italic sm:text-lg"
                onClick={() => handleScroll("about")}
              >
                {language === "pt" ? "Sobre mim" : "About"}
              </span>
              <span
                className="text-xs font-bold tracking-tight italic sm:text-lg"
                onClick={() => handleScroll("projects")}
              >
                {language === "pt" ? "Projetos" : "Projects"}
              </span>
              <span
                className="text-xs font-bold tracking-tight italic sm:text-lg"
                onClick={() => handleScroll("technologies")}
              >
                {language === "pt" ? "Tecnologias" : "Technologies"}
              </span>
              <span
                className="text-xs font-bold tracking-tight italic sm:text-lg"
                onClick={() => handleScroll("contact")}
              >
                {language === "pt" ? "Contato" : "Contact"}
              </span>
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
                {theme === "light" ? (
                  <MoonIcon size={20} />
                ) : (
                  <SunIcon size={20} />
                )}
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
          )}
          {isExpanded && (
            <span
              className={`font-bold tracking-tighter duration-300 transition-all text-xs sm:text-sm ${showCloseIcon ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-20"} italic`}
              onClick={expand}
            >
              <ArrowLineLeftIcon size={32} />
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        ${isExpanded ? "w-[min(44rem,calc(100vw-8.5rem))] justify-between" : "w-10 sm:w-12 justify-center"}
        h-10 sm:h-12 flex items-center
        delay-100
        px-3 sm:p-4 bg-(--color-surface) backdrop-blur-md rounded-full shadow-lg border border-(--color-border-soft)
        cursor-pointer text-sm sm:text-lg text-(--color-text-primary)
        transition-all duration-500 ease-in-out overflow-hidden
      `}
    >
      <div
        className={`flex items-center w-full ${isExpanded ? "justify-between" : "justify-center"} gap-1.5 sm:gap-2 whitespace-nowrap`}
      >
        {!isExpanded && (
          <span
            className={`shrink-0 duration-100 transition-all ${showIcon ? "opacity-100 rotate-0" : "opacity-0 rotate-40"}`}
            onClick={expand}
          >
            <ListIcon size={32} />
          </span>
        )}
        {isExpanded && (
          <div
            className={`flex items-center gap-3 sm:gap-8 ${showCloseIcon ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"} transition-all duration-300`}
          >
            <span
              className="text-xs font-bold tracking-tight italic sm:text-lg"
              onClick={() => handleScroll("about")}
            >
              {language === "pt" ? "Sobre mim" : "About"}
            </span>
            <span
              className="text-xs font-bold tracking-tight italic sm:text-lg"
              onClick={() => handleScroll("projects")}
            >
              {language === "pt" ? "Projetos" : "Projects"}
            </span>
            <span
              className="text-xs font-bold tracking-tight italic sm:text-lg"
              onClick={() => handleScroll("technologies")}
            >
              {language === "pt" ? "Tecnologias" : "Technologies"}
            </span>
            <span
              className="text-xs font-bold tracking-tight italic sm:text-lg"
              onClick={() => handleScroll("contact")}
            >
              {language === "pt" ? "Contato" : "Contact"}
            </span>
          </div>
        )}
        {isExpanded && (
          <span
            className={`font-bold tracking-tighter duration-300 transition-all text-xs sm:text-sm ${showCloseIcon ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-20"} italic`}
            onClick={expand}
          >
            <ArrowLineLeftIcon size={32} />
          </span>
        )}
      </div>
    </div>
  );
}
