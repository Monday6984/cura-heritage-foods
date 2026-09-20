import React from 'react';
import { motion } from 'framer-motion';
import SectionLink from './SectionLink';

const ease = [0.16, 1, 0.3, 1];

export default function Story() {
  return (
    <section id="story" className="bg-[#f1e7d1] py-24 md:py-32">
      <div className="mx-auto grid max-w-[120rem] grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm bg-gradient-to-br from-[#f4e6c2] to-[#e8dab8]"
        >
          <div className="flex h-full items-center justify-center p-8">
            <svg viewBox="0 0 200 240" fill="none" className="w-3/5">
              <path d="M100 30c14 22 14 36 0 50-14-14-14-28 0-50z" fill="#8B3E2F" />
              <path d="M70 140c0-28 13-46 30-46s30 18 30 46" stroke="#8B3E2F" strokeWidth="1.8" fill="none" />
              <ellipse cx="100" cy="142" rx="42" ry="10" stroke="#8B3E2F" strokeWidth="1.6" fill="none" />
              <path d="M40 90c20-14 34-11 42 3M160 90c-20-14-34-11-42 3M40 190c20 11 34 8 42-6M160 190c-20 11-34 8-42-6" stroke="#8B3E2F" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div className="pointer-events-none absolute inset-3.5 border border-[#a97d2e]/35" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="text-center"
        >
          <span className="font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#84601c]">
            Our Story
          </span>
          <h2 className="mt-3.5 font-display text-[clamp(1.75rem,3.4vw,2.4rem)] text-[#1A0F0A]">
            Reimagining wholesome traditions for the global stage.
          </h2>
          <p className="mt-5 max-w-[52ch] mx-auto font-body text-[15.5px] font-light text-[#4a3527]">
            At Cura Heritage Foods, we believe elite nutrition and rich culinary heritage should coexist
            beautifully. By sourcing the finest natural ingredients, grains, and botanicals, we bridge
            time-honored food wisdom with contemporary living.
          </p>
          <p className="mt-4 max-w-[52ch] mx-auto font-body text-[15.5px] font-light text-[#4a3527]">
            Every recipe is a precise, masterfully balanced formulation, designed to deliver clean energy,
            vibrant flavors, and functional health benefits.
          </p>
          <div className="mt-7 text-center">
            <SectionLink
              id="why"
              className="inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-3.5 bg-[#1A0F0A] text-[#F9F6F0] rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B3E2F]"
            >
              Why Cura
            </SectionLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
