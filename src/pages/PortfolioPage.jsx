import SeoHead from "../components/SeoHead.jsx";
import ArticleLayout from "../components/ArticleLayout.jsx";
import PortfolioShowcase from "../components/PortfolioShowcase.jsx";
import { getArticleBySlug } from "../data/seoContent.js";

export default function PortfolioPage() {
  const article = getArticleBySlug("portfolio");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: article.h1,
    description: article.description,
    url: "https://fetique.com/portfolio"
  };

  return (
    <>
      <SeoHead
        title={article.title}
        description={article.description}
        keywords={article.keywords}
        path="/portfolio"
        jsonLd={jsonLd}
      />
      <ArticleLayout
        ctaText="Обсудить свой проект"
        title={article.h1}
        lead={article.lead}
        crumbs={[{ label: "Проекты" }]}
      >
        <PortfolioShowcase />
      </ArticleLayout>
    </>
  );
}
