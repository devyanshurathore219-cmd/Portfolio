import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { revealSection } from '../utils/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

const syncData = {
  default: { 
    label: "SERVICES", 
    heading: "What I Do<br/>Differently", 
    desc: "I craft high-performance digital ecosystems designed for scalability, precision, and long-term growth. Every solution is engineered with intent, not guesswork.",
    points: ["Scalable architecture built for future growth", "User-first design systems with conversion focus", "Performance-driven development approach"],
    techs: []
  },
  webdev: { 
    label: "Development", 
    heading: "Web Development", 
    desc: "I build scalable, high-performance web platforms engineered for speed, precision, and growth.",
    points: ["Scalable architecture built for future growth", "User-first design systems with conversion focus", "Performance-driven development approach"],
    techs: ["React", "Vite", "Next.js", "Node.js"]
  },
  uiux: { 
    label: "Design", 
    heading: "UI/UX Design", 
    desc: "I design intuitive, conversion-focused interfaces that elevate user experience and engagement.",
    points: ["Data-driven user journey mapping", "Conversion-optimized interface layouts", "Inclusive and accessible design systems"],
    techs: ["Figma", "Tailwind", "CSS3", "Framer"]
  },
  analytics: { 
    label: "Analytics", 
    heading: "Data Analytics", 
    desc: "Transform raw data into actionable insights with intelligent dashboards and real-time systems.",
    points: ["Real-time data visualization dashboards", "Predictive machine learning models", "Actionable business intelligence reporting"],
    techs: ["Python", "MongoDB", "Chart.js"]
  },
  optimization: { 
    label: "Performance", 
    heading: "Optimization", 
    desc: "I optimize speed, scalability, and efficiency to deliver seamless digital performance.",
    points: ["Core Web Vitals performance tuning", "Server-side caching and delivery", "Asset compression and lazy loading"],
    techs: ["Lighthouse", "Webpack", "Vite", "CDN"]
  }
};

