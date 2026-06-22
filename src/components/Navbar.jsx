import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Creative', href: '#creative' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => setIsOpen(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center mix-blend-difference text-white">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 cursor-pointer">
          <a href="#hero" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-accent">●</span> Nikitha M
          </a>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-2xl font-bold text-center">
          <a href="#hero" onClick={handleLinkClick} className="hover:text-accent transition-colors">Home</a>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={handleLinkClick}
              className="hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
