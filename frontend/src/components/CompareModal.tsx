import React, { useEffect } from 'react';
import { X, BedDouble, Maximize2 } from 'lucide-react';
import { useCompare } from '../contexts/CompareContext';
import { Property } from '../backend';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: bigint): string {
  const num = Number(price);
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

const FALLBACK_IMAGE = '/assets/generated/property-villa-1.dim_800x500.png';

const DEMO_PROPERTIES: Property[] = [
  { id: 'prop-1', name: 'Villa Serenova', location: 'Monterra Heights', price: BigInt(4200000), propertyType: 'villa' as any, features: ['5 BHK', '6,200 sq ft', 'Infinity Pool', 'Private Garden', 'Smart Home'], imageUrl: '/assets/generated/property-villa-1.dim_800x500.png', sqft: BigInt(6200), bedrooms: BigInt(5), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-2', name: 'Penthouse Lumière', location: 'Monterra Central Tower', price: BigInt(7800000), propertyType: 'penthouse' as any, features: ['4 BHK', '4,800 sq ft', 'Panoramic Views', 'Private Terrace', 'Concierge'], imageUrl: '/assets/generated/property-penthouse-1.dim_800x500.png', sqft: BigInt(4800), bedrooms: BigInt(4), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-3', name: 'Villa Aurum', location: 'Monterra Riviera', price: BigInt(5600000), propertyType: 'villa' as any, features: ['6 BHK', '7,500 sq ft', 'Waterfront', 'Boat Dock', 'Wine Cellar'], imageUrl: '/assets/generated/property-villa-2.dim_800x500.png', sqft: BigInt(7500), bedrooms: BigInt(6), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-4', name: 'Sky Residence Apex', location: 'Monterra Financial District', price: BigInt(9200000), propertyType: 'penthouse' as any, features: ['5 BHK', '5,400 sq ft', 'Helipad Access', 'Private Pool', 'Butler Service'], imageUrl: '/assets/generated/property-penthouse-2.dim_800x500.png', sqft: BigInt(5400), bedrooms: BigInt(5), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-5', name: 'Villa Monteclair', location: 'Monterra Hills Estate', price: BigInt(3800000), propertyType: 'villa' as any, features: ['4 BHK', '5,100 sq ft', 'Mountain Views', 'Tennis Court', 'Guest House'], imageUrl: '/assets/generated/property-villa-3.dim_800x500.png', sqft: BigInt(5100), bedrooms: BigInt(4), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-6', name: 'Penthouse Éclat', location: 'Monterra Marina Tower', price: BigInt(6500000), propertyType: 'penthouse' as any, features: ['3 BHK', '3,900 sq ft', 'Marina Views', 'Private Lift', 'Spa Suite'], imageUrl: '/assets/generated/property-penthouse-3.dim_800x500.png', sqft: BigInt(3900), bedrooms: BigInt(3), category: 'featured' as any, createdAt: BigInt(0) },
];

export default function CompareModal({ isOpen, onClose }: CompareModalProps) {
  const { compareIds, clearCompare } = useCompare();

  const properties = DEMO_PROPERTIES.filter(p => compareIds.includes(p.id));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        clearCompare();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, clearCompare]);

  if (!isOpen) return null;

  const handleClose = () => {
    clearCompare();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="absolute inset-0 bg-[#111111]/90 backdrop-blur-sm" />
      <div className="relative z-10 bg-[#161616] border border-[#2a2a2a] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#2a2a2a] sticky top-0 bg-[#161616] z-10">
          <h2 className="font-playfair text-2xl font-bold text-ivory">Compare Properties</h2>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center border border-[#333] hover:border-gold text-ivory/60 hover:text-gold transition-colors rounded-full"
            aria-label="Close compare modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-8">
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${properties.length}, 1fr)` }}
          >
            {properties.map(property => {
              const typeLabel = property.propertyType === 'villa' ? 'Villa'
                : property.propertyType === 'penthouse' ? 'Penthouse'
                : property.propertyType === 'land' ? 'Land' : 'Commercial';

              return (
                <div key={property.id} className="border border-[#2a2a2a] rounded-sm overflow-hidden">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-[#1a1a1a]">
                    <img
                      src={property.imageUrl}
                      alt={property.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + FALLBACK_IMAGE) {
                          target.src = FALLBACK_IMAGE;
                        }
                      }}
                    />
                    <span className="absolute bottom-2 left-2 font-inter text-xs bg-gold text-matte-black px-2 py-0.5">
                      {typeLabel}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-ivory">{property.name}</h3>
                      <p className="font-inter text-xs text-ivory/50 mt-0.5">{property.location}</p>
                    </div>

                    <div className="py-3 border-t border-b border-[#2a2a2a]">
                      <p className="font-playfair text-2xl font-bold text-gold">{formatPrice(property.price)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BedDouble size={14} className="text-gold shrink-0" />
                        <span className="font-inter text-xs text-ivory/60">{Number(property.bedrooms)} Bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize2 size={14} className="text-gold shrink-0" />
                        <span className="font-inter text-xs text-ivory/60">{Number(property.sqft).toLocaleString()} sq ft</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-inter text-xs text-gold/70 uppercase tracking-wide mb-2">Features</p>
                      <div className="flex flex-wrap gap-1">
                        {property.features.map(f => (
                          <span key={f} className="font-inter text-xs border border-gold/20 text-ivory/60 px-2 py-0.5 rounded-full">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
