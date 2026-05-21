import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const btnRef = useRef(null);
  const [revealing, setRevealing] = useState(false);

  function handleClick() {
    const btn = btnRef.current;
    if (!btn || revealing) return;

    const next = theme === "light" ? "dark" : "light";
    const skipReveal =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skipReveal) {
      setTheme(next);
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty("--reveal-x", `${x}px`);
    document.documentElement.style.setProperty("--reveal-y", `${y}px`);
    document.documentElement.dataset.revealTheme = next;

    setRevealing(true);
    requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-reveal-active");
    });

    window.setTimeout(() => {
      setTheme(next);
      const layer = document.querySelector(".theme-reveal-layer");
      if (layer) {
        layer.style.transition = "opacity 0.2s ease";
        layer.style.opacity = "0";
      }
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-reveal-active");
        delete document.documentElement.dataset.revealTheme;
        if (layer) layer.removeAttribute("style");
        setRevealing(false);
      }, 220);
    }, 620);
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      className="icon-btn theme-toggle-btn"
      aria-label={theme === "light" ? "Тёмная тема" : "Светлая тема"}
      disabled={revealing}
    >
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
    </button>
  );
}
