// =============================================================================
// PORTFOLIO — CORRECTED & RESTRUCTURED
// Original file was named .py but contains TypeScript/TSX + CSS (no Python).
// Each section below maps to its own file in a real Vite/CRA project.
// Errors fixed:
//   1. Renamed from .py → .tsx (correct extension for the bulk of the code)
//   2. All import statements moved to the top of their respective file blocks
//   3. Duplicate `import { useState, useEffect }` removed from mid-file
//   4. CSS block clearly separated (move to src/index.css in your project)
//   5. Added mt-6 to Hero badges row for spacing
//   6. TAG_COLORS: added distinct color for 'Data' vs 'Python' in Projects
// =============================================================================


// =============================================================================
// FILE: src/App.tsx
// =============================================================================
import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Creative from './components/Creative';
import Contact from './components/Contact';
import Footer from './components/Footer';

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return { dark, toggleDark: () => setDark(d => !d) };
}

export default function App() {
  const { dark, toggleDark } = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-neutral-900 dark:text-white transition-colors duration-300">
      <Nav dark={dark} toggleDark={toggleDark} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Creative />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


// =============================================================================
// FILE: src/components/Nav.tsx
// (FIX: duplicate `import { useState, useEffect }` removed — was mid-file)
// =============================================================================
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Creative', href: '#creative' },
  { label: 'Contact', href: '#contact' },
];

interface NavProps {
  dark: boolean;
  toggleDark: () => void;
}

