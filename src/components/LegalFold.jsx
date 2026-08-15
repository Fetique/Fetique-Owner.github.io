import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY, CONTACT } from "../data/company.js";
import { useExpandHeight } from "../hooks/useExpandHeight.js";

function scrollToLegalBlock(node) {
  if (!node) return;
  const header = document.querySelector(".header");
  const headerH = header?.offsetHeight ?? 92;
  const top = node.getBoundingClientRect().top + window.scrollY - headerH - 16;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export default function LegalFold() {
  const [open, setOpen] = useState(false);
  const blockRef = useRef(null);
  const bodyRef = useExpandHeight(open);

  function toggle() {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        window.setTimeout(() => scrollToLegalBlock(blockRef.current), 420);
      }
      return next;
    });
  }

  return (
    <div ref={blockRef} className={`legal-fold panel ${open ? "is-open" : ""}`}>
      <button type="button" className="legal-summary" onClick={toggle} aria-expanded={open}>
        <span className="legal-summary-text">Юридические реквизиты {COMPANY.shortName}</span>
        <span className="legal-summary-icon" aria-hidden />
      </button>
      <div ref={bodyRef} className="legal-body" aria-hidden={!open}>
        <div className="legal-body-inner" id="legal-details">
          <p className="legal-name">{COMPANY.fullName}</p>
          <dl className="legal-dl">
            <div>
              <dt>ИНН</dt>
              <dd>{COMPANY.inn}</dd>
            </div>
            <div>
              <dt>КПП</dt>
              <dd>{COMPANY.kpp}</dd>
            </div>
            <div>
              <dt>ОГРН</dt>
              <dd>{COMPANY.ogrn}</dd>
            </div>
            <div>
              <dt>Дата регистрации</dt>
              <dd>{COMPANY.registered}</dd>
            </div>
            <div className="legal-dl--wide">
              <dt>Юридический адрес</dt>
              <dd>{COMPANY.address}</dd>
            </div>
            <div className="legal-dl--wide">
              <dt>Деятельность</dt>
              <dd>{COMPANY.activity}</dd>
            </div>
            <div>
              <dt>Телефон</dt>
              <dd>
                <a href={`tel:${CONTACT.phoneTel}`} className="contact-glow contact-glow--slow">
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`} className="contact-glow contact-glow--fast">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="legal-note">
            По проектам —{" "}
            <a href={CONTACT.projectsUrl} target="_blank" rel="noopener noreferrer" className="contact-glow">
              {CONTACT.projectsHandle}
            </a>
            .{" "}
            <Link to="/privacy" className="inline-link">
              Конфиденциальность
            </Link>
            {" · "}
            <Link to="/terms" className="inline-link">
              Условия
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
