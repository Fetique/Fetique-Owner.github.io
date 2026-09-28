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

/** Режим отладки Метрики: ?_ym_debug=1|2 — счётчик грузим сразу (иначе проверка Яндекса его не видит). */
export function isMetrikaDebugMode() {
  if (typeof window === "undefined") return false;
  try {
    const v = new URLSearchParams(window.location.search).get("_ym_debug");
    return v === "1" || v === "2";
  } catch {
    return false;
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
  injectMetrikaScript();
}

export function hitMetrika(url) {
  if (!hasMetrikaId() || typeof window === "undefined" || typeof window.ym !== "function") return;
  if (getCookieConsent() !== "accepted" && !isMetrikaDebugMode()) return;
  window.ym(YANDEX_METRIKA_ID, "hit", url || window.location.pathname + window.location.search);
}
