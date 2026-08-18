import React, { useState, useEffect, useRef } from 'react';
import { useTransitionNavigate } from '../App';
import { StickyCard002 } from '../components/StickyCard002';
import { Cpu, Shield, Terminal, ArrowRight, ArrowLeft, Layers } from 'lucide-react';

// Pre-configured projects data mapping to the robot actions & photo stack
const projectsList = [
  {
    id: 'lumiere',
    title: 'Lumière Platform',
    category: 'E-COMMERCE SYSTEM',
    tech: 'React • SQLite • GSAP',
    status: 'DEPLOYED // ACTIVE',
    spec: '01',
    complexity: '94%',
    desc: 'Immersive Dark Walnut & Brass editorial e-commerce platform featuring dynamic searching/filtering, Cart Context, and secure local database instances.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'realstate',
    title: 'RealState Marketplace',
    category: 'FULL-STACK PLATFORM',
    tech: 'Node • Socket.io • Mongo',
    status: 'ONLINE // ACTIVE',
    spec: '02',
    complexity: '88%',
    desc: 'Multi-role property marketplace with JWT authentication, real-time messaging via Socket.io, Cloudinary media storage, and admin dashboards.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'fintrack-pro',
    title: 'FinTrack-Pro Dashboard',
    category: 'SAAS ANALYTICS',
    tech: 'Vanilla JS • Chart.js',
    status: 'OPTIMIZED // VERIFIED',
    spec: '03',
    complexity: '76%',
    desc: 'A comprehensive private personal finance manager tracking budgets, goals, and analytics with LocalStorage data persistence.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'digital-agency',
    title: 'Advanced Digital Agency',
    category: 'MOTION DESIGN PORTAL',
    tech: 'HTML5 • Tailwind • GSAP',
    status: 'COMPLETED // LIVE',
    spec: '04',
    complexity: '82%',
    desc: 'High-performance responsive corporate agency website built with smooth Locomotive scroll mechanics and GSAP hover states.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'luxury-realestate',
    title: 'Luxury Real Estate',
    category: 'PORTFOLIO SITE',
    tech: 'Tailwind CSS • Vanilla JS',
    status: 'LIVE // COMPLETED',
    spec: '05',
    complexity: '68%',
    desc: 'Highly aesthetic motion-based real estate site prioritizing clean animations and high-fidelity product showcase screens.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'iyouglobal',
    title: 'iyouglobal.com',
    category: 'ENTERPRISE PORTAL',
    tech: 'HTML5 • CSS3 • Javascript',
    status: 'LIVE // STABLE',
    spec: '06',
    complexity: '70%',
    desc: 'Live international corporate portal built with fully responsive layout grids, cross-device support, and optimized assets.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop'
  }
];

