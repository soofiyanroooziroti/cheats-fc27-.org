/** Canonical FC27 loader menu screenshots — single copy under public/images/products/. */
export const FC27_PRODUCTS_IMAGE_DIR = '/images/products';

export const FC27_MENU_IMAGES = {
  fut: `${FC27_PRODUCTS_IMAGE_DIR}/fc27-menu-fut.webp`,
  gameplay: `${FC27_PRODUCTS_IMAGE_DIR}/fc27-menu-gameplay.webp`,
  clubs: `${FC27_PRODUCTS_IMAGE_DIR}/fc27-menu-clubs.webp`,
  utils: `${FC27_PRODUCTS_IMAGE_DIR}/fc27-menu-utils.webp`,
  misc: `${FC27_PRODUCTS_IMAGE_DIR}/fc27-menu-misc.webp`,
} as const;

export type Fc27MenuImageKey = keyof typeof FC27_MENU_IMAGES;

const CANONICAL_PATTERN = /^\/images\/products\/fc27-menu-(fut|gameplay|clubs|utils|misc)\.webp$/;

export function assertFc27MenuImagePath(src: string): void {
  if (!CANONICAL_PATTERN.test(src)) {
    throw new Error(`FC27 menu image must use canonical path under ${FC27_PRODUCTS_IMAGE_DIR}: ${src}`);
  }
}

/** Homepage hero order (four tabs). Utils is omitted so #home-features stays text-only for that tab. */
export const FC27_HOME_HERO_MENU_KEYS: readonly Fc27MenuImageKey[] = [
  'fut',
  'gameplay',
  'clubs',
  'misc',
] as const;
