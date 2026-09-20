import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SearchX, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/cura/ProductCard';
import usePageMeta from '@/lib/usePageMeta';
import { SITE_NAME } from '@/lib/site';

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

const ALL = 'All';

const searchText = (p) =>
  [p.title, p.eyebrow, p.category, p.desc, p.details, ...(p.tags || [])].join(' ').toLowerCase();

const chipClass = (active) =>
  `whitespace-nowrap rounded-full border px-4 py-2 font-body text-[13px] tracking-[0.03em] transition-colors duration-300 ${
    active
      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#120904]'
      : 'border-[#D4AF37]/30 text-[#F1E7D1] hover:border-[#D4AF37] hover:text-[#D4AF37]'
  }`;

export default function Shop() {
  usePageMeta({
    title: `Shop All Products | ${SITE_NAME}`,
    description: `Browse natural spice blends, soup essentials, honey and breakfast purée from ${SITE_NAME}. Search, filter and order via WhatsApp.`,
    path: '/shop',
  });
  const [params, setParams] = useSearchParams();
  // Search text is local state (written through to the URL) so typing never lags behind router updates.
  const [query, setQuery] = useState(() => params.get('q') ?? '');

  const category = CATEGORIES.includes(params.get('category')) ? params.get('category') : ALL;
  const sort = SORTS.some((s) => s.value === params.get('sort')) ? params.get('sort') : 'featured';

  const updateParam = (key, value, defaultValue) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === defaultValue) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
  };

  const handleQuery = (value) => {
    setQuery(value);
    updateParam('q', value.trim(), '');
  };

  const clearFilters = () => {
    setQuery('');
    setParams({}, { replace: true });
  };

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const list = PRODUCTS.filter(
      (p) => (category === ALL || p.category === category) && terms.every((t) => searchText(p).includes(t))
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'name') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [query, category, sort]);

  const filtersActive = query.trim() !== '' || category !== ALL || sort !== 'featured';

  return (
    <main id="main" tabIndex={-1} className="min-h-[70vh] bg-[#120904] pb-24 pt-16 text-[#F9F6F0] focus:outline-none md:pb-32 md:pt-20">
      <div className="mx-auto max-w-[120rem] px-6 md:px-12">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="block font-body text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] mb-3.5">
            The Collection
          </span>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#F9F6F0]">Shop All Products</h1>
          <p className="mt-3.5 font-body text-[15.5px] font-light text-[#e8dab8]">
            Natural spice blends, soup essentials and pantry staples, made with nothing artificial.
          </p>
        </div>

        <div className="mb-10 space-y-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search size={17} strokeWidth={1.6} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              <input
                type="search"
                value={query}
                onChange={(e) => handleQuery(e.target.value)}
                placeholder="Search products, e.g. suya, honey, no MSG"
                aria-label="Search products"
                className="w-full rounded-sm border border-[#D4AF37]/25 bg-[#2a180f] py-3.5 pl-11 pr-11 font-body text-[14.5px] text-[#F9F6F0] placeholder:text-[#e8dab8]/60 focus:border-[#D4AF37] focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#e8dab8] transition-colors hover:text-[#D4AF37]"
                >
                  <X size={16} strokeWidth={1.8} />
                </button>
              )}
            </div>

            <label className="flex items-center gap-3 font-body text-[13px] text-[#e8dab8]">
              <span className="whitespace-nowrap">Sort by</span>
              <select
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value, 'featured')}
                className="w-full rounded-sm border border-[#D4AF37]/25 bg-[#2a180f] px-4 py-3.5 font-body text-[14px] text-[#F9F6F0] focus:border-[#D4AF37] focus:outline-none md:w-auto"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {CATEGORIES.length > 1 && (
            <div className="hide-scrollbar -mx-6 flex gap-2.5 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Filter by category">
              {[ALL, ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateParam('category', c, ALL)}
                  aria-pressed={category === c}
                  className={chipClass(category === c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between font-body text-[13px] text-[#e8dab8]">
            <p aria-live="polite">
              Showing {results.length} of {PRODUCTS.length} {PRODUCTS.length === 1 ? 'product' : 'products'}
            </p>
            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="underline underline-offset-4 transition-colors hover:text-[#D4AF37]"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <h2 className="sr-only">Products</h2>
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
            <SearchX size={44} strokeWidth={1.2} className="mb-5 text-[#D4AF37]/70" />
            <h2 className="font-display text-[22px] font-semibold text-[#F9F6F0]">No products found</h2>
            <p className="mt-2 font-body text-[14.5px] font-light text-[#e8dab8]">
              Nothing matches your search. Try a different word or clear the filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center justify-center font-body text-[13.5px] font-medium tracking-[0.05em] px-6 py-3 bg-gradient-to-b from-[#D4AF37] to-[#a97d2e] text-[#120904] rounded-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
