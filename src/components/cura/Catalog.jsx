import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import ProductImage from './ProductImage';

const ease = [0.16, 1, 0.3, 1];

export default function Catalog({ products }) {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (p) => {
    addItem(p, false);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="catalog" className="bg-[#F9F6F0] py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="rounded-xl bg-white p-6 md:p-8 shadow-[0_24px_60px_-30px_rgba(26,15,10,0.25)] ring-1 ring-[#1A0F0A]/5">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-[22px] md:text-[26px] font-bold text-[#1A0F0A]">Catalog</h2>
            <Link to="/shop" className="tap-target font-body text-[14px] text-[#6b6b6b] transition-colors hover:text-[#8B3E2F]">
              See all &rsaquo;
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {products.map((p, i) => (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => handleAdd(p)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-xl bg-[#f3efe6] text-left"
                aria-label={`Add ${p.title} to cart`}
              >
                <ProductImage
                  src={p.image}
                  alt={p.title}
                  style={{ objectPosition: p.imagePosition }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-2 left-2 right-2 line-clamp-1 font-body text-[11px] font-medium text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.title}
                </span>
                <span
                  className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                    addedId === p.id
                      ? 'scale-100 bg-[#D4AF37] text-[#120904]'
                      : 'bg-white/90 text-[#1A0F0A] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {addedId === p.id ? <Check size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
                </span>
              </motion.button>
            ))}
          </div>

          <p className="mt-5 text-center font-body text-[12.5px] text-[#6b6b6b]">
            Tap a product to add it to your cart.
          </p>
        </div>
      </div>
    </section>
  );
}
