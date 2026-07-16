import { useEffect, useRef, useState } from "react";
import { toCanvas } from "html-to-image";
import QRCode from "react-qr-code";
import SeoHead from "../components/SeoHead.jsx";
import { COMPANY, CONTACT, TAGLINE } from "../data/company.js";
import { publicAsset } from "../utils/publicAsset.js";
import "../styles/business-cards.css";

const SITE_URL = "https://fetique.com";
const LOGO = publicAsset("logo.svg");

/** Превью 900×500 = пропорция 90×50 мм */
const CARD_W = 900;
const CARD_H = 500;

/** Печать: мм → px при заданном DPI */
function printPx(mm, dpi) {
  return Math.round((mm / 25.4) * dpi);
}

const GRAD_STOPS = [
  { t: 0, rgb: [232, 212, 184] },
  { t: 0.48, rgb: [208, 172, 120] },
  { t: 1, rgb: [211, 140, 116] },
];

function lerp(a, b, u) {
  return a + (b - a) * u;
}

function gradientRgb(x, y, size) {
  const t = Math.min(1, Math.max(0, (x + y) / (2 * (size - 1))));
  let i = 0;
  while (i < GRAD_STOPS.length - 2 && t > GRAD_STOPS[i + 1].t) i += 1;
  const a = GRAD_STOPS[i];
  const b = GRAD_STOPS[i + 1];
  const u = (t - a.t) / (b.t - a.t || 1);
  return [
    Math.round(lerp(a.rgb[0], b.rgb[0], u)),
    Math.round(lerp(a.rgb[1], b.rgb[1], u)),
    Math.round(lerp(a.rgb[2], b.rgb[2], u)),
  ];
}

/**
 * QR → canvas: чёрные модули → золото-розовый градиент логотипа.
 */
