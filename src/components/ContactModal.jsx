import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContactModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const innerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;
    const inner = innerRef.current;
    if (!modal || !inner) return;

    if (isOpen) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('modal-open');
      
      // GSAP Enter Animation
      gsap.fromTo(modal, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
      );
      gsap.fromTo(inner, 
        { opacity: 0, scale: 0.95, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1, overwrite: 'auto' }
      );
    } else {
      document.body.classList.remove('modal-open');
      // GSAP Leave Animation
      gsap.to(inner, { opacity: 0, scale: 0.95, y: 10, duration: 0.3, ease: 'power2.in', overwrite: 'auto' });
      gsap.to(modal, { 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in', 
        delay: 0.1,
        overwrite: 'auto',
        onComplete: () => {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      });
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    const originalText = submitBtn.innerText;
    
    // Set loading state
    submitBtn.innerText = "Sending...";
    submitBtn.classList.add('opacity-80', 'cursor-wait');
    
    setTimeout(() => {
      alert('Your request has been submitted successfully!');
      
      // Reset form & styling
      submitBtn.innerText = originalText;
      submitBtn.classList.remove('opacity-80', 'cursor-wait');
      form.reset();
      
      onClose();
    }, 800);
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div 
      id="contact-modal" 
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[99999] hidden items-center justify-center bg-[#07080a]/80 backdrop-blur-xl opacity-0"
    >
      <div 
        ref={innerRef}
        className="w-full max-w-2xl mx-auto p-8 sm:p-10 glass-card rounded-3xl relative border border-[#a3d4b6]/25 shadow-[0_30px_100px_rgba(0,0,0,0.8)] transform scale-95 mx-4"
      >
        <button 
          id="close-contact" 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#a1a1aa] hover:text-white transition-colors duration-300 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 z-10 cursor-pointer" 
          aria-label="Close Contact Modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="mb-8 relative z-10">
          <span className="inline-block text-[#a3d4b6] font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-2">Let's Connect</span>
          <h2 className="text-3xl sm:text-4xl font-[900] text-white tracking-tight leading-[1.1]">Start Your Project</h2>
        </div>

        <form id="contact-form" ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              className="w-full p-4 rounded-[16px] bg-white/[0.03] border border-white/10 text-white placeholder-[#71717a] focus:outline-none focus:border-[#a3d4b6]/60 focus:bg-white/[0.05] transition-all duration-300"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              className="w-full p-4 rounded-[16px] bg-white/[0.03] border border-white/10 text-white placeholder-[#71717a] focus:outline-none focus:border-[#a3d4b6]/60 focus:bg-white/[0.05] transition-all duration-300"
            />
          </div>
          <input 
            type="text" 
            placeholder="Project Type / Budget" 
            className="w-full p-4 rounded-[16px] bg-white/[0.03] border border-white/10 text-white placeholder-[#71717a] focus:outline-none focus:border-[#a3d4b6]/60 focus:bg-white/[0.05] transition-all duration-300"
          />
          <textarea 
            placeholder="Tell us about your project..." 
            rows="4" 
            className="w-full p-4 rounded-[16px] bg-white/[0.03] border border-white/10 text-white placeholder-[#71717a] focus:outline-none focus:border-[#a3d4b6]/60 focus:bg-white/[0.05] transition-all duration-300 resize-none"
          ></textarea>
          
          <button 
            type="submit" 
            className="w-full bg-[#a3d4b6] text-[#07080a] py-4 rounded-[16px] text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(163,212,182,0.15)] hover:shadow-[0_0_30px_rgba(163,212,182,0.3)] mt-2 cursor-pointer"
          >
            Submit Request
          </button>
        </form>
        
        {/* Subtle atmospheric glow in modal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#a3d4b6]/[0.05] blur-[60px] rounded-full pointer-events-none z-0"></div>
      </div>
    </div>
  );
}
