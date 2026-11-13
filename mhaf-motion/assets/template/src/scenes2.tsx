import React from 'react';
import {C, F, W, H} from './theme';
import {BRAND} from './copy';
import {useT, prog, back, io, lin, mix, clamp01, Abs, Header, StepTitle, Cap, Command, Folder, Card, Cursor, Check, Icon, Shadow, reverseWords, breakLetters} from './ui';
import {Scene, Wordmark} from './scenes1';

const rowBox: React.CSSProperties = {position: 'absolute', left: 56, width: 464, borderRadius: 16, background: C.darkCard, border: '1px solid rgba(255,255,255,.06)'};
const tagBox: React.CSSProperties = {position: 'absolute', left: 14, top: 12, fontFamily: F.mono, fontWeight: 400, fontSize: 11, color: '#cbd5e1', background: 'rgba(255,255,255,.12)', padding: '2px 7px', borderRadius: 5};

/* ---------------- step 4 (dark) ---------------- */
export const Step4: React.FC = () => {
  const t = useT();
  const en = prog(t, 1.5, 0.5);
  const ar = prog(t, 1.9, 0.5);
  const enCheck = lin(t, 2.4, 0.4);
  const phase = t < 4.6 ? 'rev' : t < 7.6 ? 'broken' : 'ok';
  const arText = phase === 'ok' ? BRAND.arSample : phase === 'rev' ? reverseWords(BRAND.arSample) : breakLetters(reverseWords(BRAND.arSample));
  const arVisible = t >= 3.0;
  const swap = prog(t, phase === 'rev' ? 3.0 : phase === 'broken' ? 4.6 : 7.6, 0.4);
  const tagP = back(t, 4.8, 0.4) * (1 - prog(t, 7.6, 0.25));
  const skill = back(t, 6.2, 0.6);
  const arCheck = lin(t, 8.1, 0.4);
  const [pre, post] = BRAND.arSample.split(' بس ');
  return (
    <Scene dur={9.7}>
      <Header step={4} label="04 · العربي" dark t={t} />
      <StepTitle n={4} title="العربي" sub="STEP 04 / 06 · ARABIC" dark t={t} at={0.15} />
      <Cap dark t={t} a={0.9} b={3.0} parts={[{text: 'هالطريقة'}, {text: 'مبنية'}]} />
      <Cap dark t={t} a={3.1} b={4.6} parts={[{text: 'فالكابشن'}, {text: 'يطلع', ghost: true}]} />
      <Cap dark t={t} a={4.7} b={6.0} parts={[{text: 'وحروفه'}, {text: 'مقطّعة', hl: true}]} />
      <Cap dark t={t} a={6.1} b={7.6} parts={[{text: 'ومهارة'}, {text: 'موشن', hl: true}, {text: 'مهف', ghost: true}]} />
      <Cap dark t={t} a={7.7} b={9.7} parts={[{text: 'تعلّمه'}, {text: 'العربي'}, {text: 'صح', ghost: true}]} />
      {/* EN row */}
      <Abs style={{...rowBox, top: 348, height: 80, opacity: en, transform: `translateY(${(1 - en) * 24}px)`}}>
        <div style={tagBox}>EN</div>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, direction: 'ltr', fontFamily: F.display, fontWeight: 900, fontSize: 36, color: '#fff'}}>
          JUST <span style={{background: C.primary, padding: '0 12px', borderRadius: 7, transform: `rotate(-1.5deg)`}}>SHOOT</span>
        </div>
        <div style={{position: 'absolute', right: 18, top: 20, width: 40, height: 40, borderRadius: 40, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${enCheck})`}}><Check size={22} color={C.text} p={enCheck} /></div>
      </Abs>
      {/* AR row */}
      <Abs style={{...rowBox, top: 447, height: 125, opacity: ar, transform: `translateY(${(1 - ar) * 24}px)`}}>
        <div style={tagBox}>AR</div>
        {arVisible && (
          <div key={phase} style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'rtl', fontFamily: F.display, fontWeight: 900, fontSize: 34, color: '#fff', paddingTop: 14, opacity: swap, transform: `translateY(${(1 - swap) * 14}px) scale(${mix(0.96, 1, swap)})`, filter: `blur(${(1 - swap) * 6}px)`}}>
            {phase === 'ok' ? (
              <span>{pre} <span style={{background: C.primary, padding: '0 10px', borderRadius: 7}}>بس</span> {post}</span>
            ) : (
              <span style={{letterSpacing: phase === 'broken' ? 1 : 0, whiteSpace: 'nowrap', fontSize: phase === 'broken' ? 29 : 34}}>{arText}</span>
            )}
          </div>
        )}
        {phase === 'ok' && <div style={{position: 'absolute', right: 16, top: 12, width: 34, height: 34, borderRadius: 34, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${arCheck})`}}><Check size={19} color={C.text} p={arCheck} /></div>}
        <div style={{position: 'absolute', right: 6, top: -16, background: C.yellow, color: C.text, fontFamily: F.display, fontWeight: 900, fontSize: 18, padding: '1px 14px 3px', borderRadius: 6, transform: `rotate(4deg) scale(${tagP})`, opacity: clamp01(tagP)}}>مقلوب</div>
      </Abs>
      {/* skill card */}
      <Abs style={{left: 118, top: 608, width: 340, opacity: clamp01(skill * 2) * (1 - prog(t, 7.6, 0.3)), transform: `translateY(${(1 - skill) * 40}px) rotate(${mix(4, -1.5, skill)}deg)`}}>
        <Card style={{padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 14, direction: 'rtl', background: '#f8fafc'}}>
          <div style={{width: 46, height: 38, borderRadius: 8, background: C.primary, border: `3px solid ${C.navy}`}} />
          <div>
            <div style={{fontFamily: F.display, fontWeight: 900, fontSize: 24, color: C.text}}>{BRAND.skillName}</div>
            <div style={{fontFamily: F.mono, fontSize: 11, color: C.muted, direction: 'ltr', textAlign: 'right'}}>{BRAND.skillUrl}</div>
          </div>
        </Card>
      </Abs>
    </Scene>
  );
};

