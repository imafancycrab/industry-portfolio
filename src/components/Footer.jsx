import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="nav-logo">
        industry<span className="grad-dot">.</span>
      </Link>
      <span>2026 industry. made with care.</span>
    </footer>
  );
}

