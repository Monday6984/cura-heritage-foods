// Runs after `vite build` (see package.json). Writes dist/sitemap.xml from the product data,
// so new or removed products never leave the sitemap out of date.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PRODUCTS } from '../src/data/products.js';
import { SITE_URL } from '../src/lib/site.js';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const lastmod = new Date().toISOString().slice(0, 10);

const paths = ['/', '/shop', ...PRODUCTS.map((p) => `/shop/${p.id}`)];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url>\n    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;

mkdirSync(distDir, { recursive: true });
writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${paths.length} URLs`);
