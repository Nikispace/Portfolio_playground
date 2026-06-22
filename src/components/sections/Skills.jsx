import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skillGroups = [
  {
    category: "Code",
    items: ["Python", "C, C++ (basic)", "SQL (basic)"]
  },
  {
    category: "Data & analysis",
    items: ["Basic statistics", "Data analysis", "NumPy", "Matplotlib", "Google Sheets", "Google Colab"]
  },
  {
    category: "Web & tools",
    items: ["HTML", "CSS", "Basic JavaScript", "Git & GitHub", "GitHub Pages", "Google Sites", "VS Code", "Python IDLE", "ngrok"]
  },
  {
    category: "AI helpers",
    items: ["Gemini", "Claude", "ChatGPT / LLMs", "ComfyUI"]
  },
  {
    category: "Creative & editing",
    items: ["Canva + Canva AI", "Capcut", "Static Instagram posts"]
  },
  {
    category: "Human stuff",
    items: ["Writing clearly", "Figuring things out step by step", "Learning on my own", "Staying consistent"]
  }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-group', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black/20">
      <h2 className="text-4xl md:text-5xl font-bold mb-16"><span className="text-accent">#</span> Skills</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {skillGroups.map((group, idx) => (
          <div key={idx} className="skill-group flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-white border-b border-gray-800 pb-2">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map(item => (
                <span 
                  key={item} 
                  className="px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-full text-sm text-textSecondary hover:text-white hover:border-accent hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
