import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { publicAsset } from "../utils/publicAsset.js";

export default function ProjectGallery({ gallery, title }) {
  const [open, setOpen] = useState(-1);
  const items = gallery?.items ?? [];
  const count = items.length;

  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback((delta) => setOpen((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  if (!count) return null;

  const layout = gallery.layout === "phone" ? "phone" : "desktop";
  const current = open >= 0 ? items[open] : null;

  return (
    <section className="article-section project-gallery-section">
      <h2>Экраны</h2>
      <ul className={`project-gallery project-gallery--${layout}`}>
        {items.map((shot, i) => (
          <li key={shot.src}>
            <button
              type="button"
              className="project-gallery-item"
              onClick={() => setOpen(i)}
              aria-label={`Открыть экран: ${shot.alt}`}
            >
              <img src={publicAsset(shot.src)} alt="" loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>

      {current ? createPortal(
        <div
          className={`project-lightbox project-lightbox--${layout}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: ${current.alt}`}
          onClick={close}
        >
          <figure className="project-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={publicAsset(current.src)} alt={current.alt} />
            <figcaption>
              <span>{current.alt}</span>
              <span className="project-lightbox-count">
                {open + 1} / {count}
              </span>
            </figcaption>
          </figure>
          <button type="button" className="project-lightbox-btn project-lightbox-close" onClick={close} aria-label="Закрыть">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {count > 1 ? (
            <>
              <button
                type="button"
                className="project-lightbox-btn project-lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Предыдущий экран"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                type="button"
                className="project-lightbox-btn project-lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Следующий экран"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          ) : null}
        </div>,
        document.body
      ) : null}
    </section>
  );
}
