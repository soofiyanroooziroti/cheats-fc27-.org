import type { AcquisitionStep, ProductSlide, SystemRequirement } from './product-types';
import type { Block } from './product-locale-types';
import { fc27LoaderFeatureGroups } from './fc27-feature-groups';
import { FC27_MENU_IMAGES } from './fc27-menu-images';

/** Loader product gallery — Zadeyo EA SPORTS FC 27 menu screenshots. */
export const fc27MenuSlides: ProductSlide[] = [
  {
    src: FC27_MENU_IMAGES.fut,
    alt: 'EA SPORTS FC 27 Ultimate Team loader menu screenshot',
    caption: 'Ultimate Team (FUT)',
    captionDesc:
      'NoLoss, division and Champions spoofers, draft round controls, pack skip, and instant moments.',
  },
  {
    src: FC27_MENU_IMAGES.gameplay,
    alt: 'EA SPORTS FC 27 gameplay assists loader menu screenshot',
    caption: 'Gameplay',
    captionDesc:
      'AI auto play, player and opponent sliders, skill moves, weak foot, stamina control, and custom tactics.',
  },
  {
    src: FC27_MENU_IMAGES.clubs,
    alt: 'EA SPORTS FC 27 Pro Clubs loader menu screenshot',
    caption: 'Pro Clubs',
    captionDesc:
      'Virtual pro editor, VPRO sliders, PlayStyles, hidden stats, and XP boost for clubs matches.',
  },
  {
    src: FC27_MENU_IMAGES.utils,
    alt: 'EA SPORTS FC 27 utilities loader menu screenshot',
    caption: 'Utilities',
    captionDesc: 'Desync bypass and ALT-TAB bypass toggles for smoother sessions on Windows PC.',
  },
  {
    src: FC27_MENU_IMAGES.misc,
    alt: 'EA SPORTS FC 27 misc and safety loader menu screenshot',
    caption: 'Misc & safety',
    captionDesc:
      'Anti-ban, menu and panic keys, stream-proof mode, hotkeys, save and load config, and cloud status.',
  },
];

/** Home hero slider — loader menu screenshots, uncropped. */
export const cheatHomeHeroSlides: ProductSlide[] = [
  {
    src: FC27_MENU_IMAGES.fut,
    alt: 'FC27 loader Ultimate Team tab',
    caption: 'Ultimate Team',
    captionDesc: 'Ultimate Team tab in the FC27 loader.',
  },
  {
    src: FC27_MENU_IMAGES.gameplay,
    alt: 'FC27 loader Gameplay tab',
    caption: 'Gameplay',
    captionDesc: 'Gameplay tab in the FC27 loader.',
  },
  {
    src: FC27_MENU_IMAGES.clubs,
    alt: 'FC27 loader Pro Clubs tab',
    caption: 'Pro Clubs',
    captionDesc: 'Pro Clubs tab in the FC27 loader.',
  },
  {
    src: FC27_MENU_IMAGES.misc,
    alt: 'FC27 loader Safety tab',
    caption: 'Safety',
    captionDesc: 'Safety tab in the FC27 loader.',
  },
];

export const acquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check status',
    desc: 'Confirm modules are online on cheatsfc27.org before you buy—especially after an EA Javelin or FC 27 client update.',
  },
  {
    num: '02',
    title: 'Pick a plan',
    desc: 'Choose monthly (P31D) or lifetime (P99Y)—same USD pricing on every product in the lineup.',
  },
  {
    num: '03',
    title: 'Secure checkout',
    desc: 'Complete checkout from the product card. Your license unlocks in the portal with instant delivery.',
  },
  {
    num: '04',
    title: 'Install & verify',
    desc: 'Follow the setup guide, load a conservative preset, and test in a friendly match before you use your main profile.',
  },
];

