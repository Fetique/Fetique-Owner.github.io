import { useLayoutEffect, useRef } from "react";

/**
 * Pixel height instead of grid 0fr/1fr — same slide, less layout thrash.
 */
export function useExpandHeight(open) {
  const ref = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inner = el.firstElementChild;
    const contentH = inner?.scrollHeight ?? el.scrollHeight;

    if (first.current) {
      first.current = false;
      el.style.height = open ? "auto" : "0px";
      return undefined;
    }

    if (reduce) {
      el.style.height = open ? "auto" : "0px";
      return undefined;
    }

    const onEnd = (event) => {
      if (event.target !== el || event.propertyName !== "height") return;
      if (open) el.style.height = "auto";
    };

    el.addEventListener("transitionend", onEnd);

    if (open) {
      el.style.height = "0px";
      el.offsetHeight;
      el.style.height = `${contentH}px`;
    } else {
      el.style.height = `${contentH}px`;
      el.offsetHeight;
      el.style.height = "0px";
    }

    return () => el.removeEventListener("transitionend", onEnd);
  }, [open]);

  return ref;
}
