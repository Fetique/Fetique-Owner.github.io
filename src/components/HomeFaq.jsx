import { Link } from "react-router-dom";
import FaqAccordion from "./FaqAccordion.jsx";
import { FAQ_ITEMS } from "../data/seoContent.js";

const HOME_FAQ = FAQ_ITEMS.slice(0, 4);

export default function HomeFaq() {
  return (
    <section id="faq-preview" className="section home-faq">
      <div className="home-faq-head" data-aos="fade-up">
        <div>
          <h2 className="section-title">Частые вопросы</h2>
          <p className="section-lead">Коротко до созвона — остальное на странице вопросов.</p>
        </div>
        <Link to="/faq" className="home-projects-all">
          Все вопросы
        </Link>
      </div>
      <div data-aos="fade-up">
        <FaqAccordion items={HOME_FAQ} />
      </div>
    </section>
  );
}
