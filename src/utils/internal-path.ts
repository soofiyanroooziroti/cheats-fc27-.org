import { PRODUCT_BASE } from '../config/site';

export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

export const LEGACY_PATH_MAP: Record<string, string> = {
  /** Template / older DayZ URLs from markdown and translations → FC 27 product base */
  '/products/dayz-cheats': PRODUCT_BASE,
  '/products/dayz-cheats/': PRODUCT_BASE,
  '/products/dayz-cheats/dayz-cheats': `${PRODUCT_BASE}loader/`,
  '/products/dayz-cheats/dayz-cheats/': `${PRODUCT_BASE}loader/`,
  '/products/dayz-cheats/hwid-spoofer': `${PRODUCT_BASE}hwid-spoofer/`,
  '/products/dayz-cheats/hwid-spoofer/': `${PRODUCT_BASE}hwid-spoofer/`,
  '/products/dayz-cheats/ugc': PRODUCT_BASE,
  '/products/dayz-cheats/ugc/': PRODUCT_BASE,
  '/products/dayz-cheats/utilities': `${PRODUCT_BASE}utilities/`,
  '/products/dayz-cheats/utilities/': `${PRODUCT_BASE}utilities/`,
  '/cheats': PRODUCT_BASE,
  '/cheats/': PRODUCT_BASE,
  '/cheats/lite': PRODUCT_BASE,
  '/cheats/lite/': PRODUCT_BASE,
  '/cheats/pro': PRODUCT_BASE,
  '/cheats/pro/': PRODUCT_BASE,
  '/cheats/elite': `${PRODUCT_BASE}loader/`,
  '/cheats/elite/': `${PRODUCT_BASE}loader/`,
  '/cheats/compare': '/blog/',
  '/cheats/compare/': '/blog/',
  '/contact': '/support/',
  '/contact/': '/support/',
};

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  pathname = LEGACY_PATH_MAP[pathname] ?? LEGACY_PATH_MAP[withSlash] ?? pathname;

  return withTrailingSlash(pathname) + hash;
}
