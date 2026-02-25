/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: 'oklch(0.82 0.18 85)',
          light: 'oklch(0.90 0.15 85)',
          dark: 'oklch(0.65 0.18 75)',
        },
        crimson: {
          DEFAULT: 'oklch(0.50 0.22 25)',
          light: 'oklch(0.60 0.20 25)',
          dark: 'oklch(0.40 0.22 20)',
        },
        obsidian: {
          DEFAULT: 'oklch(0.08 0.01 285)',
          light: 'oklch(0.12 0.015 285)',
        },
        surface: {
          DEFAULT: 'oklch(0.12 0.015 285)',
          light: 'oklch(0.16 0.015 285)',
        },
        border: 'oklch(0.22 0.025 285)',
        input: 'oklch(0.16 0.015 285)',
        ring: 'oklch(0.82 0.18 85)',
        background: 'oklch(0.08 0.01 285)',
        foreground: 'oklch(0.95 0.02 85)',
        primary: {
          DEFAULT: 'oklch(0.82 0.18 85)',
          foreground: 'oklch(0.08 0.01 285)',
        },
        secondary: {
          DEFAULT: 'oklch(0.18 0.02 285)',
          foreground: 'oklch(0.95 0.02 85)',
        },
        destructive: {
          DEFAULT: 'oklch(0.55 0.22 25)',
          foreground: 'oklch(0.95 0.02 85)',
        },
        muted: {
          DEFAULT: 'oklch(0.16 0.015 285)',
          foreground: 'oklch(0.65 0.03 85)',
        },
        accent: {
          DEFAULT: 'oklch(0.82 0.18 85)',
          foreground: 'oklch(0.08 0.01 285)',
        },
        popover: {
          DEFAULT: 'oklch(0.10 0.012 285)',
          foreground: 'oklch(0.95 0.02 85)',
        },
        card: {
          DEFAULT: 'oklch(0.12 0.015 285)',
          foreground: 'oklch(0.95 0.02 85)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gold-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gold-spin': 'gold-spin 1s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      boxShadow: {
        gold: '0 0 20px rgba(255, 215, 0, 0.4)',
        'gold-lg': '0 20px 40px rgba(255, 215, 0, 0.15)',
        'gold-glow': '0 0 30px rgba(255, 215, 0, 0.6)',
        crimson: '0 0 20px rgba(220, 20, 60, 0.4)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
}
