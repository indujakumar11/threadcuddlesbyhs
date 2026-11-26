/**
 * Product catalogue — the single source of truth for all products.
 *
 * Rules:
 *  - `id` is permanent and unique. Never reuse or renumber an ID, even if a
 *    product is removed. New products get the next number for their prefix
 *    (BGL = bangles, HAR = hair accessories, SRP = saree pins).
 *  - When two listings turn out to be the same item, keep one and list the other
 *    IDs in `formerIds` — old links and ID searches then open the kept product.
 *    Retired IDs (never reuse): BGL003, BGL004, BGL006, BGL007, BGL010.
 *  - `images` paths point to the optimised copies in /public/images. The first
 *    image is the cover. A smaller "-sm" version is used automatically on cards.
 *  - `price` is a number in INR or `null` (price is then hidden).
 *  - Set `available: false` to show "Currently unavailable".
 *  - Set `featured: true` to show the product in "Featured Designs" on the home page.
 *  - Set `newArrival: true` / `popular: true` to show it in "New Arrivals" /
 *    "Popular Collections" (both optional).
 */
import { categories } from './categories.js';
import { asset } from '../utils/asset.js';

const img = (category, file) => asset(`images/${category}/${file}.webp`);

export const products = [
  // ───────────── Bangles ─────────────
  {
    id: 'BGL001',
    name: 'Magenta Silk Thread Bangle Set',
    category: 'bangles',
    description:
      'A vibrant set of slim silk thread bangles in deep magenta, finished with delicate gold edging. Lightweight and comfortable enough for all-day wear.',
    price: null,
    images: [img('bangles', 'img_6551')],
    features: ['Handcrafted', 'Premium silk thread', 'Stackable set', 'Customisable size'],
    available: true,
    featured: false,
    popular: true,
  },
  {
    id: 'BGL002',
    name: 'Teal Stone-Studded Bangle Set',
    category: 'bangles',
    // BGL003 and BGL004 were photos of this same set and are merged here.
    formerIds: ['BGL003', 'BGL004'],
    description:
      'Rich teal bangles layered with rows of sparkling stones and fine gold borders — a statement stack for festive occasions that can be worn as a full wrist set.',
    price: null,
    images: [
      img('bangles', 'img_6552'),
      img('bangles', 'img_6617'),
      img('bangles', 'img_6605'),
      img('bangles', 'img_6561'),
      img('bangles', 'img_6591'),
      img('bangles', 'img_6612'),
      img('bangles', 'img_6554'),
      img('bangles', 'img_6610'),
    ],
    features: ['Handcrafted', 'Stone-studded detailing', 'Full wrist set', 'Customisable size'],
    available: true,
    featured: true,
    popular: true,
  },
  {
    id: 'BGL005',
    name: 'Antique Gold Kundan Bangle Set',
    category: 'bangles',
    // BGL006 and BGL007 were photos of this same set and are merged here.
    formerIds: ['BGL006', 'BGL007'],
    description:
      'Antique-gold silk thread bangles and broad kadas adorned with floral kundan work and magenta stones. Traditional craftsmanship with a regal, heirloom finish.',
    price: null,
    images: [
      img('bangles', 'img_6553'),
      img('bangles', 'img_6574'),
      img('bangles', 'img_6568'),
      img('bangles', 'img_6566'),
      img('bangles', 'img_6590'),
      img('bangles', 'img_6618'),
    ],
    features: ['Handcrafted', 'Kundan detailing', 'Antique gold finish', 'Bridal favourite'],
    available: true,
    featured: true,
    popular: true,
  },
  {
    id: 'BGL008',
    name: 'Emerald Stone Bangle Set',
    category: 'bangles',
    description:
      'Emerald green silk thread bangles encrusted with glittering stones and gold beading, for a jewel-like shimmer with every movement.',
    price: null,
    images: [
      img('bangles', 'img_6588'),
      img('bangles', 'img_6609'),
      img('bangles', 'img_6572'),
      img('bangles', 'img_6562'),
    ],
    features: ['Handcrafted', 'Stone-encrusted', 'Premium silk thread', 'Customisable size'],
    available: true,
    featured: true,
  },
  {
    id: 'BGL009',
    name: 'Lime Green Geometric Bangle Set',
    category: 'bangles',
    // BGL010 was a photo of this same set and is merged here.
    formerIds: ['BGL010'],
    description:
      'Fresh lime green bangles with a hand-worked geometric pattern and green stone borders, paired with plain silk thread bangles for a playful festive stack — perfect for haldi and mehendi.',
    price: null,
    images: [
      img('bangles', 'img_6560'),
      img('bangles', 'img_6582'),
      img('bangles', 'img_6619'),
      img('bangles', 'img_6575'),
    ],
    features: ['Handcrafted', 'Geometric pattern', 'Stackable set', 'Customisable colours'],
    available: true,
    featured: true,
    newArrival: true,
  },
  {
    id: 'BGL011',
    name: 'Sunset Orange Bangle Set',
    category: 'bangles',
    description:
      'Warm orange silk thread bangles with fine gold detailing, adding a glow of colour to everyday and festive looks.',
    price: null,
    images: [img('bangles', 'img_6555')],
    features: ['Handcrafted', 'Premium silk thread', 'Stackable set'],
    available: true,
    featured: false,
    newArrival: true,
  },
  {
    id: 'BGL012',
    name: 'Scarlet Silk Thread Bangles',
    category: 'bangles',
    description:
      'Fiery red-orange silk thread bangles with a glossy finish and gold accents — a classic, auspicious colour for every celebration.',
    price: null,
    images: [img('bangles', 'img_6577')],
    features: ['Handcrafted', 'Glossy silk finish', 'Stackable set'],
    available: true,
    featured: true,
  },
  {
    id: 'BGL013',
    name: 'Sky Blue Silk Thread Bangles',
    category: 'bangles',
    description:
      'Soft sky blue silk thread bangles with gold dot detailing — understated, fresh and easy to pair with pastels.',
    price: null,
    images: [img('bangles', 'img_6576')],
    features: ['Handcrafted', 'Premium silk thread', 'Everyday wear'],
    available: true,
    featured: false,
    newArrival: true,
  },
  {
    id: 'BGL014',
    name: 'Golden Yellow Bangle Set',
    category: 'bangles',
    description:
      'Golden yellow silk thread bangles with tiny gold bead accents, a sunny addition to traditional and fusion outfits.',
    price: null,
    images: [img('bangles', 'img_6598')],
    features: ['Handcrafted', 'Premium silk thread', 'Stackable set'],
    available: true,
    featured: false,
    newArrival: true,
  },
  {
    id: 'BGL015',
    name: 'Sunshine Yellow Silk Bangles',
    category: 'bangles',
    description:
      'Vivid yellow silk thread bangles with beaded borders, made to brighten festive mornings and pooja celebrations.',
    price: null,
    images: [img('bangles', 'img_6599')],
    features: ['Handcrafted', 'Beaded borders', 'Lightweight'],
    available: true,
    featured: false,
    newArrival: true,
  },
  {
    id: 'BGL016',
    name: 'Rainbow Silk Thread Collection',
    category: 'bangles',
    description:
      'A curated assortment of silk thread bangle sets in magenta, gold, blue, black, green and maroon. Pick your favourite shades or order a mix.',
    price: null,
    images: [img('bangles', 'img_6606'), img('bangles', 'img_6584')],
    features: ['Handcrafted', 'Multiple colours', 'Mix & match', 'Customisable'],
    available: true,
    featured: false,
    newArrival: true,
    popular: true,
  },

  // ───────────── Hair Accessories ─────────────
  {
    id: 'HAR001',
    name: 'Pearl Lotus Hair Brooch',
    category: 'hair-accessories',
    description:
      'A lotus-inspired hair brooch with pearl petals around a kundan centre and cascading pearl strands. Beautiful on a bridal bun or braid.',
    price: null,
    images: [
      img('hair-accessories', 'img_6614'),
      img('hair-accessories', 'img_6613'),
      img('hair-accessories', 'img_6585'),
    ],
    features: ['Handcrafted', 'Pearl petals', 'Kundan centre', 'Layered pearl strands'],
    available: true,
    featured: true,
  },
  {
    id: 'HAR002',
    name: 'Ruby Drop Pearl Hair Chain',
    category: 'hair-accessories',
    description:
      'A floral kundan top with delicate pearl chains ending in ruby-red bead drops — a graceful accent for braids and buns.',
    price: null,
    images: [
      img('hair-accessories', 'img_6569'),
      img('hair-accessories', 'img_6592'),
      img('hair-accessories', 'img_6556'),
      img('hair-accessories', 'img_6570'),
    ],
    features: ['Handcrafted', 'Pearl chains', 'Ruby-red drops', 'Secure pin fitting'],
    available: true,
    featured: false,
    newArrival: true,
    popular: true,
  },

  // ───────────── Saree Pins ─────────────
  {
    id: 'SRP001',
    name: 'Violet Bloom Saree Pin',
    category: 'saree-pins',
    description:
      'A layered floral saree pin in violet and yellow petals, finished with pearl drops that sway softly with your pallu.',
    price: null,
    images: [
      img('saree-pins', 'img_6586'),
      img('saree-pins', 'img_6594'),
      img('saree-pins', 'img_6616'),
      img('saree-pins', 'img_6579'),
    ],
    features: ['Handcrafted', 'Floral petal work', 'Pearl drops', 'Secure pin back'],
    available: true,
    featured: true,
  },
  {
    id: 'SRP002',
    name: 'Sapphire Kundan Saree Pin',
    category: 'saree-pins',
    description:
      'A sapphire-blue centre stone framed by kundan and teal petals, with clustered pearl drops — elegant on silk and georgette drapes.',
    price: null,
    images: [
      img('saree-pins', 'img_6587'),
      img('saree-pins', 'img_6620'),
      img('saree-pins', 'img_6579'),
    ],
    features: ['Handcrafted', 'Sapphire-tone stone', 'Kundan setting', 'Pearl drops'],
    available: true,
    featured: false,
    newArrival: true,
    popular: true,
  },
];

