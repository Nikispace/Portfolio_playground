export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
      <div className="font-bold text-xl tracking-tighter flex items-center gap-2 cursor-pointer">
        {/* Placeholder Logo / Text */}
        <span className="text-accent">●</span> [Your Name]
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium">
        <a href="#about" className="hover:text-accent transition-colors">About</a>
        <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
        <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
        <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
      </nav>
    </header>
  );
}
