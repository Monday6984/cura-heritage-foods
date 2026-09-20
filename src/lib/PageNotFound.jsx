import React from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '@/lib/usePageMeta';
import { SITE_NAME } from '@/lib/site';

export default function PageNotFound() {
  usePageMeta({ title: `Page not found | ${SITE_NAME}`, path: '/', noindex: true });

  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center bg-[#120904] px-6 text-center text-[#F9F6F0]">
      <span className="font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
        404
      </span>
      <h1 className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.4rem)] font-semibold">
        This page has wandered off.
      </h1>
      <p className="mt-3 max-w-md font-body text-[15px] font-light text-[#e8dab8]">
        The page you're looking for doesn't exist. Let's get you back to the collection.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-3.5 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(200,155,60,0.6)]"
      >
        Back to Home
      </Link>
    </main>
  );
}
