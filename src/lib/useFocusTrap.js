import { useCallback, useRef } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Returns a ref callback for a dialog element. While the dialog is mounted it:
// moves focus inside, keeps Tab / Shift+Tab within it, and hands focus back to the
// element that opened it when it closes.
export default function useFocusTrap() {
  const cleanupRef = useRef(null);

  return useCallback((node) => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    if (!node) return;

    const opener = document.activeElement;
    const focusable = () => [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);

    node.tabIndex = -1;
    (focusable()[0] || node).focus({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = focusable();
      if (items.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!node.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    cleanupRef.current = () => {
      document.removeEventListener('keydown', onKeyDown);
      // Only restore if focus is still in the dialog (or lost); another dialog may have taken it.
      const active = document.activeElement;
      if ((active === document.body || node.contains(active)) && opener && document.contains(opener)) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);
}
