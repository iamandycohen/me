import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2b211b',
        paper: '#f4efe7',
        cream: '#fbf8f2',
        accent: '#985338',
        'accent-soft': '#e6b89c',
        moss: '#68715a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      boxShadow: {
        paper: '0 28px 80px rgba(43, 33, 27, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
