import { motion } from 'framer-motion';
import { GAMES, LINKS } from '../data/content';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { SiRoblox } from 'react-icons/si';
import Tilt from 'react-parallax-tilt';

// This dictates how the page enters and leaves
const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
};

const badgeClass = { translated: 'badge-translated' };
const badgeLabel = { translated: 'TRANSLATED' };

const ICONS = { discord: FaDiscord, roblox: SiRoblox, github: FaGithub };

const ICON_BG = { discord: '#5865F2', roblox: '#e8212a', github: '#333' };

export default function Hub() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <div className="page-wrap">
        <div className="hero">
          <h1 className="hero-title">
            industry<span className="grad-dot">.</span>
          </h1>
          <p className="hero-subtitle">swedish translator with over 10b+ visits contributed.</p>
        </div>

        <div style={{ paddingBottom: 56 }}>
          <p className="section-label">Games</p>
          <div className="games-grid">
            {GAMES.map((g) => {
              const hasLink = Boolean(g.link && g.link !== '#');
              return (
                <Tilt
                  key={g.name}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.01}
                  transitionSpeed={2000}
                  style={{ display: 'block' }}
                >
                  <a
                    className="game-card"
                    href={g.link || '#'}
                    target={hasLink ? '_blank' : undefined}
                    rel={hasLink ? 'noreferrer' : undefined}
                  >
                    {g.thumb ? (
                      <img className="game-thumb" src={g.thumb} alt={g.name} loading="lazy" />
                    ) : (
                      <div className="game-thumb-placeholder">{g.name}</div>
                    )}
                    <div className="game-info">
                      {g.icon ? (
                        <img className="game-icon" src={g.icon} alt="" loading="lazy" />
                      ) : (
                        <div className="game-icon-placeholder">{g.name.slice(0, 2).toUpperCase()}</div>
                      )}
                      <div className="game-meta">
                        <div className="game-name">{g.name}</div>
                        <div className="game-desc">{g.desc}</div>
                      </div>
                      <span className={`game-badge ${badgeClass.translated}`}>{badgeLabel.translated}</span>
                    </div>
                  </a>
                </Tilt>
              );
            })}
          </div>
        </div>

        <div>
          <p className="section-label">Where Else</p>
          <div className="links-grid">
            {LINKS.map((l) => {
              const isStatic = !l.href;
              const CardComponent = isStatic ? 'div' : 'a';
              return (
                <Tilt
                  key={l.name + l.icon}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  scale={isStatic ? 1 : 1.02}
                  transitionSpeed={2000}
                  style={{ display: 'block' }}
                  tiltEnable={!isStatic}
                >
                  <CardComponent 
                    className="link-card" 
                    href={isStatic ? undefined : l.href} 
                    target={isStatic ? undefined : "_blank"} 
                    rel={isStatic ? undefined : "noreferrer"}
                    style={isStatic ? { cursor: 'default' } : undefined}
                  >
                    {(() => {
                      const Icon = ICONS[l.icon];
                      return (
                        <div
                          className="link-icon"
                          style={{ background: l.bg || ICON_BG[l.icon] || '#888', color: '#fff' }}
                          aria-hidden="true"
                        >
                          {Icon ? <Icon size={20} /> : null}
                        </div>
                      );
                    })()}
                    <div className="link-name">{l.name}</div>
                  </CardComponent>
                </Tilt>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}