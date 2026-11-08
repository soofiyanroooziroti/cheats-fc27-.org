import { defaultLocale, getTranslations, type Locale } from '../i18n';

export interface ShopHeroFaqItem {
  q: string;
  a: string;
}

export interface ShopHeroFaqCopy {
  eyebrow?: string;
  title?: string;
  items?: ShopHeroFaqItem[];
}

export interface ShopHeroInfoBlock {
  title: string;
  body: string;
}

export interface ShopHeroInfoCopy {
  eyebrow?: string;
  title?: string;
  blocks?: ShopHeroInfoBlock[];
}

type ProductUiExtras = {
  shopHeroFaq?: ShopHeroFaqCopy;
  shopHeroFaqHwidSpoofer?: ShopHeroFaqCopy;
  shopHeroInfoUgc?: ShopHeroInfoCopy;
};

function productUi(locale: Locale): ProductUiExtras | undefined {
  return getTranslations(locale).productUi as ProductUiExtras | undefined;
}

export function getShopHeroFaqCopy(locale: Locale, slug: string): ShopHeroFaqCopy | undefined {
  const key = slug === 'hwid-spoofer' ? 'shopHeroFaqHwidSpoofer' : slug === 'loader' ? 'shopHeroFaq' : undefined;
  if (!key) return undefined;
  const copy = productUi(locale)?.[key] ?? productUi(defaultLocale)?.[key];
  return copy;
}

export function getShopHeroFaqSchemaItems(locale: Locale, slug: string) {
  const items = getShopHeroFaqCopy(locale, slug)?.items ?? [];
  return items.map((item, i) => ({
    num: String(i + 1).padStart(2, '0'),
    q: item.q,
    a: item.a.replace(/<[^>]+>/g, ''),
  }));
}

export function getShopHeroInfoCopy(locale: Locale): ShopHeroInfoCopy | undefined {
  return productUi(locale)?.shopHeroInfoUgc ?? productUi(defaultLocale)?.shopHeroInfoUgc;
}
