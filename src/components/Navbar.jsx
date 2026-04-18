import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1');

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark ? '1' : '0');
  }, [dark]);

  return (
    <nav className="site-nav">
      <NavLink to="/" className="nav-logo" aria-label="Go to home">
        industry<span className="grad-dot">.</span>
      </NavLink>

      <div className="nav-inner">
        <div className="nav-pills" aria-label="Primary navigation">
          <NavLink to="/" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
            home
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
            portfolio<span className="grad-dot">.</span>
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
            projects<span className="grad-dot">.</span>
          </NavLink>
        </div>
      </div>

      <div className="nav-right">
        <div className="status-badge" aria-label="Site stats">
          <span className="green-dot" aria-hidden="true" />
          <span>10b+ visits</span>
        </div>

        <button
          type="button"
          className="dark-toggle"
          onClick={() => setDark((v) => !v)}
          aria-label="Toggle dark mode"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M6 .278a.77.77 0 0 1 .08.858A7.2 7.2 0 0 0 5.12 9.02a7.2 7.2 0 0 0 7.84 1.468.77.77 0 0 1 .86.09.78.78 0 0 1 .08.87A8.48 8.48 0 0 1 8 16a8.4 8.4 0 0 1-5.992-2.498 8.42 8.42 0 0 1-2.43-5.864 8.43 8.43 0 0 1 4.158-7.252.76.76 0 0 1 .264-.108z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}