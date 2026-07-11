import { getPortfolioDetailRoutes } from "./portfolio.js";

export const SITE_ORIGIN = "https://fetique.com";

const BASE_ROUTES = [
  {
    path: "/",
    slug: "",
    changefreq: "weekly",
    priority: "1.0"
  },
  {
    path: "/razrabotka-sajta-i-lendinga",
    slug: "razrabotka-sajta-i-lendinga",
    changefreq: "monthly",
    priority: "0.9"
  },
  {
    path: "/dorabotka-i-podderzhka-sajta",
    slug: "dorabotka-i-podderzhka-sajta",
    changefreq: "monthly",
    priority: "0.9"
  },
  {
    path: "/digital-oformlenie",
    slug: "digital-oformlenie",
    changefreq: "monthly",
    priority: "0.85"
  },
  {
    path: "/it-soprovozhdenie-dlya-biznesa",
    slug: "it-soprovozhdenie-dlya-biznesa",
    changefreq: "monthly",
    priority: "0.85"
  },
  {
    path: "/portfolio",
    slug: "portfolio",
    changefreq: "weekly",
    priority: "0.8"
  },
  {
    path: "/faq",
    slug: "faq",
    changefreq: "monthly",
    priority: "0.75"
  }
];

const PORTFOLIO_DETAIL_ROUTES = getPortfolioDetailRoutes().map((route) => ({
  path: route.path,
  slug: route.folder,
  changefreq: route.changefreq,
  priority: route.priority,
  portfolioDetail: true,
  title: route.title,
  description: route.description
}));

/** Все индексируемые маршруты (для sitemap, prerender HTML, роутера). */
export const SEO_ROUTES = [...BASE_ROUTES, ...PORTFOLIO_DETAIL_ROUTES];

export function getRouteByPath(pathname) {
  const normalized = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return SEO_ROUTES.find((route) => route.path === normalized) ?? SEO_ROUTES[0];
}
