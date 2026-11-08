/** ISO date (YYYY-MM-DD) — edit when you publish a status refresh. */
export const STATUS_LAST_UPDATED = '2026-10-27';

export interface StatusUpdateEntry {
  title: string;
  /** Display range or date, e.g. Oct 22–24, 2026 */
  when: string;
  summary: string;
  /** Site icon key. Locale notes without one fall back by list order. */
  icon?: 'shield' | 'mapHack' | 'zap' | 'settings' | 'alert' | 'tag';
}

/** Newest first — neutral patch notes only (no undetected / working claims). */
export const STATUS_RECENT_UPDATES: StatusUpdateEntry[] = [
  {
    title: 'Title Update v1.1.0',
    icon: 'tag',
    when: 'Oct 27, 2026',
    summary:
      'Title Update v1.1.0 is quality-of-life, small mode fixes, and tighter competitive security. It does not retune gameplay balance or physics. PC builds push stricter platform checks so online matches stay on an even field. Read this note before you launch. It is not an undetected claim.',
  },
  {
    title: 'Ultimate Team',
    icon: 'zap',
    when: 'Oct 27, 2026',
    summary:
      'High-OVR pack opening reveals are shorter. Squad Building Challenge filter choices now stay saved across sessions.',
  },
  {
    title: 'Career Mode',
    icon: 'settings',
    when: 'Oct 27, 2026',
    summary:
      'Team Management UI is rebuilt. New toggles cover press conferences and unexpected events. Transfer and contract rejections show clearer feedback.',
  },
  {
    title: 'The Grounds / Clubs',
    icon: 'mapHack',
    when: 'Oct 27, 2026',
    summary:
      'Fixes overlapping UI at full time. Fixes a bug that let a side field two active goalkeepers at once.',
  },
  {
    title: 'EA Javelin and third-party tools',
    icon: 'shield',
    when: 'Oct 27, 2026',
    summary:
      'PC builds keep kernel-level EA Javelin on and scan for unauthorized background apps. The patch targets forbidden external tools: auto-SBC clients, Ped modding frameworks, match-manipulation injectors, and win-sharing clients. Blacklisted software at launch can force a security-violation kick or a crash to desktop. Confirm this page still matches your installed build before you open the loader.',
  },
  {
    title: '“Updated” is not an undetected claim',
    icon: 'alert',
    when: 'Oct 27, 2026',
    summary:
      'The Updated label means this note matches Title Update v1.1.0 (October 27, 2026). It does not mean the loader is undetected, and it does not cover the next EA Javelin or client build.',
  },
];

export const STATUS_ACE_REMINDER =
  'Check this page after each EA Javelin or client update before launching.';

const LOCALE_DATE: Partial<Record<string, string>> = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  ar: 'ar-SA',
  ja: 'ja-JP',
  ko: 'ko-KR',
};

/** Format YYYY-MM-DD for display (static at build). */
export function formatStatusUpdated(
  isoDate: string = STATUS_LAST_UPDATED,
  locale?: string | null,
): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const tag = locale && LOCALE_DATE[locale] ? LOCALE_DATE[locale] : 'en-US';
  return new Intl.DateTimeFormat(tag, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
