import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../translations/translations';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggle: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'hi' ? 'hi' : 'en';
  });

  const toggle = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[language] as Record<string, string>;
      return dict[key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
