import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Chronicle from './components/Chronicle';
import HardwareDebris from './components/HardwareDebris';

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('portfolio-mode') || 'console';
  });
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  useEffect(() => {
    localStorage.setItem('portfolio-mode', mode);
  }, [mode]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <div className="bg-grid"></div>
      <div className="vignette"></div>
      {mode !== 'chronicle' && <HardwareDebris />}
      {mode !== 'chronicle' && <Navbar mode={mode} setMode={setMode} />}
      <main className="container" style={{ 
        paddingTop: mode === 'chronicle' ? '2.5rem' : '0',
        maxWidth: mode === 'chronicle' ? '1200px' : '1000px',
        transition: 'max-width 0.4s ease'
      }}>
        {mode === 'chronicle' ? (
          <Chronicle initialProjectIdx={activeProjectIdx} setMode={setMode} />
        ) : (
          <>
            <Hero setMode={setMode} />
            <Education />
            <Projects setMode={setMode} setActiveProjectIdx={setActiveProjectIdx} />
            <Skills />
            <Achievements />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
