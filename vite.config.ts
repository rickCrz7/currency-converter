import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [solidPlugin(), crx({ manifest }), UnoCSS()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
