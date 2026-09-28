import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hasMetrikaId } from "../data/analytics.js";
import {
  enableMetrika,
  getCookieConsent,
  hitMetrika,
  isMetrikaDebugMode,
  setCookieConsent
} from "../utils/metrika.js";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isMetrikaDebugMode() && hasMetrikaId()) {
      setCookieConsent("accepted");
      enableMetrika();
      hitMetrika(window.location.pathname + window.location.search);
      setVisible(false);
      return;
    }

    const consent = getCookieConsent();
    if (consent === "accepted" && hasMetrikaId()) {
      enableMetrika();
      return;
    }
    if (consent == null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    setCookieConsent("accepted");
    setVisible(false);
    if (hasMetrikaId()) {
      enableMetrika();
      hitMetrika(window.location.pathname + window.location.search);
    }
  }

  function reject() {
    setCookieConsent("rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Согласие на файлы cookie">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          Мы используем технические cookies и — при согласии — Яндекс.Метрику для статистики посещений.
          Подробнее в{" "}
          <Link to="/privacy" className="inline-link">
            политике конфиденциальности
          </Link>
          .
        </p>
        <div className="cookie-consent-actions">
          <button type="button" className="btn btn-primary cookie-consent-accept" onClick={accept}>
            Принять
          </button>
          <button type="button" className="btn cookie-consent-reject" onClick={reject}>
            Только необходимые
          </button>
        </div>
      </div>
    </div>
  );
}
