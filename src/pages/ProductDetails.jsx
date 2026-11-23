import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import ProductGallery from '../components/ProductGallery.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import NotFound from './NotFound.jsx';
import { getProductById, getRelatedProducts } from '../data/products.js';
import { getCategoryBySlug } from '../data/categories.js';
import { formatPrice } from '../utils/format.js';
import { useSeo } from '../hooks/useSeo.js';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const [copied, setCopied] = useState(false);

  useSeo(
    product
      ? { title: `${product.name} (${product.id})`, description: product.description, image: product.images[0] }
      : { title: 'Product not found' }
  );

  if (!product) {
    return (
      <NotFound
        title="This piece couldn’t be found"
        text={`We couldn’t find a product with the ID “${id}”. It may have been renamed or is no longer listed.`}
      />
    );
  }

  const category = getCategoryBySlug(product.category);
  const price = formatPrice(product.price);
  const related = getRelatedProducts(product, 8);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(product.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <main id="main" className="page pdp" key={product.id}>
      <div className="container">
        <nav className="pdp__nav" aria-label="Breadcrumb">
          <Link to={category ? `/shop?category=${category.slug}` : '/shop'} className="pdp__back">
            <ArrowLeft size={16} strokeWidth={1.5} /> Back to {category ? category.name : 'collection'}
          </Link>
          <ol className="pdp__crumbs">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            {category && <li><Link to={`/shop?category=${category.slug}`}>{category.name}</Link></li>}
            <li aria-current="page">{product.id}</li>
          </ol>
        </nav>

        <div className="pdp__grid">
          <div className="pdp__gallery">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="pdp__info">
            {category && (
              <Link to={`/shop?category=${category.slug}`} className="eyebrow pdp__category">
                {category.name}
              </Link>
            )}
            <h1 className="pdp__title">{product.name}</h1>

            <div className="pdp__meta">
              <button type="button" className="pdp__id" onClick={copyId} title="Copy product ID">
                <span>Product ID</span>
                <strong>{product.id}</strong>
                {copied ? <Check size={14} strokeWidth={1.8} /> : <Copy size={14} strokeWidth={1.5} />}
                <span className="visually-hidden" aria-live="polite">{copied ? 'Copied' : ''}</span>
              </button>
              <span className={`pdp__stock ${product.available ? 'is-available' : 'is-unavailable'}`}>
                <span className="dot" aria-hidden="true" />
                {product.available ? 'Available to order' : 'Currently unavailable'}
              </span>
            </div>

            {price && <p className="pdp__price">{price}</p>}

            <p className="pdp__desc">{product.description}</p>

            {product.features?.length > 0 && (
              <div className="pdp__features">
                <h2>Details</h2>
                <ul>
                  {product.features.map((f) => (
                    <li key={f}>
                      <Check size={15} strokeWidth={1.6} aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pdp__actions">
              <WhatsAppButton product={product} size="lg" className="pdp__wa" />
              <p className="pdp__hint">
                Your message will include the product ID <strong>{product.id}</strong> so we can help you quickly.
              </p>
            </div>

            <ul className="pdp__assurances">
              <li>Handmade to order</li>
              <li>Custom colours & sizes on request</li>
              <li>Order & enquire via WhatsApp</li>
            </ul>
          </div>
        </div>
      </div>

      <ProductCarousel
        eyebrow={`More from ${category?.name ?? 'the collection'}`}
        title={<>You may also <em>love</em></>}
        products={related}
        viewAllTo={category ? `/shop?category=${category.slug}` : '/shop'}
        tone="peach"
      />

      {/* Mobile sticky enquiry bar */}
      <div className="pdp__sticky">
        <div>
          <strong>{product.name}</strong>
          <span>{product.id}</span>
        </div>
        <WhatsAppButton product={product} label="Enquire" size="sm" />
      </div>
    </main>
  );
}