// ───────────── Helpers ─────────────
/** Finds a product by its ID, or by a retired ID that was merged into it (`formerIds`). */
export const getProductById = (id) => {
  const key = String(id).toLowerCase();
  return (
    products.find((p) => p.id.toLowerCase() === key) ??
    products.find((p) => p.formerIds?.some((f) => f.toLowerCase() === key))
  );
};

export const getProductsByCategory = (slug) => products.filter((p) => p.category === slug);

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getNewArrivals = () => products.filter((p) => p.newArrival);

export const getPopularProducts = () => products.filter((p) => p.popular);

export const getRelatedProducts = (product, limit = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

// Development-time integrity checks (stripped from production builds).
if (import.meta.env.DEV) {
  const ids = new Set();
  for (const p of products) {
    for (const pid of [p.id, ...(p.formerIds ?? [])]) {
      if (ids.has(pid)) console.error(`[products] Duplicate product ID: ${pid}`);
      ids.add(pid);
    }
    const cat = categories.find((c) => c.slug === p.category);
    if (!cat) console.error(`[products] ${p.id} has unknown category "${p.category}"`);
    else if (!p.id.startsWith(cat.idPrefix))
      console.error(`[products] ${p.id} should start with "${cat.idPrefix}"`);
    if (!p.images?.length) console.warn(`[products] ${p.id} has no images`);
  }
}
