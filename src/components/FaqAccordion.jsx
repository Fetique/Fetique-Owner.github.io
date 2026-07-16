import { useId, useState } from "react";
import ContactRichText from "./ContactRichText.jsx";

function FaqItem({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const answerId = useId();

  return (
    <article className={`faq-item panel${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="faq-trigger-label">{item.q}</span>
        <span className="faq-trigger-icon" aria-hidden />
      </button>
      <div id={answerId} className="faq-answer" aria-hidden={!open}>
        <div className="faq-answer-inner">
          <ContactRichText text={item.a} />
        </div>
      </div>
    </article>
  );
}

export default function FaqAccordion({ items }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <FaqItem key={item.q} item={item} defaultOpen={index === 0} />
      ))}
    </div>
  );
}
