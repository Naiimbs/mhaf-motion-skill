// Usage: node render.mjs            -> 1080x1920 final video in out/chunks, resumable
// Env: CHROMIUM_PATH=/path/to/chrome (only if Remotion cannot download its own)
//      SCALE=0.6667 (720p, faster)   CONC=2 (parallel tabs, default = half the CPU cores)
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import os from 'os';
const exe = process.env.CHROMIUM_PATH;
const opts = {logLevel: 'warn', ...(exe ? {browserExecutable: exe, chromiumOptions: {gl: 'swangle'}} : {})};
const scale = Number(process.env.SCALE || 1);
const conc = Number(process.env.CONC || Math.max(1, Math.floor(os.cpus().length / 2)));
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
const comp = await selectComposition({serveUrl, id: 'Mhaf', ...opts});
const total = comp.durationInFrames, CH = 240;
fs.mkdirSync('out/chunks', {recursive: true});
for (let s = 0, i = 0; s < total; s += CH, i++) {
  const e = Math.min(total - 1, s + CH - 1);
  const f = `out/chunks/c${String(i).padStart(2, '0')}.mp4`;
  if (fs.existsSync(f)) continue;
  await renderMedia({composition: comp, serveUrl, codec: 'h264', crf: 17, pixelFormat: 'yuv420p', outputLocation: f + '.tmp.mp4', frameRange: [s, e], concurrency: conc, scale, ...opts});
  fs.renameSync(f + '.tmp.mp4', f);
  console.log('chunk', i, 'done');
}
console.log('DONE - now run: node assemble.mjs');