export default function EditorialServices() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [activeService, setActiveService] = useState('default');
  const [sectionActive, setSectionActive] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(syncData.default);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentServiceRef = useRef('default');
  const activeServiceRef = useRef('default');
  const hoveredServiceRef = useRef(null);

  const updateActiveService = (serviceId) => {
    if (serviceId === activeServiceRef.current) return;
    activeServiceRef.current = serviceId;
    setActiveService(serviceId);
  };

  // Sync left-panel content with GSAP fade transition
  useEffect(() => {
    if (activeService === currentServiceRef.current) return;
    
    currentServiceRef.current = activeService;
    const data = syncData[activeService] || syncData.default;

    const dLabel = document.getElementById('dynamic-label');
    const dHeading = document.getElementById('dynamic-heading');
    const dDesc = document.getElementById('dynamic-desc');
    const dPoints = document.getElementById('dynamic-points');

    if (dLabel && dHeading && dDesc && dPoints) {
      const lis = dPoints.querySelectorAll('li');
      gsap.killTweensOf([dLabel, dHeading, dDesc, ...lis]);
      gsap.to([dLabel, dHeading, dDesc, ...lis], {
        y: 15, 
        opacity: 0, 
        duration: 0.25, 
        ease: "power2.in", 
        stagger: 0.02,
        onComplete: () => {
          setDisplayedContent(data);
          requestAnimationFrame(() => {
            const newLis = dPoints.querySelectorAll('li');
            gsap.fromTo([dLabel, dHeading, dDesc, ...newLis], 
              { y: -15, opacity: 0 }, 
              { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: "power2.out", overwrite: "auto" }
            );
          });
        }
      });
    } else {
      setDisplayedContent(data);
    }
  }, [activeService]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const hCards = gsap.utils.toArray('.h-card');
    const serviceIds = hCards.map(c => c.getAttribute('data-service'));

    const ctx = gsap.context(() => {
      revealSection(section);

      let mmSec3 = gsap.matchMedia();
      
      mmSec3.add("(min-width: 1024px)", () => {
        const getScrollAmount = () => Math.max(0, track.scrollWidth - track.parentElement.offsetWidth + 80);
        
        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              
              if (hoveredServiceRef.current) return;
              
              if (!activeServiceRef.current || activeServiceRef.current === 'default') return;
              const progress = self.progress;
              let index = Math.floor(progress * hCards.length);
              if (index >= hCards.length) index = hCards.length - 1;
              if (index < 0) index = 0;
              const serviceId = serviceIds[index];
              if (serviceId) {
                updateActiveService(serviceId);
              }
            }
          }
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top 15%",
          onEnter: () => {
            setSectionActive(true);
            updateActiveService(serviceIds[0] || 'webdev');
          },
          onLeaveBack: () => {
            setSectionActive(false);
            updateActiveService('default');
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (serviceId) => {
    if (window.innerWidth < 1024) return;
    if (!sectionActive) return;
    hoveredServiceRef.current = serviceId;
    updateActiveService(serviceId);
  };

  const handleCardLeave = () => {
    hoveredServiceRef.current = null;
  };

  const handleCardFocus = (serviceId) => {
    if (window.innerWidth < 1024) return;
    if (!sectionActive) return;
    hoveredServiceRef.current = serviceId;
    updateActiveService(serviceId);
  };

  return (
    <section 
      id="editorial-services" 
      ref={sectionRef} 
      className={`w-full relative flex flex-col lg:flex-row overflow-hidden text-[#f4f4f5] bg-[#0a0d12] z-[30] isolate transition-colors duration-700 ${sectionActive ? 'section-active' : ''}`}
    >
      <div className="absolute inset-0 bg-[#0a0d12] z-[-1] pointer-events-none"></div>
      <div className="absolute inset-0 noise-overlay pointer-events-none z-[5]"></div>

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-[50] hidden lg:block">
        <div 
          ref={progressRef}
          className="h-full bg-[#a3d4b6] transition-[width] duration-100 ease-linear"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      {/* Sticky Wrapper */}
      <div className="h-auto lg:h-[100dvh] w-full lg:sticky top-0 flex flex-col lg:flex-row items-start lg:items-center pt-24 pb-12 lg:py-0 relative">

         {/* Left Panel */}
        <div className="w-full lg:w-[40%] px-6 md:px-12 lg:pl-[8vw] lg:pr-16 flex flex-col justify-center h-full mb-8 lg:mb-0 relative z-[20]">
            
            <div className="min-h-auto lg:min-h-[220px] flex flex-col justify-end mb-8">
                <div className="overflow-hidden mb-4 lg:mb-5 relative" data-reveal="1">
                    <span id="dynamic-label" className="inline-block text-[#a3d4b6] font-bold text-[10px] lg:text-xs tracking-[0.2em] uppercase">
                      {displayedContent.label}
                    </span>
                </div>
                <div className="overflow-hidden mb-4 lg:mb-6 relative" data-reveal="2">
                    <div className="relative inline-block pb-3">
                        <h2 id="dynamic-heading" className="text-[clamp(32px,5vw,56px)] font-[900] text-[#f4f4f5] leading-[1.05] tracking-tight" dangerouslySetInnerHTML={{ __html: displayedContent.heading }} />
                        <span className="h2-underline absolute left-0 bottom-0 w-full h-[3px] bg-[#a3d4b6] scale-x-0 origin-left"></span>
                    </div>
                </div>
                <div className="overflow-hidden relative" data-reveal="3">
                    <p id="dynamic-desc" className="text-[15px] lg:text-[16px] text-[#a1a1aa] max-w-[420px] leading-[1.6]">
                      {displayedContent.desc}
                    </p>
                </div>
            </div>

            <div className="border-t border-white/10 pt-6 lg:pt-8 mt-2 lg:mt-4 hidden lg:block" data-reveal="4">
                <ul id="dynamic-points" className="space-y-4 mb-8 lg:mb-10 min-h-0 lg:min-h-[135px] relative">
                    {displayedContent.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#a3d4b6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          <span className="text-[13px] lg:text-[14px] text-[#a1a1aa] font-medium leading-snug">{p}</span>
                      </li>
                    ))}
                </ul>

                {displayedContent.techs && displayedContent.techs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {displayedContent.techs.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase rounded-full border border-white/10 bg-white/[0.03] text-[#a1a1aa] backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-6 lg:gap-8 mb-8 lg:mb-10">
                    <div className="flex flex-col">
                        <span className="text-2xl lg:text-3xl font-black text-[#f4f4f5] tracking-tight">3x</span>
                        <span className="text-[9px] lg:text-[10px] text-[#71717a] uppercase tracking-[0.15em] font-bold mt-1">Faster Delivery</span>
                    </div>
                    <div className="w-[1px] h-8 lg:h-10 bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-2xl lg:text-3xl font-black text-[#f4f4f5] tracking-tight">98%</span>
                        <span className="text-[9px] lg:text-[10px] text-[#71717a] uppercase tracking-[0.15em] font-bold mt-1">Client Satisfaction</span>
                    </div>
                </div>

                <button className="px-6 lg:px-7 py-3 lg:py-3.5 border border-white/20 hover:border-[#a3d4b6] text-[#f4f4f5] hover:text-[#a3d4b6] rounded-full text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 bg-white/[0.03] backdrop-blur-sm cursor-pointer hover:bg-white/[0.08]">
                    Explore Services
                </button>
            </div>
        </div>

        {/* Right Panel Background */}
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-[1] overflow-hidden pointer-events-none hidden lg:block bg-[#0d1117]">
            <div className="absolute inset-0 noise-overlay pointer-events-none z-[2]"></div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]" aria-hidden="true">
                <span className="absolute top-[20%] left-[10%] text-[8vw] font-black text-white/[0.02] select-none animate-float tracking-tighter">WEB</span>
                <span className="absolute top-[55%] left-[45%] text-[7vw] font-black text-white/[0.02] select-none animate-float-delayed tracking-tighter">DESIGN</span>
                <span className="absolute top-[10%] left-[70%] text-[6vw] font-black text-white/[0.02] select-none animate-float tracking-tighter">AI</span>
            </div>
        </div>

        {/* Right Panel: Horizontal Scroll Area */}
        <div className="w-full lg:w-[60%] h-auto lg:h-full flex items-center overflow-hidden relative z-[10] py-4 lg:py-0">
            
            <div ref={trackRef} className="horizontal-scroll-track flex flex-col lg:flex-row gap-6 lg:gap-8 px-6 lg:px-[4vw] w-full lg:w-max items-stretch lg:items-center h-auto lg:h-full no-scrollbar py-6 lg:py-0 overflow-visible">
                
                {/* Card 1: Web Development */}
                <div 
                  className={`h-card group flex-shrink-0 w-full lg:w-[320px] bg-white/[0.03] lg:bg-white/[0.05] lg:backdrop-blur-[14px] rounded-[24px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-6 lg:p-8 flex flex-col relative overflow-hidden focus-within:ring-2 focus-within:ring-[#a3d4b6]/50 focus-within:ring-offset-2 focus-within:ring-offset-[#0a0d12] ${activeService === 'webdev' ? 'is-active' : ''}`}
                  data-service="webdev"
                  data-reveal="5"
                  tabIndex={0}
                  role="button"
                  aria-label="Web Development service"
                  onMouseEnter={() => handleCardHover('webdev')}
                  onMouseLeave={handleCardLeave}
                  onFocus={() => handleCardFocus('webdev')}
                  onClick={() => handleCardHover('webdev')}
                >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 lg:mb-8 transition-transform duration-500 ease-out text-[#a3d4b6] group-hover:scale-110">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path className="icon-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#f4f4f5] mb-2 lg:mb-3">Web Development</h3>
                    
                    <div className="card-details flex flex-col flex-1">
                        <p className="text-[#a1a1aa] text-[14px] lg:text-[15px] leading-[1.6] mb-auto">
                          Scalable, high-performance websites built with modern frameworks and perfectly optimized architecture.
                        </p>
                        
                        <ul className="text-[13px] text-[#a1a1aa] space-y-2 mt-5 pt-5 border-t border-white/10 block lg:hidden">
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Scalable architecture built for future growth</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>User-first design systems with conversion focus</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Performance-driven development approach</span></li>
                        </ul>

                        <div className="flex items-center gap-3 text-[12px] lg:text-[13px] font-bold text-[#a1a1aa] group-hover:text-[#a3d4b6] transition-colors mt-6 uppercase tracking-wider">
                            <span>Explore</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card 2: UI/UX Design */}
                <div 
                  className={`h-card group flex-shrink-0 w-full lg:w-[320px] bg-white/[0.03] lg:bg-white/[0.05] lg:backdrop-blur-[14px] rounded-[24px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-6 lg:p-8 flex flex-col relative overflow-hidden focus-within:ring-2 focus-within:ring-[#a3d4b6]/50 focus-within:ring-offset-2 focus-within:ring-offset-[#0a0d12] ${activeService === 'uiux' ? 'is-active' : ''}`}
                  data-service="uiux"
                  data-reveal="5"
                  tabIndex={0}
                  role="button"
                  aria-label="UI/UX Design service"
                  onMouseEnter={() => handleCardHover('uiux')}
                  onMouseLeave={handleCardLeave}
                  onFocus={() => handleCardFocus('uiux')}
                  onClick={() => handleCardHover('uiux')}
                >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 lg:mb-8 transition-transform duration-500 ease-out text-[#a3d4b6] group-hover:scale-110">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path className="icon-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                        </svg>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#f4f4f5] mb-2 lg:mb-3">UI/UX Design</h3>
                    
                    <div className="card-details flex flex-col flex-1">
                        <p className="text-[#a1a1aa] text-[14px] lg:text-[15px] leading-[1.6] mb-auto">
                          User-focused interfaces engineered for exceptional clarity, engagement, and seamless conversion.
                        </p>
                        
                        <ul className="text-[13px] text-[#a1a1aa] space-y-2 mt-5 pt-5 border-t border-white/10 block lg:hidden">
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Data-driven user journey mapping</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Conversion-optimized interface layouts</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Inclusive and accessible design systems</span></li>
                        </ul>

                        <div className="flex items-center gap-3 text-[12px] lg:text-[13px] font-bold text-[#a1a1aa] group-hover:text-[#a3d4b6] transition-colors mt-6 uppercase tracking-wider">
                            <span>Explore</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card 3: Data Analytics */}
                <div 
                  className={`h-card group flex-shrink-0 w-full lg:w-[320px] bg-white/[0.03] lg:bg-white/[0.05] lg:backdrop-blur-[14px] rounded-[24px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-6 lg:p-8 flex flex-col relative overflow-hidden focus-within:ring-2 focus-within:ring-[#a3d4b6]/50 focus-within:ring-offset-2 focus-within:ring-offset-[#0a0d12] ${activeService === 'analytics' ? 'is-active' : ''}`}
                  data-service="analytics"
                  data-reveal="5"
                  tabIndex={0}
                  role="button"
                  aria-label="Data Analytics service"
                  onMouseEnter={() => handleCardHover('analytics')}
                  onMouseLeave={handleCardLeave}
                  onFocus={() => handleCardFocus('analytics')}
                  onClick={() => handleCardHover('analytics')}
                >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 lg:mb-8 transition-transform duration-500 ease-out text-[#a3d4b6] group-hover:scale-110">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path className="icon-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#f4f4f5] mb-2 lg:mb-3">Data Analytics</h3>
                    
                    <div className="card-details flex flex-col flex-1">
                        <p className="text-[#a1a1aa] text-[14px] lg:text-[15px] leading-[1.6] mb-auto">
                          Transform raw data into actionable insights with powerful, real-time intelligence systems.
                        </p>
                        
                        <ul className="text-[13px] text-[#a1a1aa] space-y-2 mt-5 pt-5 border-t border-white/10 block lg:hidden">
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Real-time data visualization dashboards</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Predictive machine learning models</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Actionable business intelligence reporting</span></li>
                        </ul>

                        <div className="flex items-center gap-3 text-[12px] lg:text-[13px] font-bold text-[#a1a1aa] group-hover:text-[#a3d4b6] transition-colors mt-6 uppercase tracking-wider">
                            <span>Explore</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Card 4: Optimization */}
                <div 
                  className={`h-card group flex-shrink-0 w-full lg:w-[320px] bg-white/[0.03] lg:bg-white/[0.05] lg:backdrop-blur-[14px] rounded-[24px] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-6 lg:p-8 flex flex-col relative overflow-hidden focus-within:ring-2 focus-within:ring-[#a3d4b6]/50 focus-within:ring-offset-2 focus-within:ring-offset-[#0a0d12] ${activeService === 'optimization' ? 'is-active' : ''}`}
                  data-service="optimization"
                  data-reveal="5"
                  tabIndex={0}
                  role="button"
                  aria-label="Optimization service"
                  onMouseEnter={() => handleCardHover('optimization')}
                  onMouseLeave={handleCardLeave}
                  onFocus={() => handleCardFocus('optimization')}
                  onClick={() => handleCardHover('optimization')}
                >
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 lg:mb-8 transition-transform duration-500 ease-out text-[#a3d4b6] group-hover:scale-110">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path className="icon-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#f4f4f5] mb-2 lg:mb-3">Optimization</h3>
                    
                    <div className="card-details flex flex-col flex-1">
                        <p className="text-[#a1a1aa] text-[14px] lg:text-[15px] leading-[1.6] mb-auto">
                          Speed, scalability, and efficiency improvements tailored specifically for modern web platforms.
                        </p>
                        
                        <ul className="text-[13px] text-[#a1a1aa] space-y-2 mt-5 pt-5 border-t border-white/10 block lg:hidden">
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Core Web Vitals performance tuning</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Server-side caching and delivery</span></li>
                            <li className="flex items-start gap-2"><span className="text-[#a3d4b6] font-bold">✓</span><span>Asset compression and lazy loading</span></li>
                        </ul>

                        <div className="flex items-center gap-3 text-[12px] lg:text-[13px] font-bold text-[#a1a1aa] group-hover:text-[#a3d4b6] transition-colors mt-6 uppercase tracking-wider">
                            <span>Explore</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Spacer (Desktop Only) */}
                <div className="hidden lg:block w-[5vw] lg:w-[10vw] h-full flex-shrink-0"></div>
            </div>
        </div>
      </div>
    </section>
  );
}
