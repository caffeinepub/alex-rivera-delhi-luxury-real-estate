import React, { useState } from 'react';
import { Property } from '../backend';
import { formatIndianPrice, parsePriceToNumber } from '../utils/formatIndianPrice';

interface PropertyMatcherProps {
  properties: Property[];
  onMatch: (ids: string[]) => void;
}

const BUDGET_OPTIONS = [
  { label: formatIndianPrice(5000000), value: 5000000 },
  { label: formatIndianPrice(10000000), value: 10000000 },
  { label: formatIndianPrice(25000000), value: 25000000 },
  { label: formatIndianPrice(50000000), value: 50000000 },
  { label: formatIndianPrice(100000000), value: 100000000 },
  { label: formatIndianPrice(500000000), value: 500000000 },
];

const LOCATION_OPTIONS = [
  'All Locations',
  "Lutyens' Delhi",
  'DLF Phase 5',
  'Aerocity',
  'Vasant Vihar',
  'Greater Kailash',
  'Gurgaon',
  'Noida',
];

export default function PropertyMatcher({ properties, onMatch }: PropertyMatcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState<number>(100000000);
  const [location, setLocation] = useState('All Locations');
  const [hasMatched, setHasMatched] = useState(false);

  const handleMatch = () => {
    const matched = properties
      .filter((p) => {
        const priceNum = parsePriceToNumber(p.price);
        const locationMatch = location === 'All Locations' || p.location.toLowerCase().includes(location.toLowerCase());
        const budgetMatch = priceNum <= budget;
        return locationMatch && budgetMatch;
      })
      .slice(0, 3)
      .map((p) => p.id);

    onMatch(matched);
    setHasMatched(true);
  };

  const handleReset = () => {
    onMatch([]);
    setHasMatched(false);
  };

  return (
    <>
      {/* Toggle tab */}
      <div
        style={{
          position: 'fixed',
          right: isOpen ? '280px' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            padding: '16px 10px',
            background: 'linear-gradient(180deg, #FFD700, #FFA500)',
            color: '#0A0A0A',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            border: 'none',
            borderRadius: '8px 0 0 8px',
            cursor: 'none',
            boxShadow: '-4px 0 20px rgba(255, 215, 0, 0.3)',
            animation: 'matchBtnPulse 2s ease-in-out infinite',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          {isOpen ? '✕ Close' : '🔑 Match'}
        </button>
      </div>

      {/* Sidebar panel */}
      <div
        style={{
          position: 'fixed',
          right: isOpen ? '0' : '-280px',
          top: 0,
          height: '100vh',
          width: '280px',
          zIndex: 99,
          transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(10, 10, 10, 0.92)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          borderRight: 'none',
          overflowY: 'auto',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
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
            Property Matcher
          </h3>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Find your perfect property
          </p>
        </div>

        {/* Gold divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, #FFD700, transparent)',
          }}
        />

        {/* Budget selector */}
        <div>
          <label
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 215, 0, 0.7)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Max Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '4px',
              color: '#FFFFFF',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.85rem',
              cursor: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} style={{ background: '#0A0A0A' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location selector */}
        <div>
          <label
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 215, 0, 0.7)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '4px',
              color: '#FFFFFF',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.85rem',
              cursor: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc} style={{ background: '#0A0A0A' }}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Current budget display */}
        <div
          style={{
            padding: '12px',
            background: 'rgba(255, 215, 0, 0.05)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.65rem',
              color: 'rgba(255, 215, 0, 0.5)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            Selected Budget
          </p>
          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {formatIndianPrice(budget)}
          </p>
        </div>

        {/* Match button */}
        <button
          onClick={handleMatch}
          style={{
            padding: '14px',
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            border: 'none',
            borderRadius: '4px',
            color: '#0A0A0A',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          🔑 Find My Property
        </button>

        {hasMatched && (
          <button
            onClick={handleReset}
            style={{
              padding: '10px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '4px',
              color: '#FFD700',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            Reset Filters
          </button>
        )}
      </div>
    </>
  );
}
