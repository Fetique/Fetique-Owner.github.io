import QRCode from "react-qr-code";
import SeoHead from "../components/SeoHead.jsx";
import { COMPANY, CONTACT, SERVICES, TAGLINE } from "../data/company.js";
import { publicAsset } from "../utils/publicAsset.js";
import "../styles/business-cards.css";

const SITE_URL = "https://fetique.com";
const LOGO = publicAsset("logo.svg");

function CardScaler({ label, children }) {
  return (
    <div className="bcard-slot">
      <p className="bcards-side-label">{label}</p>
      <div className="bcard-scaler">{children}</div>
    </div>
  );
}

function CardChrome({ children, className = "" }) {
  return (
    <article className={`bcard ${className}`}>
      <div className="bcard-mesh" aria-hidden />
      <span className="bcard-frame" aria-hidden />
      <span className="bcard-corner bcard-corner--tl" aria-hidden />
      <span className="bcard-corner bcard-corner--tr" aria-hidden />
      <span className="bcard-corner bcard-corner--bl" aria-hidden />
      <span className="bcard-corner bcard-corner--br" aria-hidden />
      {children}
    </article>
  );
}

function QrBlock({ pixels = 108 }) {
  return (
    <div className="bcard-qr">
      <QRCode
        value={SITE_URL}
        size={pixels}
        bgColor="#ffffff"
        fgColor="#0a0a0a"
        level="M"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      <span className="bcard-qr-label">fetique.com</span>
    </div>
  );
}

function ContactBlock({ compact = false }) {
  return (
    <div className={`bcard-contacts${compact ? " bcard-contacts--compact" : ""}`}>
      <div className="bcard-contact-row">
        <span className="bcard-contact-key">Сайт</span>
        <span className="bcard-contact-val">fetique.com</span>
      </div>
      <div className="bcard-contact-row">
        <span className="bcard-contact-key">Почта</span>
        <span className="bcard-contact-val">{CONTACT.email}</span>
      </div>
      <div className="bcard-contact-row">
        <span className="bcard-contact-key">Телефон</span>
        <span className="bcard-contact-val">
          +7 800 700-00-48
          {!compact ? <em>бесплатно по России</em> : null}
        </span>
      </div>
      <div className="bcard-contact-row">
        <span className="bcard-contact-key">Telegram</span>
        <span className="bcard-contact-val">{CONTACT.projectsHandle}</span>
      </div>
    </div>
  );
}

/** Вариант A — по ТЗ: логотип по центру, слоган Zero */
function VariantAFront() {
  return (
    <CardChrome className="bcard-a-front">
      <div className="bcard-a-front-inner">
        <img src={LOGO} alt="" className="bcard-logo bcard-logo--center" width={80} height={80} />
        <h2 className="bcard-brand bcard-brand--center">Fetique</h2>
        <span className="bcard-rule bcard-rule--center" aria-hidden />
        <p className="bcard-tagline bcard-tagline--center">
          <span className="bcard-zero">Zero:</span> {TAGLINE}
        </p>
        <p className="bcard-front-sub">Сайты · digital · IT для бизнеса</p>
        <p className="bcard-front-legal">{COMPANY.shortName}</p>
      </div>
    </CardChrome>
  );
}

