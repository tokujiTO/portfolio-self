import { ArrowLineLeftIcon } from "@phosphor-icons/react";
import { ListIcon } from "@phosphor-icons/react/dist/icons/List";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/languageContext";
import { useIsWideScreen } from "../hooks/useIsWideScreen";
import ThemeLanguageControls from "./themeLanguageControls";

type NavItem = { id: string; pt: string; en: string };

const NAV_ITEMS: NavItem[] = [
  { id: "about", pt: "Sobre mim", en: "About" },
  { id: "projects", pt: "Projetos", en: "Projects" },
  { id: "technologies", pt: "Tecnologias", en: "Technologies" },
  { id: "contact", pt: "Contato", en: "Contact" },
];

export default function Bubble() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isWideScreen = useIsWideScreen();

  const menuItemClass =
    "relative inline-flex cursor-pointer bg-transparent text-xs font-bold tracking-tight italic sm:text-lg after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-(--color-text-secondary) after:transition-transform after:duration-300 hover:after:scale-x-100";

  const collapse = useCallback(() => {
    setShowCloseIcon(false);
    setTimeout(() => setIsExpanded(false), 100);
    setTimeout(() => setShowIcon(true), 300);
  }, []);

  const open = useCallback(() => {
    setShowIcon(false);
    setTimeout(() => setIsExpanded(true), 100);
    setTimeout(() => setShowCloseIcon(true), 300);
  }, []);

  // Auto-expande o menu ao carregar em telas largas, recolhendo em seguida.
  useEffect(() => {
    if (!isWideScreen) return;
    const timer = setTimeout(open, 1000);
    return () => clearTimeout(timer);
  }, [isWideScreen, open]);

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isExpanded) return;

    const closeOnOutsideTouch = (event: MouseEvent | TouchEvent) => {
      if (bubbleRef.current?.contains(event.target as Node)) {
        return;
      }
      collapse();
    };

    document.addEventListener("mousedown", closeOnOutsideTouch);
    document.addEventListener("touchstart", closeOnOutsideTouch);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideTouch);
      document.removeEventListener("touchstart", closeOnOutsideTouch);
    };
  }, [isExpanded, collapse]);

  const navButtons = (extraClass = "") =>
    NAV_ITEMS.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`${menuItemClass} ${extraClass}`}
        onClick={() => {
          handleScroll(item.id);
          if (!isWideScreen) collapse();
        }}
      >
        {language === "pt" ? item.pt : item.en}
      </button>
    ));

  if (!isWideScreen) {
    return (
      <div
        ref={bubbleRef}
        className={`
        ${isExpanded ? "w-full z-50 h-[60vh]  justify-between" : "w-12 justify-center"}
        h-12 flex items-center
        delay-100 flex-col relative
        px-3 sm:p-4 bg-(--color-surface) backdrop-blur-md shadow-lg rounded-2xl border border-(--color-border-soft)
        sm:text-lg text-(--color-text-secondary)
        transition-all duration-500 ease-in-out overflow-hidden
        `}
      >
        <div
          className={`flex items-center flex-col w-full ${isExpanded ? "justify-between" : "justify-center"} gap-1.5 sm:gap-2 whitespace-nowrap`}
        >
          {!isExpanded && (
            <button
              type="button"
              aria-label={language === "pt" ? "Abrir menu" : "Open menu"}
              aria-expanded={isExpanded}
              className={`shrink-0 duration-100 transition-all ${showIcon ? "opacity-100 rotate-0" : "opacity-0 rotate-40"}`}
              onClick={open}
            >
              <ListIcon size={32} />
            </button>
          )}
          {isExpanded && (
            <nav
              aria-label={language === "pt" ? "Menu principal" : "Main menu"}
              className={`flex flex-col w-full py-10 items-start pl-10 gap-10 sm:gap-8 ${showCloseIcon ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"} transition-all duration-300`}
            >
              <span className="text-3xl font-bold tracking-tight italic sm:text-lg">
                Menu
              </span>
              {navButtons("text-3xl")}
              <ThemeLanguageControls
                tone="primary"
                className="w-full justify-end flex-row-reverse"
              />
            </nav>
          )}
          {isExpanded && (
            <button
              type="button"
              aria-label={language === "pt" ? "Fechar menu" : "Close menu"}
              aria-expanded={isExpanded}
              className={`font-bold absolute left-7/9 top-10 -translate-x-full tracking-tighter duration-300 transition-all text-xs sm:text-sm ${showCloseIcon ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-20"} italic`}
              onClick={collapse}
            >
              <ArrowLineLeftIcon size={32} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={bubbleRef}
      className={`
        ${isExpanded ? "w-[min(44rem,calc(100vw-8.5rem))] justify-between" : "w-10 sm:w-12 justify-center"}
        h-10 sm:h-12 flex items-center
        delay-100
        px-3 sm:p-4 bg-(--color-surface) backdrop-blur-md rounded-full shadow-lg border border-(--color-border-soft)
        text-sm sm:text-lg text-(--color-text-secondary)
        transition-all duration-500 ease-in-out overflow-hidden
      `}
    >
      <div
        className={`flex items-center w-full ${isExpanded ? "justify-between" : "justify-center"} gap-1.5 sm:gap-2 whitespace-nowrap`}
      >
        {!isExpanded && (
          <button
            type="button"
            aria-label={language === "pt" ? "Abrir menu" : "Open menu"}
            aria-expanded={isExpanded}
            className={`shrink-0 cursor-pointer duration-100 transition-all ${showIcon ? "opacity-100 rotate-0" : "opacity-0 rotate-40"}`}
            onClick={open}
          >
            <ListIcon size={32} />
          </button>
        )}
        {isExpanded && (
          <nav
            aria-label={language === "pt" ? "Menu principal" : "Main menu"}
            className={`flex items-center gap-3 sm:gap-8 ${showCloseIcon ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"} transition-all duration-300`}
          >
            {navButtons()}
          </nav>
        )}
        {isExpanded && (
          <button
            type="button"
            aria-label={language === "pt" ? "Fechar menu" : "Close menu"}
            aria-expanded={isExpanded}
            className={`font-bold cursor-pointer tracking-tighter duration-300 transition-all text-xs sm:text-sm ${showCloseIcon ? "opacity-100 translate-x-0 " : "opacity-0 -translate-x-20"} italic`}
            onClick={collapse}
          >
            <ArrowLineLeftIcon size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
