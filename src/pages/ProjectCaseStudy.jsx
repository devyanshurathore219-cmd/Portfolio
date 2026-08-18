import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransitionNavigate } from '../App';

gsap.registerPlugin(ScrollTrigger);

const caseStudiesData = {
  'lumiere': {
    slug: 'lumiere',
    title: 'LUMIÈRE',
    titleOutline: 'E-COMMERCE',
    subtitle: 'Luxury Editorial Furniture Platform',
    desc: 'A premium, dark walnut-and-brass editorial e-commerce platform featuring immersive animations, Razorpay integration, and a custom SQLite schema.',
    clientOverview: 'Designed to challenge generic template stores by creating a high-fidelity digital showroom for a boutique luxury furniture manufacturer.',
    categoryTags: ['React.js', 'Vite', '2026'],
    problem: 'Standard templated storefronts lacked the editorial elegance, micro-animations, and custom multi-role workflows needed to command premium luxury pricing.',
    solution: 'We built a decoupled, animation-rich React platform featuring a custom-modeled vendor dashboard, cart context API, Razorpay sandbox checkout, and SQLite backend storage.',
    outcome: 'A high-craft user experience with fluid Flickity carousel sliders, and a responsive layout that operates smoothly at 60fps.',
    bgImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    videoUrl: 'https://assets.codepen.io/3364143/7btrrd.mp4',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', title: 'Luxury Walnut Grid', desc: 'Custom fanned showcase of walnut pieces.' },
      { img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop', title: 'Premium Details', desc: 'High-contrast brass and walnut rendering.' }
    ],
    process: [
      { num: '01', title: 'Design Philosophy & Palette', desc: 'Crafting a dark walnut-and-brass editorial aesthetic inspired by print design.' },
      { num: '02', title: 'React Architecture & Context', desc: 'Developing modular components, integrating Flickity sliders, and a Cart Context layer.' },
      { num: '03', title: 'Database & Checkout Integration', desc: 'Configuring a SQLite database alongside Supabase Auth and integrating Razorpay.' },
      { num: '04', title: 'Performance Tuning & Polish', desc: 'Optimizing rendering loops to achieve locked 60fps scrolling and fast page loads.' }
    ],
    stats: [
      { target: 60, prefix: '', suffix: 'fps', label: 'Scroll Performance' },
      { target: 100, prefix: '', suffix: '%', label: 'Order Tracking Accuracy' },
      { target: 1.2, prefix: '<', suffix: 's', label: 'Page Load Time' }
    ],
    nextSlug: 'realstate',
    nextTitle: 'REALSTATE MARKETPLACE'
  },
  'realstate': {
    slug: 'realstate',
    title: 'REALSTATE',
    titleOutline: 'MARKETPLACE',
    subtitle: 'Full-Stack Property Portal',
    desc: 'Designed and developed a multi-role real estate platform with JWT authentication, socket.io messaging, and Cloudinary media uploads.',
    clientOverview: 'A real estate broker collective required an independent marketplace platform to connect buyers directly with verified sellers, removing third-party listing delays.',
    categoryTags: ['Node.js', 'React.js', 'MongoDB'],
    problem: 'Listing delays, lack of real-time communication between parties, and insecure password handling across legacy databases.',
    solution: 'We developed a multi-role real estate platform (Buyers, Sellers, Admins) using MongoDB, JWT authentication, and Bcrypt encryption. Socket.io was integrated to enable instant buyer-seller messaging.',
    outcome: 'Instant real-time messaging, secure password storage, and automated media processing via Cloudinary.',
    bgImg: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop',
    videoUrl: 'https://assets.codepen.io/3364143/7btrrd.mp4',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop', title: 'Property Dashboard', desc: 'Multi-role interface for buyers and sellers.' },
      { img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop', title: 'Interactive Map View', desc: 'Visual search of active listings.' }
    ],
    process: [
      { num: '01', title: 'Database Schema Modeling', desc: 'Designing secure Mongo collections for users, properties, and direct chat logs.' },
      { num: '02', title: 'Authentication & Security Lock', desc: 'Implementing Bcrypt password hashing, JWT session tracking, and Express middleware.' },
      { num: '03', title: 'Real-time WebSocket Sync', desc: 'Configuring Socket.io for immediate direct messaging between property seekers and sellers.' },
      { num: '04', title: 'Cloud Media Pipelines', desc: 'Integrating Cloudinary APIs to process, resize, and store high-resolution property photos.' }
    ],
    stats: [
      { target: 100, prefix: '', suffix: '%', label: 'Secure JWT Auth' },
      { target: 0, prefix: '', suffix: 'ms', label: 'Message Latency' },
      { target: 99, prefix: '', suffix: '/100', label: 'Security Rank' }
    ],
    nextSlug: 'fintrack-pro',
    nextTitle: 'FINTRACK-PRO'
  },
  'fintrack-pro': {
    slug: 'fintrack-pro',
    title: 'FINTRACK',
    titleOutline: 'PRO',
    subtitle: 'Personal Finance Dashboard',
    desc: 'Built a comprehensive vanilla JS personal finance application with Chart.js analytics, multi-currency support, budgets, and goals.',
    clientOverview: 'Designed as a lightweight, private personal finance manager that operates completely client-side to ensure total user data privacy.',
    categoryTags: ['JavaScript', 'Chart.js', 'SaaS'],
    problem: 'Users are reluctant to connect bank accounts to online apps, creating a need for a secure, localized finance tracker.',
    solution: 'We engineered a localized personal finance dashboard leveraging browser LocalStorage, dynamic Chart.js analytics, multi-currency support, and goal tracking.',
    outcome: 'Complete client-side data privacy with fast rendering and instant storage updates.',
    bgImg: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    videoUrl: 'https://assets.codepen.io/3364143/7btrrd.mp4',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop', title: 'Chart.js Analytics', desc: 'Interactive breakdown of monthly income and expenses.' }
    ],
    process: [
      { num: '01', title: 'State & Storage Architecture', desc: 'Establishing robust client-side state mapping with LocalStorage persistence.' },
      { num: '02', title: 'Chart rendering pipelines', desc: 'Configuring Chart.js views to translate financial entries into clean analytics.' },
      { num: '03', title: 'Currency Conversion', desc: 'Implementing client-side currency multipliers supporting global transactions.' }
    ],
    stats: [
      { target: 100, prefix: '', suffix: '%', label: 'Local Data Privacy' },
      { target: 12, prefix: '', suffix: 'ms', label: 'Dashboard Rendering' },
      { target: 0, prefix: '', suffix: 'kb', label: 'Server Costs' }
    ],
    nextSlug: 'digital-agency',
    nextTitle: 'DIGITAL AGENCY'
  },
  'digital-agency': {
    slug: 'digital-agency',
    title: 'DIGITAL',
    titleOutline: 'AGENCY',
    subtitle: 'High-Performance Marketing Platform',
    desc: 'Developed a responsive digital agency website using HTML, CSS, JavaScript, GSAP, and Tailwind CSS, with smooth scrolling and animations.',
    clientOverview: 'An innovative creative firm requested a high-fidelity digital portal to showcase their branding and asset library.',
    categoryTags: ['HTML5', 'Tailwind', 'GSAP'],
    problem: 'Generic landing pages failed to represent the design expertise of the agency, resulting in low inbound leads.',
    solution: 'We created a motion-based agency website utilizing GSAP ScrollTrigger and custom animations to deliver a premium user journey.',
    outcome: 'A highly interactive landing page with smooth scroll experiences.',
    bgImg: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=2000&auto=format&fit=crop',
    videoUrl: 'https://assets.codepen.io/3364143/7btrrd.mp4',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop', title: 'Showcase Grid', desc: 'High-speed loading grid of brand assets.' }
    ],
    process: [
      { num: '01', title: 'Wireframing Motion', desc: 'Establishing visual beats, scroll pin targets, and enter transition markers.' },
      { num: '02', title: 'GSAP Configuration', desc: 'Implementing modular ScrollTrigger scrub rules and custom timeline chains.' }
    ],
    stats: [
      { target: 99, prefix: '', suffix: '/100', label: 'Lighthouse Performance' },
      { target: 30, prefix: '+', suffix: '%', label: 'Inbound Inquiries' },
      { target: 60, prefix: '', suffix: 'fps', label: 'Scroll Performance' }
    ],
    nextSlug: 'luxury-realestate',
    nextTitle: 'LUXURY REAL ESTATE'
  },
  'luxury-realestate': {
    slug: 'luxury-realestate',
    title: 'LUXURY',
    titleOutline: 'ESTATE',
    subtitle: 'High-End Real Estate Showcase',
    desc: 'Designed a motion-based real estate portfolio site with responsive layouts and clean animation effects using Tailwind CSS and JavaScript.',
    clientOverview: 'A developer of luxury properties required an online showcase that matches the premium nature of their physical estates.',
    categoryTags: ['Tailwind', 'JavaScript', 'Design'],
    problem: 'Traditional listings were too cluttered and failed to highlight architectural photography and luxury design features.',
    solution: 'We built a clean, minimalist portfolio site emphasizing full-bleed photography, subtle transitions, and a highly responsive grid layout.',
    outcome: 'A premium real estate gallery focusing on aesthetic visual clarity.',
    bgImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    videoUrl: 'https://assets.codepen.io/3364143/7btrrd.mp4',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop', title: 'Full-bleed Slider', desc: 'Immersive layouts showcasing architectural elements.' }
    ],
    process: [
      { num: '01', title: 'Layout Strategy', desc: 'Structuring CSS grids and layouts to support variable-size photography.' },
      { num: '02', title: 'Frictionless Navigation', desc: 'Implementing clean navigation overlays and transitions using vanilla JS.' }
    ],
    stats: [
      { target: 100, prefix: '', suffix: '%', label: 'Fluid Layouts' },
      { target: 45, prefix: '+', suffix: '%', label: 'Photo Views' },
      { target: 1.5, prefix: '', suffix: 's', label: 'Load Time' }
    ],
    nextSlug: 'iyouglobal',
    nextTitle: 'IYOUGLOBAL.COM'
  },
  'iyouglobal': {
    slug: 'iyouglobal',
    title: 'IYOUGLOBAL',
    titleOutline: 'CORPORATE',
    subtitle: 'Live Enterprise Portal',
    desc: 'Built and structured a responsive corporate website with optimized layout and user-friendly navigation.',
    clientOverview: 'An international corporate solutions provider needed a unified global portal to aggregate business services across multiple regions.',
    categoryTags: ['HTML5', 'CSS3', 'JavaScript'],
    problem: 'Disjointed regional content pages and confusing navigation led to a high bounce rate on service listings.',
    solution: 'We refactored the layout structure to implement clean navigation menus, intuitive paths, and fully responsive layouts.',
    outcome: 'A live, highly optimized corporate website with improved usability.',
    bgImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    videoUrl: 'https://assets.codepen.io/3364143/7btrrd.mp4',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop', title: 'Live Interface', desc: 'Responsive view of the global corporate platform.' }
    ],
    process: [
      { num: '01', title: 'Site Mapping', desc: 'Re-organizing information architecture and navigation hierarchies.' },
      { num: '02', title: 'SEO & Performance Audit', desc: 'Optimizing meta headers, image sizing, and CSS delivery for optimal loading.' }
    ],
    stats: [
      { target: 98, prefix: '', suffix: '%', label: 'Cross-Device Compatibility' },
      { target: 20, prefix: '-', suffix: '%', label: 'Bounce Rate' },
      { target: 100, prefix: '', suffix: '%', label: 'Live Availability' }
    ],
    nextSlug: 'lumiere',
    nextTitle: 'LUMIÈRE PLATFORM'
  }
};