export default function Nav({ dark, toggleDark }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-sm border-b border-neutral-200/60 dark:border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); handleLink('#hero'); }}
            className="flex items-center gap-2 font-display font-bold text-lg text-neutral-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            <Code2 className="w-5 h-5 text-primary-500" />
            <span>Nikitha<span className="text-primary-500">.</span></span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); handleLink(link.href); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === link.href.slice(1)
                    ? 'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-dark-elevated'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-dark-elevated hover:text-neutral-900 dark:hover:text-white transition-all"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-dark-elevated transition-all"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-white dark:bg-dark-surface border-b border-neutral-200 dark:border-dark-border`}
      >
        <nav className="section-container py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); handleLink(link.href); }}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === link.href.slice(1)
                  ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-elevated'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}


// =============================================================================
// FILE: src/components/Hero.tsx
// (FIX: added mt-6 to badges row for visual spacing)
// =============================================================================
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Mail, Layers } from 'lucide-react';

const BADGES = ['Python', 'Data Science', 'AI', 'Creative', 'Open Source'];

function useTypingEffect(text: string, speed = 45) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { displayed, done } = useTypingEffect('Built from overthinking, late‑night ideas, and too many open tabs.', 38);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden
        bg-neutral-50 dark:bg-dark-bg"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dot-grid-light dark:bg-dot-grid-dark opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary-400/20 dark:bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-400/10 dark:bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 section-container w-full py-24 pt-32">
        <div className="max-w-4xl">
          {/* Animated headline */}
          <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-neutral-900 dark:text-white mb-6 animate-slide-up">
            {displayed}
            {!done && <span className="animate-blink text-primary-500">|</span>}
          </h1>

          {/* Subline */}
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-10 max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Nikitha M • studying computer science and teaching myself how data tells stories.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button onClick={() => scrollTo('projects')} className="btn-primary">
              <Layers className="w-4 h-4" />
              See my projects
            </button>
            <a
              href="https://github.com/Nikispace"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github className="w-4 h-4" />
              Stalk my GitHub
            </a>
            <button onClick={() => scrollTo('contact')} className="btn-secondary">
              <Mail className="w-4 h-4" />
              Say hi
            </button>
          </div>

          {/* Badges — FIX: added mt-6 for spacing from buttons */}
          <div className="flex flex-wrap gap-2 mt-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {BADGES.map(b => (
              <span key={b} className="tag-primary">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-400 hover:text-primary-500 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
}


// =============================================================================
// FILE: src/components/About.tsx
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { MapPin, BookOpen, FlaskConical } from 'lucide-react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-surface">
      <div className="section-container">
        <div ref={ref} className="aos-init grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="section-label">
              <span className="w-4 h-px bg-primary-500 inline-block" />
              About me
            </span>
            <h2 className="section-title mb-6">
              A live lab of{' '}
              <span className="text-gradient">ideas & experiments</span>
            </h2>

            <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
              <p>
                I'm Nikitha from Chennai, doing a mix of B.E. CSE at Velammal Institute of Technology and B.S. in Data Science and Applications at IIT Madras. Most of my ideas start as <span className="text-primary-500 font-medium">"what if I try this once?"</span> and then slowly turn into tiny projects that keep evolving.
              </p>
              <p>
                I like building small Python scripts, data experiments, and AI‑powered workflows that actually solve some problem in my day — even if it's a very tiny one. When I'm not debugging, I'm usually writing, clicking photos, or planning my next web or AI experiment.
              </p>
              <p>
                I'm still early in my journey, so this portfolio is more like a <span className="text-secondary-500 font-medium">live lab</span>: things break, improve, and get redesigned as I learn.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-primary-500" />
                Chennai, Tamil Nadu
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <BookOpen className="w-4 h-4 text-secondary-500" />
                CSE + Data Science
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <FlaskConical className="w-4 h-4 text-accent-500" />
                Building in public
              </div>
            </div>
          </div>

          {/* Visual card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-primary-200 dark:border-primary-800 animate-float" />
              <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary-100 via-secondary-50 to-accent-50 dark:from-primary-900/30 dark:via-dark-elevated dark:to-accent-900/20 flex flex-col items-center justify-center p-6 text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center text-white font-display font-extrabold text-2xl shadow-lg shadow-primary-500/30">
                  NM
                </div>
                <div>
                  <p className="font-display font-bold text-lg text-neutral-900 dark:text-white">Nikitha M</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">CSE · Data Science · AI</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <span className="tag-primary">Hustler</span>
                  <span className="tag-secondary">IITM BS</span>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl glass text-xs font-mono text-primary-600 dark:text-primary-400 shadow">
                Python
              </div>
              <div className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl glass text-xs font-mono text-secondary-600 dark:text-secondary-400 shadow">
                Data Science
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Skills.tsx
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { Code2, BarChart2, Wrench, Bot, Palette, Heart } from 'lucide-react';

const SKILL_GROUPS = [
  {
    label: 'Code',
    Icon: Code2,
    color: 'text-primary-500',
    bg: 'bg-primary-50 dark:bg-primary-900/20',
    skills: ['Python', 'C', 'C++ (basic)', 'SQL (basic)'],
  },
  {
    label: 'Data & Analysis',
    Icon: BarChart2,
    color: 'text-secondary-500',
    bg: 'bg-secondary-50 dark:bg-secondary-900/20',
    skills: ['Basic statistics', 'Data analysis', 'NumPy', 'Matplotlib', 'Google Sheets', 'Google Colab'],
  },
  {
    label: 'Web & Tools',
    Icon: Wrench,
    color: 'text-success-500',
    bg: 'bg-success-50 dark:bg-success-900/20',
    skills: ['HTML', 'CSS', 'JavaScript (basic)', 'Git & GitHub', 'GitHub Pages', 'Google Sites', 'VS Code', 'ngrok'],
  },
  {
    label: 'AI Helpers',
    Icon: Bot,
    color: 'text-accent-500',
    bg: 'bg-accent-50 dark:bg-accent-900/20',
    skills: ['Gemini', 'Claude', 'ChatGPT / LLMs', 'ComfyUI'],
  },
  {
    label: 'Creative & Editing',
    Icon: Palette,
    color: 'text-warning-500',
    bg: 'bg-warning-50 dark:bg-warning-900/20',
    skills: ['Canva + Canva AI', 'CapCut', 'Static Instagram posts'],
  },
  {
    label: 'Human Stuff',
    Icon: Heart,
    color: 'text-error-500',
    bg: 'bg-error-50 dark:bg-error-900/20',
    skills: ['Writing clearly', 'Figuring things out step by step', 'Self-learning & consistency'],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="skills" className="py-24 bg-neutral-50 dark:bg-dark-bg">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="section-label justify-center">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Skills
            <span className="w-4 h-px bg-primary-500 inline-block" />
          </span>
          <h2 className="section-title">
            What I work with
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-sm max-w-md mx-auto">
            Tools, languages, and soft skills I've picked up along the way.
          </p>
        </div>

        <div ref={ref} className="aos-init grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map(group => (
            <div
              key={group.label}
              className={`rounded-2xl p-6 ${group.bg} border border-transparent hover:border-neutral-200 dark:hover:border-dark-border glow-hover transition-all`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl bg-white dark:bg-dark-elevated shadow-sm`}>
                  <group.Icon className={`w-5 h-5 ${group.color}`} />
                </div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-sm">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium
                      bg-white dark:bg-dark-elevated text-neutral-700 dark:text-neutral-300
                      border border-neutral-200 dark:border-dark-border
                      hover:border-primary-300 dark:hover:border-primary-600
                      transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Projects.tsx
