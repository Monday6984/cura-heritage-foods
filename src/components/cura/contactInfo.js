import { formatNaira } from '@/lib/store';

export const CURA_CONTACT = {
  phoneDisplay: '+234 806 202 0233',
  phoneTel: '+2348062020233',
  whatsapp: '2348062020233',
  email: 'tosafglobalconcept@gmail.com',
  instagramUrl: 'https://www.instagram.com/cura_heritage_foods',
  instagramHandle: '@cura_heritage_foods',
  location: 'Ikeja, Lagos, Nigeria',
};

export function buildWhatsAppOrderUrl(items, subtotal) {
  const lines = items
    .map((i, idx) => `${idx + 1}. ${i.title} — ${formatNaira(i.price * i.qty)} (Qty ${i.qty})`)
    .join('\n');
  const msg = `Hello Cura Heritage Foods! I'd like to place an order:\n\n${lines}\n\nSubtotal: ${formatNaira(subtotal)} (estimated)\n\nName: \nDelivery address: `;
  return `https://wa.me/${CURA_CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}
