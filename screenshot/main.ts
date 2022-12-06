import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { Image } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";

const url = "https://yahoo.co.jp/";

const browser = await puppeteer.launch({
  defaultViewport: { width: 1200, height: 675 },
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle2" });
const raw = await page.screenshot();

await browser.close();

if (!(raw instanceof Uint8Array)) {
  console.log("Invalid Image");
  Deno.exit(0);
}
const image = await Image.decode(raw);
await Deno.writeFile("out.png", await image.encode());
