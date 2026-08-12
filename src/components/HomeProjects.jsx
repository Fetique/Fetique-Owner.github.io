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
          <h2 className="section-title">Проекты</h2>
          <p className="section-lead">
            Живые кейсы и то, что сейчас в разработке — без выдуманных «агентских» портфолио.
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
              className="panel home-project-card"
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <div className="home-project-thumb">
                {img ? (
                  <img src={img} alt="" width={640} height={360} loading="lazy" decoding="async" />
                ) : (
                  <div className="portfolio-media-pending portfolio-media-pending--home" aria-hidden>
                    <span>?</span>
                  </div>
                )}
              </div>
              <div className="home-project-body">
                <div className="home-project-meta">
                  <span className={`portfolio-status portfolio-status--${item.status}`}>
                    {status.label}
                  </span>
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
