/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#005B9F',
        cream: '#FCFBF8',
        charcoal: '#2D2D2D',
        muted: '#6B7280',
        organic: '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 8px 30px rgb(0 0 0 / 0.04)',
        lift: '0 18px 55px rgb(0 91 159 / 0.12)',
      },
    },
  },
  plugins: [],
}
