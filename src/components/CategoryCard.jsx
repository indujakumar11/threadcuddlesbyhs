import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { smallImage, srcSet, handleImageError } from '../utils/images.js';
import './CategoryCard.css';

export default function CategoryCard({ category, count, index }) {
  return (
    <Link to={`/shop?category=${category.slug}`} className="category-card">
      <div className="category-card__media">
        <img
          src={smallImage(category.image)}
          srcSet={srcSet(category.image)}
          sizes="(max-width: 700px) 92vw, 33vw"
          alt={`${category.name} collection`}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
        {typeof index === 'number' && <span className="category-card__num">0{index + 1}</span>}
      </div>
      <div className="category-card__body">
        <div className="category-card__titlebar">
          <h3 className="category-card__name">{category.name}</h3>
          {typeof count === 'number' && (
            <span className="category-card__count">
              {count} {count === 1 ? 'design' : 'designs'}
            </span>
          )}
        </div>
        <p className="category-card__desc">{category.description}</p>
        <span className="category-card__cta">
          Explore Collection <ArrowRight size={14} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
