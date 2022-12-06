import { Image, decode } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";

const img = await decode(await Deno.readFile("./input.png"));
const small = img.resize(img.width / 2, Image.RESIZE_AUTO);

if(small !== undefined) {
  await Deno.writeFile("out.jpeg", await small.encodeJPEG());
}