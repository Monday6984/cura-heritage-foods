import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => scrollToSection(hash.slice(1)), 50);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
