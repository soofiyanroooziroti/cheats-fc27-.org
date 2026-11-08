/** Primary keyword per core URL (null = no dedicated keyword). */
export const PAGE_KEYWORDS: Record<string, string | null> = {
  '/': 'fc 27 cheats',
  '/products/fc27-cheats/': null,
  '/products/fc27-cheats/loader/': 'fc27 mod menu',
  '/products/fc27-cheats/hwid-spoofer/': 'fc27 hwid spoofer',
  '/products/fc27-cheats/ugc/': 'fc27 account recovery tool',
  '/blog/': null,
};

export const PRODUCT_H1: Record<string, string> = {
  loader: 'FC27 Mod Menu',
  'hwid-spoofer': 'FC27 HWID Spoofer',
  ugc: 'FC27 Account Recovery Tool',
};

export const PRODUCT_PAGE_KEYWORDS: Record<string, string> = {
  loader: 'fc27 mod menu',
  'hwid-spoofer': 'fc27 hwid spoofer',
  ugc: 'fc27 account recovery tool',
};

/** Reserved for future blog URLs — do not use on core product pages. */
export const RESERVED_BLOG_KEYWORDS = [
  'fc27 javelin anti-cheat',
  'fc 27 trainer',
  'fc27 trainer',
  'fc 27 undetected',
  'fc27 undetected',
  'fc 27 ban fix',
  'fc27 ban fix',
  'fc 27 hacks',
  'best undetected fc 27 cheats',
  'ea sports fc 27 cheats',
  'fc 27 ultimate team',
  'fc 27 career mode',
  'fc 27 pro clubs',
] as const;

export function primaryKeywords(): string[] {
  return Object.values(PAGE_KEYWORDS).filter((k): k is string => Boolean(k));
}
