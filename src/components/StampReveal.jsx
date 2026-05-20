import { useEffect, useRef, useState } from "react";

const base = import.meta.env.BASE_URL || "/";

export default function StampReveal({ children }) {
  const blockRef = useRef(null);
  const [stamped, setStamped] = useState(false);

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

  return (
    <div ref={blockRef} className="philosophy-quote">
      <blockquote className="quote-block">
        <p className="quote-text">{children}</p>
      </blockquote>
      <div className="stamp-stage" aria-hidden>
        <div className="stamp-glow" />
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
