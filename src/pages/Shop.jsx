import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { products } from '../data/products.js';
import { categories, getCategoryBySlug } from '../data/categories.js';
import { useSeo } from '../hooks/useSeo.js';
import './Shop.css';

const normalise = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const activeSlug = params.get('category') || 'all';
  const urlQuery = params.get('q') || '';
  const activeCategory = getCategoryBySlug(activeSlug);

  // Local input state keeps typing responsive; the URL is kept in sync so
  // searches are shareable and survive refresh.
  const [query, setQuery] = useState(urlQuery);
  const lastTyped = useRef(urlQuery);
  useEffect(() => {
    // Only adopt URL changes that didn't come from typing (e.g. "Clear filters", back button).
    if (urlQuery !== lastTyped.current) {
      lastTyped.current = urlQuery;
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  useSeo({
    title: activeCategory ? activeCategory.name : 'Shop the Collection',
    description: activeCategory?.description ?? 'Browse every handmade bangle, hair accessory and saree pin by Thread Cuddles by HS.',
  });

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: key === 'q' });
  };

  const results = useMemo(() => {
    const q = normalise(query);
    return products.filter((p) => {
      if (activeCategory && p.category !== activeCategory.slug) return false;
      if (!q) return true;
      const qid = q.replace(/\s/g, '');
      return (
        normalise(p.name).includes(q) ||
        [p.id, ...(p.formerIds ?? [])].some((pid) => pid.toLowerCase().includes(qid))
      );
    });
  }, [activeCategory, query]);

  const counts = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length])),
    []
  );

  return (
    <main id="main" className="page shop">
      <h1 className="visually-hidden">{activeCategory ? activeCategory.name : 'Shop all designs'}</h1>

      <section className="shop__body">
        <div className="container">
          <div className="shop__toolbar">
            <div className="shop__filters" role="group" aria-label="Filter by category">
              <button
                type="button"
                className={`chip ${!activeCategory ? 'is-active' : ''}`}
                aria-pressed={!activeCategory}
                onClick={() => updateParam('category', 'all')}
              >
                All Products <span>{products.length}</span>
              </button>
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.slug}
                  className={`chip ${activeCategory?.slug === c.slug ? 'is-active' : ''}`}
                  aria-pressed={activeCategory?.slug === c.slug}
                  onClick={() => updateParam('category', c.slug)}
                >
                  {c.name} <span>{counts[c.slug]}</span>
                </button>
              ))}
            </div>

            <label className="shop__search">
              <Search size={17} strokeWidth={1.5} aria-hidden="true" />
              <span className="visually-hidden">Search by product name or ID</span>
              <input
                type="search"
                placeholder="Search by name or ID (e.g. BGL002)"
                value={query}
                onChange={(e) => {
                  lastTyped.current = e.target.value;
                  setQuery(e.target.value);
                  updateParam('q', e.target.value);
                }}
                autoComplete="off"
                enterKeyHint="search"
              />
              {query && (
                <button type="button" className="shop__clear" onClick={() => updateParam('q', '')} aria-label="Clear search">
                  <X size={16} strokeWidth={1.5} />
                </button>
              )}
            </label>
          </div>

          <p className="shop__count" aria-live="polite">
            Showing {results.length} {results.length === 1 ? 'design' : 'designs'}
            {query && (
              <>
                {' '}
                for “<strong>{query}</strong>”
              </>
            )}
          </p>

          {results.length > 0 ? (
            <div className="product-grid" key={`${activeSlug}-${query}`}>
              {results.map((p, i) => (
                <div key={p.id} className="shop__item" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                  <ProductCard product={p} showAvailability />
                </div>
              ))}
            </div>
          ) : (
            <div className="shop__empty">
              <h2>No pieces found</h2>
              <p>
                We couldn’t find anything matching “{query}”. Try another name or ID — or ask us on WhatsApp, we
                love custom requests.
              </p>
              <div className="shop__empty-actions">
                <button type="button" className="btn btn--outline" onClick={() => setParams({})}>
                  Clear filters
                </button>
                <WhatsAppButton label="Ask on WhatsApp" />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
