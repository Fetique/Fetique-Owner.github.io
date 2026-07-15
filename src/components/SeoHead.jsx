import { useEffect } from "react";
import { SITE_ORIGIN } from "../data/seoRoutes.js";

const DEFAULT_IMAGE = `${SITE_ORIGIN}/photos/workspace-dual.jpg`;

export default function SeoHead({ title, description, keywords, path = "/", jsonLd = null, noindex = false }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name, content, property = false) => {
      if (!content) return;
      const attr = property ? "property" : "name";
      let node = document.querySelector(`meta[${attr}="${name}"]`);
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attr, name);
        document.head.appendChild(node);
      }
      node.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_ORIGIN}${path === "/" ? "/" : path}`);

    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", `${SITE_ORIGIN}${path}`, true);
    setMeta("og:type", "website", true);
    setMeta("og:image", DEFAULT_IMAGE, true);
    setMeta("og:locale", "ru_RU", true);

    const oldLd = document.getElementById("page-jsonld");
    if (oldLd) oldLd.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, path, jsonLd, noindex]);

  return null;
}
