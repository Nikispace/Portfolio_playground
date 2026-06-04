import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Move cursor function
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    // Add listeners
    window.addEventListener('mousemove', moveCursor);

    // Add hover states to interactable elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
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
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
        isHovering ? 'bg-accent scale-150 mix-blend-screen' : 'bg-white mix-blend-difference'
      }`}
      style={{ willChange: 'transform' }}
    >
      {/* Optional tiny paw or dot could go here when hovering */}
      {isHovering && (
        <div className="w-1 h-1 bg-white rounded-full"></div>
      )}
    </div>
  );
}
