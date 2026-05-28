import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HardwareDebris() {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [lightningArcs, setLightningArcs] = useState([]);
  const [sparkParticles, setSparkParticles] = useState([]);

  // Scattered keyboard keys configuration
  const initialKeys = [
    { label: "Esc", top: "12%", left: "8%", size: "48px", color: "var(--accent-rose)", rotate: -15 },
    { label: "Ctrl", top: "72%", left: "5%", size: "52px", color: "var(--accent-purple)", rotate: 12 },
    { label: "Alt", top: "38%", left: "85%", size: "50px", color: "var(--text-secondary)", rotate: -8 },
    { label: "Del", top: "18%", left: "90%", size: "48px", color: "var(--accent-rose)", rotate: 22 },
    { label: "F5", top: "25%", left: "20%", size: "44px", color: "var(--accent-cyan)", rotate: 5 },
    { label: "BUG", top: "60%", left: "88%", size: "54px", color: "var(--accent-green)", rotate: -25 },
    { label: "C++", top: "82%", left: "82%", size: "54px", color: "var(--accent-cyan)", rotate: 18 },
    { label: ";", top: "54%", left: "12%", size: "42px", color: "var(--accent-peach)", rotate: 30 },
    { label: "Err", top: "88%", left: "15%", size: "48px", color: "var(--accent-rose)", rotate: -12 },
    { label: "Enter", top: "48%", left: "78%", size: "62px", color: "var(--accent-teal)", rotate: 10 }
  ];

  // Floating raw code fragments
  const codeFragments = [
    { text: "FATAL: Segmentation fault (core dumped)", top: "16%", left: "15%", color: "rgba(244, 63, 94, 0.45)", speed: 18 },
    { text: "void* ptr = malloc(sizeof(t_block));", top: "42%", left: "3%", color: "rgba(148, 163, 184, 0.35)", speed: 22 },
    { text: "while(1) { fork(); } // KERNEL OVERLOAD", top: "78%", left: "68%", color: "rgba(57, 255, 20, 0.35)", speed: 20 },
    { text: "0x7FFFDEB09CA8 -> NULL pointer deref", top: "52%", left: "84%", color: "rgba(244, 63, 94, 0.4)", speed: 24 },
    { text: "std::move(posix_thread_pool)", top: "88%", left: "42%", color: "rgba(0, 240, 255, 0.35)", speed: 16 }
  ];

  // Helper to generate a zig-zag lightning SVG path
  const generateLightningPath = (x1, y1, x2, y2) => {
    const steps = 4;
    const points = [{ x: x1, y: y1 }];
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      // Inject random offset perpendicular to path vector
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = -dy / len;
      const ny = dx / len;
      const offset = (Math.random() * 16 - 8) * (1 - Math.abs(t - 0.5) * 2);
      
      const px = x1 + dx * t + nx * offset;
      const py = y1 + dy * t + ny * offset;
      points.push({ x: px, y: py });
    }
    points.push({ x: x2, y: y2 });
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  // Trigger spark burst
  const triggerSparkBurst = (x, y, isMinor = false) => {
    const burstId = `${Date.now()}-${Math.random()}`;
    
    // 1. Generate Lightning Arcs
    const newLightning = [];
    const branchCount = isMinor ? 2 : 4;
    for (let i = 0; i < branchCount; i++) {
      const angle = (Math.PI * 2 * i) / branchCount + (Math.random() * 0.8 - 0.4);
      const dist = isMinor ? 20 + Math.random() * 20 : 40 + Math.random() * 50;
      const tx = x + Math.cos(angle) * dist;
      const ty = y + Math.sin(angle) * dist;
      
      const path = generateLightningPath(x, y, tx, ty);
      newLightning.push({
        id: `${burstId}-l-${i}`,
        path,
        color: Math.random() > 0.4 ? 'var(--accent-cyan)' : 'var(--accent-green)'
      });
    }
    
    // 2. Generate Flying Particles
    const newParticles = [];
    const particleCount = isMinor ? 3 : 8;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isMinor ? 1.5 + Math.random() * 3 : 3 + Math.random() * 5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - (isMinor ? 0.5 : 1.5); // upward velocity bias
      
      newParticles.push({
        id: `${burstId}-p-${i}`,
        x,
        y,
        vx,
        vy,
        color: Math.random() > 0.5 ? 'var(--accent-peach)' : 'var(--accent-rose)',
        size: 1.5 + Math.random() * 2
      });
    }
    
    setLightningArcs((prev) => [...prev, ...newLightning]);
    setSparkParticles((prev) => [...prev, ...newParticles]);
    
    // Clean up lightning quickly (flicker flash duration)
    setTimeout(() => {
      setLightningArcs((prev) => prev.filter(l => !l.id.startsWith(burstId)));
    }, 200);
    
    // Clean up particles after they fall off
    setTimeout(() => {
      setSparkParticles((prev) => prev.filter(p => !p.id.startsWith(burstId)));
    }, 700);
  };

  const handleKeyClick = (e, keyLabel) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    
    const messages = [
      "0x00FF", "SIGSEGV", "bug_caught.exe", "STACK_ERR", 
      "Overflow", "dump_core()", "HARDWARE_FAIL", "LOCK_REJECT"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    // Spawn textual click particle
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      text: randomMsg,
      color: keyLabel === "Esc" || keyLabel === "Del" || keyLabel === "Err" ? "var(--accent-rose)" : "var(--accent-cyan)"
    };
    
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter(p => p.id !== newParticle.id));
    }, 1500);

    // Also trigger electrical short-circuit spark locally
    triggerSparkBurst(x, y);
  };

  // Particle Physics tick loop
  useEffect(() => {
    let animFrame;
    const updatePhysics = () => {
      setSparkParticles((prev) => 
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.12, // gravity
          vx: p.vx * 0.97  // drag
        }))
      );
      animFrame = requestAnimationFrame(updatePhysics);
    };
    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Global click listener to trigger spark short-circuits on projects / cards / buttons
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!containerRef.current) return;
      
      const target = e.target;
      // Identify card, button, toggles or other interactives
      const isInteractive = 
        target.closest('.card') || 
        target.closest('.btn') || 
        target.closest('.nav-link') || 
        target.closest('.cyber-toggle') || 
        target.closest('button') || 
        target.closest('a');
      
      if (!isInteractive) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      triggerSparkBurst(x, y);
    };

    window.addEventListener('mousedown', handleGlobalClick);
    return () => window.removeEventListener('mousedown', handleGlobalClick);
  }, []);

  // Periodic wire static spark discharges
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      
      // Randomly trigger background sparks at severed wire tips
      if (Math.random() > 0.5) {
        // Left Wire endpoint (80, 480)
        triggerSparkBurst(80, 480, true);
      } else {
        // Right Wire endpoint (width * 0.915, 680)
        triggerSparkBurst(width * 0.915, 680, true);
      }
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      {/* 1. Dangling Entangled SVG Wires & Severed Ends */}
      <svg 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85
        }}
      >
        <defs>
          <linearGradient id="wireGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.05)" />
          </linearGradient>
          <linearGradient id="wireGradPurple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(157, 78, 221, 0.35)" />
            <stop offset="100%" stopColor="rgba(244, 63, 94, 0.05)" />
          </linearGradient>
          <linearGradient id="wireGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(244, 63, 94, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 162, 91, 0.05)" />
          </linearGradient>
          <linearGradient id="wireGradBrokenLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(244, 63, 94, 0.35)" />
            <stop offset="100%" stopColor="rgba(244, 63, 94, 0.7)" />
          </linearGradient>
          <linearGradient id="wireGradBrokenRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(0, 240, 255, 0.7)" />
          </linearGradient>
        </defs>

        {/* Wire 1: Top Left drape */}
        <path 
          d="M -10,100 C 150,120 180,480 30,620 C -20,680 80,850 150,900" 
          fill="none" 
          stroke="url(#wireGradCyan)" 
          strokeWidth="2" 
        />
        <path 
          d="M -10,100 C 150,120 180,480 30,620 C -20,680 80,850 150,900" 
          fill="none" 
          stroke="var(--accent-cyan)" 
          strokeWidth="2" 
          strokeDasharray="20 150" 
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dashoffset" values="0; -340" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Wire 2: Top Right entangled loops */}
        <path 
          d="M 105%,50 C 85%,120 70%,50 62%,220 C 58%,350 92%,420 85%,550 C 80%,650 98%,720 102%,850" 
          fill="none" 
          stroke="url(#wireGradPurple)" 
          strokeWidth="2.5" 
        />
        <path 
          d="M 105%,50 C 85%,120 70%,50 62%,220 C 58%,350 92%,420 85%,550 C 80%,650 98%,720 102%,850" 
          fill="none" 
          stroke="var(--accent-rose)" 
          strokeWidth="2.5" 
          strokeDasharray="25 200" 
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dashoffset" values="0; -450" dur="6s" repeatCount="indefinite" />
        </path>

        {/* Wire 3: Crossing bottom diagonal */}
        <path 
          d="M -50,1100 C 350,950 480,1350 950,1200" 
          fill="none" 
          stroke="url(#wireGradRed)" 
          strokeWidth="1.5" 
        />
        <path 
          d="M -50,1100 C 350,950 480,1350 950,1200" 
          fill="none" 
          stroke="var(--accent-peach)" 
          strokeWidth="1.5" 
          strokeDasharray="15 120" 
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dashoffset" values="0; -270" dur="5s" repeatCount="indefinite" />
        </path>

        {/* --- SEVERED / BROKEN SHORT-CIRCUITING WIRES --- */}
        
        {/* Broken Wire 1: Hanging from top left, ending abruptly */}
        <path 
          d="M -10,320 C 120,360 140,280 80,480" 
          fill="none" 
          stroke="url(#wireGradBrokenLeft)" 
          strokeWidth="2" 
        />
        {/* Exposed copper core tip */}
        <line x1="80" y1="480" x2="83" y2="485" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="480" x2="81" y2="483" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Spark glow point */}
        <circle cx="83" cy="485" r="4" fill="var(--accent-rose)" opacity="0.8" style={{ filter: 'drop-shadow(0 0 6px var(--accent-rose))' }}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;5;3" dur="0.8s" repeatCount="indefinite" />
        </circle>

        {/* Broken Wire 2: Hanging from right wall, ending abruptly */}
        <path 
          d="M 105%,580 C 95%,600 88%,580 91.5%,680" 
          fill="none" 
          stroke="url(#wireGradBrokenRight)" 
          strokeWidth="2.5" 
        />
        {/* Exposed core tip */}
        <line x1="91.5%" y1="680" x2="91.2%" y2="685" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="91.5%" y1="680" x2="91.3%" y2="683" stroke="#f59e0b" strokeWidth="1.8" />
        {/* Spark glow point */}
        <circle cx="91.2%" cy="685" r="4" fill="var(--accent-cyan)" opacity="0.8" style={{ filter: 'drop-shadow(0 0 6px var(--accent-cyan))' }}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.1s" repeatCount="indefinite" />
          <animate attributeName="r" values="3.5;5;3.5" dur="1.1s" repeatCount="indefinite" />
        </circle>

        {/* Decorative thin background wires */}
        <path d="M 0,250 C 180,300 240,150 120,400" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        <path d="M 90%,400 C 72%,520 80%,680 95%,700" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        
        {/* Render procedurally generated lightning arcs */}
        {lightningArcs.map((arc) => (
          <path
            key={arc.id}
            d={arc.path}
            fill="none"
            stroke={arc.color}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.95"
            style={{ filter: `drop-shadow(0 0 6px ${arc.color})` }}
          />
        ))}
      </svg>

      {/* Render physics-based flying spark particles */}
      <svg 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 98
        }}
      >
        {sparkParticles.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill={p.color}
            opacity="0.9"
            style={{ filter: `drop-shadow(0 0 4px ${p.color})` }}
          />
        ))}
      </svg>

      {/* 2. Floating Entangled Code Fragments */}
      {codeFragments.map((frag, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            top: frag.top,
            left: frag.left,
            color: frag.color,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            textShadow: `0 0 8px ${frag.color}`
          }}
          animate={{
            x: [0, 8, -8, 0],
            y: [0, -12, 12, 0],
          }}
          transition={{
            duration: frag.speed,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {frag.text}
        </motion.div>
      ))}

      {/* 3. Interactive Draggable Keyboard Keycaps */}
      {initialKeys.map((key, idx) => (
        <motion.div
          key={idx}
          drag
          dragConstraints={{ 
            left: -30, 
            right: window.innerWidth * 0.9, 
            top: -30, 
            bottom: window.innerHeight * 1.5 
          }}
          whileDrag={{ 
            scale: 1.15, 
            rotate: key.rotate + 15,
            cursor: 'grabbing',
            boxShadow: `0 15px 30px rgba(0,0,0,0.5), 0 0 15px ${key.color}44`
          }}
          whileHover={{ 
            scale: 1.08,
            boxShadow: `0 8px 20px rgba(0,0,0,0.4), 0 0 10px ${key.color}33`
          }}
          style={{
            position: 'absolute',
            top: key.top,
            left: key.left,
            width: key.size,
            height: key.size,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #222226 0%, #161619 100%)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            borderBottom: `4px solid rgba(0, 0, 0, 0.85)`,
            borderRight: `2px solid rgba(0, 0, 0, 0.5)`,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: key.label.length > 2 ? '0.7rem' : '0.85rem',
            fontWeight: '800',
            color: 'var(--text-secondary)',
            borderColor: `${key.color}22`,
            cursor: 'grab',
            userSelect: 'none',
            rotate: key.rotate,
            pointerEvents: 'auto',
            zIndex: 10
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.borderBottomWidth = '1px';
            e.currentTarget.style.transform = 'translateY(3px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.borderBottomWidth = '4px';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onClick={(e) => handleKeyClick(e, key.label)}
        >
          <span style={{ 
            color: key.color, 
            opacity: 0.85,
            textShadow: `0 0 6px ${key.color}33`
          }}>
            {key.label}
          </span>
        </motion.div>
      ))}

      {/* 4. Click Glitch Text particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
            animate={{ 
              opacity: 0, 
              scale: 1.25, 
              y: p.y - 60,
              x: p.x + (Math.random() * 40 - 20)
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              color: p.color,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              textShadow: `0 0 8px ${p.color}`,
              pointerEvents: 'none',
              zIndex: 99
            }}
          >
            {p.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
