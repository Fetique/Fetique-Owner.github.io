/**
 * Портфолио — данные проектов.
 *
 * Как добавить проект вручную (пока без админки):
 * 1. Скопируйте блок в PORTFOLIO_ITEMS.
 * 2. Задайте уникальные id и slug.
 * 3. Заполните detail — появится страница /portfolio/{slug}.
 * 4. media.type: "image" | "gif" — положите файл в public/.
 * 5. npm run build — маршрут попадёт в sitemap.
 *
 * Полноценная админка с входом — позже (нужен бэкенд или CMS).
 * GitHub Pages хранит только статику, поэтому сейчас правим этот файл.
 */

export const PORTFOLIO_STATUS = {
  live: { label: "Запущен", progress: 100 },
  progress: { label: "В разработке", progress: null },
  internal: { label: "Внутренний инструмент", progress: 85 }
};

export const PORTFOLIO_ITEMS = [
  {
    id: "fetique-site",
    slug: "fetique-site",
    title: "fetique.com",
    subtitle: "Сайт компании",
    description:
      "Лендинг Fetique: услуги, процесс работы, контакты и отдельные SEO-страницы.",
    status: "live",
    featured: true,
    tags: ["Сайт", "B2B", "SEO"],
    url: null,
    image: "photos/workspace-dual.jpg",
    year: "2026",
    detail: {
      title: "fetique.com — сайт Fetique",
      description: "Как устроен лендинг компании: услуги, SEO, портфолио и контакты.",
      media: { type: "image", src: "photos/workspace-dual.jpg", alt: "Рабочее место Fetique" },
      sections: [
        {
          h2: "Задача",
          paragraphs: [
            "Нужен понятный B2B-лендинг: кто мы, что делаем, как связаться."
          ]
        },
        {
          h2: "Что сделали",
          paragraphs: [
            "Многостраничная структура с SEO-статьями, портфолио, FAQ и акцентом на живые контакты.",
            "Адаптив и тёмная тема в фирменных золотых тонах."
          ]
        },
        {
          h2: "Технически",
          paragraphs: ["Современный фронтенд и статическая сборка — быстро грузится и удобно развивать дальше."]
        }
      ]
    }
  },
  {
    id: "fetique-docs",
    slug: "fetique-docs",
    title: "FetiqueDocs",
    subtitle: "Документы и договоры",
    description:
      "Инструмент для договоров, PDF и архива — в активной разработке, с встроенной бухгалтерией.",
    status: "internal",
    tags: ["Внутренний", "Документы", "B2B"],
    url: null,
    image: "print.png",
    year: "2026",
    progress: 72,
    detail: {
      title: "FetiqueDocs — документы и договоры",
      description: "Шаблоны, PDF и архив договоров в одной системе.",
      media: { type: "image", src: "print.png", alt: "Печать на документах Fetique" },
      sections: [
        {
          h2: "Зачем",
          paragraphs: [
            "Чтобы не собирать договоры вручную каждый раз: единые шаблоны, превью, PDF и архив в одном месте.",
            "Параллельно подключаем встроенную бухгалтерию — чтобы документы и учёт не жили в разных углах."
          ]
        },
        {
          h2: "Статус",
          paragraphs: ["Сейчас в разработке и тестировании. После стабилизации покажем больше деталей."]
        }
      ]
    }
  },
  {
    id: "bastilion",
    slug: "bastilion",
    title: "bastilion.ru",
    subtitle: "Интернет-магазин дверей",
    description:
      "Каталог входных и металлических дверей в Москве — около 23 тысяч позиций, подбор, доставка и установка.",
    status: "live",
    tags: ["E-commerce", "Каталог", "SEO"],
    url: "https://bastilion.ru/",
    image: "photos/bastilion-hero.png",
    year: "2026",
    detail: {
      title: "bastilion.ru — интернет-магазин дверей",
      description: "Крупный каталог входных и металлических дверей для Москвы и области.",
      media: {
        type: "image",
        src: "photos/bastilion-hero.png",
        alt: "Главная страница bastilion.ru"
      },
      sections: [
        {
          h2: "Задача",
          paragraphs: [
            "Интернет-магазин с большим ассортиментом: покупатель должен быстро найти модель по параметрам, а не теряться в тысячах карточек."
          ]
        },
        {
          h2: "Что сделали",
          paragraphs: [
            "Каталог с фильтрами и подборками, карточки товаров с характеристиками и ценами, блоки для замера, доставки и установки.",
            "Структура под поисковые запросы по дверям в Москве — от главной до разделов каталога."
          ]
        },
        {
          h2: "Масштаб",
          paragraphs: ["Около 23 000 позиций в каталоге — с учётом вариантов и комплектаций."]
        }
      ]
    }
  },
  {
    id: "client-slot",
    slug: null,
    title: "Следующий блок — ваш",
    subtitle: "Место в портфолио",
    description:
      "Новый проект может быть вашим: сайт, digital или внутренний инструмент. Добавим сюда после согласования — со скрином, текстом и без лишней рекламы.",
    status: "progress",
    tags: ["Скоро"],
    url: null,
    image: null,
    year: null,
    progress: 12,
    placeholder: true
  }
];

export function getPortfolioBySlug(slug) {
  if (!slug) return null;
  return PORTFOLIO_ITEMS.find((item) => item.slug === slug) ?? null;
}

export function getPortfolioDetailRoutes() {
  return PORTFOLIO_ITEMS.filter((item) => item.slug && item.detail).map((item) => ({
    path: `/portfolio/${item.slug}`,
    folder: `portfolio/${item.slug}`,
    title: item.detail.title,
    description: item.detail.description,
    changefreq: "monthly",
    priority: "0.7"
  }));
}
