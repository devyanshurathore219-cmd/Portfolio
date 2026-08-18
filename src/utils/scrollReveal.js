import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up a standard, stagger-revealed sequence for a section using ScrollTrigger.
 * Respects prefers-reduced-motion media query.
 * 
 * @param {string|Element} elementOrSelector - selector string or DOM element
 */
export const revealSection = (elementOrSelector) => {
  const section = typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector;

  if (!section) return null;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    const elementsToReveal = section.querySelectorAll('[data-reveal]');
    gsap.set(elementsToReveal, { opacity: 1, y: 0 });
    const underlines = section.querySelectorAll('.h2-underline');
    gsap.set(underlines, { scaleX: 1 });
    return null;
  }

  // Find all reveal-enabled elements
  const elements = Array.from(section.querySelectorAll('[data-reveal]'));
  if (elements.length === 0) return null;

  // Set initial hidden state: opacity 0, y 25px (subtle gentle lift)
  gsap.set(elements, { opacity: 0, y: 25 });

  // Set initial state for headings underlines
  const underlines = section.querySelectorAll('.h2-underline');
  if (underlines.length > 0) {
    gsap.set(underlines, { scaleX: 0, transformOrigin: 'left center' });
  }

  // Build ScrollTrigger Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 85%", // Trigger when section is 15% from bottom of viewport
      once: true,       // Fire once and never re-trigger
    }
  });

  // Group elements by their data-reveal rank
  const groups = {};
  elements.forEach(el => {
    const order = el.getAttribute('data-reveal') || '1';
    if (!groups[order]) {
      groups[order] = [];
    }
    groups[order].push(el);
  });

  // Sort groups numerically
  const sortedOrders = Object.keys(groups).sort((a, b) => parseInt(a) - parseInt(b));

  sortedOrders.forEach((order, idx) => {
    const groupElements = groups[order];

    // Determine custom relative offset based on rank sequence
    let positionOffset = undefined;
    if (idx > 0) {
      if (order === '2') {
        // Heading starts 0.15s after eyebrow starts
        positionOffset = "<0.15";
      } else if (order === '3') {
        // Description starts 0.18s after heading starts
        positionOffset = "<0.18";
      } else if (order === '4' || order === '5') {
        // Supporting cards/extras start 0.2s after description starts
        positionOffset = "<0.2";
      } else {
        positionOffset = "+=0.15";
      }
    }

    // Add staggered fade-in + rise to timeline
    tl.to(groupElements, {
      opacity: 1,
      y: 0,
      duration: 0.8, // Unhurried 0.8s duration
      ease: "power2.out",
      stagger: 0.12 // 0.1-0.15s stagger left-to-right
    }, positionOffset);

    // Underline Sweep timing
    groupElements.forEach(el => {
      const underline = el.querySelector('.h2-underline') || (el.classList.contains('h2-underline') ? el : null);
      if (underline) {
        tl.to(underline, {
          scaleX: 1,
          duration: 0.55,
          ease: "power2.out"
        }, "-=0.45"); // overlaps heading rise nicely
      }
    });
  });

  return tl;
};
