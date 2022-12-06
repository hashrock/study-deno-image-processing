import { Image } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
import { join, parse } from "https://deno.land/std@0.137.0/path/mod.ts";

const events = await Deno.watchFs("input", { recursive: true });
console.log("Watching `./input` directory for changes...");

for await (const event of events) {
  if (event.kind === "create") {
    const { dir, name, ext } = parse(event.paths[0]);
    console.log(`Processing ${name}${ext}...`);
    const input = event.paths[0];
    const output = join(dir, "../output", `${name}.${ext}`);
    try {
      await applyFilter(input, output);
    } catch (e) {
      console.log(e);
    }
  }
}

async function applyFilter(input: string, output: string) {
  if (!input.endsWith(".png")) {
    return;
  }
  const result = await Deno.readFile(input);
  const img = await Image.decode(result.buffer);
  img.invert();
  await Deno.writeFile(output, await img.encode());
}
