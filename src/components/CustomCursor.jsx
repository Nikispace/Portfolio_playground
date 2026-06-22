import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // GSAP quickTo for highly performant tracking without React re-renders
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Hover states for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('.about-card');

      if (isInteractable) {
        setIsHovering(true);
        // Small tap animation
        gsap.to(cursor, { scale: 1.3, duration: 0.3, ease: 'back.out(2)' });
      } else {
        setIsHovering(false);
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
        isHovering ? 'text-[#2dd4bf] drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]' : 'text-accent drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* SVG Cat Paw */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,8.5c1.4,0,2.5-1.1,2.5-2.5S13.4,3.5,12,3.5S9.5,4.6,9.5,6S10.6,8.5,12,8.5z M6.8,11.2c1.3,0,2.3-1.2,2.3-2.6 S8.1,5.9,6.8,5.9S4.5,7.1,4.5,8.5S5.5,11.2,6.8,11.2z M17.2,11.2c1.3,0,2.3-1.2,2.3-2.6S18.5,5.9,17.2,5.9s-2.3,1.2-2.3,2.6 S15.9,11.2,17.2,11.2z M12,10.2c-2.2,0-4.5,1.5-4.5,3.8c0,1.8,1.2,4.8,4.5,4.8s4.5-3,4.5-4.8C16.5,11.7,14.2,10.2,12,10.2z"/>
      </svg>
    </div>
  );
}
