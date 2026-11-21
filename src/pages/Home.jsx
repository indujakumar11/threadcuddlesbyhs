import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, HandHeart, Search, MessageCircle, Gift } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { categories } from '../data/categories.js';
import { products, getFeaturedProducts, getProductsByCategory } from '../data/products.js';
import { siteConfig } from '../config/siteConfig.js';
import { smallImage, srcSet, handleImageError } from '../utils/images.js';
import { useSeo } from '../hooks/useSeo.js';
import './Home.css';

const VALUES = [
  { icon: HandHeart, title: 'Made by hand', text: 'Every piece is wrapped and finished by hand.' },
  { icon: Sparkles, title: 'Premium silk thread', text: 'Lustrous threads, stones and pearls.' },
  { icon: Palette, title: 'Custom colours', text: 'Matched to your outfit and occasion.' },
  { icon: Gift, title: 'Thoughtful gifting', text: 'A keepsake for someone special.' },
];

const STEPS = [
  { icon: Search, title: 'Browse', text: 'Explore the collection and find a design you love.' },
  { icon: Sparkles, title: 'Note the ID', text: 'Each piece has a unique ID, such as BGL002.' },
  { icon: MessageCircle, title: 'Enquire', text: 'Tap “Enquire on WhatsApp” — the details are filled in for you.' },
];

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 8);
  const { hero, about, contact } = siteConfig;
  const [titleLine1, titleLine2] = hero.title.split('\n');

  useSeo({
    description:
      'Handmade silk thread bangles, hair accessories and saree pins by ThreadCuddlesByHS. Browse the collection and enquire on WhatsApp.',
  });

  return (
    <main id="main" className="page home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__panel" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">{hero.eyebrow}</p>
            <h1 className="hero__title">
              <span>{titleLine1}</span>
              <em>{titleLine2}</em>
            </h1>
            <p className="hero__text">{hero.text}</p>
            <div className="hero__ctas">
              <Link to="/shop" className="btn btn--primary btn--lg">
                Explore Collection
              </Link>
              <WhatsAppButton variant="outline" size="lg" />
            </div>
            <ul className="hero__trust">
              <li>Handmade</li>
              <li>Customisable</li>
              <li>Made to order</li>
            </ul>
          </div>

          <div className="hero__visual">
            <figure className="hero__main">
              <img
                src={hero.image}
                srcSet={srcSet(hero.image)}
                sizes="(max-width: 900px) 90vw, 42vw"
                alt="Handmade kundan kadas with gold floral work and magenta stones"
                fetchpriority="high"
                onError={handleImageError}
              />
            </figure>
            <Link to="/product/HAR001" className="hero__float">
              <img src={smallImage(hero.secondaryImage)} alt="Pearl Lotus Hair Brooch" loading="lazy" onError={handleImageError} />
              <span>
                <small>Featured · HAR001</small>
                Pearl Lotus Hair Brooch
              </span>
            </Link>
            <span className="hero__badge" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text>
                  <textPath href="#badge-circle">handcrafted · thread by thread ·</textPath>
                </text>
              </svg>
              <i>hs</i>
            </span>
          </div>
        </div>
      </section>

      {/* ── Values strip ── */}
      <section className="values" aria-label="Why ThreadCuddlesByHS">
        <div className="container values__grid">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} className="values__item" delay={i * 80}>
              <Icon size={22} strokeWidth={1.2} className="values__icon" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section" id="categories">
        <div className="container">
          <SectionHeading eyebrow="Our Collections" title={<>Shop by <em>category</em></>} />
          <div className="category-grid">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}>
                <CategoryCard category={c} index={i} count={getProductsByCategory(c.slug).length} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ── */}
      <section className="section section--peach featured">
        <div className="container">
          <div className="featured__head">
            <SectionHeading
              align="left"
              eyebrow="Featured Pieces"
              title={<>Loved, <em>handpicked</em></>}
              text="A few favourites from the studio — each one made by hand and ready to be customised for you."
            />
            <Reveal className="featured__link">
              <Link to="/shop" className="text-link">
                View all {products.length} designs <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
          <div className="product-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section about" id="about">
        <div className="container about__inner">
          <Reveal className="about__media">
            <img
              src={smallImage(about.image)}
              srcSet={srcSet(about.image)}
              sizes="(max-width: 900px) 92vw, 45vw"
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
              <div>
                <strong>100%</strong>
                <span>Handmade</span>
              </div>
              <div>
                <strong>{products.length}+</strong>
                <span>Designs</span>
              </div>
              <div>
                <strong>{categories.length}</strong>
                <span>Collections</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How to order ── */}
      <section className="section section--tight steps" aria-labelledby="steps-title">
        <div className="container">
          <SectionHeading eyebrow="Ordering is simple" title={<span id="steps-title">How to <em>order</em></span>} />
          <ol className="steps__grid">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} className="steps__item" delay={i * 120}>
                <span className="steps__num">0{i + 1}</span>
                <Icon size={24} strokeWidth={1.2} className="steps__icon" />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="contact" id="contact">
        <div className="container">
          <Reveal className="contact__card">
            <p className="eyebrow">Enquiries & Orders</p>
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
