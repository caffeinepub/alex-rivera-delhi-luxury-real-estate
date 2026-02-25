import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
}

export default function Hero() {
  const { t, language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize 350 gold particles
    particlesRef.current = Array.from({ length: 350 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.8 + 0.3),
      size: Math.random() * 2.5 + 0.5,
      opacity: 0,
      maxOpacity: Math.random() * 0.7 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Fade in near bottom, fade out near top
        const relY = p.y / canvas.height;
        if (relY > 0.7) {
          p.opacity = Math.min(p.maxOpacity, p.opacity + 0.02);
        } else if (relY < 0.2) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        // Reset when off screen
        if (p.y < -10 || (p.opacity <= 0 && p.y < canvas.height * 0.5)) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 50;
          p.opacity = 0;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = -(Math.random() * 0.8 + 0.3);
          p.size = Math.random() * 2.5 + 0.5;
          p.maxOpacity = Math.random() * 0.7 + 0.2;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.opacity;

        // Gold gradient for each particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(0.5, '#FFA500');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Bright center dot
        ctx.fillStyle = '#FFFACD';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Parallax on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;
      const dy = (e.clientY - rect.top - cy) / cy;

      const textLayer = container.querySelector('.hero-text-layer') as HTMLElement;
      if (textLayer) {
        textLayer.style.transform = `translate(${dx * -12}px, ${dy * -8}px)`;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isHindi = language === 'hi';

  return (
    <section
      ref={containerRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A0A1A 50%, #000000 100%)',
      }}
    >
      {/* Gold particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,215,0,0.04) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Hero text content */}
      <div
        className="hero-text-layer"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '900px',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Eyebrow label */}
        <div
          style={{
            display: 'inline-block',
            padding: '6px 20px',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.07)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '100px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FFD700',
          }}
        >
          {t('hero.tagline')}
        </div>

        {/* Main H1 */}
        <h1
          className={isHindi ? 'font-devanagari' : ''}
          style={{
            fontFamily: isHindi ? '"Noto Sans Devanagari", sans-serif' : '"Playfair Display", serif',
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: isHindi ? '0.02em' : '0.05em',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFD700 40%, #FFA500 70%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Delhi Luxury Empire
        </h1>

        {/* Sub-headline */}
        <p
          className={isHindi ? 'font-devanagari' : ''}
          style={{
            fontFamily: isHindi ? '"Noto Sans Devanagari", sans-serif' : 'Montserrat, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.75)',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
            letterSpacing: '0.02em',
          }}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#properties"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 36px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: '#0A0A0A',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
              animation: 'ctaPulse 2s ease-in-out infinite',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)';
            }}
          >
            {t('hero.explore')}
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 36px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 215, 0, 0.4)',
              color: '#FFD700',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.4)';
            }}
          >
            📱 {t('hero.cta')}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        >
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255, 215, 0, 0.5)',
            }}
          >
            Scroll to Explore
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
