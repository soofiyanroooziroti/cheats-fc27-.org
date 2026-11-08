/**
 * Optional Workers *preview* build only — rewrites sitemap/canonical to WORKERS_SITE_URL.
 * Production (cheatsfc27.org): use `npm run build:i18n-test` / default deploy — do not use this script.
 */
import { spawnSync } from 'node:child_process';
import { getSiteOrigin } from './site-origin.mjs';

const preview = process.env.WORKERS_SITE_URL?.trim();
if (!preview) {
  console.error(
    `WORKERS_SITE_URL is not set. Production build uses ${getSiteOrigin()} via npm run build:i18n-test.`,
  );
  process.exit(1);
}

const origin = preview.replace(/\/$/, '');

const result = spawnSync('npm', ['run', 'build:i18n-test'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PUBLIC_SITE_URL: origin, SITE_URL: origin },
});

process.exit(result.status ?? 1);
