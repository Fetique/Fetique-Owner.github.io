import { useEffect, useRef, useState } from "react";

function getHeaderOffset() {
  const header = document.querySelector(".header");
  return (header?.getBoundingClientRect().height ?? 92) + 10;
}

function getMetrics() {
  const root = document.documentElement;
  const scrollTop = root.scrollTop;
  const scrollHeight = root.scrollHeight;
  const clientHeight = root.clientHeight;
  const scrollable = Math.max(scrollHeight - clientHeight, 1);
  const topOffset = getHeaderOffset();
  const bottomPad = 16;
  const trackHeight = Math.max(clientHeight - topOffset - bottomPad, 80);
  const thumbHeight = Math.max(48, Math.min(trackHeight, (clientHeight / scrollHeight) * trackHeight));
  const travel = Math.max(trackHeight - thumbHeight, 0);
  const thumbTop = (scrollTop / scrollable) * travel;

  return {
    topOffset,
    trackHeight,
    thumbTop,
    thumbHeight,
    visible: scrollHeight > clientHeight + 8,
  };
}

/** Кастомный скроллбар: обновляет DOM напрямую, без React re-render на каждый scroll */
export default function PageScrollbar() {
  const rootRef = useRef(null);
  const thumbRef = useRef(null);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;

    function apply() {
      const m = getMetrics();
      if (m.visible !== visibleRef.current) {
        visibleRef.current = m.visible;
        setVisible(m.visible);
      }
      const root = rootRef.current;
      const thumb = thumbRef.current;
      if (!root || !thumb || !m.visible) return;
      root.style.top = `${m.topOffset}px`;
      root.style.height = `${m.trackHeight}px`;
      thumb.style.height = `${m.thumbHeight}px`;
      thumb.style.transform = `translate3d(0, ${m.thumbTop}px, 0)`;
    }

    function schedule() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="page-scrollbar" aria-hidden>
      <div className="page-scrollbar-track" />
      <div ref={thumbRef} className="page-scrollbar-thumb">
        <span className="page-scrollbar-shine" />
      </div>
    </div>
  );
}
