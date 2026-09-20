import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/data/products';
import Logo from './Logo';
import SectionLink from './SectionLink';
import { CURA_CONTACT } from './contactInfo';

const linkClass = 'font-body text-[14px] text-[#e8dab8] transition-colors duration-300 hover:text-[#D4AF37]';

const SHOP_LINKS = [
  { label: 'All Products', to: '/shop' },
  ...CATEGORIES.map((c) => ({ label: c, to: `/shop?category=${encodeURIComponent(c)}` })),
];

const COMPANY_LINKS = [
  { label: 'Our Story', id: 'story' },
  { label: 'The Cura Standard', id: 'standard' },
  { label: 'Why Cura', id: 'why' },
  { label: 'Wholesale Enquiries', id: 'contact' },
];

const headingClass = 'mb-4.5 font-body text-[12px] font-medium uppercase tracking-[0.14em] text-[#D4AF37]';

export default function Footer() {
  return (
    <footer className="bg-[#120904] text-[#e8dab8] pt-20 pb-8">
      <div className="mx-auto max-w-[120rem] px-6 md:px-12 text-center">
        <div className="grid grid-cols-1 gap-12 pb-14 border-b border-[#D4AF37]/14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-12">
          <div className="flex flex-col items-center">
            <SectionLink id="top" aria-label="Back to top">
              <Logo className="w-11 h-11" tone="gold" withWordmark />
            </SectionLink>
            <p className="mt-4 max-w-[30ch] font-body text-[13.5px] font-light text-[#e8dab8]">
              Heritage in every grain, wellness in every detail. Formerly Tosaf Foods.
            </p>
          </div>

          <nav aria-label="Shop">
            <h3 className={headingClass}>Shop</h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <SectionLink id={l.id} className={linkClass}>{l.label}</SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={headingClass}>Contact</h3>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${CURA_CONTACT.phoneTel}`} className={linkClass}>{CURA_CONTACT.phoneDisplay}</a>
              </li>
              <li>
                <a href={`https://wa.me/${CURA_CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${CURA_CONTACT.email}`} className={linkClass}>{CURA_CONTACT.email}</a>
              </li>
              <li>
                <a href={CURA_CONTACT.instagramUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  {CURA_CONTACT.instagramHandle}
                </a>
              </li>
              <li>
                <span className="font-body text-[14px] text-[#e8dab8]">{CURA_CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-6 font-body text-[12.5px] text-[#F1E7D1]/55">
          <span>© {new Date().getFullYear()} Cura Heritage Foods Limited. All rights reserved.</span>
          <span>Formerly Tosaf Foods</span>
        </div>
      </div>
    </footer>
  );
}
