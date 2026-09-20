import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ChevronRight, Lightbulb, MessageCircle, Minus, Plus, Truck } from 'lucide-react';
import { PRODUCTS, getProduct } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD, formatNaira } from '@/lib/store';
import usePageMeta from '@/lib/usePageMeta';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import ProductCard from '@/components/cura/ProductCard';
import ProductImage from '@/components/cura/ProductImage';
import { buildWhatsAppOrderUrl } from '@/components/cura/contactInfo';

const MAX_QTY = 99;

const absoluteUrl = (src) => (/^https?:/.test(src) ? src : `${SITE_URL}${src}`);

// Availability is intentionally omitted: stock status isn't tracked anywhere in the project.
function productJsonLd(product) {
  const url = `${SITE_URL}/shop/${product.id}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.title,
        description: product.desc,
        image: absoluteUrl(product.image),
        sku: product.id,
        category: product.category,
        url,
        offers: { '@type': 'Offer', url, priceCurrency: 'NGN', price: product.price },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
          { '@type': 'ListItem', position: 3, name: product.title, item: url },
        ],
      },
    ],
  };
}

const sectionTitle = 'mb-3 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]';
const primaryButton =
  'inline-flex items-center justify-center gap-2 font-body text-[13.5px] font-medium tracking-[0.05em] px-7 py-4 rounded-sm transition-all duration-300';

function Breadcrumb({ title }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 font-body text-[13px] text-[#e8dab8]">
      <Link to="/" className="transition-colors hover:text-[#D4AF37]">Home</Link>
      <ChevronRight size={13} strokeWidth={1.6} aria-hidden="true" />
      <Link to="/shop" className="transition-colors hover:text-[#D4AF37]">Shop</Link>
      <ChevronRight size={13} strokeWidth={1.6} aria-hidden="true" />
      <span className="text-[#F9F6F0]" aria-current="page">{title}</span>
    </nav>
  );
}

function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="min-h-[70vh] bg-[#120904] px-6 py-24 text-center text-[#F9F6F0] focus:outline-none">
      <span className="font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">404</span>
      <h1 className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.4rem)] font-semibold">Product not found</h1>
      <p className="mx-auto mt-3 max-w-md font-body text-[15px] font-light text-[#e8dab8]">
        We couldn't find that product. It may have been renamed or is no longer available.
      </p>
      <Link
        to="/shop"
        className={`${primaryButton} mt-8 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] hover:-translate-y-0.5`}
      >
        Browse all products
      </Link>
    </main>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  usePageMeta(
    product
      ? {
          title: `${product.title} | ${SITE_NAME}`,
          description: product.desc,
          path: `/shop/${product.id}`,
          image: absoluteUrl(product.image),
          jsonLd: productJsonLd(product),
        }
      : { title: `Product not found | ${SITE_NAME}`, path: '/shop', noindex: true }
  );

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [id]);

  const related = useMemo(() => {
    if (!product) return [];
    const others = PRODUCTS.filter((p) => p.id !== product.id);
    const sameCategory = others.filter((p) => p.category === product.category);
    const rest = others.filter((p) => p.category !== product.category);
    return [...sameCategory, ...rest].slice(0, 4);
  }, [product]);

  if (!product) return <NotFound />;

  const handleAdd = () => {
    addItem(product, true, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const whatsappUrl = buildWhatsAppOrderUrl([{ ...product, qty }], product.price * qty);
  const paragraphs = (product.details || product.desc).split(/\n\s*\n/);

  return (
    <main id="main" tabIndex={-1} className="bg-[#120904] pb-24 pt-10 text-[#F9F6F0] focus:outline-none md:pb-32 md:pt-14">
      <div className="mx-auto max-w-[120rem] px-6 md:px-12">
        <Breadcrumb title={product.title} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-[#D4AF37]/15 bg-[#2a180f]">
              <ProductImage
                src={product.image}
                alt={product.title}
                loading="eager"
                fetchpriority="high"
                style={{ objectPosition: product.imagePosition }}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] transition-colors hover:text-[#F1E7D1]"
            >
              {product.category}
            </Link>
            {product.eyebrow && (
              <p className="mt-2 font-body text-[13px] uppercase tracking-[0.14em] text-[#e8dab8]/80">{product.eyebrow}</p>
            )}
            <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-[#F9F6F0]">{product.title}</h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-display text-[28px] font-semibold text-[#D4AF37]">{formatNaira(product.price)}</span>
              {product.size && <span className="font-body text-[14px] text-[#e8dab8]">{product.size}</span>}
            </div>

            <div className="mt-6 space-y-4 font-body text-[15.5px] font-light leading-relaxed text-[#e8dab8]">
              {paragraphs.map((para, i) => (
                <p key={i} className="whitespace-pre-line">{para}</p>
              ))}
            </div>

            {product.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#D4AF37]/40 px-3 py-1 font-body text-[11px] uppercase tracking-[0.12em] text-[#D4AF37]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 border-t border-[#D4AF37]/15 pt-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-sm border border-[#D4AF37]/30" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                    className="p-3.5 text-[#F9F6F0] transition-colors hover:text-[#D4AF37] disabled:opacity-40"
                  >
                    <Minus size={15} strokeWidth={2} />
                  </button>
                  <span className="w-10 text-center font-body text-[15px] tabular-nums" aria-live="polite">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                    aria-label="Increase quantity"
                    className="p-3.5 text-[#F9F6F0] transition-colors hover:text-[#D4AF37]"
                  >
                    <Plus size={15} strokeWidth={2} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`${primaryButton} flex-1 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(200,155,60,0.6)] sm:flex-none sm:min-w-[220px]`}
                >
                  {added ? (
                    <>
                      <Check size={16} strokeWidth={2.5} /> Added to cart
                    </>
                  ) : (
                    `Add to cart · ${formatNaira(product.price * qty)}`
                  )}
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={`${primaryButton} mt-4 w-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#120904]`}
              >
                <MessageCircle size={16} strokeWidth={2} /> Order this on WhatsApp
              </a>

              <p className="mt-4 flex items-center gap-2 font-body text-[12.5px] text-[#e8dab8]">
                <Truck size={15} strokeWidth={1.5} className="text-[#D4AF37]" />
                Complimentary shipping on orders over {formatNaira(FREE_SHIPPING_THRESHOLD)}.
              </p>
            </div>

            {product.highlights?.length > 0 && (
              <section className="mt-10">
                <h2 className={sectionTitle}>{product.highlightsTitle || 'Highlights'}</h2>
                <ul className="space-y-3">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 font-body text-[15px] font-light leading-relaxed text-[#e8dab8]">
                      <Check size={17} strokeWidth={2.2} className="mt-1 flex-shrink-0 text-[#D4AF37]" aria-hidden="true" />
                      <span>
                        {h.label && <strong className="font-medium text-[#F9F6F0]">{h.label}: </strong>}
                        {h.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.usage && (
              <section className="mt-8">
                <h2 className={sectionTitle}>{product.usage.title}</h2>
                <p className="whitespace-pre-line font-body text-[15px] font-light leading-relaxed text-[#e8dab8]">
                  {product.usage.text}
                </p>
              </section>
            )}

            {product.tip && (
              <aside className="mt-8 flex gap-3 rounded-sm border border-[#D4AF37]/25 bg-[#2a180f] p-5">
                <Lightbulb size={18} strokeWidth={1.6} className="mt-0.5 flex-shrink-0 text-[#D4AF37]" aria-hidden="true" />
                <p className="font-body text-[14.5px] font-light leading-relaxed text-[#e8dab8]">
                  <strong className="font-medium text-[#F9F6F0]">Pro tip: </strong>
                  {product.tip}
                </p>
              </aside>
            )}

            {product.ingredients && (
              <section className="mt-8">
                <h2 className={sectionTitle}>Ingredients</h2>
                <p className="font-body text-[15px] font-light leading-relaxed text-[#e8dab8]">{product.ingredients}</p>
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-[#D4AF37]/15 pt-16" aria-labelledby="related-heading">
            <div className="mb-10 flex items-end justify-between gap-4">
              <h2 id="related-heading" className="font-display text-[clamp(1.5rem,3vw,2rem)] text-[#F9F6F0]">
                You may also like
              </h2>
              <Link to="/shop" className="tap-target font-body text-[14px] text-[#e8dab8] transition-colors hover:text-[#D4AF37]">
                View all &rsaquo;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
