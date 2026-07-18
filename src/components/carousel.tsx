import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface CarouselProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
  slideLabel: (index: number, total: number) => string;
}

const GAP = 22; // px between slides (matches the flex gap below)
const SPEED = 42; // px/s the ribbon drifts left while idle
const RESUME_DELAY = 1600; // ms of no interaction before auto-scroll resumes
const DRAG_THRESHOLD = 5; // px of movement before a press counts as a drag

/** Positive modulo — keeps a value inside [min, max) so the ribbon loops seamlessly. */
function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  if (range <= 0) return min;
  return min + (((value - min) % range) + range) % range;
}

/**
 * Auto-scrolling "cyclic ribbon" carousel: the slides drift left continuously and loop
 * forever (the items are rendered twice so the wrap is seamless). Auto-scroll pauses on
 * hover, focus, touch, drag, or arrow use, then resumes after `RESUME_DELAY` of calm.
 * Drag/swipe and the arrows let the user move through the projects by hand. Auto-motion is
 * disabled under `prefers-reduced-motion` (manual drag/arrows still work).
 */
export function Carousel<T>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  prevLabel,
  nextLabel,
  slideLabel,
}: CarouselProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement | null>(null);
  const secondCopyStartRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const baseX = useRef(0); // ribbon offset (may exceed range; x is the wrapped view of it)
  const setWidthRef = useRef(0); // width of one full copy (the seamless loop distance)
  const cardStepRef = useRef(320); // one slide + gap, for arrow nudges
  const arrowTargetRef = useRef<number | null>(null); // glide target while an arrow is used

  // Interaction flags — any of these pauses the auto drift.
  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const lastInteractionRef = useRef(0);

  // Drag bookkeeping (hand-rolled so it can wrap infinitely, unlike framer's bounded drag).
  const dragRef = useRef({ active: false, startX: 0, lastX: 0, moved: false, pointerId: -1 });
  const suppressClickRef = useRef(false);

  const loopItems = [...items, ...items];

  const measure = useCallback(() => {
    const first = firstSlideRef.current;
    const secondStart = secondCopyStartRef.current;
    if (first) cardStepRef.current = first.offsetWidth + GAP;
    if (first && secondStart) {
      setWidthRef.current = secondStart.offsetLeft - first.offsetLeft;
    }
  }, []);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure, items.length]);

  useAnimationFrame((_, delta) => {
    const setWidth = setWidthRef.current;
    if (!setWidth) return;
    const dt = delta / 1000;

    if (arrowTargetRef.current !== null) {
      // Ease toward the arrow's target, then hand back to the auto/idle path.
      const diff = arrowTargetRef.current - baseX.current;
      if (Math.abs(diff) < 0.5) {
        baseX.current = arrowTargetRef.current;
        arrowTargetRef.current = null;
      } else {
        baseX.current += diff * Math.min(1, dt * 10);
      }
    } else if (!draggingRef.current) {
      const idle = performance.now() - lastInteractionRef.current > RESUME_DELAY;
      if (!shouldReduceMotion && !hoveringRef.current && idle) {
        baseX.current -= SPEED * dt;
      }
      // Keep baseX bounded; ±setWidth is one whole loop, so this never shows a jump.
      if (baseX.current <= -setWidth) baseX.current += setWidth;
      else if (baseX.current > setWidth) baseX.current -= setWidth;
    }

    x.set(wrap(-setWidth, 0, baseX.current));
  });

  const nudge = useCallback((direction: 1 | -1) => {
    lastInteractionRef.current = performance.now();
    const from = arrowTargetRef.current ?? baseX.current;
    arrowTargetRef.current = from - direction * cardStepRef.current;
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nudge(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        nudge(-1);
      }
    },
    [nudge],
  );

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: event.clientX,
      lastX: event.clientX,
      moved: false,
      pointerId: event.pointerId,
    };
    suppressClickRef.current = false;
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;

    if (!drag.moved && Math.abs(event.clientX - drag.startX) > DRAG_THRESHOLD) {
      drag.moved = true;
      draggingRef.current = true;
      arrowTargetRef.current = null;
      event.currentTarget.setPointerCapture(drag.pointerId);
    }
    if (drag.moved) {
      baseX.current += event.clientX - drag.lastX;
      lastInteractionRef.current = performance.now();
    }
    drag.lastX = event.clientX;
  }, []);

  const endDrag = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    draggingRef.current = false;
    lastInteractionRef.current = performance.now();
    if (drag.moved) {
      suppressClickRef.current = true; // don't fire a card link after a swipe
      if (event.currentTarget.hasPointerCapture?.(drag.pointerId)) {
        event.currentTarget.releasePointerCapture(drag.pointerId);
      }
    }
  }, []);

  const onClickCapture = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    }
  }, []);

  return (
    <div role="group" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div
        ref={viewportRef}
        className="cursor-grab p-10 px-16 outline-none active:cursor-grabbing"
        tabIndex={0}
        style={{ touchAction: "pan-y" }}
        onKeyDown={handleKeyDown}
        onPointerEnter={() => {
          hoveringRef.current = true;
        }}
        onPointerLeave={() => {
          hoveringRef.current = false;
          lastInteractionRef.current = performance.now();
        }}
        onFocus={() => {
          hoveringRef.current = true;
        }}
        onBlur={() => {
          hoveringRef.current = false;
          lastInteractionRef.current = performance.now();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <motion.div className="flex" style={{ x, gap: `${GAP}px` }}>
          {loopItems.map((item, i) => {
            const baseIndex = i % items.length;
            const isClone = i >= items.length;
            return (
              <div
                key={`${getKey(item, baseIndex)}-${i}`}
                ref={(el) => {
                  if (i === 0) firstSlideRef.current = el;
                  if (i === items.length) secondCopyStartRef.current = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={slideLabel(baseIndex + 1, items.length)}
                aria-hidden={isClone || undefined}
                className="w-full flex-none sm:w-[70%] lg:w-[46%]"
              >
                {renderItem(item, baseIndex)}
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => nudge(-1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300"
          style={{ borderColor: "var(--chip)", color: "var(--fg)" }}
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => nudge(1)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300"
          style={{ borderColor: "var(--chip)", color: "var(--fg)" }}
        >
          <CaretRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
