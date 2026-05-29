import React from 'react';
import { motion } from 'framer-motion';

export default function Achievements() {
  const achievements = [
    "Specialist on Codeforces (Max rating: 1453).",
    "Scored 99.69 percentile in MHT-CET.",
    "Bharti Airtel Merit-cum-Means Scholarship recipient.",
    "Won the best girls team prize at Obscurathon 1.0 hackathon.",
    "Open source contributor at GSSoC 2026 and SSoC 2026.",
    "Finalist in the National Entrepreneurship Olympiad at high school level.",
    "Represented college at Inter IIT sports and Infinito sports event (Badminton).",
    "1st Winner in College Badminton Tournament."
  ];

  return (
    <section className="section" id="achievements">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Achievements
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card card-padding-lg"
      >
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {achievements.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: '1rem 0',
                borderBottom: index !== achievements.length - 1 ? '1px solid var(--border-color)' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}
            >
              <span style={{ color: 'var(--accent-peach)' }}>•</span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <footer className="footer-container">
        <p>© 2026 Dakshta Wadibhasme.</p>
      </footer>
    </section>
  );
}
