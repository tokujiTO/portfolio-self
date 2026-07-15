# Review checklist

Sweep a component/diff against this. Skip what doesn't apply; don't pad the
report. Order in the report is by impact, not by section here.

## Correctness
- [ ] Effects clean up (listeners removed, observers unobserved, timers cleared)
      and don't read a stale `ref.current` at cleanup time.
- [ ] `useEffect` deps are complete and honest; no derived state that should just
      be computed in render.
- [ ] List `key`s are stable and unique (not array index when items reorder).
- [ ] No stale closures over state/props inside callbacks or timeouts.
- [ ] Conditional rendering handles empty / loading / error, not just the happy
      path.

## Performance
- [ ] Only `transform` / `opacity` animate on scroll/pointer hot paths — never
      `width`/`height`/`top`/`left`/`box-shadow`.
- [ ] Expensive derivations memoized; no new object/array/function literals
      passed as props every render where it causes re-renders.
- [ ] `whileInView` reveals use `viewport={{ once: true }}` unless replay is
      intended.
- [ ] `will-change` only on genuinely hot elements, not everywhere.

## Style & format (project conventions)
- [ ] No literal hex/`rgb()` in components — uses `--color-*` tokens via
      `bg-(--color-…)` / `text-(--color-…)`.
- [ ] Any new token added to **both** `:root` and `[data-theme="light"]`.
- [ ] No hardcoded user-facing copy — routed through `useLanguage()` pt/en.
- [ ] Props typed with an interface; no `any`; component default-exported per
      convention.
- [ ] No conflicting/duplicate Tailwind utilities; arbitrary values not
      reinventing an existing token or scale.
- [ ] No dead code / commented-out blocks left behind.
- [ ] `pnpm lint` and `tsc -b` clean (run them if unsure).

## Modern & intuitive design
- [ ] One clear focal point; hierarchy via size/weight/color is deliberate.
- [ ] Spacing follows a consistent scale; alignment is tidy; negative space is
      intentional.
- [ ] Type: readable measure/line-height, restrained font+size count, related to
      the project's editorial display type.
- [ ] Text/background contrast passes WCAG AA in **both** light and dark themes.
- [ ] Meaning never carried by color alone.
- [ ] Interactive elements have hover/active/**focus**/disabled states and look
      tappable; tap targets ≥ ~44px.
- [ ] Works mobile-up; no horizontal scroll; parallax/large motion gated behind
      `useReducedMotion()`.
- [ ] Semantic HTML (`button`, `nav`, `main`, headings in order); images have
      `alt`; controls have accessible names; focus is visible.

## Report shape
1. **Must-fix** — bugs, broken UX, a11y/contrast failures, missing i18n/tokens.
2. **Should-fix** — consistency, simplification, perf that users feel.
3. **Consider (optional)** — taste, polish, nice-to-haves.
4. **Keep** — one line on what's working well.

Each item: `file:line` · what's wrong · why it matters · the fix.