// (FIX: 'Data' tag now uses tag-accent instead of tag-primary to distinguish
//  from 'Python' which is also tag-primary — avoids visual ambiguity)
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { Github, ExternalLink, Clock } from 'lucide-react';

interface Project {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link?: string;
  comingSoon?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'To-Do List Manager',
    tagline: 'A tiny terminal app to dump your brain into tasks.',
    description:
      'A console-based to-do list where you can add tasks, see what\'s pending, and remove things once you\'re done. Built with Python and basic date/time logic, focused on clear prompts and structure.',
    tags: ['Python', 'Console', 'Productivity'],
    link: 'https://github.com/Nikispace/Decodelabs-internship/blob/main/TASK-1-Nikitha%20M',
  },
  {
    title: 'Expense Tracker',
    tagline: 'Because "where did my money go?" shouldn\'t be a mystery.',
    description:
      'A console-based expense tracker to log expenses by category, set limits, and view weekly and monthly summaries. Written in Python with a menu-driven flow and simple reports.',
    tags: ['Python', 'Console', 'Data'],
    link: 'https://github.com/Nikispace/Decodelabs-internship/blob/main/TASK-2-Nikitha%20M',
  },
  {
    title: 'Random Password Generator',
    tagline: 'You pick the rules. It spits out chaos.',
    description:
      'A retro-style Tkinter app that generates passwords based on length and character types, with a simple strength indicator. Built to practise GUI programming in Python.',
    tags: ['Python', 'Tkinter', 'Security'],
    link: 'https://github.com/Nikispace/Decodelabs-internship/blob/main/Random%20password%20generator%20using%20python.py',
  },
  {
    title: 'Quiz Generator',
    tagline: 'Practice mode for your brain, powered by Python.',
    description:
      'An in-progress quiz generator that will serve questions from a small question bank, track scores, and give simple feedback. Starting as a console app, with room to grow into a GUI or web version.',
    tags: ['Python', 'Console'],
    comingSoon: true,
  },
  {
    title: 'Personal Portfolio Website',
    tagline: 'This website… about this website.',
    description:
      'A fresh HTML/CSS/JS portfolio to bring my projects, achievements, and creative work into one place. Responsive, with light/dark modes and scroll animations.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
  },
  {
    title: 'QR-Driven Menu Display',
    tagline: 'Scan, tap, read. No laminated menus required.',
    description:
      'A static, mobile-first web page that shows a digital menu when someone scans a QR code. Designed for quick reading on phones without extra clicks or clutter.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

const TAG_COLORS: Record<string, string> = {
  Python: 'tag-primary',
  Console: 'tag-secondary',
  Productivity: 'tag-accent',
  Data: 'tag-accent',       // FIX: was 'tag-primary' — now distinct from Python
  Tkinter: 'tag-secondary',
  Security: 'tag-accent',
  HTML: 'tag-primary',
  CSS: 'tag-secondary',
  JavaScript: 'tag-accent',
  'GitHub Pages': 'tag-primary',
};

function getTagClass(tag: string) {
  return TAG_COLORS[tag] ?? 'tag-secondary';
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-dark-surface">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="section-label justify-center">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Projects
            <span className="w-4 h-px bg-primary-500 inline-block" />
          </span>
          <h2 className="section-title">
            Things I've built
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-sm max-w-md mx-auto">
            Small but complete. Every project taught me something.
          </p>
        </div>

        <div ref={ref} className="aos-init grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map(project => (
            <article
              key={project.title}
              className="group relative flex flex-col rounded-2xl p-6
                bg-neutral-50 dark:bg-dark-elevated
                border border-neutral-200 dark:border-dark-border
                hover:border-primary-300 dark:hover:border-primary-600
                glow-hover transition-all duration-300"
            >
              {project.comingSoon && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-xs font-mono">
                  <Clock className="w-3 h-3" />
                  soon
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-display font-bold text-neutral-900 dark:text-white text-base mb-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-primary-500 dark:text-primary-400 mb-3">
                  {project.tagline}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className={getTagClass(tag)}>
                    {tag}
                  </span>
                ))}
              </div>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  View code
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : project.comingSoon ? (
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">Work in progress...</span>
              ) : (
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">This very site</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Experience.tsx
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="experience" className="py-24 bg-neutral-50 dark:bg-dark-bg">
      <div className="section-container">
        <div className="mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Experience
          </span>
          <h2 className="section-title">Where I've worked</h2>
        </div>

        <div ref={ref} className="aos-init max-w-2xl">
          {/* Timeline item */}
          <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-neutral-200 dark:before:bg-dark-border">
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center shadow-md shadow-primary-500/30">
              <Briefcase className="w-3 h-3 text-white" />
            </div>

            <div className="rounded-2xl p-6 bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border glow-hover">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-display font-bold text-neutral-900 dark:text-white">
                    Python Programming Intern
                  </h3>
                  <p className="text-primary-500 dark:text-primary-400 text-sm font-medium">DecodeLabs</p>
                </div>
                <span className="tag-secondary whitespace-nowrap">May – Jun 2026</span>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                I joined DecodeLabs as a Python intern to practise building small but complete projects.
                I worked on a to-do list manager, an expense tracker, and a GUI-based random password generator.
              </p>

              <ul className="space-y-2">
                {[
                  'Wrote and tested console and GUI apps in Python IDLE.',
                  'Used Git and GitHub for version control and submissions.',
                  'Focused on clean structure, readable code, and simple documentation.',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Education.tsx
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { GraduationCap } from 'lucide-react';

const EDUCATION = [
  {
    degree: 'B.E. Computer Science Engineering',
    institution: 'Velammal Institute of Technology',
    location: 'Chennai',
    period: '2025 – Present',
    grade: 'CGPA 9.16 (1st sem)',
    tag: 'B.E. CSE',
    color: 'primary',
  },
  {
    degree: 'B.S. Data Science Applications (Foundation Level)',
    institution: 'IIT Madras',
    location: 'Chennai',
    period: '2025 – Present',
    grade: 'CGPA 8.33 (Foundation Term 2)',
    tag: 'IITM BS',
    color: 'secondary',
  },
  {
    degree: 'Class 12, CBSE',
    institution: 'Everwin Vidhyashram',
    location: 'Kolathur, Chennai',
    period: '2025',
    grade: '89.4%',
    tag: '+2',
    color: 'accent',
  },
  {
    degree: 'Class 10, CBSE',
    institution: 'Everwin Vidhyashram',
    location: 'Kolathur, Chennai',
    period: '2023',
    grade: '94.2%',
    tag: '10th',
    color: 'success',
  },
];

const BORDER_MAP: Record<string, string> = {
  primary: 'border-l-primary-500',
  secondary: 'border-l-secondary-500',
  accent: 'border-l-accent-500',
  success: 'border-l-success-500',
};

const TAG_MAP: Record<string, string> = {
  primary: 'tag-primary',
  secondary: 'tag-secondary',
  accent: 'tag-accent',
  success: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300 tag',
};

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="education" className="py-24 bg-white dark:bg-dark-surface">
      <div className="section-container">
        <div className="mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Education
          </span>
          <h2 className="section-title">Where I'm learning</h2>
        </div>

        <div ref={ref} className="aos-init grid sm:grid-cols-2 gap-5 max-w-3xl">
          {EDUCATION.map(edu => (
            <div
              key={edu.degree}
              className={`rounded-2xl p-5 bg-neutral-50 dark:bg-dark-elevated border border-neutral-200 dark:border-dark-border border-l-4 ${BORDER_MAP[edu.color]} glow-hover transition-all`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <span className={TAG_MAP[edu.color]}>{edu.tag}</span>
              </div>
              <h3 className="font-display font-bold text-neutral-900 dark:text-white text-sm leading-snug mb-1">
                {edu.degree}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{edu.institution}, {edu.location}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
                <span className="font-mono">{edu.period}</span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Certifications.tsx
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { Award } from 'lucide-react';

const CERTS = [
  { name: 'Claude Code 101', issuer: 'Anthropic', date: 'Apr 2026', color: 'primary' },
  { name: 'Claude 101', issuer: 'Anthropic', date: 'Apr 2026', color: 'primary' },
  { name: 'Fundamental Algorithms: Design & Analysis (Elite)', issuer: 'NPTEL, IIT Kharagpur', date: 'Jan–Feb 2026', color: 'secondary' },
  { name: 'Generative AI Mastermind', issuer: 'Outskill', date: '2026', color: 'accent' },
  { name: 'Pearson MePro Level 6 — English Proficiency', issuer: 'Pearson', date: 'Jan 2026', color: 'success' },
  { name: 'Tracing the Invisible: OSINT & Digital Footprint', issuer: 'IITM BS', date: 'Aug 2025', color: 'warning' },
  { name: 'Skills Scribble', issuer: 'Google Arcade SkillsBoost', date: 'Sep 10, 2025', color: 'primary' },
  { name: 'Skills Boost Arcade Base Camp', issuer: 'Google Arcade SkillsBoost', date: 'Sep 6, 2025', color: 'primary' },
];

const BADGE_MAP: Record<string, string> = {
  primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300',
  secondary: 'bg-secondary-50 dark:bg-secondary-900/20 border-secondary-200 dark:border-secondary-800 text-secondary-700 dark:text-secondary-300',
  accent: 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800 text-accent-700 dark:text-accent-300',
  success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-700 dark:text-success-300',
  warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800 text-warning-700 dark:text-warning-300',
};

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="certifications" className="py-24 bg-neutral-50 dark:bg-dark-bg">
      <div className="section-container">
        <div className="mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Certifications
          </span>
          <h2 className="section-title">Credentials & badges</h2>
        </div>

        <div ref={ref} className="aos-init grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTS.map(cert => (
            <div
              key={cert.name}
              className={`rounded-xl p-4 border ${BADGE_MAP[cert.color]} glow-hover transition-all`}
            >
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-70" />
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-snug text-neutral-900 dark:text-white line-clamp-2">
                    {cert.name}
                  </p>
                  <p className="text-xs mt-1 opacity-70">{cert.issuer}</p>
                  <p className="text-xs font-mono mt-0.5 opacity-60">{cert.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Achievements.tsx
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { Trophy, Star, Camera, Mic2, Users } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: 'IITM BS Topper Badges',
    desc: 'Statistics for Data Science 1 & 2, Mathematics for Data Science 1, and English 1.',
    color: 'text-secondary-500',
    bg: 'bg-secondary-50 dark:bg-secondary-900/20',
  },
  {
    icon: Star,
    title: 'Anubhuti 3.0 – Poetic Projections',
    desc: 'Poetry / creative writing event at Margazhi\'26, IITM BS.',
    color: 'text-primary-500',
    bg: 'bg-primary-50 dark:bg-primary-900/20',
  },
  {
    icon: Users,
    title: 'Qutopia – Margazhi 2026',
    desc: 'Participated in Margazhi 2026, the annual fest of IITM BS.',
    color: 'text-accent-500',
    bg: 'bg-accent-50 dark:bg-accent-900/20',
  },
  {
    icon: Camera,
    title: 'Festive Frames – Photography',
    desc: '"Emotions of Diwali" — IRIS Society photography competition, IITM BS.',
    color: 'text-success-500',
    bg: 'bg-success-50 dark:bg-success-900/20',
  },
  {
    icon: Mic2,
    title: 'Just A Minute – Elocution',
    desc: 'Elocution challenge by CuriousTimes.in & Everwin Vidhyashram (June 2021).',
    color: 'text-warning-500',
    bg: 'bg-warning-50 dark:bg-warning-900/20',
  },
  {
    icon: Camera,
    title: 'Photographer of the Week',
    desc: 'Recognition for regular participation in IITM BS events: Diwali Delights, Shutter Safari, Anubhuti, and Manthan-e-Alfaaz.',
    color: 'text-primary-500',
    bg: 'bg-primary-50 dark:bg-primary-900/20',
  },
];

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="achievements" className="py-24 bg-white dark:bg-dark-surface">
      <div className="section-container">
        <div className="mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Achievements
          </span>
          <h2 className="section-title">Things I'm proud of</h2>
        </div>

        <div ref={ref} className="aos-init grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map(a => (
            <div
              key={a.title}
              className={`rounded-2xl p-5 ${a.bg} glow-hover transition-all border border-transparent hover:border-neutral-200 dark:hover:border-dark-border`}
            >
              <div className={`w-9 h-9 rounded-xl bg-white dark:bg-dark-elevated flex items-center justify-center mb-3 shadow-sm`}>
                <a.icon className={`w-5 h-5 ${a.color}`} />
              </div>
              <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-sm mb-1.5">
                {a.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Creative.tsx
// =============================================================================
import { useRef } from 'react';
import useAOS from '../hooks/useAOS';
import { PenLine, BarChart2, Camera, Sparkles } from 'lucide-react';

const ITEMS = [
  {
    icon: PenLine,
    title: 'Writing & poetry',
    desc: 'Run Instagram pages for original poems, quotes, and reflections. Writing has been the most consistent creative outlet.',
    color: 'text-primary-500',
    bg: 'bg-primary-50 dark:bg-primary-900/20',
  },
  {
    icon: BarChart2,
    title: 'Data Science content',
    desc: 'Create static posts that simplify Data Science and AI topics for beginners. Making complex things approachable.',
    color: 'text-secondary-500',
    bg: 'bg-secondary-50 dark:bg-secondary-900/20',
  },
  {
    icon: Camera,
    title: 'Photography & contests',
    desc: 'Join online photography and writing contests — playing with everyday moments and festival themes.',
    color: 'text-accent-500',
    bg: 'bg-accent-50 dark:bg-accent-900/20',
  },
  {
    icon: Sparkles,
    title: 'AI visual experiments',
    desc: 'Explore AI tools and ComfyUI for anime-style and chat-story visuals for future series projects.',
    color: 'text-success-500',
    bg: 'bg-success-50 dark:bg-success-900/20',
  },
];

export default function Creative() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  return (
    <section id="creative" className="py-24 bg-neutral-50 dark:bg-dark-bg">
      <div className="section-container">
        <div className="mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Creative & Content
          </span>
          <h2 className="section-title">Beyond the code</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm">
            I don't just code things — I also like telling stories around them.
          </p>
        </div>

        <div ref={ref} className="aos-init grid sm:grid-cols-2 gap-6">
          {ITEMS.map(item => (
            <div
              key={item.title}
              className={`flex gap-4 rounded-2xl p-6 ${item.bg} glow-hover transition-all border border-transparent hover:border-neutral-200 dark:hover:border-dark-border`}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark-elevated flex items-center justify-center flex-shrink-0 shadow-sm">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-neutral-900 dark:text-white text-sm mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Contact.tsx
// =============================================================================
import { useRef, useState } from 'react';
import useAOS from '../hooks/useAOS';
import { MapPin, Github, Linkedin, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  useAOS(ref);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const inputBase =
    'w-full rounded-xl px-4 py-3 text-sm bg-neutral-50 dark:bg-dark-elevated border border-neutral-200 dark:border-dark-border text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-500 focus:border-transparent transition-all';

  return (
    <section id="contact" className="py-24 bg-white dark:bg-dark-surface">
      <div className="section-container">
        <div className="mb-14">
          <span className="section-label">
            <span className="w-4 h-px bg-primary-500 inline-block" />
            Contact
          </span>
          <h2 className="section-title">Say hi</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm">
            If you want to talk about internships, projects, collaborations, or just say hi, drop a message.
          </p>
        </div>

        <div ref={ref} className="aos-init grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-0.5">Location</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-0.5">Email</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">nikithanagami[at]gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                <Github className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-0.5">GitHub</p>
                <a
                  href="https://github.com/Nikispace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-500 hover:text-primary-400 font-mono transition-colors"
                >
                  github.com/Nikispace
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-0.5">LinkedIn</p>
                <p className="text-sm text-neutral-400 dark:text-neutral-500 font-mono italic">link coming soon</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1.5">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={inputBase}
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={inputBase}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="What's on your mind?"
                required
                className={`${inputBase} resize-none`}
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              {sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Message sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


// =============================================================================
// FILE: src/components/Footer.tsx
// =============================================================================
import { Github, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="py-8 border-t border-neutral-200 dark:border-dark-border bg-neutral-50 dark:bg-dark-bg">
      <div className="section-container flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
          Built with <Heart className="w-3.5 h-3.5 text-accent-500 fill-accent-500" /> by Nikitha M
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Nikispace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={scrollTop}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}


// =============================================================================
// FILE: src/hooks/useAOS.ts
// =============================================================================
import { useEffect, RefObject } from 'react';

export default function useAOS(ref: RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('aos-animate');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}


// =============================================================================
// FILE: src/index.css
// (MOVE THIS BLOCK TO A SEPARATE .css FILE — CSS cannot live in a .tsx file)
// =============================================================================
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --scroll-behavior: smooth;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans antialiased;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-neutral-100 dark:bg-dark-bg;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-primary-400 rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-primary-500;
  }
}

@layer components {
  .glass {
    @apply bg-white/70 dark:bg-dark-surface/70 backdrop-blur-md border border-white/20 dark:border-dark-border;
  }

  .glow-hover {
    @apply transition-all duration-300;
  }
  .glow-hover:hover {
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.3), 0 0 40px rgba(20, 184, 166, 0.1);
  }

  .text-gradient {
    @apply bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400 bg-clip-text text-transparent;
  }

  .text-gradient-accent {
    @apply bg-gradient-to-r from-accent-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent;
  }

  .section-container {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .tag {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-mono;
  }

  .tag-primary {
    @apply tag bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300;
  }

  .tag-secondary {
    @apply tag bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300;
  }

  .tag-accent {
    @apply tag bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300;
  }

  .btn-primary {
    @apply inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
      bg-primary-500 text-white hover:bg-primary-400
      transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30
      focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-dark-bg;
  }

  .btn-secondary {
    @apply inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
      border border-neutral-300 dark:border-dark-border
      text-neutral-700 dark:text-neutral-300
      hover:border-primary-400 hover:text-primary-500 dark:hover:text-primary-400
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-dark-bg;
  }

  .section-label {
    @apply inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest uppercase
      text-primary-500 dark:text-primary-400 mb-3;
  }

  .section-title {
    @apply font-display font-bold text-3xl sm:text-4xl text-neutral-900 dark:text-white;
  }

  .aos-init {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .aos-animate {
    opacity: 1;
    transform: translateY(0);
  }
}

@layer utilities {
  .bg-dot-grid-dark {
    background-image: radial-gradient(circle, rgba(42, 42, 56, 0.8) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .bg-dot-grid-light {
    background-image: radial-gradient(circle, rgba(212, 212, 212, 0.6) 1px, transparent 1px);
    background-size: 32px 32px;
  }

  .frosted {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}
*/
