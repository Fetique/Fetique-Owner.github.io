import AOS from "aos";

let started = false;

export function initAos() {
  if (started) return;
  started = true;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const mobile = coarse || narrow;

  AOS.init({
    duration: reduced ? 0 : mobile ? 480 : 750,
    once: true,
    easing: "ease-out-cubic",
    offset: mobile ? 24 : 48,
    disable: reduced,
    throttleDelay: mobile ? 160 : 80,
    debounceDelay: mobile ? 100 : 50,
  });
}
