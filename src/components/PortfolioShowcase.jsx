import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransitionNavigate } from '../App';
import { revealSection } from '../utils/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

const portfolioCards = [
  {
    id: 'lumiere',
    tag: "Luxury E-Commerce",
    title: "Lumière Platform",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    link: "/project/lumiere"
  },
  {
    id: 'realstate',
    tag: "Real Estate SaaS",
    title: "RealState Marketplace",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop",
    link: "/project/realstate"
  },
  {
    id: 'fintrack-pro',
    tag: "Personal Finance SaaS",
    title: "FinTrack-Pro Dashboard",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    link: "/project/fintrack-pro"
  },
  {
    id: 'digital-agency',
    tag: "Digital Agency Website",
    title: "Advanced Agency Site",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    link: "/project/digital-agency"
  }
];

export default function PortfolioShowcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const navigate = useTransitionNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = gsap.utils.toArray('.interactive-card');
    
    const ctx = gsap.context(() => {
      revealSection(container);

      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 1024px)", () => {
        let isHoveringContainer = false;

        // Set initial stack configuration
        gsap.set(cards, {
          position: 'absolute',
          width: '280px',
          height: '380px',
          x: (i) => (i - 1.5) * 35,
          y: 0,
          rotation: (i) => (i - 1.5) * 4,
          z: (i) => i * -5,
          scale: 1,
          opacity: 1,
          zIndex: (i) => i + 1,
          transformOrigin: "center center"
        });

        // Fanning timeline
        const expandTl = gsap.timeline({ 
          paused: true, 
          defaults: { duration: 0.6, ease: "power3.out", overwrite: "auto" } 
        });
        
        expandTl.to(cards, { 
          x: (i) => (i - 1.5) * 310, 
          rotation: 0, 
          z: 0, 
          ease: "back.out(1.2)", 
          stagger: 0.015 
        });

        const onEnter = () => {
          isHoveringContainer = true;
          expandTl.play();
        };

        const onLeave = () => {
          isHoveringContainer = false;
          expandTl.reverse();
          gsap.to(cards, { 
            scale: 1, 
            filter: "blur(0px) grayscale(0%)", 
            opacity: 1, 
            duration: 0.4, 
            overwrite: "auto" 
          });
        };

        track.addEventListener('mouseenter', onEnter);
        track.addEventListener('mouseleave', onLeave);

        cards.forEach((card, _index) => {
          // Hover on individual card inside the fan deck
          const handleMouseEnterCard = () => {
            if (isHoveringContainer) {
              gsap.to(cards, {
                scale: (i, t) => t === card ? 1.05 : 0.95,
                filter: (i, t) => t === card ? "blur(0px) grayscale(0%)" : "blur(3px) grayscale(40%)",
                opacity: (i, t) => t === card ? 1 : 0.5,
                zIndex: (i, t) => t === card ? 20 : i + 1,
                duration: 0.4, 
                ease: "power2.out", 
                overwrite: "auto"
              });
            }
          };

          // 3D-Tilt move
          const handleMouseMoveCard = (e) => {
            if (isHoveringContainer) {
              const rect = card.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / 15;
              const y = (e.clientY - rect.top - rect.height / 2) / -15;
              gsap.to(card, { rotationY: x, rotationX: y, duration: 0.1, overwrite: "auto" });
            }
          };

          // Mouse leave card
          const handleMouseLeaveCard = () => {
            gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.4, overwrite: "auto" });
          };

          card.addEventListener('mouseenter', handleMouseEnterCard);
          card.addEventListener('mousemove', handleMouseMoveCard, { passive: true });
          card.addEventListener('mouseleave', handleMouseLeaveCard);
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleScrollMobile = (direction) => {
    const track = trackRef.current;
    if (track) {
      const scrollOffset = direction === 'left' ? -320 : 320;
      track.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const handleCardClick = (card) => {
    navigate(card.link, card.title);
  };

  return (
    <section 
      id="portfolio-interactive" 
      ref={containerRef}
      className="w-full h-auto lg:h-[100dvh] min-h-0 flex flex-col items-center justify-center bg-[#eae6df] relative z-20 py-20 lg:py-0 overflow-hidden isolate"
    >
      <div className="absolute inset-0 bg-[#eae6df] z-[-1] pointer-events-none"></div>
      <div className="absolute inset-0 noise-overlay-light z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/50 blur-[100px] rounded-full z-0 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-8 flex flex-col items-center relative z-10 h-full justify-center">
          
          {/* Heading Block */}
          <div className="text-center mb-10 md:mb-12 w-full max-w-[600px] flex flex-col items-center">
              <span className="inline-block text-[#16a34a] font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase mb-4" data-reveal="1">PORTFOLIO</span>
              <h2 className="relative inline-block text-[clamp(32px,5vw,48px)] font-[900] text-[#111] leading-[1.05] tracking-tight mb-4 pb-3" data-reveal="2">
                Cinematic Experiences
                <span className="h2-underline absolute left-0 bottom-0 w-full h-[3px] bg-[#16a34a] scale-x-0 origin-left"></span>
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.6]" data-reveal="3">
                  A selection of high-impact digital products engineered with precision, performance, and design excellence. Hover to explore.
              </p>
          </div>

          {/* Card Deck Wrapper */}
          <div className="relative w-full max-w-[1280px] z-10 mb-8 lg:mb-12" data-reveal="4">
              
              {/* Mobile Navigation Arrows */}
              <div className="portfolio-arrows">
                <button onClick={() => handleScrollMobile('left')} className="arrow left-arrow" aria-label="Scroll left">&#10094;</button>
                <button onClick={() => handleScrollMobile('right')} className="arrow right-arrow" aria-label="Scroll right">&#10095;</button>
              </div>

              {/* Deck Track */}
              <div 
                ref={trackRef}
                id="portfolio-interactive-container"
                className="relative w-full h-auto lg:h-[400px] perspective-[1000px] flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 no-scrollbar"
              >
                  {portfolioCards.map((card) => (
                    <div 
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="interactive-card rounded-[22px] overflow-hidden bg-white border border-black/[0.08] shadow-md lg:shadow-[0_15px_40px_rgba(0,0,0,0.06)] relative w-full lg:w-[280px] h-[280px] sm:h-[320px] lg:h-[380px] transform-gpu cursor-pointer"
                    >
                        <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 pointer-events-none">
                            <span className="text-[10px] text-white/70 font-bold uppercase tracking-[0.15em] mb-1 block">{card.tag}</span>
                            <h3 className="text-[18px] font-bold text-white leading-tight">{card.title}</h3>
                        </div>
                    </div>
                  ))}
              </div>
          </div>

          {/* CTA Button */}
          <div className="mt-4 lg:mt-0" data-reveal="5">
              <button 
                onClick={() => navigate('/portfolio')}
                className="px-8 py-3.5 border border-[#111] text-[#111] hover:bg-[#111] hover:text-white rounded-full text-[12px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 bg-transparent w-full sm:w-auto text-center inline-block cursor-pointer"
              >
                  View Full Portfolio
              </button>
          </div>

      </div>
    </section>
  );
}
