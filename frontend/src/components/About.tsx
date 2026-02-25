import React, { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 18, suffix: '+', label: 'Years Experience' },
  { value: 340, suffix: '+', label: 'Deals Closed' },
  { value: 12, suffix: '', label: 'Markets Served' },
];

function AnimatedCounter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, value]);

  return (
    <span className="font-playfair text-4xl font-bold text-gold">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersActive, setCountersActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src="/assets/generated/alex-rivera-portrait.dim_600x800.png"
                loading="lazy"
                alt="Alexander Reid - Distinguished luxury real estate advisor in tailored suit"
                className="w-full max-w-md mx-auto object-cover"
              />
              <div className="absolute inset-0 border border-gold/20 rounded-sm pointer-events-none" />
            </div>
            {/* Gold accent line */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-2 border-b-2 border-gold/40 hidden lg:block" />
          </div>

          {/* Content */}
          <div>
            <p className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4">
              About the Advisor
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-6">
              Alexander Reid
            </h2>
            <p className="font-inter text-ivory/70 leading-relaxed mb-8 text-base">
              With nearly two decades of experience navigating the world's most exclusive real estate markets, Alexander Reid has established himself as the premier luxury property advisor in Monterra City. His approach combines deep market intelligence with a commitment to discretion and client-first service.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-t border-b border-[#C6A75E]/20">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} active={countersActive} />
                  <p className="font-inter text-xs text-ivory/50 mt-1 tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Specializations */}
            <div className="mb-8">
              <p className="font-inter text-xs tracking-[0.2em] text-gold uppercase mb-3">Specializations</p>
              <div className="flex flex-wrap gap-2">
                {['Luxury Villas', 'Penthouses', 'Commercial', 'Investment Land', 'Waterfront Estates'].map(spec => (
                  <span key={spec} className="font-inter text-xs border border-gold/40 text-ivory/70 px-3 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="font-inter text-xs tracking-[0.2em] text-gold uppercase mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {['RICS Member', 'FIABCI Global', 'CRS Certified', 'CCIM Designee'].map(cert => (
                  <span key={cert} className="font-inter text-xs bg-[#1a1a1a] text-ivory/60 px-3 py-1 rounded-full border border-[#333]">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* My Vision Section */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <p className="font-inter text-xs tracking-[0.3em] text-gold uppercase mb-4">Philosophy</p>
          <h3 className="font-playfair text-4xl font-bold text-ivory mb-3 gold-underline inline-block">
            My Vision
          </h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                title: 'Integrity Above All',
                text: 'Every transaction is built on transparency and honesty. My clients receive complete market intelligence — the good and the challenging — so they can make decisions with full confidence.',
              },
              {
                title: 'Strategic Advisory',
                text: 'Real estate is not just a purchase; it is a strategic asset. I provide comprehensive advisory that considers market cycles, portfolio diversification, and long-term capital appreciation.',
              },
              {
                title: 'Client-First Philosophy',
                text: 'Your goals define my strategy. Whether you seek a primary residence, a trophy asset, or a yield-generating investment, every recommendation is tailored to your unique vision.',
              },
              {
                title: 'Long-Term Wealth Building',
                text: 'I focus on properties that endure — architecturally significant, strategically located, and positioned for generational wealth. Premium real estate is the foundation of lasting legacy.',
              },
            ].map(item => (
              <div key={item.title} className="border-l-2 border-gold/40 pl-6">
                <h4 className="font-playfair text-lg font-semibold text-gold mb-2">{item.title}</h4>
                <p className="font-inter text-sm text-ivory/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
