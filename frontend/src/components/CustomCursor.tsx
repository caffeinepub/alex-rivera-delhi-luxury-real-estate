import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([
    { x: -100, y: -100, opacity: 0, scale: 0.8 },
    { x: -100, y: -100, opacity: 0, scale: 0.6 },
    { x: -100, y: -100, opacity: 0, scale: 0.4 },
  ]);
  const particleElemsRef = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as Element;
      const hovering = !!(
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('label')
      );
      isHoveringRef.current = hovering;
      setIsHovering(hovering);
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = `${mouseRef.current.x}px`;
        cursor.style.top = `${mouseRef.current.y}px`;
      }

      // Update particles with lag
      const delays = [0.15, 0.3, 0.45];
      particlesRef.current.forEach((p, i) => {
        p.x += (mouseRef.current.x - p.x) * (1 - delays[i]);
        p.y += (mouseRef.current.y - p.y) * (1 - delays[i]);
        p.opacity = 0.6 - i * 0.15;

        const elem = particleElemsRef.current[i];
        if (elem) {
          elem.style.left = `${p.x}px`;
          elem.style.top = `${p.y}px`;
          elem.style.opacity = `${p.opacity}`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cursorScale = isHovering ? 1.5 : 1;

  return (
    <>
      {/* Spark trail particles */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { particleElemsRef.current[i] = el; }}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 99998,
            transform: 'translate(-50%, -50%)',
            width: `${8 - i * 2}px`,
            height: `${8 - i * 2}px`,
            borderRadius: '50%',
            background: `rgba(255, 215, 0, ${0.6 - i * 0.15})`,
            boxShadow: `0 0 ${6 - i}px rgba(255, 215, 0, 0.8)`,
            transition: 'opacity 0.1s ease',
          }}
        />
      ))}

      {/* Gold key cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
          transition: 'transform 0.2s ease',
          filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Key shape */}
          <circle cx="8" cy="8" r="4.5" fill="#FFD700" opacity="0.9" />
          <circle cx="8" cy="8" r="2.5" fill="#0A0A0A" />
          <rect x="11.5" y="7" width="9" height="2.5" rx="1.25" fill="#FFD700" opacity="0.9" />
          <rect x="17" y="9.5" width="2.5" height="2" rx="0.5" fill="#FFD700" opacity="0.9" />
          <rect x="14" y="9.5" width="2" height="1.5" rx="0.5" fill="#FFD700" opacity="0.9" />
        </svg>
      </div>
    </>
  );
}
