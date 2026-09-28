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
  if (window.ym && window.__fetiqueMetrikaReady) return;

  window.dataLayer = window.dataLayer || [];
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
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  /* eslint-enable */

  window.ym(YANDEX_METRIKA_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer"
  });
  window.__fetiqueMetrikaReady = true;
}

export function enableMetrika() {
  injectMetrikaScript();
}

export function hitMetrika(url) {
  if (!hasMetrikaId() || typeof window === "undefined" || typeof window.ym !== "function") return;
  if (getCookieConsent() !== "accepted") return;
  window.ym(YANDEX_METRIKA_ID, "hit", url || window.location.pathname + window.location.search);
}

export function disableMetrikaTracking() {
  /* Скрипт уже мог загрузиться в этой сессии — дальше hit не шлём из‑за consent !== accepted */
}
