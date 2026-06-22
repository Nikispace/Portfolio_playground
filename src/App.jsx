import { useEffect, useState, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Scene from './canvas/Scene';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Achievements from './components/sections/Achievements';
import Creative from './components/sections/Creative';
import Contact from './components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only initialize Lenis after loading is complete so they don't scroll during load
    if (!isLoaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [isLoaded]);

  return (
    <>
      <CustomCursor />
      
      {!isLoaded && (
        <Loader onComplete={() => setIsLoaded(true)} />
      )}

      {/* Only show content after loader has finished its fade out */}
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
        <Navbar />
        
        {/* 3D Canvas Background */}
        <div className="canvas-container">
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>

        {/* Main Content */}
        <main className="relative z-10 w-full overflow-hidden max-w-[1600px] mx-auto">
          <Hero isLoaded={isLoaded} />
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
      </div>
    </>
  );
}

export default App;
