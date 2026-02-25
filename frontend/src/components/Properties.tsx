import React, { useEffect, useRef, useState } from 'react';
import { useGetAllProperties } from '../hooks/useQueries';
import PropertyCard from './PropertyCard';
import PropertyMatcher from './PropertyMatcher';
import { useLanguage } from '../contexts/LanguageContext';
import { Property } from '../backend';

const FALLBACK_PROPERTIES: Property[] = [
  {
    id: 'fallback-1',
    title: 'Imperial Penthouse, Lutyens Delhi',
    location: "Lutyens' Delhi",
    price: '280000000',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80',
    description: 'An extraordinary penthouse in the heart of Lutyens Delhi, offering panoramic views of the city with Italian marble interiors.',
    createdAt: BigInt(0),
  },
  {
    id: 'fallback-2',
    title: 'Golf Course Villa, DLF Phase 5',
    location: 'DLF Phase 5, Gurgaon',
    price: '180000000',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&q=80',
    description: 'A stunning villa overlooking the prestigious DLF Golf Course with world-class amenities and private pool.',
    createdAt: BigInt(0),
  },
  {
    id: 'fallback-3',
    title: 'Sky Mansion, Aerocity',
    location: 'Aerocity, New Delhi',
    price: '350000000',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&q=80',
    description: 'The pinnacle of luxury living near the international airport with unmatched connectivity and floor-to-ceiling glass.',
    createdAt: BigInt(0),
  },
  {
    id: 'fallback-4',
    title: 'Heritage Bungalow, Greater Kailash II',
    location: 'Greater Kailash II, South Delhi',
    price: '220000000',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80',
    description: 'Rare 6BHK colonial-style bungalow on a 500 sq yd plot in the heart of GK2, renovated with modern luxuries.',
    createdAt: BigInt(0),
  },
  {
    id: 'fallback-5',
    title: 'Luxury Apartment, Vasant Vihar',
    location: 'Vasant Vihar, South Delhi',
    price: '55000000',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&q=80',
    description: 'Elegant 3BHK apartment in a premium gated complex with rooftop pool, gym, and 24/7 security.',
    createdAt: BigInt(0),
  },
  {
    id: 'fallback-6',
    title: 'Cyber Hub Penthouse, Sector 29',
    location: 'Sector 29, Gurgaon',
    price: '92000000',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop&q=80',
    description: 'Stunning 4BHK duplex penthouse with private rooftop deck, Jacuzzi, and sweeping views of Cyber Hub.',
    createdAt: BigInt(0),
  },
];

export default function Properties() {
  const { t } = useLanguage();
  const { data: properties, isLoading } = useGetAllProperties();
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const displayProperties = (properties && properties.length > 0) ? properties : FALLBACK_PROPERTIES;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [displayProperties]);

  return (
    <section
      id="properties"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0A0D 50%, #0A0A0A 100%)',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '4px 16px',
            marginBottom: '1rem',
            background: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '100px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FFD700',
          }}
        >
          Exclusive Listings
        </div>

        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#FFFFFF',
            marginBottom: '1rem',
          }}
        >
          {t('properties.heading')}
        </h2>

        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.55)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {t('properties.subheading')}
        </p>

        {/* Gold divider */}
        <div
          style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
            margin: '1.5rem auto 0',
          }}
        />
      </div>

      {/* Properties grid */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid rgba(255, 215, 0, 0.2)',
                borderTopColor: '#FFD700',
                animation: 'goldSpin 1s linear infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: 'rgba(255, 215, 0, 0.6)',
                fontSize: '0.9rem',
              }}
            >
              Loading properties...
            </span>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 4vw, 4rem)',
            }}
          >
            {displayProperties.map((property, index) => (
              <div
                key={property.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
                }}
              >
                <PropertyCard
                  property={property}
                  isMatched={matchedIds.includes(property.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '1rem',
            }}
          >
            Looking for something specific? Alex has access to exclusive off-market listings.
          </p>
          <a
            href="https://wa.me/919999999999?text=Hi%20Alex%2C%20I%27m%20looking%20for%20a%20specific%20property%20in%20Delhi%20NCR"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              color: '#FFD700',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Request Private Listings
          </a>
        </div>
      </div>

      {/* Property Matcher Sidebar */}
      <PropertyMatcher
        properties={displayProperties}
        onMatch={setMatchedIds}
      />
    </section>
  );
}
