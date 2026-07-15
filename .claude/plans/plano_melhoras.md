# Plano de Melhorias e Upgrades — Portfólio Tiago Massuda

## Contexto

Revisão completa do portfólio (React 19 + Vite + Tailwind v4 + `motion`, com
tokens em CSS-vars, i18n pt/en e temas claro/escuro). O objetivo é elevar a
qualidade de código, consistência de estilo e o polimento de design/UX sem
reescrever a base — que já é sólida (parallax bem feito, i18n e temas
estruturados, respeito parcial a `prefers-reduced-motion`).

A revisão passou por três lentes: **correção**, **estilo/formato** e **design
moderno e intuitivo**. Cada item abaixo traz arquivo, motivo (impacto no usuário
ou na manutenção) e a correção concreta. Está priorizado em P0 → P2 + refactors.

**O que já está bom (preservar):** máquina de parallax do hero (`App.tsx`),
separação `languageContext`/`languageProvider`, tokens de tema, `aria-label` nos
botões da navbar, `viewport once` implícito via IntersectionObserver.

---

## P0 — Quebras reais (must-fix)

1. **Favicon quebrado.** `index.html:5` aponta para `/favicon.png`, mas `public/`
   só contém `favicon.svg` e `icons.svg`. O ícone não carrega.
   → Apontar o `<link rel="icon">` para `/favicon.svg` (ou mover um `.png` real
   para `public/`).

2. **Imagem de Open Graph ausente.** `index.html` referencia
   `https://tiagomassuda.com/og-image.png` em `og:image`/`twitter:image`, mas o
   arquivo não existe. Preview em redes sociais/WhatsApp fica quebrado.
   → Gerar `public/og-image.png` (1200×630) e servir o caminho correto.

3. **Hex inválido no tema claro.** `index.css:28` →
   `--color-text-tertiary: #7575755;` (7 dígitos). Valor inválido; o token cai
   para herança, afetando footer e gradientes no tema claro.
   → Corrigir para `#757575`.

4. **`pnpm lint` falha (exit 1) — gate de CI/build.** `themeContext.tsx:73`
   dispara `react-refresh/only-export-components` porque o arquivo exporta o
   `ThemeProvider` (componente) **e** o hook `useTheme`/constantes juntos.
   → Espelhar o padrão já usado em idioma: dividir em `themeContext.ts`
   (contexto + `useTheme`) e `themeProvider.tsx` (provider). Atualizar o import
   em `main.tsx`.

5. **`window.innerWidth` lido durante o render.** `bubble.tsx` faz
   `if (window.innerWidth < 640) return (…)` e `App.tsx:160` decide
   `backgroundImage` por `window.innerWidth > 640`. Como não há re-render no
   resize/rotação, o layout não reflui ao cruzar 640px e há risco de mismatch de
   hidratação.
   → Usar o state `isWideScreen` (já existe em `App.tsx`) para o background; criar
   um hook `useIsWideScreen()` e consumi-lo no `Bubble`.

---

## P1 — Consistência de código e estilo

6. **Cores cruas fora do sistema de tokens** (não adaptam ao tema claro):
   - `footer.tsx:34,42,48` → `hover:text-white`; `footer.tsx:55,58,61` →
     `border-gray-700`.
   - `carousel.tsx` → `hover:bg-gray-400/30`.
   - `textBubble.tsx:11-12` → `bg-white/50`, `text-[#333333]`.
   → Trocar por tokens (`hover:text-(--color-text-secondary)`,
   `border-(--color-border-soft)`, etc.). Se faltar token, adicioná-lo em
   **ambos** os blocos (`:root` e `[data-theme="light"]`) do `index.css`.

7. **Código morto.** `textBubble.tsx` não é importado em lugar nenhum (dois
   componentes `default`-exportados se chamam `Bubble`). Há também bloco
   comentado em `App.tsx:265-268`.
   → Remover `textBubble.tsx` e o bloco comentado.

8. **Markup duplicado.**
   - Botões de idioma/tema são idênticos em `navbar.tsx` e no ramo mobile de
     `bubble.tsx`.
   - Os itens de menu ("Sobre mim/Projetos/Tecnologias/Contato") estão
     duplicados entre os ramos mobile e desktop do `Bubble`.
   → Extrair `<ThemeLanguageControls />` e um array `NAV_ITEMS` renderizado uma
   vez, reduzindo ~120 linhas e o risco de divergência.

