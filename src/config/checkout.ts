import { CHECKOUT_URLS } from './checkout-redirects.mjs';

export const CHECKOUT = CHECKOUT_URLS;

/** Main FC27 cheat card — exact Zadeyo affiliate URL (see checkout-redirects.mjs). */
export const FC27_CHEAT_CHECKOUT_URL = CHECKOUT.fc27;

/** Use the Zadeyo URL on buy buttons — `/go/fc27/` is only a legacy redirect hop. */
export const PRIMARY_CHEAT_CHECKOUT_URL = FC27_CHEAT_CHECKOUT_URL;

export type CheckoutProduct = keyof typeof CHECKOUT;

export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  fc27: 'fc27',
  dayz: 'dayz',
  hwidSpoofer: 'hwid-spoofer',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

export function checkoutPath(product: CheckoutProduct = 'fc27'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

export const PRIMARY_CHECKOUT_PATH = FC27_CHEAT_CHECKOUT_URL;

export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'loader':
    case 'fc27-cheats':
    case 'dayz-cheats':
    default:
      return FC27_CHEAT_CHECKOUT_URL;
  }
}

export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  if (
    href.includes('%2Fproducts%2Fea-sports-fc-27') ||
    href.includes('/products/ea-sports-fc-27') ||
    href.includes('%2Fproducts%2Ffc27') ||
    href.includes('/products/fc27') ||
    href.includes('%2Fproducts%2Fdayz') ||
    href.includes('/products/dayz')
  ) {
    return FC27_CHEAT_CHECKOUT_URL;
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return '/products/fc27-cheats/';
  }

  return href;
}
