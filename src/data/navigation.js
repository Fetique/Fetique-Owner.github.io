import { SERVICES } from "./company.js";

/** Только страницы — в шапке, без якорей */
export const HEADER_LINKS = [
  { to: "/portfolio", label: "Проекты" },
  { to: "/faq", label: "Вопросы" }
];

/** Полный список страниц — для меню */
export const NAV_PAGES = [
  { to: "/", label: "Главная", hint: "Лендинг и контакты" },
  { to: "/portfolio", label: "Проекты", hint: "Кейсы" },
  { to: "/faq", label: "Вопросы", hint: "Перед созвоном" }
];

/** Якоря главной — только из меню или быстрой навигации */
export const NAV_HOME_SECTIONS = [
  { id: "services", label: "Услуги", hint: "4 услуги" },
  { id: "process", label: "Как работаем", hint: "4 шага" },
  { id: "about", label: "О компании", hint: "Кто мы" },
  { id: "contact", label: "Связь", hint: "Написать нам" }
];

export const SERVICE_NAV = SERVICES.map((s) => ({
  to: `/${s.slug}`,
  label: s.title,
  hint: s.note
}));

export const PAGE_LABELS = {
  "/portfolio": "Проекты",
  "/faq": "Вопросы и ответы",
  "/razrabotka-sajta-i-lendinga": "Сайт и лендинг",
  "/dorabotka-i-podderzhka-sajta": "Доработка и поддержка",
  "/digital-oformlenie": "Digital-оформление",
  "/it-soprovozhdenie-dlya-biznesa": "IT-сопровождение"
};
