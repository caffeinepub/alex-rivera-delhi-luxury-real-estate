import React, { useEffect, useRef, useState } from 'react';

interface VictoryOverlayProps {
  onClose: () => void;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  width: number;
  height: number;
  opacity: number;
}

const COLORS = ['#FFD700', '#FFA500', '#DC143C', '#FFFFFF', '#FFE066', '#FF6B6B', '#FFF8DC'];

export default function VictoryOverlay({ onClose }: VictoryOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const rafRef = useRef<number | null>(null);
  const [canClose, setCanClose] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanClose(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 250; i++) {
      pieces.push({
        x: Math.random() * W,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 6 + Math.random() * 10,
        height: 4 + Math.random() * 6,
        opacity: 0.8 + Math.random() * 0.2,
      });
    }
    piecesRef.current = pieces;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of piecesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.05;
        if (p.y > H + 20) {
          p.y = -20;
          p.x = Math.random() * W;
          p.vy = 2 + Math.random() * 4;
        }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleClose = () => {
    if (!canClose) return;
    setClosing(true);
    setTimeout(() => onClose(), 400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.88)',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '48px 40px',
          background: 'rgba(15,15,15,0.92)',
          border: '2px solid rgba(255,215,0,0.5)',
          borderRadius: '20px',
          maxWidth: '480px',
          width: '90%',
          boxShadow: '0 0 60px rgba(255,215,0,0.25)',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '8px' }}>🎉</div>
        <h2
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 900,
            fontSize: '36px',
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}
        >
          Deal Locked!
        </h2>
        <p
          style={{
            color: '#ccc',
            fontSize: '16px',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}
        >
          Alex Rivera will contact you shortly.
          <br />
          <span style={{ color: '#888', fontSize: '14px' }}>
            Your dream property is just a call away.
          </span>
        </p>

        <a
          href="https://wa.me/919999999999?text=Hi%20Alex%2C%20I%27m%20interested%20in%20a%20Delhi%20luxury%20property"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '16px',
            padding: '14px 28px',
            borderRadius: '50px',
            textDecoration: 'none',
            marginBottom: '16px',
            boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>

        <br />

        <button
          onClick={handleClose}
          disabled={!canClose}
          style={{
            background: canClose ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${canClose ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: canClose ? '#FFD700' : '#555',
            fontWeight: 600,
            fontSize: '14px',
            padding: '10px 24px',
            borderRadius: '50px',
            cursor: canClose ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s',
            marginTop: '8px',
          }}
        >
          {canClose ? 'Close' : 'Close (3s...)'}
        </button>
      </div>
    </div>
  );
}
