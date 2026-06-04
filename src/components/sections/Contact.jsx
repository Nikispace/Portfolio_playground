import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="py-32 px-8 md:px-24 border-t border-gray-800/50 mt-24 relative overflow-hidden">
      {/* Soft background gradient for footer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col items-center text-center z-10 relative">
        <h2 className="contact-item text-5xl md:text-7xl font-black mb-8">Let’s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">cool.</span></h2>
        <p className="contact-item text-xl text-textSecondary max-w-2xl mb-12">
          Whether you have a project in mind, want to discuss AI, or just want to say hi—my inbox is always open.
        </p>

        <div className="contact-item flex flex-wrap justify-center gap-6 mb-24">
          <a href="mailto:your.email@example.com" className="px-8 py-4 bg-white text-bg font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2">
            Say Hello
          </a>
          <a href="#" className="px-8 py-4 bg-gray-900 border border-gray-700 text-white font-bold rounded-full hover:border-gray-500 hover:bg-gray-800 transition-all">
            GitHub
          </a>
          <a href="#" className="px-8 py-4 bg-gray-900 border border-gray-700 text-white font-bold rounded-full hover:border-gray-500 hover:bg-gray-800 transition-all">
            LinkedIn
          </a>
        </div>

        <div className="contact-item w-full flex justify-between items-center text-sm text-textSecondary pt-8 border-t border-gray-800/30">
          <p>© {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
          <div className="flex gap-2 items-center">
            <span>Designed with</span>
            <span className="text-accent text-lg">♥</span>
            <span>& 🐾</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
