import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroCanvas from '../components/HeroCanvas';
import EditorialServices from '../components/EditorialServices';
import PortfolioShowcase from '../components/PortfolioShowcase';
import TechStackOrbit from '../components/TechStackOrbit';
import ContactFinale from '../components/ContactFinale';
import StatCounter from '../components/StatCounter';
import { revealSection } from '../utils/scrollReveal';
import { MOTION, getReducedMotion } from '../utils/motionSystem';

gsap.registerPlugin(ScrollTrigger);

export default function Home({ onOpenContact }) {
  const mainRef = useRef(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    // Remove preload class
    document.body.classList.remove('preload');

    const isReduced = getReducedMotion();

    const ctx = gsap.context(() => {
      // 1. Initialize ScrollTrigger-based section reveals
      revealSection('#hero-section');
      revealSection('#hud-capabilities-section');
      revealSection('#achievements-section');

      // 2. Navbar load animation
      gsap.fromTo('#main-nav', 
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: MOTION.easing.entry, delay: 0.1 }
      );

      if (!isReduced) {
        // 3. About Section: Sticky Card Zoom
        const aboutWrapper = main.querySelector('.about-cinematic-wrapper');
        const aboutCard = main.querySelector('.about-card');
        if (aboutWrapper && aboutCard) {
          gsap.set(aboutCard, { transformOrigin: "center center" });
          
          const cardEntryTl = gsap.timeline({
            scrollTrigger: {
              trigger: aboutWrapper,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
              onUpdate: (self) => {
                if (self.progress >= 0.99) aboutCard.style.overflowY = "auto";
                else aboutCard.style.overflowY = "hidden";
              }
            }
          });

          cardEntryTl.fromTo(aboutCard, 
            { scale: 0.7, y: 60, opacity: 0, borderRadius: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", filter: "blur(6px)" },
            { scale: 0.88, y: 15, opacity: 0.85, duration: 0.6, ease: "power2.out" }
          ).to(aboutCard, { 
            scale: 1, 
            y: 0, 
            opacity: 1, 
            borderRadius: "32px", 
            boxShadow: "0 50px 140px rgba(0,0,0,0.6)", 
            filter: "blur(0px)", 
            duration: 0.8, 
            ease: MOTION.easing.entry 
          });
        }

        // 4. About Section: 3 Items Stagger Reveal
        const aboutItems = ['.item-01', '.item-02', '.item-03'];
        gsap.set(aboutItems, { opacity: 0, scale: 0.9, y: 20, transformOrigin: "center center" });
        gsap.to(aboutItems, {
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: 0.7, 
          ease: "power3.out", 
          stagger: { each: 0.2, from: "start" },
          scrollTrigger: { 
            trigger: "#about-section", 
            start: "top 70%", 
            end: "bottom 20%", 
            scrub: MOTION.scrub 
          }
        });

        // 5. Achievements Horizontal Track Scroll (Desktop >= 1024px)
        const achSection = main.querySelector('#achievements-section');
        const achTrack = main.querySelector('.achievement-track');
        if (achSection && achTrack) {
          let mm = gsap.matchMedia();
          mm.add("(min-width: 1024px)", () => {
            const getScrollDistance = () => Math.max(0, achTrack.scrollWidth - achTrack.parentElement.offsetWidth + 80);
            gsap.to(achTrack, {
              x: () => -getScrollDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: achSection,
                start: "top top",
                end: () => `+=${getScrollDistance()}`,
                pin: true,
                scrub: MOTION.scrub,
                invalidateOnRefresh: true,
              }
            });
          });
        }
      }

      // Refresh ScrollTrigger calculations
      setTimeout(() => { ScrollTrigger.refresh(); }, 200);

    }, main);

    const handleResize = () => { ScrollTrigger.refresh(); };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={mainRef}>
      {/* LAYER 1: Hero Canvas Frame Sequence */}
      <HeroCanvas />

      {/* Main Layout Container */}
      <main id="scroll-container" className="relative z-10 w-full" role="main">
        
        {/* ========================================================================= */}
        {/* ACT 1: Hero Section                                                       */}
        {/* ========================================================================= */}
        <section 
          id="hero-section" 
          className="min-h-[100dvh] w-full flex flex-col justify-between items-center pt-[18vh] sm:pt-[22vh] pb-8 relative z-10"
        >
          {/* Subtle Ambient Decorative Lines (Aria Hidden) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-[15%] left-0 w-[25vw] h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-[15%] right-0 w-[25vw] h-[1px] bg-gradient-to-l from-white/10 to-transparent"></div>
            <div className="absolute top-[15%] md:top-[18%] left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 opacity-70 hidden sm:flex">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#a1a1aa]">AI-Driven Systems</span>
              <div className="w-[3px] h-[3px] rounded-full bg-[#a3d4b6]"></div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#a1a1aa]">Real-Time Intelligence</span>
              <div className="w-[3px] h-[3px] rounded-full bg-[#a3d4b6]"></div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#a1a1aa]">Precision Automation</span>
            </div>
          </div>

          {/* Central Headline */}
          <div className="w-full text-center px-4 sm:px-6 z-20" data-reveal="1">
            <h1 
              className="uppercase font-extrabold text-white/90 mix-blend-overlay leading-[0.95] tracking-tight mx-auto break-words"
              style={{ fontSize: 'clamp(28px, 7.5vw, 88px)', textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
            >
              DEVYANSHU.<br />
              FRONTEND-ENGINEER.
            </h1>
          </div>

          {/* Intro Description & CTA Row */}
          <div 
            className="w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start mt-[4vh] md:mt-[6vh] z-20 gap-8 md:gap-0" 
            data-reveal="2"
          >
            <div className="w-full max-w-[360px] text-center md:text-left">
              <p className="text-[14px] sm:text-[15px] text-[#a1a1aa] leading-[1.6] drop-shadow-md font-medium">
                Frontend-focused developer and computer science student crafting high-performance, animation-rich web applications with modern architecture.
              </p>
              <div className="mt-4">
                <button 
                  onClick={onOpenContact} 
                  className="inline-block bg-[#a3d4b6] text-[#07080a] px-8 py-3.5 rounded-full text-[13px] uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(163,212,182,0.25)] hover:bg-white transition-all cursor-pointer"
                >
                  Let's Connect
                </button>
              </div>
            </div>

            <div className="flex-1 hidden md:block"></div>

            <div className="w-full max-w-[360px] text-center md:text-right">
              <p className="text-[14px] sm:text-[15px] text-[#a1a1aa] leading-[1.6] drop-shadow-md font-medium">
                Specialized in responsive interactive interfaces, full-stack JavaScript integration, and hardware-accelerated motion design.
              </p>
              <div className="mt-4">
                <a 
                  href="#editorial-services" 
                  className="inline-block border border-white/20 bg-white/[0.05] backdrop-blur-md text-[#f4f4f5] px-8 py-3.5 rounded-full text-[13px] uppercase tracking-wider font-bold hover:bg-[#a3d4b6] hover:text-[#07080a] hover:border-[#a3d4b6] transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center flex flex-col items-center gap-3 opacity-70 z-20 mt-auto pb-4" data-reveal="3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#a1a1aa] font-bold">Scroll to explore</span>
            <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-[#a3d4b6] to-transparent animate-pulse"></div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 2: Capabilities Section                                              */}
        {/* ========================================================================= */}
        <section 
          id="hud-capabilities-section" 
          className="min-h-[100dvh] w-full flex flex-col justify-between pt-[6vh] pb-[8vh] relative z-10 overflow-hidden"
        >
          {/* Subtle Ambient Radial Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:w-[50vw] h-[50vh] bg-[#a3d4b6] opacity-[0.02] blur-[120px] rounded-full pointer-events-none -z-20"></div>
          
          <div className="flex flex-col items-center gap-3 opacity-80 pointer-events-none z-10 pt-4" data-reveal="1">
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-[#a3d4b6] to-transparent animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#a3d4b6] font-bold drop-shadow-md">Core Capabilities</span>
          </div>

          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-center flex-1 gap-12 lg:gap-8 relative z-20 my-10">
            {/* Pillar 1: Frontend Architecture */}
            <div 
              className="w-full lg:w-[46%] glass-card p-6 md:p-8 rounded-[24px] text-left relative bg-white/[0.03] backdrop-blur-[14px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)]" 
              data-reveal="2"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#a3d4b6] font-bold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Architecture
                </span>
                <span className="text-white/40 font-mono text-sm">01</span>
              </div>
              
              <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-3 tracking-tight">
                Modern Frontend Systems
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#a1a1aa] leading-[1.6] mb-5 font-medium">
                Architecting component-driven, responsive React interfaces with Vite pipelines, Tailwind styling, and resilient state machines.
              </p>
              <ul className="text-[13px] text-[#71717a] space-y-2 mb-2">
                <li className="flex items-center gap-2"><span className="text-[#a3d4b6] font-bold">✓</span> Reusable React 19 Component Systems</li>
                <li className="flex items-center gap-2"><span className="text-[#a3d4b6] font-bold">✓</span> Tailwind CSS Design Token Pipelines</li>
                <li className="flex items-center gap-2"><span className="text-[#a3d4b6] font-bold">✓</span> Full-Stack JavaScript & REST APIs</li>
              </ul>
            </div>

            {/* Pillar 2: Motion Design */}
            <div 
              className="w-full lg:w-[46%] glass-card p-6 md:p-8 rounded-[24px] text-left relative bg-white/[0.03] backdrop-blur-[14px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)]" 
              data-reveal="3"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#a3d4b6] font-bold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Animation
                </span>
                <span className="text-white/40 font-mono text-sm">02</span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[36px] md:text-[44px] font-black text-white leading-none tracking-tighter">60fps</span>
                <span className="text-[13px] md:text-[14px] text-[#a3d4b6] font-semibold tracking-wide">Hardware Accelerated</span>
              </div>
              
              <p className="text-[14px] md:text-[15px] text-[#a1a1aa] leading-[1.6] mb-5 font-medium">
                Creating immersive, film-like web experiences using GSAP ScrollTrigger, canvas frame streams, and fluid micro-interactions.
              </p>
              <ul className="text-[13px] text-[#71717a] space-y-2 mb-2">
                <li className="flex items-center gap-2"><span className="text-[#a3d4b6] font-bold">✓</span> Scroll-Driven Pinned Timelines</li>
                <li className="flex items-center gap-2"><span className="text-[#a3d4b6] font-bold">✓</span> Canvas Frame Sequence Streaming</li>
                <li className="flex items-center gap-2"><span className="text-[#a3d4b6] font-bold">✓</span> Accessible Reduced-Motion Modes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Marquee Banner                                                           */}
        {/* ========================================================================= */}
        <section className="marquee-wrapper w-full h-[70px] md:h-[100px] bg-[#07080a] border-t border-b border-white/5 flex items-center relative z-20 isolate overflow-hidden" aria-hidden="true">
          <div className="marquee-container flex whitespace-nowrap">
            <div className="flex items-center gap-[30px] md:gap-[50px] pr-[30px] md:pr-[50px] text-[#f4f4f5]/60 text-[24px] md:text-[36px] font-black tracking-[0.1em] uppercase shrink-0">
              <span>REACT.JS •</span>
              <span>GSAP MOTION •</span>
              <span>TAILWIND CSS •</span>
              <span>NODE.JS •</span>
              <span>CANVAS ANIMATION •</span>
              <span>UI/UX DESIGN •</span>
            </div>
            <div className="flex items-center gap-[30px] md:gap-[50px] pr-[30px] md:pr-[50px] text-[#f4f4f5]/60 text-[24px] md:text-[36px] font-black tracking-[0.1em] uppercase shrink-0">
              <span>REACT.JS •</span>
              <span>GSAP MOTION •</span>
              <span>TAILWIND CSS •</span>
              <span>NODE.JS •</span>
              <span>CANVAS ANIMATION •</span>
              <span>UI/UX DESIGN •</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 3: Editorial Services (Horizontal Scroll)                            */}
        {/* ========================================================================= */}
        <EditorialServices />

        {/* ========================================================================= */}
        {/* ACT 4: About Section (Sticky Card Zoom)                                   */}
        {/* ========================================================================= */}
        <section 
          id="about-section" 
          className="about-cinematic-wrapper w-full relative bg-[#07080a] h-[260dvh] z-20 border-t border-white/5 isolate"
        >
          <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center z-10 px-4 md:px-8 overflow-hidden">
            <div className="about-card w-[min(1400px,94vw)] h-[85dvh] lg:h-[90dvh] bg-[#0a0d12] border border-white/10 rounded-[32px] p-[30px_20px] md:p-[60px_60px] relative flex flex-col will-change-transform transform-gpu isolate mx-auto overflow-y-auto lg:overflow-visible no-scrollbar shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="inline-block text-[#a3d4b6] font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase mb-2">
                    About Me
                  </span>
                  <h2 className="text-[clamp(26px,4vw,48px)] font-black text-white leading-tight">
                    Engineering <span className="text-[#a3d4b6]">Philosophy & Focus</span>
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center font-serif text-[#a3d4b6] text-lg">
                    DR
                  </div>
                </div>
              </div>

              {/* 3 Profile Focus Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full mt-4 relative z-10 flex-1 content-center">
                
                {/* Item 1 */}
                <div className="item-01 flex flex-col items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-[clamp(40px,5vw,70px)] font-black text-[#a3d4b6]/30 leading-none tracking-tighter">01</div>
                  <div>
                    <h3 className="text-[20px] font-bold text-white mb-2">Frontend Engineering</h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-[1.6]">
                      Building scalable, accessible, and high-performance web platforms using modern frameworks like React, Vite, and Next.js.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="item-02 flex flex-col items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-[clamp(40px,5vw,70px)] font-black text-[#a3d4b6]/30 leading-none tracking-tighter">02</div>
                  <div>
                    <h3 className="text-[20px] font-bold text-white mb-2">Full-Stack Capability</h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-[1.6]">
                      Developing secure REST APIs, clean database schemas, and robust backend integrations with Node.js, Express, and MongoDB.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="item-03 flex flex-col items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-[clamp(40px,5vw,70px)] font-black text-[#a3d4b6]/30 leading-none tracking-tighter">03</div>
                  <div>
                    <h3 className="text-[20px] font-bold text-white mb-2">Cinematic Motion UI</h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-[1.6]">
                      Crafting luxury, editorial, and interactive motion systems using GSAP ScrollTrigger, canvas, and CSS 3D transforms.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 5: Portfolio Showcase Deck                                            */}
        {/* ========================================================================= */}
        <PortfolioShowcase />

        {/* ========================================================================= */}
        {/* ACT 6: Technology Stack 3D Orbit                                         */}
        {/* ========================================================================= */}
        <TechStackOrbit />

        {/* ========================================================================= */}
        {/* ACT 7: Achievements & Recognitions (4 Cards Horizontal Track)            */}
        {/* ========================================================================= */}
        <section 
          id="achievements-section" 
          className="w-full relative flex flex-col lg:flex-row overflow-hidden text-white border-t border-white/[0.05] bg-[#07080a] z-[30] isolate"
        >
          <div className="absolute inset-0 bg-[#07080a] z-[-1] pointer-events-none"></div>
          <div className="absolute inset-0 noise-overlay pointer-events-none z-[5]"></div>
          
          <div className="h-auto lg:h-[100dvh] w-full lg:sticky top-0 flex flex-col lg:flex-row items-center pt-20 pb-12 lg:py-0 relative">

            {/* Left Panel */}
            <div className="w-full lg:w-[38%] px-6 md:px-12 lg:pl-[8vw] lg:pr-12 flex flex-col justify-center h-full mb-8 lg:mb-0 relative z-[20]">
              <div className="achievement-text-anim relative z-10">
                <span className="inline-block text-[#a3d4b6] font-bold text-[10px] lg:text-[11px] tracking-[0.2em] uppercase mb-4 opacity-80" data-reveal="1">
                  Achievements
                </span>
                <h2 className="relative inline-block text-[clamp(32px,5vw,56px)] font-[900] text-white leading-[1.05] tracking-tight mb-4 lg:mb-6 pb-3" data-reveal="2">
                  Exhibits &<br />Recognitions
                  <span className="h2-underline absolute left-0 bottom-0 w-full h-[3px] bg-[#a3d4b6] scale-x-0 origin-left"></span>
                </h2>
                <p className="text-[15px] lg:text-[16px] text-[#a1a1aa] max-w-[400px] leading-[1.6] mb-6 font-medium" data-reveal="3">
                  Selected accomplishments, creative engineering milestones, and exploratory software projects.
                </p>
              </div>
            </div>

            {/* Right Panel: Horizontal Track with 4 Cards */}
            <div className="w-full lg:w-[62%] h-auto lg:h-[80vh] flex items-center overflow-hidden relative z-[10] mt-4 lg:mt-0">
              <div 
                className="achievement-track flex gap-6 lg:gap-8 px-6 lg:px-[4vw] w-max items-center h-full no-scrollbar pb-4 lg:pb-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none" 
                style={{ WebkitOverflowScrolling: 'touch' }} 
                data-reveal="4"
              >
                {/* Card 1: NeuroVerse */}
                <div 
                  className="achievement-card group relative flex-shrink-0 w-[85vw] sm:w-[460px] h-[60vh] sm:h-[420px] lg:h-[75vh] rounded-[28px] overflow-hidden bg-[#0d1117] border border-white/10 cursor-default snap-center"
                  tabIndex={0}
                  role="article"
                  aria-label="NeuroVerse — Exploring Machine Intelligence"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" 
                    alt="NeuroVerse machine intelligence showcase" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] brightness-90 group-hover:brightness-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 bg-[#a3d4b6]/10 text-[#a3d4b6] border border-[#a3d4b6]/30 rounded-full text-[10px] uppercase tracking-widest font-bold mb-3 w-max">
                      Project Showcase
                    </span>
                    <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-2 group-hover:text-[#a3d4b6] transition-colors">
                      NeuroVerse
                    </h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-[1.6]">
                      A deep exploration of cognitive structures, machine intelligence, and interactive representation built with WebGL and React.
                    </p>
                  </div>
                </div>

                {/* Card 2: CineFrame Portfolio */}
                <div 
                  className="achievement-card group relative flex-shrink-0 w-[85vw] sm:w-[460px] h-[60vh] sm:h-[420px] lg:h-[75vh] rounded-[28px] overflow-hidden bg-[#0d1117] border border-white/10 cursor-default snap-center"
                  tabIndex={0}
                  role="article"
                  aria-label="CineFrame Portfolio — Cinematic Web Experience"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" 
                    alt="CineFrame Portfolio setup" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] brightness-90 group-hover:brightness-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 bg-[#a3d4b6]/10 text-[#a3d4b6] border border-[#a3d4b6]/30 rounded-full text-[10px] uppercase tracking-widest font-bold mb-3 w-max">
                      Web Experience
                    </span>
                    <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-2 group-hover:text-[#a3d4b6] transition-colors">
                      CineFrame Portfolio
                    </h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-[1.6]">
                      A cinematic, scroll-driven portfolio website built with React, GSAP ScrollTrigger, and 147-frame canvas animation.
                    </p>
                  </div>
                </div>

                {/* Card 3: DataFlow Analytics */}
                <div 
                  className="achievement-card group relative flex-shrink-0 w-[85vw] sm:w-[460px] h-[60vh] sm:h-[420px] lg:h-[75vh] rounded-[28px] overflow-hidden bg-[#0d1117] border border-white/10 cursor-default snap-center"
                  tabIndex={0}
                  role="article"
                  aria-label="DataFlow Analytics — Full-Stack Platform"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" 
                    alt="DataFlow Analytics dashboard" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] brightness-90 group-hover:brightness-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 bg-[#a3d4b6]/10 text-[#a3d4b6] border border-[#a3d4b6]/30 rounded-full text-[10px] uppercase tracking-widest font-bold mb-3 w-max">
                      Full-Stack App
                    </span>
                    <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-2 group-hover:text-[#a3d4b6] transition-colors">
                      DataFlow Analytics
                    </h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-[1.6]">
                      Real-time telemetry dashboard with interactive data visualization, built using React, Node.js, Express, and MongoDB.
                    </p>
                  </div>
                </div>

                {/* Card 4: Open Source Contributions */}
                <div 
                  className="achievement-card group relative flex-shrink-0 w-[85vw] sm:w-[460px] h-[60vh] sm:h-[420px] lg:h-[75vh] rounded-[28px] overflow-hidden bg-[#0d1117] border border-white/10 cursor-default snap-center"
                  tabIndex={0}
                  role="article"
                  aria-label="Open Source Contributions — Community"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                    alt="Open source collaborative team" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] brightness-90 group-hover:brightness-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20 flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 bg-[#a3d4b6]/10 text-[#a3d4b6] border border-[#a3d4b6]/30 rounded-full text-[10px] uppercase tracking-widest font-bold mb-3 w-max">
                      Community
                    </span>
                    <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-2 group-hover:text-[#a3d4b6] transition-colors">
                      Open Source
                    </h3>
                    <p className="text-[14px] text-[#a1a1aa] leading-[1.6]">
                      Active developer contributing to open-source frontend components, animation toolkits, and developer documentation.
                    </p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-[4vw] lg:w-[8vw] h-full flex-shrink-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Statistics Bar                                                           */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#07080a] py-16 border-t border-b border-white/5 relative z-30">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-[#a3d4b6]">
                <StatCounter target={15} suffix="+" />
              </div>
              <span className="block text-[11px] text-[#71717a] uppercase tracking-[0.15em] font-bold mt-2">
                Projects Completed
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-[#a3d4b6]">
                <StatCounter target={10} suffix="+" />
              </div>
              <span className="block text-[11px] text-[#71717a] uppercase tracking-[0.15em] font-bold mt-2">
                Technologies Applied
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl font-black text-[#a3d4b6]">
                <StatCounter target={18} suffix="+" />
              </div>
              <span className="block text-[11px] text-[#71717a] uppercase tracking-[0.15em] font-bold mt-2">
                Months of Experience
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 8: Contact Finale                                                    */}
        {/* ========================================================================= */}
        <ContactFinale />

      </main>
    </div>
  );
}
