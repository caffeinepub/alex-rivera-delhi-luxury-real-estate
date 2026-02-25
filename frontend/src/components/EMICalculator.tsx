import React, { useState, useEffect, useRef, useCallback } from 'react';
import { formatIndianPrice } from '../utils/formatIndianPrice';

export default function EMICalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyPrice, setPropertyPrice] = useState(10000000);
  const [downPayment, setDownPayment] = useState(2000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevEmiRef = useRef(0);
  const rafRef = useRef<number>(0);

  const calculateEMI = useCallback(() => {
    const principal = propertyPrice - downPayment;
    if (principal <= 0) {
      setEmi(0);
      setTotalInterest(0);
      return;
    }
    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;
    if (monthlyRate === 0) {
      const e = principal / months;
      setEmi(e);
      setTotalInterest(0);
      return;
    }
    const e = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = e * months;
    setEmi(Math.round(e));
    setTotalInterest(Math.round(totalPayment - principal));
  }, [propertyPrice, downPayment, tenure, interestRate]);

  useEffect(() => {
    calculateEMI();
  }, [calculateEMI]);

  // Gold particle burst on canvas when EMI updates
  useEffect(() => {
    if (!canvasRef.current || emi === prevEmiRef.current) return;
    prevEmiRef.current = emi;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * (Math.random() * 3 + 1),
        vy: Math.sin(angle) * (Math.random() * 3 + 1),
        life: 1,
        size: Math.random() * 3 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      if (alive) rafRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [emi]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 215, 0, 0.25)',
    borderRadius: '4px',
    color: '#FFFFFF',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.85rem',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255, 215, 0, 0.6)',
    display: 'block',
    marginBottom: '4px',
  };

  return (
    <>
      {/* Toggle tab */}
      <div
        style={{
          position: 'fixed',
          left: isOpen ? '300px' : '0',
          top: '40%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            padding: '16px 10px',
            background: 'linear-gradient(180deg, #FFD700, #FFA500)',
            color: '#0A0A0A',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'none',
            boxShadow: '4px 0 20px rgba(255, 215, 0, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'rotate(180deg) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'rotate(180deg) scale(1)';
          }}
        >
          {isOpen ? '✕ Close' : '₹ EMI Calc'}
        </button>
      </div>

      {/* Sidebar panel */}
      <div
        style={{
          position: 'fixed',
          left: isOpen ? '0' : '-300px',
          top: 0,
          height: '100vh',
          width: '300px',
          zIndex: 99,
          transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(10, 10, 10, 0.92)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          borderLeft: 'none',
          overflowY: 'auto',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.3rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#FFD700',
              marginBottom: '0.25rem',
            }}
          >
            EMI Calculator
          </h3>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Plan your luxury investment
          </p>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, #FFD700, transparent)' }} />

        {/* Property Price */}
        <div>
          <label style={labelStyle}>Property Price</label>
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            style={inputStyle}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.7)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2)';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.25)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          />
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', color: 'rgba(255,215,0,0.5)', marginTop: '4px' }}>
            {formatIndianPrice(propertyPrice)}
          </p>
        </div>

        {/* Down Payment */}
        <div>
          <label style={labelStyle}>Down Payment</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            style={inputStyle}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.7)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2)';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 215, 0, 0.25)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          />
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', color: 'rgba(255,215,0,0.5)', marginTop: '4px' }}>
            {formatIndianPrice(downPayment)}
          </p>
        </div>

        {/* Tenure */}
        <div>
          <label style={labelStyle}>Tenure: {tenure} Years</label>
          <input
            type="range"
            min={5}
            max={30}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#FFD700',
              cursor: 'none',
            }}
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label style={labelStyle}>Interest Rate: {interestRate}%</label>
          <input
            type="range"
            min={5}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#FFD700',
              cursor: 'none',
            }}
          />
        </div>

        {/* Results */}
        <div
          style={{
            padding: '1.25rem',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(255, 215, 0, 0.05)',
            border: '1px solid rgba(255, 215, 0, 0.25)',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,215,0,0.5)', marginBottom: '8px' }}>
              Monthly EMI
            </p>
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
              }}
            >
              {formatIndianPrice(emi)}
            </p>

            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,215,0,0.5)', marginBottom: '8px' }}>
              Total Interest
            </p>
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#DC143C',
              }}
            >
              {formatIndianPrice(totalInterest)}
            </p>

            <div style={{ height: '1px', background: 'rgba(255,215,0,0.2)', margin: '1rem 0' }} />

            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,215,0,0.5)', marginBottom: '4px' }}>
              Loan Amount
            </p>
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              {formatIndianPrice(Math.max(0, propertyPrice - downPayment))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
