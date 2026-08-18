import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Preloader from './components/Preloader';

import Home from './pages/Home';
import PortfolioGallery from './pages/PortfolioGallery';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import ContactPage from './pages/ContactPage';

// Create a Shared Page Transition Context
export const TransitionContext = createContext(null);

export const useTransitionNavigate = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    const navigate = useNavigate();
    return (url, _title = '') => navigate(url);
  }
  return context;
};

function AppContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const shutterRef = useRef(null);
  const titleRef = useRef(null);
  const [transitionTitle, setTransitionTitle] = useState('');
  const isTransitioningRef = useRef(false);

  // Custom shutter page transition navigation function
  const navigateWithTransition = (url, title = '') => {
    if (isTransitioningRef.current || !shutterRef.current) {
      navigate(url);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      navigate(url);
      return;
    }

    isTransitioningRef.current = true;
    setTransitionTitle(title);

    shutterRef.current.style.pointerEvents = 'auto';

    const tl = gsap.timeline({
      onComplete: () => {
        navigate(url);
      }
    });

    gsap.set(shutterRef.current, { translateY: '100%' });
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, scale: 0.95 });
    }

    tl.to(shutterRef.current, {
      translateY: '0%',
      duration: 0.55,
      ease: "power3.inOut"
    });

    if (title) {
      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(titleRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.45
      });
    } else {
      tl.delay(0.12);
    }
  };

  useEffect(() => {
    if (!shutterRef.current) return;
    if (!isTransitioningRef.current) return;

    const tl = gsap.timeline({
      delay: 0.12,
      onComplete: () => {
        isTransitioningRef.current = false;
        setTransitionTitle('');
        gsap.set(shutterRef.current, { translateY: '100%' });
        shutterRef.current.style.pointerEvents = 'none';
      }
    });

    tl.to(shutterRef.current, {
      translateY: '-100%',
      duration: 0.55,
      ease: "power3.inOut"
    });
  }, [location.pathname]);

  return (
    <TransitionContext.Provider value={navigateWithTransition}>
      <div className="relative min-h-screen">
        
        {/* Branded Preloader */}
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}

        {/* Skip to Content — Accessibility */}
        <a
          href="#scroll-container"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99998] focus:px-6 focus:py-3 focus:bg-[#a3d4b6] focus:text-[#07080a] focus:rounded-lg focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>

        {/* Shutter Wipe Page Transition Curtain */}
        <div 
          ref={shutterRef}
          className="fixed inset-0 bg-[#07080a] z-[9999] pointer-events-none flex items-center justify-center transform-gpu"
          style={{ transform: 'translateY(100%)' }}
        >
          <div className="absolute top-0 left-0 w-full h-[3px] bg-[#a3d4b6]"></div>
          <div className="absolute inset-0 noise-overlay pointer-events-none z-[5]"></div>
          
          <div 
            ref={titleRef}
            className="relative z-10 text-center opacity-0 scale-95 select-none pointer-events-none px-6"
          >
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {transitionTitle}
            </h2>
          </div>
        </div>

        {/* Cinematic Header Navbar */}
        <Navbar onOpenContact={() => setIsContactOpen(true)} />

        {/* Dynamic Route Pages */}
        <Routes>
          <Route path="/" element={<Home onOpenContact={() => setIsContactOpen(true)} />} />
          <Route path="/portfolio" element={<PortfolioGallery onOpenContact={() => setIsContactOpen(true)} />} />
          <Route path="/project/:projectId" element={<ProjectCaseStudy />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* Global Footer — Rendered on all pages EXCEPT /portfolio */}
        {location.pathname !== '/portfolio' && (
          <Footer onOpenContact={() => setIsContactOpen(true)} />
        )}

        {/* Global Contact Modal */}
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </TransitionContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
