import React, { useRef, useState } from 'react';
import { Property } from '../backend';
import PropertyModal from './PropertyModal';
import { formatIndianPrice, parsePriceToNumber } from '../utils/formatIndianPrice';

interface PropertyCardProps {
  property: Property;
  isMatched?: boolean;
}

export default function PropertyCard({ property, isMatched }: PropertyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const priceNum = parsePriceToNumber(property.price);
  const formattedPrice = priceNum > 0 ? formatIndianPrice(priceNum) : property.price;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || isFlipped) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    card.style.transform = `perspective(1000px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
  };

  return (
    <>
      <div
        ref={cardRef}
        className="card-luxury"
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          perspective: '1000px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          outline: isMatched ? '2px solid #FFD700' : 'none',
          outlineOffset: isMatched ? '4px' : '0',
          boxShadow: isMatched
            ? '0 0 30px rgba(255, 215, 0, 0.4), 0 20px 40px rgba(255, 215, 0, 0.15)'
            : '0 4px 20px rgba(0,0,0,0.4)',
          borderRadius: '8px',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card inner (flip container) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT FACE */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '8px',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
            }}
          >
            {/* Property image */}
            <div style={{ position: 'relative', height: '60%', overflow: 'hidden' }}>
              {property.imageUrl ? (
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #1A0A1A 0%, #0A0A0A 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '3rem' }}>🏛️</span>
                </div>
              )}

              {/* Price badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  padding: '6px 14px',
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  borderRadius: '4px',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#0A0A0A',
                  letterSpacing: '0.02em',
                }}
              >
                {formattedPrice}
              </div>
            </div>

            {/* Card content */}
            <div style={{ padding: '1.25rem', height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: '#FFFFFF',
                    marginBottom: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {property.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgba(255, 215, 0, 0.7)',
                    letterSpacing: '0.05em',
                  }}
                >
                  📍 {property.location}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsFlipped(true)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    background: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    color: '#FFD700',
                    borderRadius: '4px',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  360° Tour
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    border: 'none',
                    color: '#0A0A0A',
                    borderRadius: '4px',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '8px',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(10, 10, 10, 0.85)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: '#FFD700',
                  marginBottom: '0.75rem',
                }}
              >
                {property.title}
              </h3>

              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  borderRadius: '4px',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#0A0A0A',
                  marginBottom: '1rem',
                }}
              >
                {formattedPrice}
              </div>

              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.82rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}
              >
                {property.description || 'A prestigious property in the heart of Delhi NCR, offering unparalleled luxury and exclusivity.'}
              </p>

              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.78rem',
                  color: 'rgba(255, 215, 0, 0.7)',
                }}
              >
                📍 {property.location}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setIsFlipped(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  color: '#FFD700',
                  borderRadius: '4px',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                ← Back
              </button>
              <a
                href={`https://wa.me/919999999999?text=Interested in ${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: '10px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  border: 'none',
                  color: '#0A0A0A',
                  borderRadius: '4px',
                  cursor: 'none',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                📱 Enquire
              </a>
            </div>
          </div>
        </div>
      </div>

      <PropertyModal
        property={property}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
