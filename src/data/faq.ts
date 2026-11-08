import type { IconName } from '../components/icons/types';
import { normalizeInternalPath } from '../utils/path-core';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'javelin',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Does the FC27 cheat work with EA Javelin?',
    a: 'The loader is for EA SPORTS FC 27 on Windows PC while EA Javelin is running. It does not stop enforcement, and it is not an undetected claim. Read the status page after each client update before you launch.',
    aHtml: `The loader is for EA SPORTS FC 27 on Windows PC while EA Javelin is running. It does not stop enforcement, and it is not an undetected claim. Read the ${link('status page', '/status/')} after each client update before you launch.`,
  },
  {
    id: 'ultimate-team',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What is included in Ultimate Team options?',
    a: 'NoLoss, Division Spoofer, Champions Win/Loss Spoofer, Champions Round Spoofer, Opponent Name / Platform, Draft Round Modifier, Skip Pack Animation, and Instant Moment.',
  },
  {
    id: 'pro-clubs',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Can I use it in Pro Clubs?',
    a: 'Yes. Pro Clubs Options includes Virtual Pro Attribute Editor, VPRO Sliders, PlayStyles, PlayStyles+, Hidden Stats 99, and XP Boost. Gameplay and Ultimate Team are separate tabs.',
  },
  {
    id: 'lifetime-spoofer',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Does the $150 lifetime plan include the spoofer?',
    a: 'No. Lifetime on FC27 Cheats is that product only. The HWID spoofer is $50 for 31 days or $150 lifetime on its own card. UGC recovery is a third checkout.',
    scopes: ['loader', 'hwid-spoofer', 'ugc'],
  },
  {
    id: 'patch-speed',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'How fast are updates after a patch?',
    a: 'There is no fixed hour count. Check the status page after an FC 27 client update. Leave the loader closed until that note matches the build you installed.',
    aHtml: `There is no fixed hour count. Check the ${link('status page', '/status/')} after an FC 27 client update. Leave the loader closed until that note matches the build you installed.`,
  },
  {
    id: 'launchers',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which PC launchers are supported?',
    a: 'EA app, Steam, and Epic Games Store for EA SPORTS FC 27 on Windows PC.',
  },
  {
    id: 'requirements',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'What are the system requirements?',
    a: 'Windows 10 and Windows 11. Keep HVCI, core isolation, TPM, and Secure Boot on. macOS and Linux are not supported.',
  },
  {
    id: 'support',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'How do I get support?',
    a: 'Open the support page with your order email, Windows version, and the exact loader text.',
    aHtml: `Open the ${link('support page', '/support/')} with your order email, Windows version, and the exact loader text.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['javelin', 'ultimate-team', 'pro-clubs', 'lifetime-spoofer', 'patch-speed', 'launchers', 'requirements', 'support'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Plans, safety, products, and setup for EA SPORTS FC 27.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'safety',
  'products',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, _kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter((f) => !f.scopes);
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const combined = [...scoped, ...general];
  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogFaq = (
  id: string,
  icon: IconName,
  q: string,
  a: string,
  aHtml?: string,
): SiteFaqItem => ({ id, topic: 'blog', icon, q, a, aHtml });

/** Article-only. Not listed on the site FAQ page. */
const relatedBlogFaqs: Record<string, SiteFaqItem[]> = {
  'fc-27-ultimate-team-options': [
    blogFaq(
      'rel-ut-1',
      'faqProductsPage',
      'Which Ultimate Team controls does this article cover?',
      'NoLoss, Division Spoofer, Champions Win/Loss and Round spoofers, Opponent Name / Platform, Draft Round Modifier, Skip Pack Animation, and Instant Moment. Names match the loader menu.',
    ),
    blogFaq(
      'rel-ut-2',
      'faqBanRisk',
      'Does Ultimate Team use still carry ban risk?',
      'Yes. Anti-cheat enforcement still applies in Ultimate Team. These options do not make the account undetected. Check status after a Title Update before you launch.',
      `Yes. Anti-cheat enforcement still applies in Ultimate Team. These options do not make the account undetected. Check ${link('status', '/status/')} after a Title Update before you launch.`,
    ),
    blogFaq(
      'rel-ut-3',
      'faqStatus',
      'Are Pro Clubs and gameplay in the same tab?',
      'No. Ultimate Team options are their own group. Gameplay sliders and Pro Clubs stats are separate menu sections.',
    ),
  ],
  'fc-27-gameplay-options': [
    blogFaq(
      'rel-gp-1',
      'faqProductsPage',
      'What counts as a Gameplay Option?',
      'On-pitch controls: player and opponent sliders, skill moves, weak foot, stamina, custom tactics, and AI auto play. Change one toggle per match.',
    ),
    blogFaq(
      'rel-gp-2',
      'faqBanRisk',
      'Is AI auto play safe to leave running?',
      'No. It is a labeled assist with the same ban risk as other match injectors. It is not an unattended win script.',
    ),
    blogFaq(
      'rel-gp-3',
      'faqStatus',
      'Why turn on one slider at a time?',
      'Stacking skills, stamina, and both slider groups at kickoff makes crashes and odd animations hard to trace. Add the next toggle only after the first one behaves.',
    ),
  ],
  'fc-27-pro-clubs-options': [
    blogFaq(
      'rel-pc-1',
      'faqProductsPage',
      'What is in Pro Clubs Options?',
      'Virtual Pro Attribute Editor, VPRO sliders, PlayStyles, PlayStyles+, Hidden Stats 99, and XP Boost. They do not change the Ultimate Team tab.',
    ),
    blogFaq(
      'rel-pc-2',
      'faqBanRisk',
      'Can 99 stats still get the club flagged?',
      'Yes. Clubs still run under the same anti-cheat rules. A high attribute line is visible to the match and is not an undetected claim.',
    ),
    blogFaq(
      'rel-pc-3',
      'faqStatus',
      'Does XP Boost replace match play?',
      'No. It is the XP line in that menu. It does not finish objectives or skip the match itself.',
    ),
  ],
  'fc-27-trainer-career-mode': [
    blogFaq(
      'rel-cm-1',
      'faqProductsPage',
      'Is Career Mode the same menu as Ultimate Team?',
      'No. Use the trainer only on the mode you opened. Career controls are not the Champions or pack shortcuts.',
    ),
    blogFaq(
      'rel-cm-2',
      'faqBanRisk',
      'Does offline Career remove online ban risk?',
      'Launching the client still loads Javelin on PC. Offline play lowers exposure compared with Ultimate Team, and it is not a promise of no enforcement.',
    ),
    blogFaq(
      'rel-cm-3',
      'faqStatus',
      'What should I do after a Title Update?',
      'Leave the loader closed until the status note matches the build you installed. Do not copy slider values from an older post.',
      `Leave the loader closed until the ${link('status note', '/status/')} matches the build you installed. Do not copy slider values from an older post.`,
    ),
  ],
  'fc-27-mod-menu-ultimate-team': [
    blogFaq(
      'rel-mm-1',
      'faqBlogGuideStart',
      'Where do I start in the mod menu?',
      'Open the loader on Windows, confirm the status line, then use the Ultimate Team group by the names printed in the menu. Do not enable every toggle on the first match.',
    ),
    blogFaq(
      'rel-mm-2',
      'faqComparePlans',
      'Do monthly and lifetime unlock different Ultimate Team options?',
      'No. Both plans list the same FC27 Cheats features. Lifetime does not add the HWID spoofer.',
    ),
    blogFaq(
      'rel-mm-3',
      'faqBanRisk',
      'Is a mod menu undetected in Ultimate Team?',
      'No. The menu does not stop enforcement. Read status after each client update and treat online use as ban risk.',
      `No. The menu does not stop enforcement. Read ${link('status', '/status/')} after each client update and treat online use as ban risk.`,
    ),
  ],
  'fc-27-desync-bypass': [
    blogFaq(
      'rel-ds-1',
      'faqProductsPage',
      'Where do Desync Bypass and ALT-TAB Bypass live?',
      'Both are Utilities lines. They are not Ultimate Team spoofers and not Pro Clubs attribute editors.',
    ),
    blogFaq(
      'rel-ds-2',
      'faqBanRisk',
      'Does a bypass remove a ban?',
      'No. A utility toggle does not clear an EA penalty or replace the HWID spoofer. If the account is already restricted, stop and read the ban-fix notes.',
    ),
    blogFaq(
      'rel-ds-3',
      'faqStatus',
      'Should I enable both utilities at once?',
      'Turn on one, confirm the match still loads, then add the other. If the client closes, leave both off and check status.',
      `Turn on one, confirm the match still loads, then add the other. If the client closes, leave both off and check ${link('status', '/status/')}.`,
    ),
  ],
  'fc-27-ban-fix-hwid-spoofer': [
    blogFaq(
      'rel-hw-1',
      'faqBlogSlugHwid',
      'What does the HWID spoofer change?',
      'It rotates the hardware profile the loader presents on Windows. It does not edit the EA account, coins, or a Club.',
    ),
    blogFaq(
      'rel-hw-2',
      'faqComparePlans',
      'Is the spoofer included in the $150 FC27 Cheats lifetime plan?',
      'No. The spoofer is its own checkout: 31 days or lifetime. FC27 Cheats lifetime is the loader only.',
    ),
    blogFaq(
      'rel-hw-3',
      'faqBanRisk',
      'Will a spoof clear every ban type?',
      'No. It is a machine-profile step, not an appeal and not an undetected guarantee. Account and console penalties need a different path.',
    ),
  ],
  'fc-27-cheats-guide': [
    blogFaq(
      'rel-cg-1',
      'faqProductsPage',
      'Which modes does the loader cover?',
      'Ultimate Team options, gameplay sliders, Pro Clubs options, and utilities. Each group is a separate tab.',
    ),
    blogFaq(
      'rel-cg-2',
      'faqBanRisk',
      'Can any setting remove anti-cheat risk?',
      'No. Anti-Ban Protection and the rest of the menu do not make play undetected. Online modes carry more exposure than a local session.',
    ),
    blogFaq(
      'rel-cg-3',
      'faqPlatforms',
      'Which PCs can run it?',
      'Windows 10 and 11 with FC 27 from the EA app, Steam, or Epic. macOS and Linux are not supported. Keep HVCI, TPM, and Secure Boot on.',
    ),
  ],
  'fc-27-ban-fix-guide': [
    blogFaq(
      'rel-bf-1',
      'faqBanRisk',
      'What does Anti-Ban Protection do?',
      'It is the safety toggle described in the loader. It does not delete a ban, hide the account from EA, or promise the client stays unflagged.',
    ),
    blogFaq(
      'rel-bf-2',
      'faqBlogSlugHwid',
      'When is the HWID spoofer the next step?',
      'When the problem is a machine flag, not a menu toggle. The spoofer is a separate product from FC27 Cheats.',
    ),
    blogFaq(
      'rel-bf-3',
      'faqAfterBuy',
      'The loader text does not match this guide. What now?',
      'Stop launching and send support the order email, Windows version, and the exact loader line.',
      `Stop launching and send ${link('support', '/support/')} the order email, Windows version, and the exact loader line.`,
    ),
  ],
  'fc27-javelin-anti-cheat-loader-steps': [
    blogFaq(
      'rel-jv-1',
      'faqAfterBuy',
      'Where do I download the loader?',
      'From the portal tied to your order after checkout on the loader page. Do not use a file from chat or an old folder.',
      `From the portal tied to your order after checkout on the ${link('loader page', '/products/fc27-cheats/loader/')}. Do not use a file from chat or an old folder.`,
    ),
    blogFaq(
      'rel-jv-2',
      'faqProductsPage',
      'What do I do after the menu opens?',
      'Pick one sidebar tab, change one toggle, then save a config. Ultimate Team, Gameplay, Pro Clubs, Utilities, and Safety are separate groups.',
    ),
    blogFaq(
      'rel-jv-3',
      'faqBanRisk',
      'Does this order stop enforcement?',
      'No. FC27 Javelin anti-cheat still applies. Anti-Ban Protection is a menu toggle. It is not an undetected claim. Read status before you launch.',
      `No. FC27 Javelin anti-cheat still applies. Anti-Ban Protection is a menu toggle. It is not an undetected claim. Read ${link('status', '/status/')} before you launch.`,
    ),
  ],
  'best-fc-27-cheats-review-2026': [
    blogFaq(
      'rel-rv-1',
      'faqComparePlans',
      'What do the $35 and $150 plans change?',
      'Access length only. Monthly is 31 days. Lifetime is pay once. The feature list is the same, and neither plan includes the spoofer.',
    ),
    blogFaq(
      'rel-rv-2',
      'faqBanRisk',
      'Does “best” mean undetected?',
      'No. This review compares menu coverage and price. Enforcement can still act on the account. There is no undetected promise.',
    ),
    blogFaq(
      'rel-rv-3',
      'faqStatus',
      'How do I check the build before buying?',
      'Read the status page for Title Update v1.1.0 and later notes, then match that line to the FC 27 build you have installed.',
      `Read the ${link('status page', '/status/')} for Title Update v1.1.0 and later notes, then match that line to the FC 27 build you have installed.`,
    ),
  ],
};

export function getBlogFaqs(_tag: string, slug: string): SiteFaqItem[] {
  return relatedBlogFaqs[slug] ?? [];
}

export const compareRows = [
  { feature: 'Ultimate Team Options', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Utilities', icon: 'featureUtilitySuite' as const, lite: true, pro: true, elite: true },
  { feature: 'Gameplay Options', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Pro Clubs Options', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Safety', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
];
