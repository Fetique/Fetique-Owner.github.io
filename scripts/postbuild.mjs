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

/**
 * Vite с base: "./" пишет ./assets и ../assets.
 * Нормализуем HTML на абсолютные /assets/..., чтобы Ctrl+F5 на /faq/ не ронял стили.
 */
function rewriteHtmlToAbsolute(html) {
  return html
    .replace(/(src|href)="\.\/assets\//g, '$1="/assets/')
    .replace(/(src|href)="(?:\.\.\/)+assets\//g, '$1="/assets/')
    .replace(/(src|href)="\.\/(favicon\.svg|logo\.svg)/g, '$1="/$2')
    .replace(/(src|href)="(?:\.\.\/)+(favicon\.svg|logo\.svg)/g, '$1="/$2');
}

function walkHtmlFiles(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtmlFiles(full, out);
    else if (ent.name.endsWith(".html")) out.push(full);
  }
  return out;
}

let rewritten = 0;
for (const file of walkHtmlFiles(dist)) {
  const before = fs.readFileSync(file, "utf8");
  const after = rewriteHtmlToAbsolute(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    rewritten += 1;
  }
}

fs.copyFileSync(index, fallback);
fs.writeFileSync(fallback, rewriteHtmlToAbsolute(fs.readFileSync(fallback, "utf8")), "utf8");

const sitemap = path.join(dist, "sitemap.xml");
if (!fs.existsSync(sitemap)) {
  console.error("postbuild: dist/sitemap.xml missing");
  process.exit(1);
}

const robots = path.join(dist, "robots.txt");
if (!fs.existsSync(robots)) {
  console.error("postbuild: robots.txt missing");
  process.exit(1);
}

const robotsBody = fs.readFileSync(robots, "utf8");
if (!robotsBody.includes("Sitemap: https://fetique.com/sitemap.xml")) {
  console.error("postbuild: robots.txt missing Sitemap URL");
  process.exit(1);
}
if (/^Host:/im.test(robotsBody)) {
  console.error("postbuild: obsolete Host directive in robots.txt — remove for Yandex");
  process.exit(1);
}

const nojekyll = path.join(dist, ".nojekyll");
if (!fs.existsSync(nojekyll)) {
  fs.writeFileSync(nojekyll, "", "utf8");
}

const sample = fs.readFileSync(index, "utf8");
if (!sample.includes('src="/assets/')) {
  console.error("postbuild: absolute /assets/ not found in dist/index.html");
  process.exit(1);
}
if (sample.includes('src="./assets/') || sample.includes('href="./assets/')) {
  console.error("postbuild: relative ./assets/ still present in dist/index.html");
  process.exit(1);
}

console.log(`postbuild: rewrote ${rewritten} HTML to absolute /assets/; 404.html ready`);
