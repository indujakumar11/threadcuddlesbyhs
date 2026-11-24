import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HandHeart, Palette, Sparkles, MessageCircle } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { categories } from '../data/categories.js';
import { products, getFeaturedProducts, getNewArrivals, getPopularProducts, getProductsByCategory } from '../data/products.js';
import { siteConfig } from '../config/siteConfig.js';
import { smallImage, srcSet, handleImageError } from '../utils/images.js';
import { useSeo } from '../hooks/useSeo.js';
import './Home.css';

const USP_ICONS = [HandHeart, Palette, Sparkles, MessageCircle];

function HeroSlider() {
  const { hero } = siteConfig;
  const slides = hero.slides ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const [line1, line2] = hero.title.split('\n');

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (dir) => setActive((i) => (i + dir + slides.length) % slides.length);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured creations"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__title">
            <span>{line1}</span>
            <em>{line2}</em>
          </h1>
          <p className="hero__text">{hero.text}</p>
          <div className="hero__ctas">
            <Link to="/categories" className="btn btn--primary btn--lg">Explore Collections</Link>
            <Link to="/shop" className="btn btn--outline btn--lg">Discover Our Creations</Link>
          </div>
          {slides.length > 1 && (
            <div className="hero__dots" role="tablist" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.productId}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show ${s.label}`}
                  className={`hero__dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className="hero__stage"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {slides.map((s, i) => (
            <figure key={s.productId} className={`hero__slide ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
              <img
                src={s.image}
                srcSet={srcSet(s.image)}
                sizes="(max-width: 900px) 92vw, 46vw"
                alt={s.label}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchpriority={i === 0 ? 'high' : undefined}
                onError={handleImageError}
              />
              <figcaption>
                <Link to={`/product/${s.productId}`} tabIndex={i === active ? 0 : -1}>
                  <small>{s.productId}</small>
                  {s.label}
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </figcaption>
            </figure>
          ))}
          <span className="hero__frame" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { about, contact, usps = [] } = siteConfig;

  useSeo({
    description:
      'Handmade silk thread bangles, kundan bangles, brooches, saree pins and hair accessories by Thread Cuddles by HS. Browse the collection and enquire on WhatsApp.',
  });

  return (
    <main id="main" className="page home">
      <HeroSlider />

      {/* ── Brand promises ── */}
      <section className="usps" aria-label="Why Thread Cuddles by HS">
        <ul className="container usps__grid">
          {usps.map((u, i) => {
            const Icon = USP_ICONS[i % USP_ICONS.length];
            return (
              <li key={u.title} className="usps__item">
                <Icon size={22} strokeWidth={1.2} className="usps__icon" />
                <div>
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Shop by category ── */}
      <section className="section" id="categories">
        <div className="container">
          <SectionHeading eyebrow="Shop by Category" title={<>Find your <em>favourite</em></>} />
          <div className="category-grid">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 110}>
                <CategoryCard category={c} index={i} count={getProductsByCategory(c.slug).length} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProductCarousel
        eyebrow="Just In"
        title={<>New <em>Arrivals</em></>}
        products={getNewArrivals()}
        viewAllTo="/shop"
        badge="New"
        tone="peach"
      />

      <ProductCarousel
        eyebrow="Handpicked"
        title={<>Featured <em>Designs</em></>}
        products={getFeaturedProducts()}
        viewAllTo="/shop"
      />

      {/* ── Collection showcase (alternating) ── */}
      <section className="section section--peach showcase" aria-label="Our collections">
        <div className="container">
          <SectionHeading eyebrow="Our Collections" title={<>Made by hand, <em>made for you</em></>} />
          {categories.map((c, i) => {
            const items = getProductsByCategory(c.slug).slice(0, 3);
            const img = c.showcaseImage ?? c.image;
            return (
              <article key={c.slug} className={`showcase__row ${i % 2 ? 'showcase__row--flip' : ''}`}>
                <Reveal className="showcase__media">
                  <Link to={`/shop?category=${c.slug}`} tabIndex={-1} aria-hidden="true">
                    <img src={smallImage(img)} srcSet={srcSet(img)} sizes="(max-width: 900px) 92vw, 50vw" alt="" loading="lazy" onError={handleImageError} />
                  </Link>
                </Reveal>
                <Reveal className="showcase__copy" delay={120}>
                  <p className="eyebrow">{c.tagline}</p>
                  <h3 className="showcase__title">{c.name}</h3>
                  <p className="showcase__text">{c.description}</p>
                  <ul className="showcase__thumbs">
                    {items.map((p) => (
                      <li key={p.id}>
                        <Link to={`/product/${p.id}`} title={`${p.name} (${p.id})`}>
                          <img src={smallImage(p.images[0])} alt={p.name} loading="lazy" onError={handleImageError} />
                          <span>{p.id}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/shop?category=${c.slug}`} className="btn btn--outline">
                    Explore {c.shortName ?? c.name} <ArrowRight size={15} strokeWidth={1.5} />
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <ProductCarousel
        eyebrow="Customer Favourites"
        title={<>Popular <em>Collections</em></>}
        products={getPopularProducts()}
        viewAllTo="/shop"
        viewAllLabel={`View all ${products.length} designs`}
      />

      {/* ── Brand introduction ── */}
      <section className="section section--peach about" id="about">
        <div className="container about__inner">
          <Reveal className="about__media">
            <img
              src={smallImage(about.image)}
              srcSet={srcSet(about.image)}
              sizes="(max-width: 900px) 92vw, 42vw"
              alt="A colourful assortment of handmade silk thread bangle sets"
              loading="lazy"
              onError={handleImageError}
            />
            <span className="about__frame" aria-hidden="true" />
          </Reveal>
          <div className="about__copy">
            <SectionHeading align="left" eyebrow={about.eyebrow} title={about.title} />
            {about.text.map((para, i) => (
              <Reveal as="p" key={i} delay={i * 100} className={i === 0 ? 'about__lead' : 'about__text'}>
                {para}
              </Reveal>
            ))}
            <Reveal className="about__stats" delay={200}>
              <div><strong>100%</strong><span>Handmade</span></div>
              <div><strong>{products.length}+</strong><span>Designs</span></div>
              <div><strong>{categories.length}</strong><span>Collections</span></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Contact / WhatsApp ── */}
      <section className="contact" id="contact">
        <div className="container">
          <Reveal className="contact__card">
            <p className="eyebrow">Enquiries & Custom Orders</p>
            <h2 className="contact__title">{contact.title}</h2>
            <p className="contact__text">{contact.text}</p>
            <WhatsAppButton label="Enquire Now" size="lg" />
            <p className="contact__note">Custom colours and sizes available on request.</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
