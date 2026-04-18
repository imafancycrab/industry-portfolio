import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hub from './pages/Hub';
import Portfolio from './pages/Portfolio'; // UNCOMMENTED
import Projects from './pages/Projects'; // UNCOMMENTED

export default function App() {
  const location = useLocation();

  useEffect(() => {
    let frameId = null;
    let targetY = window.scrollY;
    const ease = 0.14;

    const animateScroll = () => {
      const currentY = window.scrollY;
      const delta = targetY - currentY;
      const nextY = currentY + delta * ease;

      window.scrollTo(0, nextY);
      if (Math.abs(delta) > 0.5) {
        frameId = requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetY);
        frameId = null;
      }
    };

    const onWheel = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      event.preventDefault();
      targetY += event.deltaY * 1.5;
      targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));
      if (!frameId) {
        frameId = requestAnimationFrame(animateScroll);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel, { passive: false });
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="app-main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Hub />} />
            <Route path="/studio" element={<Portfolio />} /> {/* UNCOMMENTED */}
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects" element={<Projects />} /> {/* UNCOMMENTED */}
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}