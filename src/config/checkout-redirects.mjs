/** DO NOT CHANGE — sole affiliate URL for the FC27 cheat card (loader). */
export const FC27_CHEAT_AFFILIATE_URL =
  'https://zadeyo.com/go/SOOFIYAN?to=%2Fproducts%2Fea-sports-fc-27';

/** Checkout destinations (Zadeyo affiliate). */
export const CHECKOUT_URLS = {
  fc27: FC27_CHEAT_AFFILIATE_URL,
  dayz: FC27_CHEAT_AFFILIATE_URL,
  hwidSpoofer: 'https://zadeyo.com/go/SOOFIYAN?to=%2Fproducts%2Fhwid-spoofer',
};

export const DISCORD_INVITE_URL = 'https://discord.com/invite/2gMnnaPWq';

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/discord', DISCORD_INVITE_URL],
  ['/go/discord/', DISCORD_INVITE_URL],
  ['/go/fc27', CHECKOUT_URLS.fc27],
  ['/go/fc27/', CHECKOUT_URLS.fc27],
  ['/go/dayz', CHECKOUT_URLS.dayz],
  ['/go/dayz/', CHECKOUT_URLS.dayz],
  ['/go/delta-force', CHECKOUT_URLS.fc27],
  ['/go/delta-force/', CHECKOUT_URLS.fc27],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
