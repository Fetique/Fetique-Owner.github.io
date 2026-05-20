import ThemeToggle from "./ThemeToggle.jsx";
import { scrollToSection } from "../utils/scrollToSection.js";
import { COMPANY } from "../data/company.js";

const base = import.meta.env.BASE_URL || "/";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <div className="theme-reveal-layer" aria-hidden />
      <header className="header glass">
        <a
          href="#top"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("top");
          }}
        >
          <img src={`${base}logo.png`} alt="Fetique" className="brand-logo" width={52} height={52} />
          <span className="brand-name">Fetique</span>
        </a>
        <nav className="nav-top" aria-label="Разделы">
          <button type="button" className="nav-pill" onClick={() => scrollToSection("philosophy")}>
            Философия
          </button>
          <button type="button" className="nav-pill" onClick={() => scrollToSection("directions")}>
            Направления
          </button>
          <button type="button" className="nav-pill" onClick={() => scrollToSection("contact")}>
            Связь
          </button>
          <ThemeToggle />
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer glass">
        <div className="footer-inner">
          <p>
            © {new Date().getFullYear()} {COMPANY.shortName} · {COMPANY.brand}
          </p>
          <p className="footer-meta">ИНН {COMPANY.inn}</p>
        </div>
      </footer>
    </div>
  );
}
