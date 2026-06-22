import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission goes here
    alert("Thanks for reaching out! (Form UI ready)");
  };

  return (
    <footer id="contact" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 border-t border-gray-800/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row justify-between gap-16 z-10 relative">
        {/* Left Side: Text and Links */}
        <div className="flex-1 flex flex-col items-start text-left">
          <h2 className="contact-item text-5xl md:text-7xl font-black mb-8">
            Let’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">talk.</span>
          </h2>
          <p className="contact-item text-xl text-textSecondary max-w-lg mb-12">
            If you want to talk about internships, projects, collaborations, or just say hi, drop a message.
          </p>

          <div className="contact-item space-y-4 mb-12 text-lg font-medium text-gray-300">
            <p>📍 Chennai, Tamil Nadu, India</p>
            <p>✉️ <a href="mailto:nikithanagami@gmail.com" className="hover:text-accent transition-colors">nikithanagami@gmail.com</a></p>
          </div>

          <div className="contact-item flex flex-wrap gap-4">
            <a href="https://github.com/Nikispace" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-900 border border-gray-700 text-white font-bold rounded-full hover:border-gray-500 hover:bg-gray-800 transition-all">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nikitha-m-182027395" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-900 border border-gray-700 text-white font-bold rounded-full hover:border-gray-500 hover:bg-gray-800 transition-all">
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Side: Optional Form */}
        <div className="contact-item flex-1 w-full max-w-md bg-gray-900/50 p-8 rounded-3xl border border-gray-800 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6">Send a message</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
            ></textarea>
            <button 
              type="submit" 
              className="w-full bg-accent text-white font-bold rounded-xl px-4 py-3 hover:bg-opacity-80 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="contact-item w-full flex flex-col sm:flex-row justify-between items-center text-sm text-textSecondary pt-16 mt-16 border-t border-gray-800/30 relative z-10">
        <p>© {new Date().getFullYear()} Nikitha M. All rights reserved.</p>
        <div className="flex gap-2 items-center mt-4 sm:mt-0">
          <span>Built with</span>
          <span className="text-accent text-lg">♥</span>
          <span>& 🐾</span>
        </div>
      </div>
    </footer>
  );
}
