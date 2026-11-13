import React from 'react';
import {C, F, W, H} from './theme';
import {BRAND} from './copy';
import {useT, prog, back, io, lin, mix, clamp01, Abs, Header, StepTitle, Cap, Command, Folder, Card, Cursor, Check, XBadge, Icon, Shadow} from './ui';

export const Scene: React.FC<{dur: number; children: React.ReactNode; fadeIn?: boolean}> = ({dur, children}) => {
  const t = useT();
  const out = prog(t, dur - 0.28, 0.26);
  return <div style={{position: 'absolute', inset: 0, opacity: 1 - out, filter: `blur(${out * 6}px)`}}>{children}</div>;
};

/* ---------------- journey row (phone / dots / folder) ---------------- */
const Journey: React.FC<{t: number; y: number; dotsAt: number; fillAt?: number; phoneAt: number; folderAt: number; seq?: boolean}> = ({t, y, dotsAt, fillAt, phoneAt, folderAt, seq}) => {
  const fp = back(t, folderAt, 0.6);
  const pp = back(t, phoneAt, 0.7);
  return (
    <>
      <Abs style={{left: 405, top: y - 34, width: 92, height: 68, border: `3px dashed ${C.text}`, borderRadius: 10, opacity: fp, transform: `scale(${mix(0.7, 1, fp)})`}} />
      <Abs style={{left: 380, top: y + 52, width: 142, textAlign: 'center', fontFamily: F.ui, fontWeight: 700, fontSize: 15, color: C.text, opacity: fp}}>مجلد فاضي</Abs>
      <Abs style={{left: 160, top: y - 1, width: 232, height: 0, borderTop: `3px dashed ${C.muted}`, opacity: 0.4 * lin(t, dotsAt, 0.4)}} />
      {[1, 2, 3, 4, 5, 6].map((n) => {
        const at = dotsAt + (seq ? (n - 1) * 0.16 : 0.0);
        const e = back(t, at, 0.5);
        const fa = (fillAt ?? 999) + (n - 1) * 0.2;
        const filled = t >= fa;
        const fe = back(t, fa, 0.4);
        return (
          <Abs key={n} style={{left: 372 - (n - 1) * 40 - 17, top: y - 20, width: 40, height: 40, borderRadius: 40, border: `2.5px solid ${filled ? C.primary : C.text}`, background: filled ? C.primary : 'transparent', color: filled ? '#fff' : C.text, fontFamily: F.display, fontWeight: 900, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: clamp01(e * 2), transform: `scale(${filled ? mix(1.3, 1, fe) : e})`, paddingBottom: 2}}>
            {n}
          </Abs>
        );
      })}
      <Abs style={{left: 72, top: y - 62, width: 72, height: 118, borderRadius: 16, background: C.text, opacity: clamp01(pp * 2), transform: `translateX(${(1 - pp) * -80}px) rotate(${(1 - pp) * -10}deg)`, boxShadow: '0 14px 28px rgba(15,23,42,.25)'}}>
        <div style={{position: 'absolute', right: 8, top: 8, width: 8, height: 8, borderRadius: 8, background: C.primary}} />
        <div style={{position: 'absolute', left: 10, top: 20, width: 34, height: 4, borderRadius: 4, background: 'rgba(255,255,255,.5)'}} />
        <div style={{position: 'absolute', left: 10, top: 30, width: 24, height: 4, borderRadius: 4, background: 'rgba(255,255,255,.3)'}} />
        <div style={{position: 'absolute', left: 8, right: 8, top: 58, background: C.primary, color: '#fff', fontFamily: F.display, fontWeight: 900, fontSize: 15, textAlign: 'center', borderRadius: 5, padding: '2px 0 3px'}}>جاهز</div>
      </Abs>
      <Abs style={{left: 58, top: y + 66, width: 100, textAlign: 'center', fontFamily: F.ui, fontWeight: 700, fontSize: 15, color: C.text, opacity: pp}}>ريل جاهز</Abs>
    </>
  );
};

