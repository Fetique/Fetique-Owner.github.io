import SeoHead from "../components/SeoHead.jsx";
import ArticleLayout from "../components/ArticleLayout.jsx";
import FaqAccordion from "../components/FaqAccordion.jsx";
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
        <FaqAccordion items={FAQ_ITEMS} />
      </ArticleLayout>
    </>
  );
}
