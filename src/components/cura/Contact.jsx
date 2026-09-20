import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, Instagram } from 'lucide-react';
import { CURA_CONTACT } from './contactInfo';

const ease = [0.16, 1, 0.3, 1];

export default function Contact() {
  const waUrl = `https://wa.me/${CURA_CONTACT.whatsapp}`;

  const cards = [
    {
      label: 'mobile',
      value: CURA_CONTACT.phoneDisplay,
      href: `tel:${CURA_CONTACT.phoneTel}`,
      actions: [
        { icon: MessageCircle, href: waUrl, label: 'Chat on WhatsApp', external: true },
        { icon: Phone, href: `tel:${CURA_CONTACT.phoneTel}`, label: 'Call' },
      ],
    },
    {
      label: 'email',
      value: CURA_CONTACT.email,
      href: `mailto:${CURA_CONTACT.email}`,
      actions: [
        { icon: Mail, href: `mailto:${CURA_CONTACT.email}`, label: 'Email us' },
      ],
    },
    {
      label: 'instagram',
      value: CURA_CONTACT.instagramHandle,
      href: CURA_CONTACT.instagramUrl,
      actions: [
        { icon: Instagram, href: CURA_CONTACT.instagramUrl, label: 'Follow on Instagram', external: true },
      ],
    },
  ];

  return (
    <section id="contact" className="bg-[#F9F6F0] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#84601c]">
            Get in Touch
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-[#1A0F0A]">
            We'd love to hear from you
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-[15px] font-light text-[#4a3527]">
            Orders, wholesale enquiries, or simply a hello — reach the Cura team directly.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map((c, idx) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: idx * 0.1 }}
              className="min-w-0 rounded-xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(26,15,10,0.25)] ring-1 ring-[#1A0F0A]/5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="font-body text-[12px] lowercase tracking-wide text-[#757575]">{c.label}</span>
                  <a
                    href={c.href}
                    target={c.actions[0]?.external ? '_blank' : undefined}
                    rel={c.actions[0]?.external ? 'noreferrer' : undefined}
                    className="mt-1 block break-words font-display text-[15px] font-semibold text-[#1A0F0A] transition-colors hover:text-[#8B3E2F]"
                  >
                    {c.value}
                  </a>
                </div>
                <div className="flex flex-shrink-0 gap-2.5">
                  {c.actions.map((a) => (
                    <a
                      key={a.label}
                      href={a.href}
                      target={a.external ? '_blank' : undefined}
                      rel={a.external ? 'noreferrer' : undefined}
                      aria-label={a.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0efec] text-[#1A0F0A] transition-colors hover:bg-[#8B3E2F] hover:text-white"
                    >
                      <a.icon size={17} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
