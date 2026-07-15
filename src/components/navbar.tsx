import Bubble from "./bubble";
import ThemeLanguageControls from "./themeLanguageControls";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-3 py-3 sm:px-4">
      <Bubble />
      <ThemeLanguageControls className="shrink-0 max-md:hidden" />
    </nav>
  );
}
