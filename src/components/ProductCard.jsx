import { Link } from 'react-router-dom';
import { getCategoryBySlug } from '../data/categories.js';
import { formatPrice } from '../utils/format.js';
import { smallImage, handleImageError, PLACEHOLDER_IMAGE } from '../utils/images.js';
import { getProductWhatsAppUrl } from '../utils/whatsapp.js';
import { WhatsAppIcon } from './BrandIcons.jsx';
import './ProductCard.css';

export default function ProductCard({ product, showAvailability = false, badge }) {
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
        {badge && <span className="product-card__badge product-card__badge--tag">{badge}</span>}
        {!product.available && <span className="product-card__badge">Currently unavailable</span>}
      </Link>
      <div className="product-card__body">
        {category && (
          <Link to={`/shop?category=${category.slug}`} className="product-card__cat">
            {category.name}
          </Link>
        )}
        <h3 className="product-card__name">
          <Link to={url}>{product.name}</Link>
        </h3>
        <p className="product-card__id">ID: {product.id}</p>
        {price && <p className="product-card__price">{price}</p>}
        {showAvailability && product.available && (
          <p className="product-card__stock">
            <span className="dot" aria-hidden="true" /> Available to order
          </p>
        )}
        <div className="product-card__actions">
          <a
            href={getProductWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card__wa"
            aria-label={`Enquire about ${product.name} (${product.id}) on WhatsApp`}
          >
            <WhatsAppIcon size={15} /> Enquire on WhatsApp
          </a>
          <Link to={url} className="product-card__details">View details</Link>
        </div>
      </div>
    </article>
  );
}
