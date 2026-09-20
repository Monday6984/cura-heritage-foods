import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function HeritageMoment({ image }) {
  return (
    <section className="relative bg-[#120904] py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-sm"
      >
        <div className="aspect-[16/10] md:aspect-[21/9]">
          <img
            src={image}
            alt="A happy woman holding heritage grains in a sunlit kitchen"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120904]/70 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-center"
        >
          <span className="block font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] mb-2">
            Nourishment, Reclaimed
          </span>
          <p className="mx-auto max-w-xl font-display text-[clamp(1.25rem,2.4vw,1.75rem)] italic font-medium leading-snug text-[#F9F6F0]">
            "Every handful carries a story — of the land, the harvest, and the people who keep the tradition alive."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
