import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function htmlInputs() {
  const entries = { main: path.resolve(__dirname, "index.html") };
  const skip = new Set(["node_modules", "dist", "public", "src", "scripts", ".github"]);

  function walk(dir, rel = "") {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isDirectory() || skip.has(ent.name)) continue;

      const relPath = rel ? `${rel}/${ent.name}` : ent.name;
      const full = path.join(dir, ent.name);
      const indexHtml = path.join(full, "index.html");

      if (!fs.existsSync(indexHtml)) continue;

      entries[relPath] = indexHtml;
      walk(full, relPath);
    }
  }

  walk(__dirname);
  return entries;
}

/** `base: "./"` — корректные пути к ассетам на GitHub Pages. */
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: htmlInputs(),
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "vendor";
          }
          if (id.includes("@fortawesome")) return "icons";
          if (id.includes("node_modules/aos")) return "aos";
          if (id.includes("react-router")) return "router";
        }
      }
    },
    cssMinify: true
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: false
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: false
  }
});
