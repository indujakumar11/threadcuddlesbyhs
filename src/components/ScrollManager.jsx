import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * - Scrolls to the #section when a hash is present (e.g. /#about, /#contact).
 * - Otherwise scrolls to top when the page (pathname) changes. Query-string
 *   changes, such as shop filters, keep the current scroll position.
 */
export default function ScrollManager() {
  const { pathname, search, hash, key } = useLocation();
  const prevPath = useRef(pathname);
  const prevSearch = useRef(search);

  useEffect(() => {
    const pathChanged = prevPath.current !== pathname;
    const searchChanged = prevSearch.current !== search;
    prevPath.current = pathname;
    prevSearch.current = search;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      let timer;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else if (tries++ < 10) timer = setTimeout(attempt, 50);
      };
      attempt();
      return () => clearTimeout(timer);
    }
    if (pathChanged) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Same page re-selected (e.g. "Home" while viewing /#about): glide to top.
    else if (!searchChanged) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search, hash, key]);

  return null;
}
