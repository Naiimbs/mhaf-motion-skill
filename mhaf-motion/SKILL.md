---
name: mhaf-motion
description: Build mhaf (مْهَفْ) branded vertical motion-graphics videos (9:16 Reels/TikTok/Shorts, Arabic/RTL) in Remotion, in the "numbered steps" explainer style - kinetic Arabic captions, step badges, folder/card/timeline UI mockups, light-to-dark wipes, stamps, synthesized music and whooshes. Use whenever the user wants a motion video, animated explainer, reel, promo or step-by-step Arabic video for mhaf, mentions "موشن", "انيميشن", "تحريك", Remotion, or wants to reuse the mhaf video template, even if they do not name the skill.
---

# mhaf motion skill

Produces a 1080x1920 (render at 720x1280 on weak machines) Arabic RTL explainer in the mhaf brand, from a ready template. The template is a complete Remotion project; you adapt copy and scenes, you do not start from scratch.

## Workflow

1. **Get the brief.** Topic, number of steps (default 6), language (Arabic RTL default), target length, any real URL/handle. Never invent a URL; put a clearly marked placeholder in `copy.ts` and tell the user.
2. **Copy the template** `assets/template/` to a working folder, then `npm i`. See `references/rendering.md` for the browser setup (Remotion's own Chrome download is often blocked; use `@sparticuz/chromium`) and the single-core render settings.
3. **Edit text first** in `src/copy.ts` (brand, handle, URLs, sample strings).
4. **Write the scenes** in `src/scenes1.tsx` / `src/scenes2.tsx` and register them in the `SCENES` timeline in `src/Root.tsx` (`[id, startSec, endSec]`). Each scene is one component using local time `t` from `useT()`; reuse the primitives in `src/ui.tsx` (Header, StepTitle, Cap, Command, Folder, Card, Cursor, Check, XBadge, Icon) rather than new styling.
5. **Check stills before rendering video:** `node stills.mjs 2.2 15 40` writes half-size PNGs to `out/`. View a contact sheet of every scene (one frame mid-scene, plus one near each wipe). Fix overlaps and wrapping, then render.
6. **Render and assemble:** `node render.mjs` (resumable chunks), then `node assemble.mjs` for music + final MP4 (see references/rendering.md). Deliver the MP4 and mention that audio is synthesized, not a voice-over.

## Hard rules

- Use only the brand tokens in `src/theme.ts` (see `references/design-system.md`). No red, no gradients beyond the shadows already defined. Yellow `#facc15` is only for "free/warning" stamps.
- Design in a 576x1024 coordinate space; `Root.tsx` scales it to 1080x1920. Keep content in the top ~70% (bottom is covered by platform UI).
- Arabic: root is `direction: rtl`. Wrap Latin handles, URLs and mono text in `direction: 'ltr'` or `@` and punctuation flip. Use Noto Kufi Arabic Black for display, IBM Plex Sans Arabic for UI, IBM Plex Mono for labels. Fonts live in `public/fonts` and load via `@font-face` + `delayRender`.
- One idea per caption, 2-4 words, one highlighted chip word at most. Captions are at top-right (y=150); the step title sits at y=245; content starts at y~350.
- Every scene needs enter and exit motion (the `Scene` wrapper handles exit blur/fade). Use spring-like `back()` for pops and `prog()` for eased reveals.
- Do not copy another creator's brand, tagline, course pitch or URL. Replace identity text with mhaf's.
