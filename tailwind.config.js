/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      colors: {
        // Editorial palette
        paper: '#FBFAF6', // warm off-white
        ink: '#1A1A1A', // near-black for text
        accent: {
          DEFAULT: '#8C5A2B', // muted terracotta
          soft: '#C49A6C',
        },
        primary: {
          50: '#f7f3ee',
          100: '#efe7dc',
          200: '#e2d2bd',
          300: '#cdb393',
          400: '#b08e62',
          500: '#8C5A2B',
          600: '#7a4d24',
          700: '#65401e',
          800: '#4d3017',
          900: '#3b2611',
        },
        secondary: {
          50: '#f5f2ed',
          100: '#e9e3d8',
          200: '#d2c6b1',
          300: '#b8a585',
          400: '#9c845e',
          500: '#7d6743',
          600: '#624f33',
          700: '#4a3b27',
          900: '#2c2316',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      letterSpacing: {
        wider: '0.08em',
        widest: '0.18em',
      },
      maxWidth: {
        '8xl': '88rem',
        prose: '68ch',
      },
      typography: {
        // light optical sizing for Fraunces is handled via CSS axis usage
      },
    },
  },
  plugins: [],
};
