import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// HashRouter (URLs like /#/product/BGL001) works on GitHub Pages without
// server-side rewrites: refreshing or sharing any deep link always loads index.html.
import { HashRouter } from 'react-router-dom';
// Global styles first so component styles can override them.
import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </HashRouter>
  </StrictMode>
);
