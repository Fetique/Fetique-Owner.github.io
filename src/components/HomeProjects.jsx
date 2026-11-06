import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getHomePortfolioPreview, PORTFOLIO_STATUS } from "../data/portfolio.js";
import { publicAsset } from "../utils/publicAsset.js";

export default function HomeProjects() {
  const items = getHomePortfolioPreview();

  return (
    <section id="projects" className="section home-projects">
      <div className="home-projects-head" data-aos="fade-up">
        <div>
          <p className="section-kicker">/ 01 — проекты</p>
          <h2 className="section-title">Живые кейсы</h2>
          <p className="section-lead">
            Сайты, АРМ, боты и внутренние инструменты — с описанием задачи и актуальным статусом.
          </p>
        </div>
        <Link to="/portfolio" className="home-projects-all">
          Все проекты <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      <div className="home-projects-grid">
        {items.map((item, i) => {
          const status = PORTFOLIO_STATUS[item.status];
          const img = item.image ? publicAsset(item.image) : null;

          return (
            <article
              key={item.id}
              className={`home-project-card${i === 0 ? " home-project-card--lead" : ""}`}
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <div
                className={`home-project-thumb${item.thumbFit === "logo" ? " home-project-thumb--logo" : ""}${
                  i === 0 && item.thumbPosition === "right" ? " thumb-right" : ""
                }`}
              >
                {i === 0 && item.leadShots?.length ? (
                  <div className="home-project-phones">
                    {item.leadShots.map((shot) => (
                      <img key={shot} src={publicAsset(shot)} alt="" width={585} height={1266} loading="lazy" decoding="async" />
                    ))}
                  </div>
                ) : img ? (
                  <img src={img} alt="" width={640} height={360} loading="lazy" decoding="async" />
                ) : (
                  <div className="portfolio-media-pending portfolio-media-pending--home" aria-hidden>
                    <span className="text-gradient">{item.title}</span>
                  </div>
                )}
              </div>
              <div className="home-project-body">
                <div className="home-project-meta">
                  <span className={`portfolio-status portfolio-status--${item.status}`}>{status.label}</span>
                  {item.year ? <span className="home-project-year">{item.year}</span> : null}
                </div>
                <p className="portfolio-card-eyebrow">{item.subtitle}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.slug ? (
                  <Link to={`/portfolio/${item.slug}`} className="portfolio-link">
                    Подробнее <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
