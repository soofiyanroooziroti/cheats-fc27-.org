export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'FC 27 Cheats for Windows PC | Mod Menu and Pricing',
    description:
      'FC 27 cheats with a Windows PC mod menu for EA SPORTS FC 27. Career, Ultimate Team, and Pro Clubs in one loader. Separate checkout per product.',
  },
  '/products/fc27-cheats/': {
    title: 'Products & Pricing | Monthly and Lifetime Plans',
    description:
      'EA SPORTS FC 27 on Windows PC: cheat and UGC at $35 for 31 days or $150 lifetime; HWID spoofer at $50 for 31 days or $150 lifetime. Separate checkouts.',
  },
  '/products/fc27-cheats/loader/': {
    title: 'FC27 Mod Menu | Match & Career Assists',
    description:
      'FC27 mod menu with loader groups for match play, Career, and Ultimate Team. Monthly $35. Lifetime $150. Read the status note after EA Javelin or client updates.',
  },
  '/products/fc27-cheats/hwid-spoofer/': {
    title: 'FC27 HWID Spoofer for Windows Hardware Flags',
    description:
      'FC27 hwid spoofer for players facing a hardware flag on PC. $50 for 31 days or $150 lifetime. Profile rotation on a PC—not for account-only bans.',
  },
  '/products/fc27-cheats/ugc/': {
    title: 'FC27 Account Recovery Tool for PC Appeals',
    description:
      'FC27 account recovery tool organizes ban appeals and recovery cases. Separate license from the loader and the HWID spoofer on a PC.',
  },
  '/products/fc27-cheats/utilities/': {
    title: 'Compare the HWID Tool and Account Appeal Utility',
    description:
      'See which Windows utility fits a hardware flag and which one fits an account appeal. Both are separate checkouts from the loader.',
  },
    '/blog/': {
      title: 'Guides – patch-day checks before you launch EA SPORTS FC',
      description:
        'Guides on Ultimate Team, Career Mode, Pro Clubs, HWID flags, and patch-day checks before you launch EA SPORTS FC 27 on Windows PC worldwide.',
    },
  '/forum/': {
    title: 'Community Forum: Setup, Menu, and Plans',
    description:
      'Forum threads on the loader, gameplay assists, $35 for 31 days and $150 lifetime plans, and EA Javelin patch days. Developer replies are marked.',
  },
    '/faq/': {
      title: 'Ea Javelin – Plans, Setup, and Ban Risk Before Checkout',
      description:
        'Ea Javelin: Answers on checkout, client updates, Windows PC requirements, hardware flags, and how the loader, spoofer, and account tool differ.',
    },
  '/support/': {
    title: 'Support: Loader, Checkout, and HWID PC',
    description:
      'Loader, checkout, and portal help for PC tools, the HWID spoofer, and account appeals. Include your order email and the exact loader.',
  },
    '/about/': {
      title: 'Store – cheatsfc27.org sells EA SPORTS FC 27 on PC',
      description:
        'Store: What cheatsfc27.org sells for EA SPORTS FC 27 on Windows PC, how portal delivery works, EA Javelin risks, and the loader, spoofer, and UGC.',
    },
  '/privacy/': {
    title: 'Privacy notes for analytics, cookies, and contact data',
    description:
      'How cheatsfc27.org handles analytics, cookies, and contact data. Payment card numbers stay on the checkout provider, not on this store.',
  },
  '/terms/': {
    title: 'License terms, refunds, and acceptable use rules',
    description:
      'License terms, acceptable use, and the no-refund rule for the loader, HWID spoofer, and account recovery sold through cheatsfc27.org.',
  },
  '/status/': {
    title: 'EA Javelin Patch Notes & Client Status',
    description:
      'Title Update v1.1.0 (Oct 27, 2026) for EA SPORTS FC 27: QoL, Career UI, Clubs fixes, and EA Javelin security. Check before launch.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
