import React from 'react';

const ICON_SRC = '/images/cura-heritage-foods-icon.png';

// alt="" throughout: every place this is used already provides an accessible name via its
// wrapper (a link with aria-label, or a container with role="img" aria-label), so the icon
// itself is decorative.
export default function Logo({ className = 'w-9 h-9', withWordmark = false, tone = 'gold' }) {
  const textColor = tone === 'gold' ? '#F2EFE8' : '#4D0F1B';
  const subColor = tone === 'gold' ? '#C59D62' : '#4D0F1B';

  const Mark = <img src={ICON_SRC} alt="" className={`${className} object-contain`} />;

  if (!withWordmark) return Mark;

  return (
    <span className="flex items-center gap-2.5">
      {Mark}
      <span className="leading-none">
        <span className="block font-display text-[22px] font-bold tracking-[0.02em]" style={{ color: textColor }}>CURA</span>
        <span className="block font-body text-[9px] font-medium tracking-[0.32em] mt-0.5" style={{ color: subColor }}>HERITAGE&nbsp;FOODS</span>
      </span>
    </span>
  );
}
