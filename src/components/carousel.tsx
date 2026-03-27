import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import AnimatedElement from "./animatedElement";

interface CarouselItem {
  title?: string;
  description?: string;
  image?: string;
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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

  const centerFirstCard = () => {
    if (scrollContainerRef.current && datalist.length > 0) {
      const container = scrollContainerRef.current;
      const firstCard = container.children[0] as HTMLElement;

      if (firstCard) {
        // Calcula a posição correta para centralizar horizontalmente
        const cardWidth = firstCard.offsetWidth;
        const containerWidth = container.clientWidth;
        const scrollPosition =
          firstCard.offsetLeft - (containerWidth / 2 - cardWidth / 2);

        // Ajusta apenas o scroll horizontal
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;

      // Encontra o próximo card que está à direita do centro
      const cards = Array.from(container.querySelectorAll(".carousel-card"));
      let nextCard = null;

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const cardCenter =
          rect.left + rect.width / 2 - container.getBoundingClientRect().left;

        if (cardCenter > containerWidth / 2 + 10) {
          // +10 para evitar flutuações
          nextCard = card;
          break;
        }
      }

      if (nextCard) {
        nextCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;

      // Encontra o próximo card que está à esquerda do centro
      const cards = Array.from(container.querySelectorAll(".carousel-card"));
      let prevCard = null;

      // Percorre do final para o início
      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();
        const cardCenter =
          rect.left + rect.width / 2 - container.getBoundingClientRect().left;

        if (cardCenter < containerWidth / 2 - 10) {
          // -10 para evitar flutuações
          prevCard = card;
          break;
        }
      }

      if (prevCard) {
        prevCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const updateCardScales = () => {
    if (!scrollContainerRef.current) return;

    const cards = Array.from(
      scrollContainerRef.current.querySelectorAll(".carousel-card"),
    );
    const positions = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      const containerRect = scrollContainerRef.current!.getBoundingClientRect();
      return rect.left + rect.width / 2 - containerRect.left;
    });

    setCardPositions(positions);
  };

  const calculateScale = (index: number) => {
    if (cardPositions.length === 0) return 1;

    // Do NOT read ref during render. Use state updated by effect/resize.
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

    const handleScroll = () => {
      updateCardScales();
    };

    handleResize();

    const timeoutId = window.setTimeout(() => {
      centerFirstCard();
    }, 100);

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [datalist.length]);

  return (
    <AnimatedElement
      direction="bottom"
      className="relative flex h-[60vh] w-full flex-col"
    >
      <div
        ref={scrollContainerRef}
        className="scroll-container scrollbar-hide flex h-full w-full flex-row items-center justify-start gap-16 overflow-x-scroll"
        style={{
          paddingLeft: `${Math.max(16, containerWidth / 2 - cardHalfWidth)}px`,
          paddingRight: `${Math.max(16, containerWidth / 2 - cardHalfWidth)}px`,
        }}
      >
        {datalist.map((item, index) => (
          <div
            key={index}
            className={`carousel-card hover:shadow-xl ${clickable ? "hover:cursor-pointer" : ""} flex min-h-96 max-w-[20rem] min-w-[20rem] flex-col rounded-xl bg-(--color-card) p-5 shadow-lg transition-transform duration-75 ease-in-out lg:max-w-[24rem] lg:min-w-[24rem] lg:rounded-lg`}
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
            <div className="flex h-full flex-col gap-3 text-(--color-text-primary)">
              <h2 className="text-lg font-bold leading-tight lg:text-xl">
                {item.title || item.name}
              </h2>

              {item.description && (
                <p className="line-clamp-3 text-sm text-(--color-text-primary)/80 lg:text-base">
                  {item.description}
                </p>
              )}

              {(item.place || item.role) && (
                <p className="text-xs italic text-(--color-text-primary)/70 lg:text-sm">
                  {item.place ? `Place: ${item.place}` : ""}
                  {item.place && item.role ? " | " : ""}
                  {item.role ? `Role: ${item.role}` : ""}
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
                    className="rounded-md bg-(--color-surface) px-3 py-1.5 text-xs font-semibold transition hover:brightness-95"
                  >
                    Front Repo
                  </a>
                )}

                {item.backRepository && (
                  <a
                    href={item.backRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="rounded-md bg-(--color-surface) px-3 py-1.5 text-xs font-semibold transition hover:brightness-95"
                  >
                    Back Repo
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
                      className="rounded-md bg-(--color-surface) px-3 py-1.5 text-xs font-semibold transition hover:brightness-95"
                    >
                      Repository
                    </a>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 z-40 flex w-full -translate-y-1/2 transform justify-between px-4">
        <button
          onClick={handleNext}
          className="z-10 rounded-full bg-gray-300/30 p-2 shadow-md backdrop-blur-md duration-300 hover:cursor-pointer hover:bg-gray-400/30"
        >
          <CaretLeft size={32} />
        </button>
        <button
          onClick={handlePrevious}
          className="z-10 rounded-full bg-gray-300/30 p-2 shadow-md backdrop-blur-md duration-300 hover:cursor-pointer hover:bg-gray-400/30"
        >
          <CaretRight size={32} />
        </button>
      </div>
    </AnimatedElement>
  );
}
