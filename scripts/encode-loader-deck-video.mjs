/**
 * Crop top 140px (hide scoreboard/HUD), 720p30, no audio, WebM + MP4 under 500 KiB each, poster WebP.
 * Source: public/images/The Best EA FC 27 Cheat in 2027_ (Meta) - Trim.mp4
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'public/images/The Best EA FC 27 Cheat in 2027_ (Meta) - Trim.mp4');
const outDir = path.join(root, 'public/videos');
const vf = 'crop=1920:940:0:140,scale=1280:720:flags=lanczos,fps=30';
const cropStill = 'crop=1920:940:0:140,scale=1280:720:flags=lanczos';

if (!fs.existsSync(src)) {
  console.error('encode-loader-deck-video: missing source MP4');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const mp4 = path.join(outDir, 'fc27-loader-deck-bg.mp4');
const webm = path.join(outDir, 'fc27-loader-deck-bg.webm');
const poster = path.join(outDir, 'fc27-loader-deck-bg-poster.webp');

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

run(
  `ffmpeg -y -i "${src}" -vf "${vf}" -an -c:v libx264 -pix_fmt yuv420p -preset slower -crf 36 -maxrate 950k -bufsize 1900k -movflags +faststart "${mp4}"`,
);
run(
  `ffmpeg -y -i "${src}" -vf "${vf}" -an -c:v libvpx-vp9 -crf 54 -b:v 0 -deadline good -cpu-used 5 -row-mt 1 "${webm}"`,
);
run(`ffmpeg -y -i "${src}" -vf "${cropStill}" -frames:v 1 -c:v libwebp -quality 82 "${poster}"`);

const max = 500 * 1024;
for (const file of [mp4, webm]) {
  const size = fs.statSync(file).size;
  if (size > max) {
    console.error(`encode-loader-deck-video: ${path.basename(file)} is ${size} bytes (max ${max})`);
    process.exit(1);
  }
}

console.log('encode-loader-deck-video: ok');
