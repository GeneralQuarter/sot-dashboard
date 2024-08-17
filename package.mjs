import { zip } from 'zip-a-folder';
import { readFile, mkdir } from 'fs/promises';

const main = async () => {
  const manifest = JSON.parse(await readFile('extension/manifest.json'));
  await mkdir('build', { recursive: true });
  await zip('extension', `build/sot-dashboard-${manifest.version}.zip`);
}

await main();
