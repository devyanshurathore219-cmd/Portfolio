import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Comprehensive tech data with categories, colored icons, and in-depth "What it means" explanations
const techData = [
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Core Language',
    level: 'Advanced',
    proficiency: 95,
    count: 10,
    ring: 'inner',
    angle: 0,
    color: '#F7DF1E',
    bgColor: 'rgba(247, 223, 30, 0.1)',
    borderColor: 'rgba(247, 223, 30, 0.3)',
    meaning: 'The fundamental programming language of the modern web ecosystem.',
    usage: 'I use JavaScript to write modular application logic, asynchronous data pipelines, event-driven reactive state, and complex browser DOM manipulation.',
    highlights: ['Async/Await & Promises', 'Functional & OOP Patterns', 'DOM & Canvas APIs']
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'Frontend Framework',
    level: 'Advanced',
    proficiency: 95,
    count: 8,
    ring: 'inner',
    angle: 120,
    color: '#61DAFB',
    bgColor: 'rgba(97, 218, 251, 0.1)',
    borderColor: 'rgba(97, 218, 251, 0.3)',
    meaning: 'A declarative, component-driven UI library for building responsive web apps.',
    usage: 'I leverage React for building scalable component design systems, custom state hooks, context architecture, and virtual DOM optimization.',
    highlights: ['Custom Hooks & Context', 'Concurrent Rendering', 'Component Design Systems']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS v4',
    category: 'Styling & Design Tokens',
    level: 'Advanced',
    proficiency: 92,
    count: 8,
    ring: 'inner',
    angle: 240,
    color: '#38BDF8',
    bgColor: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    meaning: 'A utility-first CSS framework designed for custom responsive design systems.',
    usage: 'I implement design tokens, custom glassmorphism layers, fluid typography, dark mode palettes, and zero-runtime CSS bundles.',
    highlights: ['CSS Theme Tokens', 'Responsive Grid/Flexbox', 'Custom Glass Utilities']
  },
  {
    id: 'gsap',
    name: 'GSAP & ScrollTrigger',
    category: 'Motion Engine',
    level: 'Advanced',
    proficiency: 90,
    count: 6,
    ring: 'middle',
    angle: 0,
    color: '#88CE02',
    bgColor: 'rgba(136, 206, 2, 0.1)',
    borderColor: 'rgba(136, 206, 2, 0.3)',
    meaning: 'The industry-standard JavaScript animation and timeline library.',
    usage: 'I build frame-synced canvas scrubbing, pinned horizontal scroll sections, 3D card tilt transformations, and fluid scene transitions.',
    highlights: ['Pinned Scroll Timelines', 'Canvas Frame Scrubbing', 'Hardware-Accelerated 60fps']
  },
  {
    id: 'vite',
    name: 'Vite 8',
    category: 'Build Tool & Bundler',
    level: 'Advanced',
    proficiency: 90,
    count: 7,
    ring: 'middle',
    angle: 120,
    color: '#BD34FE',
    bgColor: 'rgba(189, 52, 254, 0.1)',
    borderColor: 'rgba(189, 52, 254, 0.3)',
    meaning: 'Next-generation frontend tooling with native ESM and blazing fast HMR.',
    usage: 'I configure Vite for instant hot module replacement, optimized chunk splitting, modern asset pipelines, and production builds.',
    highlights: ['Instant Dev Server HMR', 'Optimized Rollup Chunking', 'Asset Pipeline Config']
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend Runtime',
    level: 'Proficient',
    proficiency: 85,
    count: 4,
    ring: 'middle',
    angle: 240,
    color: '#68A063',
    bgColor: 'rgba(104, 160, 99, 0.1)',
    borderColor: 'rgba(104, 160, 99, 0.3)',
    meaning: 'A JavaScript runtime environment built on Chrome V8 engine.',
    usage: 'I architect asynchronous backend services, REST API endpoints, JWT authentication flows, and file streaming microservices.',
    highlights: ['RESTful API Design', 'JWT Authentication', 'Event-Driven I/O']
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Server Framework',
    level: 'Proficient',
    proficiency: 85,
    count: 4,
    ring: 'outer',
    angle: 0,
    color: '#E0E0E0',
    bgColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    meaning: 'A fast, unopinionated, minimalist web framework for Node.js.',
    usage: 'I use Express to structure modular route controllers, secure CORS middleware, request validation layers, and database connectors.',
    highlights: ['Middleware Pipelines', 'Secure Routing', 'Error Handling Architecture']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database System',
    level: 'Familiar',
    proficiency: 80,
    count: 3,
    ring: 'outer',
    angle: 180,
    color: '#47A248',
    bgColor: 'rgba(71, 162, 72, 0.1)',
    borderColor: 'rgba(71, 162, 72, 0.3)',
    meaning: 'A NoSQL document-oriented database with flexible schema design.',
    usage: 'I design document models with Mongoose, aggregate data pipelines, create indexing strategies, and persist user & listing data.',
    highlights: ['Mongoose Data Modeling', 'Aggregation Queries', 'Cloud Atlas Clustering']
  }
];

