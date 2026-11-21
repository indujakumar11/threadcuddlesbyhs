import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import { categories } from '../data/categories.js';
import { getProductsByCategory } from '../data/products.js';
import { smallImage, srcSet, handleImageError } from '../utils/images.js';
import { useSeo } from '../hooks/useSeo.js';
import './Categories.css';

export default function Categories() {
  useSeo({
    title: 'Categories',
    description: 'Explore ThreadCuddlesByHS collections — silk thread bangles, hair accessories and saree pins.',
  });

  return (
    <main id="main" className="page categories-page">
      <PageHeader
        crumbs={[{ label: 'Categories' }]}
        eyebrow="Collections"
        title={<>Explore our <em>collections</em></>}
        text="Each collection is made by hand in small batches. Choose a category to see every design."
      />

      <div className="container">
        {categories.map((cat, i) => {
          const items = getProductsByCategory(cat.slug);
          const preview = items.slice(0, 3);
          return (
            <section key={cat.slug} className={`cat-row ${i % 2 ? 'cat-row--flip' : ''}`} aria-labelledby={`cat-${cat.slug}`}>
              <Reveal className="cat-row__media">
                <Link to={`/shop?category=${cat.slug}`} tabIndex={-1} aria-hidden="true">
                  <img
                    src={smallImage(cat.image)}
                    srcSet={srcSet(cat.image)}
                    sizes="(max-width: 900px) 92vw, 48vw"
                    alt=""
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={handleImageError}
                  />
                </Link>
              </Reveal>
              <Reveal className="cat-row__copy" delay={120}>
                <span className="cat-row__num">0{i + 1}</span>
                <h2 id={`cat-${cat.slug}`}>{cat.name}</h2>
                <p className="cat-row__desc">{cat.description}</p>
                <p className="cat-row__count">
                  {items.length} {items.length === 1 ? 'design' : 'designs'}
                </p>
                {preview.length > 0 && (
                  <ul className="cat-row__preview">
                    {preview.map((p) => (
                      <li key={p.id}>
                        <Link to={`/product/${p.id}`} title={`${p.name} (${p.id})`}>
                          <img src={smallImage(p.images[0])} alt={p.name} loading="lazy" onError={handleImageError} />
                          <span>{p.id}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link to={`/shop?category=${cat.slug}`} className="btn btn--outline">
                  Explore {cat.name} <ArrowRight size={15} strokeWidth={1.5} />
                </Link>
              </Reveal>
            </section>
          );
        })}
      </div>
    </main>
  );
}
