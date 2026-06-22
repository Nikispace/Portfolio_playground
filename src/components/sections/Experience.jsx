import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black/20">
      <h2 className="text-4xl md:text-5xl font-bold mb-12"><span className="text-accent">#</span> Experience</h2>
      
      <div className="exp-card relative pl-8 border-l-2 border-gray-800 ml-4 lg:w-2/3">
        {/* Timeline dot */}
        <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-1 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
        
        <h3 className="text-2xl font-bold text-white">Python Programming Intern</h3>
        <p className="text-accent-secondary font-medium mb-4">DecodeLabs <span className="text-textSecondary text-sm ml-2 font-normal">(May 2026 – June 2026)</span></p>
        
        <p className="text-textSecondary mb-4">
          I joined DecodeLabs as a Python intern to practise building small but complete projects. I worked on a to‑do list manager, an expense tracker, and a GUI‑based random password generator.
        </p>
        <ul className="list-disc list-inside text-textSecondary space-y-2 marker:text-gray-600">
          <li>Wrote and tested console and GUI apps in Python IDLE.</li>
          <li>Used Git and GitHub for version control and submissions.</li>
          <li>Focused on clean structure, readable code, and simple documentation.</li>
        </ul>
      </div>
    </section>
  );
}