export default function PortfolioGallery() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [frameIndex, setFrameIndex] = useState(1);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [systemLog, setSystemLog] = useState('SYSTEM INIT: Awaiting instruction...');
  
  const navigate = useTransitionNavigate();
  const screenRef = useRef(null);
  
  // Total frames in the public/Frames folder
  const totalFrames = 147;

  // Handles the frame scrolling sequencing animation
  useEffect(() => {
    setIsSynthesizing(true);
    setSystemLog(`SYNTHESIZING FRAME SYSTEM FOR MODULE ${projectsList[activeProjectIdx].spec}...`);
    
    let currentFrame = 1;
    const interval = setInterval(() => {
      setFrameIndex(currentFrame);
      currentFrame += 2; // skip frames to speed up synthesis velocity
      if (currentFrame >= totalFrames) {
        setFrameIndex(totalFrames);
        clearInterval(interval);
        setIsSynthesizing(false);
        setSystemLog(`MODULE ${projectsList[activeProjectIdx].spec} (${projectsList[activeProjectIdx].title.toUpperCase()}) ACTIVE.`);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [activeProjectIdx]);

  // Construct padded path to frame images
  const padZero = (num) => String(num).padStart(4, '0');
  const activeFrameSrc = `/Frames/frame_${padZero(frameIndex)}.png`;

  const handleNext = () => {
    if (isSynthesizing) return;
    setActiveProjectIdx((prev) => (prev + 1) % projectsList.length);
  };

  const handlePrev = () => {
    if (isSynthesizing) return;
    setActiveProjectIdx((prev) => (prev - 1 + projectsList.length) % projectsList.length);
  };

  const activeProject = projectsList[activeProjectIdx];

  return (
    <div className="bg-[#07080a] min-h-screen text-white font-mono selection:bg-[#a3d4b6] selection:text-[#07080a] relative">
      
      {/* SECTION 1: ROBOT CODE VIDEO TERMINAL INTERFACE (HERO AT TOP) */}
      <div className="min-h-screen flex flex-col justify-between py-12 px-6 relative border-b border-[#a3d4b6]/15">
        
        {/* Subtle Matrix overlay design details */}
        <div className="absolute inset-0 bg-[#07080a] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(163,212,182,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(163,212,182,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
        <div className="absolute inset-0 noise-overlay pointer-events-none z-0"></div>

        {/* 1. BRAND HEADER HUD */}
        <header className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#a3d4b6]/15 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#a3d4b6] animate-pulse"></div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-[0.25em] text-[#a3d4b6]">DEVYANSHU RATHORE</span>
              <span className="text-[9px] text-[#71717a] uppercase tracking-wider">Project Terminal System v4.9</span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[10px] text-[#71717a]">
            <div className="flex items-center gap-2">
              <Cpu size={12} className="text-[#a3d4b6]" />
              <span>CORE STATUS: ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-[#a3d4b6]" />
              <span>SECURE SHELL (SSH)</span>
            </div>
          </div>
        </header>

        {/* 2. DUAL-PANEL SYSTEM TERMINAL VIEWPORT */}
        <main className="relative z-10 w-full max-w-[1600px] mx-auto my-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
          
          {/* LEFT COLUMN: ACTIVE INTERACTIVE VIDEO FRAME VIEWPORT (7 columns) */}
          <section className="lg:col-span-7 w-full flex flex-col items-center justify-center relative">
            <div 
              ref={screenRef}
              className="w-full aspect-video rounded-3xl overflow-hidden border border-[#a3d4b6]/25 bg-black/40 relative flex items-center justify-center shadow-[0_0_50px_rgba(163,212,182,0.05),inset_0_0_40px_rgba(0,0,0,0.8)]"
            >
              {/* Ambient glow inside viewport */}
              <div className="absolute -inset-4 bg-[radial-gradient(circle_at_center,rgba(163,212,182,0.05),transparent)] pointer-events-none"></div>

              {/* Frame Sequence Image */}
              <img 
                src={activeFrameSrc} 
                alt="Robot terminal frame sequence" 
                className="w-full h-full object-cover select-none pointer-events-none mix-blend-screen opacity-90"
              />

              {/* CRT Screen Scanlines */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]"></div>
              
              {/* Viewport UI status elements */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-[#a3d4b6]/10 text-[9px] tracking-widest text-[#a3d4b6]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                <span>RENDER ACTIVE // FRAME {String(frameIndex).padStart(3, '0')}</span>
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/60 px-4 py-2 rounded-lg border border-[#a3d4b6]/10 text-[10px] text-white/90">
                <span className="text-[#a3d4b6] font-bold">DEC:</span>
                <span>{(frameIndex/totalFrames * 100).toFixed(0)}% SYNTHESIZED</span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: DETAILED MODULE DATA & CONTROLS PANEL (5 columns) */}
          <section className="lg:col-span-5 w-full flex flex-col justify-between h-full min-h-[450px]">
            
            {/* Detailed specs HUD */}
            <div className="border border-[#a3d4b6]/20 bg-black/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between flex-1 relative">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#07080a] px-3 text-[10px] text-[#a3d4b6] tracking-widest uppercase">
                MODULE DETAILS
              </div>

              {/* Specs Header */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#71717a] text-[10px] tracking-widest uppercase">
                    SECTION ID: {activeProject.spec}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#a3d4b6]/10 text-[#a3d4b6] text-[9px] tracking-widest font-bold">
                    {activeProject.status}
                  </span>
                </div>

                {/* Large Title */}
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase mb-2">
                  {activeProject.title}
                </h2>
                <span className="text-xs text-[#a3d4b6] tracking-widest uppercase block mb-6 border-b border-[#a3d4b6]/10 pb-4">
                  {activeProject.category} // {activeProject.tech}
                </span>

                {/* Description */}
                <p className="text-xs text-[#a1a1aa] leading-relaxed mb-8">
                  {activeProject.desc}
                </p>
              </div>

              {/* Specs Footer Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#a3d4b6]/10 pt-6">
                <div className="flex flex-col text-left">
                  <span className="text-[#71717a] text-[9px] uppercase tracking-wider mb-1">Architecture Complexity</span>
                  <span className="text-lg font-bold text-white">{activeProject.complexity}</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[#71717a] text-[9px] uppercase tracking-wider mb-1">Deployment Module</span>
                  <span className="text-lg font-bold text-[#a3d4b6] flex items-center gap-1.5 cursor-pointer hover:underline" onClick={() => navigate(`/project/${activeProject.id}`, activeProject.title)}>
                    VERIFY CASE <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrev}
                  disabled={isSynthesizing}
                  className="w-12 h-12 rounded-xl border border-[#a3d4b6]/25 bg-black/40 hover:bg-[#a3d4b6] hover:text-[#07080a] text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40"
                >
                  <ArrowLeft size={18} />
                </button>
                
                <button 
                  onClick={handleNext}
                  disabled={isSynthesizing}
                  className="w-12 h-12 rounded-xl border border-[#a3d4b6]/25 bg-black/40 hover:bg-[#a3d4b6] hover:text-[#07080a] text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="text-[10px] text-right flex flex-col">
                <span className="text-[#71717a] uppercase">ACTIVE VIEWPORT UNIT</span>
                <span className="text-white font-bold">
                  {String(activeProjectIdx + 1).padStart(2, '0')} / {String(projectsList.length).padStart(2, '0')}
                </span>
              </div>
            </div>

          </section>

        </main>

        {/* 3. TERMINAL LOG SYSTEM INPUT FOOTER */}
        <footer className="relative z-10 w-full max-w-[1600px] mx-auto border-t border-[#a3d4b6]/15 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px]">
          <div className="flex items-center gap-3 w-full md:max-w-[70%]">
            <Terminal size={14} className="text-[#a3d4b6] shrink-0" />
            <span className="text-[#71717a] uppercase shrink-0">LOG INPUT:</span>
            <span className="text-white/80 line-clamp-1">{systemLog}</span>
          </div>

          <div className="flex items-center gap-6 text-[#71717a] md:ml-auto">
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-white transition-colors uppercase cursor-pointer"
            >
              ← Back to Terminal Home
            </button>
            <span>//</span>
            <span>DEVYANSHU © 2026</span>
          </div>
        </footer>

      </div>

      {/* SECTION 2: STICKY PHOTO CARDS SCROLL GALLERY (AT THE VERY BOTTOM) */}
      <div className="relative border-t border-[#a3d4b6]/15 bg-[#07080a] z-20">
        
        {/* Title block */}
        <div className="max-w-[1600px] mx-auto px-6 pt-24 mb-6 text-left relative z-30">
          <div className="flex items-center gap-2 text-xs font-mono text-[#a3d4b6] uppercase tracking-widest mb-3">
            <Layers size={14} />
            <span>Visual Gallery Archives</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            PROJECT <span className="text-transparent text-outline">STATIONS</span>
          </h2>
        </div>

        {/* Sticky Stacked Cards Component */}
        <div className="w-full relative z-20">
          <StickyCard002 cards={projectsList} />
        </div>

      </div>

    </div>
  );
}
