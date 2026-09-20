import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const PILLARS = [
  {
    title: 'Uncompromising Purity',
    body: '100% natural, nutrient-dense ingredients sourced with integrity. No artificial additives, no shortcuts. Just pure, functional nourishment.',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" className="w-13 h-13">
        <circle cx="26" cy="26" r="24" stroke="#8B3E2F" strokeWidth="1" />
        <path d="M26 14c4 6 4 10 0 14-4-4-4-8 0-14z" fill="#8B3E2F" />
        <path d="M18 34c0-6 3.5-10 8-10s8 4 8 10" stroke="#8B3E2F" strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Culinary Heritage',
    body: 'We honor traditional food wisdom, elevating classic flavor profiles and wholesome grains into contemporary, premium staples.',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" className="w-13 h-13">
        <path d="M26 8l4 10-4 4-4-4 4-10z" fill="#8B3E2F" />
        <path d="M14 30h24M14 36h24M14 42h18" stroke="#8B3E2F" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="26" cy="26" r="24" stroke="#8B3E2F" strokeWidth="1" />
      </svg>
    ),
  },
  {
    title: 'Modern Wellness',
    body: 'Crafted for the discerning palate. Delicious, clean-label nutrition designed to fit effortlessly into your active, health-conscious life.',
    icon: (
      <svg viewBox="0 0 52 52" fill="none" className="w-13 h-13">
        <circle cx="26" cy="26" r="24" stroke="#8B3E2F" strokeWidth="1" />
        <path d="M26 14v12l8 6" stroke="#8B3E2F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section id="standard" className="bg-[#F9F6F0] py-24 md:py-32">
      <div className="mx-auto max-w-[120rem] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="block font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#84601c] mb-3.5">
            Our Commitment
          </span>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] text-[#1A0F0A]">The Cura Standard</h2>
          <div
            className="mx-auto mt-5 h-2.5 w-16 opacity-85"
            style={{
              backgroundImage: 'radial-gradient(circle, #D4AF37 1.6px, transparent 1.8px)',
              backgroundSize: '10px 10px',
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e8dab8] border border-[#e8dab8]">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              className="group bg-[#F9F6F0] p-12 md:p-11 text-center transition-all duration-400 hover:bg-[#f1e7d1] hover:-translate-y-1"
            >
              <div className="mb-6 w-13 h-13 mx-auto">{p.icon}</div>
              <h3 className="font-display text-[21px] font-semibold mb-3.5 text-[#1A0F0A]">{p.title}</h3>
              <p className="max-w-[34ch] font-body text-[15px] font-light text-[#4a3527]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
