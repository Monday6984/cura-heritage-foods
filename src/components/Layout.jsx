import React from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from '@/components/cura/AnnouncementBar';
import Navbar from '@/components/cura/Navbar';
import Footer from '@/components/cura/Footer';
import CartDrawer from '@/components/cura/CartDrawer';
import SentCartModal from '@/components/cura/SentCartModal';

const skipToContent = (e) => {
  e.preventDefault();
  document.getElementById('main')?.focus();
};

export default function Layout() {
  return (
    <div className="bg-[#F9F6F0]">
      <a
        href="#main"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[#D4AF37] focus:px-4 focus:py-2 focus:font-body focus:text-[13.5px] focus:font-medium focus:text-[#120904]"
      >
        Skip to main content
      </a>
      <AnnouncementBar />
      <Navbar />
      <Outlet />
      <Footer />
      <CartDrawer />
      <SentCartModal />
    </div>
  );
}
