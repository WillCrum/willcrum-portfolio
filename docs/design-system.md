# Crum Portfolio — Design System (implementation reference)

This is the **operational** design-system doc for the codebase. The source of
truth for color values, radii, spacing, and shadows is
[`app/globals.css`](../app/globals.css); this file documents the tokens, the
recovered type/spacing/shadow scales (which were missing from the original
Figma export), and how to consume them via Tailwind utilities.

Original Figma-extracted doc: `crum-portfolio-design-system-v1.0-DESIGN.md`
(kept as the design-side reference). Figma:
https://www.figma.com/design/Q9nwOgJSfeyTz6Qbdl10nA/Portfolio-Website

## Themes

Two themes ship in V1, switched by `data-theme` on `<html>`:

- **Forest** (default) — dark, green-tinted. `color-scheme: dark`.
- **Neon** — bright yellow-green day theme. `color-scheme: light`.

A third **Dark-Grayscale** theme exists in Figma; the engine is structured to
add it (and any future theme) by appending one `[data-theme="…"]` block in
`globals.css`, but it is not exposed in V1.

**Rule:** components reference **semantic** tokens only (`bg-page`,
`text-headline`, `bg-button`, …). Never hardcode a hex or use a raw palette
utility (`bg-neon-600`) in product UI.

## Semantic tokens → Tailwind utilities

| Purpose | Token / utility suffix | Forest | Neon |
| --- | --- | --- | --- |
| Page background | `page` | neon-900 | neon-100 |
| Card background | `card` | neon-850 | neon-200 |
| Headline text | `headline` | grayscale-50 | neon-950 |
| Subhead text | `subhead` | grayscale-100 | neon-700 |
| Body text | `body` | grayscale-100 | neon-900 |
| Caption text | `caption` | grayscale-400 | neon-750 |
| Focus ring | `focus` | neon-600 | neon-500 |
| Divider / spacer | `spacer` | neon-750 | neon-500 |
| Button bg | `button` | neon-700 | neon-300 |
| Button bg hover | `button-hover` | neon-750 | neon-500 |
| Button bg active | `button-clicked` | neon-900 | neon-400 |
| Button bg disabled | `button-disabled` | neon-800 | neon-250 |
| Button label | `button-label` | neon-300 | neon-750 |
| Button label hover | `button-label-hover` | neon-100 | neon-950 |
| Button label disabled | `button-label-disabled` | neon-600 | neon-500 |
| Button label secondary | `button-label-secondary` | neon-600 | neon-600 |
| Tag bg (on) | `tag` | neon-600 | neon-400 |
| Tag bg (off) | `tag-off` | neon-800 | neon-250 |
| Tag bg hover | `tag-hover` | neon-400 | neon-400 |
| Tag bg disabled | `tag-disabled` | neon-800 | neon-250 |

Usage examples: `bg-page`, `text-headline`, `bg-card shadow-xs`,
`bg-button text-button-label hover:bg-button-hover`, `bg-tag text-headline`,
`border-spacer`, `outline-focus`.

## Typography — font `Inter` (self-hosted via `next/font`)

Weights loaded: 300 / 400 / 500 / 600, plus italic. *(Recovered from Figma —
absent from the original doc.)*

| Style | Size | Weight | Line-height | Tracking | Tailwind |
| --- | --- | --- | --- | --- | --- |
| Headline / Bold | 32px | 600 | 1.05 | −1% (−0.32px) | `text-[32px] font-semibold leading-[1.05] tracking-[-0.32px]` |
| Subhead / Bold | 24px | 600 | 1.2 | 0 | `text-2xl font-semibold` |
| Body / Regular | 18px | 400 | 1.4 | 0 | `text-lg leading-[1.4]` |
| Body / Light | 18px | 300 | 1.4 | 0 | `text-lg font-light leading-[1.4]` |
| Button / Med | 16px | 500 | 1.2 | +2% (0.32px) | `text-base font-medium tracking-[0.32px]` |
| Button / Small | 13px | 500 | 1.2 | +2% (0.26px) | `text-[13px] font-medium tracking-[0.26px]` |

## Spacing scale (`Scale/*`) — maps to default Tailwind spacing

*(Recovered from Figma.)* 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 64 →
`*-0.5, *-1, *-1.5, *-2, *-3, *-4, *-5, *-6, *-8, *-10, *-16`.
Content column max width: **1164px** (`--container-content`).

## Radius

xs 2 / sm 4 / md 8 / lg 12 / xl 16 / full 1000 → `rounded-xs|sm|md|lg|xl|full`.
Cards use `rounded-xl` (16); buttons & tags use `rounded-md` (8).

## Shadows *(recovered from Figma)*

- `shadow-xs` → `0 2px 4px rgb(0 0 0 / .2)` (project cards)
- `shadow-elevated` → `0 2px 4px rgb(0 0 0 / .05), 0 24px 48px -8px rgb(0 0 0 / .2)`

## Component interaction states (from the Library)

- **Button**: active (primary) → hover → clicked → disabled. Bg + label tokens above.
- **Tag**: active-on / inactive-off / hover / disabled. Label uses `text-headline`.
- **NavToggle**: active vs. inactive (+ hover).
- **Focus**: 2px `outline-focus`, 2px offset, on `:focus-visible` (set globally in base layer).

Animation/motion is intentionally undefined in V1 (transitions only); a motion
system is a later collaboration.
