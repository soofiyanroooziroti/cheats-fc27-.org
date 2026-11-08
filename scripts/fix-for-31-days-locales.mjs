import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const map = {
  es: [
    ['$35 for 31 days', '$35 por 31 días'],
    ['$50 for 31 days', '$50 por 31 días'],
  ],
  pt: [
    ['$35 for 31 days', '$35 por 31 dias'],
    ['$50 for 31 days', '$50 por 31 dias'],
  ],
  fr: [
    ['$35 for 31 days', '$35 pour 31 jours'],
    ['$50 for 31 days', '$50 pour 31 jours'],
  ],
  de: [
    ['$35 for 31 days', '$35 für 31 Tage'],
    ['$50 for 31 days', '$50 für 31 Tage'],
  ],
  it: [
    ['$35 for 31 days', '$35 per 31 giorni'],
    ['$50 for 31 days', '$50 per 31 giorni'],
  ],
  ja: [
    ['$35 for 31 days', '31日間$35'],
    ['$50 for 31 days', '31日間$50'],
  ],
  ko: [
    ['$35 for 31 days', '31일 $35'],
    ['$50 for 31 days', '31일 $50'],
  ],
  ar: [
    ['$35 for 31 days', '$35 لمدة 31 يوماً'],
    ['$50 for 31 days', '$50 لمدة 31 يوماً'],
  ],
};

function patchFile(file, pairs, label) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of pairs) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text, 'utf8');
    console.log('fixed', label);
  }
}

for (const [loc, pairs] of Object.entries(map)) {
  patchFile(path.join(root, 'src', 'i18n', `${loc}.json`), pairs, `i18n/${loc}`);
  const forum = path.join(root, 'src', 'i18n', 'forum', `${loc}.json`);
  if (fs.existsSync(forum)) patchFile(forum, pairs, `forum/${loc}`);
  const blogDir = path.join(root, 'src', 'content', 'blog', loc);
  if (fs.existsSync(blogDir)) {
    for (const name of fs.readdirSync(blogDir)) {
      if (name.endsWith('.md')) {
        patchFile(path.join(blogDir, name), pairs, `blog/${loc}/${name}`);
      }
    }
  }
}
