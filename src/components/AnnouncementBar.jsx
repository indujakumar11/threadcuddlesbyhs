import { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import './AnnouncementBar.css';

/** Slim top bar that gently rotates through short brand messages. */
export default function AnnouncementBar() {
  const messages = siteConfig.announcements ?? [];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % messages.length), 4200);
    return () => clearInterval(t);
  }, [messages.length]);

  if (!messages.length) return null;
  return (
    <div className="announce" role="region" aria-label="Announcements">
      <div className="announce__track" aria-live="polite">
        {messages.map((m, n) => (
          <p key={m} className={`announce__msg ${n === i ? 'is-active' : ''}`} aria-hidden={n !== i}>
            <span className="announce__dot" aria-hidden="true">✦</span>
            {m}
            <span className="announce__dot" aria-hidden="true">✦</span>
          </p>
        ))}
      </div>
    </div>
  );
}
