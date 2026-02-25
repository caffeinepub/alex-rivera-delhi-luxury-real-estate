import React, { useState, useEffect } from 'react';
import { LocalProperty } from '../types/property';
import { getProperties } from '../utils/propertyStorage';
import PropertyCard from './PropertyCard';

const CITIES = ['All', 'Delhi', 'Gurgaon', 'Noida', 'Aerocity', 'Ghaziabad'] as const;

export default function Properties() {
  const [activeCity, setActiveCity] = useState<string>('All');
  const [properties, setProperties] = useState<LocalProperty[]>([]);

  useEffect(() => {
    setProperties(getProperties());
  }, []);

  // Re-read from storage when window gets focus (admin changes)
  useEffect(() => {
    const handleFocus = () => setProperties(getProperties());
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const filtered = activeCity === 'All'
    ? properties
    : properties.filter(p => p.city === activeCity);

  return (
    <section id="properties" className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-navy uppercase mb-3 font-semibold">
            Premium Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-3">
            Featured Properties
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-base">
            Handpicked luxury properties across Delhi NCR — verified listings, transparent pricing.
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CITIES.map(city => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 min-h-[44px] border ${
                activeCity === city
                  ? 'bg-navy text-white border-navy shadow-md'
                  : 'bg-white text-text-dark border-light-gray hover:border-navy hover:text-navy'
              }`}
            >
              {city}
              {city !== 'All' && (
                <span className={`ml-1.5 text-xs ${activeCity === city ? 'text-blue-200' : 'text-text-muted'}`}>
                  ({properties.filter(p => p.city === city).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <p className="text-lg">No properties found for {activeCity}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
