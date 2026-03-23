/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        primary: '#3B6FD4',
        accent: '#F59E0B',
        'code-civil': '#3B6FD4',
        'code-penal': '#E85D4A',
        'code-travail': '#059669',
        'code-commerce': '#7C3AED',
      },
      borderRadius: {
        DEFAULT: '6px',
        md: '6px',
        lg: '10px',
      },
      borderWidth: {
        DEFAULT: '0.5px',
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
}
