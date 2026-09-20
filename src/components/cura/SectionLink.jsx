import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';

// Link to a homepage section. Smooth-scrolls when already on the homepage,
// otherwise navigates home and lets ScrollToTop scroll to the section.
export default function SectionLink({ id, onClick, children, ...props }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (pathname === '/') scrollToSection(id);
    else navigate({ pathname: '/', hash: `#${id}` });
  };

  return (
    <a href={`/#${id}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