export default function ProjectCaseStudy() {
  const { projectId } = useParams();
  const navigate = useTransitionNavigate();
  const project = caseStudiesData[projectId] || caseStudiesData['nexus-intelligence'];

  const containerRef = useRef(null);
  const galleryTrackRef = useRef(null);
  
  // Custom cursor refs
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  // Scroll to top on project load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // 1. GSAP Scroll Animations
  useEffect(() => {
    const main = containerRef.current;
    if (!main) return;

    // Reset preloader on body
    document.body.classList.remove('preload');

    const ctx = gsap.context(() => {
      // Title line reveals
      gsap.fromTo(".hero-title-line", 
        { y: 150, skewY: 5 }, 
        { y: 0, skewY: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(".fade-up", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }, 
        "-=0.8"
      );

      // Hero background parallax scale
      gsap.fromTo("#hero-bg", 
        { scale: 1.1, y: 0 }, 
        { 
          scale: 1, 
          y: '8%',
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Video scale-up showcase
      gsap.fromTo("#video-container", 
        { scale: 0.8, borderRadius: "80px" },
        { 
          scale: 1, 
          borderRadius: "24px",
          scrollTrigger: {
            trigger: "#video-section",
            start: "top 90%",
            end: "top 30%",
            scrub: 1
          }
        }
      );

      // Horizontal Gallery Scroll (Desktop only)
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const galleryWrapper = main.querySelector('.gallery-wrapper');
        const galleryTrack = galleryTrackRef.current;
        if (galleryWrapper && galleryTrack) {
          const getScrollAmount = () => -(galleryTrack.scrollWidth - window.innerWidth + 100);
          gsap.to(galleryTrack, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: galleryWrapper,
              start: "center center",
              end: () => `+=${galleryTrack.scrollWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true
            }
          });
        }
      });

      // Mobile Horizontal Fallback CSS Override
      mm.add("(max-width: 767px)", () => {
        const track = galleryTrackRef.current;
        if (track) {
          track.style.overflowX = 'auto';
          track.style.scrollSnapType = 'x mandatory';
          const items = track.querySelectorAll('.gallery-item');
          items.forEach(item => {
            item.style.scrollSnapAlign = 'center';
          });
        }
      });

      // Process Timeline line draw
      gsap.to("#timeline-line", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "#process",
          start: "top 50%",
          end: "bottom 80%",
          scrub: true
        }
      });

      // Process steps stagger
      const processSteps = main.querySelectorAll(".process-step");
      processSteps.forEach((step) => {
        gsap.fromTo(step, 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              onEnter: () => {
                const dot = step.querySelector('.step-dot');
                if (dot) {
                  gsap.to(dot, { borderColor: "#a3d4b6", boxShadow: "0 0 15px rgba(163,212,182,0.6)", duration: 0.4 });
                }
              }
            }
          }
        );
      });

      // Results Counters
      gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.to(stat, {
          innerHTML: target,
          scrollTrigger: {
            trigger: "#results",
            start: "top 75%",
          },
          snap: { innerHTML: 1 },
          duration: 2.5,
          ease: "power3.out",
          onUpdate: function() {
            stat.innerHTML = Math.floor(this.targets()[0].innerHTML);
          }
        });
      });

    }, main);

    return () => ctx.revert();
  }, [projectId]);

  // 2. Custom Cursor Lifecycle
  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouse = { x: 0, y: 0 };
    let outlinePos = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Update dot position instantly
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, outline], { opacity: 0 });
    };

    const handleMouseEnter = () => {
      gsap.to([dot, outline], { opacity: 1 });
    };

    // Smooth loop for outline
    const renderOutline = () => {
      const ease = 0.15;
      outlinePos.x += (mouse.x - outlinePos.x) * ease;
      outlinePos.y += (mouse.y - outlinePos.y) * ease;

      gsap.set(outline, { x: outlinePos.x, y: outlinePos.y });
      requestAnimationFrame(renderOutline);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const outlineAnim = requestAnimationFrame(renderOutline);

    // Dynamic hover classes for link cursors
    const applyCursorHovers = () => {
      const hoverElements = document.querySelectorAll('a, button, .cursor-hover');
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(outline, { width: 60, height: 60, backgroundColor: 'rgba(163, 212, 182, 0.1)', borderColor: '#a3d4b6', duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(outline, { width: 40, height: 40, backgroundColor: 'transparent', borderColor: 'rgba(163, 212, 182, 0.5)', duration: 0.2 });
        });
      });
    };
    // Let a short delay pass for elements to render
    setTimeout(applyCursorHovers, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(outlineAnim);
    };
  }, [projectId]);

  // Card Tilt Interaction (Tech stack)
  const handleMouseMoveCard = (e, index) => {
    if (window.innerWidth <= 768) return;
    const card = document.getElementById(`tech-card-${index}`);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeaveCard = (index) => {
    const card = document.getElementById(`tech-card-${index}`);
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <div ref={containerRef} className="bg-[#07080a] text-[#f4f4f5] min-h-screen selection:bg-accent selection:text-bgDark font-sans relative overflow-x-hidden md:cursor-none">
      
      {/* Custom Cursor */}
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />

      {/* Global Noise */}
      <div className="noise-overlay-fixed" />

      {/* Back Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 mix-blend-difference">
          <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto">
              <Link to="/portfolio" className="text-[12px] font-bold tracking-[0.2em] uppercase text-textPrimary hover:text-accent transition-colors cursor-hover">
                  ← Back to Portfolio
              </Link>
              <div className="hidden md:flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <span className="text-[10px] font-mono tracking-[0.1em] text-accent">CASE STUDY : {project.slug.toUpperCase()}</span>
              </div>
              <button onClick={() => navigate('/contact')} className="text-[12px] font-bold tracking-[0.2em] uppercase text-textPrimary hover:text-accent transition-colors cursor-hover">
                  Start Project
              </button>
          </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden z-10" id="hero">
          {/* Parallax Background */}
          <div className="absolute inset-0 z-0 scale-110" id="hero-bg">
              <img src={project.bgImg} alt={project.title} className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-bgDark/40 via-bgDark/60 to-bgDark" />
              {/* Accent Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col items-center text-center pt-20">
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-accent font-semibold mb-6 block fade-up cursor-default">
                  {project.subtitle}
              </span>
              <h1 className="text-[clamp(40px,8vw,120px)] font-[900] leading-[0.9] tracking-tighter mb-8 cursor-default text-white">
                  <span className="line-wrapper"><span className="inline-block hero-title-line">{project.title}</span></span>
                  <span className="line-wrapper"><span className="inline-block hero-title-line text-outline">{project.titleOutline}</span></span>
              </h1>
              <p className="text-[16px] md:text-[20px] text-textSecondary font-medium max-w-[600px] leading-[1.6] mb-12 fade-up">
                  {project.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 fade-up">
                  <a href="#video-section" className="px-8 py-4 bg-accent text-bgDark rounded-full text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-white transition-all hover:scale-105 cursor-hover shadow-[0_0_30px_rgba(163,212,182,0.2)]">
                      Explore Case Study
                  </a>
                  <button onClick={() => navigate('/contact')} className="px-8 py-4 glass-panel text-white rounded-full text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-all hover:scale-105 cursor-hover">
                      Start Project
                  </button>
              </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70 fade-up">
              <span className="text-[9px] uppercase tracking-[0.3em] text-textSecondary font-mono">Scroll</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent"></div>
          </div>
      </section>

      {/* SECTION 2: OVERVIEW */}
      <section className="relative w-full py-24 md:py-40 z-20" id="overview">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              {/* Sticky Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                  <div className="sticky top-40">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold mb-4 block">01 / Overview</span>
                      <h2 className="text-[clamp(32px,4vw,56px)] font-[800] leading-[1.1] tracking-tight mb-6">
                          Architecting<br />Clarity from Chaos.
                      </h2>
                      <p className="text-[15px] md:text-[17px] text-textSecondary leading-[1.7] mb-8 font-light">
                        {project.clientOverview}
                      </p>
                      <div className="flex flex-wrap gap-4">
                          {project.categoryTags.map((tag, idx) => (
                            <span key={idx} className="px-4 py-2 rounded-full glass-panel text-[11px] uppercase tracking-wider text-textPrimary">
                              {tag}
                            </span>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Right Column Cards */}
              <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 pt-12 lg:pt-0">
                  {/* Card 1 */}
                  <div 
                    id="tech-card-0"
                    onMouseMove={(e) => handleMouseMoveCard(e, 0)}
                    onMouseLeave={() => handleMouseLeaveCard(0)}
                    className="glass-card p-8 md:p-12 rounded-[32px] tilt-card transform-gpu"
                  >
                      <h3 className="text-[20px] md:text-[24px] font-bold text-white mb-4 flex items-center gap-4">
                          <span className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">01</span>
                          The Problem
                      </h3>
                      <p className="text-[15px] text-textSecondary leading-[1.6]">
                        {project.problem}
                      </p>
                  </div>

                  {/* Card 2 */}
                  <div 
                    id="tech-card-1"
                    onMouseMove={(e) => handleMouseMoveCard(e, 1)}
                    onMouseLeave={() => handleMouseLeaveCard(1)}
                    className="glass-card p-8 md:p-12 rounded-[32px] tilt-card transform-gpu"
                  >
                      <h3 className="text-[20px] md:text-[24px] font-bold text-white mb-4 flex items-center gap-4">
                          <span className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">02</span>
                          The Solution
                      </h3>
                      <p className="text-[15px] text-textSecondary leading-[1.6]">
                        {project.solution}
                      </p>
                  </div>

                  {/* Card 3 */}
                  <div 
                    id="tech-card-2"
                    onMouseMove={(e) => handleMouseMoveCard(e, 2)}
                    onMouseLeave={() => handleMouseLeaveCard(2)}
                    className="glass-card p-8 md:p-12 rounded-[32px] tilt-card transform-gpu"
                  >
                      <h3 className="text-[20px] md:text-[24px] font-bold text-white mb-4 flex items-center gap-4">
                          <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">03</span>
                          The Outcome
                      </h3>
                      <p className="text-[15px] text-textSecondary leading-[1.6]">
                        {project.outcome}
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 3: VIDEO SHOWCASE */}
      <section className="relative w-full py-12 md:py-24 z-20" id="video-section">
          <div className="max-w-[1600px] mx-auto px-4 md:px-12">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] md:rounded-[40px] overflow-hidden group cursor-hover" id="video-container">
                  <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none">
                      <source src={project.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-bgDark/20 group-hover:bg-bgDark/10 transition-colors duration-500" />
                  <div className="absolute inset-0 border border-white/10 rounded-[24px] md:rounded-[40px] pointer-events-none" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 glass-panel rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-90 group-hover:scale-100 shadow-[0_0_40px_rgba(163,212,182,0.3)]">
                      <svg className="w-8 h-8 md:w-12 md:h-12 text-accent translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 4: HORIZONTAL GALLERY */}
      <section className="relative w-full bg-bgDark z-20" id="gallery-section">
          <div className="gallery-wrapper h-[100dvh] w-full flex flex-col justify-center overflow-hidden">
              <div className="px-6 md:px-12 mb-8 md:mb-12">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold mb-2 block">02 / Interfaces</span>
                  <h2 className="text-[28px] md:text-[40px] font-[800] leading-tight tracking-tight">Design System</h2>
              </div>
              
              {/* Horizontal Scrolling Track */}
              <div ref={galleryTrackRef} className="gallery-track flex gap-6 md:gap-12 px-6 md:px-12 w-max items-center h-[50vh] md:h-[60vh]">
                  {project.gallery.map((item, idx) => (
                    <div key={idx} className="gallery-item relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-full rounded-[24px] md:rounded-[32px] overflow-hidden glass-card group">
                        <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/20 to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h4 className="text-[20px] md:text-[28px] font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-[14px] text-textSecondary max-w-[400px]">{item.desc}</p>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 5: PROCESS */}
      <section className="relative w-full py-24 md:py-40 z-20" id="process">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
              
              {/* Sticky Heading */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                  <div className="sticky top-40">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold mb-4 block">03 / Execution</span>
                      <h2 className="text-[28px] md:text-[40px] font-[800] leading-tight tracking-tight">
                          The Process
                      </h2>
                  </div>
              </div>

              {/* Steps Area */}
              <div className="lg:col-span-7 pl-10 md:pl-20 border-l border-white/10 relative flex flex-col gap-12 md:gap-20 py-4">
                  {/* SVG Line Draw */}
                  <div id="timeline-line" className="absolute top-0 left-[-1px] w-[1px] bg-accent transition-all duration-[0ms]" style={{ height: '0%' }} />

                  {project.process.map((step, idx) => (
                    <div key={idx} className="process-step relative">
                        <div className="absolute -left-[41px] md:-left-[81px] top-1.5 w-4 h-4 rounded-full bg-bgDark border-2 border-white/30 z-10 step-dot" />
                        <h3 className="text-[20px] md:text-[24px] font-bold text-white mb-3">{step.num}. {step.title}</h3>
                        <p className="text-[14px] md:text-[15px] text-textSecondary leading-[1.6] max-w-[600px]">{step.desc}</p>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 6: RESULTS */}
      <section className="relative w-full py-32 md:py-48 z-20" id="results">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
              <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold mb-4 block">04 / The Impact</span>
              <h2 className="text-[clamp(32px,4vw,56px)] font-[800] leading-[1.1] tracking-tight mb-20 max-w-[800px]">
                  Measurable performance, definitive growth.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <div className="text-[clamp(60px,8vw,100px)] font-[900] text-white leading-none text-glow mb-4">
                            {stat.prefix && <span className="text-accent text-[clamp(40px,5vw,70px)]">{stat.prefix}</span>}
                            <span className="stat-number font-black" data-target={stat.target}>0</span>
                            {stat.suffix && <span className="text-accent text-[clamp(40px,5vw,70px)]">{stat.suffix}</span>}
                        </div>
                        <span className="text-[14px] uppercase tracking-[0.15em] text-textSecondary font-bold">{stat.label}</span>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* SECTION 7: CTA / NEXT PROJECT */}
      <section className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center z-20 border-t border-white/5" id="cta">
          {/* Abstract Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen z-0" />

          <div 
            onClick={() => navigate(`/project/${project.nextSlug}`, project.nextTitle)}
            className="relative z-10 px-6 cursor-pointer group flex flex-col items-center"
          >
              <span className="text-[11px] uppercase tracking-[0.25em] text-textSecondary group-hover:text-accent transition-colors mb-4 block">Next Case Study</span>
              <h2 className="text-[clamp(36px,6vw,90px)] font-[900] leading-none text-white tracking-tighter group-hover:text-accent transition-colors flex flex-col items-center gap-4">
                  <span>{project.nextTitle}</span>
                  <span className="w-12 h-[2px] bg-white group-hover:w-20 group-hover:bg-accent transition-all duration-300"></span>
              </h2>
          </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 text-center text-[12px] text-textSecondary tracking-wider uppercase bg-bgDark relative z-20">
          © 2026 Portfolio. Crafted with Precision.
      </footer>

    </div>
  );
}
