import { useEffect, useRef, useState } from "react";
import { BRAND_STRIP } from "../data/company.js";

export default function BrandStrip() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`brand-strip-wrap ${visible ? "is-visible" : ""}`}>
      <p className="brand-strip-line text-shimmer text-shimmer--slow">{BRAND_STRIP}</p>
    </div>
  );
}
