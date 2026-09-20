import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionLink from './SectionLink';

const ease = [0.16, 1, 0.3, 1];

export default function Hero({ heroImage }) {
  return (
    <section
      id="top"
      className="relative md:min-h-[100svh] overflow-hidden bg-[#1A0F0A] text-[#F9F6F0]"
    >
      <div className="absolute inset-0">
        {heroImage && (
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover opacity-55"
            fetchpriority="high"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120904] via-[#120904]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120904] via-transparent to-[#120904]/30" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex justify-between px-6 md:px-12">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="shelf-rule w-px h-full" />
        ))}
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 h-16 opacity-[0.18] z-[1]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.5) 1.4px, transparent 1.6px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[120rem] md:min-h-[100svh] items-center px-6 md:px-12 py-14 md:py-28">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="block h-px w-9 bg-[#D4AF37]" />
            <span className="font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Premium Natural Foods
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="font-display font-[600] text-balance text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.04] text-[#F9F6F0]"
          >
            Heritage in every grain.
            <br />
            <em className="italic font-medium text-[#D4AF37]">Wellness</em> in every detail.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="mt-6 max-w-[36rem] mx-auto font-body text-[17.5px] font-light leading-relaxed text-[#e8dab8]"
          >
            Introducing a premium collection of meticulously crafted natural foods,
            expertly blended to nourish your lifestyle without compromise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-3.5 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(200,155,60,0.6)]"
            >
              Shop the Collection
            </Link>
            <SectionLink
              id="story"
              className="inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-3.5 bg-transparent text-[#F9F6F0] border border-[#F4E6C2]/35 rounded-sm transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Our Story
            </SectionLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
