import type { Translations } from './types';
import enJson from './en.json';

/** English copy — single source in en.json (also used by i18n bundle checks). */
export const en = enJson as unknown as Translations;
