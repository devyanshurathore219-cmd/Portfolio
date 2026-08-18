import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Footer({ onOpenContact }) {
  const footerRef = useRef(null);
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isHomePage = location.pathname === '/';

  const handleScrollToTop = (e) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    // Focus first focusable element after scroll
    setTimeout(() => {
      const firstFocusable = document.querySelector('a[href], button, input, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    }, prefersReducedMotion ? 50 : 1000);
  };

  return (
    <footer 
      ref={footerRef} 
      role="contentinfo"
      className="w-full bg-[#07080a] border-t border-white/[0.05] relative z-50"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-6 lg:py-0 lg:h-[160px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center lg:items-start gap-1">
          <span className="text-[12px] text-[#71717a] font-medium tracking-wide">
            © {currentYear} Devyanshu Rathore
          </span>
          <span className="text-[11px] text-[#52525b] tracking-wide">
            Crafted with precision.
          </span>
        </div>

        {/* Center: Navigation Links (max 5) */}
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <a href="#hero-section" className="footer-link text-[12px] text-[#a1a1aa] hover:text-[#a3d4b6] font-medium transition-colors duration-300 relative">
            Home
            <span className="footer-link-underline"></span>
          </a>
          <a href="#editorial-services" className="footer-link text-[12px] text-[#a1a1aa] hover:text-[#a3d4b6] font-medium transition-colors duration-300 relative">
            Services
            <span className="footer-link-underline"></span>
          </a>
          <a href="#about-section" className="footer-link text-[12px] text-[#a1a1aa] hover:text-[#a3d4b6] font-medium transition-colors duration-300 relative">
            About
            <span className="footer-link-underline"></span>
          </a>
          <a href="#portfolio-interactive" className="footer-link text-[12px] text-[#a1a1aa] hover:text-[#a3d4b6] font-medium transition-colors duration-300 relative">
            Portfolio
            <span className="footer-link-underline"></span>
          </a>
          {/* Contact CTA — only show if NOT on home page (which has ContactFinale) */}
          {!isHomePage && onOpenContact && (
            <button
              onClick={onOpenContact}
              className="text-[12px] text-[#a3d4b6] hover:text-white font-semibold transition-colors duration-300 cursor-pointer"
            >
              Contact
            </button>
          )}
        </nav>

        {/* Right: Scroll to Top */}
        <button
          onClick={handleScrollToTop}
          aria-label="Scroll to top of page"
          className="flex items-center gap-2 text-[12px] text-[#a1a1aa] hover:text-[#a3d4b6] font-medium transition-all duration-300 group cursor-pointer"
        >
          <span className="hidden sm:inline">Back to Top</span>
          <svg 
            className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
