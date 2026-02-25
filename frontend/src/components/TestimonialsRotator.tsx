import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, BadgeCheck } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  verified: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rohit Sharma',
    role: 'CEO',
    location: 'Gurgaon',
    rating: 5,
    text: 'Closed ₹25Cr deal in 30 days! The agent\'s market knowledge and negotiation skills are unmatched. From property search to final registration, everything was handled professionally. Highly recommend for high-value transactions.',
    verified: true,
  },
  {
    name: 'Priya Malhotra',
    role: 'Director, Tech Startup',
    location: 'Noida',
    rating: 5,
    text: 'Found our dream penthouse in Sector 44 Noida within 2 weeks. The agent understood our requirements perfectly and showed us only relevant properties. The ₹21Cr deal was closed smoothly with full RERA compliance.',
    verified: true,
  },
  {
    name: 'Vikram Singh',
    role: 'Managing Director',
    location: 'Delhi',
    rating: 5,
    text: 'Exceptional service for our Aerocity commercial property acquisition. The agent\'s deep knowledge of Delhi NCR market helped us get the best price. Our ₹32Cr investment has already appreciated 15% in one year.',
    verified: true,
  },
  {
    name: 'Anita Kapoor',
    role: 'Entrepreneur',
    location: 'Gurgaon',
    rating: 5,
    text: 'Sold our Golf Course Road villa at ₹22Cr — above asking price! The marketing strategy and buyer network are impressive. The entire process was transparent and completed in just 45 days. Outstanding professionalism.',
    verified: true,
  },
  {
    name: 'Suresh Agarwal',
    role: 'CFO',
    location: 'Aerocity',
    rating: 5,
    text: 'Invested in Aerocity commercial space on this agent\'s recommendation. The ROI has been phenomenal. Their understanding of NCR\'s micro-markets and upcoming developments gives clients a real edge. Truly a trusted advisor.',
    verified: true,
  },
];

export default function TestimonialsRotator() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-20 bg-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-navy uppercase mb-3 font-semibold">
            Client Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark">
            What Clients Say
          </h2>
        </div>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-white border border-light-gray hover:border-navy/30 transition-colors p-8 md:p-12 rounded-xl text-center shadow-sm">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl text-text-dark/85 leading-relaxed mb-7 italic">
              "{t.text}"
            </blockquote>

            {/* Client */}
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-lg font-bold text-navy">{t.name}</p>
              <p className="text-sm text-text-muted">{t.role} · {t.location}</p>
              {t.verified && (
                <div className="flex items-center gap-1.5 border border-navy/30 px-3 py-1 rounded-full mt-1">
                  <BadgeCheck size={13} className="text-navy" />
                  <span className="text-xs text-navy font-medium">Verified Client</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-7">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all duration-200 rounded-full min-h-[48px]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === current ? 'w-6 h-2.5 bg-navy' : 'w-2.5 h-2.5 bg-light-gray hover:bg-navy/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all duration-200 rounded-full min-h-[48px]"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
