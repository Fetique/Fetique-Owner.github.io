import { useEffect, useRef, useState } from "react";
import { TAGLINE } from "../data/company.js";

const MIN_MS = 2000;
const FADE_MS = 750;
const RING_R = 62;
const RING_SIZE = 148;
const RING_C = 2 * Math.PI * RING_R;
const base = import.meta.env.BASE_URL || "/";

export default function Preloader({ mode, onBootFadeComplete }) {
  const [exiting, setExiting] = useState(false);
  const progressCircleRef = useRef(null);

  useEffect(() => {
    if (mode !== "boot") return undefined;
    setExiting(false);

    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / (MIN_MS - 200)) * 100);
      const circle = progressCircleRef.current;
      if (circle) {
        circle.style.strokeDashoffset = String(RING_C - (RING_C * p) / 100);
      }
      if (elapsed < MIN_MS) {
        frame = requestAnimationFrame(tick);
      } else {
        if (circle) circle.style.strokeDashoffset = "0";
        setExiting(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mode]);

  useEffect(() => {
    if (mode !== "boot" || !exiting) return undefined;
    const t = window.setTimeout(() => onBootFadeComplete?.(), FADE_MS);
    return () => window.clearTimeout(t);
  }, [mode, exiting, onBootFadeComplete]);

  if (mode == null) return null;

  const isSocial = mode === "social";
  const label = isSocial ? "Telegram" : "Fetique";

  return (
    <div
      className={`preloader-root ${exiting ? "preloader-exit" : ""} ${isSocial ? "preloader-social" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={isSocial ? "Открываем Telegram" : "Загрузка"}
    >
      <div className="preloader-grain" aria-hidden />
      <div className="preloader-mesh" aria-hidden />
      <div className="preloader-orbit" aria-hidden>
        <span className="orbit-dot d1" />
        <span className="orbit-dot d2" />
        <span className="orbit-dot d3" />
      </div>

      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <svg
            className="preloader-ring-svg"
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            aria-hidden
          >
            <defs>
              <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ac8246" />
                <stop offset="50%" stopColor="#e8d4b8" />
                <stop offset="100%" stopColor="#d38c74" />
              </linearGradient>
            </defs>
            <circle
              className="preloader-ring-track"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_R}
            />
            <circle
              ref={progressCircleRef}
              className="preloader-ring-progress"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_R}
              style={{
                strokeDasharray: RING_C,
                strokeDashoffset: RING_C,
              }}
            />
          </svg>
          <img src={`${base}logo.svg`} alt="" className="preloader-logo" width={80} height={80} />
        </div>

        <p className="preloader-brand text-gradient">{label}</p>
        {!isSocial && <p className="preloader-tagline">{TAGLINE}</p>}

        <div className="preloader-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
