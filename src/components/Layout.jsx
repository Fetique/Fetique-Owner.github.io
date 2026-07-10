import { scrollToSection } from "../utils/scrollToSection.js";
import { COMPANY, CONTACT } from "../data/company.js";

const base = import.meta.env.BASE_URL || "/";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="header glass">
        <a
          href="#top"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
        >
          <img src={`${base}logo.svg`} alt="Fetique" className="brand-logo" width={52} height={52} />
          <span className="brand-name">Fetique</span>
        </a>
        <nav className="nav-top" aria-label="Разделы">
          <button type="button" className="nav-pill" onClick={() => scrollToSection("services")}>
            Услуги
          </button>
          <button type="button" className="nav-pill" onClick={() => scrollToSection("process")}>
            Как работаем
          </button>
          <button type="button" className="nav-pill" onClick={() => scrollToSection("about")}>
            О компании
          </button>
          <button type="button" className="nav-pill" onClick={() => scrollToSection("contact")}>
            Связь
          </button>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer glass">
        <div className="footer-inner">
          <p>
            © {new Date().getFullYear()} {COMPANY.shortName} · {COMPANY.brand}
          </p>
          <p className="footer-meta">
            ИНН {COMPANY.inn} ·{" "}
            <a href={`tel:${CONTACT.phoneTel}`} className="footer-link">
              {CONTACT.phoneDisplay}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${CONTACT.email}`} className="footer-link">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
