/* Exact wave geometry taken from the source page's inline SVGs. */
export function BandWaveTop() {
  return (
    <svg className="band-wave" viewBox="0 0 1280 90" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0,0 L1280,0 L1280,30 C1150,80 1040,10 900,45 C780,75 700,20 560,40 C430,60 330,85 200,50 C120,30 60,60 0,35 Z"
        fill="var(--bg)"
      />
    </svg>
  );
}

export function BandWaveBottom() {
  return (
    <svg className="band-wave-bottom" viewBox="0 0 1280 90" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0,60 C140,20 260,85 400,55 C520,30 600,80 740,60 C860,45 940,10 1080,40 C1170,60 1230,70 1280,50 L1280,90 L0,90 Z"
        fill="var(--bg)"
      />
    </svg>
  );
}

export function CtaWaveTop() {
  return (
    <svg className="band-wave" viewBox="0 0 1280 90" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0,0 L1280,0 L1280,25 C1140,70 1020,15 880,45 C760,70 680,20 540,40 C420,60 320,80 190,45 C110,25 50,55 0,30 Z"
        fill="var(--bg)"
      />
    </svg>
  );
}
