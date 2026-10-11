import { Link, useLocation } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import ArticleLayout from "../components/ArticleLayout.jsx";
import { COMPANY, CONTACT } from "../data/company.js";
import PRIVACY_POLICY from "../data/privacyPolicy.json";

const DOCS = {
  privacy: {
    title: "Политика конфиденциальности — Fetique",
    description: `Политика обработки персональных данных ${COMPANY.shortName} (Fetique) по 152-ФЗ: цели, сроки хранения, меры защиты, права субъекта. Рег. номер в реестре операторов 74-26-058154.`,
    keywords: "политика конфиденциальности, персональные данные, 152-ФЗ, Fetique, ООО Фетик",
    h1: "Политика конфиденциальности",
    lead: `${PRIVACY_POLICY.title}. ${PRIVACY_POLICY.approvedBy}.`,
    edition: PRIVACY_POLICY.edition,
    sections: PRIVACY_POLICY.sections
  },
  terms: {
    title: "Условия использования — Fetique",
    description: `Условия использования сайта fetique.com и обращения к ${COMPANY.shortName} (Fetique).`,
    keywords: "условия использования, Fetique, ООО Фетик, оферта сайт",
    h1: "Условия использования",
    lead: "Правила пользования сайтом fetique.com и общие рамки общения с Fetique до заключения договора.",
    edition: "28.09.2026",
    sections: [
      {
        h2: "Сайт",
        paragraphs: [
          "Сайт носит информационный характер: услуги, контакты, портфолио и ответы на частые вопросы. Материалы можно читать и цитировать со ссылкой на источник; копировать сайт целиком или выдавать за свой — нельзя.",
          "Мы стараемся держать информацию актуальной, но цены, сроки и состав работ всегда уточняются индивидуально."
        ]
      },
      {
        h2: "Заявка не равна договору",
        paragraphs: [
          "Сообщение во ВКонтакте, звонок или письмо — это обращение. Договор, счёт и этапы работ появляются после согласования. Пока документы не подписаны (или не акцептованы в согласованном формате), обязательства по разработке не возникают.",
          "Ориентиры «от … ₽» на сайте — ориентиры, не публичная оферта с фиксированной ценой."
        ]
      },
      {
        h2: "Связь и корректность",
        paragraphs: [
          "Просим писать по делу и без оскорблений. На спам, угрозы и заведомо ложные обращения можем не отвечать.",
          `Официальные контакты: ${CONTACT.projectsNetwork} ${CONTACT.projectsHandle}, ${CONTACT.email}, ${CONTACT.phoneDisplay}. Канал ${CONTACT.channelHandle} в Telegram — только для новостей, обращения по задачам там не принимаются.`
        ]
      },
      {
        h2: "Ответственность",
        paragraphs: [
          "Сайт предоставляется «как есть». За решения, принятые только на основе публичных материалов сайта без согласования с нами, ответственность несёт посетитель.",
          "Условия конкретных проектов регулируются договором между сторонами."
        ]
      },
      {
        h2: "Реквизиты",
        paragraphs: [
          `${COMPANY.fullName}, ИНН ${COMPANY.inn}, КПП ${COMPANY.kpp}, ОГРН ${COMPANY.ogrn}.`,
          `Адрес: ${COMPANY.address}.`
        ]
      }
    ]
  }
};

export default function LegalPage() {
  const { pathname } = useLocation();
  const kind = pathname.includes("privacy") ? "privacy" : "terms";
  const doc = DOCS[kind];
  const path = kind === "privacy" ? "/privacy" : "/terms";

  return (
    <>
      <SeoHead title={doc.title} description={doc.description} keywords={doc.keywords} path={path} />
      <ArticleLayout
        title={doc.h1}
        lead={doc.lead}
        crumbs={[{ label: doc.h1 }]}
        ctaText="Написать по задаче"
      >
        <div className="prose legal-doc">
          {doc.sections.map((section) => (
            <section key={section.h2}>
              <h2>{section.h2}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </section>
          ))}
          <p className="legal-doc-meta">
            Редакция: {doc.edition} ·{" "}
            <Link to={kind === "privacy" ? "/terms" : "/privacy"} className="inline-link">
              {kind === "privacy" ? "Условия использования" : "Политика конфиденциальности"}
            </Link>
          </p>
        </div>
      </ArticleLayout>
    </>
  );
}
