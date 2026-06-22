import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const { progress } = useProgress();
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const [startFadeOut, setStartFadeOut] = useState(false);

  // We want to ensure a minimum loading time for the sleek animation to play
  useEffect(() => {
    let timeout;
    if (progress === 100) {
      // Small delay after loading reaches 100% to let things settle
      timeout = setTimeout(() => {
        setStartFadeOut(true);
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [progress]);

  useEffect(() => {
    if (startFadeOut) {
      const ctx = gsap.context(() => {
        // Yuta Abe style slide up / fade out
        gsap.to(loaderRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete();
          }
        });
      });
      return () => ctx.revert();
    } else {
      // Idle pulsing animation while loading
      const ctx = gsap.context(() => {
        gsap.to('.loader-paw', {
          scale: 1.1,
          opacity: 0.8,
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut'
        });
      });
      return () => ctx.revert();
    }
  }, [startFadeOut, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Paw Print Icon for loading */}
        <div className="loader-paw text-accent mb-6 w-16 h-16 relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
            <path d="M12,8.5c1.4,0,2.5-1.1,2.5-2.5S13.4,3.5,12,3.5S9.5,4.6,9.5,6S10.6,8.5,12,8.5z M6.8,11.2c1.3,0,2.3-1.2,2.3-2.6 S8.1,5.9,6.8,5.9S4.5,7.1,4.5,8.5S5.5,11.2,6.8,11.2z M17.2,11.2c1.3,0,2.3-1.2,2.3-2.6S18.5,5.9,17.2,5.9s-2.3,1.2-2.3,2.6 S15.9,11.2,17.2,11.2z M12,10.2c-2.2,0-4.5,1.5-4.5,3.8c0,1.8,1.2,4.8,4.5,4.8s4.5-3,4.5-4.8C16.5,11.7,14.2,10.2,12,10.2z"/>
          </svg>
        </div>
        
        {/* Loading text with progress percentage */}
        <div className="overflow-hidden h-6">
          <p ref={textRef} className="text-textSecondary text-sm font-medium tracking-[0.2em] uppercase">
            Loading... {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}
