import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faGlobe,
  faHandshake,
  faLayerGroup,
  faPaperPlane,
  faPhone,
  faShareNodes,
  faScrewdriverWrench,
  faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ServiceNav from "../components/ServiceNav.jsx";
import SiteIndex from "../components/SiteIndex.jsx";
import LegalFold from "../components/LegalFold.jsx";
import BrandStrip from "../components/BrandStrip.jsx";
import ProcessSteps from "../components/ProcessSteps.jsx";
import StampReveal from "../components/StampReveal.jsx";
import SeoHead from "../components/SeoHead.jsx";
import { scrollToSection } from "../utils/scrollToSection.js";
import { publicAsset } from "../utils/publicAsset.js";
import { COMPANY, CONTACT, PROCESS_LEAD, SERVICES, SITE_PHOTOS, TAGLINE } from "../data/company.js";

const workspaceSrc = publicAsset(SITE_PHOTOS.workspace);

const SERVICE_ICONS = [faGlobe, faScrewdriverWrench, faWandMagicSparkles, faLayerGroup];

export default function LandingPage({ onOpenChannel }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      window.setTimeout(() => scrollToSection(id), 150);
    }
  }, [location.hash]);

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ООО «Фетик»",
        alternateName: ["Fetique", "Фетик"],
        url: "https://fetique.com/",
        email: "zero@fetique.com",
        telephone: "+78007000048"
      },
      {
        "@type": "WebSite",
        name: "Fetique",
        url: "https://fetique.com/"
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Fetique — разработка сайтов и digital для бизнеса"
        description="Разработка сайтов и лендингов, доработка, поддержка и digital для бизнеса по России. Бесплатный звонок 8-800."
        keywords="разработка сайта, лендинг для бизнеса, доработка сайта, поддержка сайта, digital для бизнеса, Fetique, ООО Фетик, fetique.com"
        path="/"
        jsonLd={homeJsonLd}
      />
    <div id="top" className="landing">
      <section className="hero hero--sales mesh" data-aos="fade-up">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              {COMPANY.shortName} · {COMPANY.brand}
            </p>
            <h1 className="hero-title hero-title--sales">
              Сайты и <span className="text-gradient">digital</span> для бизнеса
            </h1>
            <p className="hero-lead">
              Разработка, доработка и сопровождение сайтов и IT-задач для предпринимателей и компаний. С понятными
              сроками и одним контактом на связи. По всей России.
            </p>
            <p className="hero-tagline hero-tagline--sub">{TAGLINE}</p>
            <div className="hero-actions hero-actions--grid">
              <a
                className="btn btn-primary btn-primary--shine"
                href={CONTACT.projectsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                <span className="btn-label">Обсудить задачу</span>
              </a>
              <a className="btn btn-contact" href={`tel:${CONTACT.phoneTel}`}>
                <span className="btn-contact-icon" aria-hidden>
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <span className="btn-contact-body">
                  <span className="btn-contact-label">Телефон</span>
                  <span className="contact-glow">{CONTACT.phoneDisplay}</span>
                </span>
              </a>
              <a
                className="btn btn-contact"
                href={CONTACT.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn-contact-icon" aria-hidden>
                  <FontAwesomeIcon icon={faShareNodes} />
                </span>
                <span className="btn-contact-body">
                  <span className="btn-contact-label">Канал</span>
                  <span className="contact-glow contact-glow--fast">{CONTACT.channelHandle}</span>
                </span>
              </a>
            </div>
          </div>
          <figure className="hero-photo" data-aos="fade-up" data-aos-delay="80">
            <img
              src={workspaceSrc}
              alt="Рабочее место Fetique: разработка и бренд компании"
              width={1024}
              height={768}
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <SiteIndex />

      <section id="services" className="section">
        <h2 className="section-title" data-aos="fade-right">
          Услуги
        </h2>
        <p className="section-lead" data-aos="fade-up">
          Если у вас нет сайта, он устарел или «не приносит заявки» — начнём с короткого разговора и предложим
          понятный формат работы.
        </p>
        <ServiceNav />
        <div className="bento bento--services">
          {SERVICES.map((item, i) => (
            <article
              key={item.title}
              className="panel bento-card"
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <span className="bento-icon" aria-hidden>
                <FontAwesomeIcon icon={SERVICE_ICONS[i]} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <p className="bento-note">{item.note}</p>
              <Link to={`/${item.slug}`} className="bento-more">
                Подробнее <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <BrandStrip />

      <section id="process" className="section panel process-panel process-panel--center">
        <h2 className="section-title" data-aos="fade-up">
          Как работаем
        </h2>
        <p className="section-lead" data-aos="fade-up">
          {PROCESS_LEAD}
        </p>
        <ProcessSteps />
      </section>

      <section id="about" className="section about-section">
        <div className="about-grid">
          <div className="about-copy" data-aos="fade-up">
            <h2 className="section-title">О компании</h2>
            <div className="prose">
              <p>
                <strong>{COMPANY.brand}</strong> — команда под брендом {COMPANY.shortName}. Мы делаем сайты,
                digital-материалы и IT-задачи для бизнеса: от лендинга до сопровождения и внутренних инструментов.
              </p>
              <p>
                Не прячемся за безликим агентством: на связи по проектам —{" "}
                <a
                  className="inline-founder contact-glow"
                  href={CONTACT.projectsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CONTACT.projectsHandle}
                </a>
                . Лицо в рекламе не показываем — зато показываем процесс, результат и документы.
              </p>
              <p>
                Берём и разовые задачи, и долгосрочные проекты — формат подбираем под вашу ситуацию. Счёт и документы
                — когда они нужны по задаче.
              </p>
            </div>
            <ul className="about-facts">
              <li>
                <FontAwesomeIcon icon={faHandshake} /> ИНН {COMPANY.inn}
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} />{" "}
                <a href={`tel:${CONTACT.phoneTel}`} className="inline-link">
                  <span className="contact-glow contact-glow--slow">{CONTACT.phoneDisplay}</span>
                </a>{" "}
                — {CONTACT.phoneHint}
              </li>
            </ul>
          </div>
          <div data-aos="fade-up" data-aos-delay="80">
            <StampReveal>
              В реестре нас завели в День дурака. Мы тоже улыбаемся — но {COMPANY.shortName} и печать компании
              настоящие.
            </StampReveal>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <h2 className="section-title" data-aos="fade-right">
          Связь
        </h2>
        <p className="section-lead" data-aos="fade-up">
          По задачам удобнее писать или звонить напрямую — так быстрее согласуем сроки и формат. Канал — для новостей
          и контекста бренда.
        </p>

        <div className="contact-deck" data-aos="fade-up">
          <a
            className="contact-tile contact-tile--primary"
            href={CONTACT.projectsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-tile-label">По задаче</span>
            <span className="contact-tile-value contact-glow">{CONTACT.projectsHandle}</span>
            <span className="contact-tile-hint">Опишите запрос — ответим лично</span>
          </a>

          <a className="contact-tile" href={`tel:${CONTACT.phoneTel}`}>
            <span className="contact-tile-label">Телефон</span>
            <span className="contact-tile-value contact-glow contact-glow--slow">{CONTACT.phoneDisplay}</span>
            <span className="contact-tile-hint">{CONTACT.phoneHint}</span>
          </a>

          <a className="contact-tile" href={`mailto:${CONTACT.email}`}>
            <span className="contact-tile-label">Почта</span>
            <span className="contact-tile-value contact-glow contact-glow--slow">{CONTACT.email}</span>
            <span className="contact-tile-hint">Для документов и деловой переписки</span>
          </a>

          <a className="contact-tile" href={CONTACT.channelUrl} target="_blank" rel="noopener noreferrer">
            <span className="contact-tile-label">Канал</span>
            <span className="contact-tile-value contact-glow contact-glow--fast">{CONTACT.channelHandle}</span>
            <span className="contact-tile-hint">Новости, кейсы, анонсы</span>
          </a>
        </div>

        <p className="contact-cta-hint" data-aos="fade-up">
          <a href={CONTACT.projectsUrl} target="_blank" rel="noopener noreferrer" className="contact-cta-link">
            Написать в Telegram <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </p>

        <div data-aos="fade-up">
          <LegalFold />
        </div>
      </section>
    </div>
    </>
  );
}
