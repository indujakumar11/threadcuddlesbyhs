import { Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { useSeo } from '../hooks/useSeo.js';
import './NotFound.css';

export default function NotFound({
  title = 'This page has unravelled',
  text = 'The page you’re looking for doesn’t exist or may have moved. Let’s get you back to the collection.',
}) {
  useSeo({ title: 'Not found' });
  return (
    <main id="main" className="page not-found">
      <div className="container not-found__inner">
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1>{title}</h1>
        <p className="not-found__text">{text}</p>
        <div className="not-found__actions">
          <Link to="/shop" className="btn btn--primary">
            Browse the collection
          </Link>
          <Link to="/" className="btn btn--outline">
            Back to home
          </Link>
        </div>
        <WhatsAppButton variant="ghost" label="Or ask us on WhatsApp" className="not-found__wa" />
      </div>
    </main>
  );
}
