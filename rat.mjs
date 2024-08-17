import puppeteer from 'puppeteer-core';
import { readFile, writeFile } from 'fs/promises';

const main = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
    userDataDir: process.env.CHROME_USER_DATA_DIR
  });
  const page = await browser.newPage();
  const client = await page.createCDPSession();
  const cookies = (await client.send('Storage.getCookies')).cookies;
  const ratCookie = cookies.find(c => c.domain === '.seaofthieves.com' && c.name === 'rat');

  if (!ratCookie) {
    throw new Error('rat cookie not found');
  }

  const env = await readFile('.env', 'utf-8');
  const updatedEnv = env.replace(/VITE_RAT=[^\n]*/g, `VITE_RAT=${ratCookie.value}`);
  await writeFile('.env', updatedEnv, 'utf-8');
  await browser.close();
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})()
