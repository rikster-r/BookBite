/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        '80px': '80px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
