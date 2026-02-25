import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, MessageCircle, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { LocalProperty } from '../types/property';
import { getProperties } from '../utils/propertyStorage';
import { formatIndianPrice } from '../utils/formatIndianPrice';

export default function PropertyPage() {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');
  const propertyId = idParam ? parseInt(idParam, 10) : null;

  const [property, setProperty] = useState<LocalProperty | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (propertyId === null) {
      setNotFound(true);
      return;
    }
    const props = getProperties();
    const found = props.find(p => p.id === propertyId);
    if (found) {
      setProperty(found);
    } else {
      setNotFound(true);
    }
  }, [propertyId]);

  const handleBack = () => {
    window.history.back();
  };

  const prevPhoto = () => {
    if (!property) return;
    setCurrentPhoto(i => (i === 0 ? property.photos.length - 1 : i - 1));
  };

  const nextPhoto = () => {
    if (!property) return;
    setCurrentPhoto(i => (i === property.photos.length - 1 ? 0 : i + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPhoto();
      else prevPhoto();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-off-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-dark mb-3">Property Not Found</h1>
          <p className="text-text-muted mb-6">The property you are looking for does not exist or has been removed.</p>
          <button
            onClick={handleBack}
            className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-dark transition-colors min-h-[48px]"
          >
            ← Back to Listings
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const mapsUrl = `https://maps.google.com/?q=${property.lat},${property.lng}`;

  return (
    <div className="min-h-screen bg-off-white pb-24 md:pb-8">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-light-gray shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-navy font-semibold hover:text-navy-dark transition-colors min-h-[48px] px-2"
            aria-label="Go back to listings"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-dark truncate">{property.title}</p>
            <p className="text-xs text-text-muted">{property.city}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Photo Carousel */}
        <div
          className="relative rounded-xl overflow-hidden mb-6 bg-light-gray"
          style={{ height: '320px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={property.photos[currentPhoto]}
            alt={`${property.title} - Photo ${currentPhoto + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/generated/property-villa-1.dim_800x500.png';
            }}
          />

          {/* Photo Navigation */}
          {property.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} className="text-navy" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={20} className="text-navy" />
              </button>
            </>
          )}

          {/* Photo Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPhoto(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === currentPhoto ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/60'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          {/* City Badge */}
          <span className="absolute top-4 left-4 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {property.city}
          </span>

          {/* Enquiry Badge */}
          {property.enquiryCount > 0 && (
            <span className="absolute top-4 right-4 bg-white/90 text-navy text-xs font-semibold px-3 py-1.5 rounded-full border border-navy/20">
              🔥 {property.enquiryCount} enquiries
            </span>
          )}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-light-gray p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-navy shrink-0" />
                <p className="text-text-muted">{property.location}</p>
              </div>
              <p className="text-3xl font-bold text-navy mb-4">{formatIndianPrice(property.price)}</p>

              {/* Map Link */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy border border-navy px-4 py-2.5 rounded-lg hover:bg-navy hover:text-white transition-colors min-h-[44px]"
              >
                <ExternalLink size={15} />
                View on Google Maps
              </a>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-xl border border-light-gray p-6">
              <h2 className="text-lg font-bold text-text-dark mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-off-white rounded-lg p-4">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">City</p>
                  <p className="font-semibold text-text-dark">{property.city}</p>
                </div>
                <div className="bg-off-white rounded-lg p-4">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Enquiries</p>
                  <p className="font-semibold text-text-dark">{property.enquiryCount}</p>
                </div>
                <div className="bg-off-white rounded-lg p-4">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Latitude</p>
                  <p className="font-semibold text-text-dark">{property.lat}</p>
                </div>
                <div className="bg-off-white rounded-lg p-4">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Longitude</p>
                  <p className="font-semibold text-text-dark">{property.lng}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-4">
            <div className="bg-navy rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Interested in this property?</h3>
              <p className="text-blue-200 text-sm mb-5">Contact our agent for a private viewing and detailed information.</p>
              <a
                href="tel:+919999999999"
                className="flex items-center justify-center gap-2 w-full bg-white text-navy font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors mb-3 min-h-[48px]"
              >
                <Phone size={16} />
                Call Agent
              </a>
              <a
                href={`https://wa.me/919999999999?text=Hi, I'm interested in ${encodeURIComponent(property.title)} (${formatIndianPrice(property.price)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border-2 border-white text-white font-bold py-3 rounded-lg hover:bg-white hover:text-navy transition-colors min-h-[48px]"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>

            {/* RERA Badge */}
            <div className="bg-white rounded-xl border border-light-gray p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-text-dark">RERA Registered</p>
                  <p className="text-xs text-text-muted">HRERA-PKL-2026-00123</p>
                </div>
              </div>
              <p className="text-xs text-text-muted">All transactions are RERA compliant and legally verified.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
