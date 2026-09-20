import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { getProduct } from '@/data/products';

const CartContext = createContext(null);

const STORAGE_KEY = 'cura-cart-v1';
const MAX_QTY = 99;

// Only { id, qty } is persisted; title, price and image are always read from the
// current catalog, so saved carts never show stale prices or removed products.
function loadLines() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => l && getProduct(l.id) && Number.isInteger(l.qty) && l.qty > 0)
      .map((l) => ({ id: l.id, qty: Math.min(l.qty, MAX_QTY) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadLines);
  const [isOpen, setIsOpen] = useState(false);
  const [isSentCartOpen, setIsSentCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable (private mode, quota) - cart just won't persist
    }
  }, [lines]);

  const overlayOpen = isOpen || isSentCartOpen;
  useEffect(() => {
    if (!overlayOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsSentCartOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [overlayOpen]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const openSentCart = useCallback(() => {
    setIsOpen(false);
    setIsSentCartOpen(true);
  }, []);
  const closeSentCart = useCallback(() => setIsSentCartOpen(false), []);

  const addItem = useCallback((product, openAfter = true, qty = 1) => {
    if (!getProduct(product.id)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.id === product.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l
        );
      }
      return [...prev, { id: product.id, qty: Math.min(MAX_QTY, qty) }];
    });
    if (openAfter) setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)));
  }, []);

  const items = useMemo(
    () => lines.map((l) => ({ ...getProduct(l.id), qty: l.qty })),
    [lines]
  );
  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((n, i) => n + i.price * i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items, count, subtotal,
      isOpen, openCart, closeCart,
      isSentCartOpen, openSentCart, closeSentCart,
      addItem, removeItem, updateQty,
    }),
    [items, count, subtotal, isOpen, openCart, closeCart, isSentCartOpen, openSentCart, closeSentCart, addItem, removeItem, updateQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
