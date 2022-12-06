import { Image } from "https://deno.land/x/imagescript@v1.2.14/mod.ts";

async function generateThumbnail(path: string){
  if(!path.endsWith(".png")){
    console.log("Invalid file type");
    Deno.exit(0);
  }
  const result = Deno.readFileSync(path);
  const img = await Image.decode(result.buffer);
  img.cover(300, 300);
  await Deno.writeFile(path+ ".thumbnail.png", await img.encode());
}

const args = Deno.args;

if(args.length > 0){
  args.forEach(async (path) => {
    await generateThumbnail(path);
  });
}else{
  console.log("No input");
}

