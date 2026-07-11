import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHouse } from "@fortawesome/free-solid-svg-icons";

export default function PageHero({ title, lead, crumbs = [] }) {
  return (
    <header className="page-hero">
      <nav className="breadcrumbs" aria-label="Вы здесь">
        <Link to="/" className="breadcrumb-link">
          <FontAwesomeIcon icon={faHouse} /> Главная
        </Link>
        {crumbs.map((crumb) => (
          <span key={crumb.label} className="breadcrumb-segment">
            <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-chevron" aria-hidden />
            {crumb.to ? (
              <Link to={crumb.to} className="breadcrumb-link">
                {crumb.label}
              </Link>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
      <h1>{title}</h1>
      {lead ? <p className="page-hero-lead">{lead}</p> : null}
    </header>
  );
}
