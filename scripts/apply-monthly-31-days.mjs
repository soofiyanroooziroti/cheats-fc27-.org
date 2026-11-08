/**
 * One-off maintenance: monthly plan copy = 31 days (not 30). Safe to re-run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/** Order matters: longer phrases first. */
const globalReplacements = [
  ['USD · 30 days (P30D)', 'USD · 31 days (P31D)'],
  ['$35 monthly or $150 lifetime', '$35 for 31 days or $150 lifetime'],
  ['$50 monthly or $150 lifetime', '$50 for 31 days or $150 lifetime'],
  ['$35 monthly and $150 lifetime', '$35 for 31 days and $150 lifetime'],
  ['$35 monthly & $150 lifetime', '$35 for 31 days & $150 lifetime'],
  ['at $35 monthly or $150 lifetime', 'at $35 for 31 days or $150 lifetime'],
  ['at $50 monthly or $150 lifetime', 'at $50 for 31 days or $150 lifetime'],
  ['at $35 monthly', 'at $35 for 31 days'],
  ['at $50 monthly', 'at $50 for 31 days'],
  ['$35 monthly', '$35 for 31 days'],
  ['$50 monthly', '$50 for 31 days'],
  ['P30D', 'P31D'],
];

const localeReplacements = {
  es: [
    ['$35 monthly o $150 lifetime', '$35 por 31 días o $150 lifetime'],
    ['$50 monthly o $150 lifetime', '$50 por 31 días o $150 lifetime'],
    ['$35 monthly y $150 lifetime', '$35 por 31 días y $150 lifetime'],
    ['50 $ monthly o $150 lifetime', '50 $ por 31 días o $150 lifetime'],
    ['Monthly está $35 y lifetime está $150', 'Monthly son $35 por 31 días y lifetime $150'],
    ['$50 monthly o $150 lifetime', '$50 por 31 días o $150 lifetime'],
    ['El spoofer monthly cuesta $50; el truco y UGC monthly son $35', 'El spoofer cuesta $50 por 31 días; truco y UGC son $35 por 31 días'],
  ],
  pt: [
    ['$35 monthly ou $150 lifetime', '$35 por 31 dias ou $150 lifetime'],
    ['$50 monthly ou $150 lifetime', '$50 por 31 dias ou $150 lifetime'],
    ['Monthly é $35 e lifetime é $150', 'Monthly é $35 por 31 dias e lifetime é $150'],
    ['$50 monthly ou $150 lifetime', '$50 por 31 dias ou $150 lifetime'],
    ['O spoofer monthly custa $50; o cheat e UGC monthly são $35', 'O spoofer custa $50 por 31 dias; cheat e UGC são $35 por 31 dias'],
  ],
  fr: [
    ['$35 monthly ou $150 lifetime', '$35 pour 31 jours ou $150 lifetime'],
    ['50 $ monthly ou $150 lifetime', '50 $ pour 31 jours ou $150 lifetime'],
    ['$50 monthly ou $150 lifetime', '$50 pour 31 jours ou $150 lifetime'],
    ['Monthly est $35 et lifetime est $150', 'Monthly est $35 pour 31 jours et lifetime est $150'],
    ['Le spoofer monthly coûte 50 $; le cheat et UGC monthly sont $35', 'Le spoofer coûte 50 $ pour 31 jours; cheat et UGC sont $35 pour 31 jours'],
  ],
  de: [
    ['$35 monthly oder $150 lifetime', '$35 für 31 Tage oder $150 lifetime'],
    ['$50 monthly oder $150 lifetime', '$50 für 31 Tage oder $150 lifetime'],
    ['Monthly ist $35 und lifetime ist $150', 'Monthly ist $35 für 31 Tage und lifetime ist $150'],
    ['50 $ monthly oder $150 lifetime', '50 $ für 31 Tage oder $150 lifetime'],
    ['Der Spoofer monthly kostet 50 $; Cheat und UGC monthly sind $35', 'Der Spoofer kostet 50 $ für 31 Tage; Cheat und UGC sind $35 für 31 Tage'],
  ],
  it: [
    ['$35 monthly o $150 lifetime', '$35 per 31 giorni o $150 lifetime'],
    ['$50 monthly o $150 lifetime', '$50 per 31 giorni o $150 lifetime'],
    ['Monthly è $35 e lifetime è $150', 'Monthly è $35 per 31 giorni e lifetime è $150'],
    ['50$ monthly o $150 lifetime', '50$ per 31 giorni o $150 lifetime'],
    ['Lo spoofer monthly costa $50; il cheat e UGC monthly sono $35', 'Lo spoofer costa $50 per 31 giorni; cheat e UGC sono $35 per 31 giorni'],
  ],
  ar: [
    ['$35 monthly أو $150 lifetime', '$35 لمدة 31 يوماً أو $150 lifetime'],
    ['50$ monthly أو $150 lifetime', '50$ لمدة 31 يوماً أو $150 lifetime'],
    ['$50 monthly أو $150 lifetime', '$50 لمدة 31 يوماً أو $150 lifetime'],
    ['Monthly هو $35 وlifetime هو $150', 'Monthly هو $35 لمدة 31 يوماً وlifetime هو $150'],
  ],
  ja: [
    ['$35 monthlyまたは$150 lifetime', '$35（31日間）または$150 lifetime'],
    ['$50 monthlyまたは$150 lifetime', '$50（31日間）または$150 lifetime'],
    ['50ドルmonthlyまたは$150 lifetime', '31日間$50または$150 lifetime'],
    ['Monthly は $35 であり', 'Monthly は 31日間 $35 であり'],
  ],
  ko: [
    ['$35 monthly 또는 $150 lifetime', '31일 $35 또는 $150 lifetime'],
    ['$50 monthly 또는 $150 lifetime', '31일 $50 또는 $150 lifetime'],
    ['Monthly은 $35이며 lifetime', 'Monthly(31일)은 $35이며 lifetime'],
    ['Monthly은 $35이며 lifetime는 치트 카드에서 $150입니다.', 'Monthly(31일)은 $35이며 lifetime는 치트 카드에서 $150입니다.'],
    ['HWID spoofer은 별도의 카드로 $50 monthly 또는 $150 lifetime', 'HWID spoofer은 별도 카드에서 31일 $50 또는 $150 lifetime'],
  ],
};

