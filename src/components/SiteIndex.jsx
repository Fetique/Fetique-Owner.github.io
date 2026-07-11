import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCircleQuestion,
  faLayerGroup,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { scrollToSection } from "../utils/scrollToSection.js";
import { NAV_HOME_SECTIONS, NAV_PAGES } from "../data/navigation.js";

const ICONS = {
  "/": faPaperPlane,
  "/portfolio": faBriefcase,
  "/faq": faCircleQuestion
};

const SECTION_ICONS = {
  services: faLayerGroup,
  process: faCircleQuestion,
  about: faBriefcase,
  contact: faPaperPlane
};

export default function SiteIndex() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const pages = NAV_PAGES.filter((p) => p.to !== "/").slice(0, 2);
  const sections = [
    NAV_HOME_SECTIONS.find((s) => s.id === "services"),
    ...pages.map((p) => ({ kind: "page", ...p })),
    NAV_HOME_SECTIONS.find((s) => s.id === "contact")
  ].filter(Boolean);

  function goSection(id) {
    if (isHome) {
      scrollToSection(id);
      return;
    }
    navigate(`/#${id}`);
    window.setTimeout(() => scrollToSection(id), 150);
  }

  return (
    <nav className="site-index" aria-label="Быстрая навигация">
      {sections.map((item) => {
        if (item.id) {
          return (
            <button
              key={item.id}
              type="button"
              className="site-index-card"
              onClick={() => goSection(item.id)}
            >
              <span className="site-index-icon" aria-hidden>
                <FontAwesomeIcon icon={SECTION_ICONS[item.id] ?? faLayerGroup} />
              </span>
              <span className="site-index-copy">
                <span className="site-index-label">{item.label}</span>
                <span className="site-index-hint">{item.hint}</span>
              </span>
            </button>
          );
        }

        return (
          <Link key={item.to} to={item.to} className="site-index-card">
            <span className="site-index-icon" aria-hidden>
              <FontAwesomeIcon icon={ICONS[item.to] ?? faBriefcase} />
            </span>
            <span className="site-index-copy">
              <span className="site-index-label">{item.label}</span>
              <span className="site-index-hint">{item.hint}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
