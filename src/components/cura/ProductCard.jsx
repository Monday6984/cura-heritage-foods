import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatNaira } from '@/lib/store';
import ProductImage from './ProductImage';

const ease = [0.16, 1, 0.3, 1];

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const href = `/shop/${product.id}`;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease, delay: (index % 4) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-[#D4AF37]/15 bg-[#2a180f] transition-all duration-400 hover:-translate-y-1.5 hover:border-[#D4AF37]/50"
    >
      <Link to={href} className="relative block aspect-[4/5] overflow-hidden" aria-label={`View ${product.title}`}>
        <ProductImage
          src={product.image}
          alt={product.title}
          style={{ objectPosition: product.imagePosition }}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a180f] via-transparent to-transparent opacity-60" />
        {product.tags?.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-3 opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
            {product.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#D4AF37]/40 bg-[#120904]/70 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.12em] text-[#D4AF37] backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-5 text-center">
        {product.eyebrow && (
          <span className="font-body text-[11px] uppercase tracking-[0.16em] text-[#D4AF37]">{product.eyebrow}</span>
        )}
        <h3 className="font-display text-[19px] font-semibold text-[#F9F6F0]">
          <Link to={href} className="transition-colors hover:text-[#D4AF37]">{product.title}</Link>
        </h3>
        <p className="mb-3 flex-1 font-body text-[13.5px] font-light text-[#e8dab8]">{product.desc}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-body text-[15px] font-medium text-[#D4AF37]">{formatNaira(product.price)}</span>
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.title} to cart`}
            className="tap-target inline-flex items-center gap-1.5 font-body text-[12.5px] tracking-[0.05em] text-[#F1E7D1] border-b border-[#F4E6C2]/40 pb-0.5 transition-colors duration-300 hover:text-[#D4AF37] hover:border-[#D4AF37]"
          >
            {added ? 'Added' : (
              <>
                <Plus size={13} strokeWidth={2} /> Quick add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
