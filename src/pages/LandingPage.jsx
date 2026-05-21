import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faLayerGroup,
  faPaperPlane,
  faPhone,
  faSeedling
} from "@fortawesome/free-solid-svg-icons";
import AprilBadge from "../components/AprilBadge.jsx";
import StampReveal from "../components/StampReveal.jsx";
import LegalFold from "../components/LegalFold.jsx";
import { COMPANY, CONTACT, TAGLINE } from "../data/company.js";

const PILLARS = [
  {
    icon: faLayerGroup,
    title: "IT и сопровождение",
    text: "Разработка, внедрение и поддержка — с понятным процессом и ответственным лицом на стороне клиента."
  },
  {
    icon: faSeedling,
    title: "Свои направления",
    text: "Помимо IT рассматриваем и запускаем личные проекты: от салона красоты до бренда одежды и других идей — по мере готовности."
  },
  {
    icon: faHandshake,
    title: "Договор и репутация",
    text: "Работаем официально, без пустых обещаний. Долгосрочное сотрудничество в приоритете; разовые задачи — при взаимном интересе."
  }
];

export default function LandingPage({ onOpenChannel }) {
  return (
    <div id="top" className="landing">
      <section className="hero mesh" data-aos="fade-up">
        <div data-aos="zoom-in" data-aos-delay="80">
          <AprilBadge />
        </div>
        <p className="hero-tagline text-shimmer text-shimmer--hero">
          <span className="tagline-part">Найди свой</span>
          <span className="tagline-part tagline-part--second">цифровой фетиш</span>
        </p>
        <h1 className="hero-title">
          <span className="text-gradient">Fetique</span> — выходим за рамки обычных IT-проектов
        </h1>
        <p className="hero-lead">
          Команда {COMPANY.brand}: IT-разработка, внедрение и поддержка — и собственные инициативы в
          самых разных сферах. Строим экосистему, где проекты усиливают друг друга, а не исчезают после
          сдачи.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={onOpenChannel}>
            <FontAwesomeIcon icon={faPaperPlane} /> Канал {CONTACT.channelHandle}
          </button>
          <a className="btn btn-ghost" href={`tel:${CONTACT.phoneTel}`}>
            <FontAwesomeIcon icon={faPhone} />
            <span className="text-shimmer text-shimmer--slow">{CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </section>

      <section id="philosophy" className="section panel philosophy-panel">
        <h2 className="section-title" data-aos="fade-right">
          Философия
        </h2>
        <div className="philosophy-stack">
          <div className="prose" data-aos="fade-up">
            <p>
              Мы не делаем «ещё один сайт» и не уходим в закат. Клиент всегда знает, кто отвечает за
              результат. Рассказываем правду — и когда получилось сильно, и когда были сложности.
            </p>
            <p>
              <strong>{CONTACT.founderName}</strong> — не просто ноль: это точка, с которой начинается
              всё. За брендом стоит живой человек —{" "}
              <a
                className="inline-founder text-shimmer"
                href={CONTACT.founderUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT.founderHandle}
              </a>
              . Напишите задачу — предложим формат, который имеет смысл.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="80">
            <StampReveal>
              В реестре нас завели в День дурака. Мы тоже улыбаемся — но {COMPANY.shortName} и печать на
              договоре настоящие.
            </StampReveal>
          </div>
        </div>
      </section>

      <section id="directions" className="section">
        <h2 className="section-title" data-aos="fade-right">
          Что делаем сейчас
        </h2>
        <p className="section-lead" data-aos="fade-up">
          IT — опора, не весь горизонт. Новости, кейсы и запуски — в Telegram-канале.
        </p>
        <div className="bento">
          {PILLARS.map((item, i) => (
            <article
              key={item.title}
              className="panel bento-card"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <span className="bento-icon" aria-hidden>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <h2 className="section-title" data-aos="fade-right">
          Связь
        </h2>
        <p className="section-lead" data-aos="fade-up">
          По проектам сейчас удобнее писать и звонить напрямую — так быстрее договоримся о задаче. Канал — для
          новостей и общего контекста бренда.
        </p>

        <div className="contact-deck" data-aos="fade-up">
          <button type="button" className="contact-tile" onClick={onOpenChannel}>
            <span className="contact-tile-label">Канал</span>
            <span className="contact-tile-value text-shimmer">{CONTACT.channelHandle}</span>
            <span className="contact-tile-hint">Новости, кейсы, анонсы</span>
          </button>

          <a
            className="contact-tile"
            href={CONTACT.founderUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-tile-label">По задаче</span>
            <span className="contact-tile-value text-shimmer text-shimmer--slow">{CONTACT.founderHandle}</span>
            <span className="contact-tile-hint">Опишите запрос — ответим лично</span>
          </a>

          <a className="contact-tile" href={`tel:${CONTACT.phoneTel}`}>
            <span className="contact-tile-label">Телефон</span>
            <span className="contact-tile-value text-shimmer text-shimmer--slow">{CONTACT.phoneDisplay}</span>
            <span className="contact-tile-hint">Если удобнее голосом</span>
          </a>
        </div>

        <div data-aos="fade-up">
          <LegalFold />
        </div>
      </section>
    </div>
  );
}
