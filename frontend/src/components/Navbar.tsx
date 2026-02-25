import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const NAV_LINKS = [
  { key: 'home', href: '#home' },
  { key: 'properties', href: '#properties' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
];

const LABELS: Record<string, Record<string, string>> = {
  en: { home: 'Home', properties: 'Properties', about: 'About', contact: 'Contact' },
  hi: { home: 'होम', properties: 'प्रॉपर्टीज़', about: 'परिचय', contact: 'संपर्क' },
};

export default function Navbar() {
  const { language, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const labels = LABELS[language] || LABELS.en;

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        width: '100%',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'rgba(5,5,16,0.95)' : 'rgba(5,5,16,0.7)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,215,0,0.1)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '16px',
              color: '#111',
            }}
          >
            AR
          </div>
          <span
            style={{
              background: 'linear-gradient(90deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: '18px',
              letterSpacing: '-0.02em',
            }}
          >
            Alex Rivera
          </span>
        </a>

        {/* Desktop Nav */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              style={{
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD700')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              {labels[link.key]}
            </a>
          ))}

          <button
            onClick={toggle}
            style={{
              background: 'rgba(255,215,0,0.1)',
              border: '1px solid rgba(255,215,0,0.3)',
              color: '#FFD700',
              fontWeight: 700,
              fontSize: '13px',
              padding: '6px 14px',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,215,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,215,0,0.1)'; }}
          >
            {language === 'en' ? 'हिन्दी' : 'EN'}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#FFD700',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(5,5,16,0.98)',
            borderTop: '1px solid rgba(255,215,0,0.1)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 600,
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {labels[link.key]}
            </a>
          ))}
          <button
            onClick={() => { toggle(); setMenuOpen(false); }}
            style={{
              background: 'rgba(255,215,0,0.1)',
              border: '1px solid rgba(255,215,0,0.3)',
              color: '#FFD700',
              fontWeight: 700,
              fontSize: '14px',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            {language === 'en' ? 'हिन्दी में देखें' : 'View in English'}
          </button>
        </div>
      )}
    </nav>
  );
}