function VariantABack() {
  return (
    <CardChrome className="bcard-a-back">
      <div className="bcard-a-back-grid">
        <div className="bcard-a-back-left">
          <QrBlock pixels={100} />
          <p className="bcard-scan-hint">Сканируйте — откроется сайт</p>
          <div className="bcard-a-back-founder-block">
            <p className="bcard-founder">Основатель: Zero • Лукин Л. И.</p>
            <p className="bcard-founder-sub">Связь</p>
            <ContactBlock compact />
          </div>
        </div>
        <div className="bcard-a-back-right">
          <p className="bcard-section-label">Услуги</p>
          <p className="bcard-services-lead">
            Разработка, доработка и сопровождение сайтов, IT-задач для предпринимателей и компаний.
          </p>
          <ul className="bcard-services-list">
            {SERVICES.map((item) => (
              <li key={item.slug}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardChrome>
  );
}

/** Вариант B — премиум: плотная вёрстка, максимум информации */
function VariantBFront() {
  return (
    <CardChrome className="bcard-b-front">
      <div className="bcard-b-front-grid">
        <div className="bcard-b-logo-col">
          <div className="bcard-logo-frame">
            <img src={LOGO} alt="" className="bcard-logo" width={72} height={72} />
          </div>
        </div>
        <div className="bcard-b-copy-col">
          <p className="bcard-eyebrow">ООО «Фетик» · digital-студия</p>
          <h2 className="bcard-brand">Fetique</h2>
          <span className="bcard-rule" aria-hidden />
          <p className="bcard-tagline">
            <span className="bcard-zero">Zero:</span> {TAGLINE}
          </p>
          <p className="bcard-b-front-desc">
            Разработка, доработка и сопровождение сайтов и IT-задач. Работаем по всей России.
          </p>
        </div>
      </div>
      <div className="bcard-b-front-strip">
        <span>fetique.com</span>
        <span className="bcard-strip-dot" aria-hidden />
        <span>{CONTACT.phoneDisplay}</span>
        <span className="bcard-strip-dot" aria-hidden />
        <span>{CONTACT.projectsHandle}</span>
      </div>
    </CardChrome>
  );
}

function VariantBBack() {
  return (
    <CardChrome className="bcard-b-back">
      <div className="bcard-b-back-head">
        <span>Digital для бизнеса</span>
        <span className="bcard-strip-dot" aria-hidden />
        <span>По всей России</span>
      </div>
      <div className="bcard-b-back-grid">
        <div className="bcard-b-back-qr-wrap">
          <QrBlock pixels={92} />
        </div>
        <div className="bcard-b-back-services">
          <p className="bcard-section-label">Что делаем</p>
          <div className="bcard-b-service-grid">
            {SERVICES.map((item) => (
              <div key={item.slug} className="bcard-b-service-cell">
                <strong>{item.title}</strong>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bcard-b-back-foot">
        <div className="bcard-b-foot-founder">
          <span className="bcard-section-label">Основатель</span>
          <strong>Zero • Лукин Л. И.</strong>
        </div>
        <ContactBlock compact />
      </div>
    </CardChrome>
  );
}

export default function BusinessCardsPage() {
  return (
    <>
      <SeoHead
        title="Визитки Fetique — макет 90×50"
        description="Макеты визиток Fetique 90×50 мм для печати."
        keywords="визитка Fetique"
        path="/vizitki"
        noindex
      />
      <div className="bcards-page">
        <header className="bcards-intro">
          <h1>Визитки Fetique · 90 × 50 мм</h1>
          <p>
            Два макета для типографии. Скриншот каждой стороны отдельно — лицевая и оборотная. На экране
            карточка увеличена для чёткости; при печати размер <strong>90 × 50 мм</strong>, горизонтально.
          </p>
        </header>

        <section className="bcards-set">
          <h2 className="bcards-set-title">Вариант A — классика (по ТЗ)</h2>
          <p className="bcards-set-note">Логотип и слоган по центру · QR и контакты слева на обороте</p>
          <div className="bcards-pair">
            <CardScaler label="Лицевая">
              <VariantAFront />
            </CardScaler>
            <CardScaler label="Оборотная">
              <VariantABack />
            </CardScaler>
          </div>
        </section>

        <section className="bcards-set">
          <h2 className="bcards-set-title">Вариант B — премиум (рекомендуем)</h2>
          <p className="bcards-set-note">Плотная вёрстка · все услуги и контакты на обороте</p>
          <div className="bcards-pair">
            <CardScaler label="Лицевая">
              <VariantBFront />
            </CardScaler>
            <CardScaler label="Оборотная">
              <VariantBBack />
            </CardScaler>
          </div>
        </section>
      </div>
    </>
  );
}
