/**
 * Путь к файлу из public/ — всегда от корня сайта (/logo.svg).
 */
export function publicAsset(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `/${String(path).replace(/^\//, "")}`;
}
