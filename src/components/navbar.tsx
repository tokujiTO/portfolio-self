import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { List } from "@phosphor-icons/react";
import { useLanguage } from "../context/languageContext";
import { useTheme } from "../context/themeContext";
import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./navLinks";

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [collapsed, setCollapsed] = useState(false);
  const [hover, setHover] = useState(false);
  const [manual, setManual] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = lastY.current;
    // Ignore sub-8px jitter so the tray doesn't flicker open/closed while scrolling.
    if (Math.abs(y - prev) < 8) return;
    const goingDown = y > prev;
    lastY.current = y;

    if (y < 90) {
      setCollapsed(false);
      setManual(false);
      return;
    }
    setCollapsed(goingDown);
    if (goingDown) setManual(false);
  });

  const expanded = hover || manual || !collapsed;

  // The hamburger and the links tray share one slot, so they must animate in
  // sequence (hamburger out, then links in — and back) rather than at once,
  // or the two swap in a jarring overlap. State (not a ref) so reading the
  // previous value during render stays lint-clean.
  const [wasExpanded, setWasExpanded] = useState(expanded);
  const opening = expanded && !wasExpanded;
  const closing = !expanded && wasExpanded;
  useEffect(() => {
    setWasExpanded(expanded);
  }, [expanded]);

  const HAMBURGER_DURATION = 0.35;
  const LINKS_DURATION = 0.6;

  const closeMobileMenu = () => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <nav
      className="pointer-events-none sticky top-0 z-50 flex items-center justify-center gap-3 px-3 sm:px-8"
      style={{ top: "14px" }}
    >
      {/* Desktop (>= md): existing tray + controls capsule, unchanged */}
      <div className="hidden items-center gap-3 md:flex">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="pointer-events-auto flex items-center gap-4 rounded-[44px] border py-[10px] pr-3 pl-5 shadow-[0_12px_34px_-14px_rgba(60,30,10,0.4)] transition-colors duration-500"
        style={{
          background: "var(--navbg)",
          borderColor: "var(--line)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <a
          href="#top"
          className="font-syne whitespace-nowrap text-[15px] font-extrabold"
          style={{ color: "var(--ink)", letterSpacing: "-.01em" }}
        >
          増田 <span>TIAGO</span>
        </a>

        <motion.div
          className="mono flex items-center overflow-hidden pb-1.5 text-[12px] font-medium whitespace-nowrap"
          style={{ color: "var(--muted)", gap: "clamp(12px,1.6vw,22px)" }}
          animate={{
            maxWidth: expanded ? 640 : 0,
            opacity: expanded ? 1 : 0,
            marginRight: expanded ? 0 : -16,
          }}
          transition={{
            duration: LINKS_DURATION,
            ease: [0.2, 0.7, 0.2, 1],
            delay: opening ? HAMBURGER_DURATION : 0,
          }}
          aria-hidden={!expanded}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={expanded ? 0 : -1}
              className="group relative inline-block font-dm transition-colors duration-200 hover:[color:var(--accent)]"
            >
              {language === "pt" ? link.pt : link.en}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-1 left-0 w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                style={{ borderTop: "1.5px dashed var(--accent)" }}
              />
            </a>
          ))}
        </motion.div>

        <motion.button
          type="button"
          aria-label={language === "pt" ? "Abrir menu" : "Open menu"}
          aria-expanded={expanded}
          onClick={() => setManual((m) => !m)}
          className="flex flex-none cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 bg-transparent p-0"
          style={{ color: "var(--fg)" }}
          animate={{
            width: expanded ? 0 : 34,
            height: 34,
            opacity: expanded ? 0 : 1,
            marginLeft: expanded ? 0 : 2,
            border: expanded ? "none" : "1px solid var(--chip)",
          }}
          transition={{
            duration: HAMBURGER_DURATION,
            ease: "easeOut",
            delay: closing ? LINKS_DURATION : 0,
          }}
          tabIndex={expanded ? -1 : 0}
        >
          <List size={16} weight="bold" />
        </motion.button>
      </div>

      {/* controls capsule */}
      <div
        className="pointer-events-auto flex items-center gap-2 rounded-[44px] border-[1.5px] p-2 transition-colors duration-500"
        style={{
          background: "var(--card)",
          borderColor: "var(--accent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: `0 0 0 4px color-mix(in srgb, var(--accent) 14%, transparent), var(--glow)`,
        }}
      >
        <button
          type="button"
          onClick={toggleLanguage}
          className="mono cursor-pointer rounded-[26px] border-0 bg-transparent px-[11px] py-2 text-[9px] font-bold transition-colors duration-300 hover:[background:color-mix(in_srgb,var(--accent)_16%,transparent)]"
          style={{ color: "var(--fg)", letterSpacing: ".06em" }}
        >
          {language === "pt" ? "PT / EN" : "EN / PT"}
        </button>
        <motion.button
          type="button"
          onClick={toggleTheme}
          aria-label={language === "pt" ? "Alternar tema" : "Toggle theme"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 text-[15px] transition-colors duration-500"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {theme === "light" ? "☾" : "☀"}
        </motion.button>
      </div>
      </div>

      {/* Mobile (< md): compact bar — wordmark, lang, theme, hamburger */}
      <div
        className="pointer-events-auto flex w-full items-center justify-between gap-3 rounded-[28px] border px-4 py-[10px] shadow-[0_12px_34px_-14px_rgba(60,30,10,0.4)] transition-colors duration-500 md:hidden"
        style={{
          background: "var(--navbg)",
          borderColor: "var(--line)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <a
          href="#top"
          className="font-syne whitespace-nowrap text-[15px] font-extrabold"
          style={{ color: "var(--ink)", letterSpacing: "-.01em" }}
        >
          増田 <span>TIAGO</span>
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="mono cursor-pointer rounded-[26px] bg-transparent px-[11px] py-2 text-[9px] font-bold whitespace-nowrap"
            style={{ color: "var(--fg)", letterSpacing: ".06em", border: "1px solid var(--chip)" }}
          >
            {language === "pt" ? "PT / EN" : "EN / PT"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={language === "pt" ? "Alternar tema" : "Toggle theme"}
            className="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-full border-0 text-[16px]"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={language === "pt" ? "Abrir menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-full bg-transparent"
            style={{ border: "1px solid var(--chip)", color: "var(--fg)" }}
          >
            <List size={18} weight="bold" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMobileMenu} />
    </nav>
  );
}
