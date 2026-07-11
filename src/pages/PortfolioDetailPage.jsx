import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import SeoHead from "../components/SeoHead.jsx";
import ArticleLayout from "../components/ArticleLayout.jsx";
import { getPortfolioBySlug, PORTFOLIO_STATUS } from "../data/portfolio.js";
import { publicAsset } from "../utils/publicAsset.js";

function ProjectMedia({ media }) {
  if (!media?.src) return null;
  const src = publicAsset(media.src);

  if (media.type === "gif") {
    return (
      <figure className="project-detail-media">
        <img src={src} alt={media.alt ?? ""} width={1024} height={576} loading="lazy" decoding="async" />
      </figure>
    );
  }

  return (
    <figure className={`project-detail-media${media.src === "print.png" ? " project-detail-media--stamp" : ""}`}>
      <img src={src} alt={media.alt ?? ""} width={1024} height={576} loading="lazy" decoding="async" />
    </figure>
  );
}

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const item = getPortfolioBySlug(slug);

  if (!item?.detail) {
    return (
      <ArticleLayout title="Проект не найден" crumbs={[{ label: "Проекты", to: "/portfolio" }, { label: "404" }]}>
        <p>
          <Link to="/portfolio" className="inline-link">
            Вернуться к проектам
          </Link>
        </p>
      </ArticleLayout>
    );
  }

  const status = PORTFOLIO_STATUS[item.status];
  const { detail } = item;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: detail.title,
    description: detail.description,
    url: `https://fetique.com/portfolio/${item.slug}`
  };

  return (
    <>
      <SeoHead
        title={`${detail.title} — Fetique`}
        description={detail.description}
        keywords={`${item.title}, Fetique, портфолио, ${item.tags.join(", ")}`}
        path={`/portfolio/${item.slug}`}
        jsonLd={jsonLd}
      />
      <ArticleLayout
        ctaText="Обсудить похожий проект"
        title={detail.title}
        lead={detail.description}
        crumbs={[{ label: "Проекты", to: "/portfolio" }, { label: item.title }]}
      >
        <div className="project-detail-meta">
          <span className={`portfolio-status portfolio-status--${item.status}`}>{status.label}</span>
          {item.year ? <span className="project-detail-year">{item.year}</span> : null}
        </div>

        <ProjectMedia media={detail.media} />

        {detail.sections?.map((section) => (
          <section key={section.h2} className="article-section">
            <h2>{section.h2}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}

        {item.url ? (
          <p className="project-detail-link">
            <a className="btn btn-primary btn-primary--shine" href={item.url} target="_blank" rel="noopener noreferrer">
              <span className="btn-label">Открыть проект</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </p>
        ) : null}

        <p className="project-detail-back">
          <Link to="/portfolio" className="inline-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Все проекты
          </Link>
        </p>
      </ArticleLayout>
    </>
  );
}
