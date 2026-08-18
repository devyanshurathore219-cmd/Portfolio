import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Particles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const particles = containerRef.current.children;
    let ctx = gsap.context(() => {
      Array.from(particles).forEach((particle) => {
        gsap.to(particle, {
          y: `+=${Math.random() * 100 - 50}`,
          x: `+=${Math.random() * 100 - 50}`,
          opacity: Math.random() * 0.5 + 0.1,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
        />
      ))}
    </div>
  );
};

const ContactFinale = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success
  const formRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let ctx = gsap.context(() => {
      const elements = [headlineRef.current, ...formRef.current.elements].filter(Boolean);
      
      if (!isReduced) {
        gsap.fromTo(elements, 
          { y: 40, opacity: 0, filter: "blur(4px)" },
          { 
            y: 0, opacity: 1, filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
            }
          }
        );
      }
    });
    
    return () => ctx.revert();
  }, []);

  const validate = () => {
    let newErrors = {};
    if (formData.name.length < 2 || formData.name.length > 80) {
      newErrors.name = 'Name must be between 2 and 80 characters.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.email.length < 5 || formData.email.length > 254) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.message.length < 10 || formData.message.length > 1000) {
      newErrors.message = 'Message must be between 10 and 1000 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus('loading');
    
    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:devyanshurathore219@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitStatus('success');
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0d1117] flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <Particles />
      
      <div className="z-10 w-full max-w-3xl flex flex-col items-center">
        <h2 
          ref={headlineRef}
          className="text-[#f4f4f5] text-5xl md:text-7xl mb-12 text-center"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Let's Build Something Extraordinary
        </h2>

        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="w-full flex flex-col gap-6"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#a1a1aa] text-sm">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="bg-[rgba(255,255,255,0.05)] backdrop-blur border border-[rgba(255,255,255,0.1)] rounded-md p-3 text-[#f4f4f5] focus:outline-none focus:border-[#a3d4b6] transition-colors"
            />
            {errors.name && <p id="name-error" className="text-red-400 text-xs" aria-live="polite">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#a1a1aa] text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="bg-[rgba(255,255,255,0.05)] backdrop-blur border border-[rgba(255,255,255,0.1)] rounded-md p-3 text-[#f4f4f5] focus:outline-none focus:border-[#a3d4b6] transition-colors"
            />
            {errors.email && <p id="email-error" className="text-red-400 text-xs" aria-live="polite">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[#a1a1aa] text-sm">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="bg-[rgba(255,255,255,0.05)] backdrop-blur border border-[rgba(255,255,255,0.1)] rounded-md p-3 text-[#f4f4f5] focus:outline-none focus:border-[#a3d4b6] transition-colors resize-y"
            />
            {errors.message && <p id="message-error" className="text-red-400 text-xs" aria-live="polite">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitStatus === 'loading' || submitStatus === 'success'}
            className="mt-4 bg-[#a3d4b6] text-[#07080a] font-medium py-3 px-6 rounded-md hover:bg-[#86b598] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitStatus === 'loading' ? 'Opening mail...' : 'Send Message'}
          </button>
          
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-[rgba(255,255,255,0.05)] border border-[#a3d4b6] rounded-md text-[#a3d4b6] text-sm text-center" aria-live="polite">
              Your mail client was opened. No message was transmitted by this page. You can also reach me at devyanshurathore219@gmail.com
            </div>
          )}
        </form>

        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          <a href="https://github.com/devyanshurathore219-cmd" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[rgba(255,255,255,0.05)] backdrop-blur rounded-full text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[rgba(255,255,255,0.08)] transition-all border border-[rgba(255,255,255,0.1)]">
            GitHub
          </a>
          <a href="#" className="px-4 py-2 bg-[rgba(255,255,255,0.05)] backdrop-blur rounded-full text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[rgba(255,255,255,0.08)] transition-all border border-[rgba(255,255,255,0.1)]">
            LinkedIn
          </a>
          <a href="mailto:devyanshurathore219@gmail.com" className="px-4 py-2 bg-[rgba(255,255,255,0.05)] backdrop-blur rounded-full text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[rgba(255,255,255,0.08)] transition-all border border-[rgba(255,255,255,0.1)]">
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactFinale;
