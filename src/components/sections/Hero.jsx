import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero({ isLoaded }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Kinetic typography for the headline: stagger words
      gsap.from('.hero-word', {
        y: 80,
        opacity: 0,
        rotationZ: 5,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
        delay: 0.2
      });

      // Sub-headline and small line fade in
      gsap.from('.hero-sub', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8
      });
      
      // Buttons fade in
      gsap.from('.hero-btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const headline = "Built from overthinking, late‑night ideas, and too many open tabs.";

  return (
    <section id="hero" ref={containerRef} className="min-h-screen w-full flex items-center px-6 md:px-12 lg:px-24 relative pt-20 pb-10">
      
      {/* Background gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent pointer-events-none -z-10" />

      {/* Container: Stack on mobile, two columns on desktop */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between z-10 h-full">
        
        {/* Left Column: Text */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6 mt-10 lg:mt-0">
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black tracking-tight leading-[1.1] flex flex-wrap gap-x-3 gap-y-2">
            {headline.split(' ').map((word, i) => (
              <span key={i} className="hero-word overflow-hidden inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 pb-1">
                {word}
              </span>
            ))}
          </h1>
          
          <p className="hero-sub text-lg sm:text-xl text-textSecondary font-light leading-relaxed max-w-2xl">
            I’m <span className="text-accent font-semibold">Nikitha M</span> — a CSE + Data Science student who turns random Python, data, and AI experiments into small tools, stories, and vibes.
          </p>
          
          <p className="hero-sub text-sm font-medium text-accent-secondary uppercase tracking-wider">
            Currently juggling college, some side projects.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="#projects" className="hero-btn px-8 py-3 bg-accent text-white font-bold rounded-full hover:bg-opacity-80 transition-all shadow-lg hover:shadow-accent/50 hover:scale-105 active:scale-95">
              See my projects
            </a>
            <a href="https://github.com/Nikispace" target="_blank" rel="noopener noreferrer" className="hero-btn px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-all border border-gray-700 hover:border-gray-500 hover:scale-105 active:scale-95">
              Stalk my GitHub
            </a>
            <a href="#contact" className="hero-btn px-8 py-3 bg-transparent text-textSecondary font-medium rounded-full hover:text-white transition-colors underline underline-offset-4">
              Say hi
            </a>
          </div>
        </div>

        {/* Right Column: 3D Cat Spacer */}
        {/* The actual 3D cat is in the fixed canvas, this just ensures the layout doesn't overlap on desktop */}
        <div className="w-full lg:w-[45%] h-[40vh] lg:h-full pointer-events-none" />

      </div>
    </section>
  );
}
