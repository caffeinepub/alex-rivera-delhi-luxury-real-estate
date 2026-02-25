import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Properties', href: '#properties' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#consultation' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      // If we're not on the home page, navigate home first
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href;
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md border-b border-light-gray'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Brand */}
          <a
            href="/"
            className="text-xl font-bold text-navy tracking-tight hover:opacity-80 transition-opacity"
          >
            Delhi Luxury Empire
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-text-dark hover:text-navy transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/admin"
              className="text-sm font-medium text-text-muted hover:text-navy transition-colors"
            >
              Admin
            </a>
            <a
              href="#consultation"
              onClick={(e) => handleNavClick(e, '#consultation')}
              className="text-sm font-semibold bg-navy text-white px-5 py-2.5 rounded-lg hover:bg-navy-dark transition-colors min-h-[44px] flex items-center"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-navy p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-light-gray">
            <span className="text-xl font-bold text-navy">Delhi Luxury Empire</span>
            <button
              className="text-navy p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-4 py-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-text-dark hover:text-navy hover:bg-off-white transition-colors py-3 px-3 rounded-lg min-h-[52px] flex items-center"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              className="text-lg font-medium text-text-muted hover:text-navy hover:bg-off-white transition-colors py-3 px-3 rounded-lg min-h-[52px] flex items-center"
            >
              Admin Panel
            </a>
            <a
              href="#consultation"
              onClick={(e) => handleNavClick(e, '#consultation')}
              className="text-base font-semibold bg-navy text-white px-6 py-3.5 rounded-lg text-center mt-4 hover:bg-navy-dark transition-colors min-h-[52px] flex items-center justify-center"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </>
  );
}
