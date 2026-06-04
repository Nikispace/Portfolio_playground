import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projectsList = [
  {
    title: "Random Password Generator",
    description: "A secure, customizable python tool to generate strong passwords.",
    tags: ["Python", "Security"]
  },
  {
    title: "Expense Tracker",
    description: "Data-driven CLI application to track and visualize personal expenses.",
    tags: ["Python", "Pandas", "CLI"]
  },
  {
    title: "AI Manga Concept Generator",
    description: "Generates creative manga concepts and prompts using LLMs.",
    tags: ["AI", "Prompt Engineering"]
  },
  {
    title: "Data Visualization Experiments",
    description: "Exploratory data analysis notebooks on various datasets.",
    tags: ["Jupyter", "Matplotlib", "Seaborn"]
  }
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 80,
        rotationX: -15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-8 md:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-16"><span className="text-accent">#</span> Selected Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsList.map((project, i) => (
          <div 
            key={i} 
            className="project-card relative group p-8 rounded-3xl bg-gray-900/30 border border-gray-800 hover:bg-gray-800/50 transition-all duration-500 overflow-hidden"
          >
            {/* Subtle Cat Paw hover effect background */}
            <div className="absolute -right-10 -bottom-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500 text-[150px] pointer-events-none">
              🐾
            </div>
            
            <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent-secondary transition-colors">{project.title}</h3>
            <p className="text-textSecondary mb-8 text-lg">{project.description}</p>
            
            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-sm font-medium hover:text-accent underline underline-offset-4">GitHub</a>
                <a href="#" className="text-sm font-medium hover:text-accent-secondary underline underline-offset-4">Demo</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
