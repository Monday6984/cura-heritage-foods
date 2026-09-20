import React from 'react';

export default function Logo({ className = 'w-9 h-9', withWordmark = false, tone = 'gold' }) {
  const stroke = tone === 'gold' ? '#C59D62' : '#4D0F1B';
  const fill = tone === 'gold' ? '#C59D62' : '#4D0F1B';
  const subtle = tone === 'gold' ? '#C59D62' : '#4D0F1B';

  const Mark = (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" role="img" aria-label="Cura Heritage Foods emblem">
      <circle cx="32" cy="32" r="30" stroke={stroke} strokeWidth="1.1" />
      <circle cx="32" cy="32" r="26.5" stroke={stroke} strokeWidth="0.6" opacity="0.55" />

      <g stroke={stroke} strokeWidth="1" strokeLinecap="round" fill="none">
        <path d="M14 38c-2-8 0-16 6-22" />
        <path d="M11 40c-3-9 0-18 7-25" opacity="0.7" />
        <path d="M17 36c-1-7 1-13 5-18" opacity="0.85" />
        <path d="M50 38c2-8 0-16-6-22" />
        <path d="M53 40c3-9 0-18-7-25" opacity="0.7" />
        <path d="M47 36c1-7-1-13-5-18" opacity="0.85" />
      </g>
      <g fill={fill}>
        {[[-3, 4], [-6, 0], [-9, -4], [-12, -9]].map(([dx, dy], i) => (
          <g key={`l${i}`} transform={`translate(${32 + dx} ${32 + dy}) rotate(${-35 + i * -4})`}>
            <ellipse cx="0" cy="-3" rx="1.1" ry="2.2" />
            <ellipse cx="-1.4" cy="-1.5" rx="1" ry="2" />
            <ellipse cx="1.4" cy="-1.5" rx="1" ry="2" />
          </g>
        ))}
        {[3, 6, 9, 12].map((dx, i) => (
          <g key={`r${i}`} transform={`translate(${32 + dx} ${32 + (i % 2 === 0 ? 4 : 0) - i}) rotate(${35 + i * 4})`}>
            <ellipse cx="0" cy="-3" rx="1.1" ry="2.2" />
            <ellipse cx="-1.4" cy="-1.5" rx="1" ry="2" />
            <ellipse cx="1.4" cy="-1.5" rx="1" ry="2" />
          </g>
        ))}
      </g>

      <path
        d="M22 34h20l-2.5 7c-1 2.6-3.6 4-7.5 4s-6.5-1.4-7.5-4L22 34z"
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
      />
      <path d="M22 34h20" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 18v14" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="32" cy="17.5" rx="2.4" ry="2.8" fill={fill} />
      <circle cx="32" cy="33" r="1.3" fill={subtle} opacity="0.8" />
    </svg>
  );

  if (!withWordmark) return Mark;

  return (
    <span className="flex items-center gap-2.5">
      {Mark}
      <span className="leading-none">
        <span className="block font-display text-[22px] font-bold tracking-[0.02em]" style={{ color: tone === 'gold' ? '#F2EFE8' : '#4D0F1B' }}>CURA</span>
        <span className="block font-body text-[9px] font-medium tracking-[0.32em] mt-0.5" style={{ color: stroke }}>HERITAGE&nbsp;FOODS</span>
      </span>
    </span>
  );
}
