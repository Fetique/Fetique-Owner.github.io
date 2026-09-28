/** Яндекс.Метрика — подключается только после согласия на cookies (см. CookieConsent). */
export const YANDEX_METRIKA_ID =
  Number(import.meta.env.VITE_YANDEX_METRIKA_ID || "113124783") || 0;

export const COOKIE_CONSENT_KEY = "fetique_cookie_consent_v1";

export function hasMetrikaId() {
  return Number.isFinite(YANDEX_METRIKA_ID) && YANDEX_METRIKA_ID > 0;
}
