import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Certifications() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.5)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const certs = [
    { title: "Claude Code 101", issuer: "Anthropic", date: "Apr 2026" },
    { title: "Claude 101", issuer: "Anthropic", date: "Apr 2026" },
    { title: "Fundamental Algorithms: Design & Analysis (Elite)", issuer: "NPTEL, IIT Kharagpur", date: "Jan–Feb 2026" },
    { title: "Generative AI Mastermind", issuer: "Outskill", date: "2026" },
    { title: "Pearson MePro Level 6 – English Proficiency", issuer: "Pearson", date: "Jan 2026" },
    { title: "Tracing the Invisible: OSINT & Digital Footprint", issuer: "IITM BS", date: "Aug 2025" },
    { title: "Skills Scribble", issuer: "Google Arcade SkillsBoost", date: "Sep 2025" },
    { title: "Skills Boost Arcade Base Camp", issuer: "Google Arcade SkillsBoost", date: "Sep 2025" },
  ];

  return (
    <section id="certifications" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black/20">
      <h2 className="text-4xl md:text-5xl font-bold mb-12"><span className="text-accent">#</span> Certifications</h2>
      
      <div className="flex flex-wrap gap-4">
        {certs.map((cert, idx) => (
          <div key={idx} className="cert-badge flex flex-col px-5 py-4 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
            <span className="font-bold text-white mb-1">{cert.title}</span>
            <span className="text-sm text-textSecondary">{cert.issuer} • {cert.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
