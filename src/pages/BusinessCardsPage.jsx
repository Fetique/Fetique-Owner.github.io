import QRCode from "react-qr-code";
import SeoHead from "../components/SeoHead.jsx";
import { CONTACT, TAGLINE } from "../data/company.js";
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

function QrBlock({ size = 18, label = "fetique.com" }) {
  return (
    <>
      <QRCode
        value={SITE_URL}
        size={size}
        bgColor="#ffffff"
        fgColor="#0a0a0a"
        level="M"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      <span>{label}</span>
    </>
  );
}

function VariantAFront() {
  return (
    <article className="bcard bcard-a-front">
      <span className="bcard-frame" aria-hidden />
      <span className="bcard-corner bcard-corner--tl" aria-hidden />
      <span className="bcard-corner bcard-corner--tr" aria-hidden />
      <span className="bcard-corner bcard-corner--bl" aria-hidden />
      <span className="bcard-corner bcard-corner--br" aria-hidden />
      <img src={LOGO} alt="" className="bcard-a-front-logo" width={56} height={56} />
      <h2 className="bcard-a-front-brand bcard-gold">Fetique</h2>
      <p className="bcard-a-front-tagline">
        <strong>Zero:</strong> {TAGLINE}
      </p>
    </article>
  );
}

function VariantABack() {
  return (
    <article className="bcard bcard-a-back">
      <span className="bcard-frame" aria-hidden />
      <div className="bcard-a-back-left">
        <div className="bcard-a-back-qr">
          <QrBlock />
        </div>
        <div>
          <p className="bcard-a-back-founder">Основатель: Zero • Лукин Л. И.</p>
          <div className="bcard-a-back-contact">
            <strong>Связь</strong>
            <div>
              <span>Сайт: </span>
              fetique.com
            </div>
            <div>
              <span>Почта: </span>
              {CONTACT.email}
            </div>
            <div>
              <span>Телефон: </span>
              +7 800 700 00 48
            </div>
            <div>
              <span>Telegram: </span>
              {CONTACT.projectsHandle}
            </div>
          </div>
        </div>
      </div>
      <div className="bcard-a-back-services">
        <h2>Услуги</h2>
        <p>
          Разработка, доработка и сопровождение сайтов, IT-задач для предпринимателей и компаний.
        </p>
      </div>
    </article>
  );
}

function VariantBFront() {
  return (
    <article className="bcard bcard-b-front">
      <span className="bcard-frame" aria-hidden />
      <span className="bcard-frame bcard-frame--inner" aria-hidden />
      <span className="bcard-corner bcard-corner--tl" aria-hidden />
      <span className="bcard-corner bcard-corner--tr" aria-hidden />
      <span className="bcard-corner bcard-corner--bl" aria-hidden />
      <span className="bcard-corner bcard-corner--br" aria-hidden />
      <div className="bcard-b-front-logo-wrap">
        <img src={LOGO} alt="" className="bcard-b-front-logo" width={52} height={52} />
      </div>
      <div className="bcard-b-front-copy">
        <h2 className="bcard-b-front-brand bcard-gold">Fetique</h2>
        <span className="bcard-b-front-line" aria-hidden />
        <p className="bcard-b-front-tagline">
          <em>Zero:</em> {TAGLINE}
        </p>
        <p className="bcard-b-front-sub">Сайты · Digital · IT</p>
      </div>
    </article>
  );
}

function VariantBBack() {
  return (
    <article className="bcard bcard-b-back">
      <span className="bcard-frame" aria-hidden />
      <div className="bcard-b-back-top">Digital для бизнеса · по всей России</div>
      <div className="bcard-b-back-body">
        <div className="bcard-b-back-qr-col">
          <QrBlock size={15} />
        </div>
        <span className="bcard-b-back-divider" aria-hidden />
        <div className="bcard-b-back-main">
          <div className="bcard-b-services-grid">
            <div className="bcard-b-service-item">
              <strong>Сайт и лендинг</strong>
              Разработка и обновление под задачу бизнеса
            </div>
            <div className="bcard-b-service-item">
              <strong>Доработка</strong>
              Правки, поддержка, новые блоки
            </div>
            <div className="bcard-b-service-item">
              <strong>Digital</strong>
              Единый стиль компании в сети
            </div>
            <div className="bcard-b-service-item">
              <strong>IT-сопровождение</strong>
              Задачи и консультации без штатного IT
            </div>
          </div>
          <p className="bcard-b-back-founder">Zero • Лукин Л. И.</p>
        </div>
      </div>
      <div className="bcard-b-back-footer">
        <div>
          <span>Сайт</span>
          fetique.com
        </div>
        <div>
          <span>Почта</span>
          {CONTACT.email}
        </div>
        <div>
          <span>Телефон</span>
          +7 800 700 00 48
        </div>
        <div>
          <span>Telegram</span>
          {CONTACT.projectsHandle}
        </div>
      </div>
    </article>
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
            Два варианта для референса на печать. Сделайте скриншот каждой стороны отдельно и передайте в типографию.
            Физический размер макета: 9 см × 5 см, горизонтальная ориентация.
          </p>
        </header>

        <section className="bcards-set">
          <h2 className="bcards-set-title">Вариант A — по вашему ТЗ</h2>
          <p className="bcards-set-note">Логотип по центру, слоган Zero, QR слева на обороте</p>
          <div className="bcards-pair">
            <CardScaler label="Лицевая сторона">
              <VariantAFront />
            </CardScaler>
            <CardScaler label="Оборотная сторона">
              <VariantABack />
            </CardScaler>
          </div>
        </section>

        <section className="bcards-set">
          <h2 className="bcards-set-title">Вариант B — премиум (рекомендуем)</h2>
          <p className="bcards-set-note">
            Асимметричная лицевая, сетка услуг и контактная полоса на обороте
          </p>
          <div className="bcards-pair">
            <CardScaler label="Лицевая сторона">
              <VariantBFront />
            </CardScaler>
            <CardScaler label="Оборотная сторона">
              <VariantBBack />
            </CardScaler>
          </div>
        </section>
      </div>
    </>
  );
}
