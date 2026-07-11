import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import PageHero from "./PageHero.jsx";
import { CONTACT } from "../data/company.js";

const CONTACT_CHIPS = [
  { label: "Задача", value: CONTACT.projectsHandle, href: CONTACT.projectsUrl, external: true },
  { label: "Телефон", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneTel}` },
  { label: "Почта", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Канал", value: CONTACT.channelHandle, href: CONTACT.channelUrl, external: true }
];

export default function ArticleLayout({ children, ctaText = "Обсудить задачу", title, lead, crumbs = [] }) {
  return (
    <article className="article-page">
      {title ? <PageHero title={title} lead={lead} crumbs={crumbs} /> : null}
      {children}
      <div className="article-footer panel">
        <div className="article-footer-top">
          <div className="article-cta-copy">
            <p className="article-cta-title">Готовы обсудить задачу?</p>
            <p className="article-cta-text">Опишите запрос — ответим лично и предложим формат работы.</p>
          </div>
          <a
            className="btn btn-primary btn-primary--shine btn-primary--wide"
            href={CONTACT.projectsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className="btn-label">{ctaText}</span>
          </a>
        </div>
        <div className="article-contacts" role="list">
          {CONTACT_CHIPS.map((item) => (
            <a
              key={item.label}
              className="article-contact-chip"
              href={item.href}
              role="listitem"
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="article-contact-chip-label">{item.label}</span>
              <span className="contact-glow">{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
