/**
 * Product categories.
 * To add a new category: add an entry here, add products with `category: "<slug>"`
 * in products.js, and choose a new 3-letter ID prefix. No UI changes needed.
 */
export const categories = [
  {
    slug: 'bangles',
    name: 'Bangles',
    idPrefix: 'BGL',
    description:
      'Silk thread bangles and kundan kadas, wrapped by hand in rich colours for festive and everyday wear.',
    image: '/images/bangles/img_6606.webp',
  },
  {
    slug: 'hair-accessories',
    name: 'Hair Accessories',
    idPrefix: 'HAR',
    description:
      'Pearl-strung hair brooches and jada pieces that frame a braid or bun with heirloom charm.',
    image: '/images/hair-accessories/img_6614.webp',
  },
  {
    slug: 'saree-pins',
    name: 'Saree Pins',
    idPrefix: 'SRP',
    description:
      'Statement saree pins with floral detailing and pearl drops — the finishing touch for your drape.',
    image: '/images/saree-pins/img_6586.webp',
  },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
