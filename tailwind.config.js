import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -10px rgb(15 23 42 / 0.10)',
        'card-hover': '0 2px 4px rgb(15 23 42 / 0.05), 0 28px 56px -16px rgb(15 23 42 / 0.22)',
        glow: '0 0 32px -6px rgb(245 158 11 / 0.45)',
        'glow-sm': '0 0 18px -4px rgb(245 158 11 / 0.4)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 1.4s infinite',
        'scroll-dot': 'scroll-dot 2.2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.85)' },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
}
