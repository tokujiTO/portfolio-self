import { useEffect, useState } from "react";

const WIDE_SCREEN_BREAKPOINT = 640;

/**
 * Rastreia se a viewport é maior que o breakpoint (640px) de forma reativa,
 * re-renderizando ao cruzar o limite no resize/rotação. Evita ler
 * `window.innerWidth` durante o render.
 */
export function useIsWideScreen(): boolean {
  const [isWideScreen, setIsWideScreen] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.innerWidth > WIDE_SCREEN_BREAKPOINT,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > WIDE_SCREEN_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isWideScreen;
}