9. **Warnings de lint restantes.** `animatedElement.tsx:61` (lê `ref.current` no
   cleanup) e `carousel.tsx:202` (dep faltante `centerFirstCard`).
   → Copiar `ref.current` para variável dentro do effect; estabilizar
   `centerFirstCard`/`updateCardScales` com `useCallback` e incluí-las nas deps.

---

## P2 — Design moderno, intuitivo e acessibilidade

10. **Menu e toggles do `Bubble` usam `<span onClick>`** (`bubble.tsx`) — não são
    focáveis nem acionáveis por teclado, e não anunciam papel para leitores de
    tela. → Trocar por `<button>` com `aria-label`; a navbar já faz certo.

11. **Sem foco visível.** Botões têm `hover:scale` mas nenhum estado
    `focus-visible`. → Adicionar anel de foco tokenizado global
    (`focus-visible:ring-2 focus-visible:ring-(--color-text-secondary)`).

12. **Hierarquia de headings.** Há vários `<h1>` (dois em `aboutMe.tsx`; um por
    seção em `App.tsx`). → Manter um único `<h1>` (nome no hero) e rebaixar os
    demais para `<h2>`. Ganho direto de SEO e navegação por leitor de tela.

13. **Landmarks semânticos.** O conteúdo vive em `<div>`s. → Envolver em
    `<main>`, transformar seções em `<section aria-labelledby=…>` e adicionar um
    skip-link no topo.

14. **`AnimatedElement` ignora `prefers-reduced-motion`.** Sempre translada 100px.
    → Quando reduced-motion, aplicar só o fade (sem transform), coerente com o
    resto do site.

15. **Carousel — UX e performance:**
    - Setas escondidas no mobile (`hidden sm:flex`) e sem `aria-label`; os nomes
      `handleNext`/`handlePrevious` estão invertidos em relação à direção visual.
      → Rotular, corrigir nomes e considerar indicadores (dots) no mobile.
    - `updateCardScales` roda `getBoundingClientRect` a cada evento de scroll →
      thrash de layout e re-render por frame. → Throttlar com
      `requestAnimationFrame`.
    - `key={index}` na lista → usar id estável (`title`/`name`).

16. **Contraste (WCAG AA).** Revisar `--color-text-tertiary` sobre
    `--color-footer` e texto sobre `--color-surface` (branco a 0.2) nos dois
    temas. → Ajustar tokens até passar AA.

17. **Refino visual (opcional, com a skill `artful-frontend`).** Unificar
    raios/sombras via tokens; reduzir a densidade de `italic` para reforçar
    hierarquia; padronizar microinterações de hover/focus.

---

## Refactors estruturais (higiene — opcional)

18. **`useParallax()`** em `src/hooks/` — `App.tsx` e `aboutMe.tsx` repetem a
    mesma máquina pointer+scroll+spring+combine (~80 linhas duplicadas).
    Centraliza o "feel" e facilita ajustes.
19. **`useIsWideScreen()`** — o mesmo effect de resize aparece em `App.tsx` e
    `aboutMe.tsx` (e resolve o item P0-5).

---

## Sequência sugerida de execução

1. **P0** inteiro (favicon, og-image, hex, split do themeContext, innerWidth) —
   destrava o `lint`/build e corrige quebras visíveis.
2. **P1** (tokens, código morto, deduplicação, warnings) — deixa a base limpa.
3. **P2** (a11y, headings, landmarks, carousel, contraste) — eleva UX/design.
4. **Refactors 18-19** por último, se houver apetite.

Cada tier pode virar um commit/PR próprio.

## Verificação

- `pnpm lint` → **0 erros** (hoje falha com 1 erro + 2 warnings).
- `pnpm build` (`tsc -b && vite build`) sem erros de tipo.
- `pnpm dev` e checagem manual:
  - favicon carrega; preview OG válido (`og-image.png` acessível).
  - toggles de tema e idioma funcionam nos dois modos; nada usa cor crua no tema
    claro (inspecionar footer/carousel).
  - redimensionar cruzando 640px reflui o layout (background e Bubble).
  - navegação por Tab alcança menu do Bubble e toggles, com **foco visível**.
  - DevTools → emular `prefers-reduced-motion`: transforms grandes desativam,
    fades permanecem.
  - Lighthouse: conferir ganhos em Acessibilidade e SEO (headings/landmarks).
