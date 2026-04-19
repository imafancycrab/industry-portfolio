import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PROJECTS } from '../data/content';
import Tilt from 'react-parallax-tilt';

const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
};

const tagClass = { js: 'tag-js', python: 'tag-python', lua: 'tag-lua', ts: 'tag-ts' };

// Function to get time ago string
function timeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

// Function to fetch GitHub repo data
async function fetchRepoData(href) {
  if (!href || href === '#' || !href.includes('github.com')) return null;
  const match = href.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;
  const [, owner, repo] = match;
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) return null;
    const data = await response.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      updated: timeAgo(data.updated_at)
    };
  } catch (error) {
    console.error('Error fetching repo data:', error);
    return null;
  }
}

export default function Projects() {
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    const loadData = async () => {
      const updatedProjects = await Promise.all(
        PROJECTS.map(async (p) => {
          const dynamicData = await fetchRepoData(p.href);
          return dynamicData ? { ...p, ...dynamicData } : p;
        })
      );
      setProjects(updatedProjects);
    };
    loadData();
  }, []);

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <div className="page-wrap">
        <div className="hero">
          <h1 className="hero-title">
            projects<span className="grad-dot">.</span>
          </h1>
          <p className="hero-subtitle">open source work and personal builds.</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((p) => (
            <Tilt
              key={p.name}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.02}
              transitionSpeed={2000}
              style={{ display: 'flex', flexDirection: 'column' }}
              className="project-card-wrapper"
            >
              <a className="project-card" style={{ flex: 1 }} href={p.href} target="_blank" rel="noreferrer">
                <div className="project-header">
                  <div className="project-name">{p.name}</div>
                  <span className={`project-tag ${tagClass[p.tag] || 'tag-other'}`}>{p.tag || 'other'}</span>
                </div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-footer">
                  <span className="project-meta-item">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                    </svg>
                    {p.stars}
                  </span>
                  <span className="project-meta-item">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z" />
                    </svg>
                    {p.forks}
                  </span>
                  <span>Updated {p.updated}</span>
                </div>
              </a>
            </Tilt>
          ))}
        </div>
      </div>
    </motion.div>
  );
}