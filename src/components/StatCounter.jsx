import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const StatCounter = ({ target, suffix = '', duration = 1.0 }) => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = mediaQuery.matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          if (isReduced) {
            if (numberRef.current) {
              numberRef.current.innerText = target;
            }
            return;
          }

          let ctx = gsap.context(() => {
            gsap.to(numberRef.current, {
              innerText: target,
              duration: duration,
              snap: { innerText: 1 },
              ease: "power2.out",
            });
          }, containerRef);
          
          return () => ctx.revert();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      observer.disconnect();
    };
  }, [target, duration, hasAnimated]);

  return (
    <div 
      ref={containerRef} 
      className="relative inline-flex font-medium text-[#f4f4f5]"
      aria-label={`${target}${suffix}`}
    >
      {/* Hidden placeholder to hold width and prevent layout shift */}
      <span className="invisible opacity-0 select-none" aria-hidden="true">
        {target}{suffix}
      </span>
      
      {/* Visible animated number */}
      <span className="absolute inset-0 flex items-center justify-start" aria-hidden="true">
        <span ref={numberRef}>{hasAnimated && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? target : 0}</span>
        {suffix && <span>{suffix}</span>}
      </span>
    </div>
  );
};

export default StatCounter;
