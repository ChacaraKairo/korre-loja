import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export default defineConfig({
  root: ".",
  plugins: [react()],
  resolve: {
    alias: {
      "@korre/shared": path.join(rootDir, "packages/shared/src")
    }
  },
  build: {
    outDir: "dist/renderer",
    emptyOutDir: false
  },
  server: {
    port: 5174
  }
});
