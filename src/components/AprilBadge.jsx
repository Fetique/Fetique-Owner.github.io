import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import RabbitSvg from "./RabbitSvg.jsx";

const POPPER_PIECES = 12;

export default function AprilBadge() {
  const [phase, setPhase] = useState("idle");
  const [burst, setBurst] = useState(false);
  const hideTimer = useRef(null);
  const burstTimer = useRef(null);

  const hideRabbit = useCallback(() => {
    setPhase("hide");
    window.setTimeout(() => {
      setPhase("idle");
      setBurst(false);
    }, 550);
  }, []);

  const showRabbit = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    window.clearTimeout(burstTimer.current);
    setBurst(true);
    setPhase("launch");
    burstTimer.current = window.setTimeout(() => setBurst(false), 1800);
    window.setTimeout(() => setPhase("peek"), 1400);
    hideTimer.current = window.setTimeout(hideRabbit, 4400);
  }, [hideRabbit]);

  const onBadgeClick = () => {
    if (phase !== "idle") {
      hideRabbit();
      return;
    }
    showRabbit();
  };

  useEffect(
    () => () => {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(burstTimer.current);
    },
    []
  );

  const isLive = phase !== "idle" || burst;

  return (
    <div className={`april-badge-wrap ${isLive ? "april-badge-wrap--live" : ""}`}>
      <div className="april-badge-stage">
        <div
          className={`rabbit-launch-portal rabbit-launch-portal--${phase}`}
          aria-hidden={phase === "idle"}
        >
          <div className="rabbit-puppet">
            <RabbitSvg className="rabbit-puppet-svg" />
          </div>
        </div>

        <button
          type="button"
          className="hero-badge hero-badge--easter"
          onClick={onBadgeClick}
          aria-expanded={phase !== "idle"}
          aria-label="Дата регистрации — 1 апреля. Шутка — нет. Нажмите для сюрприза"
        >
          <FontAwesomeIcon icon={faWandMagicSparkles} className="hero-badge-icon" />
          <span className="hero-badge-text">Дата регистрации — 1 апреля. Шутка — нет</span>
        </button>

        <div
          className={`april-surprise april-surprise--${phase} ${phase !== "idle" || burst ? "is-visible" : ""}`}
          aria-hidden={phase === "idle" && !burst}
        >
          {burst && (
            <div className="popper-burst" aria-hidden>
              {Array.from({ length: POPPER_PIECES }, (_, i) => (
                <span key={i} className="popper-piece" style={{ "--i": i }} />
              ))}
              <span className="popper-emoji" aria-hidden>
                🎉
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
