import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-12"><span className="text-accent">#</span> About</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="about-content text-textSecondary text-lg leading-relaxed flex flex-col gap-6">
          <p>
            I’m <span className="text-white font-medium">Nikitha</span> from Chennai, doing a mix of B.E. CSE at Velammal Institute of Technology and B.S. in Data Science Applications at IIT Madras. Most of my ideas start as <span className="text-accent-secondary italic">“what if I try this once?”</span> and then slowly turn into tiny projects that keep evolving.
          </p>
          <p>
            I like building small Python scripts, data experiments, and AI-powered workflows that actually solve some problem in my day, even if it’s a very tiny one. When I’m not debugging, I’m usually writing, clicking photos, or planning my next web or AI experiment.
          </p>
          <p>
            I’m still early in my journey, so this portfolio is more like a live lab: things break, improve, and get redesigned as I learn.
          </p>
        </div>

        {/* Optional illustration / visual block */}
        <div className="about-content hidden lg:flex justify-center items-center">
          <div className="w-64 h-64 rounded-full border-2 border-gray-800 bg-gray-900/50 flex items-center justify-center relative shadow-[0_0_50px_rgba(168,85,247,0.1)]">
            <span className="text-6xl opacity-50">✨</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-accent-secondary/20 rounded-full blur-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
