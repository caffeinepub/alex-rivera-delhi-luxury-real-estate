import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible');

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 1500);

    const hideTimer = setTimeout(() => {
      setPhase('hidden');
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (phase === 'hidden') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      {/* Gold spinner */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          border: '3px solid rgba(255, 215, 0, 0.15)',
          borderTopColor: '#FFD700',
          animation: 'goldSpin 1s linear infinite',
          marginBottom: 32,
        }}
      />

      {/* Key icon above text */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        style={{ marginBottom: 16 }}
      >
        <circle cx="8" cy="8" r="4" stroke="#FFD700" strokeWidth="2" fill="none" />
        <path
          d="M11.5 11.5L20 20M16 18l2 2M18 16l2 2"
          stroke="#FFD700"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Loading text */}
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          background: 'linear-gradient(45deg, #FFD700, #FFA500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 8,
        }}
      >
        Entering Delhi Empire...
      </p>

      <p
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.75rem',
          color: 'rgba(255, 215, 0, 0.5)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        Luxury Redefined
      </p>

      {/* Decorative line */}
      <div
        style={{
          marginTop: 32,
          width: 120,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
        }}
      />
    </div>
  );
}
