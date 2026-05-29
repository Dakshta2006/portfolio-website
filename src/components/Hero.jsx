import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Hero({ setMode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="section" id="init" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-container"
      >
        <div className="hero-content">
          <motion.div variants={itemVariants} style={{ fontFamily: 'JetBrains Mono', fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
            <span style={{ color: 'var(--accent-green)', textShadow: '0 0 8px rgba(57, 255, 20, 0.4)' }}>[ONLINE]</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-title">
            DAKSHTA<br />
            <span style={{ color: 'var(--accent-cyan)', textShadow: '0 0 15px rgba(157, 78, 221, 0.2)' }}>WADIBHASME</span>
          </motion.h1>

          <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '550px', marginBottom: '3rem', fontFamily: 'JetBrains Mono' }}>
            {">"} Processing at IIT (ISM) Dhanbad.<br />
            {">"} Passionate about web development, high-performance low-level computing and intelligent AI pipelines.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons">
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href="https://github.com/Dakshta2006" target="_blank" rel="noreferrer" style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--accent-cyan)'}>
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/dakshta-wadibhasme-b0a21a325/" target="_blank" rel="noreferrer" style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--accent-cyan)'}>
                <FaLinkedin />
              </a>
              <a href="mailto:dakshtawadibhasme@gmail.com" style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)', display: 'flex' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--accent-cyan)'}>
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="hero-graphic-container">
          {/* Quantum / Computer Science Graphic */}
          <div className="hero-graphic">
            {/* Profile Avatar Core */}
            <img src="/profilepic.jpg" alt="Profile" className="hero-avatar" />

            {/* Glowing Rings to simulate quantum orbits */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                border: '2px solid var(--accent-cyan)', borderRadius: '50%',
                borderTopColor: 'transparent', borderBottomColor: 'transparent',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              style={{
                position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%',
                border: '2px solid var(--accent-purple)', borderRadius: '50%',
                borderLeftColor: 'transparent', borderRightColor: 'transparent',
                boxShadow: '0 0 20px rgba(157, 78, 221, 0.2)'
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
