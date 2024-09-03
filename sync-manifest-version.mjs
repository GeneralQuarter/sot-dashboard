import { readFile, writeFile } from 'fs/promises';

const writeVersion = async (filepath, version) => {
  let json = await readFile(filepath, 'utf-8');
  json = json.replace(/"version": "(.+)"/g, `"version": "${version}"`);
  await writeFile(filepath, json, 'utf-8');
}

const main = async () => {
  await writeVersion('extension/manifest.json', process.env.npm_new_version);
};

await main();
