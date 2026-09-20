import { useEffect } from 'react';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, OG_IMAGE } from '@/lib/site';

const JSON_LD_ID = 'page-jsonld';

function setTag(tag, attr, key, value) {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(tag === 'link' ? 'href' : 'content', value);
}

// Per-page <head> management for the single-page app: title, description, canonical,
// Open Graph / Twitter tags, optional noindex, and optional JSON-LD structured data.
export default function usePageMeta({ title, description = DEFAULT_DESCRIPTION, path = '/', image = OG_IMAGE, noindex = false, jsonLd }) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title || SITE_NAME;

    setTag('meta', 'name', 'description', description);
    setTag('link', 'rel', 'canonical', url);
    setTag('meta', 'property', 'og:url', url);
    setTag('meta', 'property', 'og:title', title || SITE_NAME);
    setTag('meta', 'property', 'og:description', description);
    setTag('meta', 'property', 'og:image', image);
    setTag('meta', 'name', 'twitter:title', title || SITE_NAME);
    setTag('meta', 'name', 'twitter:description', description);
    setTag('meta', 'name', 'twitter:image', image);

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setTag('meta', 'name', 'robots', 'noindex, follow');
    else robots?.remove();

    document.getElementById(JSON_LD_ID)?.remove();
    if (jsonLdText) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = JSON_LD_ID;
      script.textContent = jsonLdText;
      document.head.appendChild(script);
    }

    return () => document.getElementById(JSON_LD_ID)?.remove();
  }, [title, description, path, image, noindex, jsonLdText]);
}
