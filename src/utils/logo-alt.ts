const LOCALE_PREFIX = /^\/(es|pt|fr|de|it|ar|ja|ko)(?=\/|$)/;

function barePath(pathname: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX, '') || '/';
  if (stripped === '/') return '/';
  return stripped.endsWith('/') ? stripped : `${stripped}/`;
}

/** One descriptive alt per audited URL so the logo is not an empty image. */
export function logoAltForPath(pathname: string): string {
  const path = barePath(pathname);

  if (path === '/') return 'FC27 Cheats – logo';
  if (path === '/products/fc27-cheats/') return 'Products – logo';
  if (path === '/products/fc27-cheats/loader/') return 'FC27 Mod Menu – logo';
  if (path === '/products/fc27-cheats/hwid-spoofer/') return 'FC27 HWID Spoofer – logo';
  if (path === '/products/fc27-cheats/ugc/') return 'FC27 Account Recovery Tool – logo';
  if (path === '/blog/') return 'Guides – logo';
  if (path === '/forum/') return 'Forum – logo';
  if (path === '/faq/') return 'Faq – logo';
  if (path === '/support/') return 'Support – logo';
  return 'FC27 Cheats logo';
}
