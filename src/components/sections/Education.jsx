import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const eduItems = [
    {
      title: "B.E. Computer Science Engineering",
      institution: "Velammal Institute of Technology, Chennai",
      year: "2025 – Present",
      grade: "CGPA 9.16 (1st sem)"
    },
    {
      title: "B.S. Data Science Applications (Foundation Level)",
      institution: "IIT Madras, Chennai",
      year: "2025 – Present",
      grade: "CGPA 8.33 (Foundation Level Term 2)"
    },
    {
      title: "Class 12, CBSE",
      institution: "Everwin Vidhyashram, Kolathur, Chennai",
      year: "2025",
      grade: "89.4%"
    },
    {
      title: "Class 10, CBSE",
      institution: "Everwin Vidhyashram, Kolathur, Chennai",
      year: "2023",
      grade: "94.2%"
    }
  ];

  return (
    <section id="education" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-12"><span className="text-accent">#</span> Education</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eduItems.map((item, idx) => (
          <div key={idx} className="edu-card p-6 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors">
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-textSecondary mb-2">{item.institution}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-accent-secondary">{item.year}</span>
              <span className="bg-gray-800 px-3 py-1 rounded-full text-gray-300 font-medium">{item.grade}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
