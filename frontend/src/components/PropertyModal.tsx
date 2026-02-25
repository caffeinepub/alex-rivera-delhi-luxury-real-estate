import React from 'react';
import { Property } from '../backend';
import { formatIndianPrice, parsePriceToNumber } from '../utils/formatIndianPrice';

interface PropertyModalProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

export default function PropertyModal({ property, open, onClose }: PropertyModalProps) {
  if (!open || !property) return null;

  const priceNum = parsePriceToNumber(property.price);
  const formattedPrice = priceNum > 0 ? formatIndianPrice(priceNum) : property.price;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal content */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(10, 10, 10, 0.9)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {property.imageUrl && (
          <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
            <img
              src={property.imageUrl}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)',
              }}
            />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              color: '#FFD700',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'none',
              transition: 'all 0.3s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            ×
          </button>

          <h2
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#FFFFFF',
              marginBottom: '0.5rem',
            }}
          >
            {property.title}
          </h2>

          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.85rem',
              color: 'rgba(255, 215, 0, 0.7)',
              marginBottom: '1rem',
              letterSpacing: '0.05em',
            }}
          >
            📍 {property.location}
          </p>

          {/* Price */}
          <div
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              borderRadius: '4px',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: '1.4rem',
              color: '#0A0A0A',
              marginBottom: '1.5rem',
              letterSpacing: '0.02em',
            }}
          >
            {formattedPrice}
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            {property.description || 'A prestigious property in the heart of Delhi NCR, offering unparalleled luxury and exclusivity.'}
          </p>

          {/* CTA */}
          <a
            href={`https://wa.me/919999999999?text=I am interested in ${encodeURIComponent(property.title)} priced at ${encodeURIComponent(formattedPrice)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: '#0A0A0A',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            📱 Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
