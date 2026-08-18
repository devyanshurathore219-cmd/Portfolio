import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTransitionNavigate } from '../App';

export default function Navbar({ onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navMode, setNavMode] = useState('dark'); // 'dark' or 'light'
  
  const location = useLocation();
  const navigate = useTransitionNavigate();
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
    document.documentElement.classList.toggle('menu-open', !isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
  };

  // Scroll listener for nav-scrolled class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background Brightness Detection System
  useEffect(() => {
    let isDetectingBg = false;

    const getBrightness = (r, g, b) => {
      return (0.299 * r + 0.587 * g + 0.114 * b);
    };

    const getActualBackgroundColor = (element) => {
      while (element && element.tagName !== 'HTML') {
        const bg = window.getComputedStyle(element).backgroundColor;
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
          if (alpha >= 0.5) {
            return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
          }
        }
        element = element.parentElement;
      }
      return { r: 7, g: 8, b: 10 }; // Fallback to theme dark (bg-[#07080a])
    };

    const detectNavbarBackground = () => {
      if (isDetectingBg || !navRef.current) return;
      isDetectingBg = true;

      requestAnimationFrame(() => {
        // Sample pixel at the horizontal center, inside navbar area (30px from top)
        const elements = document.elementsFromPoint(window.innerWidth / 2, 30);
        
        // Find the first element that is UNDER the navbar (not the navbar or its children)
        const bgElement = elements.find(el => !navRef.current.contains(el));
        
        if (bgElement) {
          const rgb = getActualBackgroundColor(bgElement);
          const brightness = getBrightness(rgb.r, rgb.g, rgb.b);
          
          // Threshold 150 determines if background is visually light or dark
          const newMode = brightness > 150 ? 'light' : 'dark';
          setNavMode(newMode);
        }
        isDetectingBg = false;
      });
    };

    window.addEventListener('scroll', detectNavbarBackground, { passive: true });
    window.addEventListener('load', detectNavbarBackground);
    detectNavbarBackground();

    return () => {
      window.removeEventListener('scroll', detectNavbarBackground);
      window.removeEventListener('load', detectNavbarBackground);
    };
  }, [location.pathname]);

  const handleNavLink = (e, hash) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname === '/') {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#' + hash);
      // Wait for page transition then scroll
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const handleLinkClick = (e, to) => {
    e.preventDefault();
    closeMenu();
    navigate(to);
  };

  const navClasses = [
    'fixed top-0 left-0 w-full z-[60] pt-1.5 px-4 sm:px-6 md:px-12 will-change-transform transform-gpu',
    isScrolled ? 'nav-scrolled' : '',
    navMode === 'light' ? 'navbar-light' : '',
    isOpen ? 'menu-open' : ''
  ].join(' ').trim();

  return (
    <nav id="main-nav" className={navClasses} ref={navRef}>
      <div className="nav-inner max-w-[1400px] w-full mx-auto border border-white/5 shadow-[0_6px_20px_rgba(0,0,0,0.25)] rounded-[16px] flex items-center justify-between px-5 md:px-7 py-2 relative overflow-hidden transition-colors duration-300">
        
        {/* Glow Divider Top */}
        <div className="nav-glow-divider absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a3d4b6]/50 to-transparent opacity-70"></div>
        
        {/* Left: Logo */}
        <Link 
          to="/" 
          onClick={(e) => handleLinkClick(e, '/')}
          className="logo-text text-[16px] sm:text-[18px] font-[800] tracking-widest text-white uppercase drop-shadow-md transition-colors duration-300 relative z-[65] w-auto lg:w-[150px]"
        >
          DEVYANSHU
        </Link>
        
        {/* Center: Links Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-10 flex-1 relative z-10">
          <a href="#hero-section" onClick={(e) => handleNavLink(e, 'hero-section')} className="nav-link text-[12px] font-semibold tracking-[0.1em] text-[#a1a1aa] hover:text-white transition-colors uppercase">
            Home<span className="nav-link-underline"></span>
          </a>
          <a href="#editorial-services" onClick={(e) => handleNavLink(e, 'editorial-services')} className="nav-link text-[12px] font-semibold tracking-[0.1em] text-[#a1a1aa] hover:text-white transition-colors uppercase">
            Services<span className="nav-link-underline"></span>
          </a>
          <a href="#about-section" onClick={(e) => handleNavLink(e, 'about-section')} className="nav-link text-[12px] font-semibold tracking-[0.1em] text-[#a1a1aa] hover:text-white transition-colors uppercase">
            About<span className="nav-link-underline"></span>
          </a>
          <a href="#portfolio-interactive" onClick={(e) => handleNavLink(e, 'portfolio-interactive')} className="nav-link text-[12px] font-semibold tracking-[0.1em] text-[#a1a1aa] hover:text-white transition-colors uppercase">
            Portfolio<span className="nav-link-underline"></span>
          </a>
          <Link to="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="nav-link text-[12px] font-semibold tracking-[0.1em] text-[#a1a1aa] hover:text-white transition-colors uppercase">
            Contact<span className="nav-link-underline"></span>
          </Link>
        </div>
        
        {/* Right: CTA Desktop */}
        <div className="hidden lg:flex justify-end w-[150px] relative z-10">
          <button 
            onClick={() => { closeMenu(); onOpenContact(); }}
            className="nav-cta inline-block px-6 py-2 border border-[#a3d4b6]/40 bg-[#a3d4b6]/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-[#a3d4b6] transition-all duration-300 uppercase shadow-[0_0_15px_rgba(163,212,182,0.15)] will-change-transform transform-gpu hover:scale-105 hover:bg-[#a3d4b6] hover:text-[#07080a] hover:shadow-[0_0_25px_rgba(163,212,182,0.3)] text-center cursor-pointer"
          >
            Request Demo
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          id="mobile-menu-btn" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation menu" 
          aria-controls="mobile-menu" 
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-end w-8 h-8 z-[65] relative outline-none focus-visible:ring-2 focus-visible:ring-[#a3d4b6] rounded cursor-pointer"
        >
          <span className="w-6 h-[2px] bg-white transition-all duration-300 mb-1.5 origin-center"></span>
          <span className="w-6 h-[2px] bg-white transition-all duration-300 mb-1.5 origin-center"></span>
          <span className="w-6 h-[2px] bg-white transition-all duration-300 origin-center"></span>
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div 
        id="mobile-menu" 
        className={`fixed inset-0 bg-[#07080a]/98 backdrop-blur-md z-[60] flex flex-col items-center justify-center min-h-screen overflow-y-auto overscroll-contain transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-8 text-center w-full px-6 py-12">
          <a href="#hero-section" onClick={(e) => handleNavLink(e, 'hero-section')} className="mobile-nav-link text-[20px] font-bold tracking-[0.15em] text-white uppercase hover:text-[#a3d4b6] transition-colors">Home</a>
          <a href="#editorial-services" onClick={(e) => handleNavLink(e, 'editorial-services')} className="mobile-nav-link text-[20px] font-bold tracking-[0.15em] text-white uppercase hover:text-[#a3d4b6] transition-colors">Services</a>
          <a href="#about-section" onClick={(e) => handleNavLink(e, 'about-section')} className="mobile-nav-link text-[20px] font-bold tracking-[0.15em] text-white uppercase hover:text-[#a3d4b6] transition-colors">About</a>
          <a href="#portfolio-interactive" onClick={(e) => handleNavLink(e, 'portfolio-interactive')} className="mobile-nav-link text-[20px] font-bold tracking-[0.15em] text-white uppercase hover:text-[#a3d4b6] transition-colors">Portfolio</a>
          <Link to="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="mobile-nav-link text-[20px] font-bold tracking-[0.15em] text-white uppercase hover:text-[#a3d4b6] transition-colors">Contact</Link>
          <button 
            onClick={() => { closeMenu(); onOpenContact(); }}
            className="mobile-nav-link flex justify-center items-center text-center mt-6 px-8 py-3.5 border border-[#a3d4b6]/40 bg-[#a3d4b6]/10 rounded-full text-[13px] font-bold tracking-wider text-[#a3d4b6] uppercase w-full max-w-[280px] hover:bg-[#a3d4b6] hover:text-[#07080a] transition-all cursor-pointer"
          >
            Request Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
