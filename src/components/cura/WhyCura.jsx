import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Wheat, Truck, MessageCircle, ArrowRight } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, formatNaira } from '@/lib/store';

const ease = [0.16, 1, 0.3, 1];

const REASONS = [
  {
    icon: Leaf,
    title: 'Nothing artificial',
    body: '100% natural ingredients. No MSG, no artificial additives and no fillers, just real spices, seafood and botanicals.',
  },
  {
    icon: Wheat,
    title: 'Rooted in heritage',
    body: 'Traditional Nigerian flavors, from suya to peppersoup to iru, prepared to the modern hygiene standards your family deserves.',
  },
  {
    icon: Truck,
    title: 'Delivered from Lagos',
    body: `We deliver nationwide from Lagos, and shipping is complimentary on orders over ${formatNaira(FREE_SHIPPING_THRESHOLD)}.`,
  },
  {
    icon: MessageCircle,
    title: 'Order in minutes',
    body: 'Build your cart and send it straight to the Cura team on WhatsApp. No account and no forms.',
  },
];

export default function WhyCura() {
  return (
    <section id="why" className="bg-[#120904] py-24 md:py-32 text-[#F9F6F0]">
      <div className="mx-auto max-w-[120rem] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="block font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] mb-3.5">
            The Difference
          </span>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] text-[#F9F6F0]">Why Cura</h2>
          <p className="mt-3.5 font-body text-[15.5px] font-light text-[#e8dab8]">
            Food you can trust, flavor you remember, and an ordering experience that stays out of your way.
          </p>
          <div
            className="mx-auto mt-5 h-2.5 w-16 opacity-85"
            style={{
              backgroundImage: 'radial-gradient(circle, #D4AF37 1.6px, transparent 1.8px)',
              backgroundSize: '10px 10px',
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="rounded-sm border border-[#D4AF37]/15 bg-[#2a180f] p-8 text-center transition-all duration-400 hover:-translate-y-1 hover:border-[#D4AF37]/50"
            >
              <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#D4AF37]">
                <r.icon size={24} strokeWidth={1.4} />
              </span>
              <h3 className="mb-3 font-display text-[20px] font-semibold text-[#F9F6F0]">{r.title}</h3>
              <p className="font-body text-[14.5px] font-light text-[#e8dab8]">{r.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-3.5 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(200,155,60,0.6)]"
          >
            Shop the Collection <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
