const EXTRA_GAP = 20;

export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const header = document.querySelector(".header");
  const headerH = header?.offsetHeight ?? 88;
  const top = target.getBoundingClientRect().top + window.scrollY - headerH - EXTRA_GAP;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
