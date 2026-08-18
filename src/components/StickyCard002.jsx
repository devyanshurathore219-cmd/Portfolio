import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransitionNavigate } from '../App';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cn = (...classes) => classes.filter(Boolean).join(' ');

export function StickyCard002({
  cards,
  className,
  containerClassName,
  imageClassName,
}) {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const navigate = useTransitionNavigate();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const imageElements = imageRefs.current.filter(Boolean);
    const totalCards = imageElements.length;

    if (totalCards === 0) return;

    // Reset initial states for cards
    gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

    for (let i = 1; i < totalCards; i++) {
      if (imageElements[i]) {
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }
    }

    const stickyCardsEl = container.querySelector(".sticky-cards");
    if (!stickyCardsEl) return;

    // Create ScrollTrigger timeline pinned at top top when scrolled to bottom section
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickyCardsEl,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalCards - 1)}`,
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    for (let i = 0; i < totalCards - 1; i++) {
      const currentImage = imageElements[i];
      const nextImage = imageElements[i + 1];
      const position = i;
      if (!currentImage || !nextImage) continue;

      scrollTimeline.to(
        currentImage,
        {
          scale: 0.7,
          rotation: 5,
          duration: 1,
          ease: "none",
        },
        position
      );

      scrollTimeline.to(
        nextImage,
        {
          y: "0%",
          duration: 1,
          ease: "none",
        },
        position
      );
    }

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      scrollTimeline.kill();
      if (scrollTimeline.scrollTrigger) {
        scrollTimeline.scrollTrigger.kill();
      }
    };
  }, [cards]);

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <div className="sticky-cards relative flex h-screen w-full items-center justify-center p-3 lg:p-8">
        <div
          className={cn(
            "relative h-[85%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl border border-white/10 bg-[#07080a]",
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id || i}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full rounded-4xl overflow-hidden shadow-2xl group border border-white/10"
              style={{
                willChange: "transform",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={card.image}
                alt={card.alt || card.title || ""}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                  imageClassName
                )}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

              {/* Card Details Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 z-10 text-left">
                <div className="flex justify-between items-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#a3d4b6]">
                    0{i + 1} / 0{cards.length} — {card.category || 'PROJECT SHOWCASE'}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                    {card.title}
                  </h3>
                  {card.tech && (
                    <span className="text-xs font-mono text-[#a3d4b6] uppercase tracking-wider block mb-4">
                      {card.tech}
                    </span>
                  )}
                  <button
                    onClick={() => navigate(`/project/${card.id}`, card.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#a3d4b6] text-[#07080a] font-bold text-xs uppercase tracking-widest hover:bg-white transition-all cursor-pointer shadow-lg"
                  >
                    <span>View Case Study</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
