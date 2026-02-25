import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Properties from './components/Properties';
import LandInvestment from './components/LandInvestment';
import TestimonialsRotator from './components/TestimonialsRotator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import PropertyPage from './pages/PropertyPage';
import AdminPanel from './pages/AdminPanel';
import MobileBottomBar from './components/MobileBottomBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function AppContent() {
  const path = window.location.pathname;

  // Property detail page
  if (path === '/property') {
    return (
      <>
        <PropertyPage />
        <MobileBottomBar />
      </>
    );
  }

  // Admin panel
  if (path === '/admin') {
    return <AdminPanel />;
  }

  // Privacy policy
  if (path === '/privacy') {
    return (
      <>
        <Navbar />
        <PrivacyPolicy />
        <Footer />
      </>
    );
  }

  // Terms & conditions
  if (path === '/terms') {
    return (
      <>
        <Navbar />
        <TermsConditions />
        <Footer />
      </>
    );
  }

  // Home page (default)
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Properties />
        <LandInvestment />
        <TestimonialsRotator />
        <Contact />
      </main>
      <Footer />
      <MobileBottomBar />
      <CookieBanner />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
