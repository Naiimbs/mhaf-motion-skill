// Usage: node stills.mjs 2.2 15 40   -> out/still_<sec>.png (half size) for quick checks
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
const exe = process.env.CHROMIUM_PATH;
const opts = {logLevel: 'error', ...(exe ? {browserExecutable: exe, chromiumOptions: {gl: 'swangle'}} : {})};
const times = process.argv.slice(2).map(Number);
fs.mkdirSync('out', {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
const comp = await selectComposition({serveUrl, id: 'Mhaf', ...opts});
for (const t of times) {
  await renderStill({composition: comp, serveUrl, output: `out/still_${t}.png`, frame: Math.round(t * 30), scale: 0.5, ...opts});
  console.log('ok', t);
}
