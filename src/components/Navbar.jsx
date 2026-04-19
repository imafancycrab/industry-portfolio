import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/content';
import { FiSun, FiMoon } from 'react-icons/fi';

function formatVisits(num) {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}b+`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}m+`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}k+`;
  return `${num}`;
}

function extractPlaceIds(items) {
  return items
    .map(item => {
      const match = item.href?.match(/roblox\.com\/games\/(\d+)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);
}

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1');
  const [visitsLabel, setVisitsLabel] = useState('…');

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark ? '1' : '0');
  }, [dark]);

  useEffect(() => {
    async function fetchLiveVisits() {
      try {
        const placeIds = extractPlaceIds(PORTFOLIO_ITEMS);
        if (placeIds.length === 0) {
          setVisitsLabel('10b+ visits');
          return;
        }

        // 1. Convert placeIds to universeIds
        const universePromises = placeIds.map(placeId =>
          fetch(`https://apis.roproxy.com/universes/v1/places/${placeId}/universe`)
            .then(res => res.ok ? res.json() : null)
            .then(data => data?.universeId)
        );
        const universeIds = (await Promise.all(universePromises)).filter(Boolean);

        if (universeIds.length === 0) throw new Error('No universe IDs found');

        // 2. Fetch game details using universeIds
        const gamesRes = await fetch(`https://games.roproxy.com/v1/games?universeIds=${universeIds.join(',')}`);
        if (!gamesRes.ok) throw new Error('Failed to fetch game details');
        const gamesData = await gamesRes.json();

        // 3. Sum up all visits
        const total = gamesData.data.reduce((sum, game) => sum + (game.visits || 0), 0);
        setVisitsLabel(`${formatVisits(total)} visits`);
      } catch (err) {
        console.error('Failed to fetch live visits:', err);
        setVisitsLabel('10b+ visits'); // Fallback
      }
    }

    fetchLiveVisits();
  }, []);

  return (
    <nav className="site-nav">
      <NavLink to="/" className="nav-logo" aria-label="Go to home">
        industry<span className="grad-dot">.</span>
      </NavLink>

      <div className="nav-inner">
        <div className="nav-pills" aria-label="Primary navigation">
          <NavLink to="/" className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}>
            home<span className="grad-dot">.</span>
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
          <span>{visitsLabel}</span>
        </div>

        <button
          type="button"
          className="dark-toggle"
          onClick={() => setDark((v) => !v)}
          aria-label="Toggle dark mode"
        >
          {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>
      </div>
    </nav>
  );
}