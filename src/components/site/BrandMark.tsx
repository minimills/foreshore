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
      <rect x="6" y="12" width="88" height="76" rx="18" fill="#8BD35B" />
      <rect x="16" y="30" width="68" height="48" rx="9" fill="#F4F6EF" />
      <g fill="#F4F6EF">
        <circle cx="20" cy="21" r="3.2" />
        <circle cx="28" cy="21" r="3.2" />
        <circle cx="36" cy="21" r="3.2" />
      </g>
      <g stroke="#3F7322" strokeWidth="11.5" strokeLinecap="round">
        <line x1="40" y1="41" x2="40" y2="67" />
        <line x1="41" y1="56" x2="59" y2="41" />
        <line x1="47" y1="51" x2="59" y2="67" />
      </g>
    </svg>
  );
}
