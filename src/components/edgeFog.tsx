/**
 * Soft "fog" pinned to the true left/right edges of the browser window, scoped to whichever
 * section renders it (SunsetBand, Projects) — not the whole page. Anything that bleeds past
 * that section's own box (e.g. the projects carousel's peeking cards, which have no local
 * overflow-hidden of their own) fades softly instead of hitting a hard clip. The actual
 * containment is `overflow-x: clip` on html/body (index.css); this is only the visual
 * treatment at that boundary.
 *
 * Render inside a `position: relative` section. The outer wrapper uses the "full-bleed
 * breakout" trick (`left: 50%` + `margin-left: -50vw`) so it spans the true viewport width
 * and sticks to that section's own height, even when the section itself is narrower and
 * centered (e.g. inside `content-col`).
 *
 * Two layers per side: a plain color fade to `--bg` (works everywhere, zero dependency on
 * compositing support) plus a masked backdrop-filter blur on top for real blur wherever the
 * browser renders it. Fade and blur are kept on separate elements — some browsers silently
 * drop backdrop-filter when a mask-image sits on the same element as it.
 */
function EdgeFogSide({ side }: { side: "left" | "right" }) {
  const towards = side === "left" ? "right" : "left";
  const positionClass = side === "left" ? "left-0" : "right-0";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-y-0 z-10 w-16 overflow-hidden sm:w-24 ${positionClass}`}
    >
      <div
        className="h-full w-full"
        style={{ background: `linear-gradient(to ${towards}, var(--bg), transparent)` }}
      />
      <div
        className="absolute inset-0"
        style={{
          maskImage: `linear-gradient(to ${towards}, black, transparent)`,
          WebkitMaskImage: `linear-gradient(to ${towards}, black, transparent)`,
        }}
      >
        <div
          className="h-full w-full"
          style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
        />
      </div>
    </div>
  );
}

export function EdgeFog() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 z-40 w-screen"
      style={{ marginLeft: "-50vw" }}
    >
      <EdgeFogSide side="left" />
      <EdgeFogSide side="right" />
    </div>
  );
}
