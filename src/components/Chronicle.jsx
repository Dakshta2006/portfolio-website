import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBookOpen, FaUserShield, FaWrench, FaTrophy,
  FaPlay, FaTerminal, FaProjectDiagram, FaExternalLinkAlt,
  FaServer, FaHeartbeat
} from 'react-icons/fa';
import { SiCplusplus, SiC, SiPython, SiReact, SiMongodb } from 'react-icons/si';

// Helper component for typewriter effect
function Typewriter({ text, delay = 15, onComplete }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <span className="cursor-blink">{displayText}</span>;
}

export default function Chronicle({ initialProjectIdx = 0, setMode }) {
  const [activeProject, setActiveProject] = useState(initialProjectIdx);
  const [showArtifact, setShowArtifact] = useState(null); // 'terminal' | 'xv6-terminal' | 'diagnosis-api' | 'pdf-caching' | null
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [timeoutsList, setTimeoutsList] = useState([]);
  const terminalRef = useRef(null);

  // Reset showArtifact when activeProject changes
  useEffect(() => {
    setShowArtifact(null);
  }, [activeProject]);

  const projects = [
    {
      title: "Project 01: Custom HTTP Server",
      subtitle: "High-Performance TCP Socket Server in C++",
      timeframe: "2024",
      story: "To learn how network transport and request handling work under the hood, I built a concurrent HTTP web server in C++ from scratch using raw socket APIs. Bypassing modern frameworks, I designed my own connection handlers, HTTP request/response parsing logic, and a POSIX thread pool that manages streaming TCP data and routes client requests. This setup handles heavy connection loads efficiently with minimal overhead.",
      milestones: [
        { label: "SOCKET ARCHITECT", desc: "I engineered a concurrent TCP socket server from scratch in C++" },
        { label: "THREAD MULTIPLEXING", desc: "I built a POSIX thread pool to multiplex concurrent connections" },
        { label: "HTTP REQUEST PARSER", desc: "I designed raw zero-copy parser for headers, methods, and payloads" }
      ],
      color: "var(--accent-cyan)",
      glowColorRGB: "0, 240, 255",
      artifact: "terminal"
    },
    {
      title: "Project 02: BufferedReader",
      subtitle: "Full-Stack Magazine Reader & Caching",
      timeframe: "2025 - 2026",
      story: "I co-developed BufferedReader, a comprehensive digital reading portal for our college community. I built a customizable PDF viewer featuring smooth client-side rendering, zoom, and page navigation. To optimize database queries and server latencies, I integrated Redis caching layers, designed MongoDB indexes, and set up React lazy loading, cutting API response times down to under 20ms.",
      milestones: [
        { label: "DIGITAL PORTAL", desc: "I co-built a full-stack React, Express, and MongoDB newsletter platform" },
        { label: "HIGH-SPEED CACHING", desc: "I configured Redis API cache and MongoDB index mappings" },
        { label: "PDF RENDERING ENGINE", desc: "I implemented a responsive custom PDF viewer with page controls" }
      ],
      color: "var(--accent-teal)",
      glowColorRGB: "20, 184, 166",
      artifact: "pdf-caching"
    },
    {
      title: "Project 03: Kernel Multithreading",
      subtitle: "Custom clone/join system calls in xv6 OS",
      timeframe: "2024",
      story: "To study operating system kernels and thread scheduling at a deep level, I modified the MIT xv6 operating system kernel in C. I designed and wrote custom clone() and join() system calls from scratch to establish kernel-level multithreading support. I also implemented a lightweight user-level threading library, managing stack frames, virtual address spaces, and spinlocks to resolve race conditions.",
      milestones: [
        { label: "KERNEL MECHANICS", desc: "I designed and implemented clone() and join() syscalls in the kernel" },
        { label: "USER-SPACE BRIDGE", desc: "I created a thread scheduling library to manage thread frames" },
        { label: "RESOURCE LOCKING", desc: "I protected shared process resources using spinlocks and sleeplocks" }
      ],
      color: "var(--accent-green)",
      glowColorRGB: "57, 255, 20",
      artifact: "xv6-terminal"
    },
    {
      title: "Project 04: The Clinical Core",
      subtitle: "Bayesian Diagnostic Engine & FastAPI",
      timeframe: "2025",
      story: "For a medical database systems project, I engineered a 3-tier clinical decision support system. The core diagnostic engine calculates Bayesian probabilities based on patient symptom profiles and histories to output ranked differential diagnoses. Built using FastAPI and MongoDB Atlas, it executes complex aggregation pipelines to support dynamic schemas and triggers clinical workups for Fever of Unknown Origin (FUO).",
      milestones: [
        { label: "BAYESIAN ENGINE", desc: "I developed probabilistic symptom matching based on disease priors" },
        { label: "API ORCHESTRATION", desc: "I wrote FastAPI endpoints with MongoDB query optimizations" },
        { label: "DYNAMIC AGGREGATION", desc: "I structured aggregation pipelines for clinical triage" }
      ],
      color: "var(--accent-purple)",
      glowColorRGB: "157, 78, 221",
      artifact: "diagnosis-api"
    }
  ];

  // Simulated compilation terminal runs
  const runTerminalSimulation = (type) => {
    if (isCompiling) return;
    setIsCompiling(true);

    // Clear any previous timeouts
    timeoutsList.forEach(clearTimeout);

    let lines = [];

    if (type === 'terminal') {
      setTerminalOutput(["$ g++ -pthread -std=c++17 server.cpp -o server", "Compiling server modules..."]);
      lines = [
        { text: "[OK] Binary compiled successfully. Output size: 1.2MB", delay: 800 },
        { text: "$ ./server --port 8080 --threads 4", delay: 1300 },
        { text: "[SYS] Initializing socket layer on network interface...", delay: 1800 },
        { text: "[SYS] Socket successfully bound to port 8080.", delay: 2200 },
        { text: "[SYS] Initializing POSIX Thread Pool (4 worker threads)...", delay: 2600 },
        { text: "[SYS] Server listening for concurrent TCP connections...", delay: 3000 },
        { text: "[CONN] Client 192.168.1.42:58392 connected.", delay: 3600 },
        { text: "[REQ] Thread 2 handling GET /api/status HTTP/1.1", delay: 4000 },
        { text: "[DB] Querying kernel statistics...", delay: 4300 },
        { text: "[RESP] Thread 2 sent HTTP 200 OK (256 bytes) to client. Closed connection.", delay: 4800 },
        { text: "[CONN] Client 192.168.1.107:58395 connected.", delay: 5300 },
        { text: "[REQ] Thread 1 handling GET /index.html HTTP/1.1", delay: 5600 },
        { text: "[RESP] Thread 1 sent HTTP 200 OK (4.3KB) to client. Closed connection.", delay: 6000 }
      ];
    } else if (type === 'xv6-terminal') {
      setTerminalOutput(["$ make qemu", "Compiling MIT xv6 OS kernel modules in C..."]);
      lines = [
        { text: "gcc -fno-pic -static -fno-builtin -fno-strict-aliasing -Wall -MD -ggdb -m32 -Werror -fno-omit-frame-pointer -fno-stack-protector -c -o proc.o proc.c", delay: 800 },
        { text: "ld -m elf_i386 -N -e main -Ttext 0x100000 -o kernel entry.o bio.o console.o exec.o file.o fs.o ide.o ioapic.o kalloc.o kbd.o lapic.o log.o main.o mp.o picirq.o pipe.o proc.o sleeplock.o spinlock.o string.o swtch.o syscall.o sysfile.o sysproc.o trapasm.o traps.o uart.o vectors.o vm.o", delay: 1500 },
        { text: "[OK] xv6 boot block & kernel image compiled successfully.", delay: 2000 },
        { text: "[SYS] Initializing QEMU emulator console mode...", delay: 2400 },
        { text: "[SYS] cpu0: starting xv6", delay: 2800 },
        { text: "[SYS] cpu1: starting xv6", delay: 3100 },
        { text: "[SYS] Init system initialized. Spawning xv6 shell...", delay: 3500 },
        { text: "xv6-sh$ ./threadtest", delay: 4000 },
        { text: "[TEST] Starting user-level multithreading validation...", delay: 4400 },
        { text: "[TEST] Created thread A (stack: 0x8df000, pid: 4, clone syscall)", delay: 4900 },
        { text: "[TEST] Created thread B (stack: 0x8de000, pid: 5, clone syscall)", delay: 5300 },
        { text: "[TEST] Thread A and B incrementing shared atomic lock variable...", delay: 5800 },
        { text: "[TEST] Thread A completed. Joined via join() syscall.", delay: 6300 },
        { text: "[TEST] Thread B completed. Joined via join() syscall.", delay: 6700 },
        { text: "[OK] Thread test PASSED. Shared variable matches target count (20000).", delay: 7200 },
        { text: "xv6-sh$", delay: 7600 }
      ];
    } else if (type === 'diagnosis-api') {
      setTerminalOutput(["$ uvicorn main:app --reload", "INFO:     Will watch for changes in database layers..."]);
      lines = [
        { text: "INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)", delay: 800 },
        { text: "INFO:     Waiting for application startup.", delay: 1200 },
        { text: "INFO:     Connected to MongoDB Atlas clusters: live_diagnostics", delay: 1600 },
        { text: "INFO:     Application startup complete.", delay: 1900 },
        { text: "$ curl -X POST \"http://127.0.0.1:8000/api/diagnose\" -H \"Content-Type: application/json\" -d '{\"symptoms\": [\"fever\", \"chills\", \"joint_pain\"], \"duration_days\": 4, \"comorbidities\": [\"diabetes\"]}'", delay: 2500 },
        { text: "[API] Processing symptom matrix using Bayesian Decision Engine...", delay: 3000 },
        { text: "[DB] Querying disease priors and sensitivities in MongoDB Atlas...", delay: 3400 },
        { text: "[API] Diagnosis calculation completed in 42ms.", delay: 3800 },
        { text: "[RESP] HTTP 200 OK", delay: 4100 },
        { text: "[RESP] {", delay: 4300 },
        { text: "  \"status\": \"success\",", delay: 4500 },
        { text: "  \"diagnoses\": [", delay: 4700 },
        { text: "    { \"disease\": \"Dengue Fever\", \"probability\": 0.64, \"alert_level\": \"medium\" },", delay: 4900 },
        { text: "    { \"disease\": \"Malaria\", \"probability\": 0.22, \"alert_level\": \"medium\" },", delay: 5100 },
        { text: "    { \"disease\": \"Fever of Unknown Origin (FUO)\", \"probability\": 0.14, \"alert_level\": \"high\" }", delay: 5300 },
        { text: "  ],", delay: 5500 },
        { text: "  \"workup_triggered\": true,", delay: 5700 },
        { text: "  \"recommended_action\": \"Trigger 14-step clinical workup for FUO due to comorbidity risks.\"", delay: 5900 },
        { text: "}", delay: 6100 }
      ];
    } else if (type === 'pdf-caching') {
      setTerminalOutput(["$ npm run build && node server.js", "vite v5.2.0 building for production..."]);
      lines = [
        { text: "✓ 482 modules transformed.", delay: 800 },
        { text: "dist/assets/index-D7b39a2f.css  24.50 kB │ gzip:  5.80 kB", delay: 1200 },
        { text: "dist/assets/index-A3b90f4a.js  142.10 kB │ gzip: 42.20 kB", delay: 1500 },
        { text: "[SYS] BufferedReader frontend bundle completed.", delay: 1800 },
        { text: "[SYS] Starting Express production server...", delay: 2200 },
        { text: "[SYS] BufferedReader Express server listening on port 3000.", delay: 2600 },
        { text: "[DB] Connected to MongoDB database: buffered_reader_db", delay: 3000 },
        { text: "[CACHE] Redis caching initialized. Ready for API requests.", delay: 3400 },
        { text: "[REQ] GET /api/magazines/volume-12/pages/3?zoom=1.5", delay: 3900 },
        { text: "[CACHE] Cache miss for magazine-vol12-p3-z1.5. Querying database...", delay: 4400 },
        { text: "[DB] MongoDB query completed. Speed optimized via index [magazine_id_1_volume_1].", delay: 4900 },
        { text: "[CACHE] Saved page buffer to Redis cache.", delay: 5300 },
        { text: "[RESP] HTTP 200 OK - Sent page PDF stream in 18ms.", delay: 5800 },
        { text: "[REQ] GET /api/magazines/volume-12/pages/3?zoom=1.5", delay: 6300 },
        { text: "[CACHE] Cache hit! Served cached page buffer in 2ms.", delay: 6700 }
      ];
    }

    const newTimeouts = [];
    lines.forEach((line) => {
      const t = setTimeout(() => {
        setTerminalOutput((prev) => [...prev, line.text]);
        if (line.text === lines[lines.length - 1].text) {
          setIsCompiling(false);
        }
      }, line.delay);
      newTimeouts.push(t);
    });
    setTimeoutsList(newTimeouts);
  };

  useEffect(() => {
    if (showArtifact) {
      runTerminalSimulation(showArtifact);
      
      // Auto-scroll to terminal simulation once it is mounted and layout is stable
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 500); // Let the grid animations and height transition finish
    } else {
      setTerminalOutput([]);
      setIsCompiling(false);
      timeoutsList.forEach(clearTimeout);
      setTimeoutsList([]);
    }
    return () => {
      timeoutsList.forEach(clearTimeout);
    };
  }, [showArtifact]);

  const getButtonText = (artType) => {
    switch (artType) {
      case 'terminal':
        return showArtifact === 'terminal' ? 'Close Server Terminal' : 'Inspect Server Connection Log';
      case 'xv6-terminal':
        return showArtifact === 'xv6-terminal' ? 'Close xv6 Shell' : 'Inspect xv6 Thread Test';
      case 'diagnosis-api':
        return showArtifact === 'diagnosis-api' ? 'Close Diagnosis API' : 'Inspect Diagnosis API Response';
      case 'pdf-caching':
        return showArtifact === 'pdf-caching' ? 'Close Caching Log' : 'Inspect Cache Optimizations';
      default:
        return 'Inspect System Artifact';
    }
  };

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            [SYSTEM ARCHIVE : DEV LOGS]
          </span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginTop: '0.5rem', textTransform: 'uppercase' }}>
            Interactive Projects
          </h2>
        </div>
        <button
          onClick={() => {
            if (setMode) setMode('console');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="btn"
          style={{
            border: '1px solid var(--accent-rose)',
            background: 'rgba(244, 63, 94, 0.05)',
            color: 'var(--accent-rose)',
            boxShadow: '0 0 15px rgba(244, 63, 94, 0.1)',
            alignSelf: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-rose)';
            e.currentTarget.style.color = '#020617';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(244, 63, 94, 0.05)';
            e.currentTarget.style.color = 'var(--accent-rose)';
          }}
        >
          &larr; Exit Chronicle Mode
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>

        {/* CHARACTER HUD SHEET */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card card-padding-lg"
          style={{ borderLeft: '4px solid var(--accent-cyan)', background: 'rgba(26, 26, 30, 0.6)' }}
        >
          <div className="hud-grid">
            <div className="hud-stats-container">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)', fontSize: '1.3rem', color: 'var(--accent-cyan)',
                  fontWeight: 'bold', fontFamily: 'JetBrains Mono'
                }}>
                  DW
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Dakshta Wadibhasme</h3>
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--accent-purple)' }}>
                    DEV STATUS: STUDENT & DEVELOPER
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span> FULL STACK & DATABASE SYSTEMS (FastAPI, React, Express)</span>
                  </div>
                  <div className="hud-meter">
                    <div className="hud-meter-fill" style={{ width: '85%', backgroundColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span>SYSTEMS ENGINEERING (C/C++, Kernel, Socket)</span>
                  </div>
                  <div className="hud-meter">
                    <div className="hud-meter-fill" style={{ width: '90%', backgroundColor: 'var(--accent-green)', color: 'var(--accent-green)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span>ALGORITHMIC LOGIC (Codeforces, JEE math)</span>
                  </div>
                  <div className="hud-meter">
                    <div className="hud-meter-fill" style={{ width: '80%', backgroundColor: 'var(--accent-peach)', color: 'var(--accent-peach)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* CHARACTER TOOLKIT INVENTORY */}
            <div className="hud-inventory-container">
              <h4 style={{ fontFamily: 'JetBrains Mono', fontSize: '1rem', color: 'var(--text-primary)', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaUserShield style={{ color: 'var(--accent-cyan)' }} /> CORE TOOLKIT & DEV STACK
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(14, 14, 16, 0.4)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ color: 'var(--accent-green)', display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>[OS / TOOLCHAIN]</span>
                  <span>Linux Terminal & GCC Compiler</span>
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(14, 14, 16, 0.4)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ color: 'var(--accent-cyan)', display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>[API / BACKEND]</span>
                  <span>FastAPI & Node.js</span>
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(14, 14, 16, 0.4)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ color: 'var(--accent-purple)', display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>[DATABASE / CACHE]</span>
                  <span>MongoDB & Redis Caching</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NARRATIVE ADVENTURE INTERFACE */}
        <div className="story-mode-grid">

          {/* LEFT SIDEBAR: PROJECT SELECTOR */}
          <div className="chronicle-selector">
            <h4 style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Select Project
            </h4>
            {projects.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveProject(idx);
                }}
                className={`chronicle-selector-item ${activeProject === idx ? 'active-item' : ''}`}
                style={{
                  '--proj-color': proj.color,
                  '--proj-glow': `rgba(${proj.glowColorRGB}, 0.15)`,
                  '--proj-glow-bg': `rgba(${proj.glowColorRGB}, 0.05)`
                }}
              >
                <div className="chronicle-selector-num">
                  0{idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h5 className="chronicle-selector-title">
                    {proj.title.split(': ')[1]}
                  </h5>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {proj.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT VIEW: STORY LOGS & INTERACTIVE ARTIFACTS */}
          <div style={{ minHeight: '450px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="card card-padding-lg"
                style={{
                  background: 'rgba(26, 26, 30, 0.5)',
                  borderTop: `4px solid ${projects[activeProject].color}`,
                  flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: projects[activeProject].color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {projects[activeProject].title}
                    </span>
                    <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                      {projects[activeProject].subtitle}
                    </h3>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
                    {projects[activeProject].timeframe}
                  </span>
                </div>

                {/* TYPEWRITTEN LOG STORY */}
                <p style={{
                  fontFamily: 'JetBrains Mono', fontSize: '1rem', color: 'var(--text-secondary)',
                  lineHeight: '1.8', minHeight: '120px', whiteSpace: 'pre-wrap'
                }}>
                  <span style={{ color: projects[activeProject].color }}>&gt; </span>
                  <Typewriter text={projects[activeProject].story} />
                </p>

                {/* PROJECT MILESTONES */}
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaTrophy style={{ color: 'var(--accent-peach)' }} /> Key Project Milestones
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {projects[activeProject].milestones.map((mile, mIdx) => (
                      <div
                        key={mIdx}
                        style={{
                          display: 'flex', gap: '1rem', alignItems: 'center',
                          background: 'rgba(14, 14, 16, 0.4)', padding: '0.75rem 1rem',
                          borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.03)'
                        }}
                      >
                        <div style={{
                          width: '12px', height: '12px', borderRadius: '50%',
                          background: projects[activeProject].color,
                          boxShadow: `0 0 8px ${projects[activeProject].color}`
                        }} />
                        <div>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)', display: 'block' }}>
                            {mile.label}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {mile.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CHAPTER ACTION (SHOW CODE TERMINAL / DIAGNOSIS FLOW) */}
                {projects[activeProject].artifact && (
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => setShowArtifact(showArtifact === projects[activeProject].artifact ? null : projects[activeProject].artifact)}
                      className="btn"
                      style={{
                        border: `1px solid ${projects[activeProject].color}`,
                        color: projects[activeProject].color,
                        background: `${projects[activeProject].color}12`
                      }}
                    >
                      <FaTerminal /> {getButtonText(projects[activeProject].artifact)}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* EXPANDED INTERACTIVE ARTIFACT CONTAINER (Full Width, Centered) */}
        <AnimatePresence>
          {showArtifact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: 'hidden', marginTop: '2.5rem', display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              <div className="terminal-window" ref={terminalRef} style={{ width: '100%', maxWidth: '1200px' }}>
                <div className="terminal-header">
                  <div className="terminal-dot" style={{ backgroundColor: '#ff5f56' }} />
                  <div className="terminal-dot" style={{ backgroundColor: '#ffbd2e' }} />
                  <div className="terminal-dot" style={{ backgroundColor: '#27c93f' }} />
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', marginLeft: 'auto' }}>
                    {showArtifact === 'terminal' && 'tcp_concurrency_server.cpp (operator_log)'}
                    {showArtifact === 'xv6-terminal' && 'xv6_kernel_scheduler.c (threadtest)'}
                    {showArtifact === 'diagnosis-api' && 'diagnosis_fastapi_server.py (curl_response)'}
                    {showArtifact === 'pdf-caching' && 'buffered_reader_caching.js (express_redis)'}
                  </span>
                </div>
                <div className="terminal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {terminalOutput.map((outLine, oIdx) => (
                    <div
                      key={oIdx}
                      style={{
                        color: outLine.startsWith('$') ? 'var(--accent-cyan)' :
                          outLine.startsWith('[SYS]') || outLine.startsWith('INFO:') ? 'var(--accent-purple)' :
                            outLine.startsWith('[CONN]') || outLine.startsWith('[REQ]') || outLine.startsWith('[TEST]') || outLine.startsWith('[OK]') ? 'var(--accent-green)' :
                              outLine.startsWith('[RESP]') || outLine.startsWith('[CACHE]') || outLine.startsWith('[DB]') ? 'var(--accent-peach)' : '#c9d1d9',
                        marginBottom: '0.25rem',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '0.85rem'
                      }}
                    >
                      {outLine}
                    </div>
                  ))}
                  {isCompiling && (
                    <div style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: 'var(--accent-cyan)', animation: 'cursor-blink-anim 0.8s steps(2, start) infinite' }} />
                  )}
                  {!isCompiling && (
                    <div style={{ marginTop: '1rem' }}>
                      <button
                        onClick={() => {
                          setTerminalOutput([]);
                          runTerminalSimulation(showArtifact);
                        }}
                        className="btn"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <FaPlay style={{ fontSize: '0.7rem' }} /> Restart Interactive Run
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
