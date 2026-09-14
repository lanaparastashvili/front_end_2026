/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ig: {
          primary: '#0095F6',
          primaryHover: '#1877F2',
          like: '#FF3040',
          darkBg: '#000000',
          darkCard: '#121212',
          darkBorder: '#262626',
          darkElevated: '#1a1a1a',
          darkHover: '#1f1f1f',
          lightBg: '#FAFAFA',
          lightCard: '#FFFFFF',
          lightBorder: '#DBDBDB',
          lightElevated: '#F0F2F5',
          lightHover: '#F7F7F7',
          grayText: '#737373',
          darkText: '#F5F5F5',
          lightText: '#000000',
          storyPink: '#D300C5',
          storyOrange: '#FF543E',
          storyYellow: '#FFD521',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'like-heart': 'heart-burst 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'pulse-subtle': 'pulse-subtle 2s infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'heart-burst': {
          '0%': { transform: 'scale(0) translate(-50%, -50%)', opacity: '0' },
          '50%': { transform: 'scale(1.2) translate(-50%, -50%)', opacity: '0.9' },
          '70%': { transform: 'scale(1) translate(-50%, -50%)', opacity: '1' },
          '100%': { transform: 'scale(0.8) translate(-50%, -50%)', opacity: '0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('light', '.light &');
    },
  ],
}
