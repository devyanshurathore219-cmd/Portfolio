import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const images = [];
    const animationState = { frame: 0 };
    let scrollTriggerInstance = null;
    let isCanvasVisible = true;
    let lastWidth = window.innerWidth;
    let resizeTimeout;

    // 1. Intersection Observer to skip rendering when canvas is out of view
    const observer = new IntersectionObserver((entries) => {
      isCanvasVisible = entries[0].isIntersecting;
    }, { rootMargin: "200px" });

    // Observe body/hero area
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    // 2. Center Shift & Aspect Ratio cover rendering logic
    const render = () => {
      if (!isCanvasVisible || images.length === 0) return;
      const currentFrame = Math.min(Math.round(animationState.frame), images.length - 1);
      if (currentFrame < 0 || !images[currentFrame]) return;

      const img = images[currentFrame];
      if (!img.complete || img.naturalWidth === 0) return;

      context.fillStyle = "#07080a";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const drawWidth = img.width * ratio;
      const drawHeight = img.height * ratio;
      const centerShift_x = (canvas.width - drawWidth) / 2;
      const centerShift_y = (canvas.height - drawHeight) / 2;

      context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, drawWidth, drawHeight);
    };

    // 3. Canvas Resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
      } else {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 300);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 4. Scroll Trigger Initialization
    const initScrollTrigger = () => {
      if (images.length === 0) return;
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      
      scrollTriggerInstance = gsap.to(animationState, {
        frame: images.length - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          endTrigger: "#editorial-services",
          end: "top top",
          scrub: 0.5,
        },
        onUpdate: () => requestAnimationFrame(render)
      });
    };

    // 5. Progressive frame loader
    const loadFramesProgressively = () => {
      let currentIndex = 1;
      const totalFrames = 147;
      
      const fetchNextFrame = () => {
        if (currentIndex > totalFrames) {
          // All frames loaded — re-init ScrollTrigger with the full frame count
          if (images.length > 0) {
            initScrollTrigger();
          }
          return;
        }
        const img = new Image();
        img.src = `/Frames/frame_${String(currentIndex).padStart(4, '0')}.png`;
        img.onload = () => {
          images.push(img);
          if (currentIndex === 1) {
            resizeCanvas();
            initScrollTrigger();
          }
          currentIndex++;
          fetchNextFrame();
        };
        img.onerror = () => {
          // If we hit an error mid-load, init with whatever we got
          if (images.length > 0) {
            initScrollTrigger();
          }
        };
      };
      
      fetchNextFrame();
    };

    loadFramesProgressively();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden w-full h-[100dvh]">
      <div className="absolute inset-0 w-full h-full origin-center brightness-[1.10] contrast-[1.10] saturate-[1.05]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
      
      {/* LAYER 2: Overlay System */}
      <div className="absolute inset-0 bg-black/20 mix-blend-normal pointer-events-none"></div> 
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none"></div> 
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none"></div> 
      <div className="absolute inset-0 bg-[#a3d4b6] mix-blend-overlay opacity-[0.03] pointer-events-none"></div>
      <div className="absolute inset-0 grid-overlay-dark"></div>
      <div className="absolute inset-0 noise-overlay"></div>
    </div>
  );
}
