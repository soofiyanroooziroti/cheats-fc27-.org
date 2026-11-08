import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { defaultLocale, isLocale, locales, type Locale } from '../../i18n/locales';
import { blogDateToIso, blogDateToTimestamp } from './dates';
import type { BlogPostFull } from './types';

const loaderDir = path.dirname(fileURLToPath(import.meta.url));
/** In dev this resolves to src/; in the production chunk import.meta.url points under dist, so prefer cwd(). */
const srcDirFromThisFile = path.join(loaderDir, '../..');
const srcDir = fs.existsSync(path.join(srcDirFromThisFile, 'content', 'blog'))
  ? srcDirFromThisFile
  : path.join(cwd(), 'src');
const blogContentRoot = path.join(srcDir, 'content', 'blog');

function loadMarkdownFromDisk(): Record<string, string> {
  const out: Record<string, string> = {};
  if (!fs.existsSync(blogContentRoot)) return out;
  const walk = (dir: string) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.isFile() && ent.name.endsWith('.md')) {
        const relFromSrc = path.relative(srcDir, full).replace(/\\/g, '/');
        const key = path.join('..', '..', relFromSrc).replace(/\\/g, '/');
        out[key] = fs.readFileSync(full, 'utf8');
      }
    }
  };
  walk(blogContentRoot);
  return out;
}

const viteGlob =
  typeof import.meta.glob === 'function'
    ? import.meta.glob<string>('../../content/blog/**/*.md', {
        query: '?raw',
        import: 'default',
        eager: true,
      })
    : {};

const rawModules: Record<string, string> =
  Object.keys(viteGlob).length > 0 ? viteGlob : loadMarkdownFromDisk();

function parseFrontmatter(raw: string): BlogPostFull {
  const text = raw.replace(/^\uFEFF/, '');
  if (!text.startsWith('---')) {
    throw new Error('Blog markdown missing frontmatter');
  }
  const end = text.indexOf('\n---', 3);
  const data = JSON.parse(text.slice(3, end)) as BlogPostFull;
  return data;
}

function localeFromModulePath(modulePath: string): Locale | null {
  const match = modulePath.match(/content\/blog\/([^/]+)\/[^/]+\.md$/);
  const code = match?.[1];
  return isLocale(code) ? code : null;
}

function slugFromModulePath(modulePath: string): string | null {
  const match = modulePath.match(/\/([^/]+)\.md$/);
  return match?.[1] ?? null;
}

const postsByLocale = new Map<Locale, BlogPostFull[]>();
const slugLocales = new Map<string, Set<Locale>>();

for (const [modulePath, raw] of Object.entries(rawModules)) {
  const normalizedPath = modulePath.replace(/\\/g, '/');
  const contentIdx = normalizedPath.indexOf('content/blog/');
  const pathForParsing = contentIdx >= 0 ? normalizedPath.slice(contentIdx) : normalizedPath;
  const locale = localeFromModulePath(pathForParsing);
  const slug = slugFromModulePath(pathForParsing);
  if (!locale || !slug) continue;
  const post = parseFrontmatter(raw);
  post.slug = post.slug || slug;
  if (!post.dateIso && post.date) {
    post.dateIso = blogDateToIso(post.date);
  }
  const list = postsByLocale.get(locale) ?? [];
  list.push(post);
  postsByLocale.set(locale, list);
  const set = slugLocales.get(post.slug) ?? new Set<Locale>();
  set.add(locale);
  slugLocales.set(post.slug, set);
}

for (const post of postsByLocale.get(defaultLocale) ?? []) {
  const set = slugLocales.get(post.slug) ?? new Set<Locale>();
  for (const locale of locales) set.add(locale);
  slugLocales.set(post.slug, set);
}

const enBySlug = new Map((postsByLocale.get(defaultLocale) ?? []).map((p) => [p.slug, p]));
for (const [locale, list] of postsByLocale) {
  if (locale === defaultLocale) continue;
  for (const post of list) {
    const ts = blogDateToTimestamp(post.dateIso ?? post.date);
    if (ts > 0) continue;
    const en = enBySlug.get(post.slug);
    if (!en) continue;
    const enTs = blogDateToTimestamp(en.dateIso ?? en.date);
    if (enTs > 0) {
      post.dateIso = en.dateIso ?? blogDateToIso(en.date);
    }
  }
}

for (const [locale, list] of postsByLocale) {
  list.sort(
    (a, b) =>
      blogDateToTimestamp(b.dateIso ?? b.date) - blogDateToTimestamp(a.dateIso ?? a.date),
  );
  postsByLocale.set(locale, list);
}

export function getBlogLocalesForSlug(slug: string): Locale[] {
  return [...(slugLocales.get(slug) ?? new Set<Locale>([defaultLocale]))];
}

export function getBlogPostsForLocale(locale: Locale): BlogPostFull[] {
  const english = postsByLocale.get(defaultLocale) ?? [];
  if (locale === defaultLocale) return english;
  const own = new Map((postsByLocale.get(locale) ?? []).map((post) => [post.slug, post]));
  return english.map((post) => own.get(post.slug) ?? post);
}

export function getBlogPost(locale: Locale, slug: string): BlogPostFull | undefined {
  const own = (postsByLocale.get(locale) ?? []).find((post) => post.slug === slug);
  if (own) return own;
  if (locale === defaultLocale) return undefined;
  return (postsByLocale.get(defaultLocale) ?? []).find((post) => post.slug === slug);
}

export function getAllBlogSlugs(locale: Locale = defaultLocale): string[] {
  return getBlogPostsForLocale(locale).map((p) => p.slug);
}

export function getPrefixedBlogStaticPaths(): { slug: string; locale: Locale }[] {
  const paths: { slug: string; locale: Locale }[] = [];
  for (const [slug, locs] of slugLocales) {
    for (const locale of locs) {
      if (locale !== defaultLocale) {
        paths.push({ slug, locale });
      }
    }
  }
  return paths;
}
