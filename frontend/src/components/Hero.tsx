import React from 'react';
import { Shield, Award, Users } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/delhi-skyline-hero.dim_1920x1080.png')`,
        }}
        role="img"
        aria-label="Delhi skyline panoramic view"
      />

      {/* Navy Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(30,58,138,0.75) 0%, rgba(30,58,138,0.55) 50%, rgba(30,58,138,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24 fade-in">
        {/* RERA Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 rounded-full px-4 py-2 mb-6">
          <Shield size={14} className="text-white" />
          <span className="text-white text-xs font-semibold tracking-wide">
            RERA Registered Agent – HRERA-PKL-2026-00123
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Trusted Delhi Agent
          <br />
          <span className="text-blue-200">50+ Deals Closed</span>
        </h1>

        {/* Credentials Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 mt-4">
          <div className="flex items-center gap-2 text-white/90">
            <Award size={16} className="text-blue-200" />
            <span className="text-sm font-medium">5+ Years Experience</span>
          </div>
          <span className="text-white/40 hidden md:block">|</span>
          <div className="flex items-center gap-2 text-white/90">
            <Users size={16} className="text-blue-200" />
            <span className="text-sm font-medium">50+ Happy Clients</span>
          </div>
          <span className="text-white/40 hidden md:block">|</span>
          <div className="flex items-center gap-2 text-white/90">
            <Shield size={16} className="text-blue-200" />
            <span className="text-sm font-medium">CREDAI Member</span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Premium luxury real estate in Delhi NCR — Delhi, Gurgaon, Noida, Aerocity & Ghaziabad.
          Your trusted partner for high-value property transactions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('#properties')}
            className="font-semibold bg-white text-navy px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105 text-base min-h-[52px]"
          >
            View Properties
          </button>
          <button
            onClick={() => scrollTo('#consultation')}
            className="font-semibold border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-navy transition-all duration-200 text-base min-h-[52px]"
          >
            Book Consultation
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/50" />
      </div>
    </section>
  );
}
