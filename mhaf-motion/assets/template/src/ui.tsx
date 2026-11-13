import React from 'react';
import {useCurrentFrame, Easing} from 'remotion';
import {C, F, FPS, W, H} from './theme';

export const useT = () => useCurrentFrame() / FPS;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const prog = (t: number, a: number, d = 0.5) => ease(clamp01((t - a) / d));
export const lin = (t: number, a: number, d = 0.5) => clamp01((t - a) / d);
export const back = (t: number, a: number, d = 0.55) => Easing.out(Easing.back(1.8))(clamp01((t - a) / d));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

/** visible window [a,b] with blur/slide in and out */
export const io = (t: number, a: number, b: number, o: {y?: number; blur?: number; din?: number; dout?: number} = {}) => {
  const {y = 22, blur = 8, din = 0.45, dout = 0.3} = o;
  const i = prog(t, a, din);
  const out = prog(t, b, dout);
  const v = i * (1 - out);
  return {
    opacity: v,
    transform: `translateY(${(1 - i) * y - out * y * 0.6}px)`,
    filter: `blur(${(1 - i) * blur + out * blur}px)`,
  } as React.CSSProperties;
};

export const Abs: React.FC<{style?: React.CSSProperties; children?: React.ReactNode}> = ({style, children}) => (
  <div style={{position: 'absolute', ...style}}>{children}</div>
);

/* ---------- chrome: header, edge tag, step title ---------- */
export const Header: React.FC<{step: number | 'all'; label: string; dark?: boolean; t: number}> = ({step, label, dark, t}) => {
  const gray = dark ? 'rgba(255,255,255,0.22)' : '#cbd5e1';
  const done = dark ? 'rgba(255,255,255,0.7)' : C.text;
  const fg = dark ? '#fff' : C.text;
  return (
    <>
      <Abs style={{left: 51, top: 129, display: 'flex', gap: 4, opacity: prog(t, 0, 0.4)}}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const n = 6 - i;
          const color = step === 'all' ? done : n === step ? C.primary : n < (step as number) ? done : gray;
          const grow = n === step ? prog(t, 0.1, 0.5) : 1;
          return <div key={i} style={{width: 24, height: 3, background: color, transform: `scaleX(${grow})`, transformOrigin: 'right'}} />;
        })}
      </Abs>
      <Abs style={{right: 52, top: 120, direction: 'rtl', fontFamily: F.ui, fontWeight: 700, fontSize: 15, color: fg, opacity: 0.85 * prog(t, 0, 0.4)}}>
        {label}
      </Abs>
      <Abs style={{left: 6, top: 425, width: 40, height: 14, transform: 'rotate(-90deg)', transformOrigin: 'center', fontFamily: F.mono, fontSize: 11, letterSpacing: 1, color: dark ? 'rgba(255,255,255,.35)' : 'rgba(100,116,139,.7)', whiteSpace: 'nowrap', textAlign: 'center', direction: 'ltr'}}>
        @mhaf
      </Abs>
    </>
  );
};

