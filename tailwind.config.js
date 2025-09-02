/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D97452',
        secondary: '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        gray: {
          50: '#F8F9FA',
          900: '#343A40',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}