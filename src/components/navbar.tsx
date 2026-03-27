import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import Bubble from "./bubble";
import { useTheme } from "../context/themeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="justify-between z-50 flex p-4 w-full fixed top-0 left-0">
      <Bubble />
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
        className="h-12 px-4 flex items-center gap-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-soft)] backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        <span className="text-sm font-medium">
          {theme === "light" ? "Dark" : "Light"}
        </span>
      </button>
    </nav>
  );
}
