import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple staggered fade in for the text
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });
      
      // Badges fade in
      gsap.from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex items-center px-8 md:px-24">
      <div className="w-full md:w-1/2 flex flex-col gap-6 z-10">
        <h1 className="hero-text text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Hi, I’m <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">
            [Your Name]
          </span>
        </h1>
        <p className="hero-text text-xl md:text-2xl text-textSecondary font-light">
          Python Developer &middot; AI & Data Science Learner from Chennai
        </p>
        <p className="hero-text text-lg max-w-md text-textSecondary opacity-80">
          I build intelligent tools and immersive experiences. Currently exploring the intersection of data and creativity.
        </p>
        
        <div className="hero-text flex gap-4 mt-4">
          <button className="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-opacity-80 transition-all border border-accent">
            View Projects
          </button>
          <button className="px-8 py-3 bg-transparent text-white font-semibold rounded-full hover:bg-white hover:text-bg transition-all border border-white">
            Download CV
          </button>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'ComfyUI', 'Git'].map(tech => (
            <span key={tech} className="hero-badge px-4 py-1.5 rounded-full border border-gray-700 bg-gray-900/50 text-sm backdrop-blur-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* The right half is empty here to let the fixed 3D canvas shine through */}
      <div className="hidden md:block w-1/2 h-full pointer-events-none"></div>
    </section>
  );
}
