import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.4/mod.ts";

const res = new ImageResponse(
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 128,
      background: "#646",
      color: "blue"
    }}
  >
    <img height={300} src="https://fresh.deno.dev/logo.svg" alt="" />
    Hello, Fresh!
  </div>,
);

res.blob().then(async (blob) => {
  Deno.writeFile("og.png", new Uint8Array(await blob.arrayBuffer()));
});
