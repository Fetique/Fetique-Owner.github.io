import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faCircleNotch,
  faPaperPlane,
  faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";
import { PORTFOLIO_ITEMS, PORTFOLIO_STATUS } from "../data/portfolio.js";
import { CONTACT } from "../data/company.js";

const base = import.meta.env.BASE_URL || "/";

function ProgressRing({ value, size = 56 }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="progress-ring" style={{ width: size, height: size }} aria-hidden>
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

function BrowserFrame({ src, url, alt }) {
  return (
    <div className="browser-frame">
      <div className="browser-frame-chrome" aria-hidden>
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">{url}</span>
      </div>
      <div className="browser-frame-screen">
        <img src={src} alt={alt} width={1024} height={640} loading="lazy" decoding="async" />
        <div className="browser-frame-shine" aria-hidden />
      </div>
    </div>
  );
}

function PortfolioCardActions({ item }) {
  if (item.placeholder) {
    return (
      <a className="btn btn-contact portfolio-invite-btn" href={CONTACT.projectsUrl} target="_blank" rel="noopener noreferrer">
        <span className="btn-contact-body">
          <span className="btn-contact-label">Стать следующим кейсом</span>
          <span className="contact-glow">{CONTACT.projectsHandle}</span>
        </span>
        <FontAwesomeIcon icon={faPaperPlane} />
      </a>
    );
  }

  if (item.slug && item.detail) {
    return (
      <Link to={`/portfolio/${item.slug}`} className="portfolio-link">
        Подробнее <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    );
  }

  if (item.url) {
    return (
      <a className="portfolio-link" href={item.url} target="_blank" rel="noopener noreferrer">
        Открыть <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    );
  }

  return <span className="portfolio-link portfolio-link--muted">Скоро в открытом доступе</span>;
}

export default function PortfolioShowcase() {
  const featured = PORTFOLIO_ITEMS.find((item) => item.featured) ?? PORTFOLIO_ITEMS[0];
  const rowItems = PORTFOLIO_ITEMS.filter((item) => item.id !== featured.id);

  const featuredStatus = PORTFOLIO_STATUS[featured.status];
  const featuredImg = featured.image ? `${base}${featured.image}` : null;

  return (
    <div className="portfolio-showcase">
      <article className="portfolio-feature panel">
        <div className="portfolio-feature-visual">
          {featuredImg ? (
            <BrowserFrame src={featuredImg} url={featured.title} alt={`Превью ${featured.title}`} />
          ) : (
            <div className="portfolio-feature-placeholder" aria-hidden />
          )}
        </div>
        <div className="portfolio-feature-copy">
          <div className="portfolio-feature-meta">
            <span className="portfolio-index">01</span>
            <span className={`portfolio-status portfolio-status--${featured.status}`}>
              {featuredStatus.label}
            </span>
          </div>
          <p className="portfolio-card-eyebrow">
            {featured.subtitle}
            {featured.year ? ` · ${featured.year}` : ""}
          </p>
          <h2>{featured.title}</h2>
          <p>{featured.description}</p>
          <ul className="portfolio-tags">
            {featured.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="portfolio-feature-actions">
            {featured.slug && featured.detail ? (
              <Link to={`/portfolio/${featured.slug}`} className="btn btn-primary btn-primary--shine">
                <span className="btn-label">Подробнее о проекте</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            ) : null}
            {featured.url ? (
              <a className="btn btn-contact portfolio-feature-btn" href={featured.url} target="_blank" rel="noopener noreferrer">
                <span className="btn-contact-label">Открыть сайт</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            ) : null}
          </div>
        </div>
      </article>

      <div className="portfolio-row">
        {rowItems.map((item, index) => {
          const status = PORTFOLIO_STATUS[item.status];
          const progress = item.progress ?? status.progress ?? 0;
          const imgSrc = item.image ? `${base}${item.image}` : null;

          return (
            <article
              key={item.id}
              className={`portfolio-side panel${item.placeholder ? " portfolio-side--invite" : ""}`}
            >
              <div className="portfolio-side-head">
                <span className="portfolio-index">{String(index + 2).padStart(2, "0")}</span>
                <span className={`portfolio-status portfolio-status--${item.status}`}>{status.label}</span>
              </div>

              {item.placeholder ? (
                <div className="portfolio-invite-visual" aria-hidden>
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                </div>
              ) : imgSrc ? (
                <div
                  className={`portfolio-side-thumb${item.id === "fetique-docs" ? " portfolio-side-thumb--stamp" : ""}`}
                >
                  <img src={imgSrc} alt="" width={320} height={180} loading="lazy" decoding="async" />
                </div>
              ) : null}

              <div className="portfolio-side-body">
                <p className="portfolio-card-eyebrow">{item.subtitle}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="portfolio-tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                {item.status !== "live" && !item.placeholder ? (
                  <div className="portfolio-side-progress">
                    <ProgressRing value={progress} />
                    <span className="portfolio-side-progress-text">
                      <FontAwesomeIcon icon={faCircleNotch} spin={item.status === "internal"} /> {status.label}
                    </span>
                  </div>
                ) : null}

                <PortfolioCardActions item={item} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