/* ---------------- step 5 (dark) ---------------- */
export const Step5: React.FC = () => {
  const t = useT();
  const f = back(t, 0.8, 0.6);
  const up = prog(t, 3.9, 0.7);
  const fy = mix(600, 426, up);
  const phones = [
    {x: 200, r: -8, kind: 0, d: 2.35},
    {x: 288, r: 0, kind: 1, d: 2.55},
    {x: 376, r: 8, kind: 2, d: 2.75},
  ];
  const absorb = prog(t, 3.35, 0.45);
  const bump = t > 3.7 ? Math.sin(lin(t, 3.7, 0.4) * Math.PI) * 0.08 : 0;
  return (
    <Scene dur={6.5}>
      <Header step={5} label="05 · ذوقك" dark t={t} />
      <StepTitle n={5} title="ذوقك" sub="STEP 05 / 06 · YOUR TASTE" dark t={t} at={0.15} />
      <Cap dark t={t} a={0.5} b={2.2} parts={[{text: 'حط'}, {text: 'ثلاث'}, {text: 'فيديوهات', ghost: true}]} />
      <Cap dark t={t} a={2.3} b={3.9} parts={[{text: 'تحبها'}, {text: 'في'}, {text: 'إلهام', ghost: true}]} />
      <Abs style={{left: 288 - 58, top: fy - 42, opacity: clamp01(f * 2), transform: `scale(${mix(0.7, 1, f) + bump})`}}><Folder variant="ghost" label="إلهام" w={116} h={84} font={21} /></Abs>
      {phones.map((p, i) => {
        const e = back(t, p.d, 0.55);
        const x = mix(p.x, 288, absorb);
        const y = mix(380, 560, absorb);
        return (
          <Abs key={i} style={{left: x - 34, top: y - 54, width: 68, height: 108, borderRadius: 11, background: p.kind === 0 ? '#94a3b8' : p.kind === 1 ? '#f8fafc' : C.primary, opacity: clamp01(e * 2) * (1 - absorb), transform: `translateY(${(1 - e) * -90}px) rotate(${mix(0, p.r, e)}deg) scale(${1 - absorb * 0.6})`, boxShadow: '0 12px 24px rgba(0,0,0,.35)', overflow: 'hidden'}}>
            {p.kind === 0 && <div style={{position: 'absolute', left: 10, right: 10, top: 14, height: 34, background: 'repeating-linear-gradient(90deg,#0f172a 0 4px,transparent 4px 8px)'}} />}
            {p.kind === 1 && <div style={{position: 'absolute', left: 18, top: 16, width: 32, height: 32, border: `3px solid ${C.text}`, borderRadius: 8}} />}
            {p.kind === 2 && <div style={{position: 'absolute', left: 20, top: 16, width: 28, height: 28, borderRadius: 28, background: C.text}} />}
            <div style={{position: 'absolute', left: 10, right: 10, bottom: 22, height: 5, borderRadius: 5, background: p.kind === 2 ? C.text : C.primary}} />
            <div style={{position: 'absolute', left: 10, right: 24, bottom: 11, height: 5, borderRadius: 5, background: p.kind === 0 ? '#475569' : '#cbd5e1'}} />
          </Abs>
        );
      })}
      <Command dark t={t} a={4.0} b={6.5} text="استلهم منها... لا تنسخ" y={600} size={27} />
    </Scene>
  );
};

