import React from 'react';
import { motion } from 'framer-motion';

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="section" id="education">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Education
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <motion.div variants={itemVariants} className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>IIT (ISM) Dhanbad</h3>
          <p style={{ fontWeight: '500', marginBottom: '0.5rem', color: 'var(--accent-teal)' }}>Bachelor of Technology in Computer Science (Expected May 2028)</p>
          <p style={{ color: 'var(--text-secondary)' }}>GPA: 9.03 / 10.00</p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
            Relevant Coursework: Data Structures and Algorithms, Operating System, DBMS, Computer Organisation and Architecture.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <motion.div variants={itemVariants} className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Dr. Ambedkar College</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Class XII (Maharashtra State Board) - 94.33%</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Bhavan's B.P. Vidya Mandir</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Class X (C.B.S.E. Board) - 99.20%</p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-peach)' }}>
          <h4 style={{ color: 'var(--accent-peach)', marginBottom: '0.5rem' }}>Key Highlight</h4>
          <p>Qualified JEE Advanced with Rank 3118.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