function BrandQr({ size = 188 }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    let revoked = false;
    let objectUrl = "";

    const paint = () => {
      const svg = host.querySelector("svg");
      if (!svg) return;

      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svg);
      const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
      objectUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        if (revoked) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        for (let y = 0; y < size; y += 1) {
          for (let x = 0; x < size; x += 1) {
            const i = (y * size + x) * 4;
            const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (lum < 140) {
              const [r, g, b] = gradientRgb(x, y, size);
              data[i] = r;
              data[i + 1] = g;
              data[i + 2] = b;
              data[i + 3] = 255;
            } else {
              data[i] = 10;
              data[i + 1] = 10;
              data[i + 2] = 10;
              data[i + 3] = 255;
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        URL.revokeObjectURL(objectUrl);
        objectUrl = "";
      };
      img.onerror = () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    };

    const frame = requestAnimationFrame(paint);
    return () => {
      revoked = true;
      cancelAnimationFrame(frame);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [size]);

  return (
    <div className="bcard-qr-box">
      <div className="bcard-qr-source" ref={hostRef} aria-hidden>
        <QRCode value={SITE_URL} size={size} bgColor="#ffffff" fgColor="#000000" level="M" />
      </div>
      <canvas
        ref={canvasRef}
        className="bcard-qr-canvas"
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    </div>
  );
}

function CardChrome({ children, className = "", cardRef }) {
  return (
    <article className={`bcard ${className}`} ref={cardRef}>
      <div className="bcard-mesh" aria-hidden />
      <span className="bcard-frame-arm bcard-frame-arm--top" aria-hidden />
      <span className="bcard-frame-arm bcard-frame-arm--left" aria-hidden />
      <span className="bcard-frame-arm bcard-frame-arm--bottom" aria-hidden />
      <span className="bcard-frame-corner bcard-frame-corner--tr" aria-hidden />
      <span className="bcard-frame-gem bcard-frame-gem--tl" aria-hidden />
      <span className="bcard-frame-gem bcard-frame-gem--bl" aria-hidden />
      <div className="bcard-body">{children}</div>
    </article>
  );
}

function CardFace({ cardRef }) {
  return (
    <CardChrome className="bcard-face" cardRef={cardRef}>
      <div className="bcard-face-main">
        <img src={LOGO} alt="" className="bcard-face-logo" width={118} height={118} />
        <h2 className="bcard-accent bcard-face-brand">Fetique</h2>
        <span className="bcard-face-rule" aria-hidden />
        <p className="bcard-face-tagline">
          <span className="bcard-accent">Zero:</span> {TAGLINE}
        </p>
        <p className="bcard-face-desc">
          IT для бизнеса целиком: сайты, digital, сопровождение и решения под задачи компании.
        </p>
      </div>
      {/* Временно без телефона — смотрим баланс лицевой */}
    </CardChrome>
  );
}

/** Тексты только для визитки — шире, чем «только сайты» */
const CARD_SERVICES = [
  {
    title: "Сайты и digital",
    note: "Лендинг, корпоративный сайт, обновление устаревшего — под задачу бизнеса",
  },
  {
    title: "Доработка и рост",
    note: "Правки, новые блоки, исправления и развитие уже работающего проекта",
  },
  {
    title: "Digital-упаковка",
    note: "Единый стиль в сети: материалы, карточки, порядок в визуале компании",
  },
  {
    title: "IT под ключ",
    note: "Задачи, консультации, документы и процессы — без штатного IT-отдела",
  },
];

function CardBack({ cardRef }) {
  const contacts = [
    { label: "Telegram", value: "ZeroFetique" },
    { label: "Почта", value: CONTACT.email },
    { label: "Телефон", value: "+7 800 700-00-48" },
    { label: "TG канал", value: CONTACT.channelHandle },
  ];

  return (
    <CardChrome className="bcard-back" cardRef={cardRef}>
      <header className="bcard-back-head">
        <span className="bcard-accent bcard-legal">{COMPANY.shortName}</span>
      </header>

      <div className="bcard-back-main">
        <aside className="bcard-back-qr">
          <div className="bcard-qr-shell">
            <BrandQr size={188} />
          </div>
          <p className="bcard-accent bcard-qr-caption">fetique.com</p>
        </aside>

        <section className="bcard-back-services">
          <p className="bcard-services-lead">
            IT для предпринимателей и компаний: от сайта и digital-упаковки до сопровождения
            задач и процессов целиком.
          </p>
          <div className="bcard-services-grid">
            {CARD_SERVICES.map((item) => (
              <div key={item.title} className="bcard-service">
                <strong className="bcard-accent">{item.title}</strong>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="bcard-back-foot">
        <div className="bcard-foot-item bcard-founder">
          <span className="bcard-meta">Основатель</span>
          <strong className="bcard-accent">Zero • Лукин Л. И.</strong>
        </div>
        {contacts.map((item) => (
          <div key={item.label} className="bcard-foot-item">
            <span className="bcard-meta">{item.label}</span>
            <strong className="bcard-accent">{item.value}</strong>
          </div>
        ))}
      </footer>
    </CardChrome>
  );
}

/** Canvas при клоне DOM пустой — временно заменяем PNG-картинкой */
function swapCanvasesForExport(root) {
  const swaps = [];
  root.querySelectorAll("canvas").forEach((canvas) => {
    const rect = canvas.getBoundingClientRect();
    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    img.alt = "";
    img.className = canvas.className;
    img.width = canvas.width;
    img.height = canvas.height;
    img.style.width = `${rect.width || canvas.width}px`;
    img.style.height = `${rect.height || canvas.height}px`;
    img.style.display = "block";
    img.style.borderRadius = getComputedStyle(canvas).borderRadius;
    canvas.replaceWith(img);
    swaps.push({ canvas, img });
  });
  return () => {
    swaps.forEach(({ canvas, img }) => {
      if (img.parentNode) img.replaceWith(canvas);
    });
  };
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Экспорт 1:1 с превью: снимаем layout 900×500, потом аккуратно
 * масштабируем до DPI печати. Без canvasWidth (он ломал пропорции).
 */
async function exportCardPng(node, filename, dpi) {
  if (!node) throw new Error("Карточка не найдена");

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  node.classList.add("bcard--export");
  const restore = swapCanvasesForExport(node);
  await wait(50);

  try {
    const targetW = printPx(90, dpi);
    const targetH = printPx(50, dpi);
    // Целочисленный scale для чёткого рендера DOM, затем ресайз до точного DPI
    const captureScale = Math.max(2, Math.ceil(targetW / CARD_W));

    const captured = await toCanvas(node, {
      cacheBust: true,
      pixelRatio: captureScale,
      width: CARD_W,
      height: CARD_H,
      backgroundColor: "#060606",
      style: {
        transform: "none",
        margin: "0",
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
      },
    });

    const out = document.createElement("canvas");
    out.width = targetW;
    out.height = targetH;
    const ctx = out.getContext("2d");
    if (!ctx) throw new Error("Canvas недоступен");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#060606";
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.drawImage(captured, 0, 0, targetW, targetH);

    downloadDataUrl(out.toDataURL("image/png"), filename);
  } finally {
    restore();
    node.classList.remove("bcard--export");
  }
}

export default function BusinessCardsPage() {
  const faceRef = useRef(null);
  const backRef = useRef(null);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");

  const runExport = async (side, dpi) => {
    setError("");
    setBusy(`${side}-${dpi}`);
    try {
      const node = side === "face" ? faceRef.current : backRef.current;
      const name =
        side === "face"
          ? `fetique-vizitka-licevaya-${dpi}dpi.png`
          : `fetique-vizitka-oborot-${dpi}dpi.png`;
      await exportCardPng(node, name, dpi);
    } catch (err) {
      console.error(err);
      setError("Не удалось выгрузить PNG. Обновите страницу и попробуйте ещё раз.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <SeoHead
        title="Визитка Fetique — макет 90×50"
        description="Макет визитки Fetique 90×50 мм для печати."
        keywords="визитка Fetique"
        path="/vizitki"
        noindex
      />
      <div className="bcards-page">
        <header className="bcards-intro">
          <h1>Визитка Fetique · 90 × 50 мм</h1>
          <p>
            Скачайте PNG для типографии — не скриншот. <strong>300 DPI</strong> или{" "}
            <strong>600 DPI</strong>, размер печати <strong>90 × 50 мм</strong>. Файл совпадает с
            превью (золотой текст в экспорте сплошной — так типография читает стабильнее). Перед
            тиражом проверьте QR телефоном.
          </p>
          {error ? <p className="bcards-export-error">{error}</p> : null}
        </header>

        <section className="bcards-set">
          <div className="bcards-pair">
            <div className="bcard-slot">
              <p className="bcards-side-label">Лицевая сторона</p>
              <div className="bcard-scaler">
                <CardFace cardRef={faceRef} />
              </div>
              <div className="bcards-export">
                <button
                  type="button"
                  className="bcards-export-btn"
                  disabled={Boolean(busy)}
                  onClick={() => runExport("face", 300)}
                >
                  {busy === "face-300" ? "Готовим…" : "PNG 300 DPI"}
                </button>
                <button
                  type="button"
                  className="bcards-export-btn bcards-export-btn--hi"
                  disabled={Boolean(busy)}
                  onClick={() => runExport("face", 600)}
                >
                  {busy === "face-600" ? "Готовим…" : "PNG 600 DPI"}
                </button>
              </div>
            </div>

            <div className="bcard-slot">
              <p className="bcards-side-label">Оборотная сторона</p>
              <div className="bcard-scaler">
                <CardBack cardRef={backRef} />
              </div>
              <div className="bcards-export">
                <button
                  type="button"
                  className="bcards-export-btn"
                  disabled={Boolean(busy)}
                  onClick={() => runExport("back", 300)}
                >
                  {busy === "back-300" ? "Готовим…" : "PNG 300 DPI"}
                </button>
                <button
                  type="button"
                  className="bcards-export-btn bcards-export-btn--hi"
                  disabled={Boolean(busy)}
                  onClick={() => runExport("back", 600)}
                >
                  {busy === "back-600" ? "Готовим…" : "PNG 600 DPI"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
