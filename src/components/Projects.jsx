import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaServer, FaTerminal, FaHeartbeat,
  FaBookOpen, FaPython, FaReact, FaNodeJs
} from 'react-icons/fa';
import { SiCplusplus, SiC, SiMongodb, SiExpress } from 'react-icons/si';

export default function Projects({ setMode, setActiveProjectIdx }) {
  const projects = [
    {
      id: "SYS-01",
      category: "systems",
      status: "[OPERATIONAL]",
      complexity: "COMPLEXITY: HIGH",
      title: "Custom HTTP Server",
      mainIcon: <FaServer />,
      color: "var(--accent-cyan)",
      glowColorRGB: "0, 240, 255",
      techBadges: [
        { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
        { name: "Socket API", icon: <FaTerminal />, color: "var(--accent-cyan)" },
        { name: "POSIX Threads", icon: <FaServer />, color: "var(--accent-purple)" }
      ],
      description: "I engineered a high-performance, multi-threaded web server in C++ using native Socket APIs. Bypassing modern frameworks allowed me to directly handle socket listeners, parse raw request streams, and manage a POSIX thread pool to process concurrent TCP connections.",
      link: "https://github.com/Dakshta2006/Multithreaded-Server"
    },
    {
      id: "APP-02",
      category: "fullstack",
      status: "[ONLINE]",
      complexity: "COMPLEXITY: MED",
      title: "BufferedReader",
      mainIcon: <FaBookOpen />,
      color: "var(--accent-teal)",
      glowColorRGB: "20, 184, 166",
      techBadges: [
        { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express.js", icon: <SiExpress />, color: "#ffffff" },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" }
      ],
      description: "I co-developed a full-stack digital reading portal for our college community. I built a customizable PDF viewer featuring zoom and pagination, and optimized API response times using MongoDB index designs and server-side caching.",
      link: "https://github.com/Dakshta2006/BufferedReader"
    },
    {
      id: "KERN-03",
      category: "systems",
      status: "[STABLE]",
      complexity: "COMPLEXITY: CRITICAL",
      title: "Kernel Multithreading",
      mainIcon: <FaTerminal />,
      color: "var(--accent-green)",
      glowColorRGB: "57, 255, 20",
      techBadges: [
        { name: "C", icon: <SiC />, color: "#A8B9CC" },
        { name: "xv6 OS", icon: <FaTerminal />, color: "var(--accent-green)" },
        { name: "Syscalls", icon: <FaServer />, color: "var(--accent-peach)" }
      ],
      description: "I implemented kernel-level multithreading inside the xv6 operating system in C. I designed custom clone and join system calls to bridge user-space threads with kernel-space thread schedules, managing virtual memory allocation and locks.",
      link: "https://github.com/Davidvivek/OS_Projects_G5"
    },
    {
      id: "AI-04",
      category: "fullstack",
      status: "[OPERATIONAL]",
      complexity: "COMPLEXITY: MED",
      title: "Fever-Based Diagnosis System",
      mainIcon: <FaHeartbeat />,
      color: "var(--accent-purple)",
      glowColorRGB: "157, 78, 221",
      techBadges: [
        { name: "Python", icon: <FaPython />, color: "#3776AB" },
        { name: "FastAPI", icon: <FaServer />, color: "#009688" },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" }
      ],
      description: "I designed a 3-tier clinical decision support system utilizing FastAPI and MongoDB. The system runs Bayesian probability calculations on symptom patterns to output ranked differential diagnoses, helping triage patients efficiently.",
      link: "https://github.com/Dakshta2006/DBMS-M8"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handleInspectProject = (index) => {
    if (setActiveProjectIdx) {
      setActiveProjectIdx(index);
    }
    if (setMode) {
      setMode('chronicle');
    }
  };

  // Map projects with their original indices before filtering
  const projectsWithIndex = projects.map((p, idx) => ({ ...p, originalIndex: idx }));
  const filteredProjects = projectsWithIndex.filter(project =>
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section className="section" id="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title"
          style={{ marginBottom: 0 }}
        >
          Projects
        </motion.h2>

        <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700 }}>
          [PORTFOLIO ARCHIVE : SYSTEM INDEX]
        </span>
      </div>

      {/* Category filter tabs */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '2rem' }}>
        <div className="filter-tabs-container">
          {['all', 'systems', 'fullstack'].map((category) => {
            const isActive = activeFilter === category;
            const labels = {
              all: 'SYS.ALL()',
              systems: 'SYS.LOW_LEVEL()',
              fullstack: 'SYS.FULL_STACK()'
            };
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-tab ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'var(--accent-cyan)',
                      borderRadius: '6px',
                      zIndex: -1,
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.25)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {labels[category]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects dynamic grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isHovered = hoveredIdx === project.originalIndex;
              const isAnyHovered = hoveredIdx !== null;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: isAnyHovered && !isHovered ? 0.35 : 1,
                    scale: isHovered ? 1.02 : 1,
                    filter: isAnyHovered && !isHovered ? 'blur(1px) grayscale(20%)' : 'none'
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                  key={project.title}
                  className="project-card-wrapper"
                  onMouseEnter={() => setHoveredIdx(project.originalIndex)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div
                    className="project-card"
                    style={{
                      borderColor: isHovered ? project.color : 'var(--border-color)',
                      borderBottom: `3px solid ${isHovered ? project.color : `rgba(${project.glowColorRGB}, 0.3)`}`,
                      boxShadow: isHovered
                        ? `0 10px 30px rgba(${project.glowColorRGB}, 0.25), 0 0 15px rgba(${project.glowColorRGB}, 0.15)`
                        : '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {/* Card Header Status Indicator */}
                    <div className="card-terminal-header">
                      <span>ID: {project.id}</span>
                      <span>{project.complexity}</span>
                      <span style={{ color: project.color, fontWeight: 700 }}>{project.status}</span>
                    </div>

                    <div className="card-terminal-body">
                      {/* Top Row: Icon + Github Link */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '10px',
                          background: `rgba(${project.glowColorRGB}, 0.1)`,
                          border: `1px solid rgba(${project.glowColorRGB}, 0.3)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          color: project.color,
                          boxShadow: `0 0 15px rgba(${project.glowColorRGB}, 0.1)`
                        }}>
                          {project.mainIcon}
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.3rem',
                            transition: 'color 0.2s',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = project.color}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                          <FaGithub />
                        </a>
                      </div>

                      {/* Title & Badges */}
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', letterSpacing: '-0.02em' }}>
                        {project.title}
                      </h3>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                        {project.techBadges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            style={{
                              fontFamily: 'JetBrains Mono',
                              fontSize: '0.7rem',
                              fontWeight: 500,
                              background: 'rgba(14, 14, 16, 0.6)',
                              color: 'var(--text-secondary)',
                              border: '1px solid rgba(255, 255, 255, 0.05)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}
                          >
                            <span style={{ display: 'flex', color: badge.color }}>{badge.icon}</span>
                            {badge.name}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        marginBottom: '1.5rem',
                        flexGrow: 1
                      }}>
                        {project.description}
                      </p>

                      {/* Open Chronicle Button */}
                      <button
                        onClick={() => handleInspectProject(project.originalIndex)}
                        className="btn"
                        style={{
                          alignSelf: 'flex-start',
                          padding: '0.4rem 0.9rem',
                          fontSize: '0.8rem',
                          border: `1px solid rgba(${project.glowColorRGB}, 0.5)`,
                          background: `rgba(${project.glowColorRGB}, 0.05)`,
                          color: project.color
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = project.color;
                          e.currentTarget.style.color = '#020617';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `rgba(${project.glowColorRGB}, 0.05)`;
                          e.currentTarget.style.color = project.color;
                        }}
                      >
                        Inspect Project Logs &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Button to view overall Chronicle Mode */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <button
          onClick={() => {
            if (setMode) setMode('chronicle');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="btn"
          style={{
            border: '1px solid var(--accent-cyan)',
            background: 'rgba(0, 240, 255, 0.05)',
            color: 'var(--accent-cyan)',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.1)'
          }}
        >
          Initialize Interactive Project Console &rarr;
        </button>
      </div>
    </section>
  );
}
