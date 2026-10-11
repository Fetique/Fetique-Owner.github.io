import { COOKIE_CONSENT_KEY, YANDEX_METRIKA_ID, hasMetrikaId } from "../data/analytics.js";

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
  } catch {
    /* ignore */
  }
  return null;
}

export function setCookieConsent(value) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

function injectMetrikaScript() {
  if (!hasMetrikaId() || typeof window === "undefined") return;
  if (window.__fetiqueMetrikaReady) return;

  window.dataLayer = window.dataLayer || [];
  const tagUrl = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;

  /* eslint-disable */
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]);
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", tagUrl, "ym");
  /* eslint-enable */

  // init сам отправляет просмотр текущей страницы; дальнейшие переходы SPA — через hitMetrika
  window.ym(YANDEX_METRIKA_ID, "init", {
    ssr: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href
  });
  window.__fetiqueMetrikaReady = true;
}

export function enableMetrika() {
  if (getCookieConsent() !== "accepted") return;
  injectMetrikaScript();
}

export function hitMetrika(url) {
  if (!hasMetrikaId() || typeof window === "undefined" || typeof window.ym !== "function") return;
  if (getCookieConsent() !== "accepted") return;
  window.ym(YANDEX_METRIKA_ID, "hit", url || window.location.pathname + window.location.search);
}

function deleteMetrikaCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((part) => {
    const name = part.split("=")[0].trim();
    if (!name.startsWith("_ym") && name !== "mdd") return;
    domains.forEach((domain) => {
      const domainAttr = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttr}`;
    });
  });
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("_ym"))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    /* ignore */
  }
}

/** Отзыв согласия: сбрасываем выбор, удаляем cookie Метрики и перезагружаем без счётчика. */
export function resetCookieConsent() {
  try {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    /* ignore */
  }
  deleteMetrikaCookies();
  window.location.reload();
}
