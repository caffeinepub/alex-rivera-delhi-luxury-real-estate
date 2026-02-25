import React from 'react';
import { Calculator, Search } from 'lucide-react';

export default function MobileBottomBar() {
  const scrollToConsultation = () => {
    const el = document.querySelector('#consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProperties = () => {
    const el = document.querySelector('#properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-navy shadow-lg" style={{ height: '64px' }}>
      <div className="flex h-full">
        <button
          onClick={scrollToProperties}
          className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold text-sm hover:bg-navy-dark transition-colors min-h-[60px]"
        >
          <Search size={18} />
          Find My Property
        </button>
        <div className="w-px bg-navy/30" />
        <button
          onClick={scrollToConsultation}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-navy font-bold text-sm hover:bg-off-white transition-colors min-h-[60px] border-l border-navy/20"
        >
          <Calculator size={18} />
          Calculate EMI
        </button>
      </div>
    </div>
  );
}
