import type { Locale } from '../i18n/locales';

/**
 * Compact region codes for flag filenames under `/public/images/flags/`.
 */
export const localeRegionCode: Record<Locale, string> = {
  en: 'US',
  es: 'ES',
  pt: 'BR',
  fr: 'FR',
  de: 'DE',
  it: 'IT',
  ar: 'AE',
  /** Flag asset basename is `jp.svg` (locale code remains `ja`). */
  ja: 'JP',
  ko: 'KR',
};

/** Public URL for the menu flag image (flat SVG, same basename as localeRegionCode lowercased). */
export function localeFlagSrc(code: Locale): string {
  const key = localeRegionCode[code].toLowerCase();
  return `/images/flags/${key}.svg`;
}
