import Psd from "npm:@webtoon/psd";
import { Image } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
const result = Deno.readFileSync("example.psd");
const psdFile = Psd.parse(result.buffer);
const raw = await psdFile.composite();
const img = new Image(psdFile.width, psdFile.height);
img.bitmap = raw;
await Deno.writeFile("out.png", await img.encode());

psdFile.layers.forEach(async (layer) => {
  console.log(layer.name);
  const i = new Image(layer.width, layer.height);
  i.bitmap = await layer.composite();
  await Deno.writeFile(layer.name + ".png", await i.encode());
});
