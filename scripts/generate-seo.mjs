import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SEO_ROUTES } from "../src/data/seoRoutes.js";
import { SERVICE_ARTICLES } from "../src/data/seoContent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const origin = "https://fetique.com";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function buildHtml({ title, description, keywords, canonical }) {
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${origin}/photos/workspace-dual.jpg" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
}

for (const route of SEO_ROUTES) {
  if (!route.slug) continue;

  let meta;
  if (route.portfolioDetail) {
    meta = {
      title: `${route.title} — Fetique`,
      description: route.description,
      keywords: `${route.title}, Fetique, портфолио`
    };
  } else {
    const article = SERVICE_ARTICLES[route.slug];
    if (!article) continue;
    meta = {
      title: article.title,
      description: article.description,
      keywords: article.keywords
    };
  }

  const dir = path.join(root, ...route.slug.split("/"));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    buildHtml({
      ...meta,
      canonical: `${origin}${route.path}`
    }),
    "utf8"
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SEO_ROUTES.map(
  (route) => `  <url>
    <loc>${origin}${route.path === "/" ? "/" : route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap, "utf8");
console.log("SEO: subpage HTML entries and sitemap.xml updated");
