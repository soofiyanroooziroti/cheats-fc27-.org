/**
 * Sync non-English seo/*.json titles (and meta descriptions) from en.json
 * so primary SEO keywords stay English on every locale route.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const seoDir = path.join(root, 'src/i18n/seo');
const en = JSON.parse(fs.readFileSync(path.join(seoDir, 'en.json'), 'utf8'));
const locales = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt'];

for (const locale of locales) {
  const file = path.join(seoDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.site.title = en.site.title;
  data.site.description = en.site.description;
  for (const [pagePath, enPage] of Object.entries(en.pages)) {
    if (!data.pages[pagePath]) continue;
    data.pages[pagePath].title = enPage.title;
    data.pages[pagePath].description = enPage.description;
  }
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`synced ${locale}`);
}
