import React from 'react';
import Hero from '@/components/cura/Hero';
import Pillars from '@/components/cura/Pillars';
import Products from '@/components/cura/Products';
import Story from '@/components/cura/Story';
import HeritageMoment from '@/components/cura/HeritageMoment';
import Catalog from '@/components/cura/Catalog';
import WhyCura from '@/components/cura/WhyCura';
import Contact from '@/components/cura/Contact';
import usePageMeta from '@/lib/usePageMeta';
import { DEFAULT_TITLE } from '@/lib/site';
import { PRODUCTS } from '@/data/products';

const HERO_IMAGE = 'https://media.base44.com/images/public/6a75dc8dc7402c583680eb30/e821dfbce_generated_06cd0ff6.png';
const HERITAGE_MOMENT_IMAGE = 'https://media.base44.com/images/public/6a75dc8dc7402c583680eb30/00fb9f3a3_generated_image.png';

const FEATURED = PRODUCTS.slice(0, 4);
const CATALOG = PRODUCTS.slice(0, 6);

export default function Home() {
  usePageMeta({ title: DEFAULT_TITLE, path: '/' });

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <Hero heroImage={HERO_IMAGE} />
      <Pillars />
      <Catalog products={CATALOG} />
      <Products products={FEATURED} />
      <HeritageMoment image={HERITAGE_MOMENT_IMAGE} />
      <Story />
      <WhyCura />
      <Contact />
    </main>
  );
}