const enForumReplacements = [
  ['Monthly is $35 and lifetime is $150 on the cheat card.', 'Monthly is $35 for 31 days and lifetime is $150 on the cheat card.'],
  [
    'The spoofer monthly is $50; cheat and UGC monthly are $35.',
    'The spoofer is $50 for 31 days; cheat and UGC are $35 for 31 days.',
  ],
  [
    'The HWID spoofer is $50 monthly or $150 lifetime on its own card.',
    'The HWID spoofer is $50 for 31 days or $150 lifetime on its own card.',
  ],
];

const forumReplacementsByLocale = {
  en: enForumReplacements,
  es: [
    ['Monthly está $35 y lifetime está $150', 'Monthly son $35 por 31 días y lifetime $150'],
    ['El HWID spoofer cuesta $50 monthly o $150 lifetime', 'El HWID spoofer cuesta $50 por 31 días o $150 lifetime'],
  ],
  pt: [
    ['Monthly é $35 e lifetime é $150', 'Monthly é $35 por 31 dias e lifetime é $150'],
    ['O HWID spoofer custa $50 monthly ou $150 lifetime', 'O HWID spoofer custa $50 por 31 dias ou $150 lifetime'],
  ],
  fr: [
    ['Monthly est $35 et lifetime est $150', 'Monthly est $35 pour 31 jours et lifetime est $150'],
    ['Le HWID spoofer coûte 50 $ monthly ou $150 lifetime', 'Le HWID spoofer coûte 50 $ pour 31 jours ou $150 lifetime'],
  ],
  de: [
    ['Monthly ist $35 und lifetime ist $150', 'Monthly ist $35 für 31 Tage und lifetime ist $150'],
    ['Der HWID spoofer kostet 50 $ monthly oder $150 lifetime', 'Der HWID spoofer kostet 50 $ für 31 Tage oder $150 lifetime'],
  ],
  it: [
    ['Monthly è $35 e lifetime è $150', 'Monthly è $35 per 31 giorni e lifetime è $150'],
    ['HWID spoofer costa $50 monthly o $150 lifetime', 'HWID spoofer costa $50 per 31 giorni o $150 lifetime'],
  ],
  ar: [
    ['Monthly هو $35 وlifetime هو $150', 'Monthly هو $35 لمدة 31 يوماً وlifetime هو $150'],
    ['HWID spoofer هو 50 دولاراً monthly أو $150 lifetime', 'HWID spoofer هو 50 دولاراً لمدة 31 يوماً أو $150 lifetime'],
  ],
  ja: [
    ['Monthly は $35 であり', 'Monthly（31日間）は $35 であり'],
    ['HWID spooferは $50 monthlyまたは$150 lifetime', 'HWID spooferは 31日間 $50 または $150 lifetime'],
  ],
  ko: [
    ['Monthly은 $35이며 lifetime는 치트 카드에서 $150입니다', 'Monthly(31일)은 $35이며 lifetime는 치트 카드에서 $150입니다'],
    ['HWID spoofer은 별도의 카드로 $50 monthly 또는 $150 lifetime', 'HWID spoofer은 별도 카드에서 31일 $50 또는 $150 lifetime'],
  ],
};

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue;
      walk(p, acc);
    } else if (/\.(json|ts|md|mjs)$/.test(ent.name)) {
      acc.push(p);
    }
  }
  return acc;
}

function applyReplacements(text, pairs) {
  let out = text;
  for (const [from, to] of pairs) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

const files = walk(path.join(root, 'src')).concat(
  [
    path.join(root, 'scripts', 'protected-terms.json'),
    path.join(root, 'scripts', 'gemini-protect.mjs'),
    path.join(root, 'scripts', 'translate.mjs'),
    path.join(root, 'src', 'i18n', 'protected.ts'),
  ].filter((p) => fs.existsSync(p)),
);

let changed = 0;
for (const file of files) {
  if (file.includes('apply-monthly-31-days.mjs')) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  text = applyReplacements(text, globalReplacements);
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const locale = rel.match(/i18n\/(?:forum\/)?([a-z]{2})\.json/)?.[1];
  if (locale && localeReplacements[locale]) {
    text = applyReplacements(text, localeReplacements[locale]);
  }
  const forumLocale = rel.match(/^src\/i18n\/forum\/([a-z]{2})\.json$/)?.[1];
  if (forumLocale && forumReplacementsByLocale[forumLocale]) {
    text = applyReplacements(text, forumReplacementsByLocale[forumLocale]);
  }
  if (text !== before) {
    fs.writeFileSync(file, text, 'utf8');
    changed++;
    console.log('updated', rel);
  }
}

console.log(`Done. ${changed} file(s) updated.`);