const Wordmark: React.FC<{size: number; color?: string}> = ({size, color = C.text}) => (
  <div style={{position: 'relative', display: 'inline-block', fontFamily: F.display, fontWeight: 900, fontSize: size, color, lineHeight: 1.1, direction: 'rtl'}}>
    {BRAND.nameAr}
    <div style={{position: 'absolute', top: size * 0.04, left: size * 0.52, width: size * 0.17, height: size * 0.17, borderRadius: size, background: C.primary}} />
  </div>
);
export {Wordmark};

/* ---------------- 0: hook ---------------- */
export const Hook: React.FC = () => {
  const t = useT();
  const p1 = back(t, 0.05, 0.7);
  const stamp = back(t, 0.85, 0.55);
  return (
    <Scene dur={3}>
      <Abs style={{left: 0, width: W, top: 100, textAlign: 'center', fontFamily: F.display, fontWeight: 900, fontSize: 104, color: C.text, opacity: clamp01(p1 * 2), transform: `scale(${mix(0.7, 1, p1)})`, filter: `blur(${(1 - clamp01(p1)) * 10}px)`, direction: 'rtl'}}>6 خطوات</Abs>
      <Abs style={{left: 0, width: W, top: 232, textAlign: 'center', fontFamily: F.display, fontWeight: 900, fontSize: 40, color: C.text, ...io(t, 0.4, 99), direction: 'rtl'}}>وكلود يمنتج فيديوك</Abs>
      <Abs style={{left: 0, width: W, top: 305, display: 'flex', justifyContent: 'center', opacity: clamp01(stamp * 2), transform: `scale(${mix(1.6, 1, stamp)}) rotate(${mix(-14, -3, stamp)}deg)`}}>
        <div style={{background: C.primary, color: '#fff', fontFamily: F.display, fontWeight: 900, fontSize: 80, padding: '0 34px 8px', borderRadius: 10, boxShadow: `0 10px 0 ${C.navy}, 0 24px 40px rgba(37,99,235,.35)`, direction: 'rtl'}}>بلاش</div>
      </Abs>
      <Journey t={t} y={575} dotsAt={1.1} fillAt={1.35} phoneAt={1.0} folderAt={1.0} />
      <Abs style={{left: 0, width: W, top: 690, textAlign: 'center', ...io(t, 2.0, 99)}}><Wordmark size={64} /></Abs>
    </Scene>
  );
};