export const StepTitle: React.FC<{n: number; title: string; sub: string; dark?: boolean; t: number; at?: number; y?: number}> = ({n, title, sub, dark, t, at = 0.2, y = 245}) => {
  const p = back(t, at, 0.6);
  const fg = dark ? '#fff' : C.text;
  return (
    <>
      <Abs style={{left: 0, width: W, top: y, display: 'flex', justifyContent: 'center', direction: 'rtl', opacity: clamp01(p * 2), transform: `scale(${mix(0.8, 1, p)})`, filter: `blur(${(1 - clamp01(p)) * 8}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 50, height: 50, borderRadius: 9, background: C.primary, color: '#fff', fontFamily: F.display, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 2}}>{n}</div>
          <div style={{fontFamily: F.display, fontWeight: 900, fontSize: 52, color: fg, lineHeight: 1.2}}>{title}</div>
        </div>
      </Abs>
      <Abs style={{left: 0, width: W, top: y + 62, textAlign: 'center', fontFamily: F.mono, fontSize: 13.5, letterSpacing: 1.6, color: dark ? 'rgba(255,255,255,.4)' : '#94a3b8', opacity: prog(t, at + 0.2, 0.5)}}>
        {sub}
      </Abs>
    </>
  );
};

/* ---------- kinetic caption ---------- */
export type Part = {text: string; hl?: boolean; ghost?: boolean};
export const Cap: React.FC<{t: number; a: number; b: number; parts: Part[]; dark?: boolean; y?: number; size?: number}> = ({t, a, b, parts, dark, y = 150, size = 44}) => {
  if (t < a - 0.01 || t > b + 0.4) return null;
  const fg = dark ? '#fff' : C.text;
  const out = prog(t, b, 0.3);
  return (
    <Abs style={{right: 52, top: y, direction: 'rtl', display: 'flex', gap: 12, alignItems: 'center', opacity: 1 - out, filter: `blur(${out * 8}px)`, transform: `translateY(${-out * 12}px)`}}>
      {parts.map((p, i) => {
        const at = a + i * 0.16;
        const e = prog(t, at, 0.45);
        const chipP = prog(t, at + 0.1, 0.4);
        return (
          <div key={i} style={{position: 'relative', fontFamily: F.display, fontWeight: 900, fontSize: size, lineHeight: 1.25, color: p.hl ? '#fff' : p.ghost ? (dark ? 'rgba(255,255,255,.35)' : '#94a3b8') : fg, padding: p.hl ? '0 12px' : 0, opacity: e, transform: `translateY(${(1 - e) * 22}px)`, filter: `blur(${(1 - e) * 8}px)`}}>
            {p.hl && <div style={{position: 'absolute', inset: '4px 0 0 0', background: C.primary, borderRadius: 7, clipPath: `inset(0 0 0 ${(1 - chipP) * 100}%)`, zIndex: -1}} />}
            <span style={{position: 'relative'}}>{p.text}</span>
          </div>
        );
      })}
    </Abs>
  );
};

/* ---------- command pill ("قل له") ---------- */
export const Command: React.FC<{t: number; a: number; b: number; text: string; y: number; dark?: boolean; size?: number}> = ({t, a, b, text, y, dark, size = 26}) => {
  if (t < a - 0.01 || t > b + 0.4) return null;
  const s = io(t, a, b, {y: 24});
  return (
    <Abs style={{left: 0, width: W, top: y, display: 'flex', justifyContent: 'center', ...s}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', direction: 'rtl'}}>
        <div style={{fontFamily: F.ui, fontWeight: 700, fontSize: 12, color: dark ? 'rgba(255,255,255,.55)' : C.muted, marginBottom: 6, marginRight: 4}}>قل له</div>
        <div style={{background: dark ? '#f8fafc' : C.text, color: dark ? C.text : '#fff', fontFamily: F.display, fontWeight: 900, fontSize: size, padding: '10px 24px 12px', borderRadius: 14, boxShadow: '0 12px 30px rgba(15,23,42,.25)'}}>{text}</div>
      </div>
    </Abs>
  );
};

/* ---------- small pieces ---------- */
export const Shadow = '0 1px 0 rgba(255,255,255,.9) inset, 0 2px 4px rgba(15,23,42,.06), 0 16px 36px rgba(15,23,42,.12)';

export const Folder: React.FC<{label: string; variant?: 'white' | 'blue' | 'dark' | 'ghost'; w?: number; h?: number; style?: React.CSSProperties; font?: number}> = ({label, variant = 'white', w = 116, h = 88, style, font = 22}) => {
  const bg = variant === 'white' ? '#fff' : variant === 'blue' ? C.primary : variant === 'dark' ? C.text : 'transparent';
  const bd = variant === 'ghost' ? '#fff' : variant === 'blue' ? C.navy : C.text;
  const fg = variant === 'white' ? C.text : '#fff';
  return (
    <div style={{position: 'relative', width: w, height: h, ...style}}>
      <div style={{position: 'absolute', right: 6, top: -12, width: w * 0.44, height: 22, background: bg, border: `3px solid ${bd}`, borderBottom: 'none', borderRadius: '8px 8px 0 0'}} />
      <div style={{position: 'absolute', inset: 0, background: bg, border: `3px solid ${bd}`, borderRadius: 12, boxShadow: variant === 'ghost' ? 'none' : '0 4px 0 rgba(15,23,42,.08), 0 14px 26px rgba(15,23,42,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 900, fontSize: font, color: fg}}>
        {label}
      </div>
    </div>
  );
};

export const Card: React.FC<{style?: React.CSSProperties; children?: React.ReactNode}> = ({style, children}) => (
  <div style={{background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: Shadow, ...style}}>{children}</div>
);

export const Cursor: React.FC<{x: number; y: number; press?: number; style?: React.CSSProperties}> = ({x, y, press = 0, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `scale(${1 - press * 0.15})`, transformOrigin: 'top left', zIndex: 50, filter: 'drop-shadow(0 3px 4px rgba(15,23,42,.3))', ...style}}>
    <svg width="30" height="38" viewBox="0 0 24 30"><path d="M3 2 L3 24 L9 18.5 L13 27.5 L17 25.8 L13 17 L21 17 Z" fill={C.text} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  </div>
);

export const Check: React.FC<{size?: number; color?: string; p?: number}> = ({size = 24, color = C.primary, p = 1}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{overflow: 'visible'}}>
    <path d="M4 12.5 L9.5 18 L20 6" fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={30 * (1 - p)} />
  </svg>
);

export const XBadge: React.FC<{size?: number; p?: number}> = ({size = 30, p = 1}) => (
  <div style={{width: size, height: size, borderRadius: size, background: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`, boxShadow: '0 4px 10px rgba(18,59,143,.4)'}}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 12 12"><path d="M2 2 L10 10 M10 2 L2 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" /></svg>
  </div>
);

export const Icon: React.FC<{name: 'scissors' | 'caption' | 'motion' | 'download' | 'lock' | 'clap'; size?: number; color?: string}> = ({name, size = 22, color = '#fff'}) => {
  const p = {fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'} as any;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'scissors' && <g {...p}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 L8.1 15.9 M14.5 14.5 L20 20 M8.1 8.1 L12 12" /></g>}
      {name === 'caption' && <g {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M7 11h4M7 15h8M14 11h3" /></g>}
      {name === 'motion' && <g {...p}><path d="M5 17 L12 6 L19 17" /></g>}
      {name === 'download' && <g {...p}><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></g>}
      {name === 'lock' && <g {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></g>}
      {name === 'clap' && <g {...p}><rect x="4" y="9" width="16" height="11" rx="2" /><path d="M4 9 L7 4 L20 7 L20 9 M9 6.5 L11 10 M14 7.8 L16 11" /></g>}
    </svg>
  );
};

/** Arabic helpers for the "broken text" demo */
export const reverseWords = (s: string) => s.split(' ').reverse().join(' ');
export const breakLetters = (s: string) => {
  const out: string[] = [];
  const chars = Array.from(s);
  chars.forEach((c, i) => {
    out.push(c);
    const next = chars[i + 1];
    const isMark = next && /[\u064B-\u0652]/.test(next);
    if (next && next !== ' ' && c !== ' ' && !isMark) out.push('\u200C');
  });
  return out.join('');
};

export const Grain: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, opacity: 0.35, mixBlendMode: 'multiply', pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.5  0 0 0 0 0.7  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`}} />
);
export {W, H};
