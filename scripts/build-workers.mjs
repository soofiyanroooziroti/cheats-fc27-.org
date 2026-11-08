import { spawnSync } from 'node:child_process';

const origin = (
  process.env.PUBLIC_SITE_URL?.trim() ||
  process.env.WORKERS_SITE_URL?.trim() ||
  'https://cheats-fc27--org.soofiyanroooziroti.workers.dev'
).replace(/\/$/, '');

const result = spawnSync('npm', ['run', 'build:i18n-test'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PUBLIC_SITE_URL: origin, SITE_URL: origin },
});

process.exit(result.status ?? 1);
