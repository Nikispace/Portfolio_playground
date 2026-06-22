import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.achiev-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const achievements = [
    "IITM BS Topper Badges in Statistics for Data Science 1 & 2, Mathematics for Data Science 1, and English 1.",
    "Anubhuti 3.0 – Poetic Projections (Margazhi’26, IITM BS) – poetry / creative writing.",
    "Qutopia – Margazhi 2026 (IITM BS).",
    "Festive Frames – Photography Competition (IRIS Society, IITM BS) – “Emotions of Diwali”.",
    "Just A Minute – Elocution Challenge (CuriousTimes.in & Everwin Vidhyashram, June 2021).",
    "Regular participation in IITM BS events like Diwali Delights, Shutter Safari, Anubhuti, and “Manthan-e-Alfaaz”, including a Photographer of the Week recognition."
  ];

  return (
    <section id="achievements" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-12"><span className="text-accent">#</span> Achievements & Events</h2>
      
      <div className="relative border-l-2 border-gray-800 ml-4 pl-8 space-y-8">
        {achievements.map((text, idx) => (
          <div key={idx} className="achiev-item relative">
            <div className="absolute w-3 h-3 bg-accent-secondary rounded-full -left-[38.5px] top-1.5 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
            <p className="text-lg text-textSecondary leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
