import { useEffect, useState } from "react";

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
    visible: scrollHeight > clientHeight + 8
  };
}

export default function PageScrollbar() {
  const [metrics, setMetrics] = useState(getMetrics);

  useEffect(() => {
    function update() {
      setMetrics(getMetrics());
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!metrics.visible) return null;

  return (
    <div
      className="page-scrollbar"
      style={{ top: `${metrics.topOffset}px`, height: `${metrics.trackHeight}px` }}
      aria-hidden
    >
      <div className="page-scrollbar-track" />
      <div
        className="page-scrollbar-thumb"
        style={{ transform: `translateY(${metrics.thumbTop}px)`, height: `${metrics.thumbHeight}px` }}
      >
        <span className="page-scrollbar-shine" />
      </div>
    </div>
  );
}
