import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBars,
  faChevronDown,
  faChevronRight,
  faHouse,
  faLayerGroup,
  faPaperPlane,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { scrollToSection } from "../utils/scrollToSection.js";
import { CONTACT } from "../data/company.js";
import { HEADER_LINKS, NAV_HOME_SECTIONS, NAV_PAGES, SERVICE_NAV } from "../data/navigation.js";

export default function SiteNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const isHome = location.pathname === "/";
  const isServicePage = SERVICE_NAV.some((s) => s.to === location.pathname);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    function onPointerDown(event) {
      if (!servicesRef.current?.contains(event.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function close() {
    setOpen(false);
  }

  function goSection(sectionId) {
    close();
    if (isHome) {
      scrollToSection(sectionId);
      return;
    }
    navigate(`/#${sectionId}`);
    window.setTimeout(() => scrollToSection(sectionId), 150);
  }

  function isPageActive(path) {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  }

  return (
    <>
      <nav className="nav-top nav-top--desktop" aria-label="Навигация">
        <div
          className={`nav-services${servicesOpen ? " is-open" : ""}${isServicePage ? " is-active" : ""}`}
          ref={servicesRef}
        >
          <button
            type="button"
            className="nav-pill nav-services-trigger"
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((v) => !v)}
          >
            Услуги
            <FontAwesomeIcon icon={faChevronDown} className="nav-services-caret" />
          </button>
          <div className="nav-services-menu panel">
            {SERVICE_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-services-link${location.pathname === item.to ? " is-active" : ""}`}
                onClick={() => setServicesOpen(false)}
              >
                <span className="nav-services-link-label">{item.label}</span>
                <span className="nav-services-link-hint">{item.hint}</span>
              </Link>
            ))}
          </div>
        </div>

        {HEADER_LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-pill nav-pill--link${isPageActive(item.to) ? " is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}

        <a
          className="btn btn-nav-cta"
          href={CONTACT.projectsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          <span className="btn-label btn-label--light">Написать</span>
        </a>
      </nav>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
        <FontAwesomeIcon icon={open ? faXmark : faBars} />
      </button>

      <div className={`nav-drawer${open ? " is-open" : ""}`} id="site-nav-drawer" aria-hidden={!open}>
        <div className="nav-drawer-backdrop" onClick={close} aria-hidden />
        <div className="nav-drawer-panel panel">
          <div className="nav-drawer-head">
            <p className="nav-drawer-title">Меню</p>
            <button type="button" className="nav-drawer-close" onClick={close} aria-label="Закрыть">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <p className="nav-drawer-subtitle">Страницы</p>
          <div className="nav-drawer-list">
            {NAV_PAGES.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-drawer-item${isPageActive(item.to) ? " is-active" : ""}`}
                onClick={close}
              >
                <span className="nav-drawer-item-icon" aria-hidden>
                  <FontAwesomeIcon icon={item.to === "/" ? faHouse : faArrowUpRightFromSquare} />
                </span>
                <span className="nav-drawer-item-copy">
                  <span className="nav-drawer-item-label">{item.label}</span>
                  <span className="nav-drawer-item-hint">{item.hint}</span>
                </span>
                <FontAwesomeIcon icon={faChevronRight} className="nav-drawer-item-chevron" aria-hidden />
              </Link>
            ))}
          </div>

          <p className="nav-drawer-subtitle">Услуги</p>
          <div className="nav-drawer-list">
            {SERVICE_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-drawer-item${location.pathname === item.to ? " is-active" : ""}`}
                onClick={close}
              >
                <span className="nav-drawer-item-icon" aria-hidden>
                  <FontAwesomeIcon icon={faLayerGroup} />
                </span>
                <span className="nav-drawer-item-copy">
                  <span className="nav-drawer-item-label">{item.label}</span>
                  <span className="nav-drawer-item-hint">{item.hint}</span>
                </span>
                <FontAwesomeIcon icon={faChevronRight} className="nav-drawer-item-chevron" aria-hidden />
              </Link>
            ))}
          </div>

          <p className="nav-drawer-subtitle">Разделы главной</p>
          <div className="nav-drawer-list">
            {NAV_HOME_SECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="nav-drawer-item nav-drawer-item--section"
                onClick={() => goSection(item.id)}
              >
                <span className="nav-drawer-item-icon" aria-hidden>
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <span className="nav-drawer-item-copy">
                  <span className="nav-drawer-item-label">{item.label}</span>
                  <span className="nav-drawer-item-hint">{item.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
