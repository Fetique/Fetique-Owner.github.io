import { Link, useLocation } from "react-router-dom";
import SeoHead from "../components/SeoHead.jsx";
import ArticleLayout from "../components/ArticleLayout.jsx";
import ContactRichText from "../components/ContactRichText.jsx";
import ServiceNav from "../components/ServiceNav.jsx";
import { getArticleBySlug } from "../data/seoContent.js";
import { SERVICES } from "../data/company.js";
import { PAGE_LABELS } from "../data/navigation.js";

const SLUG_TO_SERVICE_INDEX = {
  "razrabotka-sajta-i-lendinga": 0,
  "dorabotka-i-podderzhka-sajta": 1,
  "digital-oformlenie": 2,
  "it-soprovozhdenie-dlya-biznesa": 3
};

export default function ServiceArticlePage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <ArticleLayout title="Страница не найдена" crumbs={[{ label: "404" }]}>
        <p>
          <Link to="/" className="inline-link">
            Вернуться на главную
          </Link>
        </p>
      </ArticleLayout>
    );
  }

  const path = `/${slug}`;
  const serviceIndex = SLUG_TO_SERVICE_INDEX[slug];
  const related = serviceIndex != null ? SERVICES[serviceIndex] : null;
  const pageLabel = PAGE_LABELS[path] ?? article.h1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: article.h1,
    description: article.description,
    provider: {
      "@type": "Organization",
      name: "ООО «Фетик»",
      url: "https://fetique.com/"
    },
    areaServed: "RU"
  };

  return (
    <>
      <SeoHead
        title={article.title}
        description={article.description}
        keywords={article.keywords}
        path={path}
        jsonLd={jsonLd}
      />
      <ArticleLayout
        title={article.h1}
        lead={article.lead}
        crumbs={[{ label: "Услуги", to: "/#services" }, { label: pageLabel }]}
      >
        <ServiceNav currentSlug={slug} />
        {related ? <p className="article-note">{related.note}</p> : null}
        {article.sections?.map((section) => (
          <section key={section.h2} className="article-section">
            <h2>{section.h2}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>
                <ContactRichText text={p} />
              </p>
            ))}
          </section>
        ))}
        <nav className="article-related" aria-label="Другие услуги">
          <h2>Другие услуги</h2>
          <div className="article-related-pills">
            {SERVICES.map((item, i) => {
              const keys = Object.keys(SLUG_TO_SERVICE_INDEX);
              const itemSlug = keys.find((k) => SLUG_TO_SERVICE_INDEX[k] === i);
              if (!itemSlug || itemSlug === slug) return null;
              return (
                <Link key={itemSlug} to={`/${itemSlug}`} className="service-nav-pill">
                  {item.title}
                </Link>
              );
            })}
          </div>
        </nav>
      </ArticleLayout>
    </>
  );
}
