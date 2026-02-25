# Specification

## Summary
**Goal:** Full frontend rebuild of Delhi Luxury Empire with localStorage-based property persistence, Indian price formatting, city filters, a property detail page, navy design system, mobile-first layout, and an admin panel.

**Planned changes:**
- Create `frontend/src/types/property.ts` defining the `Property` type (id, city, title, price, location, photos, enquiry count, lat, lng)
- Create `frontend/src/utils/formatIndianPrice.ts` with a `formatIndianPrice(n: number): string` utility that formats raw numbers as ₹-prefixed Indian number format (e.g. ₹28,00,00,000)
- Create `frontend/src/utils/propertyStorage.ts` with `getProperties`, `saveProperty`, `deleteProperty`, and `updateProperty` functions backed by localStorage key `dlx_properties`; seeds 15 hardcoded NCR demo properties (3 each for Delhi, Gurgaon, Noida, Aerocity, Ghaziabad) on first load
- Rebuild `frontend/src/components/Properties.tsx` to load from propertyStorage, render city filter tabs (All, Delhi, Gurgaon, Noida, Aerocity, Ghaziabad), display a responsive property card grid, and link cards to `/property?id={id}`
- Create `frontend/src/pages/PropertyPage.tsx` as a full property detail page: reads `?id` from URL, loads from propertyStorage, shows title, Indian-formatted price, location, swipeable photo carousel, Google Maps link (`https://maps.google.com/?q={lat},{lng}`), enquiry count, and a back button using `window.history.back()`
- Update `frontend/src/App.tsx` to register `/property` (PropertyPage) and `/admin` (AdminPanel) routes
- Update `frontend/src/components/Hero.tsx` with Delhi skyline background, headline "Trusted Delhi Agent | 50+ Deals Closed", RERA badge "RERA Registered Agent – HRERA-PKL-2026-00123", and credentials bar "5+ Years | 50+ Happy Clients | CREDAI Member"
- Update `frontend/src/components/TestimonialsRotator.tsx` to include at least 3 NCR client testimonials including Rohit Sharma's
- Rebuild `frontend/src/pages/AdminPanel.tsx` with Internet Identity login gate, property CRUD table (add/edit/delete), form with city dropdown, title, price (raw input with live Indian-format preview), location, lat, lng, 3 photo URL fields, and enquiry count; changes persist immediately to localStorage
- Apply navy design system throughout: primary navy `#1E3A8A`, background `#F8FAFC`, borders `#E5E7EB`, Inter/system-ui font; remove all gold, glassmorphism, and Playfair Display; update `frontend/src/index.css` and `frontend/tailwind.config.js`
- Add a mobile-only fixed bottom action bar (60px tall, full width) with "Calculate EMI" and "Find My Property" CTA buttons; ensure all interactive elements are at least 48px tall

**User-visible outcome:** Visitors see 15 NCR luxury properties on first load organized by city filter tabs, can view property detail pages with photo carousels and Google Maps links, and see a clean navy/white design. The admin at `/admin` can log in with Internet Identity and manage all properties, with changes persisting across page refreshes.
