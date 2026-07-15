---
name: design-review
description: >-
  Review front-end code for quality, style, and format with an eye for modern,
  intuitive design. Use when asked to review, critique, audit, or suggest
  improvements to a component, section, or diff; to check code style, formatting,
  naming, and consistency; or to evaluate UX/visual design — hierarchy, spacing,
  color, typography, responsiveness, accessibility, affordances, and whether the
  interface feels modern and intuitive. Triggers on "review", "revisar",
  "critique", "audit", "improve", "melhorar", "code smell", "refactor",
  "consistency", "style", "format", "cleanup", "is this good", "feedback",
  "design review", "UX review". Read this BEFORE reporting findings.
---

# Design Review

Review front-end the way a thoughtful senior would: catch what's broken, tighten
what's sloppy, and push the design toward modern and intuitive. This project is
React 19 + Vite + Tailwind v4 + `motion` (`motion/react`), with CSS-variable
design tokens, pt/en i18n, and light/dark theming. Judge against *its* norms,
not a generic style guide.

## Scope the review first

- Default to the **working diff** (`git diff`, plus staged) unless the user names
  files or a whole area. Reviewing everything unprompted buries the signal.
- Read the surrounding code before judging — match findings to how this codebase
  already does things (tokens, `useLanguage()`, the hero's motion primitives).
- **Verify before you flag.** A claim like "this breaks light mode" or "this
  isn't keyboard-reachable" must be something you actually traced, not a guess.
  Uncertain? Say "worth checking" and explain — don't assert.

## Three lenses

Run every review through these, in order. Lead with what matters most.

### 1. Correctness & improvement
- Real bugs first: broken state, stale closures, missing deps, effects that
  don't clean up (e.g. `IntersectionObserver`/listeners not unobserved with a
  captured ref), race conditions, key collisions in lists.
- Reuse & simplification: duplicated logic that a component/hook/util would
  fold; over-nesting; props that could be derived; dead code and commented-out
  blocks left behind.
- Efficiency that a user feels: layout thrash from animating `width`/`top`
  instead of `transform`; work in render that belongs in `useMemo`/`useCallback`;
  re-renders from unstable object/array literals; missing `viewport once`
  causing reveals to replay.
- React 19 / TS hygiene: precise prop interfaces (no `any`), correct
  `useState` initializers, no unnecessary `useEffect` for derived state.

### 2. Style & format consistency
- **Tokens, never raw color.** Flag literal hex/`rgb()` in components — colors
  belong in `src/index.css` as `--color-*` and are consumed via
  `bg-(--color-…)` / `text-(--color-…)`. Any new token must exist in **both**
  `:root` and `[data-theme="light"]`.
- **i18n.** Hardcoded pt-or-en user-facing strings are a defect — must go
  through the `language === "pt" ? … : …` pattern via `useLanguage()`.
- Tailwind class order and grouping consistent with neighbors; collapse
  arbitrary values that a token or scale already covers; no conflicting
  utilities (`p-4 p-6`).
- Naming, file layout, and import style match the project (default-exported
  components, `camelCase` files, typed props interface above the component).
- Formatting matches Prettier/ESLint output — call out only what the tools
  won't auto-fix; don't nitpick what `pnpm lint --fix` handles.

### 3. Modern & intuitive design
This is the differentiator — evaluate the *interface*, not just the code:

- **Visual hierarchy.** One clear focal point per view; size/weight/color guide
  the eye in the intended order. Flag "everything is bold" and "nothing stands
  out" alike.
- **Spacing rhythm.** Consistent scale, intentional negative space, aligned
  edges. Cramped or arbitrary gaps read as unfinished.
- **Typography.** Readable measure, sensible line-height, restrained font/size
  count. The project's editorial `clamp()` italic display type is the
  signature — new type should feel related.
- **Color & contrast.** Real WCAG contrast (text vs background) in **both**
  themes; color not the sole carrier of meaning; restrained accent use.
- **Affordances & feedback.** Interactive things look interactive; hover/active/
  focus/disabled/loading/empty/error states exist; motion communicates change
  (per [[artful-frontend]]) rather than decorating.
- **Responsiveness.** Works from mobile up, not desktop shrunk down; tap targets
  ≥ ~44px; no horizontal scroll from stray transforms.
- **Accessibility as design, not afterthought.** Semantic elements (`button` vs
  `div`), visible focus, `alt`/labels, `prefers-reduced-motion` respected.
- **Modern, not trendy.** Push toward clarity and restraint — remove clutter,
  strengthen contrast, add breathing room. Reject effects that don't make it
  clearer or more felt.

## Reporting

- **Rank by impact.** Bugs and broken UX before consistency nits before taste.
- **Be specific and actionable.** Cite `file:line`, say *why* it matters (user
  impact or maintenance cost), and show the concrete fix or a short snippet.
- **Separate must-fix from suggestion.** Mark taste-level items as optional so
  they don't drown the real problems.
- **Acknowledge what's good** briefly — it calibrates the rest and says what to
  preserve.
- Keep it honest: if the code is solid, say so and offer only genuine lifts.
  Don't invent findings to fill a list.

For a fast, runnable checklist to sweep against, read
`references/review-checklist.md`. This skill is for judgment and design
critique; for a broad automated bug sweep of a diff, the built-in `/code-review`
is complementary — use both when the stakes are high.
