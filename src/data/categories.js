/**
 * Product categories.
 * To add a new category: add an entry here, add products with `category: "<slug>"`
 * in products.js, and choose a new 3-letter ID prefix. No UI changes needed.
 *
 * `slug` and `idPrefix` are permanent (used in URLs and product IDs).
 * `name` / `shortName` / copy can be changed freely.
 */
import { asset } from '../utils/asset.js';

export const categories = [
  {
    slug: 'bangles',
    name: 'Silk Thread Bangles',
    shortName: 'Bangles',
    idPrefix: 'BGL',
    description:
      'Silk thread bangles and kundan kadas, wrapped by hand in rich colours for festive and everyday wear.',
    tagline: 'Thread by thread, colour by colour',
    image: asset('images/bangles/img_6606.webp'),
    showcaseImage: asset('images/bangles/img_6566.webp'),
  },
  {
    slug: 'saree-pins',
    name: 'Brooches & Saree Pins',
    shortName: 'Brooches & Saree Pins',
    idPrefix: 'SRP',
    description:
      'Statement brooches and saree pins with floral detailing and pearl drops — the finishing touch for your drape.',
    tagline: 'The finishing touch to every drape',
    image: asset('images/saree-pins/img_6586.webp'),
    showcaseImage: asset('images/saree-pins/img_6579.webp'),
  },
  {
    slug: 'hair-accessories',
    name: 'Hair Accessories',
    shortName: 'Hair Accessories',
    idPrefix: 'HAR',
    description:
      'Pearl-strung hair brooches and jada pieces that frame a braid or bun with heirloom charm.',
    tagline: 'Heirloom charm for braids and buns',
    image: asset('images/hair-accessories/img_6614.webp'),
    showcaseImage: asset('images/hair-accessories/img_6585.webp'),
  },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
