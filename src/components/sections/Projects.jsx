import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projectsList = [
  {
    title: "To‑Do List Manager",
    tagline: "A tiny terminal app to dump your brain into tasks.",
    description: "A console-based to‑do list where you can add tasks, see what’s pending, and remove things once you’re done. Built with Python and basic date/time logic, focused on clear prompts and structure.",
    tags: ["Python", "Console", "Productivity"],
    linkText: "View code",
    linkUrl: "https://github.com/Nikispace/Decodelabs-internship/blob/main/TASK-1-Nikitha%20M"
  },
  {
    title: "Expense Tracker",
    tagline: "Because “where did my money go?” shouldn’t be a mystery.",
    description: "A console-based expense tracker to log expenses by category, set limits, and view weekly and monthly summaries. Written in Python with a menu-driven flow and simple reports to spot spending patterns.",
    tags: ["Python", "Console", "Data"],
    linkText: "View code",
    linkUrl: "https://github.com/Nikispace/Decodelabs-internship/blob/main/TASK-2-Nikitha%20M"
  },
  {
    title: "Random Password Generator",
    tagline: "You pick the rules. It spits out chaos.",
    description: "A retro-style Tkinter app that generates passwords based on length and character types, with a simple strength indicator. Built to practise GUI programming and user-friendly design in Python.",
    tags: ["Python", "Tkinter", "Security"],
    linkText: "View code",
    linkUrl: "https://github.com/Nikispace/Decodelabs-internship/blob/main/Random%20password%20generator%20using%20python.py"
  },
  {
    title: "Quiz Generator",
    tagline: "Practice mode for your brain, powered by Python.",
    description: "An in-progress quiz generator that will serve questions from a small question bank, track scores, and give simple feedback. Starting as a console app, with room to grow into a GUI or web version.",
    tags: ["Python", "Console"],
    linkText: "Details",
    linkUrl: "#" // placeholder
  },
  {
    title: "Personal Portfolio Website",
    tagline: "This website… about this website.",
    description: "A fresh HTML/CSS/JS portfolio to bring my projects, achievements, and creative work into one place. Responsive, with light/dark modes and room for future scroll animations and typography experiments.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    linkText: "View code",
    linkUrl: "https://github.com/Nikispace/portfolio" // Updated with a plausible repo if available
  },
  {
    title: "QR‑Driven Menu Display",
    tagline: "Scan, tap, read. No laminated menus required.",
    description: "A static, mobile-first web page that shows a digital menu when someone scans a QR code. Designed for quick reading on phones without extra clicks or clutter.",
    tags: ["HTML", "CSS", "JavaScript"],
    linkText: "View code",
    linkUrl: "https://github.com/Nikispace/QR-driven-menu-display"
  }
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-16"><span className="text-accent">#</span> Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projectsList.map((project, i) => (
          <div 
            key={i} 
            className="project-card flex flex-col justify-between group p-8 rounded-3xl bg-gray-900/30 border border-gray-800 hover:bg-gray-800/40 hover:border-accent/50 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <h3 className="text-2xl font-bold mb-1 group-hover:text-accent-secondary transition-colors">{project.title}</h3>
              <p className="text-sm font-medium text-accent mb-4">{project.tagline}</p>
              <p className="text-textSecondary mb-8 text-base leading-relaxed">{project.description}</p>
            </div>
            
            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 bg-black/50 rounded-full text-gray-300 border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <a 
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 text-sm font-semibold bg-white text-bg rounded-full hover:bg-accent hover:text-white transition-colors"
                >
                  {project.linkText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
