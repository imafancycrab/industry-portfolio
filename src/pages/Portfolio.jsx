import { motion } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../data/content';

const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
};

const dotClass = { complete: 'dot-complete', ongoing: 'dot-ongoing', live: 'dot-live' };

export default function Portfolio() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <div className="page-wrap">
        <div className="hero">
          <h1 className="hero-title">
            portfolio<span className="grad-dot">.</span>
          </h1>
          <p className="hero-subtitle">swedish translations for roblox games.</p>
        </div>

        <div className="portfolio-grid">
          {PORTFOLIO_ITEMS.map((p) => {
            const hasLink = Boolean(p.href && p.href !== '#');
            return (
              <a
                key={p.name + p.statusLabel}
                className="portfolio-card"
                href={p.href || '#'}
                target={hasLink ? '_blank' : undefined}
                rel={hasLink ? 'noreferrer' : undefined}
              >
                {p.thumb ? (
                  <img
                    className="game-thumb"
                    style={{ borderRadius: 0 }}
                    src={p.thumb}
                    alt={p.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="portfolio-thumb" style={{ background: p.thumbBg }}>
                    {p.thumbLabel}
                  </div>
                )}
                <div className="portfolio-body">
                  <div className="portfolio-name">{p.name}</div>
                  <div className="portfolio-status">
                    <span className={`status-dot ${dotClass[p.status] || 'dot-ongoing'}`} aria-hidden="true" />
                    {p.statusLabel}
                  </div>
                  <div className="portfolio-desc">{p.desc}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}