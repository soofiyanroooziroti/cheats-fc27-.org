/**
 * Terms that must stay identical in every locale (translate script + i18n:check).
 * Also exported to scripts/protected-terms.json.
 */

export const PROTECTED_GAME_NAMES = ['FC 27', 'EA Javelin'] as const;

export const PROTECTED_SITE_NAMES = [
  'FC27 Cheats',
  'cheatsfc27.org',
  'dayz-cheats.org',
  'HWID Spoofer',
  'Zadeyo',
] as const;

export const PROTECTED_PRODUCT_NAMES = [
  'FC27 Cheats',
  'HWID Spoofer',
] as const;

export const PROTECTED_CHEAT_TERMS = [
  'NoLoss',
  'Division Spoofer',
  'Champions Win/Loss Spoofer',
  'Champions Round Spoofer',
  'Draft Round Modifier',
  'Skip Pack Animation',
  'Instant Moment',
  'Desync Bypass',
  'ALT-TAB Bypass',
  'AI Auto Play',
  'Player Sliders',
  'Opponent Sliders',
  '5-Star Skill Moves',
  '5-Star Weak Foot',
  'Stamina Control',
  'Custom Tactics',
  'Virtual Pro Attribute Editor',
  'VPRO Sliders',
  'PlayStyles',
  'PlayStyles+',
  'Hidden Stats 99',
  'XP Boost',
  'Anti-Ban Protection',
  'Stream-Proof',
  'Panic Key',
  'Menu Key',
  'Hotkeys',
  'Config',
  'Save Config',
  'Load Config',
  'Cloud DMA',
  'DMA',
  'Loader',
  'HWID',
  'Spoofer',
] as const;

export const PROTECTED_KEYS_AND_TECH = [
  'Insert',
  'End',
  'RMB',
  'LMB',
  'Mouse 4',
  'Windows',
  'Windows 10',
  'Windows 11',
  'Intel',
  'AMD',
  'TPM',
  'HVCI',
  'UEFI',
  'PC',
  'Discord',
  'Steam',
  'Secure Boot',
  'Core isolation',
  'core isolation',
  'secure boot',
] as const;

export const PROTECTED_MONEY_AND_VERSIONS = [
  '$35',
  '$50',
  '$150',
  'USD',
  '1 Month',
  'Lifetime',
  'Monthly',
  '1 Month $35',
  'Lifetime $150',
  'USD · 31 days (P31D)',
  'USD · 31 days (P31D)',
  'USD · lifetime (P99Y)',
  'P31D',
] as const;

export const PROTECTED_FOOTER_SITES = [
  'Unturned cheats',
  'Aion 2 hack',
  'CS2 cheats',
] as const;

/** Flat list for JSON export and i18n:check (longest first for substring checks). */
export const PROTECTED_TERMS: readonly string[] = [
  ...new Set([
    ...PROTECTED_GAME_NAMES,
    ...PROTECTED_SITE_NAMES,
    ...PROTECTED_PRODUCT_NAMES,
    ...PROTECTED_CHEAT_TERMS,
    ...PROTECTED_KEYS_AND_TECH,
    ...PROTECTED_MONEY_AND_VERSIONS,
    ...PROTECTED_FOOTER_SITES,
  ]),
].sort((a, b) => b.length - a.length);
