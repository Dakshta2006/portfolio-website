import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaNodeJs, FaHtml5, FaLinux, FaGitAlt, FaDocker, FaServer, FaCode } from 'react-icons/fa';
import { SiCplusplus, SiExpress, SiMongodb, SiJsonwebtokens } from 'react-icons/si';

export default function Skills() {
  const skillsList = [
    { name: "C / C++", icon: <SiCplusplus />, animClass: "anim-wiggle", color: "#00599C" },
    { name: "Python", icon: <FaPython />, animClass: "anim-float", color: "#3776AB" },
    { name: "JavaScript", icon: <FaJs />, animClass: "anim-pulse", color: "#F7DF1E" },
    { name: "HTML/CSS", icon: <FaHtml5 />, animClass: "anim-float", color: "#E34F26" },
    { name: "React.js", icon: <FaReact />, animClass: "anim-spin", color: "#61DAFB" },
    { name: "Node.js", icon: <FaNodeJs />, animClass: "anim-float", color: "#339933" },
    { name: "Express.js", icon: <SiExpress />, animClass: "anim-wiggle", color: "#ffffff" },
    { name: "MongoDB", icon: <SiMongodb />, animClass: "anim-heartbeat", color: "#47A248" },
    { name: "Linux", icon: <FaLinux />, animClass: "anim-float", color: "#FCC624" },
    { name: "Git", icon: <FaGitAlt />, animClass: "anim-wiggle", color: "#F05032" },
    { name: "Docker", icon: <FaDocker />, animClass: "anim-pulse", color: "#2496ED" },
    { name: "REST APIs", icon: <FaServer />, animClass: "anim-float", color: "var(--accent-purple)" },
    { name: "JWT", icon: <SiJsonwebtokens />, animClass: "anim-pulse", color: "#ffffff" },
    { name: "VS Code", icon: <FaCode />, animClass: "anim-wiggle", color: "#007ACC" }
  ];

  // Tripling the list to ensure perfectly seamless scrolling on large displays
  const marqueeSkills = [...skillsList, ...skillsList, ...skillsList];

  return (
    <section className="section" id="skills">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Skills
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        className="skills-marquee-container"
      >
        <div className="skills-marquee-mask">
          <div className="skills-marquee-track">
            {marqueeSkills.map((skill, sIdx) => (
              <div
                key={sIdx}
                title={skill.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  background: 'rgba(14, 14, 16, 0.8)',
                  border: '1px solid rgba(0, 240, 255, 0.15)',
                  borderBottom: '3px solid rgba(0, 240, 255, 0.3)', // Slim mechanical keycap effect
                  borderRadius: '10px',
                  transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px -2px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.05)',
                  flexShrink: 0, // Prevent flex items from shrinking inside marquee
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.borderBottomWidth = '1px';
                  e.currentTarget.style.transform = 'translateY(2px)';
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                  e.currentTarget.style.borderColor = skill.color;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.borderBottomWidth = '3px';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(14, 14, 16, 0.8)';
                  e.currentTarget.style.borderColor = skill.color;
                  e.currentTarget.style.borderBottomColor = skill.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomWidth = '3px';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(14, 14, 16, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)';
                  e.currentTarget.children[0].style.color = skill.color;
                  e.currentTarget.children[0].style.textShadow = 'none';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.children[0].style.color = skill.color;
                  e.currentTarget.children[0].style.textShadow = `0 0 20px ${skill.color}`;
                  e.currentTarget.style.borderColor = skill.color;
                  e.currentTarget.style.borderBottomColor = skill.color;
                }}
              >
                <span 
                  className={skill.animClass} 
                  style={{ 
                    fontSize: '2.2rem', 
                    display: 'flex', 
                    color: skill.color, 
                    transition: 'color 0.3s ease, text-shadow 0.3s ease' 
                  }}
                >
                  {skill.icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
