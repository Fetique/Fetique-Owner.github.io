import { useEffect, useRef, useState } from "react";
import { WORK_STEPS } from "../data/company.js";

const TICK_MS = 1050;
const PAUSE_MS = 750;
const FADE_MS = 550;

export default function ProcessSteps() {
  const trackRef = useRef(null);
  const timersRef = useRef([]);
  const [inView, setInView] = useState(false);
  const [tick, setTick] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };

    const schedule = (fn, delay) => {
      const id = window.setTimeout(fn, delay);
      timersRef.current.push(id);
      return id;
    };

    if (!inView) {
      clearTimers();
      setTick(0);
      setFading(false);
      return undefined;
    }

    const runCycle = () => {
      setFading(false);
      setTick(0);

      WORK_STEPS.forEach((_, index) => {
        schedule(() => setTick(index + 1), TICK_MS * (index + 1));
      });

      schedule(() => {
        setFading(true);
        schedule(() => {
          setTick(0);
          setFading(false);
          schedule(runCycle, PAUSE_MS);
        }, FADE_MS);
      }, TICK_MS * WORK_STEPS.length + PAUSE_MS);
    };

    runCycle();
    return clearTimers;
  }, [inView]);

  return (
    <div ref={trackRef} className={`process-track ${inView ? "is-active" : ""}`}>
      <div className="process-rail" aria-hidden>
        <div className="process-rail-track">
          <div className="process-rail-bed" />
          <div
            className={`process-rail-fill ${tick > 0 ? "has-fill" : ""} ${fading ? "is-fading" : ""}`}
            style={{ width: tick > 0 ? `${tick * 25}%` : "0%" }}
          />
          <ol className="process-rail-marks">
            {WORK_STEPS.map((step, index) => (
              <li
                key={step.n}
                className={`process-rail-mark ${tick >= index + 1 ? "is-lit" : ""}`}
                style={{ "--mark-pos": `${12.5 + index * 25}%` }}
              >
                <span>{step.n}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <ol className="steps">
        {WORK_STEPS.map((step, index) => (
          <li key={step.n} className={`step-card ${tick >= index + 1 ? "is-lit" : ""} ${fading ? "is-fading" : ""}`}>
            <span className="step-num">{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
