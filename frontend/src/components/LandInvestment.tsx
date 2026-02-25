import React from 'react';
import { TrendingUp, MapPin } from 'lucide-react';

interface LandCard {
  id: string;
  name: string;
  location: string;
  pricePerUnit: string;
  unit: string;
  zoning: string;
  investmentPotential: string;
  infrastructure: string[];
  imageUrl: string;
}

const LAND_LISTINGS: LandCard[] = [
  {
    id: 'land-1',
    name: 'Monterra Residences',
    location: 'Monterra North District',
    pricePerUnit: '$850',
    unit: 'per sq ft',
    zoning: 'Residential Zoning — R3 High Density',
    investmentPotential: 'Prime residential development parcel with approved permits for 240-unit luxury condominium complex. Projected 18% ROI over 5 years.',
    infrastructure: ['Metro Line 2 — 400m', 'International School — 1.2km', 'Monterra Marina — 2km'],
    imageUrl: '/assets/generated/land-residential.dim_800x500.png',
  },
  {
    id: 'land-2',
    name: 'Monterra Commerce Hub',
    location: 'Monterra Financial District',
    pricePerUnit: '$1,200',
    unit: 'per sq ft',
    zoning: 'Commercial Zoning — C4 Mixed Use',
    investmentPotential: 'Strategic commercial land in the heart of Monterra\'s financial corridor. Ideal for Grade-A office tower or mixed-use development.',
    infrastructure: ['Central Business District — 0.5km', 'Airport Express — 800m', 'Luxury Hotels — Adjacent'],
    imageUrl: '/assets/generated/land-commercial.dim_800x500.png',
  },
  {
    id: 'land-3',
    name: 'Harbour Point Parcel',
    location: 'Monterra Coastal Reserve',
    pricePerUnit: '$2.4M',
    unit: 'per acre',
    zoning: 'Coastal Development — CD2 Premium',
    investmentPotential: 'Rare waterfront development parcel with unobstructed ocean views. Approved for boutique resort or ultra-luxury villa estate.',
    infrastructure: ['Private Beach Access', 'Yacht Club — 300m', 'Coastal Highway — Direct'],
    imageUrl: '/assets/generated/land-coastal.dim_800x500.png',
  },
  {
    id: 'land-4',
    name: 'International Liaison Site',
    location: 'Monterra Global Quarter',
    pricePerUnit: '$980',
    unit: 'per sq ft',
    zoning: 'International Business Zone — IBZ1',
    investmentPotential: 'Positioned within Monterra\'s designated international business zone. Ideal for embassy-grade offices, international HQs, or diplomatic residences.',
    infrastructure: ['Diplomatic Quarter — Adjacent', 'International Airport — 8km', 'Convention Centre — 1.5km'],
    imageUrl: '/assets/generated/land-international.dim_800x500.png',
  },
];

export default function LandInvestment() {
  const scrollToConsultation = () => {
    const el = document.querySelector('#consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="land" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4">
            Strategic Investments
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
            Land & Investment Opportunities
          </h2>
          <p className="font-inter text-ivory/60 max-w-xl mx-auto text-base">
            Exclusive development parcels and investment-grade land in Monterra City's most strategic locations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LAND_LISTINGS.map(land => (
            <div
              key={land.id}
              className="group bg-[#161616] border border-[#2a2a2a] hover:border-gold/40 transition-all duration-300 overflow-hidden rounded-sm"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={land.imageUrl}
                  loading="lazy"
                  alt={`${land.name} - Premium land investment opportunity in ${land.location}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-playfair text-lg font-semibold text-ivory mb-1">{land.name}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin size={12} className="text-gold shrink-0" />
                  <p className="font-inter text-xs text-ivory/50">{land.location}</p>
                </div>

                {/* Price */}
                <div className="mb-3 py-2 border-t border-b border-[#2a2a2a]">
                  <span className="font-playfair text-xl font-bold text-gold">{land.pricePerUnit}</span>
                  <span className="font-inter text-xs text-ivory/40 ml-1">{land.unit}</span>
                </div>

                {/* Zoning */}
                <p className="font-inter text-xs text-gold/70 mb-2 tracking-wide">{land.zoning}</p>

                {/* Investment Potential */}
                <p className="font-inter text-xs text-ivory/55 leading-relaxed mb-3 line-clamp-3">
                  {land.investmentPotential}
                </p>

                {/* Infrastructure */}
                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    <TrendingUp size={11} className="text-gold" />
                    <span className="font-inter text-xs text-gold/70 uppercase tracking-wide">Nearby</span>
                  </div>
                  {land.infrastructure.map(item => (
                    <p key={item} className="font-inter text-xs text-ivory/40 mb-0.5">· {item}</p>
                  ))}
                </div>

                <button
                  onClick={scrollToConsultation}
                  className="w-full font-inter text-xs font-medium border border-gold/40 text-gold hover:bg-gold hover:text-matte-black transition-all duration-200 py-2 rounded-sm"
                >
                  Request Information
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
