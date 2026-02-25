import React, { useEffect } from 'react';
import { X, Trash2, Heart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useGetAllProperties } from '../hooks/useQueries';
import { Property } from '../backend';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: bigint): string {
  const num = Number(price);
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

// Demo properties for wishlist display when backend is empty
const DEMO_PROPERTIES: Property[] = [
  { id: 'prop-1', name: 'Villa Serenova', location: 'Monterra Heights', price: BigInt(4200000), propertyType: 'villa' as any, features: ['5 BHK', '6,200 sq ft'], imageUrl: '/assets/generated/property-villa-1.dim_800x600.webp', sqft: BigInt(6200), bedrooms: BigInt(5), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-2', name: 'Penthouse Lumière', location: 'Monterra Central Tower', price: BigInt(7800000), propertyType: 'penthouse' as any, features: ['4 BHK', '4,800 sq ft'], imageUrl: '/assets/generated/property-penthouse-1.dim_800x600.webp', sqft: BigInt(4800), bedrooms: BigInt(4), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-3', name: 'Villa Aurum', location: 'Monterra Riviera', price: BigInt(5600000), propertyType: 'villa' as any, features: ['6 BHK', '7,500 sq ft'], imageUrl: '/assets/generated/property-villa-2.dim_800x600.webp', sqft: BigInt(7500), bedrooms: BigInt(6), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-4', name: 'Sky Residence Apex', location: 'Monterra Financial District', price: BigInt(9200000), propertyType: 'penthouse' as any, features: ['5 BHK', '5,400 sq ft'], imageUrl: '/assets/generated/property-penthouse-2.dim_800x600.webp', sqft: BigInt(5400), bedrooms: BigInt(5), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-5', name: 'Villa Monteclair', location: 'Monterra Hills Estate', price: BigInt(3800000), propertyType: 'villa' as any, features: ['4 BHK', '5,100 sq ft'], imageUrl: '/assets/generated/property-villa-3.dim_800x600.webp', sqft: BigInt(5100), bedrooms: BigInt(4), category: 'featured' as any, createdAt: BigInt(0) },
  { id: 'prop-6', name: 'Penthouse Éclat', location: 'Monterra Marina Tower', price: BigInt(6500000), propertyType: 'penthouse' as any, features: ['3 BHK', '3,900 sq ft'], imageUrl: '/assets/generated/property-penthouse-3.dim_800x600.webp', sqft: BigInt(3900), bedrooms: BigInt(3), category: 'featured' as any, createdAt: BigInt(0) },
];

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlistIds, removeFromWishlist, wishlistCount } = useWishlist();
  const { data: backendProperties } = useGetAllProperties();

  const allProperties = (backendProperties && backendProperties.length > 0) ? backendProperties : DEMO_PROPERTIES;
  const savedProperties = allProperties.filter(p => wishlistIds.includes(p.id));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] bg-[#111111]/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-[80] bg-[#161616] border-l border-[#2a2a2a] transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-gold fill-gold" />
            <h2 className="font-playfair text-xl font-semibold text-ivory">Saved Properties</h2>
            {wishlistCount > 0 && (
              <span className="font-inter text-xs bg-gold text-matte-black w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {wishlistCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-ivory/50 hover:text-gold transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {savedProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <Heart size={40} className="text-[#333] mb-4" />
              <p className="font-playfair text-lg text-ivory/40">No properties saved yet</p>
              <p className="font-inter text-sm text-ivory/30 mt-2">
                Click the heart icon on any property to save it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedProperties.map(property => (
                <div
                  key={property.id}
                  className="flex gap-3 bg-[#1a1a1a] border border-[#2a2a2a] p-3 rounded-sm"
                >
                  <img
                    src={property.imageUrl}
                    loading="lazy"
                    alt={property.name}
                    className="w-20 h-16 object-cover rounded-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-playfair text-sm font-semibold text-ivory truncate">{property.name}</h4>
                    <p className="font-inter text-xs text-ivory/50 truncate">{property.location}</p>
                    <p className="font-playfair text-sm font-bold text-gold mt-1">{formatPrice(property.price)}</p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(property.id)}
                    className="text-ivory/30 hover:text-red-400 transition-colors shrink-0 self-start mt-1"
                    aria-label={`Remove ${property.name} from wishlist`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedProperties.length > 0 && (
          <div className="px-6 py-4 border-t border-[#2a2a2a]">
            <button
              onClick={() => {
                onClose();
                const el = document.querySelector('#consultation');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full font-inter text-sm font-medium bg-gold text-matte-black py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              Enquire About Saved Properties
            </button>
          </div>
        )}
      </div>
    </>
  );
}
