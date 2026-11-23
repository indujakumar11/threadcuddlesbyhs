import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollManager from './components/ScrollManager.jsx';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import MobileTabBar from './components/MobileTabBar.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Categories from './pages/Categories.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      {/* Focuses <main> directly — a plain "#main" href would be treated as a route by HashRouter. */}
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById('main');
          if (main) {
            main.setAttribute('tabindex', '-1');
            main.focus();
          }
        }}
      >
        Skip to content
      </a>
      <ScrollManager />
      <AnnouncementBar />
      <Header />
      {/* Keying by pathname replays the page fade-in on navigation. */}
      <Routes key={pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <MobileTabBar />
    </>
  );
}
