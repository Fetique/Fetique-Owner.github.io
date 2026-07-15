import { Link, useLocation } from "react-router-dom";
import PageScrollbar from "./PageScrollbar.jsx";
import SiteNav from "./SiteNav.jsx";
import { COMPANY, CONTACT } from "../data/company.js";

const base = import.meta.env.BASE_URL || "/";

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isBusinessCards = location.pathname === "/vizitki";

  if (isBusinessCards) {
    return <div className="app-shell app-shell--bcards">{children}</div>;
  }

  return (
    <div className="app-shell">
      <PageScrollbar />
      <header className="header glass">
        <Link to="/" className="brand">
          <img src={`${base}logo.svg`} alt="Fetique" className="brand-logo" width={52} height={52} />
          <span className="brand-name">Fetique</span>
        </Link>
        <SiteNav />
      </header>
      <main className={isHome ? "main--landing" : "main--article"}>{children}</main>
      <footer className="footer glass">
        <div className="footer-inner">
          <p>
            © {new Date().getFullYear()} {COMPANY.shortName} · {COMPANY.brand}
          </p>
          <p className="footer-meta">
            ИНН {COMPANY.inn} ·{" "}
            <a href={`tel:${CONTACT.phoneTel}`} className="footer-link">
              <span className="contact-glow contact-glow--slow">{CONTACT.phoneDisplay}</span>
            </a>{" "}
            ·{" "}
            <a href={`mailto:${CONTACT.email}`} className="footer-link">
              <span className="contact-glow contact-glow--fast">{CONTACT.email}</span>
            </a>
          </p>
          <nav className="footer-seo" aria-label="Страницы сайта">
            <Link to="/razrabotka-sajta-i-lendinga">Разработка сайта</Link>
            <Link to="/dorabotka-i-podderzhka-sajta">Поддержка сайта</Link>
            <Link to="/digital-oformlenie">Digital</Link>
            <Link to="/it-soprovozhdenie-dlya-biznesa">IT-сопровождение</Link>
            <Link to="/portfolio">Портфолио</Link>
            <Link to="/faq">Вопросы</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
