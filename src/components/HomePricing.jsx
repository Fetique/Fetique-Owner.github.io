import { CONTACT, PRICE_NOTE, PRICE_PACKS } from "../data/company.js";

export default function HomePricing() {
  return (
    <section id="pricing" className="section home-pricing">
      <h2 className="section-title" data-aos="fade-right">
        Ориентир по бюджету
      </h2>
      <p className="section-lead" data-aos="fade-up">
        Три формата — чтобы понять порядок цифр. Фиксируем сумму до старта работ.
      </p>
      <div className="home-pricing-grid">
        {PRICE_PACKS.map((pack, i) => (
          <article
            key={pack.id}
            className="panel home-pricing-card"
            data-aos="fade-up"
            data-aos-delay={i * 60}
          >
            <p className="home-pricing-label">{pack.title}</p>
            <p className="home-pricing-from text-gradient">{pack.from}</p>
            <p>{pack.text}</p>
          </article>
        ))}
      </div>
      <p className="home-pricing-note" data-aos="fade-up">
        {PRICE_NOTE}{" "}
        <a href={CONTACT.projectsUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
          Обсудить задачу
        </a>
      </p>
    </section>
  );
}
