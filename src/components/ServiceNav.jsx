import { Link, useLocation } from "react-router-dom";
import { SERVICES } from "../data/company.js";

export default function ServiceNav({ currentSlug }) {
  const location = useLocation();

  return (
    <nav className="service-nav" aria-label="Услуги">
      {SERVICES.map((item) => {
        const active = currentSlug === item.slug || location.pathname === `/${item.slug}`;
        return (
          <Link
            key={item.slug}
            to={`/${item.slug}`}
            className={`service-nav-pill${active ? " is-active" : ""}`}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
