import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories.js';
import { formatPrice } from '../utils/format.js';
import { smallImage, handleImageError, PLACEHOLDER_IMAGE } from '../utils/images.js';
import './ProductCard.css';

export default function ProductCard({ product, showAvailability = false }) {
  const price = formatPrice(product.price);
  const category = getCategoryBySlug(product.category);
  const cover = product.images?.[0];
  const second = product.images?.[1];
  const url = `/product/${product.id}`;

  return (
    <article className="product-card">
      <Link to={url} className="product-card__media" aria-label={`View ${product.name}`} tabIndex={-1}>
        <img
          src={cover ? smallImage(cover) : PLACEHOLDER_IMAGE}
          alt={`${product.name} — handmade ${category?.name.toLowerCase() ?? 'accessory'}`}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="product-card__img"
        />
        {second && (
          <img src={smallImage(second)} alt="" aria-hidden="true" loading="lazy" decoding="async" className="product-card__img product-card__img--alt" />
        )}
        {!product.available && <span className="product-card__badge">Currently unavailable</span>}
      </Link>
      <div className="product-card__body">
        <p className="product-card__meta">
          <span className="product-card__id">{product.id}</span>
          {category && <span aria-hidden="true">·</span>}
          {category && <span>{category.name}</span>}
        </p>
        <h3 className="product-card__name">
          <Link to={url}>{product.name}</Link>
        </h3>
        {price && <p className="product-card__price">{price}</p>}
        {showAvailability && product.available && (
          <p className="product-card__stock">
            <span className="dot" aria-hidden="true" /> Available to order
          </p>
        )}
        <Link to={url} className="product-card__cta">
          View Details <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
