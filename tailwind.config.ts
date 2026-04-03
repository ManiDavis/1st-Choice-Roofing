import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary action colour — warm amber matching the logo
          red: '#D97706',
          'red-dark': '#B45309',
          'red-light': '#F59E0B',
          // Backgrounds
          navy: '#1a1a2e',
          'navy-light': '#16213e',
          charcoal: '#2a2a2a',
          // Accent gold
          gold: '#F59E0B',
          'gold-dark': '#D97706',
          'gold-light': '#FCD34D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(26,26,46,0.85), rgba(26,26,46,0.9))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config
