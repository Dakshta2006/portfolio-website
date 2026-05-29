import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ mode, setMode }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Increased offset since navbar is at the top
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (id) => {
    if (mode === 'chronicle') {
      setMode('console');
      // Wait for layout update before scrolling
      setTimeout(() => {
        if (id === 'init') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          scrollTo(id);
        }
      }, 100);
    } else {
      if (id === 'init') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollTo(id);
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
      className="navbar-container"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <div className="nav-link" onClick={() => handleNavClick('init')}>INIT</div>
      <div className="nav-link" onClick={() => handleNavClick('education')}>EDU_LOG</div>
      <div className="nav-link" onClick={() => handleNavClick('projects')}>SYS_PROJS</div>
      <div className="nav-link" onClick={() => handleNavClick('skills')}>MODULES</div>
    </motion.nav>
  );
}
