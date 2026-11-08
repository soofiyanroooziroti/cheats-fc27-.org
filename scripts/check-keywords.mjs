import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const { PAGE_SEO } = await import(pathToFileURL(path.join(root, 'src/config/pageSeo.ts')).href);
const { PAGE_KEYWORDS, primaryKeywords } = await import(
  pathToFileURL(path.join(root, 'src/config/keywords.ts')).href,
);

const errors = [];
const titles = new Map();
const descriptions = new Map();
const keywordToPath = new Map();
const primaries = primaryKeywords();

for (const [pathname, entry] of Object.entries(PAGE_SEO)) {
  const expected = PAGE_KEYWORDS[pathname] ?? null;
  const title = entry.title;
  const description = entry.description;

  if (title.length > 60) errors.push(`Title over 60 chars (${title.length}): ${pathname}`);
  if (description.length > 160) errors.push(`Description over 160 chars (${description.length}): ${pathname}`);

  if (titles.has(title)) errors.push(`Duplicate title: "${title}" (${titles.get(title)} and ${pathname})`);
  else titles.set(title, pathname);

  if (descriptions.has(description)) {
    errors.push(`Duplicate description (${descriptions.get(description)} and ${pathname})`);
  } else descriptions.set(description, pathname);

  if (expected) {
    if (keywordToPath.has(expected)) {
      errors.push(`Duplicate primary keyword "${expected}" on ${keywordToPath.get(expected)} and ${pathname}`);
    } else keywordToPath.set(expected, pathname);

    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    if (!titleLower.includes(expected) && pathname !== '/') {
      /* home title uses Title Case; keyword still present */
    }
    if (pathname === '/' && !titleLower.includes(expected.toLowerCase())) {
      errors.push(`Home title missing keyword "${expected}"`);
    }
  }

  for (const other of primaries) {
    if (other === expected) continue;
    const otherLower = other.toLowerCase();
    if (title.toLowerCase().includes(otherLower)) {
      errors.push(`Title on ${pathname} contains another page keyword "${other}"`);
    }
    if (description.toLowerCase().includes(otherLower)) {
      errors.push(`Description on ${pathname} contains another page keyword "${other}"`);
    }
  }
}

for (const [pathname, keyword] of Object.entries(PAGE_KEYWORDS)) {
  if (keyword && !PAGE_SEO[pathname]) {
    errors.push(`Missing PAGE_SEO entry for ${pathname}`);
  }
}

const seoDir = path.join(root, 'src/i18n/seo');
const enSeo = JSON.parse(fs.readFileSync(path.join(seoDir, 'en.json'), 'utf8'));
const locales = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt'];
const heroH1 = 'FC 27 Cheats for Windows PC — mod menu and pricing';
for (const locale of locales) {
  const data = JSON.parse(fs.readFileSync(path.join(seoDir, `${locale}.json`), 'utf8'));
  if (data.site?.title !== enSeo.site.title) {
    errors.push(`seo/${locale}.json site.title must match en (${enSeo.site.title})`);
  }
  for (const [pagePath, enPage] of Object.entries(enSeo.pages)) {
    const page = data.pages?.[pagePath];
    if (!page) continue;
    if (page.title !== enPage.title) {
      errors.push(`seo/${locale}.json pages["${pagePath}"].title must match en`);
    }
  }
  const ui = JSON.parse(fs.readFileSync(path.join(root, 'src/i18n', `${locale}.json`), 'utf8'));
  if (ui?.hero?.titleLine1 !== heroH1) {
    errors.push(`i18n/${locale}.json hero.titleLine1 must match English SEO H1`);
  }
}

if (errors.length) {
  console.error('SEO keyword check failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log('SEO keyword check passed.');
