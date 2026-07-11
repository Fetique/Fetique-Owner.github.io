import SeoHead from "../components/SeoHead.jsx";
import ArticleLayout from "../components/ArticleLayout.jsx";
import ContactRichText from "../components/ContactRichText.jsx";
import { getArticleBySlug, FAQ_ITEMS } from "../data/seoContent.js";

export default function FaqPage() {
  const article = getArticleBySlug("faq");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <>
      <SeoHead
        title={article.title}
        description={article.description}
        keywords={article.keywords}
        path="/faq"
        jsonLd={jsonLd}
      />
      <ArticleLayout
        ctaText="Задать свой вопрос"
        title={article.h1}
        lead={article.lead}
        crumbs={[{ label: "Вопросы и ответы" }]}
      >
        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.q} className="faq-item panel" open={index === 0}>
              <summary>{item.q}</summary>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  <ContactRichText text={item.a} />
                </div>
              </div>
            </details>
          ))}
        </div>
      </ArticleLayout>
    </>
  );
}