export const utilitySlides = {
  spoofer: [
    {
      src: FC27_MENU_IMAGES.misc,
      alt: 'EA SPORTS FC 27 misc and safety loader menu on Windows PC',
      caption: 'HWID spoofer',
      captionDesc: 'Hardware fingerprint tools before you relaunch.',
    },
    {
      src: FC27_MENU_IMAGES.utils,
      alt: 'EA SPORTS FC 27 utilities loader menu on Windows PC',
      caption: 'Phoenix board',
      captionDesc: 'Disk, MAC, and GPU ID rotation.',
    },
    {
      src: FC27_MENU_IMAGES.gameplay,
      alt: 'EA SPORTS FC 27 gameplay loader menu on Windows PC',
      caption: 'Phoenix WH',
      captionDesc: 'Spoofer workspace used on every store.',
    },
  ],
} as const;

export const cheatsContent = {
  images: [...fc27MenuSlides],
  goodToKnow:
    'EA SPORTS FC 27 and EA Javelin update often. Confirm availability on cheatsfc27.org before you launch. Overlay behavior may differ in menus or spectator views after patches.',
  limitations:
    'Third-party software can violate game terms and lead to bans. You use this software at your own risk. Compatibility can change after game, EA Javelin, or Windows updates without notice.',
  systemRequirements: [
    {
      icon: 'reqShieldGuide',
      text: 'HVCI ON · CORE ISOLATION ON · TPM ON · SECURE BOOT ON',
    },
    {
      icon: 'reqWindows',
      text: 'WINDOWS 10 and 11 both supported',
    },
    {
      icon: 'reqWifiPortal',
      text: 'Cloud DMA — Required for full functionality. All features on supported builds run through Cloud DMA.',
    },
  ] as SystemRequirement[],
  featureGroups: fc27LoaderFeatureGroups,
  overview: {
    title: 'Built for EA SPORTS FC 27 on Windows PC',
    paragraphs: [
      'Checkout unlocks the Windows loader for supported FC 27 builds. Use the preview columns for group names, then open the feature catalog for every toggle and slider.',
      'Check cheatsfc27.org after an EA Javelin or client patch before you launch.',
    ],
  },
  body: [
    { type: 'h2', text: 'Modules included' },
    {
      type: 'p',
      text: 'Windows PC loader with five menu groups on this page: Ultimate Team Options, Utilities, Gameplay Options, Pro Clubs Options, and Safety.',
    },
    { type: 'h2', text: 'Plans' },
    {
      type: 'p',
      text: 'Monthly $35 USD (P31D) or lifetime $150 USD (P99Y). Instant digital delivery worldwide after checkout.',
    },
  ] as Block[],
};

export const spooferContent = {
  images: [...utilitySlides.spoofer],
  goodToKnow:
    'HWID tools change how your PC fingerprint appears—they do not remove account bans by themselves. Follow portal guides before launching FC 27 again.',
  limitations:
    'Spoofing carries technical risk and may violate game terms. Results vary by ban type and driver setup. Use only on systems you own.',
  systemRequirements: [
    { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator rights.' },
    { icon: 'reqRestorePoint', text: 'Create a restore point before running hardware tools.' },
    { icon: 'reqWifi', text: 'Stable internet for activation and verification steps.' },
  ] as SystemRequirement[],
  fullFeatures: [
    'Hardware spoofer with cleaner',
    'Disk serial and MAC rotation',
    'GPU ID profile tools',
    'Compatibility scan',
    'Verification checklist',
    'Portal step-by-step workflow',
    'Discord setup support',
  ],
  overview: {
    title: 'HWID recovery workflow',
    paragraphs: [
      'HWID Spoofer focuses on hardware profile rotation when you need a clean machine context before relaunching FC 27 after a hardware flag.',
      'Monthly and lifetime USD plans use the same checkout flow as the rest of the lineup.',
    ],
  },
  body: [
    { type: 'h2', text: 'When to use it' },
    {
      type: 'p',
      text: 'Use when fresh accounts fail on one PC but work elsewhere—not for account-only bans. Pair with conservative presets after verification.',
    },
    { type: 'h2', text: 'Plans' },
    {
      type: 'p',
      text: 'Monthly $50 USD (P31D) or lifetime $150 USD (P99Y).',
    },
  ] as Block[],
};
