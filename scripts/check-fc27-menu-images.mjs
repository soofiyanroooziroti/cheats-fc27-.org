/**
 * Guardrails for fc27-menu-*.webp usage: one public path each, unique alts per slide list,
 * homepage hero disjoint from other homepage blocks, lazy-loading patterns in gallery/slider source.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function fail(msg) {
  console.error(`check-fc27-menu-images: ${msg}`);
  process.exit(1);
}

const catalogPath = 'src/data/product-catalog-en.ts';
const catalog = read(catalogPath);

const publicDir = path.join(root, 'public', 'images', 'products');
const onDisk = fs
  .readdirSync(publicDir)
  .filter((name) => /^fc27-menu-.*\.webp$/i.test(name))
  .sort();

const expectedOnDisk = ['fc27-menu-clubs.webp', 'fc27-menu-fut.webp', 'fc27-menu-gameplay.webp', 'fc27-menu-misc.webp', 'fc27-menu-utils.webp'];
if (onDisk.join(',') !== expectedOnDisk.join(',')) {
  fail(`expected exactly ${expectedOnDisk.join(', ')} in public/images/products, got ${onDisk.join(', ')}`);
}

const srcHits = [];
for (const file of walk('src')) {
  if (!/\.(astro|ts|tsx|js|mjs)$/.test(file)) continue;
  const text = read(file);
  const re = /\/images\/products\/fc27-menu-[a-z]+\.webp/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    srcHits.push({ file, src: m[0] });
  }
}

const badPath = srcHits.filter((h) => !/^\/images\/products\/fc27-menu-(fut|gameplay|clubs|utils|misc)\.webp$/.test(h.src));
if (badPath.length) {
  fail(`non-canonical menu paths: ${JSON.stringify(badPath)}`);
}

const dataOnly = srcHits.every((h) => h.file.startsWith('src/data/'));
if (!dataOnly) {
  const offenders = [...new Set(srcHits.filter((h) => !h.file.startsWith('src/data/')).map((h) => h.file))];
  fail(`fc27-menu paths must only appear in src/data, not: ${offenders.join(', ')}`);
}

function extractSlideArray(source, exportName) {
  const re = new RegExp(`export const ${exportName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`);
  const match = source.match(re);
  if (!match) fail(`missing export ${exportName}`);
  return match[1];
}

function slideAlts(block) {
  const alts = [];
  const re = /alt:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(block)) !== null) alts.push(m[1]);
  return alts;
}

function slideSrcs(block) {
  const srcs = [];
  const re = /src:\s*FC27_MENU_IMAGES\.(\w+)|src:\s*`[^`]*fc27-menu-(\w+)\.webp`/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    const key = m[1] ?? m[2];
    srcs.push(`/images/products/fc27-menu-${key}.webp`);
  }
  return srcs;
}

function assertUniqueAlts(name, block) {
  const alts = slideAlts(block);
  const seen = new Set();
  for (const alt of alts) {
    if (seen.has(alt)) fail(`duplicate alt in ${name}: "${alt}"`);
    seen.add(alt);
  }
}

const heroBlock = extractSlideArray(catalog, 'cheatHomeHeroSlides');
const menuBlock = extractSlideArray(catalog, 'fc27MenuSlides');
assertUniqueAlts('cheatHomeHeroSlides', heroBlock);
assertUniqueAlts('fc27MenuSlides', menuBlock);

const utilityMatch = catalog.match(/utilitySlides = \{([\s\S]*?)\} as const/);
if (utilityMatch) {
  for (const name of ['spoofer', 'ugc']) {
    const inner = utilityMatch[1];
    const arrMatch = inner.match(new RegExp(`${name}:\\s*\\[([\\s\\S]*?)\\]`));
    if (arrMatch) assertUniqueAlts(`utilitySlides.${name}`, arrMatch[1]);
  }
}

const heroSrcs = slideSrcs(heroBlock);
const menuSrcs = slideSrcs(menuBlock);
if (heroSrcs.includes('/images/products/fc27-menu-utils.webp')) {
  fail('homepage hero must not include utils tab (reserved for loader product gallery)');
}
if (!menuSrcs.includes('/images/products/fc27-menu-utils.webp')) {
  fail('loader gallery must include utils tab');
}
for (const key of ['fut', 'gameplay', 'clubs', 'misc']) {
  const src = `/images/products/fc27-menu-${key}.webp`;
  if (!heroSrcs.includes(src)) {
    fail(`homepage hero must include ${src}`);
  }
}

const homepageSections = [
  'src/components/FeaturesSection.astro',
  'src/components/ProductsSection.astro',
  'src/components/WorkflowSection.astro',
  'src/components/ExploreSection.astro',
  'src/components/ContentSections.astro',
  'src/components/WhySetupSection.astro',
];

for (const rel of homepageSections) {
  const text = read(rel);
  if (/fc27-menu-/.test(text)) {
    fail(`${rel} must not embed fc27-menu images (loader section stays text-only on homepage)`);
  }
}

const imageSlider = read('src/components/ImageSlider.astro');
if (!/loading=\{i === 0 \? 'eager' : 'lazy'\}/.test(imageSlider)) {
  fail('ImageSlider must lazy-load all slides after the first');
}

const gallery = read('src/components/ProductScreenshotGallery.astro');
if (!/loading="eager"/.test(gallery) || !/loading="lazy"/.test(gallery)) {
  fail('ProductScreenshotGallery must eager-load main image and lazy-load thumbnails');
}

const deckDir = path.join(root, 'public', 'videos');
const deckMax = 500 * 1024;
for (const name of ['fc27-loader-deck-bg.mp4', 'fc27-loader-deck-bg.webm']) {
  const file = path.join(deckDir, name);
  if (!fs.existsSync(file)) fail(`missing ${name}`);
  if (fs.statSync(file).size > deckMax) fail(`${name} exceeds 500 KiB`);
}
if (!fs.existsSync(path.join(deckDir, 'fc27-loader-deck-bg-poster.webp'))) {
  fail('missing fc27-loader-deck-bg-poster.webp');
}

console.log('check-fc27-menu-images: ok');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`.replace(/\\/g, '/');
    if (entry.isDirectory()) out.push(...walk(rel));
    else out.push(rel);
  }
  return out;
}
