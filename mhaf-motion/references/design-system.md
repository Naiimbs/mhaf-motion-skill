# mhaf design system (from the brand CSS variables)

| token | value | use |
|---|---|---|
| primary | `#2563eb` | step badges, highlight chips, active dash, progress, CTA |
| primaryHover | `#1d4ed8` | pressed button |
| primarySoft / Faint | `#eff6ff` / `#f0f7ff` | selected pill / scene background (light) |
| navy | `#123b8f` | hard drop-shadow under stamps/tiles, borders on blue |
| yellow | `#facc15` | "free" stamp, "flipped/wrong" tag, accent mark only |
| text | `#0f172a` | text, black tiles, buttons, dark-scene background |
| muted | `#64748b` | secondary text |
| border / card | `#e2e8f0` / `#f8fafc` | card outline / card fill |
| darkCard | `rgba(255,255,255,.07)` | cards on dark scenes |

Fonts: display `Noto Kufi Arabic 900` (+ latin 900), UI `IBM Plex Sans Arabic 500/700`, labels `IBM Plex Mono 400`.

## Layout grid (576x1024)
- Header: 6 dashes at x=51..219, y=131 (right-most = step 1; done = dark, current = primary, upcoming = gray); right label at x=524.
- Caption: right edge x=524, top y=150, 44px display.
- Step title: centered, y=245, 52px with 50px badge; mono subtitle `STEP 0N / 06 · WORD` 62px below.
- Content zone: y=350..750. Left edge tag `@mhaf` rotated at x=26.

## Scene catalog in the template
hook, ad card with cursor, roadmap (dots/phone/folder), app window + download card, folder tree, tool cards with progress, bracket + price tag + tiles, EN/AR rows with flipped and broken Arabic demo, folder with fanned phone cards, phone capture + folder, timeline (clips, captions, FX diamonds, playhead, play button), recap grid, profile card with circled link and stamp, end card with wordmark.

## Transitions
Light-to-dark wipe left-to-right with a 8px primary edge (`Root.tsx`, times 37.3 and 53.5 in the sample). Change those two constants when you re-time.
