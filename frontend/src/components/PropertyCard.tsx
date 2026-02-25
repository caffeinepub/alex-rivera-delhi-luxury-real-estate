import React from 'react';
import { MapPin, Eye, MessageCircle } from 'lucide-react';
import { LocalProperty } from '../types/property';
import { formatIndianPrice } from '../utils/formatIndianPrice';

interface PropertyCardProps {
  property: LocalProperty;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const handleViewDetails = () => {
    window.location.href = `/property?id=${property.id}`;
  };

  const handleEnquire = () => {
    const el = document.querySelector('#consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="group bg-white border border-light-gray hover:border-navy transition-all duration-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={property.photos[0]}
          loading="lazy"
          alt={`${property.title} - Luxury property in ${property.location}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/property-villa-1.dim_800x500.png';
          }}
        />
        {/* City Badge */}
        <span className="absolute top-3 left-3 text-xs font-semibold tracking-wide uppercase bg-navy text-white px-3 py-1 rounded-full">
          {property.city}
        </span>
        {/* Enquiry Badge */}
        {property.enquiryCount > 0 && (
          <span className="absolute top-3 right-3 text-xs font-semibold bg-white/90 text-navy px-2 py-1 rounded-full border border-navy/20">
            🔥 {property.enquiryCount} enquiries
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text-dark mb-1 line-clamp-1">{property.title}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={13} className="text-navy shrink-0" />
          <p className="text-sm text-text-muted line-clamp-1">{property.location}</p>
        </div>
        <p className="text-xl font-bold text-navy mb-4">{formatIndianPrice(property.price)}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-navy text-white py-3 rounded-lg hover:bg-navy-dark transition-colors min-h-[48px]"
          >
            <Eye size={15} />
            View Details
          </button>
          <button
            onClick={handleEnquire}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold border-2 border-navy text-navy py-3 rounded-lg hover:bg-navy hover:text-white transition-colors min-h-[48px]"
          >
            <MessageCircle size={15} />
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
}
