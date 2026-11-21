/**
 * Resolves a file in /public against the deployment base path.
 *   dev:           asset('images/a.webp') -> '/images/a.webp'
 *   GitHub Pages:  asset('images/a.webp') -> '/threadcuddlesbyhs/images/a.webp'
 * Always use this for public files referenced from JS so images keep working
 * wherever the site is hosted.
 */
export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;
