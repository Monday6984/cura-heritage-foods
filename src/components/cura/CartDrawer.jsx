import React from 'react';
import { X, Minus, Plus, Trash2, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD, formatNaira } from '@/lib/store';
import useFocusTrap from '@/lib/useFocusTrap';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, count, openSentCart } = useCart();
  const trapRef = useFocusTrap();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-[#1A0F0A]/60 backdrop-blur-sm"
          />
          <motion.aside
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#F9F6F0] text-[#1A0F0A] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#1A0F0A]/10 px-6 py-5">
              <div>
                <span className="font-body text-[11px] uppercase tracking-[0.18em] text-[#84601c]">Your Archive</span>
                <h3 className="font-display text-xl font-semibold">Cart ({count})</h3>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="tap-target text-[#1A0F0A] transition-colors hover:text-[#8B3E2F]"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {items.length > 0 && (
              <div className="border-b border-[#1A0F0A]/10 px-6 py-4">
                <div className="mb-2 flex items-center gap-2 font-body text-[12.5px] text-[#4a3527]">
                  <Truck size={15} strokeWidth={1.5} className="text-[#8B3E2F]" />
                  {remaining > 0 ? (
                    <span>Add <strong className="font-medium text-[#1A0F0A]">{formatNaira(remaining)}</strong> for complimentary shipping</span>
                  ) : (
                    <span className="font-medium text-[#8B3E2F]">You've unlocked complimentary shipping</span>
                  )}
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8dab8]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#a97d2e] to-[#D4AF37]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <svg viewBox="0 0 52 52" fill="none" className="w-14 h-14 mb-4 opacity-40">
                    <circle cx="26" cy="26" r="24" stroke="#8B3E2F" strokeWidth="1" />
                    <path d="M26 14c4 6 4 10 0 14-4-4-4-8 0-14z" fill="#8B3E2F" />
                  </svg>
                  <p className="font-display text-lg text-[#1A0F0A]">Your cart is empty</p>
                  <p className="mt-1.5 font-body text-[13.5px] font-light text-[#4a3527]">
                    Discover heritage blends worth keeping.
                  </p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="mt-6 inline-flex items-center justify-center font-body text-[13.5px] font-medium tracking-[0.05em] px-6 py-3 bg-[#1A0F0A] text-[#F9F6F0] rounded-sm transition-colors hover:bg-[#8B3E2F]"
                  >
                    Browse the Collection
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-[#1A0F0A]/10">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-5">
                      <Link
                        to={`/shop/${item.id}`}
                        onClick={closeCart}
                        aria-label={`View ${item.title}`}
                        className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-[#e8dab8]"
                      >
                        <ProductImage src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            {item.eyebrow && (
                              <span className="font-body text-[10px] uppercase tracking-[0.14em] text-[#84601c]">{item.eyebrow}</span>
                            )}
                            <h4 className="font-display text-[15px] font-semibold leading-tight text-[#1A0F0A]">
                              <Link to={`/shop/${item.id}`} onClick={closeCart} className="transition-colors hover:text-[#8B3E2F]">
                                {item.title}
                              </Link>
                            </h4>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.title}`}
                            className="tap-target text-[#4a3527] transition-colors hover:text-[#8B3E2F]"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-[#1A0F0A]/15 rounded-sm">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="p-2 text-[#1A0F0A] transition-colors hover:text-[#8B3E2F]"
                            >
                              <Minus size={13} strokeWidth={2} />
                            </button>
                            <span className="w-7 text-center font-body text-[13px] tabular-nums">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="p-2 text-[#1A0F0A] transition-colors hover:text-[#8B3E2F]"
                            >
                              <Plus size={13} strokeWidth={2} />
                            </button>
                          </div>
                          <span className="font-body text-[14px] font-medium text-[#1A0F0A]">
                            {formatNaira(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#1A0F0A]/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-body text-[13px] uppercase tracking-[0.12em] text-[#4a3527]">Subtotal</span>
                  <span className="font-display text-xl font-semibold text-[#1A0F0A]">{formatNaira(subtotal)}</span>
                </div>
                <p className="mb-4 font-body text-[12px] font-light text-[#4a3527]">
                  Taxes and shipping calculated at checkout.
                </p>
                <button
                  onClick={openSentCart}
                  className="w-full inline-flex items-center justify-center font-body text-[13.5px] font-medium tracking-[0.05em] px-6 py-4 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(200,155,60,0.6)]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
