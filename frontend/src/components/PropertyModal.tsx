import React, { useEffect } from 'react';
import { X, MapPin, Maximize2, BedDouble } from 'lucide-react';
import { Property } from '../backend';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  onEnquire: () => void;
}

function formatPrice(price: bigint): string {
  const num = Number(price);
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

export default function PropertyModal({ property, onClose, onEnquire }: PropertyModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const typeLabel = property.propertyType === 'villa' ? 'Villa'
    : property.propertyType === 'penthouse' ? 'Penthouse'
    : property.propertyType === 'land' ? 'Land'
    : 'Commercial';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#111111]/90 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 bg-[#161616] border border-[#2a2a2a] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center border border-[#333] hover:border-gold text-ivory/60 hover:text-gold transition-colors rounded-full"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.imageUrl}
            alt={`${property.name} - Luxury ${typeLabel} in ${property.location}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent" />
          <span className="absolute bottom-4 left-4 font-inter text-xs tracking-widest uppercase bg-gold text-matte-black px-3 py-1">
            {typeLabel}
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="font-playfair text-3xl font-bold text-ivory mb-2">{property.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={14} className="text-gold" />
            <p className="font-inter text-sm text-ivory/60">{property.location}</p>
          </div>
          <p className="font-playfair text-3xl font-bold text-gold mb-6">{formatPrice(property.price)}</p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-[#2a2a2a]">
            <div className="text-center">
              <BedDouble size={18} className="text-gold mx-auto mb-1" />
              <p className="font-inter text-xs text-ivory/50 uppercase tracking-wide">Bedrooms</p>
              <p className="font-playfair text-lg text-ivory">{Number(property.bedrooms)}</p>
            </div>
            <div className="text-center">
              <Maximize2 size={18} className="text-gold mx-auto mb-1" />
              <p className="font-inter text-xs text-ivory/50 uppercase tracking-wide">Area</p>
              <p className="font-playfair text-lg text-ivory">{Number(property.sqft).toLocaleString()} sq ft</p>
            </div>
            <div className="text-center">
              <div className="w-[18px] h-[18px] border border-gold mx-auto mb-1 flex items-center justify-center">
                <div className="w-2 h-2 bg-gold" />
              </div>
              <p className="font-inter text-xs text-ivory/50 uppercase tracking-wide">Type</p>
              <p className="font-playfair text-lg text-ivory">{typeLabel}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <p className="font-inter text-xs tracking-[0.2em] text-gold uppercase mb-3">Key Features</p>
            <div className="flex flex-wrap gap-2">
              {property.features.map(f => (
                <span key={f} className="font-inter text-xs border border-gold/30 text-ivory/70 px-3 py-1 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onEnquire}
            className="w-full font-inter font-medium bg-gold text-matte-black py-4 hover:opacity-90 transition-opacity text-base rounded-sm"
          >
            Schedule Private Viewing
          </button>
        </div>
      </div>
    </div>
  );
}
