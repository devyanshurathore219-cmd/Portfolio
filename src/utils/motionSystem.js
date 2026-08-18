export const MOTION = {
  easing: { entry: "power3.out", exit: "power2.inOut" },
  scrub: 1.2,
  duration: { min: 0.6, max: 1.0, default: 0.8 },
  stagger: { min: 0.10, max: 0.15, default: 0.12 },
  reveal: {
    from: { y: 40, opacity: 0, filter: "blur(4px)" },
    to: { y: 0, opacity: 1, filter: "blur(0px)" }
  }
};

export function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function onMotionChange(callback) {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}
