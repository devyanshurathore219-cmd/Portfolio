import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const monogramRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = mediaQuery.matches;
    
    document.body.style.overflow = 'hidden';

    let ctx = gsap.context(() => {
      if (isReduced) {
        gsap.delayedCall(0.6, () => {
          setIsVisible(false);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        });
        return;
      }

      const tl = gsap.timeline();

      tl.fromTo(monogramRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" }
      );

      // Force fadeout at 2000ms max
      gsap.delayedCall(1.4, () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
             setIsVisible(false);
             document.body.style.overflow = '';
             if (onComplete) onComplete();
          }
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#07080a] flex items-center justify-center overflow-hidden"
      role="status"
      aria-busy="true"
    >
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.03,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />
      <div 
        ref={monogramRef}
        className="text-[#f4f4f5] text-7xl md:text-9xl tracking-widest select-none"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        DR
      </div>
    </div>
  );
};

export default Preloader;
