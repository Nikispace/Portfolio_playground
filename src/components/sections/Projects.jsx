import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projectsList = [
  {
    title: "General Quiz Portal",
    tagline: "Dynamic quiz platform for active learning.",
    description: "An interactive web-based portal to take quizzes, track performance, and practice knowledge. Built with a clean interface, dynamic question serving, and automated scoring.",
    tags: ["HTML", "CSS", "JavaScript", "Quiz"],
    linkText: "View Repository",
    linkUrl: "https://github.com/Nikispace/General_quiz_portal"
  },
  {
    title: "Olone AI Study Packages Game",
    tagline: "Gamified learning powered by educational modules.",
    description: "An engaging study package game designed to make learning interactive and gamified. Integrates conceptual study materials with gaming elements for a highly retentive experience.",
    tags: ["Game Dev", "AI Study", "HTML/CSS", "JavaScript"],
    linkText: "Play Game",
    linkUrl: "https://github.com/Nikispace/Olone_Ai_Study_Packages_game"
  },
  {
    title: "QR‑Driven Menu Display",
    tagline: "Scan, tap, and browse menus on your phone.",
    description: "A static, mobile-first web page that displays a digital menu when scanning a QR code. Optimized for quick loading on mobile browsers with a beautiful, clean layout.",
    tags: ["HTML", "CSS", "JavaScript", "Mobile-First"],
    linkText: "View Repository",
    linkUrl: "https://github.com/Nikispace/QR-driven-menu-display"
  },
  {
    title: "To‑Do List Manager",
    tagline: "Organize your tasks efficiently in the console.",
    description: "A terminal-based productivity tool to manage tasks, schedule todo items, and monitor completion status. Developed during DecodeLabs internship to demonstrate clean Python script execution.",
    tags: ["Python", "CLI", "Internship Task"],
    linkText: "View Code",
    linkUrl: "https://github.com/Nikispace/Decodelabs-internship/blob/main/TASK-1-Nikitha%20M"
  },
  {
    title: "Expense Tracker",
    tagline: "Personal finance and budget analytics made simple.",
    description: "A menu-driven console application to log expenses by category, analyze weekly/monthly spending patterns, and set limits. Built as a task during DecodeLabs internship.",
    tags: ["Python", "Finance", "Internship Task"],
    linkText: "View Code",
    linkUrl: "https://github.com/Nikispace/Decodelabs-internship/blob/main/TASK-2-Nikitha%20M"
  },
  {
    title: "Random Password Generator",
    tagline: "Secure, custom password creation GUI.",
    description: "A GUI application built with Python and Tkinter that generates strong, customizable passwords. Includes character selections, length adjustments, and password strength indicators.",
    tags: ["Python", "Tkinter", "Security"],
    linkText: "View Code",
    linkUrl: "https://github.com/Nikispace/Decodelabs-internship/blob/main/Random%20password%20generator%20using%20python.py"
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
      <h2 className="text-4xl md:text-5xl font-bold mb-16">
        <span className="text-accent">#</span> Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projectsList.map((project, i) => (
          <div 
            key={i} 
            className="project-card flex flex-col justify-between group p-8 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/[0.06] hover:border-accent/40 hover:shadow-[0_8px_32px_0_rgba(168,85,247,0.1)] transition-all duration-300 relative overflow-hidden"
          >
            {/* Glossy top reflection effect */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div>
              <h3 className="text-2xl font-bold mb-1 group-hover:text-accent-secondary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-accent mb-4">
                {project.tagline}
              </p>
              <p className="text-textSecondary mb-8 text-base leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-gray-300 border border-white/[0.05]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <a 
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 text-sm font-semibold bg-white text-bg rounded-full hover:bg-accent hover:text-white hover:scale-105 transform transition-all duration-300"
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