/* ---------------- 1: ad ---------------- */
export const Ad: React.FC = () => {
  const t = useT();
  const inP = back(t, 0.1, 0.8);
  const outP = prog(t, 2.55, 0.35);
  const cx = mix(330, 255, prog(t, 0.5, 1.0));
  const cy = mix(790, 640, prog(t, 0.5, 1.0));
  const press = t > 1.65 && t < 1.85 ? 1 : 0;
  return (
    <Scene dur={3}>
      <Cap t={t} a={0.15} b={1.45} parts={[{text: 'والطريقة'}, {text: 'يبيعونها'}, {text: 'بكورس'}]} />
      <Cap t={t} a={1.55} b={3} parts={[{text: 'وهنا'}, {text: 'بلاش', hl: true}]} />
      <Abs style={{left: 62, top: 330, width: 452, opacity: clamp01(inP * 2) * (1 - outP), transform: `translateY(${(1 - inP) * 120}px) rotate(${mix(6, -2.5, inP)}deg) scale(${1 - outP * 0.1})`, filter: `blur(${outP * 8}px)`}}>
        <Card style={{padding: '22px 24px 24px', direction: 'rtl'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: F.ui, fontWeight: 700, fontSize: 15, color: C.muted, marginBottom: 12}}>
            <span style={{color: C.text}}>الدفع</span>
            <span style={{display: 'flex', gap: 6, alignItems: 'center'}}><Icon name="lock" size={15} color={C.muted} /> دفع آمن</span>
          </div>
          <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>
            <div style={{width: 70, height: 70, borderRadius: 14, background: C.text, color: '#fff', fontFamily: F.display, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>كورس</div>
            <div>
              <div style={{fontFamily: F.display, fontWeight: 900, fontSize: 21, lineHeight: 1.35, color: C.text}}>{BRAND.courseTitle}</div>
              <div style={{fontFamily: F.ui, fontWeight: 500, fontSize: 13, color: C.muted, marginTop: 4}}>12 درس · مدى الحياة</div>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 10, margin: '14px 0 16px'}}>
            <span style={{fontFamily: F.display, fontWeight: 900, fontSize: 56, color: C.text, direction: 'ltr'}}>{BRAND.coursePrice}</span>
            <span style={{fontFamily: F.display, fontWeight: 900, fontSize: 24, color: C.text}}>{BRAND.courseCurrency}</span>
          </div>
          <div style={{height: 56, borderRadius: 12, background: press ? C.primaryHover : C.text, color: '#fff', fontFamily: F.display, fontWeight: 900, fontSize: 21, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${press ? 0.97 : 1})`}}>ادفع الحين ←</div>
        </Card>
      </Abs>
      <div style={{opacity: 1 - outP}}><Cursor x={cx} y={cy} press={press} /></div>
    </Scene>
  );
};

/* ---------------- 2: roadmap ---------------- */
export const Roadmap: React.FC = () => {
  const t = useT();
  const p = back(t, 0.05, 0.7);
  const slide = prog(t, 3.2, 0.5);
  return (
    <Scene dur={4.5}>
      <div style={{transform: `translateX(${-slide * 40}px)`, opacity: 1 - slide}}>
        <Abs style={{left: 0, width: W, top: 215, textAlign: 'center', fontFamily: F.display, fontWeight: 900, fontSize: 100, color: C.text, opacity: clamp01(p * 2), transform: `scale(${mix(0.75, 1, p)})`, direction: 'rtl'}}>6 خطوات</Abs>
        <Journey t={t} y={496} dotsAt={0.5} fillAt={1.3} phoneAt={2.0} folderAt={0.4} seq />
      </div>
    </Scene>
  );
};

/* ---------------- 3: step 1 ---------------- */
export const Step1: React.FC = () => {
  const t = useT();
  const dl = prog(t, 0.6, 0.6);
  const bar = lin(t, 1.2, 1.2);
  const cardOut = prog(t, 2.35, 0.3);
  const win = prog(t, 2.6, 0.55);
  const codeOn = t > 4.7;
  const pill = prog(t, 4.9, 0.5);
  const curX = mix(300, 250, prog(t, 3.0, 1.0));
  const curY = mix(600, 500, prog(t, 3.0, 1.0));
  return (
    <Scene dur={6}>
      <Header step={1} label="01 · التطبيق" t={t} />
      <StepTitle n={1} title="التطبيق" sub="STEP 01 / 06 · THE APP" t={t} />
      <Cap t={t} a={0.4} b={2.4} parts={[{text: 'على'}, {text: 'الكمبيوتر'}]} />
      <Cap t={t} a={2.7} b={4.5} parts={[{text: 'وافتح'}, {text: 'منه'}]} />
      <Cap t={t} a={4.6} b={6} parts={[{text: 'مو'}, {text: 'المتصفح', hl: true}]} />
      {/* download card */}
      <Abs style={{left: 100, top: 395, width: 376, opacity: dl * (1 - cardOut), transform: `translateY(${(1 - dl) * 40}px) scale(${1 - cardOut * 0.05})`, filter: `blur(${cardOut * 6}px)`}}>
        <Card style={{padding: 18, direction: 'rtl'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 56, height: 56, borderRadius: 14, background: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="download" size={28} /></div>
            <div>
              <div style={{fontFamily: F.mono, fontSize: 24, fontWeight: 400, color: C.text, direction: 'ltr'}}>Claude</div>
              <div style={{fontFamily: F.ui, fontSize: 14, color: C.muted, fontWeight: 500}}>للكمبيوتر</div>
            </div>
          </div>
          <div style={{height: 6, borderRadius: 6, background: C.border, marginTop: 14, overflow: 'hidden', direction: 'rtl'}}>
            <div style={{height: '100%', width: `${bar * 100}%`, background: C.primary, borderRadius: 6}} />
          </div>
        </Card>
      </Abs>
      {/* app window */}
      <Abs style={{left: 63, top: 385, width: 450, opacity: win, transform: `translateY(${(1 - win) * 40}px) scale(${mix(0.94, 1, win)})`}}>
        <Card style={{overflow: 'hidden', borderRadius: 14, direction: 'ltr'}}>
          <div style={{height: 26, background: C.text, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 5}}>
            <i style={{width: 8, height: 8, borderRadius: 8, background: C.primary}} /><i style={{width: 8, height: 8, borderRadius: 8, background: '#475569'}} /><i style={{width: 8, height: 8, borderRadius: 8, background: '#475569'}} />
            <span style={{marginLeft: 'auto', fontFamily: F.ui, fontSize: 12, color: '#94a3b8', fontWeight: 500}}>Claude</span>
          </div>
          <div style={{padding: '14px 16px 18px', background: C.card}}>
            <div style={{display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14}}>
              {['Chat', 'Cowork', 'Code'].map((x) => {
                const on = x === 'Code' && codeOn;
                return <div key={x} style={{fontFamily: F.ui, fontWeight: 700, fontSize: 13, padding: '5px 14px', borderRadius: 20, background: on ? C.primary : '#fff', color: on ? '#fff' : C.text, border: `1.5px solid ${on ? C.primary : C.border}`, transform: on ? `scale(${mix(1.15, 1, prog(t, 4.7, 0.3))})` : 'none'}}>{x}</div>;
              })}
            </div>
            <div style={{height: 78, borderRadius: 12, background: '#fff', border: `${codeOn ? 2.5 : 1.5}px solid ${codeOn ? C.text : C.border}`}} />
          </div>
        </Card>
      </Abs>
      <Abs style={{left: 175, top: 625, width: 280, textAlign: 'right', fontFamily: F.ui, fontWeight: 700, fontSize: 13, color: C.muted, opacity: pill, direction: 'rtl'}}>يحتاج اشتراك Pro</Abs>
      <Abs style={{left: 90, top: 655, opacity: pill, transform: `translateY(${(1 - pill) * 16}px)`, display: 'flex', alignItems: 'center', gap: 10}}>
        <div style={{background: '#fff', border: `1px solid ${C.border}`, borderRadius: 30, padding: '9px 22px', fontFamily: F.mono, fontSize: 16, color: C.text, boxShadow: Shadow, display: 'flex', gap: 12, alignItems: 'center'}}>claude.ai <i style={{width: 12, height: 12, borderRadius: 12, border: `2px solid ${C.muted}`}} /></div>
        <XBadge size={34} p={back(t, 5.3, 0.4)} />
      </Abs>
      {t > 2.9 && t < 4.7 && <Cursor x={curX} y={curY} />}
    </Scene>
  );
};

/* ---------------- 4: step 2 ---------------- */
export const Step2: React.FC = () => {
  const t = useT();
  const f0 = back(t, 0.5, 0.6);
  const line = prog(t, 2.0, 0.6);
  const kids: [string, string, 'blue' | 'white' | 'dark', number, number][] = [
    ['خام', 'تصويرك', 'blue', 424, 2.5],
    ['إلهام', 'اللي تحبه', 'white', 288, 2.9],
    ['جاهز', 'النهائي', 'dark', 152, 3.3],
  ];
  const tog = prog(t, 4.4, 0.5);
  return (
    <Scene dur={7.7}>
      <Header step={2} label="02 · المجلد" t={t} />
      <StepTitle n={2} title="المجلد" sub="STEP 02 / 06 · ONE FOLDER" t={t} at={0.1} />
      <Cap t={t} a={0.4} b={1.9} parts={[{text: 'سوّ'}, {text: 'مجلد'}]} />
      <Cap t={t} a={2.0} b={4.2} parts={[{text: 'وداخله'}, {text: 'ثلاثة', hl: true}]} />
      <Cap t={t} a={4.4} b={7.7} parts={[{text: 'واختاره'}, {text: 'في'}, {text: 'كلود', ghost: true}]} />
      <Abs style={{left: 230, top: 372, opacity: clamp01(f0 * 2), transform: `scale(${mix(0.6, 1, f0)})`}}><Folder label="مونتاجي" w={116} h={84} font={21} /></Abs>
      {/* tree lines */}
      <svg style={{position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'visible'}}>
        <g stroke="#94a3b8" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M288 462 L288 492" strokeDasharray="30" strokeDashoffset={30 * (1 - line)} />
          <path d="M152 492 L424 492" strokeDasharray="272" strokeDashoffset={272 * (1 - line)} />
          {[152, 288, 424].map((x) => <path key={x} d={`M${x} 492 L${x} 520`} strokeDasharray="28" strokeDashoffset={28 * (1 - prog(t, 2.3, 0.5))} />)}
        </g>
      </svg>
      {kids.map(([label, sub, v, x, at]) => {
        const e = back(t, at, 0.55);
        return (
          <React.Fragment key={label}>
            <Abs style={{left: x - 54, top: 535, opacity: clamp01(e * 2), transform: `translateY(${(1 - e) * 24}px) scale(${mix(0.7, 1, e)})`}}><Folder label={label} variant={v} w={108} h={78} font={19} /></Abs>
            <Abs style={{left: x - 60, top: 630, width: 120, textAlign: 'center', fontFamily: F.ui, fontWeight: 700, fontSize: 14, color: C.muted, opacity: e}}>{sub}</Abs>
          </React.Fragment>
        );
      })}
      <Abs style={{left: 0, width: W, top: 715, display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center', opacity: tog, transform: `translateY(${(1 - tog) * 20}px)`, direction: 'rtl'}}>
        <div style={{background: C.text, borderRadius: 30, padding: '10px 22px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: F.display, fontWeight: 900, fontSize: 20, color: '#fff'}}>مونتاجي <i style={{width: 22, height: 14, borderRadius: 4, background: C.primary}} /></div>
        <div style={{background: '#fff', border: `1px solid ${C.border}`, borderRadius: 30, padding: 4, display: 'flex', fontFamily: F.mono, fontSize: 13, direction: 'ltr', boxShadow: Shadow}}>
          <span style={{padding: '6px 14px', color: C.muted}}>Cloud</span>
          <span style={{padding: '6px 14px', borderRadius: 24, background: C.primarySoft, color: C.primary, fontWeight: 500}}>Local</span>
        </div>
      </Abs>
    </Scene>
  );
};

/* ---------------- 5: step 3 ---------------- */
const tools = [
  {t: 'تقص', s: 'FFmpeg', icon: 'scissors' as const, x: 424, at: 1.3},
  {t: 'الكابشن', s: 'Whisper', icon: 'caption' as const, x: 288, at: 1.8},
  {t: 'الموشن', s: 'HyperFrames', icon: 'motion' as const, x: 152, at: 2.3},
];
export const Step3: React.FC = () => {
  const t = useT();
  const xP = back(t, 3.5, 0.4);
  const xOut = prog(t, 4.9, 0.3);
  return (
    <Scene dur={8.2}>
      <Header step={3} label="03 · الأدوات" t={t} />
      <StepTitle n={3} title="الأدوات" sub="STEP 03 / 06 · THE TOOLS" t={t} at={0.1} />
      <Cap t={t} a={3.1} b={5.0} parts={[{text: 'لا'}, {text: 'تثبت', hl: true}, {text: 'شي'}]} />
      {tools.map((k, i) => {
        const e = back(t, k.at, 0.6);
        const slot = prog(t, 0.5 + i * 0.12, 0.4);
        const fill = lin(t, 5.4 + i * 0.35, 1.0);
        return (
          <React.Fragment key={k.s}>
            <Abs style={{left: k.x - 63, top: 400, width: 126, height: 122, border: '2.5px dashed #94a3b8', borderRadius: 16, opacity: slot * (1 - clamp01(e * 3))}} />
            <Abs style={{left: k.x - 63, top: 400, width: 126, opacity: clamp01(e * 2), transform: `translateY(${(1 - e) * 60}px) scale(${mix(0.8, 1, e)})`}}>
              <Card style={{padding: '14px 10px 12px', textAlign: 'center', borderRadius: 16}}>
                <div style={{width: 38, height: 38, borderRadius: 10, background: C.text, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name={k.icon} size={21} /></div>
                <div style={{fontFamily: F.display, fontWeight: 900, fontSize: 20, color: C.text, direction: 'rtl'}}>{k.t}</div>
                <div style={{fontFamily: F.mono, fontSize: 11, color: '#94a3b8', margin: '2px 0 8px'}}>{k.s}</div>
                <div style={{height: 4, borderRadius: 4, background: C.border, overflow: 'hidden', direction: 'rtl'}}><div style={{height: '100%', width: `${fill * 100}%`, background: C.primary}} /></div>
              </Card>
              {i === 0 && <div style={{position: 'absolute', right: -10, top: -10, opacity: 1 - xOut}}><XBadge size={30} p={xP} /></div>}
            </Abs>
          </React.Fragment>
        );
      })}
      <Command t={t} a={4.9} b={8.2} text="ثبّت أدوات المونتاج" y={610} />
    </Scene>
  );
};

/* ---------------- 6: pivot (course) ---------------- */
export const Pivot: React.FC = () => {
  const t = useT();
  const centers = [450, 338, 226, 114];
  const shift = mix(-56, 0, prog(t, 3.0, 0.6));
  const tag = back(t, 1.8, 0.6);
  const strike = lin(t, 3.2, 0.4);
  const q = back(t, 3.0, 0.7);
  const shake = t > 4.2 ? Math.sin((t - 4.2) * 40) * 3 * (1 - lin(t, 4.2, 0.9)) : 0;
  return (
    <Scene dur={5.1}>
      <Header step={3} label="لين هنا" t={t} />
      <Cap t={t} a={0.2} b={1.55} parts={[{text: 'لين'}, {text: 'هنا'}]} />
      <Cap t={t} a={1.65} b={3.0} parts={[{text: 'أي'}, {text: 'كورس', hl: true}, {text: 'يعلّمك'}]} />
      <Cap t={t} a={3.1} b={4.2} parts={[{text: 'بس'}, {text: 'الرابعة'}]} />
      <Cap t={t} a={4.25} b={5.1} parts={[{text: 'محد'}, {text: 'يقولها'}, {text: 'لك'}]} />
      <div style={{transform: `translateX(${shift}px)`}}>
        {[1, 2, 3].map((n, i) => {
          const e = back(t, 0.25 + i * 0.18, 0.55);
          const ck = lin(t, 0.7 + i * 0.18, 0.4);
          return (
            <Abs key={n} style={{left: centers[i] - 52, top: 480, width: 104, height: 112, borderRadius: 16, background: C.text, boxShadow: '0 14px 28px rgba(15,23,42,.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, opacity: clamp01(e * 2), transform: `translateY(${(1 - e) * 40}px) scale(${mix(0.7, 1, e)})`}}>
              <span style={{fontFamily: F.display, fontWeight: 900, fontSize: 58, color: '#fff', lineHeight: 1}}>{n}</span>
              <Check size={26} color={C.primary} p={ck} />
            </Abs>
          );
        })}
        <Abs style={{left: centers[3] - 52 + shake, top: 480, width: 104, height: 112, borderRadius: 16, background: C.primary, boxShadow: `0 10px 0 ${C.navy}, 0 20px 36px rgba(37,99,235,.35)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: clamp01(q * 2), transform: `translateY(${(1 - q) * -60}px) rotate(${mix(-14, -5, q)}deg)`}}>
          <span style={{fontFamily: F.display, fontWeight: 900, fontSize: 58, color: '#fff', lineHeight: 1}}>4</span>
          <span style={{fontFamily: F.display, fontWeight: 900, fontSize: 30, color: C.yellow, lineHeight: 0.8}}>؟</span>
        </Abs>
      </div>
      {/* bracket + price tag */}
      <Abs style={{left: 80, top: 440, width: 416, height: 22, borderTop: `3px solid ${C.text}`, borderLeft: `3px solid ${C.text}`, borderRight: `3px solid ${C.text}`, borderRadius: '6px 6px 0 0', opacity: prog(t, 1.7, 0.4)}} />
      <Abs style={{left: 232, top: 370, opacity: clamp01(tag * 2), transform: `rotate(${mix(-10, 4, tag)}deg) scale(${mix(0.6, 1, tag)})`}}>
        <Card style={{padding: '8px 18px', textAlign: 'center', borderRadius: 10}}>
          <div style={{fontFamily: F.display, fontWeight: 900, fontSize: 24, color: C.text, direction: 'rtl'}}>كورس</div>
          <div style={{fontFamily: F.display, fontWeight: 900, fontSize: 16, color: C.muted, position: 'relative'}}>
            {BRAND.coursePrice}
            <div style={{position: 'absolute', left: 0, top: '52%', height: 3, width: `${strike * 100}%`, background: C.primary}} />
          </div>
        </Card>
      </Abs>
    </Scene>
  );
};
