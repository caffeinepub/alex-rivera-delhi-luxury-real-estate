import React from 'react';
import { Mail, Phone, Shield } from 'lucide-react';
import { SiLinkedin, SiInstagram, SiX } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'delhiluxuryempire');

  const scrollTo = (id: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = '/' + id;
      return;
    }
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy border-t border-navy-dark pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Delhi Luxury Empire</h3>
            <p className="text-blue-200 text-sm mb-4">Premium NCR Real Estate</p>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-blue-200 shrink-0" />
              <p className="text-blue-100/80 text-xs">RERA Registered – HRERA-PKL-2026-00123</p>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed">
              5+ Years | 50+ Happy Clients | CREDAI Member. Your trusted partner for luxury real estate in Delhi NCR.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="LinkedIn" className="text-blue-200/60 hover:text-white transition-colors">
                <SiLinkedin size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-blue-200/60 hover:text-white transition-colors">
                <SiInstagram size={18} />
              </a>
              <a href="#" aria-label="X / Twitter" className="text-blue-200/60 hover:text-white transition-colors">
                <SiX size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@delhiluxuryempire.com"
                className="flex items-center gap-3 text-sm text-blue-100/70 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-blue-200 shrink-0" />
                contact@delhiluxuryempire.com
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm text-blue-100/70 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-blue-200 shrink-0" />
                +91 99999 99999
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-5">Quick Links</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => scrollTo('#properties')}
                className="block text-sm text-blue-100/70 hover:text-white transition-colors"
              >
                Featured Properties
              </button>
              <button
                onClick={() => scrollTo('#about')}
                className="block text-sm text-blue-100/70 hover:text-white transition-colors"
              >
                About Agent
              </button>
              <button
                onClick={() => scrollTo('#consultation')}
                className="block text-sm text-blue-100/70 hover:text-white transition-colors"
              >
                Book Consultation
              </button>
              <a href="/admin" className="block text-sm text-blue-100/70 hover:text-white transition-colors">
                Admin Panel
              </a>
              <a href="/privacy" className="block text-sm text-blue-100/70 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="block text-sm text-blue-100/70 hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-6 mb-5">
          <p className="text-xs text-blue-100/40 leading-relaxed mb-1">
            Delhi Luxury Empire operates as an independent real estate advisory. All property transactions are subject to verification and due diligence. Property values and availability are subject to change without notice.
          </p>
          <p className="text-xs text-blue-100/30">
            RERA Registered Agent – HRERA-PKL-2026-00123 | CREDAI Member
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-100/40">
            © {year} Delhi Luxury Empire. All rights reserved.
          </p>
          <p className="text-xs text-blue-100/35 flex items-center gap-1">
            Built with <Heart size={11} className="text-blue-300 fill-blue-300 mx-0.5" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:underline ml-0.5"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
