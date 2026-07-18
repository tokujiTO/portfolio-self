import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { useLanguage } from "../context/languageContext";
import { NAV_LINKS } from "./navLinks";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock + Esc-to-close + a simple focus trap, all scoped to
  // while the overlay is actually open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;

      const focusables = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={language === "pt" ? "Menu de navegação" : "Navigation menu"}
          className="pointer-events-auto fixed inset-0 z-[80] flex flex-col md:hidden"
          style={{
            background: "var(--contactbg)",
            color: "var(--contactfg)",
            padding: "22px 24px",
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: shouldReduceMotion ? 0.001 : 0.35, ease: "easeOut" }}
        >
          <div className="mb-11 flex items-center justify-between">
            <span className="font-syne font-extrabold" style={{ fontSize: 17 }}>
              増田 TIAGO
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={language === "pt" ? "Fechar menu" : "Close menu"}
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full bg-transparent"
              style={{ border: "1px solid rgba(255,255,255,.25)", color: "var(--contactfg)" }}
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-syne font-bold"
                style={{
                  fontSize: 34,
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,.12)",
                  color: "var(--contactfg)",
                }}
              >
                {language === "pt" ? link.pt : link.en}
              </a>
            ))}
          </nav>

          <div
            className="mono mt-auto font-bold"
            style={{
              fontSize: 9,
              letterSpacing: ".14em",
              color: "var(--contactmut)",
              paddingTop: 24,
            }}
          >
            © 2026 TIAGO MASSUDA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
