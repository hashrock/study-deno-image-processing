import { GIF, Frame } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";

const orig = await Deno.stat("deno.gif")
console.log(`Original File: ${(orig.size / 1024).toFixed(0)}kB` )

const input = await Deno.readFile("deno.gif")
const gif = await GIF.decode(input)

const frames: Frame[] = []
for (let i = 0 ; i < gif.length ; i++) {
  if(i % 2 == 0) continue
  gif[i].scale(0.3)
  gif[i].duration *= 2
  frames.push(gif[i])
}

await Deno.writeFile("mini.gif", await new GIF(frames).encode())
const mini = await Deno.stat("mini.gif")
console.log(`Shrinked File: ${(mini.size / 1024).toFixed(0)}kB` )