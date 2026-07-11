import { CONTACT } from "../data/company.js";

const PATTERNS = [
  {
    regex: /@ZeroFetique/g,
    href: CONTACT.projectsUrl,
    external: true
  },
  {
    regex: /@Fetique/g,
    href: CONTACT.channelUrl,
    external: true
  },
  {
    regex: /zero@fetique\.com/g,
    href: `mailto:${CONTACT.email}`
  },
  {
    regex: /\+7\s*\(800\)\s*700-00-48/g,
    href: `tel:${CONTACT.phoneTel}`,
    label: CONTACT.phoneDisplay
  },
  {
    regex: /8-800/g,
    href: `tel:${CONTACT.phoneTel}`,
    label: "8-800"
  },
  {
    regex: /бесплатный номер/gi,
    href: `tel:${CONTACT.phoneTel}`,
    label: (match) => match[0]
  },
  {
    regex: /Telegram/gi,
    href: CONTACT.projectsUrl,
    external: true,
    label: (match) => match[0]
  }
];

function splitByPattern(text, pattern, startIndex = 0) {
  const parts = [];
  let lastIndex = 0;
  const re = new RegExp(pattern.regex.source, pattern.regex.flags);
  let match;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    const label =
      typeof pattern.label === "function"
        ? pattern.label(match)
        : pattern.label ?? match[0];
    parts.push({
      type: "link",
      value: label,
      href: pattern.href,
      external: pattern.external
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts.length ? parts : [{ type: "text", value: text }];
}

export function linkifyContacts(text) {
  if (!text) return [{ type: "text", value: "" }];

  let parts = [{ type: "text", value: text }];

  for (const pattern of PATTERNS) {
    const next = [];
    for (const part of parts) {
      if (part.type === "text") {
        next.push(...splitByPattern(part.value, pattern));
      } else {
        next.push(part);
      }
    }
    parts = next;
  }

  return parts;
}
