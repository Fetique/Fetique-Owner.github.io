import { useEffect, useId, useRef, useState } from "react";
import { COMPANY, APRIL_BADGE_HINT } from "../data/company.js";

const base = import.meta.env.BASE_URL || "/";

export default function StampReveal({ children }) {
  const blockRef = useRef(null);
  const hintId = useId();
  const [stamped, setStamped] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    const node = blockRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setStamped(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -4% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!stamped) return undefined;

    const prefersHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersHover) return undefined;

    const pulseTimer = window.setTimeout(() => setBadgePulse(true), 900);
    const stopPulseTimer = window.setTimeout(() => setBadgePulse(false), 4200);

    return () => {
      window.clearTimeout(pulseTimer);
      window.clearTimeout(stopPulseTimer);
    };
  }, [stamped]);

  function toggleHint() {
    setHintOpen((prev) => !prev);
    setBadgePulse(false);
  }

  return (
    <div ref={blockRef} className="philosophy-quote">
      <blockquote className="quote-block">
        <p className="quote-text">{children}</p>
      </blockquote>
      <div className="stamp-stage">
        <button
          type="button"
          className={`april-badge ${badgePulse ? "april-badge--pulse" : ""} ${hintOpen ? "is-open" : ""}`}
          aria-label={`Дата регистрации ${COMPANY.shortName}`}
          aria-expanded={hintOpen}
          aria-describedby={hintOpen ? hintId : undefined}
          onClick={toggleHint}
        >
          <span className="april-badge-date">{COMPANY.registered}</span>
          <span className="april-badge-hint" id={hintId} role="tooltip">
            {APRIL_BADGE_HINT}
          </span>
        </button>
        <div className="stamp-glow" aria-hidden />
        <img
          src={`${base}print.png`}
          alt=""
          className={`company-stamp ${stamped ? "company-stamp--stamped" : ""}`}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
