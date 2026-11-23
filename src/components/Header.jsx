import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { categories } from '../data/categories.js';
import './Header.css';

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/shop' },
  ...categories.map((c) => ({ label: c.shortName ?? c.name, to: `/shop?category=${c.slug}`, slug: c.slug })),
  { label: 'About & Contact', to: '/#about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const headerRef = useRef(null);
  const [menuTop, setMenuTop] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (open && headerRef.current) setMenuTop(headerRef.current.getBoundingClientRect().bottom);
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  // Lets other components (e.g. the mobile tab bar) open search.
  useEffect(() => {
    const openSearch = () => setSearchOpen(true);
    window.addEventListener('tc:open-search', openSearch);
    return () => window.removeEventListener('tc:open-search', openSearch);
  }, []);

  const params = new URLSearchParams(location.search);
  const isActive = (l) => {
    if (l.to.includes('#')) return location.pathname === '/' && location.hash === '#about';
    if (l.to === '/') return location.pathname === '/' && !location.hash;
    if (l.slug) return location.pathname === '/shop' && params.get('category') === l.slug;
    if (l.to === '/shop') return location.pathname === '/shop' && !params.get('category');
    return false;
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop');
    setQ('');
  };

  return (
    <header ref={headerRef} className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <div className="container header__top">
        <div className="header__side">
          <button
            type="button"
            className="header__icon header__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
          <button type="button" className="header__icon header__search-btn" onClick={() => setSearchOpen(true)} aria-label="Search products">
            <Search size={19} strokeWidth={1.5} />
            <span className="header__search-label">Search</span>
          </button>
        </div>

        <Link to="/" className="header__logo" aria-label="Thread Cuddles by HS — home">
          <Logo />
        </Link>

        <div className="header__side header__side--right">
          <button type="button" className="header__icon header__search-mobile" onClick={() => setSearchOpen(true)} aria-label="Search products">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <WhatsAppButton variant="outline" size="sm" label="Enquire" className="header__wa" />
        </div>
      </div>

      <nav className="header__nav" aria-label="Main">
        <ul className="container header__nav-list">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className={`header__link ${isActive(l) ? 'is-active' : ''}`} aria-current={isActive(l) ? 'page' : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Search overlay */}
      <div className={`search ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen} inert={searchOpen ? undefined : ''}>
        <form className="container search__form" role="search" onSubmit={submitSearch}>
          <Search size={20} strokeWidth={1.5} aria-hidden="true" />
          <label htmlFor="site-search" className="visually-hidden">Search by product name or ID</label>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bangles, brooches… or a product ID like BGL005"
            autoComplete="off"
            enterKeyHint="search"
          />
          <button type="submit" className="btn btn--primary btn--sm">Search</button>
          <button type="button" className="header__icon" onClick={() => setSearchOpen(false)} aria-label="Close search">
            <X size={20} strokeWidth={1.5} />
          </button>
        </form>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        style={{ top: menuTop, height: `calc(100dvh - ${menuTop}px)` }}
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              className={`mobile-menu__link ${isActive(l) ? 'is-active' : ''}`}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton className="mobile-menu__cta" />
      </div>
    </header>
  );
}
