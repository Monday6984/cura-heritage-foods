import React from 'react';
import SectionLink from './SectionLink';

export default function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Announcement"
      className="bg-[#120904] text-center px-5 py-2.5 font-body text-[12.5px] tracking-[0.03em] text-[#F1E7D1]"
    >
      Tosaf Foods is now <strong className="font-medium text-[#D4AF37]">Cura Heritage Foods</strong> — same standard, new name.{' '}
      <SectionLink id="story" className="underline hover:text-[#D4AF37] transition-colors">Read our story</SectionLink>
    </div>
  );
}