// Clean vector SVG icons for every technology
const TechIcon = ({ id, className = "w-5 h-5" }) => {
  switch (id) {
    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M7 17.5c.5.8 1.3 1.3 2.3 1.3 1.3 0 2.1-.7 2.1-2.4V9h-2v7.4c0 .7-.3 1-1 1-.4 0-.8-.2-1-.5l-.4.6zm6.8-.2c.7.9 1.8 1.5 3.1 1.5 2 0 3.2-1.1 3.2-2.7 0-1.6-1-2.2-2.6-2.9l-.7-.3c-1-.4-1.5-.7-1.5-1.4 0-.7.6-1.2 1.6-1.2.9 0 1.6.4 2 .9l1.1-1.3c-.7-.8-1.7-1.2-3.1-1.2-2.1 0-3.3 1.2-3.3 2.7 0 1.5 1 2.2 2.5 2.8l.8.3c1 .4 1.6.8 1.6 1.5 0 .8-.7 1.3-1.8 1.3-1.2 0-2-.5-2.5-1.4l-.9.7z" fill="#000000" />
        </svg>
      );
    case 'react':
      return (
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#38BDF8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case 'gsap':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#88CE02" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="#07080a" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="1.5" fill="#07080a" />
        </svg>
      );
    case 'vite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M21.5 4.5l-9.2 16.2c-.3.5-1 .5-1.3 0L2.5 4.5c-.3-.6.1-1.3.8-1.3h17.4c.7 0 1.1.7.8 1.3z" fill="url(#viteGrad1)" />
          <path d="M14.5 3l-6.5 12 3-1-1.5 6.5 7-11-3.5.5 1.5-7z" fill="url(#viteGrad2)" />
          <defs>
            <linearGradient id="viteGrad1" x1="2" y1="3" x2="22" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
            <linearGradient id="viteGrad2" x1="8" y1="3" x2="15" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEA83" />
              <stop offset="0.5" stopColor="#FFDD35" />
              <stop offset="1" stopColor="#FFA800" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'nodejs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#68A063">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
          <path d="M12 6.5l5 2.9v5.8l-5 2.9-5-2.9V9.4l5-2.9z" fill="#68A063" fillOpacity="0.3" />
        </svg>
      );
    case 'express':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M8 8h8v2H10v2h5v2h-5v2h8v2H8V8z" fill="#FFFFFF" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C12 2 6 8.5 6 14.5c0 3.3 2.7 6 6 6s6-2.7 6-6C18 8.5 12 2 12 2z" fill="#47A248" />
          <path d="M12 2v18.5c0-.5 1-1.5 1.5-2.5 1-2 1.5-4 1.5-5.5 0-3.5-3-8.5-3-8.5z" fill="#3FA037" />
          <path d="M12 20.5c-.3 0-.6.2-.8.5-.2.3-.2.7-.2 1 0 1 .5 1.8 1 2 .5-.2 1-1 1-2 0-.3 0-.7-.2-1-.2-.3-.5-.5-.8-.5z" fill="#A6A6A6" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="2" />
        </svg>
      );
  }
};