/* ---------------- step 6 ---------------- */
const clipW = [84, 64, 96, 70, 86];
export const Step6: React.FC = () => {
  const t = useT();
  const ph = back(t, 0.4, 0.7);
  const mv = prog(t, 2.0, 0.6);
  const into = prog(t, 3.2, 0.5);
  const fold = back(t, 2.1, 0.5);
  const card = prog(t, 4.0, 0.6);
  const gap = prog(t, 4.7, 0.7) * 10;
  const sweep1 = lin(t, 4.3, 1.4);
  const sweep2 = lin(t, 7.5, 1.4);
  const head = t < 6.0 ? sweep1 : sweep2;
  const px = 36 + 400 * head;
  const cutL: number[] = [];
  let acc = 0;
  const clips = clipW.map((w, i) => { const l = acc + i * gap; acc += w; if (i) cutL.push(l - gap / 2); return {l, w}; });
  const play = back(t, 7.4, 0.5) * (1 - prog(t, 8.75, 0.25));
  const diamonds = [0, 1, 2, 3, 4, 5, 6];
  return (
    <Scene dur={9.0}>
      <Header step={6} label="06 · صوّر" t={t} />
      <StepTitle n={6} title="صوّر" sub="STEP 06 / 06 · FILM & DROP" t={t} at={0.15} />
      <Cap t={t} a={0.5} b={2.0} parts={[{text: 'صوّر'}, {text: 'عادي', ghost: true}]} />
      <Cap t={t} a={2.1} b={3.8} parts={[{text: 'وحطه'}, {text: 'في'}, {text: 'خام', ghost: true}]} />
      <Cap t={t} a={4.0} b={5.65} parts={[{text: 'يقص'}, {text: 'السكتات', hl: true}]} />
      <Cap t={t} a={5.75} b={7.3} parts={[{text: 'ويضيف'}, {text: 'الموشن', ghost: true}]} />
      <Cap t={t} a={7.4} b={9.0} parts={[{text: 'وأنت'}, {text: 'تراجع', ghost: true}]} />
      {t < 3.9 && (
        <>
          <Abs style={{left: 96 - 20, top: 480, opacity: fold * (1 - prog(t, 3.6, 0.3))}}><Folder variant="blue" label="خام" w={116} h={84} font={22} /></Abs>
          <Abs style={{left: mix(288, 400, mv) - 70, top: mix(400, 420, mv) + mix(0, 0, mv) - 40 + mix(0, 0, into) + into * 60, width: 140, height: 250, borderRadius: 26, background: C.text, opacity: clamp01(ph * 2) * (1 - into), transform: `translate(${-into * 240}px, 0) scale(${mix(1.0, 0.25, into)}) translateY(${(1 - ph) * 50}px)`, boxShadow: '0 20px 40px rgba(15,23,42,.3)', overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 14, top: 14, display: 'flex', alignItems: 'center', gap: 5, fontFamily: F.mono, fontSize: 11, color: '#fff'}}><i style={{width: 8, height: 8, borderRadius: 8, background: C.primary}} />00:02</div>
            {[[8, 8, 'borderTop', 'borderLeft'], [8, 8, 'borderTop', 'borderRight'], [8, 8, 'borderBottom', 'borderLeft'], [8, 8, 'borderBottom', 'borderRight']].map((c: any, i) => (
              <div key={i} style={{position: 'absolute', width: 22, height: 22, [c[2]]: '3px solid #fff', [c[3]]: '3px solid #fff', top: i < 2 ? 36 : undefined, bottom: i >= 2 ? 14 : undefined, left: i % 2 === 0 ? 10 : undefined, right: i % 2 === 1 ? 10 : undefined, borderRadius: 3}} />
            ))}
            <div style={{position: 'absolute', left: 48, top: 98, width: 44, height: 44, borderRadius: 44, background: '#64748b'}} />
            <div style={{position: 'absolute', left: 24, top: 150, width: 92, height: 120, borderRadius: '46px 46px 0 0', background: '#64748b'}} />
          </Abs>
        </>
      )}
      <Command t={t} a={3.8} b={9.0} text="مَنْتِجه" y={345} size={28} />
      <Abs style={{left: 40, top: 480, width: 496, opacity: card, transform: `translateY(${(1 - card) * 40}px)`, direction: 'ltr'}}>
        <Card style={{height: 215, borderRadius: 14, padding: 0, position: 'relative', overflow: 'hidden'}}>
          {['V', 'CC', 'FX'].map((l, i) => <div key={l} style={{position: 'absolute', left: 12, top: [30, 98, 150][i], fontFamily: F.mono, fontSize: 11, color: '#94a3b8'}}>{l}</div>)}
          {/* video clips */}
          <div style={{position: 'absolute', left: 36, top: 18, width: 440, height: 50}}>
            {clips.map((c, i) => (
              <div key={i} style={{position: 'absolute', left: c.l, width: c.w, top: 0, height: 50, borderRadius: 7, background: `repeating-linear-gradient(90deg,${C.text} 0 5px,#1e293b 5px 7px)`}} />
            ))}
            {cutL.map((x, i) => <div key={i} style={{position: 'absolute', left: x - 1.5, top: -6, width: 3, height: 62, background: C.primary, borderRadius: 2, opacity: lin(t, 4.8 + i * 0.12, 0.2)}} />)}
          </div>
          {/* captions */}
          <div style={{position: 'absolute', left: 36, top: 90, width: 440, height: 22}}>
            {clips.map((c, i) => <div key={i} style={{position: 'absolute', left: c.l + 2, width: c.w - 8, height: 20, top: 0, borderRadius: 5, background: C.primary, transform: `scaleX(${back(t, 5.8 + i * 0.12, 0.35)})`, transformOrigin: 'left'}} />)}
          </div>
          {/* fx diamonds */}
          <div style={{position: 'absolute', left: 36, top: 142, width: 440, height: 22}}>
            {diamonds.map((d) => <div key={d} style={{position: 'absolute', left: 12 + d * 66, top: 3, width: 16, height: 16, background: d % 3 === 1 ? C.primary : C.text, transform: `rotate(45deg) scale(${back(t, 6.3 + d * 0.1, 0.35)})`}} />)}
          </div>
          <div style={{position: 'absolute', left: px, top: 4, width: 3, height: 205, background: C.primary, borderRadius: 2, boxShadow: '0 0 12px rgba(37,99,235,.6)'}} />
          <div style={{position: 'absolute', left: 248 - 31, top: 78, width: 62, height: 62, borderRadius: 62, background: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${clamp01(play) ? play : 0})`, opacity: clamp01(play * 2), boxShadow: `0 0 0 ${6 * play}px rgba(37,99,235,.35)`}}>
            <svg width="26" height="26" viewBox="0 0 24 24"><path d="M7 4 L20 12 L7 20 Z" fill="#fff" /></svg>
          </div>
        </Card>
      </Abs>
    </Scene>
  );
};

/* ---------------- recap ---------------- */
const items = ['التطبيق', 'المجلد', 'الأدوات', 'العربي', 'ذوقك', 'صوّر'];
export const Recap: React.FC = () => {
  const t = useT();
  const hot = prog(t, 1.9, 0.5);
  return (
    <Scene dur={3.5}>
      <Header step="all" label="الطريقة كاملة" t={t} />
      <Cap t={t} a={0.15} b={1.7} parts={[{text: 'الأدوات'}, {text: 'تقص'}]} />
      <Cap t={t} a={1.8} b={3.5} parts={[{text: 'وذوقك', hl: true}, {text: 'يسوي'}, {text: 'الباقي'}]} />
      {items.map((it, i) => {
        const e = back(t, 0.15 + i * 0.1, 0.5);
        const ck = lin(t, 0.4 + i * 0.12, 0.35);
        const isHot = i === 4;
        const x = i % 2 === 0 ? 403 : 173;
        const y = 262 + Math.floor(i / 2) * 118;
        return (
          <Abs key={it} style={{left: x - 112, top: y, width: 224, height: 100, opacity: clamp01(e * 2), transform: `translateY(${(1 - e) * 30}px) scale(${isHot ? 1 + hot * 0.06 : 1})`, zIndex: isHot ? 5 : 1}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 14, background: isHot ? mix(0, 1, hot) > 0.5 ? C.primary : '#fff' : '#fff', border: `1px solid ${isHot && hot > 0.5 ? C.navy : C.border}`, boxShadow: isHot && hot > 0.5 ? `0 8px 0 ${C.navy}, 0 20px 36px rgba(37,99,235,.35)` : Shadow, direction: 'rtl'}}>
              <div style={{position: 'absolute', right: 14, top: 12, width: 28, height: 28, borderRadius: 7, background: isHot && hot > 0.5 ? '#fff' : C.text, color: isHot && hot > 0.5 ? C.primary : '#fff', fontFamily: F.display, fontWeight: 900, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
              <div style={{position: 'absolute', right: 14, bottom: 12, fontFamily: F.display, fontWeight: 900, fontSize: 32, color: isHot && hot > 0.5 ? '#fff' : C.text}}>{it}</div>
              <div style={{position: 'absolute', left: 14, top: 14, display: 'flex', gap: 6, alignItems: 'center'}}>
                {i === 2 && <Icon name="scissors" size={20} color={C.text} />}
                <Check size={22} color={isHot && hot > 0.5 ? '#fff' : C.primary} p={ck} />
              </div>
            </div>
          </Abs>
        );
      })}
    </Scene>
  );
};

/* ---------------- CTA ---------------- */
export const Cta: React.FC = () => {
  const t = useT();
  const card = back(t, 0.3, 0.7);
  const stamp = back(t, 0.9, 0.55);
  const ell = lin(t, 2.2, 0.7);
  const tap = t > 3.0 ? lin(t, 3.0, 0.8) : 0;
  return (
    <Scene dur={4.2}>
      <Header step="all" label="الرابط" t={t} />
      <Cap t={t} a={0.15} b={1.5} parts={[{text: 'مهارة'}, {text: 'موشن'}, {text: 'مهف'}]} />
      <Cap t={t} a={0.35} b={1.5} y={208} parts={[{text: 'مجانية', hl: true}]} />
      <Cap t={t} a={1.6} b={4.2} parts={[{text: 'ورابطها'}, {text: 'مثبّت'}, {text: 'في'}, {text: 'البايو', hl: true}]} />
      <Abs style={{left: 118, top: 300, width: 340, height: 400, opacity: clamp01(card * 2), transform: `translateY(${(1 - card) * 70}px) scale(${mix(0.9, 1, card)})`}}>
        <div style={{position: 'absolute', inset: 0, background: '#fff', border: `4px solid ${C.text}`, borderRadius: 26, boxShadow: '0 24px 50px rgba(15,23,42,.2)', direction: 'rtl', textAlign: 'center'}}>
          <div style={{width: 74, height: 74, borderRadius: 74, background: C.text, margin: '26px auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: F.display, fontWeight: 900, fontSize: 24}}>مهف</div>
          <div style={{fontFamily: F.mono, fontWeight: 500, fontSize: 17, color: C.text, direction: 'ltr'}}>{BRAND.handle}</div>
          <div style={{fontFamily: F.ui, fontWeight: 700, fontSize: 15, color: C.text, marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center'}}><Icon name="clap" size={17} color={C.primary} />{BRAND.profileBio1}</div>
          <div style={{fontFamily: F.ui, fontWeight: 700, fontSize: 15, color: C.text, marginTop: 8, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center'}}><Icon name="download" size={17} color={C.primary} />{BRAND.profileBio2}</div>
          <div style={{position: 'relative', marginTop: 20, fontFamily: F.mono, fontSize: 13, color: C.text, direction: 'ltr'}}>
            {BRAND.skillUrl}
            <svg style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', overflow: 'visible'}} width="250" height="44" viewBox="0 0 250 44">
              <ellipse cx="125" cy="22" rx="118" ry="18" fill="none" stroke={C.primary} strokeWidth="3" strokeDasharray="700" strokeDashoffset={700 * (1 - ell)} transform="rotate(-2 125 22)" />
            </svg>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center', opacity: clamp01(stamp * 2), transform: `rotate(${mix(-14, -5, stamp)}deg) scale(${mix(1.5, 1, stamp)})`}}>
            <div style={{background: C.yellow, color: C.text, fontFamily: F.display, fontWeight: 900, fontSize: 46, padding: '0 26px 6px', borderRadius: 8, boxShadow: `0 7px 0 ${C.navy}`}}>مجانية</div>
          </div>
        </div>
        <div style={{position: 'absolute', right: -14, top: 292, width: 26, height: 26, borderRadius: 26, background: C.primary, opacity: tap > 0 ? 1 - tap * 0.2 : 0, transform: `scale(${1 + tap * 0.3})`, boxShadow: `0 0 0 ${tap * 16}px rgba(37,99,235,${0.35 * (1 - tap)})`}} />
      </Abs>
    </Scene>
  );
};

/* ---------------- end card ---------------- */
export const End: React.FC = () => {
  const t = useT();
  const p = back(t, 0.05, 0.7);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Abs style={{left: 0, width: W, top: 330, textAlign: 'center', opacity: clamp01(p * 2), transform: `scale(${mix(0.7, 1, p)})`, filter: `blur(${(1 - clamp01(p)) * 10}px)`}}><Wordmark size={150} /></Abs>
      <Abs style={{left: 0, width: W, top: 520, textAlign: 'center', fontFamily: F.display, fontWeight: 900, fontSize: 40, color: C.text, direction: 'rtl', ...io(t, 0.4, 99)}}>{BRAND.tagline}</Abs>
      <Abs style={{left: 0, width: W, top: 596, textAlign: 'center', fontFamily: F.mono, fontSize: 18, color: C.muted, letterSpacing: 1, direction: 'ltr', ...io(t, 0.6, 99)}}>{BRAND.handle} · {BRAND.nameLatin} /mæh-hæf/</Abs>
    </div>
  );
};
