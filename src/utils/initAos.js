import AOS from "aos";

let started = false;

export function initAos() {
  if (started) return;
  started = true;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  AOS.init({
    duration: reduced ? 0 : coarse ? 650 : 850,
    once: true,
    easing: "ease-out-cubic",
    offset: coarse ? 32 : 48,
    disable: reduced ? true : false,
    throttleDelay: coarse ? 120 : 80,
    debounceDelay: coarse ? 80 : 50
  });
}
