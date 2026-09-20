import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Logo from './Logo';
import SectionLink from './SectionLink';

const NAV_LINKS = [
  { label: 'The Standard', id: 'standard' },
  { label: 'Shop', to: '/shop' },
  { label: 'Our Story', id: 'story' },
  { label: 'Why Cura', id: 'why' },
  { label: 'Contact', id: 'contact' },
];

function NavItem({ link, ...props }) {
  return link.to ? (
    <Link to={link.to} {...props}>{link.label}</Link>
  ) : (
    <SectionLink id={link.id} {...props}>{link.label}</SectionLink>
  );
}

export default function Navbar() {
  const { count, openCart } = useCart();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#120904] border-b border-[#D4AF37]/15 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[120rem] items-center justify-between px-6 py-4 md:px-12" aria-label="Main">
        <SectionLink id="top" className="flex items-center gap-3" aria-label="Cura Heritage Foods home">
          <Logo className="w-9 h-9" tone="gold" withWordmark />
        </SectionLink>

        <ul className="hidden lg:flex gap-9">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <NavItem
                link={l}
                aria-current={l.to && pathname.startsWith(l.to) ? 'page' : undefined}
                className="relative font-body text-[14.5px] text-[#F1E7D1] transition-colors duration-300 hover:text-[#D4AF37] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#D4AF37] after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:text-[#D4AF37] aria-[current=page]:after:w-full"
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="tap-target relative flex items-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] text-[#F9F6F0] transition-colors hover:text-[#D4AF37]"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[10px] font-semibold text-[#120904]">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-6 py-3 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(200,155,60,0.6)]"
          >
            Shop the Collection
          </Link>
          <button
            ref={menuButtonRef}
            onClick={() => setMobileOpen((v) => !v)}
            className="tap-target lg:hidden text-[#F9F6F0]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] bg-[#120904] ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <NavItem
                link={l}
                onClick={() => setMobileOpen(false)}
                tabIndex={mobileOpen ? 0 : -1}
                className="block py-3 font-body text-[15px] text-[#F1E7D1] border-b border-[#D4AF37]/10"
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
