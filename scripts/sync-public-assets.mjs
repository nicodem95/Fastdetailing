import { cpSync, copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const publicDirectory = join(root, 'public');

mkdirSync(publicDirectory, { recursive: true });
cpSync(join(root, 'assets'), join(publicDirectory, 'assets'), { recursive: true, force: true });

for (const filename of readdirSync(root)) {
  if (filename.endsWith('.html')) {
    copyFileSync(join(root, filename), join(publicDirectory, filename));
  }
}

for (const filename of ['favicon.svg', 'robots.txt', 'sitemap.xml']) {
  copyFileSync(join(root, filename), join(publicDirectory, filename));
}