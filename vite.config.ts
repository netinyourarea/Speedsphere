import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// The real site is the static vanilla build in /public — index.html there is
// the actual homepage. This app's entry is renamed to app.html so its build
// output doesn't collide with (and overwrite) public/index.html.
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: fileURLToPath(new URL("app.html", import.meta.url)),
    },
  },
});
