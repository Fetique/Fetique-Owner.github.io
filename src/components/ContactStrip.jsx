import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane, faPhone, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { CONTACT } from "../data/company.js";

const ITEMS = [
  {
    label: "Задача",
    value: CONTACT.projectsHandle,
    href: CONTACT.projectsUrl,
    icon: faPaperPlane,
    external: true,
    shimmer: ""
  },
  {
    label: "Телефон",
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneTel}`,
    icon: faPhone,
    shimmer: " text-shimmer--slow"
  },
  {
    label: "Почта",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: faEnvelope,
    shimmer: " text-shimmer--fast"
  },
  {
    label: "Канал",
    value: CONTACT.channelHandle,
    href: CONTACT.channelUrl,
    icon: faShareNodes,
    external: true,
    shimmer: " text-shimmer--slow"
  }
];

export default function ContactStrip() {
  return (
    <div className="contact-strip" role="list">
      {ITEMS.map((item) => (
        <a
          key={item.label}
          className="contact-strip-item"
          href={item.href}
          role="listitem"
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <span className="contact-strip-icon" aria-hidden>
            <FontAwesomeIcon icon={item.icon} />
          </span>
          <span className="contact-strip-copy">
            <span className="contact-strip-label">{item.label}</span>
            <span className={`contact-strip-value text-shimmer${item.shimmer}`}>{item.value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
