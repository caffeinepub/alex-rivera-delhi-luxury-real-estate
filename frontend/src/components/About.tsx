import { useEffect, useRef } from 'react';
import { Star, Award, TrendingUp, Users } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rajiv Mehta',
    role: 'CEO, TechVentures India',
    quote:
      "Alex found us our dream penthouse in CP within 3 weeks. His knowledge of Delhi's luxury market is unmatched. The entire process was seamless and professional.",
    rating: 5,
    location: 'Connaught Place',
  },
  {
    name: 'Priya Sharma',
    role: 'NRI Investor, London',
    quote:
      "As an NRI, I was nervous about investing remotely. Alex handled everything — from virtual tours to paperwork. We closed a ₹15Cr villa in Gurgaon without a single issue.",
    rating: 5,
    location: 'DLF Phase 5, Gurgaon',
  },
  {
    name: 'Arjun & Neha Kapoor',
    role: 'Business Family, South Delhi',
    quote:
      "We had very specific requirements for our GK2 bungalow. Alex listened, understood, and delivered beyond expectations. Truly a luxury experience from start to finish.",
    rating: 5,
    location: 'Greater Kailash II',
  },
];

const STATS = [
  { icon: Award, value: '50+', label: 'Deals Closed' },
  { icon: TrendingUp, value: '₹500Cr+', label: 'Portfolio Value' },
  { icon: Users, value: '200+', label: 'Happy Clients' },
  { icon: Star, value: '12+', label: 'Years in Delhi' },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#FFD700' }} />
      ))}
    </div>
  );
}

function useFadeUpChildren(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach(child => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px)';
      child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, i * 200);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useFadeUpChildren(statsRef as React.RefObject<HTMLElement>);
  useFadeUpChildren(bioRef as React.RefObject<HTMLElement>);
  useFadeUpChildren(testimonialsRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: 'rgba(255,215,0,0.5)' }} />
            <span
              className="text-xs font-medium tracking-[0.3em] uppercase"
              style={{ color: 'rgba(255,215,0,0.7)' }}
            >
              The Agent
            </span>
            <div className="h-px w-10" style={{ background: 'rgba(255,215,0,0.5)' }} />
          </div>
          <h2
            className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl"
            style={{ color: '#F5F0E8' }}
          >
            Meet{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Alex Rivera
            </span>
          </h2>
        </div>

        {/* Bio + Image */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              className="absolute -inset-3 rounded-lg opacity-20"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #DC143C 100%)',
              }}
            />
            <img
              src="/assets/generated/alex-rivera-portrait.dim_600x800.png"
              alt="Alex Rivera - Delhi Luxury Real Estate Agent"
              className="relative rounded-lg w-full max-w-sm mx-auto object-cover"
              style={{ border: '1px solid rgba(255,215,0,0.2)' }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <div
              className="absolute -bottom-4 -right-4 sm:right-8 px-4 py-3 rounded-lg"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,215,0,0.3)',
              }}
            >
              <div className="font-serif font-bold text-lg" style={{ color: '#FFD700' }}>
                #1
              </div>
              <div className="text-xs" style={{ color: 'rgba(245,240,232,0.6)' }}>
                Delhi NCR Agent
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="order-1 lg:order-2">
            <p
              className="text-base sm:text-lg leading-relaxed mb-5"
              style={{ color: 'rgba(245,240,232,0.75)' }}
            >
              With over{' '}
              <span style={{ color: '#FFD700' }}>12 years of expertise</span> in Delhi
              NCR&apos;s luxury real estate market, Alex Rivera has become the go-to advisor for
              India&apos;s most discerning buyers and investors.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed mb-5"
              style={{ color: 'rgba(245,240,232,0.6)' }}
            >
              From iconic penthouses in Connaught Place to sprawling villas in DLF Gurgaon,
              Alex has curated a portfolio exceeding{' '}
              <span style={{ color: '#FFD700' }}>₹500 Crore</span> — serving HNIs, NRIs,
              and corporate executives who demand nothing but the finest.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed mb-8"
              style={{ color: 'rgba(245,240,232,0.6)' }}
            >
              His deep market intelligence, exclusive developer relationships, and
              white-glove service have earned him a reputation as Delhi&apos;s most trusted
              luxury real estate professional.
            </p>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-lg"
                  style={{
                    background: 'rgba(255,215,0,0.04)',
                    border: '1px solid rgba(255,215,0,0.12)',
                  }}
                >
                  <stat.icon
                    className="w-4 h-4 mx-auto mb-1"
                    style={{ color: '#FFD700' }}
                  />
                  <div
                    className="font-serif font-bold text-base"
                    style={{ color: '#FFD700' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] tracking-wide"
                    style={{ color: 'rgba(245,240,232,0.45)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-14"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
          }}
        />

        {/* Testimonials */}
        <div>
          <h3
            className="font-serif font-bold text-2xl sm:text-3xl text-center mb-10"
            style={{ color: '#F5F0E8' }}
          >
            Client{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Testimonials
            </span>
          </h3>

          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-lg"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,215,0,0.12)',
                }}
              >
                <StarRating count={t.rating} />
                <p
                  className="text-sm leading-relaxed my-4 italic"
                  style={{ color: 'rgba(245,240,232,0.7)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div
                  className="h-px mb-4"
                  style={{ background: 'rgba(255,215,0,0.1)' }}
                />
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#F5F0E8' }}>
                    {t.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.45)' }}>
                    {t.role}
                  </div>
                  <div
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: '#DC143C' }}
                  >
                    <span>📍</span>
                    {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
