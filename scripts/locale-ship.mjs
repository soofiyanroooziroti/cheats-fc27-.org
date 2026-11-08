/**
 * Keep non-default locale codes in sync with src/i18n/config.ts.
 * Empty JSON shells are the translation structure. Fill them from the terminal; do not inject keyword lists.
 */
export const defaultLocale = 'en';

export const shipLocales = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ar', 'ja', 'ko'];

export const nonDefaultShipLocales = shipLocales.filter((l) => l !== defaultLocale);

/** Human-readable names for translate.mjs prompts. */
export const langName = {
  es: 'Spanish',
  pt: 'Portuguese',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  ar: 'Arabic',
  ja: 'Japanese',
  ko: 'Korean',
};

export function localeFromPathname(pathname) {
  const seg = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  if (seg && nonDefaultShipLocales.includes(seg)) return seg;
  return defaultLocale;
}
