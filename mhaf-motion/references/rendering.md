# Rendering notes

## Setup
```
cp -r assets/template ./video && cd video && npm i
```
Scripts (all in the template root):
- `node stills.mjs 2.2 15 40` : half-size PNG checks in `out/`
- `node render.mjs` : resumable 240-frame chunks in `out/chunks` (1080x1920 by default)
- `node assemble.mjs` : concat + `audio.py` music + loudnorm -> `out/final.mp4` (needs ffmpeg, python3, numpy)

Env vars: `CHROMIUM_PATH` (browser binary), `SCALE` (0.6667 = 720p), `CONC` (parallel tabs, default half the cores).

## Browser
Remotion normally downloads Chrome from remotion.media. If that is blocked (`getaddrinfo ... remotion.media`), get a Chromium from npm and point to it:
```
node -e "import('@sparticuz/chromium').then(async m=>console.log(await m.default.executablePath()))"   # -> /tmp/chromium
CHROMIUM_PATH=/tmp/chromium node render.mjs
```

## Speed
- Small sandboxes have 1 core: use `CONC=1 SCALE=0.6667` (about 10 minutes for 72 s). 1080p is about 2.25x slower.
- Run long renders detached: `setsid nohup node render.mjs > out/render.log 2>&1 < /dev/null &` and poll the log. Finished chunks are kept, so re-running resumes.

## Audio
Edit the `cuts` and caption-tick lists in `audio.py` to match the `SCENES` timeline in `src/Root.tsx`, then `node assemble.mjs`. The music is synthesized; a voice-over must be supplied by the user.

## Common bugs
- Arabic text wraps when letter-spacing is added: use `whiteSpace: 'nowrap'` and a smaller font.
- `@handle` shows as `handle@`: set `direction: 'ltr'` on that element.
- Blank first frames: fonts not loaded; keep the `useFonts` delayRender in `Root.tsx`.
