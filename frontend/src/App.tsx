import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Properties from './components/Properties';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MarketTicker from './components/MarketTicker';
import EMICalculator from './components/EMICalculator';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgressBar from './components/ScrollProgressBar';
import AdminPanel from './pages/AdminPanel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Properties />
      <Contact />
      <Footer />
    </>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketTicker />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <EMICalculator />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPanel,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ScrollProgressBar />
        <LoadingScreen onComplete={() => setLoadingDone(true)} />
        <CustomCursor />
        {loadingDone && <RouterProvider router={router} />}
      </LanguageProvider>
    </QueryClientProvider>
  );
}
