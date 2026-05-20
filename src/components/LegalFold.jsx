import { useRef, useState } from "react";
import { COMPANY, CONTACT } from "../data/company.js";

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
  const contentRef = useRef(null);

  function toggle() {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        window.setTimeout(() => scrollToLegalBlock(contentRef.current || blockRef.current), 420);
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
      <div className="legal-body" aria-hidden={!open}>
        <div ref={contentRef} className="legal-body-inner" id="legal-details">
          <p className="legal-name">{COMPANY.fullName}</p>
          <dl className="legal-dl">
            <div>
              <dt>ИНН</dt>
              <dd>{COMPANY.inn}</dd>
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
              <dt>Деятельность</dt>
              <dd>{COMPANY.activity}</dd>
            </div>
          </dl>
          <p className="legal-note">
            Договор заключает {COMPANY.shortName}. На связи по проектам — {CONTACT.founderName}.
          </p>
        </div>
      </div>
    </div>
  );
}
