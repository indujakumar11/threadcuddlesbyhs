import { Link } from 'react-router-dom';
import './PageHeader.css';

/** Editorial page banner with breadcrumb. `crumbs` = [{ label, to? }] */
export default function PageHeader({ eyebrow, title, text, crumbs = [] }) {
  return (
    <section className="page-header">
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow page-header__eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title">{title}</h1>
        {text && <p className="page-header__text">{text}</p>}
      </div>
    </section>
  );
}
