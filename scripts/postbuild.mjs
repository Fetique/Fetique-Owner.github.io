import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "../dist");
const index = path.join(dist, "index.html");
const fallback = path.join(dist, "404.html");

if (!fs.existsSync(index)) {
  console.error("postbuild: dist/index.html missing");
  process.exit(1);
}

fs.copyFileSync(index, fallback);

const sitemap = path.join(dist, "sitemap.xml");
if (!fs.existsSync(sitemap)) {
  console.error("postbuild: dist/sitemap.xml missing");
  process.exit(1);
}

console.log("postbuild: 404.html SPA fallback ready");
