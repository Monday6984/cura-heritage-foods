import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatNaira } from '@/lib/store';
import useFocusTrap from '@/lib/useFocusTrap';
import { buildWhatsAppOrderUrl } from './contactInfo';
import ProductImage from './ProductImage';

const ease = [0.16, 1, 0.3, 1];

export default function SentCartModal() {
  const { items, subtotal, isSentCartOpen, closeSentCart } = useCart();
  const waUrl = buildWhatsAppOrderUrl(items, subtotal);
  const trapRef = useFocusTrap();

  return (
    <AnimatePresence>
      {isSentCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSentCart}
            className="fixed inset-0 z-[80] bg-[#1A0F0A]/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-label="Your sent cart"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease }}
              className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#e8e3da] px-5 py-4">
                <button
                  onClick={closeSentCart}
                  className="font-body text-[14px] text-[#1A0F0A] transition-colors hover:text-[#8B3E2F]"
                >
                  Close
                </button>
                <h3 className="font-display text-[16px] font-bold text-[#1A0F0A]">Your sent cart</h3>
                <span className="w-12" />
              </div>

              <div className="max-h-[55vh] overflow-y-auto px-5">
                {items.length === 0 ? (
                  <p className="py-12 text-center font-body text-[14px] text-[#757575]">
                    Your cart is empty.
                  </p>
                ) : (
                  <ul className="divide-y divide-[#e8e3da]">
                    {items.map((i) => (
                      <li key={i.id} className="flex items-center gap-3 py-3.5">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#f3efe6]">
                          <ProductImage src={i.image} alt={i.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-body text-[13.5px] font-medium text-[#1A0F0A]">{i.title}</p>
                          <p className="font-body text-[12px] text-[#6b6b6b]">Quantity {i.qty}</p>
                        </div>
                        <span className="font-body text-[13.5px] font-medium text-[#1A0F0A]">
                          {formatNaira(i.price * i.qty)}.00
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-[#e8e3da] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[14px] text-[#1A0F0A]">Subtotal</span>
                    <span className="font-display text-[16px] font-bold text-[#1A0F0A]">
                      {formatNaira(subtotal)}.00 (estimated)
                    </span>
                  </div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A0F0A] px-5 py-3.5 font-body text-[14px] font-medium text-white transition-colors hover:bg-[#8B3E2F]"
                  >
                    <MessageCircle size={16} strokeWidth={2} /> Send order via WhatsApp
                  </a>
                  <p className="mt-2.5 text-center font-body text-[11.5px] text-[#6b6b6b]">
                    Opens WhatsApp with your order pre-filled.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
