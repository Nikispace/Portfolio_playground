import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-category', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      // Animate progress bars
      gsap.fromTo('.skill-fill', 
        { width: '0%' },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          width: (i, el) => el.getAttribute('data-width'),
          duration: 1.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const SkillBar = ({ name, level }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-textSecondary">{level}%</span>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="skill-fill h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full relative"
          data-width={`${level}%`}
        >
          {/* Paw print cap */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 text-[10px] drop-shadow-md">
            🐾
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-8 md:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-16"><span className="text-accent">#</span> Arsenal</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="skill-category">
          <h3 className="text-xl font-semibold mb-6 text-gray-300 border-b border-gray-800 pb-2">Languages & Tools</h3>
          <SkillBar name="Python" level={85} />
          <SkillBar name="C++ (Basic)" level={40} />
          <SkillBar name="Git & GitHub" level={75} />
          <SkillBar name="VS Code & Colab" level={90} />
        </div>

        <div className="skill-category">
          <h3 className="text-xl font-semibold mb-6 text-gray-300 border-b border-gray-800 pb-2">AI & Data</h3>
          <SkillBar name="Pandas" level={80} />
          <SkillBar name="NumPy" level={75} />
          <SkillBar name="Matplotlib" level={70} />
          <SkillBar name="Machine Learning (Basics)" level={50} />
        </div>

        <div className="skill-category">
          <h3 className="text-xl font-semibold mb-6 text-gray-300 border-b border-gray-800 pb-2">Creative</h3>
          <SkillBar name="ComfyUI" level={65} />
          <SkillBar name="Prompt Engineering" level={80} />
          <SkillBar name="Manga/Comic Creation" level={60} />
        </div>
      </div>
    </section>
  );
}
