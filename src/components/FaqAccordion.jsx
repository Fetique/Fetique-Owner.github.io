import { useId, useLayoutEffect, useRef, useState } from "react";
import ContactRichText from "./ContactRichText.jsx";

function FaqItem({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const answerId = useId();
  const answerRef = useRef(null);
  const innerRef = useRef(null);
  const skipMotionRef = useRef(defaultOpen);

  useLayoutEffect(() => {
    const answer = answerRef.current;
    const inner = innerRef.current;
    if (!answer || !inner) return undefined;

    if (skipMotionRef.current) {
      answer.style.height = "auto";
      skipMotionRef.current = false;
      return undefined;
    }

    answer.style.height = open ? `${inner.scrollHeight}px` : "0px";

    const onTransitionEnd = (event) => {
      if (event.propertyName !== "height" || event.target !== answer) return;
      if (open) answer.style.height = "auto";
    };

    answer.addEventListener("transitionend", onTransitionEnd);
    return () => answer.removeEventListener("transitionend", onTransitionEnd);
  }, [open]);

  function handleToggle() {
    const answer = answerRef.current;
    const inner = innerRef.current;

    if (open && answer && inner) {
      answer.style.height = `${inner.scrollHeight}px`;
      void answer.offsetHeight;
    }

    setOpen((prev) => !prev);
  }

  return (
    <article className={`faq-item panel${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={handleToggle}
      >
        <span className="faq-trigger-label">{item.q}</span>
        <span className="faq-trigger-icon" aria-hidden />
      </button>
      <div id={answerId} ref={answerRef} className="faq-answer" aria-hidden={!open}>
        <div ref={innerRef} className="faq-answer-inner">
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
