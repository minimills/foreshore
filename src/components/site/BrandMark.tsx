/* The studio logo: a browser window with an "F" inside. Colours follow the theme. */
export default function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="6" y="12" width="88" height="76" rx="18" fill="#9ba685" />
      <rect x="16" y="30" width="68" height="48" rx="9" fill="#f6f6ec" />
      <g fill="#f6f6ec">
        <circle cx="20" cy="21" r="3.2" />
        <circle cx="28" cy="21" r="3.2" />
        <circle cx="36" cy="21" r="3.2" />
      </g>
      <g stroke="#455230" strokeWidth="11.5" strokeLinecap="round">
        <line x1="40" y1="41" x2="40" y2="67" />
        <line x1="40" y1="41" x2="60" y2="41" />
        <line x1="40" y1="54" x2="55" y2="54" />
      </g>
    </svg>
  );
}
