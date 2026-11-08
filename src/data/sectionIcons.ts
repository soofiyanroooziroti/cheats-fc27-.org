import type { IconName } from '../components/icons/types';

/** Icons for home feature cards and product anchors — FC 27 loader tabs only. */
export const featureIcons: Record<string, IconName> = {
  'Ultimate Team': 'compareRuneTimer',
  Gameplay: 'gamepad2',
  'Pro Clubs': 'users',
  Utilities: 'featureUtilitySuite',
  Safety: 'shieldCheck',
  'Ultimate Team Options': 'compareRuneTimer',
  'Gameplay Options': 'gamepad2',
  'Pro Clubs Options': 'users',
  'Windows requirements': 'compatWindows',
  'Supported clients': 'compatSteam',
  Config: 'compareCloudBackup',
  'Key Binds': 'settings',
  Plans: 'featureUtilitySuite',
};

export const whyUsIcons: IconName[] = ['whyShield', 'whyUsers', 'whyMonitor', 'whyHeadphones'];

export const setupStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqCheck'];

export const workflowIcons: IconName[] = [
  'workflowAlert',
  'workflowPackage',
  'workflowSettings',
  'workflowCheck',
];

export const fieldNoteIcons: IconName[] = ['fieldCalendar', 'fieldShield', 'fieldHeadphones'];

export const blogTagIcons: Record<string, IconName> = {
  Review: 'navBlog',
  Install: 'settings',
  Safety: 'shield',
  Plans: 'tag',
  Guide: 'navBlog',
  Guides: 'navBlog',
  Setup: 'settings',
  Features: 'layers',
  Updates: 'refresh',
  Troubleshooting: 'alert',
};

export const heroStatusPills: { icon: IconName; label: string }[] = [
  { icon: 'compareRuneTimer', label: 'Ultimate Team' },
  { icon: 'gamepad2', label: 'Gameplay' },
  { icon: 'users', label: 'Pro Clubs' },
  { icon: 'featureUtilitySuite', label: 'Utilities' },
  { icon: 'shieldCheck', label: 'Anti-ban' },
  { icon: 'cloud', label: 'Cloud DMA' },
  { icon: 'instantDelivery', label: 'Instant delivery' },
  { icon: 'support247', label: '24/7 support' },
  { icon: 'liveStatus', label: 'Check after a patch' },
];

export const heroStatIcons: IconName[] = [
  'heroStatStream',
  'heroStatClock',
  'heroStatUsers',
  'heroStatHeadphones',
];

export const cheatTierIcons: Record<string, IconName> = {
  Lite: 'tierLite',
  Pro: 'tierPro',
  Elite: 'tierElite',
};

export const productCategoryIcons: Record<string, IconName> = {
  'Core product': 'coreProduct',
  'External suite': 'externalSuite',
  'DMA hardware': 'dmaHardware',
  'System utility': 'systemUtility',
  'Account recovery': 'accountRecovery',
  Cosmetic: 'cosmetic',
};

export const acquisitionStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqZap', 'acqCheck'];

/** After-purchase timeline on product detail — one distinct icon per step */
export const productAcquisitionStepIcons: IconName[] = [
  'liveStatus',
  'acqPackage',
  'headphones',
  'acqCheck',
];

/** Product detail requirement tiles — prefer compat-style icons where mapped */
export const productRequirementIcons: Partial<Record<IconName, IconName>> = {
  reqWindows: 'compatWindows',
  reqSteam: 'compatSteam',
  reqSettings: 'compatPackage',
  reqWifi: 'compatWifi',
  reqCpu: 'compatMonitor',
  reqRestorePoint: 'compatRefresh',
  reqShieldGuide: 'compatShield',
  reqMailOrder: 'mail',
  reqShieldAccount: 'compatShield',
  reqWifiPortal: 'compatWifi',
};

export function requirementDisplayIcon(icon: IconName): IconName {
  return productRequirementIcons[icon] ?? icon;
}

export const compatibilityIcons: IconName[] = [
  'compatShield',
  'compatMonitor',
  'compatRefresh',
  'compatWifi',
  'compatWindows',
  'cloud',
  'liveStatus',
  'compatDiscord',
  'instantDelivery',
];
