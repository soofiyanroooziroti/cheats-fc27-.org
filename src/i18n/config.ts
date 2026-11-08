export const defaultLocale = 'en' as const;

export interface LocaleConfigEntry {
  code: string;
  urlPrefix: string;
  nativeName: string;
  shortLabel: string;
  hreflang: string;
  htmlLang: string;
  dir: 'ltr' | 'rtl';
  ogLocale: string;
  /** When true, use system UI fonts only (no Manrope/Rajdhani files). */
  systemFontsOnly?: boolean;
}

/**
 * Shipped languages. URL prefix matches `code`.
 * Non-English locales stay in English until `src/i18n/{code}.json` (and seo/product/forum) is filled.
 * Keyword maps are not part of these files — translate the copy yourself.
 */
export const localeConfig: readonly LocaleConfigEntry[] = [
  {
    code: 'en',
    urlPrefix: '',
    nativeName: 'English',
    shortLabel: 'EN',
    hreflang: 'en',
    htmlLang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
  },
  {
    code: 'es',
    urlPrefix: 'es',
    nativeName: 'Español',
    shortLabel: 'ES',
    hreflang: 'es',
    htmlLang: 'es',
    dir: 'ltr',
    ogLocale: 'es_ES',
  },
  {
    code: 'pt',
    urlPrefix: 'pt',
    nativeName: 'Português',
    shortLabel: 'PT',
    hreflang: 'pt',
    htmlLang: 'pt',
    dir: 'ltr',
    ogLocale: 'pt_BR',
  },
  {
    code: 'fr',
    urlPrefix: 'fr',
    nativeName: 'Français',
    shortLabel: 'FR',
    hreflang: 'fr',
    htmlLang: 'fr',
    dir: 'ltr',
    ogLocale: 'fr_FR',
  },
  {
    code: 'de',
    urlPrefix: 'de',
    nativeName: 'Deutsch',
    shortLabel: 'DE',
    hreflang: 'de',
    htmlLang: 'de',
    dir: 'ltr',
    ogLocale: 'de_DE',
  },
  {
    code: 'it',
    urlPrefix: 'it',
    nativeName: 'Italiano',
    shortLabel: 'IT',
    hreflang: 'it',
    htmlLang: 'it',
    dir: 'ltr',
    ogLocale: 'it_IT',
  },
  {
    code: 'ar',
    urlPrefix: 'ar',
    nativeName: 'العربية',
    shortLabel: 'AR',
    hreflang: 'ar',
    htmlLang: 'ar',
    dir: 'rtl',
    ogLocale: 'ar_SA',
    systemFontsOnly: true,
  },
  {
    code: 'ja',
    urlPrefix: 'ja',
    nativeName: '日本語',
    shortLabel: 'JA',
    hreflang: 'ja',
    htmlLang: 'ja',
    dir: 'ltr',
    ogLocale: 'ja_JP',
    systemFontsOnly: true,
  },
  {
    code: 'ko',
    urlPrefix: 'ko',
    nativeName: '한국어',
    shortLabel: 'KO',
    hreflang: 'ko',
    htmlLang: 'ko',
    dir: 'ltr',
    ogLocale: 'ko_KR',
    systemFontsOnly: true,
  },
] as const satisfies readonly LocaleConfigEntry[];
