/**
 * Путь к файлу из public/ — всегда от корня сайта.
 * С base: "./" относительные URL на /portfolio/... ломаются.
 */
export function publicAsset(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const normalized = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL || "/";

  if (base === "./" || base === ".") {
    return `/${normalized}`;
  }

  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${normalized}`;
}
