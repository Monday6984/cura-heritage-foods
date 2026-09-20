import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ease = [0.16, 1, 0.3, 1];

export default function Products({ products }) {
  return (
    <section id="shop" className="relative bg-[#120904] py-24 md:py-32 text-[#F9F6F0]">
      <div className="mx-auto max-w-[120rem] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="block font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] mb-3.5">
            Curated for Your Table
          </span>
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] text-[#F9F6F0]">The Featured Collection</h2>
          <p className="mt-3.5 font-body text-[15.5px] font-light text-[#e8dab8]">
            Explore our signature blends, available for direct delivery to your doorstep.
          </p>
          <div
            className="mx-auto mt-5 h-2.5 w-16 opacity-85"
            style={{
              backgroundImage: 'radial-gradient(circle, #D4AF37 1.6px, transparent 1.8px)',
              backgroundSize: '10px 10px',
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-3.5 border border-[#D4AF37]/50 text-[#D4AF37] rounded-sm transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#120904]"
          >
            View All Products <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
