import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/languageContext";

interface CarouselItem {
  title?: string;
  description?: string;
  place?: string;
  role?: string;
  technologies?: string[];
  repository?: string;
  frontRepository?: string;
  backRepository?: string;
  name?: string;
  linkedin?: string;
}

interface CarouselProps {
  clickable?: boolean;
  data: CarouselItem[];
}

export default function Carousel({ data, clickable }: CarouselProps) {
  const { language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardHalfWidth, setCardHalfWidth] = useState(160);

  const datalist = data;

  const hasProjectFields = (item: CarouselItem) => {
    return (
      item.title ||
      item.description ||
      item.place ||
      item.technologies?.length ||
      item.repository ||
      item.frontRepository ||
      item.backRepository
    );
  };

  const openLink = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const centerFirstCard = useCallback(() => {
    if (scrollContainerRef.current && datalist.length > 0) {
      const container = scrollContainerRef.current;
      const firstCard = container.children[0] as HTMLElement;

      if (firstCard) {
        // Calcula a posição correta para centralizar horizontalmente
        const cardWidth = firstCard.offsetWidth;
        const containerWidth = container.clientWidth;
        const scrollPosition =
          firstCard.offsetLeft - (containerWidth / 2 - cardWidth / 2);

        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [datalist.length]);

  // Rola para o card imediatamente à esquerda do centro (seta "anterior").
  const scrollToPrevious = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const cards = Array.from(container.querySelectorAll(".carousel-card"));

    for (let i = cards.length - 1; i >= 0; i--) {
      const rect = cards[i].getBoundingClientRect();
      const cardCenter =
        rect.left + rect.width / 2 - container.getBoundingClientRect().left;

      if (cardCenter < containerWidth / 2 - 10) {
        cards[i].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        return;
      }
    }
  };

  // Rola para o card imediatamente à direita do centro (seta "próximo").
  const scrollToNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const cards = Array.from(container.querySelectorAll(".carousel-card"));

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const cardCenter =
        rect.left + rect.width / 2 - container.getBoundingClientRect().left;

      if (cardCenter > containerWidth / 2 + 10) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
        return;
      }
    }
  };

  const updateCardScales = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const cards = Array.from(
      scrollContainerRef.current.querySelectorAll(".carousel-card"),
    );
    const containerRect =
      scrollContainerRef.current.getBoundingClientRect();
    const positions = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return rect.left + rect.width / 2 - containerRect.left;
    });

    setCardPositions(positions);
  }, []);

  const calculateScale = (index: number) => {
    if (cardPositions.length === 0) return 1;

    // Não lê o ref durante o render; usa o state atualizado por effect/resize.
    const width = containerWidth || 1000;
    const cardCenter = cardPositions[index];
    const containerCenter = width / 2;

    const distance = Math.abs(cardCenter - containerCenter) / (width / 2);
    const scale = 1.2 - distance * 0.4;

    return Math.max(0.8, Math.min(1.2, scale));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateCardScales();

    const handleResize = () => {
      setContainerWidth(container.clientWidth);

      const firstCard = container.querySelector(
        ".carousel-card",
      ) as HTMLElement | null;

      if (firstCard) {
        setCardHalfWidth(firstCard.offsetWidth / 2);
      }

      centerFirstCard();
      updateCardScales();
    };

    // Throttle do scroll via requestAnimationFrame para evitar layout thrash.
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateCardScales();
      });
    };

    handleResize();

    const timeoutId = window.setTimeout(() => {
      centerFirstCard();
    }, 100);

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(timeoutId);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [centerFirstCard, updateCardScales]);

  return (
    <div className="relative flex h-[68vh] w-full flex-col sm:h-[72vh] lg:h-[80vh]">
      <div
        ref={scrollContainerRef}
        className="scroll-container scrollbar-hide flex h-full w-full flex-row items-center justify-start gap-6 overflow-x-scroll sm:gap-10 lg:gap-16"
        style={{
          paddingLeft: `${Math.max(16, containerWidth / 2 - cardHalfWidth)}px`,
          paddingRight: `${Math.max(16, containerWidth / 2 - cardHalfWidth)}px`,
        }}
      >
        {datalist.map((item, index) => (
          <div
            key={item.title || item.name || `card-${index}`}
            className={`carousel-card hover:shadow-xl ${clickable ? "hover:cursor-pointer" : ""} flex min-h-88 min-w-[min(82vw,20rem)] max-w-[min(82vw,20rem)]  shadow-(--color-text-secondary) flex-col rounded-xl bg-(--color-text-secondary-reversed) p-4 transition-transform duration-75 ease-in-out sm:min-h-96 sm:min-w-[20rem] sm:max-w-[20rem] sm:p-5 lg:min-w-[24rem] lg:max-w-[24rem] lg:rounded-lg`}
            style={{
              transform: `scale(${calculateScale(index)})`,
              opacity: 0.5 + (calculateScale(index) - 0.8) / 0.8,
              zIndex: Math.round(calculateScale(index) * 10),
            }}
            onClick={() => {
              if (!clickable) return;

              if (hasProjectFields(item)) {
                openLink(
                  item.repository ||
                    item.frontRepository ||
                    item.backRepository,
                );
                return;
              }

              openLink(item.linkedin);
            }}
          >
            <div className="flex h-full flex-col gap-3 text-(--color-text-secondary)">
              <h3 className="text-lg font-bold leading-tight lg:text-xl">
                {item.title || item.name}
              </h3>

              {item.description && (
                <p className="line-clamp-3 text-sm text-(--color-text-secondary)/80 lg:text-base">
                  {item.description}
                </p>
              )}

              {(item.place || item.role) && (
                <p className="text-xs italic text-(--color-text-secondary)/70 lg:text-sm">
                  {item.place
                    ? `${language === "pt" ? "Local" : "Place"}: ${item.place}`
                    : ""}
                  {item.place && item.role ? " | " : ""}
                  {item.role
                    ? `${language === "pt" ? "Função" : "Role"}: ${item.role}`
                    : ""}
                </p>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={`${item.title || item.name}-${tech}`}
                      className="rounded-full border border-(--color-border-soft) px-2 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-2 pt-3">
                {item.frontRepository && (
                  <a
                    href={item.frontRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="rounded-md bg-(--color-surface) border-2 border-(--color-text-secondary) border-dashed px-3 py-1.5 text-xs font-semibold transition hover:brightness-95"
                  >
                    {language === "pt" ? "Repo Front" : "Front Repo"}
                  </a>
                )}

                {item.backRepository && (
                  <a
                    href={item.backRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="rounded-md bg-(--color-surface) border-2 border-(--color-text-secondary) border-dashed px-3 py-1.5 text-xs font-semibold transition hover:brightness-95"
                  >
                    {language === "pt" ? "Repo Back" : "Back Repo"}
                  </a>
                )}

                {!item.frontRepository &&
                  !item.backRepository &&
                  item.repository && (
                    <a
                      href={item.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="rounded-md bg-(--color-surface) border-2 border-(--color-text-secondary) border-dashed px-3 py-1.5 text-xs font-semibold transition hover:brightness-95"
                    >
                      {language === "pt" ? "Repositório" : "Repository"}
                    </a>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 z-40 hidden w-full -translate-y-1/2 transform justify-between px-4 sm:flex sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={scrollToPrevious}
          aria-label={language === "pt" ? "Projeto anterior" : "Previous project"}
          className="z-10 rounded-full bg-(--color-surface) p-1.5 shadow-md backdrop-blur-md duration-300 hover:cursor-pointer hover:bg-(--color-surface-hover) sm:p-2"
        >
          <CaretLeftIcon size={28} />
        </button>
        <button
          type="button"
          onClick={scrollToNext}
          aria-label={language === "pt" ? "Próximo projeto" : "Next project"}
          className="z-10 rounded-full bg-(--color-surface) p-1.5 shadow-md backdrop-blur-md duration-300 hover:cursor-pointer hover:bg-(--color-surface-hover) sm:p-2"
        >
          <CaretRightIcon size={28} />
        </button>
      </div>
    </div>
  );
}
