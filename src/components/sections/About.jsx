import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen w-full py-24 px-8 md:px-24 flex flex-col justify-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16"><span className="text-accent">#</span> About Me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="about-card bg-gray-900/40 p-8 rounded-3xl border border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-colors group">
          <h3 className="text-2xl font-semibold mb-4 text-accent-secondary">The Journey</h3>
          <p className="text-textSecondary leading-relaxed text-lg">
            I'm a beginner-to-intermediate coder and Python intern with a passion for learning AI & data science. 
            I enjoy transforming complex data into meaningful insights and building tools that make a difference. 
            My workflow often involves VS Code, Google Colab, ComfyUI, and GitHub.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="about-card bg-gray-900/40 p-6 rounded-3xl border border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all transform hover:-translate-y-1">
            <h4 className="text-accent font-medium mb-1">Education</h4>
            <p className="text-lg">IIT Madras - Foundation in Data Science & Programming</p>
            <span className="text-sm text-textSecondary">In Progress</span>
          </div>

          <div className="about-card bg-gray-900/40 p-6 rounded-3xl border border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all transform hover:-translate-y-1">
            <h4 className="text-accent font-medium mb-1">Experience</h4>
            <p className="text-lg">Python Programming Intern at Decodelabs</p>
            <span className="text-sm text-textSecondary">Building robust scripts and data pipelines</span>
          </div>

          <div className="about-card bg-gray-900/40 p-6 rounded-3xl border border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all transform hover:-translate-y-1">
            <h4 className="text-accent font-medium mb-1">Self-Learning</h4>
            <p className="text-lg">Building small projects & experimenting with AI tools</p>
            <span className="text-sm text-textSecondary">Exploring ComfyUI and GenAI concepts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
