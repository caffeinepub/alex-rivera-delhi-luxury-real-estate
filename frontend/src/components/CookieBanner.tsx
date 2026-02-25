import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'empireAgentCookieConsent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-[#161616] border-t border-gold/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-inter text-sm text-ivory/70 max-w-2xl">
          We use cookies to enhance your experience on this site. By continuing to browse, you accept our{' '}
          <a
            href="/privacy"
            className="text-gold hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="font-inter text-sm border border-gold/40 text-gold px-5 py-2 rounded-full hover:bg-gold/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="font-inter text-sm bg-gold text-matte-black px-5 py-2 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
