/** Белый кролик, красный нос */
export default function RabbitSvg({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="rbFur" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f7f7f7" />
          <stop offset="100%" stopColor="#e6e6e6" />
        </linearGradient>
        <linearGradient id="rbEarIn" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffecec" />
          <stop offset="100%" stopColor="#f5c4c4" />
        </linearGradient>
        <radialGradient id="rbEye" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3d3530" />
          <stop offset="100%" stopColor="#151210" />
        </radialGradient>
        <radialGradient id="rbNose" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff5c5c" />
          <stop offset="100%" stopColor="#d62828" />
        </radialGradient>
      </defs>

      <g>
        <path
          d="M72 18 C58 8 42 20 38 55 C34 95 48 130 58 145 L68 140 C60 115 52 70 58 42 C62 28 72 22 72 18Z"
          fill="url(#rbFur)"
          stroke="#d8d8d8"
          strokeWidth="1.2"
        />
        <path
          d="M168 18 C182 8 198 20 202 55 C206 95 192 130 182 145 L172 140 C180 115 188 70 182 42 C178 28 168 22 168 18Z"
          fill="url(#rbFur)"
          stroke="#d8d8d8"
          strokeWidth="1.2"
        />
        <path
          d="M62 32 C54 28 48 45 50 75 C52 105 58 125 64 132 L66 120 C62 95 58 55 62 32Z"
          fill="url(#rbEarIn)"
        />
        <path
          d="M178 32 C186 28 192 45 190 75 C188 105 182 125 176 132 L174 120 C178 95 182 55 178 32Z"
          fill="url(#rbEarIn)"
        />
        <ellipse cx="120" cy="248" rx="58" ry="52" fill="url(#rbFur)" stroke="#d0d0d0" strokeWidth="1" />
        <ellipse cx="120" cy="168" rx="78" ry="72" fill="url(#rbFur)" stroke="#d0d0d0" strokeWidth="1" />
        <ellipse cx="120" cy="188" rx="48" ry="42" fill="#fafafa" />
        <ellipse cx="88" cy="158" rx="14" ry="18" fill="url(#rbEye)" />
        <ellipse cx="152" cy="158" rx="14" ry="18" fill="url(#rbEye)" />
        <circle cx="92" cy="152" r="4.5" fill="#fff" />
        <circle cx="156" cy="152" r="4.5" fill="#fff" />
        <ellipse cx="120" cy="198" rx="14" ry="11" fill="url(#rbNose)" />
        <ellipse cx="116" cy="194" rx="4" ry="2.5" fill="rgba(255,255,255,0.7)" />
        <path
          d="M120 210 C108 222 96 218 94 208 M120 210 C132 222 144 218 146 208"
          fill="none"
          stroke="#b0a8a0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M120 208 L120 218" stroke="#b0a8a0" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M52 192 L18 182" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
        <path d="M52 200 L14 200" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
        <path d="M52 208 L18 218" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
        <path d="M188 192 L222 182" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
        <path d="M188 200 L226 200" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
        <path d="M188 208 L222 218" stroke="#ccc" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" />
        <ellipse cx="88" cy="268" rx="18" ry="12" fill="#efefef" />
        <ellipse cx="152" cy="268" rx="18" ry="12" fill="#efefef" />
      </g>
    </svg>
  );
}