const ringConfig = {
  inner: { radius: 155, duration: 32 },
  middle: { radius: 265, duration: 52 },
  outer: { radius: 375, duration: 74 },
};

const TechStackOrbit = () => {
  const containerRef = useRef(null);
  const orbitGroupRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState(techData[0]); // Default to first for rich inspector
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const animationsRef = useRef([]);

  const currentDisplayTech = hoveredTech || selectedTech || techData[0];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    if (mediaQuery.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animationsRef.current.forEach(anim => anim.play());
          } else {
            animationsRef.current.forEach(anim => anim.pause());
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isReducedMotion || !orbitGroupRef.current) return;

    let ctx = gsap.context(() => {
      animationsRef.current.forEach(anim => anim.kill());
      animationsRef.current = [];

      Object.keys(ringConfig).forEach(ringName => {
        const ringElement = document.querySelector(`.ring-${ringName}`);
        const billboards = document.querySelectorAll(`.billboard-${ringName}`);
        
        if (ringElement && billboards.length) {
          // Orbit rotation
          const orbitAnim = gsap.to(ringElement, {
            rotationZ: 360,
            duration: ringConfig[ringName].duration,
            repeat: -1,
            ease: "none"
          });
          
          // Counter-rotation to keep chips upright facing user
          const billboardAnim = gsap.to(billboards, {
            rotationZ: -360,
            duration: ringConfig[ringName].duration,
            repeat: -1,
            ease: "none"
          });

          animationsRef.current.push(orbitAnim, billboardAnim);
        }
      });
    }, orbitGroupRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const handleMouseEnter = (tech) => {
    setHoveredTech(tech);
    animationsRef.current.forEach(anim => anim.pause());
  };

  const handleMouseLeave = () => {
    setHoveredTech(null);
    animationsRef.current.forEach(anim => anim.play());
  };

  const handleClickTech = (tech) => {
    setSelectedTech(tech);
  };

  const filteredTechs = activeTab === 'all' 
    ? techData 
    : activeTab === 'frontend' 
      ? techData.filter(t => ['javascript', 'react', 'tailwind', 'gsap'].includes(t.id))
      : techData.filter(t => ['nodejs', 'express', 'mongodb', 'vite'].includes(t.id));

  return (
    <section 
      id="tech-stack-section"
      ref={containerRef} 
      className="relative w-full bg-[#07080a] text-white py-20 lg:py-28 overflow-hidden isolate border-t border-white/5"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[900px] h-[500px] bg-[#a3d4b6]/[0.025] blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute inset-0 noise-overlay pointer-events-none z-0"></div>

      {/* Header & Description */}
      <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10 mb-12 lg:mb-16">
        <span className="inline-block text-[#a3d4b6] font-bold text-[11px] tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full bg-[#a3d4b6]/10 border border-[#a3d4b6]/20">
          Core Competencies & Stack
        </span>
        <h2 
          className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Technology & Languages
        </h2>
        <p className="text-[15px] md:text-[16px] text-[#a1a1aa] max-w-[640px] mx-auto leading-relaxed">
          Interactive orbital view of programming languages, modern frameworks, animation engines, and backend technologies I master. Hover or tap any node to inspect what it means and how I apply it.
        </p>
      </div>

      {/* 3D Orbit Viewport */}
      {!isReducedMotion ? (
        <div className="relative w-full h-[620px] md:h-[720px] flex items-center justify-center overflow-hidden z-10 my-4">
          
          {/* Orbit System Container with 3D Tilt */}
          <div 
            className="relative w-full h-full max-w-[900px] flex items-center justify-center transform scale-[0.62] sm:scale-75 md:scale-90 lg:scale-100 transition-transform duration-500"
            style={{ perspective: '1100px' }}
            ref={orbitGroupRef}
          >
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg)' }}
            >
              {/* Center Monogram Hub */}
              <div 
                className="absolute z-20 text-[#f4f4f5] text-5xl md:text-6xl tracking-widest bg-[#0a0d12]/90 backdrop-blur-xl border border-white/20 rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(163,212,182,0.2),inset_0_0_20px_rgba(255,255,255,0.05)] cursor-default select-none group"
                style={{ transform: 'rotateX(-58deg)', fontFamily: "'Instrument Serif', serif" }}
              >
                <span className="group-hover:text-[#a3d4b6] transition-colors">DR</span>
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#a1a1aa] uppercase -mt-1">ENGINE</span>
              </div>

              {/* Concentric Orbital Rings */}
              {Object.keys(ringConfig).map(ringName => {
                const { radius } = ringConfig[ringName];
                const ringTechs = techData.filter(t => t.ring === ringName);
                
                return (
                  <div 
                    key={ringName}
                    className={`ring-${ringName} absolute w-0 h-0 flex items-center justify-center`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Ring track */}
                    <div 
                      className="absolute rounded-full border border-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.015)] pointer-events-none"
                      style={{ width: radius * 2, height: radius * 2 }}
                    />

                    {/* Orbit Tech Chips with Icons */}
                    {ringTechs.map((tech) => {
                      const rad = (tech.angle * Math.PI) / 180;
                      const x = Math.cos(rad) * radius;
                      const y = Math.sin(rad) * radius;
                      const isHovered = (hoveredTech?.id === tech.id) || (selectedTech?.id === tech.id);

                      return (
                        <div
                          key={tech.id}
                          className="absolute flex items-center justify-center"
                          style={{ 
                            transform: `translate(${x}px, ${y}px)`,
                            transformStyle: 'preserve-3d' 
                          }}
                        >
                          <button
                            className={`billboard-${ringName} absolute flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg select-none group focus:outline-none focus:ring-2 focus:ring-[#a3d4b6] ${
                              isHovered 
                                ? 'scale-110 shadow-[0_0_30px_rgba(163,212,182,0.35)]' 
                                : 'hover:scale-105'
                            }`}
                            style={{ 
                              transform: 'rotateX(-58deg)',
                              backgroundColor: isHovered ? 'rgba(13, 17, 23, 0.95)' : 'rgba(10, 13, 18, 0.85)',
                              borderColor: isHovered ? tech.color : 'rgba(255, 255, 255, 0.12)',
                              borderWidth: '1px'
                            }}
                            onMouseEnter={() => handleMouseEnter(tech)}
                            onMouseLeave={handleMouseLeave}
                            onFocus={() => handleMouseEnter(tech)}
                            onBlur={handleMouseLeave}
                            onClick={() => handleClickTech(tech)}
                            aria-label={`${tech.name}, ${tech.category}, ${tech.level}`}
                          >
                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                              <TechIcon id={tech.id} className="w-5 h-5" />
                            </div>
                            <span 
                              className="text-xs font-bold tracking-wide whitespace-nowrap"
                              style={{ color: isHovered ? tech.color : '#f4f4f5' }}
                            >
                              {tech.name}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* Interactive Technology Meaning & Detail Card                              */}
      {/* ========================================================================= */}
      <div className="max-w-[1000px] mx-auto px-6 relative z-20 mt-4">
        <div 
          className="w-full bg-[#0a0d12]/95 backdrop-blur-xl border rounded-[28px] p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] transition-all duration-500 relative overflow-hidden"
          style={{ borderColor: currentDisplayTech.borderColor || 'rgba(163, 212, 182, 0.2)' }}
        >
          {/* Subtle colored accent glow behind card */}
          <div 
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[90px] pointer-events-none opacity-20 transition-all duration-700"
            style={{ backgroundColor: currentDisplayTech.color }}
          ></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Title & Icon Header */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center p-3 border shadow-inner transition-colors duration-300"
                style={{ 
                  backgroundColor: currentDisplayTech.bgColor,
                  borderColor: currentDisplayTech.borderColor 
                }}
              >
                <TechIcon id={currentDisplayTech.id} className="w-9 h-9" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-[#a1a1aa]">
                    {currentDisplayTech.category}
                  </span>
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                    style={{ 
                      color: currentDisplayTech.color,
                      backgroundColor: currentDisplayTech.bgColor,
                      borderColor: currentDisplayTech.borderColor 
                    }}
                  >
                    {currentDisplayTech.level}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {currentDisplayTech.name}
                </h3>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
              <div className="text-left md:text-right">
                <span className="text-[10px] text-[#71717a] uppercase tracking-wider block font-medium">Proficiency</span>
                <span className="text-lg md:text-xl font-black text-white">{currentDisplayTech.proficiency}%</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10"></div>
              <div className="text-left md:text-right">
                <span className="text-[10px] text-[#71717a] uppercase tracking-wider block font-medium">Applied In</span>
                <span className="text-lg md:text-xl font-black text-[#a3d4b6]">{currentDisplayTech.count}+ Projects</span>
              </div>
            </div>
          </div>

          {/* Description / What It Means & How Devyanshu Uses It */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-8">
            <div className="md:col-span-6 space-y-2">
              <span className="text-[11px] font-bold text-[#a3d4b6] uppercase tracking-[0.15em] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3d4b6]"></span>
                What this technology means
              </span>
              <p className="text-[14px] md:text-[15px] text-[#e4e4e7] leading-relaxed">
                {currentDisplayTech.meaning}
              </p>
            </div>
            
            <div className="md:col-span-6 space-y-2">
              <span className="text-[11px] font-bold text-[#a3d4b6] uppercase tracking-[0.15em] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3d4b6]"></span>
                How I apply it in engineering
              </span>
              <p className="text-[14px] md:text-[15px] text-[#a1a1aa] leading-relaxed">
                {currentDisplayTech.usage}
              </p>
            </div>
          </div>

          {/* Key Architecture Highlights */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
            <span className="text-[11px] text-[#71717a] uppercase tracking-widest font-semibold mr-2">
              Key Capabilities:
            </span>
            {currentDisplayTech.highlights?.map((item, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-medium text-[#f4f4f5] flex items-center gap-1.5 shadow-sm"
              >
                <span className="text-[#a3d4b6] font-bold">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Quick Select Filter Tabs & Chip Grid                                     */}
      {/* ========================================================================= */}
      <div className="max-w-[1200px] mx-auto px-6 mt-16 text-center relative z-20">
        
        {/* Tab switcher */}
        <div className="inline-flex items-center p-1 bg-white/[0.03] border border-white/10 rounded-full mb-8">
          <button 
            onClick={() => setActiveTab('all')} 
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'all' ? 'bg-[#a3d4b6] text-[#07080a] shadow-md' : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            All Tech ({techData.length})
          </button>
          <button 
            onClick={() => setActiveTab('frontend')} 
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'frontend' ? 'bg-[#a3d4b6] text-[#07080a] shadow-md' : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Frontend & Motion
          </button>
          <button 
            onClick={() => setActiveTab('backend')} 
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'backend' ? 'bg-[#a3d4b6] text-[#07080a] shadow-md' : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Backend & Tooling
          </button>
        </div>

        {/* Quick Grid View for easy tap / selection */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {filteredTechs.map(tech => {
            const isCurrent = (currentDisplayTech.id === tech.id);
            return (
              <div 
                key={tech.id}
                onClick={() => handleClickTech(tech)}
                onMouseEnter={() => handleMouseEnter(tech)}
                onMouseLeave={handleMouseLeave}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isCurrent 
                    ? 'bg-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.4)]' 
                    : 'bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
                style={{ 
                  borderColor: isCurrent ? tech.color : 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center p-2 border"
                    style={{ backgroundColor: tech.bgColor, borderColor: tech.borderColor }}
                  >
                    <TechIcon id={tech.id} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#a1a1aa]">{tech.proficiency}%</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#a3d4b6] transition-colors">{tech.name}</h4>
                  <span className="text-[11px] text-[#71717a] block mt-0.5 line-clamp-1">{tech.category}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default TechStackOrbit;
