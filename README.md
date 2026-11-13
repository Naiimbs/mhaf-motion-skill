# mhaf-motion skill · مهارة موشن مْهَفْ

مهارة (Skill) لـ Claude تصنع فيديوهات موشن عمودية (9:16) بالعربية RTL بهوية **مْهَفْ mhaf** باستعمال Remotion: كابشن متحرك، خطوات مرقّمة، بطاقات ومجلدات وتايم لاين، انتقال فاتح/داكن، وموسيقى مركّبة.

A Claude skill that builds mhaf-branded vertical Arabic (RTL) motion-graphics videos in Remotion, from a ready template.

## المحتوى

```
mhaf-motion/            مجلد الـ skill (هذا اللي ياخذو Claude)
  SKILL.md              التعليمات
  references/           دليل التصميم + ملاحظات الرندر
  assets/template/      مشروع Remotion كامل (مشاهد، مكوّنات، خطوط، سكريبتات)
dist/mhaf-motion.skill  نفس الـ skill مضغوط، جاهز للرفع
```

## 1. التثبيت

### في Claude.ai / تطبيق Claude
1. حمّل `dist/mhaf-motion.skill` (أو اضغط مجلد `mhaf-motion` كـ zip).
2. Settings > Capabilities > Skills > Upload، وارفع الملف.
3. فعّل الـ skill وافتح محادثة جديدة.

### في Claude Code
```bash
git clone https://github.com/Naiimbs/mhaf-motion-skill.git
mkdir -p ~/.claude/skills
cp -r mhaf-motion-skill/mhaf-motion ~/.claude/skills/
```
(أو داخل مشروع معيّن: انسخو إلى `.claude/skills/` في جذر المشروع.)

## 2. الاستعمال مع Claude

اطلب بوضوح: الموضوع، عدد الخطوات، الهاندل والرابط الحقيقيين، والدقة. مثال:

> نحب فيديو موشن بأسلوب مْهَفْ، 5 خطوات، على كيفاش نخلّي موقعو يخدم بالقارئ الشاشة. الرابط: example.com/guide. 1080p.

Claude ينسخ القالب، يبدّل النصوص والمشاهد، يراجع صور اختبار، يرندر ويعطيك MP4.
ملاحظة: الصوت موسيقى مركّبة فقط، التعليق الصوتي عليك.

## 3. الاستعمال اليدوي (بدون Claude)

المتطلبات: Node 18+، ffmpeg، Python 3 + numpy (للموسيقى).

```bash
cp -r mhaf-motion/assets/template ./video && cd video
npm install
npm run studio            # معاينة حيّة
node stills.mjs 3 20 40   # صور اختبار في out/
node render.mjs           # رندر على أجزاء (قابل للاستئناف)
node assemble.mjs         # يجمع الأجزاء + الموسيقى -> out/final.mp4
```
متغيّرات: `SCALE=0.6667` (720p أسرع)، `CONC=2`، `CHROMIUM_PATH=/path/to/chrome`.

## 4. شنوّة تبدّل وين

| تبدّل | الملف |
|---|---|
| الاسم، الهاندل، الرابط، السعر، جمل المثال | `src/copy.ts` |
| الألوان | `src/theme.ts` |
| ترتيب المشاهد وتوقيتها | `src/Root.tsx` (`SCENES`) |
| محتوى المشاهد | `src/scenes1.tsx`, `src/scenes2.tsx` |
| المكوّنات المشتركة | `src/ui.tsx` |
| الموسيقى | `audio.py` |

مشهد جديد: انسخ أقرب مشهد، سجّلو في `comps` و`SCENES`، وافحصو بـ `node stills.mjs <ثانية>`.

## 5. الهوية

`#2563eb` أساسي · `#123b8f` كحلي · `#facc15` أصفر (ختم "مجانية" فقط) · `#0f172a` نص · `#f0f7ff` خلفية.
خطوط: Noto Kufi Arabic Black، IBM Plex Sans Arabic، IBM Plex Mono (كلها بترخيص SIL OFL، مضمّنة في `public/fonts`).

## 6. حل المشاكل

- `remotion.media` ما يتفتحش: `npm i @sparticuz/chromium` ثم `CHROMIUM_PATH=<executablePath> node render.mjs`.
- الرندر وقف: عاود `node render.mjs`، الأجزاء الخالصة تتخطّى.
- `handle@` بدل `@handle`: ضيف `direction: 'ltr'` على العنصر.
- النص العربي ينزل لسطرين: `whiteSpace: 'nowrap'` وصغّر الخط.

## 7. قبل النشر

- `mhaf.app/skill` في `src/copy.ts` رابط **مؤقت**: بدّلو.
- مشهد الإعلان فيه "1,899 ريال" كمثال: بدّلو أو شيلو.
- أضف ملف `LICENSE` تختارو أنت.
