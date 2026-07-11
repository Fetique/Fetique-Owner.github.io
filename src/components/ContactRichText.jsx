import { linkifyContacts } from "../utils/linkifyContacts.js";

export default function ContactRichText({ text, className }) {
  const parts = linkifyContacts(text);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === "link" ? (
          <a
            key={`${part.href}-${i}`}
            href={part.href}
            className={`inline-link${
              part.external || part.href.startsWith("tel:") || part.href.startsWith("mailto:")
                ? " contact-glow contact-glow--slow"
                : ""
            }`}
            {...(part.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {part.value}
          </a>
        ) : (
          <span key={`t-${i}`}>{part.value}</span>
        )
      )}
    </span>
  );
}
