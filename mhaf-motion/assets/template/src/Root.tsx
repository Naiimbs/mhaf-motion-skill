import React from 'react';
import {Composition, Sequence, staticFile, useCurrentFrame, delayRender, continueRender} from 'remotion';
import {C, W, H, FPS} from './theme';
import {Grain, clamp01, prog, ease} from './ui';
import {Hook, Ad, Roadmap, Step1, Step2, Step3, Pivot} from './scenes1';
import {Step4, Step5, Step6, Recap, Cta, End} from './scenes2';

const faces: [string, string, number][] = [
  ['KufiAr', 'kufi900.woff2', 900], ['KufiLat', 'kufilat900.woff2', 900],
  ['PlexAr', 'plexar700.woff2', 700], ['PlexLat', 'plexlat700.woff2', 700], ['Mono', 'mono400.woff2', 400],
];
const css = faces.map(([f, file, w]) => `@font-face{font-family:'${f}';src:url('${staticFile('fonts/' + file)}') format('woff2');font-weight:${w};font-style:normal;}`).join('\n') +
  `\n@font-face{font-family:'PlexAr';src:url('${staticFile('fonts/plexar500.woff2')}') format('woff2');font-weight:500;}@font-face{font-family:'PlexLat';src:url('${staticFile('fonts/plexlat500.woff2')}') format('woff2');font-weight:500;}`;

const useFonts = () => {
  const [h] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    Promise.all(['900 20px KufiAr', '900 20px KufiLat', '700 20px PlexAr', '700 20px PlexLat', '400 20px Mono', '500 20px PlexAr'].map((f) => (document as any).fonts.load(f, 'أب6A')))
      .then(() => continueRender(h)).catch(() => continueRender(h));
  }, [h]);
};

// scene timeline in seconds
export const SCENES: [string, number, number][] = [
  ['hook', 0, 3], ['ad', 3, 6], ['road', 6, 10.5], ['s1', 10.5, 16.5], ['s2', 16.5, 24.2], ['s3', 24.2, 32.4],
  ['pivot', 32.4, 37.5], ['s4', 37.5, 47.2], ['s5', 47.2, 53.7], ['s6', 53.7, 62.7], ['recap', 62.7, 66.2], ['cta', 66.2, 70.4], ['end', 70.4, 72.2],
];
const comps: Record<string, React.FC> = {hook: Hook, ad: Ad, road: Roadmap, s1: Step1, s2: Step2, s3: Step3, pivot: Pivot, s4: Step4, s5: Step5, s6: Step6, recap: Recap, cta: Cta, end: End};

const Video: React.FC = () => {
  useFonts();
  const f = useCurrentFrame() / FPS;
  // dark panel wipes in 37.3-37.9 (left->right), out 53.5-54.1 (left->right)
  const wi = ease(clamp01((f - 37.3) / 0.6));
  const wo = ease(clamp01((f - 53.5) / 0.6));
  const dark = f >= 37.3 && f < 54.2;
  const leftEdge = f < 45 ? wi : wo; // front of wipe
  const clip = f < 45 ? `inset(0 ${(1 - wi) * 100}% 0 0)` : `inset(0 0 0 ${wo * 100}%)`;
  const showEdge = dark && ((f >= 37.3 && f <= 37.9) || (f >= 53.5 && f <= 54.1));
  const edgeX = f < 45 ? wi * W : wo * W;
  return (
    <div style={{width: W, height: H, position: 'relative', overflow: 'hidden', direction: 'rtl', background: C.primaryFaint}}>
      <style>{css}</style>
      <div style={{position: 'absolute', inset: 0, background: C.primaryFaint}} />
      <div style={{position: 'absolute', inset: 0, background: C.darkBg, clipPath: dark ? clip : 'inset(0 100% 0 0)'}} />
      <Grain />
      {SCENES.map(([id, a, b]) => {
        const Comp = comps[id];
        return (
          <Sequence key={id} from={Math.round(a * FPS)} durationInFrames={Math.round((b - a) * FPS)} layout="none">
            <Comp />
          </Sequence>
        );
      })}
      {showEdge && <div style={{position: 'absolute', top: 0, bottom: 0, left: edgeX - 4, width: 8, background: C.primary, boxShadow: '0 0 30px rgba(37,99,235,.7)'}} />}
    </div>
  );
};

const Scaled: React.FC = () => (
  <div style={{width: 1080, height: 1920, overflow: 'hidden', position: 'relative'}}>
    <div style={{width: W, height: H, transform: `scale(${1080 / W})`, transformOrigin: 'top left'}}><Video /></div>
  </div>
);

export const Root: React.FC = () => (
  <Composition id="Mhaf" component={Scaled} durationInFrames={Math.round(72.2 * FPS)} fps={FPS} width={1080} height={1920} />
);
