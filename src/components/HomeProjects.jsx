import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { getHomePortfolioPreview, PORTFOLIO_STATUS } from "../data/portfolio.js";
import { publicAsset } from "../utils/publicAsset.js";

function ProgressRing({ value, size = 44 }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="progress-ring progress-ring--busy" style={{ width: size, height: size }} aria-hidden>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="progress-ring-track" cx={size / 2} cy={size / 2} r={r} />
        <circle
          className="progress-ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="progress-ring-label">{value}%</span>
    </div>
  );
}

export default function HomeProjects() {
  const items = getHomePortfolioPreview();

  return (
    <section id="projects" className="section home-projects">
      <div className="home-projects-head" data-aos="fade-up">
        <div>
          <p className="section-kicker">/ 01 — проекты</p>
          <h2 className="section-title">Живые кейсы</h2>
          <p className="section-lead">
            Запущенные проекты и то, что сейчас в разработке — с нормальным описанием, а не одной строкой.
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
          const progress = item.progress ?? status.progress ?? 0;
          const showProgress = item.status !== "live";

          return (
            <article
              key={item.id}
              className={`panel home-project-card${i === 0 ? " home-project-card--lead" : ""}`}
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <div className={`home-project-thumb${item.thumbFit === "logo" ? " home-project-thumb--logo" : ""}`}>
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
                {showProgress ? (
                  <div className="portfolio-side-progress home-project-progress">
                    <ProgressRing value={progress} />
                    <span className="portfolio-side-progress-text">
                      <FontAwesomeIcon icon={faCircleNotch} spin /> {status.label}
                    </span>
                  </div>
                ) : null}
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
